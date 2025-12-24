document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const targetName = params.get("name");

  if (!targetName) {
    document.body.innerHTML = "<p>沒有指定教師</p>";
    return;
  }

  Papa.parse("faculty.csv", {
    download: true,
    header: true,
    skipEmptyLines: true,
    complete: function (results) {
      const data = results.data;

      // 动态找栏位（避免中文空白问题）
      const keys = Object.keys(data[0]);
      const key = (text) => keys.find(k => k.includes(text));

      const kName = key("老師姓名");
      const kTitle = key("全銜");
      const kDept = key("系所");
      const kProject = key("負責計畫");
      const kField = key("場域");
      const kTime = key("執行時間");
      const kTopic = key("計畫議題");

      const row = data.find(r => r[kName]?.trim() === targetName);

      if (!row) {
        document.body.innerHTML = `<p>找不到 ${targetName} 的資料</p>`;
        return;
      }

      document.getElementById("name").textContent = row[kName];
      document.getElementById("title").textContent = row[kTitle] || "";
      document.getElementById("dept").textContent = row[kDept] || "";
      document.getElementById("project").textContent = row[kProject] || "";
      document.getElementById("field").textContent = row[kField] || "";
      document.getElementById("time").textContent = row[kTime] || "";
      document.getElementById("topic").textContent = row[kTopic] || "";
    }
  });
});
