import axios from "axios";

const LICHESS_BASE_URL = "https://lichess.org/api";

const headers = {
  Authorization: "Bearer " + process.env.LICHESS_TOKEN,
};

export const fetchLichessAPI = async (args: string) => {
  const games = await axios.get(LICHESS_BASE_URL + args, {
    headers,
  });
  return games.data;
};
