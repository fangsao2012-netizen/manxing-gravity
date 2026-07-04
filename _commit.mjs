import { execSync } from 'child_process';
const cwd = 'C:/Users/Revision-Extra/Documents/synapsex';
execSync('git add -A', { cwd });
execSync('git commit -m "Fix: upgrade lucide-react to v1.23.0 for React 19 compat"', { cwd });
execSync('git push origin main', { cwd });
console.log('Committed and pushed!');
