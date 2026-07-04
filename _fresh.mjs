import { execSync } from 'child_process';
import { rmSync, existsSync } from 'fs';
const cwd = 'C:/Users/Revision-Extra/Documents/synapsex';

// Clean
console.log('Cleaning node_modules and package-lock...');
if (existsSync(cwd + '/node_modules')) rmSync(cwd + '/node_modules', { recursive: true, force: true });
if (existsSync(cwd + '/package-lock.json')) rmSync(cwd + '/package-lock.json');

// Fresh install
console.log('Running npm install...');
execSync('npm install', { cwd, stdio: 'inherit' });
console.log('npm install succeeded!');
