export function ensureRgba(color: string | undefined, defaultColor: string = "rgba(255, 255, 255, 1)"): string {
  if (!color) {
    return defaultColor
  }

  const rgbaRegex = /^rgba\((\d{1,3}), (\d{1,3}), (\d{1,3}), (0|1|0?\.\d+)\)$/
  if (rgbaRegex.test(color)) {
    return color
  }

  return defaultColor
}
