export function datePureToUTCString(dateStr: string) {
    const [y, m, d] = dateStr.split('-').map(Number);
    return new Date(Date.UTC(y, m - 1, d, 12, 0, 0)).toISOString();
}

export function datePureToUTCDate(date?: Date | null) {
  if (!date) return null;

  const y = date.getFullYear();
  const m = date.getMonth();
  const d = date.getDate();

  return new Date(Date.UTC(y, m, d, 12, 0, 0)).toISOString();
}

export function compareDatesOnly(a: Date, b: Date) {
  const da = new Date(a.getFullYear(), a.getMonth(), a.getDate());
  const db = new Date(b.getFullYear(), b.getMonth(), b.getDate());

  return da.getTime() - db.getTime();
}
