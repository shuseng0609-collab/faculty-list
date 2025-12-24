document.addEventListener("DOMContentLoaded", () => {
  const csvUrl =
    "https://usr-hub.ncku.edu.tw/var/file/189/1189/img/621812611.csv";

  const list = document.getElementById("teacher-list");
  if (!list) {
    console.error("找不到 #teacher-list");
    return;
  }

  Papa.parse(csvUrl, {
    download: true,
    header: true,
    skipEmptyLines: true,
    complete: function (results) {
      const data = results.data;

      data.forEach((row) => {
        const name = row["老师姓名"] || row["教師姓名"] || row["姓名"];
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
