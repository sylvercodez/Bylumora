import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen items-center justify-center">
      <h1 className="text-4xl font-bold text-blue-600">Hello  Bylumora 👋</h1>

      <a
        href="/login"
        className="w-50  my-10 inline-block text-center bg-yellow-400 text-black font-medium py-4 rounded-md hover:bg-yellow-500 transition"
      >
        Login
      </a>
    </main>
  );
}