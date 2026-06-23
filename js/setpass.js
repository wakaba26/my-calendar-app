document.getElementById("setBtn").onclick = () => {
  const pass = document.getElementById("newPass").value;

  if (pass.length !== 4) {
    alert("4桁の数字を入力してください");
    return;
  }

  localStorage.setItem("passcode", pass);
  location.href = "login.html";
};
