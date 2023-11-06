"use client";

import { Chess } from "chess.js";
import { useMemo, useState } from "react";
import { LeftDisplay } from "./LeftDisplay";
import Board from "./chess/Board";

export default function Home() {
  const game = useMemo(() => new Chess(), []);
  const [boardState, setBoardState] = useState("start");

  return (
    <main className="flex flex-row min-h-screen items-center p-10 bg-slate-300">
      <LeftDisplay
        boardState={boardState}
        game={game}
        setBoardState={setBoardState}
      />
      <Board
        boardState={boardState}
        game={game}
        setBoardState={setBoardState}
      />
    </main>
  );
}
