import { Piece } from "./Piece";

export class Bishop extends Piece {
  icon: string;

  constructor(position: number, color: string, value: number, type: string) {
    super(position, color, value, type);
    this.icon = require(`../../art/${
      this.color === "white" ? "WB" : "BB"
    }.png`);
  }
}
