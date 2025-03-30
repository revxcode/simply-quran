import { NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"

interface SuratSelanjutnya {
  id: number;
  nomor: number;
  nama: string;
  nama_latin: string;
  jumlah_ayat: number;
  tempat_turun: string;
  arti: string;
  deskripsi: string;
  audio: string;
}

interface SuratSebelumnya {
  id: number;
  nomor: number;
  nama: string;
  nama_latin: string;
  jumlah_ayat: number;
  tempat_turun: string;
  arti: string;
  deskripsi: string;
  audio: string;
}

interface Surah {
  id: number;
  nomor: number;
  nama: string;
  jumlah_ayat: number;
  nama_latin: string;
  arti: string;
  tempat_turun: string;
  deskripsi: string;
  audio: string;
  surat_selanjutnya: SuratSelanjutnya;
  surat_sebelumnya: SuratSebelumnya;
}

export async function GET(request: NextRequest) {
  const id = request.nextUrl.pathname.split('/').pop() as string;

  const surahId = parseInt(id, 10);

  if (isNaN(surahId)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  const filePath = path.join(process.cwd(), `src/data/quran/surahs/surah-${surahId}.json`)

  try {
    const data = await fs.promises.readFile(filePath, 'utf8');
    const surah: Surah = JSON.parse(data);
    return NextResponse.json({
      id: surah.id,
      nomor: surah.nomor,
      nama: surah.nama,
      nama_latin: surah.nama_latin,
      jumlah_ayat: surah.jumlah_ayat,
      tempat_turun: surah.tempat_turun,
      arti: surah.arti,
      deskripsi: surah.deskripsi,
      audio: surah.audio,
      surat_selanjutnya: surah.surat_selanjutnya,
      surat_sebelumnya: surah.surat_sebelumnya
    },
      {
        status: 200,
        statusText: "OK",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        }
      });
  } catch (error) {
    return NextResponse.json({
      status: 404,
      statusText: "Not Found",
      message: `Surah ${id} not found`
    }, { status: 404 });
  }
}
