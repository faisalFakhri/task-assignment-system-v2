export const FONT_STORAGE_KEY = 'font_preference'

export function applyFont(fontValue: string) {
  try {
    localStorage.setItem(FONT_STORAGE_KEY, fontValue)
    const root = document.documentElement
    if (fontValue) {
      root.style.fontFamily = fontValue
    } else {
      root.style.fontFamily = '' // reset to Tailwind default (Inter)
    }
  } catch {
    // ignore
  }
}
