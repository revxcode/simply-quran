import fs from "fs";
import path from "path";

const fetchMurottal = async ({ ayat, reciter }: { ayat: string, reciter: string }) => {
  if (!ayat) {
    console.error("No ayat provided");
    return;
  }

  if (ayat.length === 1) {
    ayat = `00${ayat}`;
  } else if (ayat.length === 2) {
    ayat = `0${ayat}`;
  } else {
    ayat = `${ayat}`;
  }

  const url = `https://podcasts.qurancentral.com/abdul-rahman-al-sudais/192/abdul-rahman-al-sudais-${ayat}-qurancentral.com-192.mp3`;

  try {
    // Fetch the audio file from the URL
    const response = await fetch(url);
    console.log(`Fetching ${ayat}.mp3...`);

    // Check if the response is successful
    if (!response.ok) {
      console.error(`Failed to fetch ${ayat}.mp3. HTTP status: ${response.status}`);
      return;
    }

    // Ensure the directory exists
    const dir = path.resolve('src', 'data', reciter, 'audio');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Define the path where the file will be saved
    const filePath = path.resolve(dir, `${ayat}.mp3`);

    // Create a write stream to save the audio file
    const writer = fs.createWriteStream(filePath);

    // Pipe the response body (audio stream) to the file
    if (response.body) {
      const stream = require('stream');
      const { promisify } = require('util');
      const pipeline = promisify(stream.pipeline);

      await pipeline(response.body, writer);
    } else {
      console.error(`Response body is null for ${ayat}.mp3`);
    }

    writer.on("finish", () => {
      console.log(`Downloaded and saved: ${ayat}.mp3`);
    });

    writer.on("error", (err) => {
      console.error(`Error downloading ${ayat}.mp3:`, err);
    });
  } catch (error) {
    console.error(`Error fetching ${ayat}.mp3:`, error);
  }
};

// Loop through ayat 1 to 114 and download each one
const downloadAllAudio = () => {
  for (let i = 1; i <= 114; i++) {
    fetchMurottal({ ayat: i.toString(), reciter: 'abdul-rahman-al-sudais' });
  }
  // fetchMurottal({ ayat: '050' });
};

downloadAllAudio();
