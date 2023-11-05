import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import {
  LichessResponse,
  MeDocument,
  useLogoutMutation,
} from "../generated/graphql";
import NextLink from "next/link";
import { Heading } from "@chakra-ui/react";
import LoadLichessForm from "./LoadLichessForm";
import { useState } from "react";
import GamesDisplay from "./GamesDisplay";
import { populateFakeData } from "./utils/fakeData";

const LoggedInDisplay = ({ user }: any) => {
  const [logout] = useLogoutMutation({
    refetchQueries: [MeDocument],
  });

  const fakeGames = populateFakeData();

  const [games, setGames] = useState(fakeGames);

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
        <div>error</div>
      ) : (
        // <LoadLichessForm setGames={setGames} />
        <GamesDisplay games={fakeGames} />
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
