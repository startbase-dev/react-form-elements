export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.substr(1);
}

export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}
