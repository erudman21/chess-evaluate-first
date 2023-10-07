export class Piece {
  position: number;
  color: string;
  value: number;
  type: string;

  constructor(position: number, color: string, value: number, type: string) {
    this.position = position;
    this.color = color;
    this.value = value;
    this.type = type;
  }
}
