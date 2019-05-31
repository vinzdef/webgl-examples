export function toClipSpace(dim, max, invert) {
  return invert
    ? (max / 2 - dim) / (max / 2)
    : (dim - max / 2) / (max / 2)
}
