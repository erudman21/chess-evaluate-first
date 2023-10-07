export class Piece {
  position: number;
  color: string;
  value: number;
  name: string;

  constructor(position: number, color: string, value: number, name: string) {
    this.position = position;
    this.color = color;
    this.value = value;
    this.name = name;
  }
}
