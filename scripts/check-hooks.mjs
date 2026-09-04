// Hook Validator (anti-regression)
// Usage:  node scripts/check-hooks.mjs
import { readdir, readFile } from 'node:fs/promises'
import { join } from 'node:path'

const HOOK_NAMES = ['useState', 'useEffect', 'useRef', 'useMemo', 'useCallback', 'useContext', 'useReducer', 'useLayoutEffect', 'useId']
const HOOK_USAGE_RE = new RegExp(`\\b(${HOOK_NAMES.join('|')})\\s*\\(`)

async function gatherFiles(dir, out) {
  const entries = await readdir(dir, { withFileTypes: true })
  for (const e of entries) {
    const full = join(dir, e.name)
    if (e.isDirectory()) {
      if (e.name === 'node_modules' || e.name === 'dist') continue
      await gatherFiles(full, out)
    } else if (e.isFile() && /\.(ts|tsx)$/.test(e.name)) {
      out.push(full)
    }
  }
  return out
}

const files = await gatherFiles(process.cwd(), [])
let violations = 0

for (const file of files) {
  const code = await readFile(file, 'utf8')
  const stripped = code.replace(/\/\*[\s\S]*?\*\/|\/\/.*$/gm, '')
  const isTSX = file.endsWith('.tsx')
  const hasHookUsage = isTSX && HOOK_USAGE_RE.test(stripped)

  if (!hasHookUsage) continue

  const hasReactImport = /from\s+['"]react['"]/.test(code) || /import\s+React/.test(code)
  const directHookImports = HOOK_NAMES.filter((h) =>
    new RegExp(`import\\s*{[^}]*\\b${h}\\b[^}]*}\\s*from\\s*['"]react`).test(code)
  )
  const hasNamespaceReact = /React\.(useState|useEffect|useRef|useMemo|useCallback|useContext|useReducer)/.test(code)

  if (!hasReactImport && directHookImports.length === 0 && !hasNamespaceReact) {
    console.log(`❌ ${file}: hook used but no React import`)
    violations++
  }
}

if (violations > 0) {
  console.log(`\n⚠️  ${violations} hook violation(s) found. Fix before pushing.`)
  process.exit(1)
} else {
  console.log('✅ No hook import violations found.')
}
