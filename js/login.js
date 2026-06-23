const savedPass = localStorage.getItem("passcode");

// ロック状態の確認
const lockUntil = Number(localStorage.getItem("lockUntil") || 0);
const now = Date.now();

if (now < lockUntil) {
  const sec = Math.ceil((lockUntil - now) / 1000);
  alert(`ロック中です。あと ${sec} 秒待ってください。`);
}

// 初回はパスコード設定へ
if (!savedPass) {
  location.href = "setpass.html";
}

document.getElementById("loginBtn").onclick = () => {
  const input = document.getElementById("passInput").value;

  // ロック中なら弾く
  const lockUntil = Number(localStorage.getItem("lockUntil") || 0);
  if (Date.now() < lockUntil) {
    alert("ロック中です。しばらく待ってください。");
    return;
  }

  if (input === savedPass) {
    // 成功 → カウントリセット
    localStorage.removeItem("failCount");
    location.href = "index.html";
  } else {
    // 失敗 → カウント増加
    let fail = Number(localStorage.getItem("failCount") || 0);
    fail++;
    localStorage.setItem("failCount", fail);

    if (fail >= 3) {
      // 30秒ロック
      const lockTime = Date.now() + 30000;
      localStorage.setItem("lockUntil", lockTime);
      alert("3回間違えたため、30秒間ロックされます。");
    } else {
      alert(`パスコードが違います（${fail}/3）`);
    }
  }
};
