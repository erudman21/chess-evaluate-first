import { useState } from "react";
import { PieceType } from "./pieceTypes";
import Image from "next/image";

const Pawn = ({ index, color }: PieceType) => {
  const [value, setValue] = useState(3);
  const icon = require(`../../art/${color === "white" ? "WP" : "BP"}.png`);

  return (
    <div>
      <Image src={icon} alt="pawn icon" />
      Pawn
    </div>
  );
};

export default Pawn;
