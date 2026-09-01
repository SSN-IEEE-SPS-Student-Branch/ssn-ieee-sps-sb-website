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
const globalStyles = readFileSync(join(appDir, 'globals.css'), 'utf8');
const teamPageSource = readFileSync(join(appDir, 'team', 'page.tsx'), 'utf8');

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

test('mobile navigation accent guides share one left edge', () => {
  const activeGuide = globalStyles.match(
    /\.mobile-navigation \.nav-link::after\s*\{(?<rules>[^}]+)\}/,
  );
  const submenuGuide = globalStyles.match(/\.nav-dropdown-mobile\s*\{(?<rules>[^}]+)\}/);

  assert.ok(activeGuide, 'Mobile active-link guide styles are missing');
  assert.ok(submenuGuide, 'Mobile submenu guide styles are missing');
  assert.match(activeGuide.groups.rules, /left:\s*0;/);
  assert.match(activeGuide.groups.rules, /width:\s*4px;/);
  assert.match(submenuGuide.groups.rules, /margin:\s*0;/);
  assert.match(submenuGuide.groups.rules, /border-left:\s*4px solid var\(--sps-green\);/);
  assert.doesNotMatch(globalStyles, /\.mobile-navigation \.nav-link:hover::after/);
});

test('all current team sections are visibly available on mobile', () => {
  for (const section of [
    'Office Bearers',
    'Core Committee',
    'Content & Editorial',
    'Design',
    'Event Management',
    'Photography',
    'Social Media',
    'Web Development',
    'Documentation',
    'Hospitality',
  ]) {
    assert.match(teamPageSource, new RegExp(`"${section}"\\s*:`));
  }

  assert.match(
    teamPageSource,
    /\.team-tabs-list\s*\{[^}]*grid-template-columns:\s*repeat\(2,\s*minmax\(0,\s*1fr\)\);/s,
  );
  assert.match(teamPageSource, /\.team-tab-scroll-button\s*\{[^}]*display:\s*none !important;/s);
});

test('team portraits stay centered and faculty spacing remains compact on mobile', () => {
  assert.match(
    teamPageSource,
    /\.profile-modal-image-frame\s*\{[^}]*margin:\s*0 auto 1\.5rem;/s,
  );
  assert.match(
    teamPageSource,
    /\.profile-image-frame img,\s*\.profile-modal-image-frame img\s*\{[^}]*object-position:\s*center center;/s,
  );
  assert.match(
    teamPageSource,
    /@media \(max-width:\s*680px\)[\s\S]*?\.year-selector\s*\{[^}]*padding-top:\s*1\.5rem;/,
  );
});
