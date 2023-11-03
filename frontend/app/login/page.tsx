"use client";

import { Form, Formik } from "formik";
import React from "react";
import {
  MeDocument,
  useLoginMutation,
  useLogoutMutation,
} from "../../generated/graphql";
import { InputField } from "../components/InputField";
import { Box, Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { toErrorMap } from "../utils/toErrorMap";

type LoginProps = {};

const Login: React.FC<LoginProps> = ({}) => {
  const [login] = useLoginMutation({
    refetchQueries: [{ query: MeDocument }],
  });
  const [logout] = useLogoutMutation({
    refetchQueries: [{ query: MeDocument }],
  });
  const router = useRouter();

  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      onSubmit={async ({ username, password }, { setErrors }) => {
        const { data } = await login({
          variables: {
            loginInput: {
              username,
              password,
            },
          },
        });
        if (data?.login.errors) {
          setErrors(toErrorMap(data.login.errors));
        } else if (data?.login.user) {
          console.log(data?.login.user);
          router.push("/");
        }
      }}
    >
      {({ isSubmitting, dirty }) => (
        <Form className="space-y-8 mt-8">
          <Box mt={4}>
            <InputField
              name="username"
              placeholder="username"
              label="username"
              autoFocus
            />
            <InputField
              name="password"
              type="password"
              placeholder="password"
              label="password"
            />
            <Button
              disabled={isSubmitting || !dirty}
              type="submit"
              className={`button-default flex mt-16 w-full relative ${
                dirty ? "button-default-enabled" : "button-default-disabled"
              }`}
            >
              Log In
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default Login;
