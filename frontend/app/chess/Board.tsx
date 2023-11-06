import { Button } from "@chakra-ui/react";
import { Chess, Square } from "chess.js";
import ChessBoard from "chessboardjsx";
import { Dispatch, SetStateAction, useMemo, useState } from "react";
import Engine, { StockfishResponse } from "./Engine";

export type ChessBoardProps = {
  setBoardState: Dispatch<SetStateAction<string>>;
  boardState: string;
  game: Chess;
};

const Board: React.FC<ChessBoardProps> = ({
  game,
  boardState,
  setBoardState,
}) => {
  const [gameStatus, setGameStatus] = useState("");
  const engine = useMemo(() => new Engine(), []);
  // BestMove
  const [bm, setBm] = useState("");

  const onDrop = ({ sourceSquare, targetSquare }: any) => {
    try {
      let move = game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: "q",
      });
      console.log(move);
      if (move === null) return;

      setBoardState(game.fen());

      engine.evaluatePosition(game.fen(), 20);
      engine.onMessage(({ bestMove }: StockfishResponse) => {
        if (bestMove) {
          game.get(bestMove.substring(0, 2) as Square);
          console.log(game.get(bestMove.substring(0, 2) as Square));
          setBm(bestMove);
        }
      });

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
    setBoardState("start");
  };

  return (
    <div>
      <div className="absolute top-8 text-lg">{bm}</div>
      <ChessBoard width={800} position={boardState} onDrop={onDrop} />
      {boardState === "start" ? (
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
      {gameStatus === "" ? "" : <div>Game Over! {}</div>}
    </div>
  );
};

export default Board;
