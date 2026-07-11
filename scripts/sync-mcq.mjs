import fs from "node:fs";
import path from "node:path";

const portfolioRoot = process.cwd();
const sourcePath = process.env.MCQ_PATH
  ? path.resolve(portfolioRoot, process.env.MCQ_PATH)
  : path.resolve(portfolioRoot, "..", "mcq");
const outputPath = path.resolve(portfolioRoot, "public", "mcq-trainer");

const FILES = [
  "index.html",
  "style.css",
  "manifest.json",
  "sw.js",
  "sources_index.json",
  "questions_template.json",
];
const DIRS = ["images", "js"];

function copyRecursive(source, destination) {
  if (!fs.existsSync(source)) {
    throw new Error(`Source does not exist: ${source}`);
  }
  fs.mkdirSync(destination, { recursive: true });
  for (const entry of fs.readdirSync(source, { withFileTypes: true })) {
    const s = path.join(source, entry.name);
    const d = path.join(destination, entry.name);
    if (entry.isDirectory()) copyRecursive(s, d);
    else fs.copyFileSync(s, d);
  }
}

if (!fs.existsSync(sourcePath)) {
  console.log(`[sync-mcq] Source not found at ${sourcePath}. Skipping sync.`);
  process.exit(0);
}

console.log(`[sync-mcq] Syncing MCQ from ${sourcePath} → ${outputPath}`);

fs.rmSync(outputPath, { recursive: true, force: true });
fs.mkdirSync(outputPath, { recursive: true });

let copied = 0;

for (const f of FILES) {
  const s = path.join(sourcePath, f);
  if (fs.existsSync(s)) {
    fs.copyFileSync(s, path.join(outputPath, f));
    copied++;
  } else {
    console.warn(`[sync-mcq] missing optional file: ${f}`);
  }
}

const qFiles = fs
  .readdirSync(sourcePath)
  .filter((f) => /^q_.*\.json$/i.test(f) && fs.statSync(path.join(sourcePath, f)).isFile());
for (const f of qFiles) {
  fs.copyFileSync(path.join(sourcePath, f), path.join(outputPath, f));
  copied++;
}

for (const d of DIRS) {
  const s = path.join(sourcePath, d);
  if (fs.existsSync(s)) {
    copyRecursive(s, path.join(outputPath, d));
    copied++;
  }
}

console.log(`[sync-mcq] Synced ${copied} entries into ${path.relative(portfolioRoot, outputPath)}/`);

// Clean up source if it lives inside our workspace (CI checkout)
const relative = path.relative(portfolioRoot, sourcePath);
if (relative && !relative.startsWith("..") && !path.isAbsolute(relative)) {
  fs.rmSync(sourcePath, { recursive: true, force: true });
  console.log(`[sync-mcq] Cleaned up source checkout at ${sourcePath}`);
}
