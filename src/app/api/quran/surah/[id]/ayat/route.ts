import { NextResponse, NextRequest } from "next/server";
import fs from 'fs';
import path from 'path';

export async function GET(request: NextRequest) {
  const url = new URL(request.nextUrl.href);
  const id = url.pathname.split('/')[4] as string;
  const start = parseInt(url.searchParams.get('start') || '1', 10);
  const end = parseInt(url.searchParams.get('end') || '10', 10);

  const surahId = parseInt(id, 10);

  if (isNaN(surahId)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  if (start < 1 || end < 1 || start > end) {
    return NextResponse.json({ error: "Invalid start or end" }, { status: 400 });
  }

  const filePath = path.join(process.cwd(), `src/data/quran/surahs/surah-${surahId}.json`);

  try {
    const data = await fs.promises.readFile(filePath, 'utf8');
    const surah = JSON.parse(data);
    const ayat = surah.ayat.slice(start - 1, end);
    return NextResponse.json(ayat);
  } catch (error) {
    return NextResponse.json({
      status: 404,
      statusText: "Not Found",
      message: `Surah ${id} not found`
    }, { status: 404 });
  }
}
