## Copilot Output Guidelines

- Skip generating unuseful comments (such as `// ...existing code...` or placeholder comments that do not add value).
- Do not include empty code instructions or boilerplate that does not contribute to the solution.

# Copilot Instructions

This is a Nuxt 4 application for exploring the Wim Hof Method breathing exercises, built with Vue 3 and Nuxt UI components.

## Architecture Overview

**Current State**: Early development - only root component (`app/app.vue`) exists showing NuxtWelcome.
**Target**: Web app for breathing exercise guidance, timers, and potentially progress tracking.

### Key Technology Decisions

- **Nuxt 4.1.2**: Latest Nuxt with enhanced auto-imports and file-based routing
- **Nuxt UI 4.0**: Official component library (prefix components with `U`, e.g., `UButton`, `UCard`)
- **better-sqlite3**: Local database for user data persistence
- **@nuxt/content**: Content management for exercise instructions/articles

## Development Workflow

### Essential Commands
```bash
npm run dev          # Start dev server (localhost:3000)
npm run build        # Production build
npx eslint .         # Lint (uses .nuxt/eslint.config.mjs)
```

### Commit Standards
- **Use Conventional Commits**: Follow the conventional commits specification for all commit messages
- Format: `type(scope): description`
- Common types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`
- Examples:
  - `feat(breathing): add preset saving functionality`
  - `fix(ui): replace alerts with toast notifications`
  - `docs(readme): update installation instructions`
  - `refactor(components): convert to use UFormField`

### Directory Structure Conventions
- `app/pages/` → Auto-generated routes (file-based routing)
- `app/components/` → Auto-imported Vue components
- `app/composables/` → Auto-imported composables
- `server/api/` → Backend API routes
- `content/` → Markdown/YAML content for @nuxt/content

## Project-Specific Patterns

### Configuration Architecture
- **ESLint**: Extends Nuxt's generated config from `.nuxt/eslint.config.mjs`
- **TypeScript**: References `.nuxt/tsconfig.*.json` files (never edit directly)
- **Module Registration**: All modules configured in `nuxt.config.ts` modules array

### Nuxt 4 Auto-Import Behavior
All Vue composition API, Nuxt composables, and local components/composables are auto-imported. No need for explicit imports of:
- `ref`, `computed`, `watch`, etc.
- `navigateTo`, `useFetch`, `useState`, etc.
- Components from `components/` directory
- Functions from `composables/` directory

### UI Component Strategy
Use Nuxt UI components first before custom implementations:
- Prefer `UButton` over custom buttons
- Use `UCard`, `UContainer` for layouts
- Leverage built-in Tailwind integration
- Components auto-import without registration
- **Never use `alert()` or `confirm()` - always use Nuxt UI components instead:**
  - Use `useToast()` for notifications and feedback messages
  - Use `UModal` for confirmation dialogs
  - Use `UNotification` for status updates

## Integration Points

### Database Integration
- **better-sqlite3** dependency suggests local data storage
- Likely for user progress, settings, exercise history
- Server API routes in `server/api/` will handle database operations

### Content Management
- `@nuxt/content` enables markdown-based content
- Exercise instructions, method explanations as markdown in `content/`
- Query with `queryContent()` composable

### Breathing Exercise Features (Anticipated)
Based on project focus, expect to implement:
- Breathing pattern timers (inhale/hold/exhale cycles)
- Progress tracking and session history
- Guided exercise flows
- User preference persistence

## Key Files

- `nuxt.config.ts`: Module configuration and app settings
- `app/app.vue`: Root layout component
- `package.json`: Dependencies and scripts
- `CLAUDE.md`: Detailed project documentation for AI agents

## Development Notes

- Project uses ES modules (`"type": "module"` in package.json)
- TypeScript enabled via Nuxt's built-in support
- No custom styling setup yet - relies on Nuxt UI/Tailwind defaults
- Development server includes hot reload and devtools

## MCP

- Use the Nuxt UI MCP components where possible.
