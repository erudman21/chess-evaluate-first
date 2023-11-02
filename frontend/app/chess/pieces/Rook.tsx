import { useState } from "react";
import { PieceType } from "./pieceTypes";

const Rook = ({ index, color }: PieceType) => {
  const [value, setValue] = useState(3);

  return <div>Rook</div>;
};

export default Rook;

// export class Rook extends Piece {
//   icon: string;

//   constructor(position: number, color: string) {
//     super(position, color);
//     this.value = 5;
//     this.icon = require(`../../art/${
//       this.color === "white" ? "WR" : "BR"
//     }.png`);
//   }
// }
