import Link from "next/link";

export default function Custom404() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-6xl font-bold">404 - Page Not Found</h1>
      <p className="text-gray-600 mt-4">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link href="/" className="text-violet-500 text-xl hover:font-bold mt-8">
        Go back to the home
      </Link>
    </div>
  );
}
