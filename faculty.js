document.addEventListener("DOMContentLoaded", () => {
  fetch("faculty.csv")
    .then((res) => {
      console.log("CSV response status:", res.status);
      return res.text();
    })
    .then((text) => {
      console.log("CSV 原始内容前 300 字：");
      console.log(text.slice(0, 300));

      const list = document.getElementById("teacher-list");
      list.innerHTML = "";

      const lines = text.split("\n");

      // 跳过表头，从第二行开始
      for (let i = 1; i < lines.length; i++) {
        const cols = lines[i].split(",");

        if (!cols[1]) continue; // 第二栏先当姓名（测试用）

        const li = document.createElement("li");
        li.textContent = cols[1].trim();
        list.appendChild(li);
      }

      if (list.children.length === 0) {
        list.innerHTML = "<li>⚠ 没有解析到任何资料</li>";
      }
    })
    .catch((err) => {
      console.error("fetch CSV 失败：", err);
    });
});
