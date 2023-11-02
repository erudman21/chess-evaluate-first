import { useState } from "react";
import { PieceType } from "./pieceTypes";

const Queen = ({ index, color }: PieceType) => {
  const [value, setValue] = useState(3);

  return <div>Queen</div>;
};

export default Queen;

// export class Queen extends Piece {
//   icon: string;

//   constructor(position: number, color: string) {
//     super(position, color);
//     this.value = 9;
//     this.icon = require(`../../art/${
//       this.color === "white" ? "WQ" : "BQ"
//     }.png`);
//   }
// }
