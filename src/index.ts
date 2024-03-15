#!/usr/bin/env node

import { init } from "./commands/init"
import { Command } from "commander"


async function main() {

  const program = new Command()
    .name("ts_cli")
    .description("add components and dependencies to your project")
    .version(
     "1.0.0",
      "-v, --version",
      "display the version number"
    )

  program.addCommand(init)

  program.parse()
}

main()
