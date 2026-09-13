import { execSync } from 'child_process';
import { unlinkSync, existsSync, readdirSync } from 'fs';
const cwd = 'C:/Users/Revision-Extra/Documents/synapsex';

// 删除所有 _ 开头的临时脚本（保留 deploy-to-ecs.mjs 和 key）
const files = readdirSync(cwd);
for (const f of files) {
  if (f.startsWith('_') && f.endsWith('.mjs')) {
    unlinkSync(cwd + '/' + f);
    console.log('删除 ' + f);
  }
}

execSync('git add -A', { cwd });
try { execSync('git commit -m "Cleanup temp scripts"', { cwd }); } catch {}
execSync('git push origin main', { cwd });
console.log('done');
