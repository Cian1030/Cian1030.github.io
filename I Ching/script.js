function stringToHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash = hash & hash; // Convert to 32bit int
  }
  return Math.abs(hash);
}

function generateSixLines(seed) {
  const lines = [];
  for (let i = 0; i < 6; i++) {
    let num = (seed >> (i * 3)) & 0b111; // 3 bits per line
    if (num === 0 || num === 7) lines.push("⚋");      // 變陰爻
    else if (num === 1 || num === 2) lines.push("⚊"); // 陽爻
    else if (num === 3 || num === 4) lines.push("⚋"); // 陰爻
    else lines.push("⚍");                             // 變陽爻
  }
  return lines;
}

function getMainGua(lines) {
  return lines.map(l => (l === "⚊" || l === "⚍") ? 1 : 0);
}

function getChangedGua(lines) {
  return lines.map(l => {
    if (l === "⚍") return 0;
    if (l === "⚋") return 1;
    return l === "⚊" ? 1 : 0;
  });
}

function guaToIndex(lines) {
  const up = lines.slice(3).reverse().join('');
  const low = lines.slice(0, 3).reverse().join('');
  return parseInt(up + low, 2); // 6位元組合
}

document.getElementById("guaForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const input = document.getElementById("input").value.trim();
  const hash = stringToHash(input);

  // 🎴 生成六爻
  const lines = generateSixLines(hash);
  const lineText = lines.reverse().join(" ");

  // 🧧 卦索引
  const mainIndex = guaToIndex(getMainGua(lines));
  const changeIndex = guaToIndex(getChangedGua(lines));

  const mainGua = sixtyFourGua[mainIndex % 64];
  const changedGua = sixtyFourGua[changeIndex % 64];
  
  // 🌀 動畫八卦圖
  document.getElementById("animation").innerHTML = `
  <svg width="120" height="120" viewBox="0 0 100 100">
    <defs>
      <mask id="yinYangMask">
        <rect width="100" height="100" fill="white"/>
        <circle cx="50" cy="25" r="25" fill="black"/>
        <circle cx="50" cy="75" r="25" fill="white"/>
        <circle cx="50" cy="25" r="5" fill="white"/>
        <circle cx="50" cy="75" r="5" fill="black"/>
      </mask>
    </defs>
    <circle cx="50" cy="50" r="50" fill="black" mask="url(#yinYangMask)" />
    <circle cx="50" cy="25" r="5" fill="white" />
    <circle cx="50" cy="75" r="5" fill="black" />
  </svg>
  `;


  // 📜 顯示結果
  document.getElementById("result").innerHTML = `
    <h2>本卦：${mainGua.name} ${mainGua.symbol}</h2>
    <p>${mainGua.meaning}</p>
    <h3>變卦：${changedGua.name} ${changedGua.symbol}</h3>
    <p>${changedGua.meaning}</p>
    <p><strong>六爻：</strong>${lineText}</p>
  `;
});
