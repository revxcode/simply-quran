import Link from "next/link";

export default function Home() {
<<<<<<< HEAD
  // Landing Page Al-Qur'an
  return (
    <div className="flex w-full min-h-screen bg-emerald-500 items-center justify-center">
      <div className="flex flex-col gap-4">
        <h1 className="text-6xl font-bold text-center">Al-Qur'an</h1>
        <p className="text-center text-neutral-200">Platform Al-Qur'an Digital by RevXcode.</p>
        <p className="text-center text-neutral-200">APIs from <a
=======
  return (
    <div className="flex flex-col w-full h-dvh items-center justify-center">
      <div className="w-full h-full flex flex-col justify-center items-center gap-4 bg-emerald-500 p-2">
        <h1 className="text-6xl font-bold text-center text-white">Al-Qur'an</h1>
        <p className="text-center text-neutral-300">Platform Al-Qur'an dan Hadist Digital.</p>
        <p className="text-center text-neutral-300">APIs from <a
>>>>>>> edb4c35 (Simple platform Al-Qur'an and Hadist)
          href="https://quran-api.santrikoding.com"
          className="hover:underline"
          target="_blank"
        >Santri Koding Al-Qur'an API</a></p>
<<<<<<< HEAD
        <div className="flex gap-2 w-full justify-between">
          <Link
            href="/quran"
            className="w-full h-12 bg-emerald-400 rounded-full shadow-lg flex justify-center items-center hover:bg-emerald-600"
=======
        <div className="flex gap-2 w-full md:w-1/2 justify-center">
          <Link
            href="/quran"
            className="w-40 h-12 bg-emerald-600 rounded-full shadow-lg flex justify-center items-center
            text-white font-semibold"
>>>>>>> edb4c35 (Simple platform Al-Qur'an and Hadist)
          >Al-Qur'an
          </Link>
          <Link
            href="/hadist"
<<<<<<< HEAD
            className="w-full h-12 bg-neutral-100 rounded-full shadow-lg flex justify-center items-center hover:bg-neutral-200 text-emerald-500"
=======
            className="w-40 h-12 bg-neutral-100 rounded-full shadow-lg flex justify-center items-center
            text-emerald-500 font-semibold"
>>>>>>> edb4c35 (Simple platform Al-Qur'an and Hadist)
          >Hadits
          </Link>
        </div>
      </div>
    </div>
  );
}
