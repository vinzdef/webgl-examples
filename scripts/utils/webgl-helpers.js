export function toClipSpace(dim, max, invert) {
  return (((dim / max) * 2) - 1) * (invert ? -1 : 1)
}
