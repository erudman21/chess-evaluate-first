import { NavBar } from "./NavBar";
import Board from "./chess/Board";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-slate-500">
      <NavBar />
      <Board />
    </main>
  );
}
