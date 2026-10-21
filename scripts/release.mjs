#!/usr/bin/env node
// Release helpers for the `@zavudev/sdk` npm package. Node built-ins only.
// Works both in the zavu monorepo (package at sdks/typescript) and in the
// standalone zavudev/sdk-typescript repository (package at the root).
//
//   node scripts/release.mjs check-bump <base-sha> <head-sha>
//     Pull requests in the monorepo (.github/workflows/sdk-version.yml): fails
//     when a file that ships in (or builds) the package changed but
//     package.json's version is not above the base branch's.
//   node scripts/release.mjs plan
//     Prints `key=value` lines for $GITHUB_OUTPUT: name, version, tag
//     (v<version>), dist_tag, prerelease, published (whether npm already has
//     this version). Needs no git. Used by .github/workflows/release.yml.
//   node scripts/release.mjs check-version
//     Fails when src/version.ts (written by the generator from zavu.sdk.toml)
//     and package.json name different versions.
//
// See RELEASING.md for the rule and the release process.

import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const pkgDir = join(dirname(fileURLToPath(import.meta.url)), '..');

/**
 * Where the git repository is and where the package sits in it: `sdks/typescript`
 * in the monorepo, `` (the root) in sdk-typescript. Resolved on first use, so
 * `plan` also runs outside a git checkout.
 */
let layout = null;
function repo() {
  if (layout === null) {
    const root = execFileSync('git', ['rev-parse', '--show-toplevel'], {
      cwd: pkgDir,
      encoding: 'utf8',
    }).trim();
    const path = relative(root, pkgDir).split('\\').join('/');
    layout = { root, path, prefix: path === '' ? '' : `${path}/` };
  }
  return layout;
}

/**
 * What a release is made of: what npm packs (dist, built from src; README.md;
 * CHANGELOG.md; LICENSE; package.json itself) and what decides the build (the
 * tsconfigs, tsc-multi.json, scripts/build and the scripts it runs on dist).
 * Changes anywhere else in the package (tests/, packages/, RELEASING.md, the
 * other scripts/) do not need a new version.
 */
const RELEASED = [
  /^src\//,
  /^package\.json$/,
  /^README\.md$/,
  /^CHANGELOG\.md$/,
  /^LICENSE$/,
  /^tsconfig(\.build|\.dist-src)?\.json$/,
  /^tsc-multi\.json$/,
  /^scripts\/build$/,
  /^scripts\/utils\/(make-dist-package-json|fix-index-exports|postprocess-files)\.cjs$/,
];

const SEMVER =
  /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?(?:\+[0-9A-Za-z.-]+)?$/;

function parse(version) {
  const m = SEMVER.exec(version);
  if (!m) throw new Error(`\`${version}\` is not a semver version`);
  return { core: [Number(m[1]), Number(m[2]), Number(m[3])], pre: m[4] ? m[4].split('.') : [] };
}

/** Semver precedence: negative when a < b, 0 when equal, positive when a > b. */
function compare(a, b) {
  const x = parse(a);
  const y = parse(b);
  for (let i = 0; i < 3; i++) if (x.core[i] !== y.core[i]) return x.core[i] - y.core[i];
  if (!x.pre.length || !y.pre.length) return y.pre.length - x.pre.length; // a release outranks its pre-releases
  for (let i = 0; i < Math.max(x.pre.length, y.pre.length); i++) {
    const p = x.pre[i];
    const q = y.pre[i];
    if (p === undefined) return -1;
    if (q === undefined) return 1;
    if (p === q) continue;
    const pn = /^\d+$/.test(p);
    const qn = /^\d+$/.test(q);
    if (pn && qn) return Number(p) - Number(q);
    if (pn !== qn) return pn ? -1 : 1;
    return p < q ? -1 : 1;
  }
  return 0;
}

function git(...args) {
  return execFileSync('git', args, { cwd: repo().root, encoding: 'utf8' });
}

function versionAt(ref) {
  try {
    return JSON.parse(git('show', `${ref}:${repo().prefix}package.json`)).version;
  } catch {
    return null; // the package does not exist there
  }
}

function localPackage() {
  return JSON.parse(readFileSync(join(pkgDir, 'package.json'), 'utf8'));
}

/** Whether npm has this exact version. Throws on anything but "found" or "not found". */
function onNpm(name, version) {
  try {
    const out = execFileSync('npm', ['view', `${name}@${version}`, 'version', '--json'], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
    }).trim();
    // Older npm prints nothing for an unknown version of a known package; newer
    // npm answers E404. A match is `"x.y.z"` or, on newer npm, `["x.y.z"]`.
    if (out === '') return false;
    const found = JSON.parse(out);
    return Array.isArray(found) ? found.includes(version) : found === version;
  } catch (e) {
    const stderr = String(e.stderr ?? '') + String(e.stdout ?? '');
    if (/E404|404 Not Found/.test(stderr)) return false; // the package itself is not on npm yet
    throw new Error(`npm view ${name}@${version} failed:\n${stderr}`);
  }
}

/** Every version npm has for the package; empty when the package is not on npm yet. */
function publishedVersions(name) {
  try {
    const out = execFileSync('npm', ['view', name, 'versions', '--json'], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
    }).trim();
    if (out === '') return [];
    const found = JSON.parse(out);
    return Array.isArray(found) ? found : [found];
  } catch (e) {
    const stderr = String(e.stderr ?? '') + String(e.stdout ?? '');
    if (/E404|404 Not Found/.test(stderr)) return [];
    throw new Error(`npm view ${name} versions failed:\n${stderr}`);
  }
}

function highest(versions) {
  return versions.reduce((top, v) => (top === null || compare(v, top) > 0 ? v : top), null);
}

function suggestions(base) {
  const { core, pre } = parse(base);
  const [major, minor, patch] = core;
  if (pre.length) return [`${major}.${minor}.${patch}`, `${major}.${minor}.${patch}-${bumpPre(pre)}`];
  return [
    `${major}.${minor}.${patch + 1}`,
    `${major}.${minor + 1}.0`,
    `${major}.${minor}.${patch + 1}-beta.0`,
  ];
}

function bumpPre(pre) {
  const last = pre.at(-1);
  return /^\d+$/.test(last) ? [...pre.slice(0, -1), Number(last) + 1].join('.') : [...pre, 0].join('.');
}

function checkBump(base, head) {
  if (!base || !head) throw new Error('usage: release.mjs check-bump <base-sha> <head-sha>');
  const { path, prefix } = repo();
  const pkgPath = path === '' ? '.' : path;
  const changed = git('diff', '--name-only', `${base}...${head}`, '--', pkgPath)
    .split('\n')
    .filter(Boolean)
    .map((f) => f.slice(prefix.length));
  const released = changed.filter((f) => RELEASED.some((re) => re.test(f)));
  if (released.length === 0) {
    console.log(
      `No released file of ${pkgPath} changed (${
        changed.length ? changed.join(', ') : 'nothing'
      }): no version bump needed.`,
    );
    return;
  }
  const from = versionAt(base);
  const to = versionAt(head);
  if (to === null) throw new Error(`${prefix}package.json is missing at ${head}`);
  if (from === null) {
    console.log(`${pkgPath} is new on this branch; it will publish as ${to}.`);
    return;
  }
  parse(to);
  const name = JSON.parse(git('show', `${head}:${prefix}package.json`)).name;
  // A base version that never reached npm is not a release: what must be
  // exceeded is the highest version npm has (none before the first publish).
  // This is what lets the pre-launch reset to 0.1.0 through.
  if (compare(to, from) <= 0 && !onNpm(name, from)) {
    const top = highest(publishedVersions(name));
    if (top === null || compare(to, top) > 0) {
      if (onNpm(name, to)) fail(`${name}@${to} is already on npm. Pick a version npm does not have yet.`);
      console.log(
        `${pkgPath}: ${from} on the base branch was never published; ${to} is above what npm has (${
          top ?? 'nothing yet'
        }).`,
      );
      return;
    }
  }
  if (compare(to, from) > 0) {
    if (onNpm(name, to)) {
      fail(`${name}@${to} is already on npm. Pick a version npm does not have yet, above ${from}.`);
    }
    console.log(`${pkgPath}: ${from} -> ${to}. It publishes when this is merged into the default branch.`);
    return;
  }
  const next = suggestions(from);
  fail(
    [
      `${pkgPath} changed but its version was not bumped (${to} here, ${from} on the base branch).`,
      `Changed released files: ${released.join(', ')}.`,
      `Every change to these files ships to npm on merge, so give it a new version above ${from}:`,
      `  1. Set "version" in ${prefix}package.json to ${next
        .map((v) => `\`${v}\``)
        .join(', ')} or another version above ${from}.`,
      `  2. Set package_version under [targets.typescript] in packages/sdk-codegen/zavu.sdk.toml to the same value and run \`packages/sdk-codegen/scripts/codegen.sh generate --target typescript\` (it writes src/version.ts).`,
      `  3. Add the version's entry to ${prefix}CHANGELOG.md.`,
      `A version with a pre-release part (\`-beta.0\`) publishes under the \`next\` dist-tag instead of \`latest\`.`,
      `Test-only changes (tests/, .github/, the other scripts/) and ${prefix}RELEASING.md need no bump. See ${prefix}RELEASING.md.`,
    ].join('\n'),
  );
}

function fail(message) {
  // One annotation on package.json in the pull request, then the full text in the log.
  console.log(
    `::error file=${repo().prefix}package.json,title=SDK version not bumped::${message.split('\n')[0]}`,
  );
  console.error(message);
  process.exit(1);
}

function plan() {
  const { name, version } = localPackage();
  const { pre } = parse(version);
  const prerelease = pre.length > 0;
  const lines = {
    name,
    version,
    tag: `v${version}`,
    dist_tag: prerelease ? 'next' : 'latest',
    prerelease: String(prerelease),
    published: String(onNpm(name, version)),
  };
  for (const [k, v] of Object.entries(lines)) console.log(`${k}=${v}`);
}

function checkVersion() {
  const { version } = localPackage();
  const source = readFileSync(join(pkgDir, 'src', 'version.ts'), 'utf8');
  const m = /export const VERSION = '([^']*)'/.exec(source);
  if (!m) throw new Error('src/version.ts has no VERSION');
  if (m[1] !== version) {
    console.log(
      `::error file=src/version.ts,title=SDK version mismatch::src/version.ts says ${m[1]}, package.json says ${version}`,
    );
    console.error(
      `src/version.ts is ${m[1]} and package.json is ${version}. Set package_version under [targets.typescript] in packages/sdk-codegen/zavu.sdk.toml to ${version} and regenerate, or fix package.json.`,
    );
    process.exit(1);
  }
  console.log(`Version ${version} in package.json and src/version.ts.`);
}

const [cmd, ...args] = process.argv.slice(2);
try {
  if (cmd === 'check-bump') checkBump(args[0], args[1]);
  else if (cmd === 'plan') plan();
  else if (cmd === 'check-version') checkVersion();
  else throw new Error('usage: release.mjs check-bump <base-sha> <head-sha> | plan | check-version');
} catch (e) {
  console.error(e instanceof Error ? e.message : e);
  process.exit(2);
}
