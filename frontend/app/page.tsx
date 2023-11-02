"use client";

import { NavBar } from "./NavBar";
import Board from "./chess/Board";
import { setBoardState } from "./chess/utils/setBoardState";

export default function Home() {
  return (
    <main className="flex flex-row min-h-screen items-center p-10 bg-slate-300">
      <NavBar />
      <Board board={pieces} />
    </main>
  );
}
