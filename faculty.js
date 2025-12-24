document.addEventListener("DOMContentLoaded", () => {
  fetch("faculty.csv")
    .then((res) => res.text())
    .then((text) => {
      const lines = text.trim().split("\n");
      const headers = lines[0].split(",");

      // 找出「老師姓名」这一栏在第几栏
      const nameIndex = headers.findIndex((h) =>
        h.includes("姓名")
      );

      if (nameIndex === -1) {
        alert("找不到『姓名』栏位，请确认 CSV 表头");
        return;
      }

      const list = document.getElementById("teacher-list");
      list.innerHTML = "";

      for (let i = 1; i < lines.length; i++) {
        const cols = lines[i].split(",");
        const name = cols[nameIndex];

        if (!name) continue;

        const li = document.createElement("li");
        li.textContent = name.trim();
        list.appendChild(li);
      }
    })
    .catch((err) => {
      console.error("读取 CSV 失败：", err);
    });
});
