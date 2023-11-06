import { Button, Heading } from "@chakra-ui/react";
import NextLink from "next/link";
import { useState } from "react";
import { MeDocument, useLogoutMutation } from "../generated/graphql";
import GamesDisplay from "./GamesDisplay";
import LoadLichessForm from "./LoadLichessForm";
import { ChessBoardProps } from "./chess/Board";

type LoggedInDisplayProps = Partial<ChessBoardProps> & {
  user: {
    __typename?: "User" | undefined;
    id: number;
    username: string;
  };
};

const LoggedInDisplay: React.FC<LoggedInDisplayProps> = ({
  user,
  ...props
}) => {
  const [logout] = useLogoutMutation({
    refetchQueries: [MeDocument],
  });

  const [games, setGames] = useState([] as any);

  return (
    <div className="flex-grow text-center space-y-5 h-full w-full relative">
      <div className="sticky">
        <NextLink href="/">
          <Heading as="h1" size="3xl">
            Chessalyze
          </Heading>
        </NextLink>
      </div>
      {games.length === 0 ? (
        <LoadLichessForm setGames={setGames} />
      ) : (
        <GamesDisplay games={games} {...props} />
      )}
      <Button
        className="bg-red-300 absolute bottom-0"
        onClick={async () => {
          await logout();
        }}
      >
        Logout
      </Button>
    </div>
  );
};

export default LoggedInDisplay;
