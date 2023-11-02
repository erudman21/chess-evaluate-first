import { useState } from "react";
import { Piece } from "./Piece";
import { PieceType } from "./pieceTypes";

const Bishop = ({ index, color }: PieceType) => {
  const [value, setValue] = useState(3);

  return <div>bishop</div>;
};

export default Bishop;

// export class Bishop extends Piece {
//   icon: string;
//   value: number;

//   constructor(position: number, color: string) {
//     super(position, color);
//     this.value = 3;
//     this.icon = require(`../../art/${
//       this.color === "white" ? "WB" : "BB"
//     }.png`);
//   }
// }
