import { execSync } from 'child_process';
import { unlinkSync, existsSync, readFileSync, writeFileSync, renameSync } from 'fs';
const cwd = 'C:/Users/Revision-Extra/Documents/synapsex';

// 1. 保留部署脚本，重命名
if (existsSync(cwd + '/_deploy2.mjs')) {
  try { unlinkSync(cwd + '/deploy-to-ecs.mjs'); } catch {}
  renameSync(cwd + '/_deploy2.mjs', cwd + '/deploy-to-ecs.mjs');
  console.log('保留 deploy-to-ecs.mjs');
}

// 2. 删除临时文件
['_ca.mjs','_inspect.mjs','_inspect2.mjs','_srv.mjs','_ecs.mjs','_oss.mjs','_keygen.mjs','_upd.mjs','_deploy_full.mjs','site.tar.gz','_deploy_ecs.mjs','_deploy_ecs.mjs'].forEach(f => {
  const p = cwd + '/' + f;
  if (existsSync(p)) { unlinkSync(p); console.log('删除 ' + f); }
});

// 3. 更新 .gitignore
const gi = cwd + '/.gitignore';
let content = readFileSync(gi, 'utf-8');
const adds = ['_deploy_key', '_deploy_key.pub', 'site.tar.gz'];
let changed = false;
for (const a of adds) {
  if (!content.includes(a)) { content += '\n' + a; changed = true; }
}
if (changed) { writeFileSync(gi, content); console.log('.gitignore 已更新'); }

// 4. Git 提交
execSync('git add -A', { cwd });
try {
  execSync('git commit -m "Add Dream Factory submenu link to navbar"', { cwd });
  console.log('已提交');
} catch (e) { console.log('提交:', e.message.split('\n')[0]); }
execSync('git push origin main', { cwd });
console.log('已推送 GitHub');
