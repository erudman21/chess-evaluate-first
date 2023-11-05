"use client";

import { useState } from "react";
import { LeftDisplay } from "./LeftDisplay";
import Board from "./chess/Board";

export default function Home() {
  return (
    <main className="flex flex-row min-h-screen items-center p-10 bg-slate-300">
      <LeftDisplay />
      <Board />
    </main>
  );
}
