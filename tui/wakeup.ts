import{select, isCancel} from "@clack/prompts";
import chalk from "chalk";
import figlet from "figlet";
import { runCliMode } from "../modes/cli";

const BANNER_FONT = 'ANSI Shadow';
const SHADOW = chalk.hex('#FF5733'); // A vibrant orange color for the shadow
const FACE = chalk.hex('#33FF57').bold; // A vibrant green color for the face

function printBannerWithShadow(ascii:string) {
    const bannerlines = ascii.replace(/\s+$/, '').split('\n');
    const maxLen = Math.max(...bannerlines.map((l) => l.length), 0);
    const rowWidth = maxLen + 2; // Add some padding for the shadow

    for(const line of bannerlines) {
        console.log(SHADOW((' ' + line).padEnd(rowWidth)));
    }
    
    process.stdout.write(`\x1b[${bannerlines.length}A`);
    for(const line of bannerlines) {
        console.log(FACE(line.padEnd(rowWidth)));
    }

}
export async function runWakeup(){
    let ascii:string;
    try{
        ascii = figlet.textSync('Nexora',{font: BANNER_FONT});
    }catch(error){
        ascii = figlet.textSync("Nexora" ,{font: 'Standard'});
    }
    printBannerWithShadow(ascii);

    const mode = await select({
        message:"Which mode do you want to proceed with?",
        options:[
            {value:"cli",label:"CLI Mode"},
            {value:"telegram",label:"Telegram"},
            {value:"exit",label:"Exit"}
        ]
    });

    if(isCancel(mode) || mode === "exit"){
        console.log(chalk.dim('\n GoodBye. \n'));
        return;
    }

    if(mode === "cli"){
        await runCliMode()
    }
    else if(mode === "telegram"){
        console.log(chalk.dim("Starting telegram mode..."))
    }

}