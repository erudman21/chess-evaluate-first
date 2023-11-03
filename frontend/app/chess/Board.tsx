import { Chess } from "chess.js";
import ChessBoard from "chessboardjsx";
import { useEffect, useState } from "react";

const Board = () => {
  const [game, _] = useState(new Chess());
  const [position, setPosition] = useState("start");
  const [gameGoing, setGameGoing] = useState(true);

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
        setGameGoing(false);
      }
    } catch (e) {}
  };

  return (
    <div className="">
      <ChessBoard width={800} position={position} onDrop={onDrop} />
      {gameGoing ? "" : <div>Game Over!</div>}
    </div>
  );
};

export default Board;
