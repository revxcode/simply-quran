import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export async function GET() {
  const filePath = path.join(process.cwd(), `src/data/quran/quran.json`)

  try {
    const data = fs.readFileSync(filePath, 'utf8')
    return NextResponse.json(JSON.parse(data),
      {
        status: 200,
        statusText: "OK",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        }
      })
  } catch (error) {
    return NextResponse.json({
      status: 500,
      statusText: "Internal Server Error",
      body: "Error while fetching data"
    }, { status: 500 })
  }
}
