import { mkdir } from "node:fs/promises";
import QRCode from "qrcode";

const url = process.argv[2];
if (!url || !/^https?:\/\//.test(url)) {
  console.error("Usage: npm run qr -- https://your-domain.example");
  process.exit(1);
}

await mkdir("qr", { recursive: true });
await QRCode.toFile("qr/hmap-qr.png", url, { errorCorrectionLevel: "H", width: 1600, margin: 4 });
await QRCode.toFile("qr/hmap-qr.svg", url, { errorCorrectionLevel: "H", margin: 4, type: "svg" });
console.log(`Created QR codes in qr/ for ${url}`);
