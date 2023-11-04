import axios from "axios";

const LICHESS_BASE_URL = "https://lichess.org/api";

const headers = {
  Authorization: "Bearer " + process.env.LICHESS_TOKEN,
  accept: "application/x-ndjson",
};

export const fetchLichessAPI = async (endpoint: string) => {
  const { data } = await axios.get(LICHESS_BASE_URL + endpoint, {
    params: {
      max: 20,
    },
    headers,
  });

  return data
    .split("\n")
    .slice(0, -1)
    .map((game: any) => JSON.parse(game));
};
