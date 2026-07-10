const ACCOUNT_KEY = "wingifyShop_account";

function getAccount() {
  try {
    return JSON.parse(localStorage.getItem(ACCOUNT_KEY)) || null;
  } catch {
    return null;
  }
}

function saveAccount(data) {
  localStorage.setItem(ACCOUNT_KEY, JSON.stringify(data));
  updateAccountUI();
}

function updateAccountUI() {
  const account = getAccount();
  const label = document.getElementById("account-label");
  const logoutBtn = document.getElementById("logout-btn");
  if (!label) return;

  label.textContent = account ? account.firstName : "Account";
  if (logoutBtn) logoutBtn.style.display = account ? "block" : "none";
}

function loadAccountForm() {
  const account = getAccount();
  if (!account) return;

  document.getElementById("firstName").value = account.firstName;
  document.getElementById("lastName").value = account.lastName;
  document.getElementById("email").value = account.email;
  document.getElementById("phone").value = account.phone;
}

function initAccount() {
  document.getElementById("account-toggle").addEventListener("click", (e) => {
    e.stopPropagation();
    document.getElementById("account-menu").classList.toggle("open");
  });

  document.addEventListener("click", () => {
    document.getElementById("account-menu").classList.remove("open");
  });

  document.getElementById("logout-btn").addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.removeItem(ACCOUNT_KEY);
    updateAccountUI();
    document.getElementById("account-menu").classList.remove("open");
    showToast("Logged out successfully");
  });

  document.getElementById("signup-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const data = {
      firstName: document.getElementById("firstName").value.trim(),
      lastName: document.getElementById("lastName").value.trim(),
      email: document.getElementById("email").value.trim(),
      phone: document.getElementById("phone").value.trim(),
    };

    if (!data.firstName || !data.lastName || !data.email || !data.phone) {
      showToast("Please fill in all fields");
      return;
    }

    saveAccount(data);
    showToast("Welcome, " + data.firstName + "!");
  });
}
