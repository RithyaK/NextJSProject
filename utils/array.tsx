export function deepClone(array) {
  JSON.parse(JSON.stringify(array));
}
