document.addEventListener("DOMContentLoaded", () => {
  fetch("faculty.csv")
    .then((res) => res.text())
    .then((text) => {
      const lines = text.trim().split("\n");

      // 用 Tab 分隔
      const headers = lines[0].split("\t");

      // 找第一个「老師姓名」栏位
      const nameIndex = headers.findIndex(h => h.includes("老師姓名"));

      if (nameIndex === -1) {
        alert("找不到『老師姓名』欄位");
        return;
      }

      const list = document.getElementById("teacher-list");
      list.innerHTML = "";

      const seen = new Set(); // 用来去重

      for (let i = 1; i < lines.length; i++) {
        const cols = lines[i].split("\t");
        const name = cols[nameIndex]?.trim();

        if (!name) continue;
        if (seen.has(name)) continue;

        seen.add(name);

        const li = document.createElement("li");
        li.textContent = name;
        list.appendChild(li);
      }

      if (list.children.length === 0) {
        list.innerHTML = "<li>⚠ 沒有解析到任何教師資料</li>";
      }
    })
    .catch((err) => {
      console.error("讀取 CSV 失敗：", err);
    });
});
