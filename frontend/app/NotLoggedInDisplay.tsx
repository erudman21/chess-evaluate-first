import NextLink from "next/link";
import { Heading } from "@chakra-ui/react";
import AuthForm from "./AuthForm";

const NotLoggedInDisplay = () => {
  return (
    <div className="flex-grow content-center text-center space-y-5 h-full">
      <NextLink href="/">
        <Heading as="h1" size="3xl">
          Chessalyze
        </Heading>
      </NextLink>
      <AuthForm />
    </div>
  );
};

export default NotLoggedInDisplay;
