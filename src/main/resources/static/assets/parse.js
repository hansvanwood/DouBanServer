const COLORS = ["#60A84E", "#4a90d9", "#e67e22", "#9b59b6", "#e74c3c", "#1abc9c", "#f39c12", "#2980b9"];
function parseWorkerIds(str) {
  if (!str) return [];
  return str.split("|").map((item) => {
    const [name, id] = item.split(":");
    return { name: name?.trim() || "", id: Number(id) || 0 };
  }).filter((w) => w.name && w.id);
}
function hashColor(id) {
  return COLORS[Number(id) % COLORS.length];
}
function formatDate(dateStr) {
  if (!dateStr) return "";
  return dateStr.slice(0, 10);
}
function getInitial(name) {
  if (!name) return "?";
  const first = name.charAt(0);
  if (/[a-zA-Z]/.test(first)) {
    return first.toUpperCase();
  }
  return first;
}
export {
  formatDate as f,
  getInitial as g,
  hashColor as h,
  parseWorkerIds as p
};
//# sourceMappingURL=parse.js.map
