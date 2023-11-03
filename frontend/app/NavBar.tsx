"use client";

import NextLink from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import {
  MeDocument,
  useLogoutMutation,
  useMeQuery,
} from "../generated/graphql";
import { Metadata } from "next";
import { Button, Heading, ModalHeader } from "@chakra-ui/react";
import AuthForm from "./authForm";

interface NavBarProps {}

export const metadata: Metadata = {
  title: "Chessalyze",
};

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const router = useRouter();
  const { data, loading: meLoading, error: meError } = useMeQuery();
  const [logout] = useLogoutMutation({
    refetchQueries: [MeDocument],
  });
  let body = null;

  if (!data?.me) {
    body = <AuthForm />;
  } else if (data.me) {
    body = (
      <>
        <div>{data.me.username}</div>
        <button
          onClick={async () => {
            await logout();
          }}
        >
          Logout
        </button>
      </>
    );
  }

  return (
    <div className="flex-grow text-center space-y-5">
      <NextLink href="/">
        <Heading as="h1" size="3xl">
          Chessalyze
        </Heading>
      </NextLink>
      <div>{body}</div>
    </div>
  );
};
