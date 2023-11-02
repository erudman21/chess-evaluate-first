import { Piece } from "./Piece";
import { PieceType } from "./pieceTypes";

const King = ({ index, color }: PieceType) => {
  return <div>King</div>;
};

export default King;

// export class King extends Piece {
//   icon: string;

//   constructor(position: number, color: string) {
//     super(position, color);
//     this.icon = require(`../../art/${
//       this.color === "white" ? "WK" : "BK"
//     }.png`);
//   }
// }
