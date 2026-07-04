import { execSync } from 'child_process';
const cwd = 'C:/Users/Revision-Extra/Documents/synapsex';
execSync('git remote add origin https://github.com/fangsao2012-netizen/manxing-gravity.git', { cwd });
execSync('git push -u origin master', { cwd });
console.log('Pushed successfully!');
