import HomePage from "./HomePage";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <NavBar />
      <HomePage />
    </main>
  );
}
