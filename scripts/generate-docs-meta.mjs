import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const docsDir = path.join(process.cwd(), 'public', 'docs');
const metaPath = path.join(docsDir, 'meta.json');
const meta = {};

function scanDir(dir) {
  if (!fs.existsSync(dir)) return;
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    if (fs.statSync(fullPath).isDirectory()) {
      scanDir(fullPath);
    } else if (fullPath.endsWith('.html') || fullPath.endsWith('.htm')) {
      let dateString = null;
      try {
        // Fetch the timestamp of the commit that added or last modified this file
        // %aI = author date, strict ISO 8601 format
        const gitOutput = execSync(`git log -1 --format="%aI" -- "${fullPath}"`, { stdio: 'pipe' }).toString().trim();
        if (gitOutput) {
          dateString = gitOutput;
        }
      } catch (e) {
        // Git not available or file not in repo
      }

      if (!dateString) {
        dateString = fs.statSync(fullPath).mtime.toISOString();
      }
      
      const relPath = path.relative(docsDir, fullPath).replace(/\\/g, '/');
      meta[relPath] = {
        createdAt: dateString
      };
    }
  }
}

console.log('[Docs] Generating metadata for local files...');
scanDir(docsDir);
fs.writeFileSync(metaPath, JSON.stringify(meta, null, 2));
console.log(`[Docs] Generated meta.json with ${Object.keys(meta).length} entries.`);
