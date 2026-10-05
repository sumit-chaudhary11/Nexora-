import { isCancel, text} from "@clack/prompts"
import chalk from "chalk";
import { defaultAgentConfig } from "./types";


export async function runAgentmode(){
    console.log(chalk.bold('\n Agent Mode\n'));

    const goal = await text({
        message: "What would you like the agent to do?",
        placeholder: "Concrete task for this Codebase...",
    });

    if (isCancel(goal) || !goal.trim()) return; 

    const config = defaultAgentConfig();
    
}