import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col w-full h-dvh items-center justify-center">
      <div className="w-full h-full flex flex-col justify-center items-center gap-4 bg-emerald-500 p-2">
        <h1 className="text-6xl font-bold text-center text-white">Al-Qur'an</h1>
        <p className="text-center text-neutral-300">Platform Al-Qur'an dan Hadist Digital.</p>
        <p className="text-center text-neutral-300">APIs from <a
          href="https://quran-api.santrikoding.com"
          className="hover:underline"
          target="_blank"
        >Santri Koding Al-Qur'an API</a></p>
        <div className="flex gap-2 w-full md:w-1/2 justify-center">
          <Link
            href="/quran"
            className="w-40 h-12 bg-emerald-600 rounded-full shadow-lg flex justify-center items-center text-white font-semibold"
          >
            Al-Qur'an
          </Link>
          <Link
            href="/hadist"
            className="w-40 h-12 bg-neutral-100 rounded-full shadow-lg flex justify-center items-center text-emerald-500 font-semibold"
          >
            Hadits
          </Link>
        </div>
      </div>
    </div>
  );
}
