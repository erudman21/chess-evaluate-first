"use client";

import { NavBar } from "./NavBar";
import Board from "./chess/Board";

export default function Home() {
  return (
    <main className="flex flex-row min-h-screen items-center p-10 bg-slate-300">
      <NavBar />
      <Board />
    </main>
  );
}
