import { Button } from "@chakra-ui/react";
import { Chess } from "chess.js";
import ChessBoard from "chessboardjsx";
import { useEffect, useState } from "react";

const Board = () => {
  const [game, _] = useState(new Chess());
  const [position, setPosition] = useState("start");
  const [gameStatus, setGameStatus] = useState("");

  const onDrop = ({ sourceSquare, targetSquare }: any) => {
    try {
      let move = game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: "q",
      });
      if (move === null) return;

      setPosition(game.fen());

      if (game.isGameOver()) {
        if (game.isCheckmate()) {
          setGameStatus("Checkmate");
        }

        if (
          game.isDraw() ||
          game.isStalemate() ||
          game.isInsufficientMaterial() ||
          game.isThreefoldRepetition()
        ) {
          setGameStatus("Draw");
        }
      }
    } catch (e) {}
  };

  const resetBoard = () => {
    game.reset();
    setPosition("start");
  };

  return (
    <div>
      <ChessBoard width={800} position={position} onDrop={onDrop} />
      {position === "start" ? (
        ""
      ) : (
        <Button
          backgroundColor="red"
          className="bg-red-400 mt-5 float-right absolute right-10 bottom-4"
          onClick={resetBoard}
        >
          Reset Board
        </Button>
      )}
      {gameStatus === "" ? "" : <div>Game Over!</div>}
    </div>
  );
};

export default Board;
