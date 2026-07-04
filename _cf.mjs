import { execSync } from 'child_process';
const cwd = 'C:/Users/Revision-Extra/Documents/synapsex';
execSync('git add -A', { cwd });
execSync('git commit -m "Add Cloudflare Pages config files"', { cwd });
execSync('git push origin main', { cwd });
console.log('Pushed!');
