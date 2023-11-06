import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Flex,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Dispatch, SetStateAction, useState } from "react";
import { LichessResponse } from "../generated/graphql";
import { ChessBoardProps } from "./chess/Board";

type GameCardProps = Partial<ChessBoardProps> & {
  lcGame: LichessResponse;
  index: number;
  isAnalyzing: number;
  setAnalyzing: Dispatch<SetStateAction<number>>;
};

const GameCard: React.FC<GameCardProps> = ({
  lcGame,
  boardState,
  game,
  setBoardState,
  index,
  isAnalyzing,
  setAnalyzing,
}) => {
  const [gameHistory, setGameHistory] = useState([] as string[]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const loadGameOnBoard = () => {
    game?.loadPgn(lcGame.moves);
    setBoardState!(game!.fen());
    setGameHistory(game!.history());
    setHistoryIndex(game!.history().length);
    setAnalyzing(index);
  };

  const makeMove = () => {
    if (historyIndex < gameHistory.length) {
      console.log(historyIndex);
      console.log(gameHistory);
      game?.move(gameHistory[historyIndex]);
      setBoardState!(game!.fen());
      setHistoryIndex(historyIndex + 1);
    }
  };

  const undoMove = () => {
    if (historyIndex > 0) {
      game?.undo();
      setBoardState!(game!.fen());
      setHistoryIndex(historyIndex - 1);
    }
  };

  const whitePlayer = lcGame.players.white;
  const blackPlayer = lcGame.players.black;
  const formattedDate = new Date(lcGame.date).toLocaleDateString();
  return (
    <Card direction={{ base: "column", sm: "row" }} variant="outline">
      <Stack>
        <CardBody className="text-left">
          <Heading size="md" className="flex">
            {whitePlayer.name}({whitePlayer.rating}) vs. {blackPlayer.name}(
            {blackPlayer.rating})
          </Heading>
          <Text>Played on {formattedDate}</Text>
          {lcGame.winner === null ? (
            <Text>Game ended in a draw</Text>
          ) : (
            <Text>{lcGame.winner} won</Text>
          )}
          <Text>Game type: {lcGame.speed}</Text>
          <Text>{lcGame.moves}</Text>
        </CardBody>

        <CardFooter>
          <Button
            className="bg-teal-500"
            variant="solid"
            onClick={loadGameOnBoard}
          >
            Analyze Game
          </Button>
          {isAnalyzing === index && (
            <Flex className="w-full justify-end space-x-4">
              <Button
                className="bg-gray-200"
                variant="solid"
                onClick={undoMove}
                isDisabled={historyIndex <= 0}
              >
                Previous Move
              </Button>
              <Button
                className="bg-yellow-200"
                variant="solid"
                onClick={makeMove}
                isDisabled={historyIndex >= gameHistory.length}
              >
                Next Move
              </Button>
            </Flex>
          )}
        </CardFooter>
      </Stack>
    </Card>
  );
};

export default GameCard;
