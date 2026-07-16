// migrate-signatures.js
//
// Usage:
//   node migrate-signatures.js ./signatures
//
// Migrates old fixed-size (800x300) signature SVGs to tightly-cropped SVGs.

import fs from "fs";
import path from "path";

const PADDING = 8;

const directory = process.argv[2];

if (!directory) {
  console.error("Usage: node migrate-signatures.js <directory>");
  process.exit(1);
}

function migrateSVG(svg) {
  // Find every number inside path d="" attributes.
  const pathRegex = /d="([^"]+)"/g;

  const paths = [];

  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  let match;

  while ((match = pathRegex.exec(svg))) {
    const d = match[1];

    const tokens = d.match(/[ML]|-?\d*\.?\d+/g);

    if (!tokens) continue;

    const parsed = [];

    for (let i = 0; i < tokens.length; ) {
      const token = tokens[i];

      if (token === "M" || token === "L") {
        const x = Number(tokens[i + 1]);
        const y = Number(tokens[i + 2]);

        parsed.push({
          cmd: token,
          x,
          y,
        });

        minX = Math.min(minX, x);
        minY = Math.min(minY, y);

        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);

        i += 3;
      } else {
        i++;
      }
    }

    paths.push(parsed);
  }

  if (!paths.length) return svg;

  const width = maxX - minX + PADDING * 2;
  const height = maxY - minY + PADDING * 2;

  let pathIndex = 0;

  svg = svg.replace(pathRegex, () => {
    const commands = paths[pathIndex++];

    const d = commands
      .map(({ cmd, x, y }) => {
        const nx = (x - minX + PADDING).toFixed(2);
        const ny = (y - minY + PADDING).toFixed(2);

        return `${cmd} ${nx} ${ny}`;
      })
      .join(" ");

    return `d="${d}"`;
  });

  // Replace width
  svg = svg.replace(/width="[^"]+"/, `width="${width.toFixed(2)}"`);

  // Replace height
  svg = svg.replace(/height="[^"]+"/, `height="${height.toFixed(2)}"`);

  // Replace viewBox
  svg = svg.replace(/viewBox="[^"]+"/, `viewBox="0 0 ${width.toFixed(2)} ${height.toFixed(2)}"`);

  return svg;
}

const files = fs.readdirSync(directory).filter((f) => f.toLowerCase().endsWith(".svg"));

for (const file of files) {
  const full = path.join(directory, file);

  const oldSvg = fs.readFileSync(full, "utf8");
  const newSvg = migrateSVG(oldSvg);

  fs.writeFileSync(full, newSvg);

  console.log(`✓ ${file}`);
}

console.log(`\nConverted ${files.length} SVG(s).`);
