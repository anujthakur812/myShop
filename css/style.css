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

  document.getElementById("firstName").value = account.firstName || "";
  document.getElementById("lastName").value = account.lastName || "";
  document.getElementById("email").value = account.email || "";
  document.getElementById("phone").value = account.phone || "";
  const g = account.gender;
  const male = document.getElementById("gender-male");
  const female = document.getElementById("gender-female");
  if (male && female) {
    male.checked = g === "male";
    female.checked = g === "female";
  }
  const countryEl = document.getElementById("country");
  if (countryEl && account.country) countryEl.value = account.country;
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

  function clearSignupFormErrors() {
    const form = document.getElementById("signup-form");
    const alertEl = document.getElementById("signup-form-alert");
    if (alertEl) {
      alertEl.textContent = "";
      alertEl.classList.remove("show", "form-alert-error");
    }
    form.querySelectorAll(".input-error").forEach((el) => el.classList.remove("input-error"));
    const genderGroup = document.getElementById("gender-field-group");
    if (genderGroup) genderGroup.classList.remove("field-error");
  }

  function isValidEmailOptional(value) {
    if (!value) return true;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  const signupFormEl = document.getElementById("signup-form");
  signupFormEl.addEventListener("input", clearSignupFormErrors, true);
  signupFormEl.addEventListener("change", clearSignupFormErrors, true);

  signupFormEl.addEventListener("submit", (e) => {
    e.preventDefault();
    clearSignupFormErrors();

    const firstNameEl = document.getElementById("firstName");
    const lastNameEl = document.getElementById("lastName");
    const emailEl = document.getElementById("email");
    const phoneEl = document.getElementById("phone");
    const countryEl = document.getElementById("country");
    const genderFieldGroup = document.getElementById("gender-field-group");
    const alertEl = document.getElementById("signup-form-alert");

    const firstName = firstNameEl.value.trim();
    const lastName = lastNameEl.value.trim();
    const email = emailEl.value.trim();
    const phone = phoneEl.value.trim();
    const genderEl = document.querySelector('input[name="gender"]:checked');
    const gender = genderEl ? genderEl.value : "";
    const country = countryEl.value;

    const messages = [];
    if (!lastName) {
      lastNameEl.classList.add("input-error");
      messages.push("Last name is required.");
    }
    if (!phone) {
      phoneEl.classList.add("input-error");
      messages.push("Phone number is required.");
    }
    if (!gender) {
      if (genderFieldGroup) genderFieldGroup.classList.add("field-error");
      messages.push("Gender is required.");
    }
    if (!country) {
      countryEl.classList.add("input-error");
      messages.push("Country is required.");
    }
    if (email && !isValidEmailOptional(email)) {
      emailEl.classList.add("input-error");
      messages.push("Please enter a valid email address.");
    }

    if (messages.length) {
      if (alertEl) {
        alertEl.textContent = messages.join(" ");
        alertEl.classList.add("show", "form-alert-error");
        alertEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
      } else {
        showToast(messages.join(" "));
      }
      return;
    }

    const data = { firstName, lastName, email, phone, gender, country };
    saveAccount(data);
    const greet = firstName || "there";
    showToast("Welcome, " + greet + "!");
  });
}
