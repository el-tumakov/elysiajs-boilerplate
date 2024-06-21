export function parseBool(value: unknown): boolean | null {
  if (value === 'true') return true;
  if (value === 'false') return false;

  return null;
}
