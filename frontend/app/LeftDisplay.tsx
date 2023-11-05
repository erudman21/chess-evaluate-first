"use client";

import React from "react";
import {
  MeDocument,
  useLogoutMutation,
  useMeQuery,
} from "../generated/graphql";
import { Metadata } from "next";
import { Box, Flex } from "@chakra-ui/react";
import NotLoggedInDisplay from "./NotLoggedInDisplay";
import LoggedInDisplay from "./LoggedInDisplay";

interface LeftDisplayProps {}

export const metadata: Metadata = {
  title: "Chessalyze",
};

export const LeftDisplay: React.FC<LeftDisplayProps> = ({}) => {
  const { data, loading } = useMeQuery();
  const [logout] = useLogoutMutation({
    refetchQueries: [MeDocument],
  });
  let body = null;

  if (!data?.me) {
    body = <NotLoggedInDisplay />;
  } else if (data.me) {
    body = <LoggedInDisplay user={data.me} />;
  }

  return (
    <Flex w={800} h={800} flexGrow={1} mr={5}>
      {body}
    </Flex>
  );
};
