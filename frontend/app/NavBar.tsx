"use client";

import NextLink from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { Metadata } from "next";
import { Button } from "@chakra-ui/react";

interface NavBarProps {}

export const metadata: Metadata = {
  title: "Chessalyze",
};

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const router = useRouter();
  const { data, loading: meLoading, error: meError } = useMeQuery();
  const [logoutMutation, { loading, error }] = useLogoutMutation({
    variables: {},
  });
  let body = null;

  if (!data?.me) {
    body = (
      <>
        <Button backgroundColor="teal">
          <NextLink href="login">Login</NextLink>
        </Button>
        <Button backgroundColor="blue">
          <NextLink href="register">Register</NextLink>
        </Button>
      </>
    );
  } else if (data.me) {
    body = (
      <>
        <div>{data.me.username}</div>
        <button
          onClick={async () => {
            await logoutMutation();
          }}
        >
          Logout
        </button>
      </>
    );
  }

  return (
    <div className="flex-grow text-center">
      <NextLink href="/">
        <h2>Chessalyze</h2>
      </NextLink>
      <div>{body}</div>
    </div>
  );
};
