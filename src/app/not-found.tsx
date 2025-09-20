import Link from "next/link";

export default function NotFounde() {
  return (
    <section className="h-screen flex items-center justify-center">
      <div className="p-6 rounded-md text-center bg-yellow-200 w-fit font-bold shadow-sm">
        <div className="text-white text-3xl mb-5">Route page note found</div>
        <Link
          href="/login"
          className="px-2 py-1 bg-white text-yellow-200 hover:shadow-md transition-all rounded-md"
        >
          Go to login page
        </Link>
      </div>
    </section>
  );
}
