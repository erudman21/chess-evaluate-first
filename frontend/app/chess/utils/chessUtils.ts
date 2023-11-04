import { BISHOP, KING, KNIGHT, PAWN, QUEEN, ROOK } from "chess.js";

export const getPieceNames = (pieceType: string) => {
  if (pieceType === KING) return "King";
  if (pieceType === QUEEN) return "Queen";
  if (pieceType === BISHOP) return "Bishop";
  if (pieceType === KNIGHT) return "Knight";
  if (pieceType === ROOK) return "Rook";
  if (pieceType === PAWN) return "Pawn";
};
