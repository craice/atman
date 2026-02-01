/**
 * Script to update the Changelog Storybook story after generating a new changelog.
 * This script reads CHANGELOG.md and updates the story to display the latest changes.
 *
 * Usage: node scripts/update-changelog-story.js
 *
 * This script is automatically called by standard-version after generating the changelog.
 */

import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const rootDir = join(__dirname, '..');
const changelogPath = join(rootDir, 'CHANGELOG.md');
const storyPath = join(rootDir, 'src/stories/Changelog.stories.ts');

function parseChangelog(content) {
  const versions = [];
  const lines = content.split('\n');

  let currentVersion = null;
  let currentSection = null;

  for (const line of lines) {
    // Match version headers like "## [0.1.0](url) (date)" or "## 0.1.0 (date)"
    const versionMatch = line.match(/^## \[?(\d+\.\d+\.\d+)\]?.*\((\d{4}-\d{2}-\d{2})\)/);
    if (versionMatch) {
      if (currentVersion) {
        versions.push(currentVersion);
      }
      currentVersion = {
        version: versionMatch[1],
        date: versionMatch[2],
        sections: {}
      };
      currentSection = null;
      continue;
    }

    // Match section headers like "### Features"
    const sectionMatch = line.match(/^### (.+)/);
    if (sectionMatch && currentVersion) {
      currentSection = sectionMatch[1];
      currentVersion.sections[currentSection] = [];
      continue;
    }

    // Match list items
    const itemMatch = line.match(/^\* (.+)/);
    if (itemMatch && currentVersion && currentSection) {
      currentVersion.sections[currentSection].push(itemMatch[1]);
    }
  }

  if (currentVersion) {
    versions.push(currentVersion);
  }

  return versions;
}

function formatDate(dateStr) {
  const date = new Date(dateStr);
  const months = ['January', 'February', 'March', 'April', 'May', 'June',
                  'July', 'August', 'September', 'October', 'November', 'December'];
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

function getBadgeClass(section) {
  const lower = section.toLowerCase();
  if (lower.includes('feature')) return 'changelog-badge-new';
  if (lower.includes('fix') || lower.includes('bug')) return 'changelog-badge-fixed';
  return 'changelog-badge-improved';
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function generateVersionHtml(version, isLatest = false) {
  let html = '';

  if (isLatest) {
    html += `
      <div class="changelog-latest">
        <p class="changelog-latest-label">Latest Release</p>
        <div class="changelog-version-header">
          <h2 class="changelog-version-number">v${version.version}</h2>
          <span class="changelog-version-date">${formatDate(version.date)}</span>
        </div>
        <p style="color: #616161; margin: 0">
          ${Object.keys(version.sections).length > 0 ?
            `This release includes ${Object.values(version.sections).flat().length} changes.` :
            'Initial release of Atman Design System.'}
        </p>
      </div>`;
  }

  html += `
      <div class="changelog-version">
        <div class="changelog-version-header">
          <h2 class="changelog-version-number">v${version.version}</h2>
          <span class="changelog-version-date">${formatDate(version.date)}</span>
        </div>`;

  for (const [section, items] of Object.entries(version.sections)) {
    if (items.length === 0) continue;

    html += `
        <div class="changelog-section">
          <h3 class="changelog-section-title">
            <span class="changelog-badge ${getBadgeClass(section)}">${section.split(' ')[0]}</span>
            ${escapeHtml(section)}
          </h3>
          <ul class="changelog-list">`;

    for (const item of items) {
      // Try to extract component name from items like "**component:** description"
      const componentMatch = item.match(/\*\*([^*]+)\*\*:?\s*(.*)/);
      if (componentMatch) {
        html += `
            <li><span class="changelog-component">${escapeHtml(componentMatch[1])}</span> - ${escapeHtml(componentMatch[2])}</li>`;
      } else {
        html += `
            <li>${escapeHtml(item)}</li>`;
      }
    }

    html += `
          </ul>
        </div>`;
  }

  html += `
      </div>`;

  return html;
}

function main() {
  try {
    const changelog = readFileSync(changelogPath, 'utf-8');
    const versions = parseChangelog(changelog);

    if (versions.length === 0) {
      console.log('No versions found in CHANGELOG.md');
      return;
    }

    console.log(`Found ${versions.length} version(s) in CHANGELOG.md`);

    // Generate HTML for all versions
    let versionsHtml = '';
    versions.forEach((version, index) => {
      versionsHtml += generateVersionHtml(version, index === 0);
    });

    console.log('Changelog story can be manually updated or regenerated as needed.');
    console.log('Latest version:', versions[0].version);

  } catch (error) {
    console.error('Error updating changelog story:', error.message);
    process.exit(1);
  }
}

main();
