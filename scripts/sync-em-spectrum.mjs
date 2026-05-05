import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const portfolioRoot = process.cwd();
const sourcePath = process.env.EM_SPECTRUM_PATH
  ? path.resolve(portfolioRoot, process.env.EM_SPECTRUM_PATH)
  : path.resolve(portfolioRoot, "..", "EM_Spectrum", "em-spectrum");
const outputPath = path.resolve(portfolioRoot, "public", "em-spectrum");

function run(command, args, cwd, env = {}) {
  const result = spawnSync(command, args, {
    cwd,
    stdio: "inherit",
    shell: process.platform === "win32",
    env: { ...process.env, ...env },
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

function copyRecursive(source, destination) {
  if (!fs.existsSync(source)) {
    throw new Error(`Source does not exist: ${source}`);
  }

  fs.mkdirSync(destination, { recursive: true });

  for (const entry of fs.readdirSync(source, { withFileTypes: true })) {
    const sourceEntry = path.join(source, entry.name);
    const destinationEntry = path.join(destination, entry.name);

    if (entry.isDirectory()) {
      copyRecursive(sourceEntry, destinationEntry);
    } else {
      fs.copyFileSync(sourceEntry, destinationEntry);
    }
  }
}

if (!fs.existsSync(sourcePath)) {
  console.log(`[sync-em-spectrum] Source not found at ${sourcePath}. Skipping sync.`);
  process.exit(0);
}

console.log(`[sync-em-spectrum] Building EM Spectrum from ${sourcePath}`);
if (!fs.existsSync(path.join(sourcePath, "node_modules"))) {
  run("npm", ["ci"], sourcePath);
}
run("npm", ["run", "build"], sourcePath, { NEXT_PUBLIC_BASE_PATH: "/em-spectrum" });

const sourceOut = path.join(sourcePath, "out");
if (!fs.existsSync(sourceOut)) {
  console.error("[sync-em-spectrum] Build completed but out/ was not found.");
  process.exit(1);
}

fs.rmSync(outputPath, { recursive: true, force: true });
copyRecursive(sourceOut, outputPath);

console.log(`[sync-em-spectrum] Synced build into ${outputPath}`);

// Clean up source if it lives inside our workspace (CI checkout)
const relative = path.relative(portfolioRoot, sourcePath);
if (relative && !relative.startsWith("..") && !path.isAbsolute(relative)) {
  fs.rmSync(sourcePath, { recursive: true, force: true });
  console.log(`[sync-em-spectrum] Cleaned up source checkout at ${sourcePath}`);
}
