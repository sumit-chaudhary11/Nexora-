#!/usr/bin/env bun 
// this above command is shebang for bun runtime, it allows you to run this script directly from the command line without 
// needing to explicitly invoke the bun command.


import{Command} from "commander";
import { runWakeup} from "./tui/wakeup";

const program = new Command();

program
  .name("Nexora")
  .description("A simple CLI tool")
  .version("1.0.0");

program
  .command("wakeup")
  .description("Show the banner and pick cli or telegram mode ")
  .action(async() =>{
    await runWakeup();
  });

await program.parseAsync(process.argv);  