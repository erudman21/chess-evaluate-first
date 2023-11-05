import { LichessResponse } from "../generated/graphql";
import GameCard from "./GameCard";

const GamesDisplay = ({ games }: any) => {
  console.log(games);
  return (
    <div className="overflow-y-scroll h-[650px] px-10 space-y-5">
      {games.map((game: LichessResponse, i: number) => {
        if (game.players.black.name === "" || game.players.white.name === "")
          return "";
        else return <GameCard key={i} game={game} />;
      })}
    </div>
  );
};

export default GamesDisplay;
