import { NextRequest, NextResponse } from "next/server";

const listReciters = [
  {
    id: 1,
    name: "Abdul Basit",
    code: "AbdulBasit",
    url: "https://podcasts.qurancentral.com/abdul-basit/#SURAH_ID.mp3",
  },
  {
    id: 2,
    name: "Mishary Rashid Alafasy",
    code: "Alafasy",
    url: "https://podcasts.qurancentral.com/mishary-rashid-alafasy/mishary-rashid-alafasy-#SURAH_ID-muslimcentral.com.mp3",
  },
  {
    id: 3,
    name: "Abdul Rahman Al-Sudais",
    code: "AlSudais",
    url: "https://podcasts.qurancentral.com/abdul-rahman-al-sudais/192/abdul-rahman-al-sudais-#SURAH_ID-qurancentral.com-192.mp3",
  },
  {
    id: 4,
    name: "Saad Al-Ghamdi",
    code: "SaadAlGhamdi",
    url: "https://podcasts.qurancentral.com/saad-al-ghamdi/saad-al-ghamdi-surah-#SURAH_ID.mp3",
  },
  {
    id: 5,
    name: "Abu Bakr Al-Shatri",
    code: "AbuBakrAlShatri",
    url: "https://podcasts.qurancentral.com/abu-bakr-al-shatri/abu-bakr-al-shatri-----#SURAH_ID.mp3",
  }
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const surahId = searchParams.get("surah");
  const reciterCode = searchParams.get("reciter");

  if (!surahId || !reciterCode) {
    return NextResponse.json({ error: "Missing surahId or reciterCode" }, { status: 400 });
  }

  const reciter = listReciters.find((r) => r.code === reciterCode);

  if (!reciter) {
    return NextResponse.json({ error: "Reciter not found" }, { status: 404 });
  }

  const audioUrl = reciter.url.replace("#SURAH_ID", surahId);

  return NextResponse.json({ audioUrl });
}