import { execSync } from 'child_process';
import { unlinkSync, existsSync } from 'fs';
const cwd = 'C:/Users/Revision-Extra/Documents/synapsex';

// Delete temp files locally
const tempFiles = ['_commit.mjs', '_fresh.mjs', '_push.mjs'];
tempFiles.forEach(f => {
  const p = cwd + '/' + f;
  if (existsSync(p)) unlinkSync(p);
});

// Remove from git tracking and recommit
execSync('git rm --cached _commit.mjs _fresh.mjs _push.mjs', { cwd });
execSync('git add -A', { cwd });
execSync('git commit -m "Cleanup: remove temp scripts"', { cwd });
execSync('git push origin main', { cwd });
console.log('Cleaned and pushed!');
