import { Select } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import { ChessBoardProps } from "./Board";
import { StockfishResponse } from "./Engine";
import { formatContinuation } from "./utils/engineUtils";

type EngineComponentProps = Partial<ChessBoardProps> & {
  evaluation: number;
  setEvaluation: Dispatch<SetStateAction<number>>;
  continuation: string;
  setContinuation: Dispatch<SetStateAction<string>>;
};

const EngineComponent: React.FC<EngineComponentProps> = ({
  engine,
  game,
  evaluation,
  setEvaluation,
  continuation,
  setContinuation,
}) => {
  engine!.onMessage(({ continuation, evaluation }: StockfishResponse) => {
    if (evaluation) {
      setEvaluation(evaluation);
    }

    if (continuation) {
      const shortenedContinuation =
        continuation.length <= 45
          ? continuation
          : `${continuation.substring(0, 45)}...`;
      const formattedContinuation = formatContinuation(
        shortenedContinuation,
        game!
      );
      setContinuation(formattedContinuation);
    }
  });

  return (
    <div className="absolute -top-8 text-lg w-full space-x-4">
      <span>Engine eval: {evaluation} </span>
      <span>Continuation: {continuation} </span>
      <div className="flex float-right">
        <span className="mr-1">Depth: </span>
        <Select
          width="55px"
          size="xs"
          onChange={(e) => engine?.setDepth(parseInt(e.target.value))}
          defaultValue={engine?.depth}
        >
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12">12</option>
          <option value="13">13</option>
          <option value="14">14</option>
          <option value="15">15</option>
          <option value="16">16</option>
          <option value="17">17</option>
          <option value="18">18</option>
          <option value="19">19</option>
          <option value="20">20</option>
        </Select>
      </div>
    </div>
  );
};

export default EngineComponent;
