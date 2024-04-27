import accounting from "accounting";
export default function formatMoney(value, currency = "₱ ") {
  return accounting.formatMoney(value, currency);
}
