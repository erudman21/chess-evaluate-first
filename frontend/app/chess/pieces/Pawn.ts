import { Piece } from "./Piece";

export class Pawn extends Piece {
  constructor(position: number, color: string, value: number, name: string) {
    super(position, color, value, name);
  }
}
