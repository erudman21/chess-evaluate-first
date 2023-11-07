import { Button } from "@chakra-ui/react";
import { Dispatch, SetStateAction, useState } from "react";
import { LichessResponse } from "../generated/graphql";
import GameCard from "./GameCard";
import { ChessBoardProps } from "./chess/Board";

type GamesDisplayProps = Partial<ChessBoardProps> & {
  games: any;
  setGames: Dispatch<SetStateAction<LichessResponse[]>>;
};

const GamesDisplay: React.FC<GamesDisplayProps> = ({
  games,
  setGames,
  ...props
}) => {
  const [isAnalyzing, setAnalyzing] = useState(-1);

  return (
    <div className="relative">
      <Button
        className="absolute right-0 -top-12 bg-blue-400"
        onClick={() => setGames([])}
      >
        Back
      </Button>
      <div className="overflow-y-scroll h-[650px] px-10 space-y-5">
        {games.map((lcGame: LichessResponse, i: number) => {
          if (
            lcGame.players.black.name === "" ||
            lcGame.players.white.name === ""
          )
            return "";
          else
            return (
              <GameCard
                isAnalyzing={isAnalyzing}
                setAnalyzing={setAnalyzing}
                key={i}
                index={i}
                lcGame={lcGame}
                {...props}
              />
            );
        })}
      </div>
    </div>
  );
};

export default GamesDisplay;
