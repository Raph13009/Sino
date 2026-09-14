import { mkdir, readdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.join(process.cwd(), "public");

type Job = {
  input: string;
  output: string;
  maxWidth: number;
  quality: number;
};

async function walk(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(full)));
    else files.push(full);
  }
  return files;
}

async function optimize() {
  const files = await walk(path.join(ROOT, "images"));
  const jobs: Job[] = [];

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (![".jpg", ".jpeg", ".png", ".webp"].includes(ext)) continue;
    const rel = path.relative(ROOT, file);
    const isHero = rel.includes("/hero/");
    const isTeamWebp = rel.includes("/team/") && ext === ".webp";
    if (rel.includes("/team/") && ext === ".png") continue;

    jobs.push({
      input: file,
      output: file.replace(/\.(jpg|jpeg|png)$/i, ".webp"),
      maxWidth: isHero ? 1920 : isTeamWebp ? 900 : 1600,
      quality: 80,
    });
  }

  const brandWebps = [
    "brand/logo-light.webp",
    "brand/logo-dark.webp",
  ].map((rel) => path.join(ROOT, rel));

  for (const file of brandWebps) {
    jobs.push({
      input: file,
      output: file,
      maxWidth: 400,
      quality: 82,
    });
  }

  console.log("before -> after");
  for (const job of jobs) {
    const before = (await stat(job.input)).size;
    const image = sharp(job.input, { failOn: "none" }).rotate().resize({
      width: job.maxWidth,
      withoutEnlargement: true,
    });
    const { data, info } = await image
      .webp({ quality: job.quality, effort: 5 })
      .toBuffer({ resolveWithObject: true });
    await mkdir(path.dirname(job.output), { recursive: true });
    await writeFile(job.output, data);
    console.log(
      `${(before / 1024).toFixed(0)}KB -> ${(data.byteLength / 1024).toFixed(0)}KB  ${info.width}x${info.height}  ${path.relative(ROOT, job.output)}`,
    );
  }
}

optimize().catch((error) => {
  console.error(error);
  process.exit(1);
});
