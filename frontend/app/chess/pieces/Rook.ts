import { Piece } from "./Piece";

export class Rook extends Piece {
  constructor(position: number, color: string, value: number, name: string) {
    super(position, color, value, name);
  }
}
