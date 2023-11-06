import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { Dispatch, SetStateAction } from "react";
import { LichessResponse, useGamesLazyQuery } from "../generated/graphql";

type LoadLichessFormProps = {
  setGames: Dispatch<SetStateAction<LichessResponse[]>>;
};

const LoadLichessForm = ({ setGames }: LoadLichessFormProps) => {
  const [loadGames, { loading }] = useGamesLazyQuery();

  return (
    <div className="flex justify-center">
      <Formik
        initialValues={{ username: "" }}
        onSubmit={async ({ username }) => {
          const { data, error } = await loadGames({
            variables: { username: username },
          });

          if (data) {
            setGames(data.games);
          } else {
            console.log(error);
          }
        }}
      >
        {(props) => (
          <Form>
            <div className="w-[500px]">
              <Field name="username">
                {({ field, form }: any) => (
                  <FormControl>
                    <FormLabel>Load games from lichess</FormLabel>
                    <Input
                      {...field}
                      className="bg-white w-full"
                      placeholder="lichess username"
                    />
                    <FormErrorMessage>{form.errors.username}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Button
                mt={4}
                className="w-full bg-teal-600"
                isLoading={loading}
                type="submit"
              >
                Load
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoadLichessForm;
