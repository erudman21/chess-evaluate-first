import { Piece } from "./Piece";

export class Knight extends Piece {
  icon: string;

  constructor(position: number, color: string, value: number, type: string) {
    super(position, color, value, type);
    this.icon = require(`../../art/${
      this.color === "white" ? "WN" : "BN"
    }.png`);
  }
}
