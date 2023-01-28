import { stringify } from "querystring";

type RootCommand = {
    command: string,
    sub_command: SubCommand,
}

type SubCommand = {
    command: string,
    custom_string: string,
}

let command_strings: { [name: string ]: RootCommand} = {};


export default function CommandParser(command: string): string {
    let str_arry: string[];

    function parser(raw_string: string) {
        try {
            str_arry = raw_string.split(/[ ]+/);
        } catch {
            str_arry = [];
            console.log("could not determine command used");
        }
        
        if (str_arry.length > 1 && str_arry.length !== 0) {
            
            switch(str_arry[0].toLocaleLowerCase()) {
                case 'rot13': {
                    // switch (str_arry[1].toLocaleLowerCase()) {
                    //     case 'decrypt': { retur}
                    // }
                    return "ROT13: " + str_arry[1] + " -> " + CaeserCipher(str_arry[1].toLocaleLowerCase(), false);
                } case 'ceasercipher': {

                }

                default: {
                    return "Unrecognized Command";
                }
            }
        } else {
            // Write "helper -> Did you mean this?" function
            return "Incomplete command"
        }

    }


    return parser(command);
}

function CaeserCipher (value: string, reverse: boolean) {
    const alpha = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWYX";
    return value.replace(/[a-z]/gi, letter => String.fromCharCode(letter.charCodeAt(0) + (letter.toLocaleLowerCase() <= 'm' ? 13 : -13)));
}
