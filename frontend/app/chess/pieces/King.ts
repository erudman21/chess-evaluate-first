import { Piece } from "./Piece";

export class King extends Piece {
  icon: string;

  constructor(position: number, color: string, value: number, type: string) {
    super(position, color, value, type);
    this.icon = require(`../../art/${
      this.color === "white" ? "WK" : "BK"
    }.png`);
  }
}
