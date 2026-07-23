import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import test from 'node:test';

const root = resolve(import.meta.dirname, '..');
const appDir = join(root, 'src', 'app');
const publicDir = join(root, 'public');
const expectedRoutes = [
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

function sourceFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? sourceFiles(path) : [path];
  });
}

const sources = sourceFiles(join(root, 'src')).filter((file) => /\.(?:ts|tsx)$/.test(file));
const sourceText = sources.map((file) => readFileSync(file, 'utf8')).join('\n');

test('every navigation route has a page and route metadata', () => {
  for (const route of expectedRoutes) {
    const routeDirectory = route === '/' ? appDir : join(appDir, route.slice(1));
    assert.ok(existsSync(join(routeDirectory, 'page.tsx')), `${route} is missing page.tsx`);
    if (route !== '/') {
      assert.ok(existsSync(join(routeDirectory, 'layout.tsx')), `${route} is missing metadata`);
    }
  }
});

test('literal internal links resolve to routes or public files', () => {
  const linkPattern = /href=(?:"|')(?<href>\/[^"'?#]*)(?:[?#][^"']*)?(?:"|')/g;
  const links = [...sourceText.matchAll(linkPattern)].map((match) => match.groups.href);

  for (const href of links) {
    const routeDirectory = href === '/' ? appDir : join(appDir, href.slice(1));
    const publicFile = join(publicDir, decodeURIComponent(href.slice(1)));
    assert.ok(
      existsSync(join(routeDirectory, 'page.tsx')) || existsSync(publicFile),
      `Internal link does not resolve: ${href}`,
    );
  }
});

test('literal image and document references exist in public', () => {
  const assetPattern = /(?:"|')(?<asset>\/[^"']+\.(?:png|jpe?g|pdf|ico))(?:"|')/gi;
  const assets = [...sourceText.matchAll(assetPattern)].map((match) => match.groups.asset);

  for (const asset of assets) {
    const file = join(publicDir, decodeURIComponent(asset.slice(1)));
    const appFile = join(appDir, decodeURIComponent(asset.slice(1)));
    assert.ok(
      (existsSync(file) && statSync(file).isFile()) ||
        (existsSync(appFile) && statSync(appFile).isFile()),
      `Missing public asset: ${asset}`,
    );
  }
});

test('SEO, web-app, and error-route files are present', () => {
  for (const file of ['manifest.ts', 'robots.ts', 'sitemap.ts', 'not-found.tsx']) {
    assert.ok(existsSync(join(appDir, file)), `${file} is missing`);
  }
});

test('production validation cannot silently ignore code errors', () => {
  const config = readFileSync(join(root, 'next.config.mjs'), 'utf8');
  const packageJson = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));

  assert.doesNotMatch(config, /ignoreDuringBuilds|ignoreBuildErrors/);
  assert.match(packageJson.scripts.check, /lint/);
  assert.match(packageJson.scripts.check, /typecheck/);
  assert.match(packageJson.scripts.check, /test:smoke/);
  assert.doesNotMatch(sourceText, /\/resources\/funding/);
});

test('repository contains no generated build output in source checks', () => {
  const relativeSources = sources.map((file) => relative(root, file));
  assert.ok(relativeSources.every((file) => !file.startsWith('.next/')));
});
