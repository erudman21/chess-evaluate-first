"use client";

import { Flex } from "@chakra-ui/react";
import { Metadata } from "next";
import React from "react";
import {
  MeDocument,
  useLogoutMutation,
  useMeQuery,
} from "../generated/graphql";
import LoggedInDisplay from "./LoggedInDisplay";
import NotLoggedInDisplay from "./NotLoggedInDisplay";
import { ChessBoardProps } from "./chess/Board";

type LeftDisplayProps = ChessBoardProps & {};

export const metadata: Metadata = {
  title: "Chessalyze",
};

export const LeftDisplay: React.FC<LeftDisplayProps> = ({
  boardState,
  game,
  setBoardState,
}) => {
  const { data, loading } = useMeQuery();
  const [logout] = useLogoutMutation({
    refetchQueries: [MeDocument],
  });
  let body = null;

  if (!data?.me) {
    body = <NotLoggedInDisplay />;
  } else if (data.me) {
    body = (
      <LoggedInDisplay
        user={data.me}
        boardState={boardState}
        game={game}
        setBoardState={setBoardState}
      />
    );
  }

  return (
    <Flex w={800} h={800} flexGrow={1} mr={5}>
      {body}
    </Flex>
  );
};
