import { NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export async function GET(request: NextRequest) {
  // Access the params from the request context directly
  const id = request.nextUrl.pathname.split('/').pop() as string;

  const surahId = parseInt(id, 10);

  if (isNaN(surahId)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  const filePath = path.join(process.cwd(), `src/data/quran/surahs/surah-${surahId}.json`)

  try {
    const data = fs.readFileSync(filePath, 'utf8')
    return NextResponse.json(JSON.parse(data))
  } catch (error) {
    return NextResponse.json({
      status: 404,
      statusText: "Not Found",
      message: `Surah ${id} not found`
    }, { status: 404 })
  }
}
