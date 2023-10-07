"use client";

import NextLink from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { Metadata } from "next";

interface NavBarProps {}

export const metadata: Metadata = {
  title: "Chessalyze",
};

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const router = useRouter();
  const { data } = useMeQuery();
  const [logoutMutation, { loading, error }] = useLogoutMutation({
    variables: {},
  });
  let body = null;

  if (!data?.me) {
    body = (
      <>
        <NextLink href="login">Login</NextLink>
        <NextLink href="register">Register</NextLink>
      </>
    );
  } else if (data.me) {
    body = (
      <div className="align-middle">
        <div>{data.me.username}</div>
        <button
          onClick={async () => {
            await logoutMutation();
          }}
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <div>
      <NextLink href="/">
        <h2>Chessalyze</h2>
      </NextLink>
      <div>{body}</div>
    </div>
  );
};
