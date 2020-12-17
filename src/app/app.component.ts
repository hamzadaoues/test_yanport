import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  gridForm: FormGroup;
  dimensionX: number;
  dimensionY: number;
  positionX: number;
  positionY: number;
  direction = 'N';
  positions = ['N', 'S', 'E', 'W'];
  currentInstructionIndex = 0;
  finishedExecution: boolean;

  ngOnInit(): void {
    this.createGridForm();
  }

  // Create the grid form and implementing the onchange method
  private createGridForm() {
    this.gridForm = new FormGroup({
      dimensionX: new FormControl(3, [Validators.min(1)]),
      dimensionY: new FormControl(4, [Validators.min(1)]),
      inititalPositionX: new FormControl(0, [Validators.min(0), Validators.max(2)]),
      inititalPositionY: new FormControl(0, [Validators.min(0), Validators.max(3)]),
      initialDirection: new FormControl('N'),
      instructions: new FormControl()
    });
    this.gridForm.valueChanges.subscribe(() => {
      this.dimensionX = this.getDimensionX();
      this.dimensionY = this.getDimensionY();
      // Initial position max validator change depending on the grid dimensions
      this.gridForm.controls.inititalPositionX.setValidators([Validators.min(0), Validators.max(this.dimensionX - 1)]);
      this.gridForm.controls.inititalPositionY.setValidators([Validators.min(0), Validators.max(this.dimensionY - 1)]);
    });
  }

  // Depending on one single instruction, move or rotate the machine
  // Instruction could be : A,D,G.
  handleInstruction(instruction) {
    this.currentInstructionIndex++;
    switch (instruction) {
      case 'A':
        this.move();
        break;
      case 'D':
        this.rotateRight();
        break;
      case 'G':
        this.rotateLeft();
        break;
      default:
        console.log('incorrect command!');
        break;
    }
  }

  // Move the machine depending on the current direction
  public move() {
    let positionX = this.positionX;
    let positionY = this.positionY;

    switch (this.direction) {
      case 'N':
        positionY++;
        break;
      case 'S':
        positionY--;
        break;
      case 'E':
        positionX += 1;
        break;
      case 'W':
        positionX--;
        break;
      default:
        break;
    }
    this.positionX = positionX;
    this.positionY = positionY;
  }

  // Execute the instructions
  execute() {
    this.currentInstructionIndex = 0;
    this.finishedExecution = false;
    setTimeout(() => {
      this.positionX = this.getInitPositionX();
      this.positionY = this.getInitPositionY();
      this.direction = this.getInitDirection();
    }, 0);

    const instructions = this.getInstructions();
    for (let i = 0; i < instructions.length; i++) {
      const instruction = instructions[i];
      setTimeout(() => this.handleInstruction(instruction), 1000 * (i + 1));
      if (i === instructions.length - 1) {
        setTimeout(() => this.finishedExecution = true, 1000 * (i + 1));
      }
    }
  }

  // Change the current direction when rotating right
  private rotateRight() {
    switch (this.direction) {
      case 'N':
        this.direction = 'E';
        break;
      case 'S':
        this.direction = 'W';
        break;
      case 'E':
        this.direction = 'S';
        break;
      case 'W':
        this.direction = 'N';
        break;
      default:
        break;
    }
  }

  // Change the current direction when rotating left
  private rotateLeft() {
    switch (this.direction) {
      case 'N':
        this.direction = 'W';
        break;
      case 'S':
        this.direction = 'E';
        break;
      case 'E':
        this.direction = 'N';
        break;
      case 'W':
        this.direction = 'S';
        break;
      default:
        break;
    }
  }

  // Add an instruction
  addInstruction(a: string) {
    let instructions = this.getInstructions();
    if (instructions == null) {
      instructions = a;
    } else {
      instructions += a;
    }
    this.setInstructions(instructions);
  }

  // Get array of instructions
  getInstructionAsArray() {
    const instructions = this.getInstructions();
    if (instructions) {
      return instructions.split('');
    } else {
      return [];
    }
  }

  // Delete one instruction
  deleteInstruction() {
    let instructions = this.getInstructions();
    if (instructions) {
      instructions = instructions.slice(0, -1);
    }
    this.setInstructions(instructions);
  }

  // Get the initial X position
  getInitPositionX() {
    return this.gridForm.controls.inititalPositionX.value;
  }

  // Get the initial Y position
  getInitPositionY() {
    return this.gridForm.controls.inititalPositionY.value;
  }

  // Get the grid X dimension
  getDimensionX() {
    return this.gridForm.controls.dimensionX.value;
  }

  // Get the grid Y dimension
  getDimensionY() {
    return this.gridForm.controls.dimensionY.value;
  }

  // Get the instructions
  getInstructions() {
    return this.gridForm.controls.instructions.value;
  }

  // Get the initial direction
  getInitDirection() {
    return this.gridForm.controls.initialDirection.value;
  }

  // Set the instruction in the form
  setInstructions(instruction) {
    this.gridForm.controls.instructions.setValue(instruction);
  }
}
