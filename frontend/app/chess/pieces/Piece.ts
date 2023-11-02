export class Piece {
  position: number;
  color: string;
  value: number = 0;

  constructor(position: number, color: string) {
    this.position = position;
    this.color = color;
  }
}
