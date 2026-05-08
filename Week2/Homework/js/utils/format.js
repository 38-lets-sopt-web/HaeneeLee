export function formatAmount(amount) {
  const sign = amount > 0 ? "+" : "";
  return `${sign}${amount.toLocaleString()}`;
}
