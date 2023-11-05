export const formatLichessResponse = (data: any) => {
  return data.map((game: any) => {
    const whitePlayer =
      "user" in game.players.white
        ? {
            name: game.players.white.user.name,
            rating: game.players.white.rating,
          }
        : { name: "", rating: "" };
    const blackPlayer =
      "user" in game.players.black
        ? {
            name: game.players.black.user.name,
            rating: game.players.black.rating,
          }
        : { name: "", rating: "" };

    let moveNum = 1;
    const moves = game.moves.split(" ").flatMap((move: string, i: number) => {
      return (i + 1) % 2 !== 0 ? [`${moveNum++}.`, move] : move;
    });
    if (game.winner === "black") {
      moves.push("0-1");
    } else if (game.winner === "white") {
      moves.push("1-0");
    } else {
      moves.push("1/2-1/2");
    }

    return {
      speed: game.speed,
      date: new Date(game.createdAt),
      players: {
        white: whitePlayer,
        black: blackPlayer,
      },
      winner: game.winner,
      moves: moves.join(" "),
    };
  });
};
