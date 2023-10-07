"use client";

import { Form, Formik } from "formik";
import React from "react";
import { MeDocument, useLoginMutation } from "../../generated/graphql";
import TextInput from "../FormUtils/TextInput";

type LoginProps = {};

const Login: React.FC<LoginProps> = ({}) => {
  const [login] = useLoginMutation({
    refetchQueries: [MeDocument],
  });

  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      onSubmit={async (values, { setErrors }) => {
        const { data } = await login({
          variables: {
            loginInput: values,
          },
        });
        if (data?.login.errors) {
          const errors: Record<string, string> = {};
          data.login.errors.forEach(
            (error) => (errors[error.field] = error.message)
          );
          setErrors(errors);
        }
      }}
    >
      {({ isSubmitting, dirty }) => (
        <Form className="space-y-8 mt-8">
          <TextInput name="username" autoFocus />
          <TextInput name="password" type="password" />
          <div>
            <button
              disabled={isSubmitting || !dirty}
              type="submit"
              className={`button-default flex mt-16 w-full relative ${
                dirty ? "button-default-enabled" : "button-default-disabled"
              }`}
            >
              Log In
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default Login;
