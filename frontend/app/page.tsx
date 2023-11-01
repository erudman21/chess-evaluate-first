import { NavBar } from "./NavBar";
import Board from "./chess/Board";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    // setBoardState();
  });

  return (
    <main className="flex flex-row min-h-screen items-center p-10 bg-slate-300">
      <NavBar />
      <Board />
    </main>
  );
}
