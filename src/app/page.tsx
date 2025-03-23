import Link from "next/link";

export default function Home() {
  // Landing Page Al-Qur'an
  return (
    <div className="flex w-full min-h-screen bg-emerald-500 items-center justify-center">
      <div className="flex flex-col gap-4">
        <h1 className="text-6xl font-bold text-center">Al-Qur'an</h1>
        <p className="text-center text-neutral-200">Platform Al-Qur'an Digital by RevXcode.</p>
        <p className="text-center text-neutral-200">APIs from <a
          href="https://quran-api.santrikoding.com"
          className="hover:underline"
          target="_blank"
        >Santri Koding Al-Qur'an API</a></p>
        <div className="flex gap-2 w-full justify-between">
          <Link
            href="/quran"
            className="w-full h-12 bg-emerald-400 rounded-full shadow-lg flex justify-center items-center hover:bg-emerald-600"
          >Al-Qur'an
          </Link>
          <Link
            href="/hadist"
            className="w-full h-12 bg-neutral-100 rounded-full shadow-lg flex justify-center items-center hover:bg-neutral-200 text-emerald-500"
          >Hadits
          </Link>
        </div>
      </div>
    </div>
  );
}
