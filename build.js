const fs = require("node:fs");
const path = require("node:path");

const root = __dirname;
const outDir = path.join(root, "dist");

const includePaths = [
  "index.html",
  "styles.css",
  "script.js",
  "README.md",
  "ai-dlya-prodazh",
  "ai-dlya-hr",
  "ai-audit-biznesa",
  "avtomatizaciya-prodazh",
  "ai-v-voronezhe"
];

function removeDir(target) {
  if (fs.existsSync(target)) {
    fs.rmSync(target, { recursive: true, force: true });
  }
}

function copyRecursive(source, destination) {
  const stat = fs.statSync(source);

  if (stat.isDirectory()) {
    fs.mkdirSync(destination, { recursive: true });
    for (const entry of fs.readdirSync(source)) {
      copyRecursive(path.join(source, entry), path.join(destination, entry));
    }
    return;
  }

  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.copyFileSync(source, destination);
}

removeDir(outDir);
fs.mkdirSync(outDir, { recursive: true });

for (const item of includePaths) {
  copyRecursive(path.join(root, item), path.join(outDir, item));
}

console.log(`Build completed: ${outDir}`);
