import { Piece } from "./Piece";

export class Bishop extends Piece {
  constructor(position: number, color: string, value: number, name: string) {
    super(position, color, value, name);
  }
}
