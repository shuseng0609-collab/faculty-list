document.addEventListener("DOMContentLoaded", () => {
  const csvUrl =
    "https://usr-hub.ncku.edu.tw/var/file/189/1189/img/367245029.csv";

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
      console.log("CSV 第一笔资料：", results.data[0]);

      if (!results.data || results.data.length === 0) {
        list.innerHTML = "<li>CSV 没有资料</li>";
        return;
      }

      const firstRow = results.data[0];
      const keys = Object.keys(firstRow);

      console.log("CSV 栏位名称：", keys);

      results.data.forEach((row) => {
        // 先暴力抓第一个「看起来像姓名」的栏位
        let name = null;
        for (const key of keys) {
          if (key.includes("姓名")) {
            name = row[key];
            break;
          }
        }

        if (!name) return;

        const li = document.createElement("li");
        li.textContent = name;
        list.appendChild(li);
      });
    },
    error: function (err) {
      console.error("CSV 读取失败：", err);
    },
  });
});
