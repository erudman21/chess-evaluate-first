import { useState } from "react";
import { Piece } from "./Piece";
import { PieceType } from "./pieceTypes";
import Image from "next/image";

const Knight = ({ index, color }: PieceType) => {
  const [value, setValue] = useState(3);
  const icon = require(`../../art/${color === "white" ? "WN" : "BN"}.png`);

  return (
    <div>
      <Image src={icon} alt="piece icon" />
      Knight
    </div>
  );
};

export default Knight;

// export class Knight extends Piece {
//   icon: string;

//   constructor(position: number, color: string) {
//     super(position, color);
//     this.value = 3;
//     this.icon = require(`../../art/${
//       this.color === "white" ? "WN" : "BN"
//     }.png`);
//   }
// }
