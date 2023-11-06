import { Chess, PAWN, Square } from "chess.js";

export const formatContinuation = (continuation: string, game: Chess) => {
  const moves = continuation.split(" ").slice(0, -1);

  let moveNum = 1;
  const movesWithPieces = moves.map((move, i) => {
    const piece = game.get(move.substring(0, 2) as Square);
    const actualMove = move.substring(2);
    const moveWithPiece =
      piece.type === PAWN ? actualMove : piece.type.toUpperCase() + actualMove;

    let moveWithPieceAndNumber = moveWithPiece;

    if (i === 0 && piece.color === "b") {
      moveWithPieceAndNumber = `${game.moveNumber()}...${moveWithPiece}`;
    }

    if (piece.color === "w") {
      if (i === 0) {
        moveWithPieceAndNumber = `${game.moveNumber()}.${moveWithPiece}`;
      } else {
        moveWithPieceAndNumber = `${
          game.moveNumber() + moveNum
        }.${moveWithPiece}`;
        moveNum++;
      }
    }

    return moveWithPieceAndNumber;
  });

  return movesWithPieces.join(" ");
};
