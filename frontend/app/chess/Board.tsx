import { Button } from "@chakra-ui/react";
import { Chess } from "chess.js";
import ChessBoard from "chessboardjsx";
import { Dispatch, SetStateAction, useState } from "react";
import Engine from "./Engine";
import EngineComponent from "./EngineComponent";

export type ChessBoardProps = {
  setBoardState: Dispatch<SetStateAction<string>>;
  boardState: string;
  game: Chess;
  engine: Engine;
};

const Board: React.FC<ChessBoardProps> = ({
  game,
  boardState,
  setBoardState,
  engine,
}) => {
  const [gameStatus, setGameStatus] = useState("");
  const [evaluation, setEvaluation] = useState(0);
  const [continuation, setContinuation] = useState("");

  const onDrop = ({ sourceSquare, targetSquare }: any) => {
    try {
      let move = game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: "q",
      });
      if (move === null) return;

      setBoardState(game.fen());

      engine.evaluatePosition(game.fen());

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
    setEvaluation(0);
    setContinuation("");
  };

  return (
    <div className="relative">
      <EngineComponent
        engine={engine}
        game={game}
        evaluation={evaluation}
        setEvaluation={setEvaluation}
        continuation={continuation}
        setContinuation={setContinuation}
      />
      <ChessBoard width={800} position={boardState} onDrop={onDrop} />
      {boardState === "start" ? (
        ""
      ) : (
        <Button
          backgroundColor="red"
          className="bg-red-400 mt-5 right-0 absolute -bottom-12"
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
