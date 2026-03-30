# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [1.0.1](https://github.com/craice/atman/compare/v1.0.0...v1.0.1) (2026-03-30)


### Bug Fixes

* **storybook:** fix Progress, Skeleton, Table and Docs theme rendering ([c8f59c2](https://github.com/craice/atman/commit/c8f59c28ce470b1c119cd3dc8309fed2460dd9d6))

## [1.0.0](https://github.com/craice/atman/releases/tag/v1.0.0) (2026-02-24)

### Features

* **switch:** add Switch component with on/off states and disabled support
* **textarea:** add Textarea component with auto-resize and character count
* **progress:** add Progress component with linear and circular variants and indeterminate state
* **breadcrumb:** add Breadcrumb component with custom separator support
* **accordion:** add Accordion component with single and multi-expand modes
* **pagination:** add Pagination component with sibling and boundary page controls
* **dropdown:** add Dropdown component with icons, dividers, and disabled items
* **table:** add Table component with sorting, selection, and striped rows

### Bug Fixes

* **storybook:** fix canvas background to match active theme in light/dark mode
* **storybook:** use background-subtle for canvas in light mode so white surface components (Card, Table) are visible
* **storybook:** inject CSS to apply matching background to Storybook Docs preview containers
* **progress:** fix circular indeterminate animation scaling for all sizes
* **progress:** add width container to linear stories so bar renders in Storybook's centered layout
* **skeleton:** add explicit width containers to stories so skeleton renders in Storybook's centered layout
* **table:** set layout to padded so table width resolves correctly in Storybook
* **tooltip:** fix NoArrow story to correctly hide arrow with property binding
* **divider:** fix `|| true` logic error in label rendering; fix Spacing story margin collapse
* **avatar:** fix AvatarGroup ring to render as circle using box-shadow instead of border
* **dropdown:** add padding to prevent menu items from being clipped in canvas
* **examples:** fix Settings Page, User Profile, and Notification Center tabs panels (remove invalid `slot="panel"` attribute)
* **examples:** remove overflowing `::before` element from featured Pricing Card
* **examples:** fix notification count badge to render as circle for single-digit values

### Documentation

* add Do & Don't guidelines to Button, Badge, Alert, Input, and Modal
* replace standalone Guidelines page with per-component Do & Don't stories
* update Introduction, landing page, README, and case study to reflect 24 components

## [0.1.0](https://github.com/craice/atman/releases/tag/v0.1.0) (2026-01-30)

### Features

* **alert:** add Alert component with info, success, warning, error variants ([eecc379](https://github.com/craice/atman/commit/eecc379))
* **avatar:** add Avatar component with image, initials, and fallback ([eecc379](https://github.com/craice/atman/commit/eecc379))
* **badge:** add Badge component with multiple variants and dot indicator ([eecc379](https://github.com/craice/atman/commit/eecc379))
* **button:** add Button component with primary, secondary, ghost, destructive variants ([eecc379](https://github.com/craice/atman/commit/eecc379))
* **card:** add Card component with header, body, footer slots and elevated variant ([eecc379](https://github.com/craice/atman/commit/eecc379))
* **checkbox:** add Checkbox component with indeterminate state ([eecc379](https://github.com/craice/atman/commit/eecc379))
* **divider:** add Divider component with horizontal/vertical orientation ([eecc379](https://github.com/craice/atman/commit/eecc379))
* **icon:** add Icon component with Lucide icons integration ([eecc379](https://github.com/craice/atman/commit/eecc379))
* **input:** add Input component with label, validation, prefix/suffix ([eecc379](https://github.com/craice/atman/commit/eecc379))
* **modal:** add Modal component with focus trap and multiple sizes ([eecc379](https://github.com/craice/atman/commit/eecc379))
* **radio:** add Radio component with group support ([eecc379](https://github.com/craice/atman/commit/eecc379))
* **select:** add Select component with keyboard navigation ([eecc379](https://github.com/craice/atman/commit/eecc379))
* **skeleton:** add Skeleton component for loading states ([eecc379](https://github.com/craice/atman/commit/eecc379))
* **tabs:** add Tabs component with keyboard navigation ([eecc379](https://github.com/craice/atman/commit/eecc379))
* **toast:** add Toast component with auto-dismiss ([eecc379](https://github.com/craice/atman/commit/eecc379))
* **tokens:** add complete design token system with light/dark themes ([eecc379](https://github.com/craice/atman/commit/eecc379))
* **tooltip:** add Tooltip component with positioning ([eecc379](https://github.com/craice/atman/commit/eecc379))

### Documentation

* add Storybook documentation for all components ([eecc379](https://github.com/craice/atman/commit/eecc379))
* add accessibility guidelines ([eecc379](https://github.com/craice/atman/commit/eecc379))
* add getting started guide ([eecc379](https://github.com/craice/atman/commit/eecc379))
