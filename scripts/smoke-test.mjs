import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const hostname = '127.0.0.1';
const port = 3107;
const origin = `http://${hostname}:${port}`;
const nextCli = resolve(root, 'node_modules', 'next', 'dist', 'bin', 'next');
const routes = [
  '/',
  '/team',
  '/student-achievements',
  '/events/upcoming',
  '/events/past',
  '/funding',
  '/mentoring',
  '/magazine',
  '/gallery',
  '/contact',
];

let serverOutput = '';
const server = spawn(process.execPath, [nextCli, 'start', '--hostname', hostname, '--port', String(port)], {
  cwd: root,
  env: { ...process.env, NEXT_TELEMETRY_DISABLED: '1' },
  stdio: ['ignore', 'pipe', 'pipe'],
});

server.stdout.on('data', (chunk) => {
  serverOutput += chunk.toString();
});
server.stderr.on('data', (chunk) => {
  serverOutput += chunk.toString();
});

async function waitForServer() {
  for (let attempt = 0; attempt < 80; attempt += 1) {
    if (server.exitCode !== null) {
      throw new Error(`Production server exited before startup.\n${serverOutput}`);
    }
    try {
      const response = await fetch(origin);
      if (response.ok) return;
    } catch {
      // The server is still starting.
    }
    await new Promise((resolveDelay) => setTimeout(resolveDelay, 250));
  }
  throw new Error(`Timed out waiting for the production server.\n${serverOutput}`);
}

try {
  await waitForServer();

  for (const route of routes) {
    const response = await fetch(`${origin}${route}`);
    const html = await response.text();
    assert.equal(response.status, 200, `${route} returned ${response.status}`);
    assert.match(html, /<title>[^<]+<\/title>/, `${route} has no document title`);
    assert.match(html, /id="main-content"/, `${route} has no main-content landmark`);
    assert.doesNotMatch(html, /\/resources\/funding/, `${route} includes a dead funding link`);
  }

  for (const path of ['/manifest.webmanifest', '/robots.txt', '/sitemap.xml']) {
    const response = await fetch(`${origin}${path}`);
    assert.equal(response.status, 200, `${path} returned ${response.status}`);
  }

  const home = await fetch(origin);
  assert.match(
    home.headers.get('content-security-policy') ?? '',
    /default-src 'self'/,
    'Content Security Policy header is missing',
  );
  assert.equal(home.headers.get('x-content-type-options'), 'nosniff');

  const missing = await fetch(`${origin}/this-page-does-not-exist`);
  assert.equal(missing.status, 404);
  assert.match(await missing.text(), /Page not found/);

  console.log(`Smoke-tested ${routes.length} routes plus metadata and the custom 404.`);
} finally {
  server.kill('SIGTERM');
  await new Promise((resolveExit) => {
    if (server.exitCode !== null) {
      resolveExit();
      return;
    }
    server.once('exit', resolveExit);
    setTimeout(resolveExit, 3_000);
  });
}
