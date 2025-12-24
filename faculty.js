document.addEventListener("DOMContentLoaded", () => {
  const csvUrl =
    "https://usr-hub.ncku.edu.tw/var/file/189/1189/img/367245029.csv";

  const list = document.getElementById("teacher-list");
  if (!list) {
    console.error("找不到 #teacher-list");
    return;
  }

  Papa.parse(csvUrl, {
    download: true,          // ← 关键：强制用 HTTP 读
    header: true,
    skipEmptyLines: true,
    encoding: "UTF-8",
    complete: function (results) {
      if (!results.data || results.data.length === 0) {
        console.error("CSV 没有资料", results);
        return;
      }

      results.data.forEach((row) => {
        const name =
          row["老師姓名"] ||
          row["教师姓名"] ||
          row["老師"] ||
          row["姓名"];

        if (!name) return;

        const li = document.createElement("li");
        const a = document.createElement("a");

        a.textContent = name;
        a.href = `detail.html?name=${encodeURIComponent(name)}`;

        li.appendChild(a);
        list.appendChild(li);
      });
    },
    error: function (err) {
      console.error("CSV 读取失败：", err);
    },
  });
});
