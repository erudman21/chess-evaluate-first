import {
  Card,
  CardBody,
  Stack,
  Heading,
  Text,
  CardFooter,
  Button,
} from "@chakra-ui/react";
import { LichessResponse } from "../generated/graphql";
import { format } from "date-fns";

const GameCard = ({ game }: { game: LichessResponse }) => {
  const whitePlayer = game.players.white;
  const blackPlayer = game.players.black;
  const formattedDate = new Date(game.date).toLocaleDateString();

  return (
    <Card direction={{ base: "column", sm: "row" }} variant="outline">
      <Stack>
        <CardBody className="text-left">
          <Heading size="md" className="flex">
            {whitePlayer.name}({whitePlayer.rating}) vs. {blackPlayer.name}(
            {blackPlayer.rating})
          </Heading>
          <Text>Played on {formattedDate}</Text>
          <Text>{game.winner} won</Text>
          <Text>Game type: {game.speed}</Text>
          <Text>{game.moves}</Text>
        </CardBody>

        <CardFooter>
          <Button className="bg-teal-500" variant="solid">
            Analyze Game
          </Button>
        </CardFooter>
      </Stack>
    </Card>
  );
};

export default GameCard;
