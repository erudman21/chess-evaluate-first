"use client";

import { Box, Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import React from "react";
import { useRegisterMutation } from "../../generated/graphql";
import { InputField } from "../components/InputField";
import { toErrorMap } from "../utils/toErrorMap";

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  const [register, { loading }] = useRegisterMutation();
  const router = useRouter();

  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      onSubmit={async ({ username, password }, { setErrors }) => {
        const response = await register({
          variables: {
            registerInput: {
              username,
              password,
            },
          },
        });
        if (response.data?.register.errors) {
          setErrors(toErrorMap(response.data.register.errors));
        } else if (response.data?.register.user) {
          router.push("/");
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <InputField name="username" placeholder="username" label="username" />
          <Box mt={4}>
            <InputField
              name="password"
              placeholder="password"
              label="password"
              type="password"
            />
          </Box>
          <Button
            mt={4}
            isLoading={isSubmitting}
            type="submit"
            colorScheme="blue"
            variant="solid"
            textColor="Black"
          >
            Register
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default Register;
