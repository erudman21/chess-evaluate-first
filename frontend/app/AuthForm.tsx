import { Field, Formik } from "formik";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  VStack,
} from "@chakra-ui/react";
import {
  MeDocument,
  useLoginMutation,
  useRegisterMutation,
} from "../generated/graphql";
import { toErrorMap } from "./utils/toErrorMap";

const AuthForm = () => {
  const [login] = useLoginMutation({
    refetchQueries: [MeDocument],
  });

  const [register] = useRegisterMutation({
    refetchQueries: [MeDocument],
  });

  return (
    <Flex align="center" justify="center">
      <Box bg="white" p={6} rounded="md" w={64}>
        <Formik
          initialValues={{
            username: "",
            password: "",
          }}
          onSubmit={(values) => {
            alert(JSON.stringify(values, null, 2));
          }}
        >
          {({ values, errors, touched, isSubmitting, setErrors }) => (
            <form>
              <VStack spacing={4} align="flex-start">
                <FormControl isInvalid={!!errors.username}>
                  <FormLabel htmlFor="username">Username</FormLabel>
                  <Field
                    as={Input}
                    id="username"
                    name="username"
                    type="username"
                    variant="filled"
                    validate={(value: any) => {
                      if (value.length < 1) return "No username provided";
                    }}
                  />
                  <FormErrorMessage>{errors.username}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.password && touched.password}>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Field
                    as={Input}
                    id="password"
                    name="password"
                    type="password"
                    variant="filled"
                    validate={(value: any) => {
                      if (value.length < 1) return "No password provided";
                    }}
                  />
                  <FormErrorMessage>{errors.password}</FormErrorMessage>
                </FormControl>
                <HStack className="w-full">
                  <Button
                    onClick={async () => {
                      const { data } = await login({
                        variables: {
                          loginInput: {
                            username: values.username,
                            password: values.password,
                          },
                        },
                      });

                      if (data?.login.errors) {
                        console.log(data.login.errors);
                        setErrors(toErrorMap(data.login.errors));
                      }
                    }}
                    width="full"
                    className="bg-green-400"
                  >
                    Login
                  </Button>
                  <Button
                    onClick={async () => {
                      const { data } = await register({
                        variables: {
                          registerInput: {
                            username: values.username,
                            password: values.password,
                          },
                        },
                      });

                      if (data?.register.errors) {
                        console.log(data.register.errors);
                        setErrors(toErrorMap(data.register.errors));
                      }
                    }}
                    width="full"
                    className="bg-purple-400"
                  >
                    Register
                  </Button>
                </HStack>
              </VStack>
            </form>
          )}
        </Formik>
      </Box>
    </Flex>
  );
};

export default AuthForm;
