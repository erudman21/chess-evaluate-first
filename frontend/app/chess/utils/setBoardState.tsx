import Bishop from "../pieces/Bishop";
import King from "../pieces/King";
import Knight from "../pieces/Knight";
import Pawn from "../pieces/Pawn";
import Queen from "../pieces/Queen";
import Rook from "../pieces/Rook";

export const setBoardState = () => {
  const pieces = [...Array(64)].fill(null);
  pieces[0] = <Rook index={0} color="black" />;
  pieces[1] = <Knight index={1} color="black" />;
  pieces[2] = <Bishop index={2} color="black" />;
  pieces[3] = <Queen index={3} color="black" />;
  pieces[4] = <King index={4} color="black" />;
  pieces[5] = <Bishop index={5} color="black" />;
  pieces[6] = <Knight index={6} color="black" />;
  pieces[7] = <Rook index={7} color="black" />;
  pieces[8] = <Pawn index={8} color="black" />;
  pieces[9] = <Pawn index={9} color="black" />;
  pieces[10] = <Pawn index={10} color="black" />;
  pieces[11] = <Pawn index={11} color="black" />;
  pieces[12] = <Pawn index={12} color="black" />;
  pieces[13] = <Pawn index={13} color="black" />;
  pieces[14] = <Pawn index={14} color="black" />;
  pieces[15] = <Pawn index={15} color="black" />;

  pieces[48] = <Rook index={48} color="white" />;
  pieces[49] = <Knight index={49} color="white" />;
  pieces[50] = <Bishop index={50} color="white" />;
  pieces[51] = <Queen index={51} color="white" />;
  pieces[52] = <King index={52} color="white" />;
  pieces[53] = <Bishop index={53} color="white" />;
  pieces[54] = <Knight index={54} color="white" />;
  pieces[55] = <Rook index={55} color="white" />;
  pieces[56] = <Pawn index={56} color="white" />;
  pieces[57] = <Pawn index={57} color="white" />;
  pieces[58] = <Pawn index={58} color="white" />;
  pieces[59] = <Pawn index={59} color="white" />;
  pieces[60] = <Pawn index={60} color="white" />;
  pieces[61] = <Pawn index={61} color="white" />;
  pieces[62] = <Pawn index={62} color="white" />;
  pieces[63] = <Pawn index={63} color="white" />;

  return pieces;
};
