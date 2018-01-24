// https://github.com/AssemblyScript/assemblyscript/wiki/Built-in-functions

/***********************
    Registers
***********************/

// 8-bit registers
let registerA: u8 = 0,
    registerB: u8 = 0,
    registerC: u8 = 0,
    registerD: u8 = 0,
    registerE: u8 = 0,
    registerH: u8 = 0,
    registerL: u8 = 0,
    registerF: u8 = 0;

// 16-bit registers
let programCounter: u16 = 0;
let stackPointer: u16 = 0;

// Grouped registers
// possible overload these later to performace actions
function registerAF(): void {

}


function registerBC(): void {

}

function registerDE(): void {

}

function registerHL(): void {

}


/***********************
    Memory
***********************/

// Not Exportable by Assemblyscript?


/***********************
    Decode Opcodes
***********************/

// Take in any opcode, and decode it
export function handleOpcode(opcode: u8): boolean {
  switch(opcode) {
    case 10:
      break;
    default:
      // Return false, error handling the opcode
      return false;
  }

  // Reutrn true, opcode is handled correctly!
  return true;
}
