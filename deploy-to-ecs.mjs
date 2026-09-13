import { Client } from 'ssh2';
import { readFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';

const cwd = 'C:/Users/Revision-Extra/Documents/synapsex';
const DIST = cwd + '/dist';
const KEY = readFileSync(cwd + '/_deploy_key');

function exec(conn, cmd) {
  return new Promise((ok, no) => {
    conn.exec(cmd, (e, s) => {
      if (e) return no(e);
      let o = '';
      s.on('data', d => o += d.toString());
      s.stderr.on('data', d => o += d.toString());
      s.on('close', () => ok(o));
    });
  });
}

function walk(dir, base = '') {
  const out = [];
  for (const i of readdirSync(dir, { withFileTypes: true })) {
    const f = join(dir, i.name);
    const rel = base ? `${base}/${i.name}` : i.name;
    if (i.isDirectory()) out.push(...walk(f, rel));
    else out.push({ local: f, rel });
  }
  return out;
}

const conn = new Client();
try {
  await new Promise((ok, no) => conn.on('ready', ok).on('error', no).connect({
    host: '112.124.5.25', username: 'dreamops', privateKey: KEY,
  }));
  console.log('✓ SSH 登录成功 (dreamops)\n');

  console.log('1. 备份现有首页...');
  const b = await exec(conn, 'ts=$(date +%Y%m%d-%H%M%S); sudo mkdir -p /root/www-backup-$ts && sudo cp -a /var/www/html/index.html /root/www-backup-$ts/ && echo "已备份到 /root/www-backup-$ts" && sudo ls -la /root/www-backup-$ts/');
  console.log(b);

  console.log('2. 上传新文件到临时目录...');
  const sftp = await new Promise((ok, no) => conn.sftp((e, s) => e ? no(e) : ok(s)));
  const files = walk(DIST);
  await exec(conn, 'rm -rf /tmp/mxg-deploy && mkdir -p /tmp/mxg-deploy');
  for (const f of files) {
    const remote = '/tmp/mxg-deploy/' + f.rel;
    await new Promise((ok, no) => sftp.mkdir(dirname(remote), { recursive: true }, () => ok()));
    await new Promise((ok, no) => sftp.fastPut(f.local, remote, e => e ? no(e) : ok()));
    console.log('  ✓ ' + f.rel);
  }

  console.log('\n3. 部署到 /var/www/html ...');
  const d = await exec(conn, 'sudo cp -r /tmp/mxg-deploy/. /var/www/html/ && sudo chmod -R a+rX /var/www/html/ && echo "复制完成"');
  console.log(d);

  console.log('4. 验证...');
  const v = await exec(conn, 'echo "--- 首页标题 ---"; curl -s -k https://localhost/ -H "Host: www.manxinggravity.com" | grep -o "<title>.*</title>"; echo "--- 梦工厂页 ---"; curl -s -k -o /dev/null -w "%{http_code}" https://localhost/dream-factory/download/ -H "Host: www.manxinggravity.com"; echo ""; echo "--- 目录 ---"; sudo ls /var/www/html/');
  console.log(v);

  console.log('✅ 部署完成');
  conn.end();
} catch (e) {
  console.error('Error:', e.message || e);
  conn.end();
}
