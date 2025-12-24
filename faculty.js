document.addEventListener("DOMContentLoaded", () => {
  Papa.parse("faculty.csv", {
    download: true,
    header: true,       // ⭐ 用表头
    skipEmptyLines: true,
    complete: function (results) {
      const data = results.data;

      const list = document.getElementById("teacher-list");
      list.innerHTML = "";

      const seen = new Set();

      data.forEach(row => {
        const name = row["老師姓名"]?.trim();
        if (!name) return;
        if (seen.has(name)) return;

        seen.add(name);

const li = document.createElement("li");

const a = document.createElement("a");
a.textContent = name;
a.href = "detail.html?name=" + encodeURIComponent(name);

li.appendChild(a);
list.appendChild(li);

      });

      if (list.children.length === 0) {
        list.innerHTML = "<li>⚠ 沒有解析到任何教師資料</li>";
      }
    },
    error: function (err) {
      console.error("CSV 解析失敗", err);
    }
  });
});


