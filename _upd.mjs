import { execSync } from 'child_process';
import { unlinkSync, existsSync } from 'fs';
const cwd = 'C:/Users/Revision-Extra/Documents/synapsex';

// 1. Remove stray ossutil.exe
const oss = cwd + '/ossutil.exe';
if (existsSync(oss)) { unlinkSync(oss); console.log('Removed ossutil.exe'); }

// 2. Git commit & push
execSync('git add -A', { cwd });
try {
  execSync('git commit -m "Update: mobile video ping-pong loop, logo optimized, deps upgraded"', { cwd });
  console.log('Committed');
} catch (e) {
  console.log('Commit note:', e.message.split('\n')[0]);
}
execSync('git push origin main', { cwd });
console.log('Pushed to GitHub');
