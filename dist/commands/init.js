import ora from "ora";
import { Command } from "commander";
import { execa } from "execa";
import { detect } from "@antfu/ni";
const PROJECT_DEPENDENCIES = [
    "cowsay"
];
export async function getPackageManager(targetDir) {
    const packageManager = await detect({ programmatic: true, cwd: targetDir });
    if (packageManager === "yarn@berry")
        return "yarn";
    if (packageManager === "pnpm@6")
        return "pnpm";
    if (packageManager === "bun")
        return "bun";
    return packageManager ?? "npm";
}
export const init = new Command()
    .name("init")
    .description("install dependencies")
    .option("-c, --cwd <cwd>", "the working directory. defaults to the current directory.", process.cwd())
    .action(async ({ cwd }) => {
    try {
        await runInit(cwd);
    }
    catch (error) {
        console.error("Initialization failed:", error);
        process.exit(1);
    }
});
export async function runInit(cwd) {
    const dependenciesSpinner = ora(`Installing dependencies...`)?.start();
    const packageManager = await getPackageManager(cwd);
    // TODO: add support for other icon libraries.
    const deps = [
        ...PROJECT_DEPENDENCIES
    ];
    await execa(packageManager, [packageManager === "npm" ? "install" : "add", ...deps], {
        cwd,
    });
    dependenciesSpinner?.succeed();
}
