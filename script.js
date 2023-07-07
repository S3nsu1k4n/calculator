const div_calculator = document.querySelector("#calculator");
const div_display = document.querySelector("#display");
const div_buttons = document.querySelector("#buttons");

let display_up = document.createElement("div");
let display_down = document.createElement("div");

let new_number = true;
let last_operation = "";

function createDisplay(){    
    display_up.classList.add("display_up", "displays");
    display_up.textContent = "";
    div_display.appendChild(display_up);

    display_down.classList.add("display_down", "displays");
    display_down.textContent = "";
    div_display.appendChild(display_down);
}

function createButtons(){
    const button_text = [
        ["x²", "CE", "C", "Back"],
        ["7", "8", "9", "÷"],
        ["4", "5", "6", "x"],
        ["1", "2", "3", "-"],
        [".", "0", "=", "+"],
    ];
    
    for (let row=0; row < button_text[1].length; row++){
        let div_row = document.createElement("div");
        div_row.classList.add(`row${row}`, "rows")

        for(let col=0; col < button_text.length; col++){
            if(button_text[col][row] === ""){
                continue;
            }
            let button = document.createElement("div");
            button.classList.add("button");
            
            button.style.cursor = "pointer";
            let operator_buttons = "=+-÷x";
            let button_char = document.createElement("p");
            button.addEventListener("click", (e) => {
                writeDisplay(button_text[col][row]);
            })
            button.addEventListener("mouseover", (e) => {
                
                if(button_char.textContent === "="){
                    button.style.background = "#0892D0";
                    button_char.style.background = "#0892D0";
                }
                else if(operator_buttons.includes(button_char.textContent)){
                    button.style.background = "#99EDC3";
                    button_char.style.background = "#99EDC3";
                }
                else{
                    button.style.background = "#F2F3F5";
                    button_char.style.background = "#F2F3F5";
                }
            })
            button.addEventListener("mouseout", (e) => {
                if(button_char.textContent === "="){
                    button.style.background = "#0073CF";
                    button_char.style.background = "#0073CF";
                }
                else if(operator_buttons.includes(button_char.textContent)){
                    button.style.background = "#B2D3C2";
                    button_char.style.background = "#B2D3C2";
                }
                else{
                    button.style.background = "white";
                    button_char.style.background = "white";
                }
            })
            
            button_char.textContent = button_text[col][row];
            button.appendChild(button_char);
            div_row.appendChild(button);

            if(button_char.textContent === "="){
                button.style.background = "#0073CF";
                button_char.style.background = "#0073CF";
            }
            else if(operator_buttons.includes(button_char.textContent)){
                button.style.background = "#B2D3C2";
                button_char.style.background = "#B2D3C2";
            }
        }
        div_buttons.appendChild(div_row);
    }
}


function operate(str_equation){

    let result = 0;
    let splitted = "";
    for(const char of "+-x÷²"){
        if(str_equation.includes(char)){
            splitted = str_equation.slice(0, -1).split(char);
            console.log(splitted);
            switch(char){
                case "+":
                    result = splitted[0]*1 + splitted[1]*1;
                    break;
                case "-":
                    result = splitted[0]*1 - splitted[1]*1;
                    break;
                case "x":
                    result = splitted[0]*1 * splitted[1]*1;
                    break;
                case "÷":
                    if(splitted[1] === "0"){
                        display_up.textContent = "";
                        return "Division by 0!"
                    }
                    result = splitted[0]*1 / splitted[1]*1;
                    break;
                case "²":
                    return splitted[0] ** 2;
                
            }
            last_operation = char + splitted[1];
            break;
        }
    }
    
    return result;
}

function writeDisplay(string=""){
    if(string === ""){
        return;
    }
    switch(string){
        case "CE":
            display_down.textContent = "0";
            break;
        case "C":
            display_up.textContent = "";
            display_down.textContent = "0";
            break;
        case "Back":
            text = display_down.textContent;
            text = text.slice(0, -1);
            if(text === ""){
                text = "0";
            }
            display_down.textContent = text;
            break;
        case "=":
            if(new_number && display_up.textContent.includes("=")){
                if(display_down.textContent.includes("Division")){
                    return;
                }
                display_up.textContent = display_down.textContent + last_operation + "=";
            }
            else{
                display_up.textContent = display_up.textContent + display_down.textContent + string;
            }
            display_down.textContent = operate(display_up.textContent);
            new_number = true;
            break;
        case "x²":
            display_down.textContent = operate(display_down.textContent+"²");
            new_number = true;
            break;
        default:
            if("÷x-+".includes(string)){
                display_up.textContent = display_down.textContent + string;
                new_number = true;
            }
            else if (new_number && display_up.textContent.includes("=")){
                display_down.textContent = string;
                new_number = false;
                display_up.textContent = "";
            }
            else if (display_down.textContent === "0" || new_number){
                display_down.textContent = string;
                new_number = false;
            }
            else{
                display_down.textContent += string;
            }
            break;
        }
}


function init(){
    createDisplay();
    createButtons();
    writeDisplay("0");
    new_number = true;
}


init();