/**
 * Commitlint configuration for enforcing Conventional Commits.
 *
 * Install commitlint to use:
 * npm install --save-dev @commitlint/cli @commitlint/config-conventional
 *
 * Add to git hooks (with husky):
 * npx husky add .husky/commit-msg 'npx --no -- commitlint --edit "$1"'
 */
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',     // New feature
        'fix',      // Bug fix
        'docs',     // Documentation
        'style',    // Code style (formatting, semicolons, etc.)
        'refactor', // Code refactoring
        'perf',     // Performance improvement
        'test',     // Adding or updating tests
        'build',    // Build system or dependencies
        'ci',       // CI configuration
        'chore',    // Maintenance tasks
        'revert',   // Revert previous commit
      ],
    ],
    'scope-enum': [
      1, // Warning only, not enforced
      'always',
      [
        'alert',
        'avatar',
        'badge',
        'button',
        'card',
        'checkbox',
        'divider',
        'icon',
        'input',
        'modal',
        'radio',
        'select',
        'skeleton',
        'tabs',
        'toast',
        'tokens',
        'tooltip',
        'docs',
        'deps',
        'release',
      ],
    ],
    'subject-case': [2, 'always', 'lower-case'],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'header-max-length': [2, 'always', 100],
  },
};
