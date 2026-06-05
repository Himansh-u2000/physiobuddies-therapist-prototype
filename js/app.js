const App = (() => {
  const screens = {
    home: "dashboard.html",
    appointments: "appointments.html",
    patients: "patients.html",
    earnings: "earnings.html",
    profile: "profile.html"
  };

  const NAV_ICONS = {
    home: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9.5z"/><path d="M9 21V12h6v9"/></svg>`,
    appointments: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/><path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"/></svg>`,
    patients: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
    earnings: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
    profile: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>`
  };

  const BELL_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>`;

  function platformClass() {
    const params = new URLSearchParams(location.search);
    const platform = params.get("platform") || localStorage.getItem("pb-platform") || "ios";
    localStorage.setItem("pb-platform", platform);
    document.body.classList.add("phone-screen", platform === "android" ? "platform-android" : "platform-ios");
  }

  function header(title = "Physiobuddies", subtitle = "Therapist Partner") {
    const slot = document.querySelector("[data-header]");
    if (!slot) return;
    slot.innerHTML = `
      <div class="status-bar">
        <span>9:41</span>
        <span class="sb-right">
          <span class="sb-signal"><i></i><i></i><i></i><i></i></span>
          <span class="sb-battery"><i></i></span>
        </span>
      </div>
      <header class="topbar">
        <a class="brand" href="dashboard.html">
          <img src="https://physiobuddies.in/assets/logo-CZkn2wwb.png" alt="Logo" style="width: 32px; height: 32px; object-fit: contain;" />
          <span class="brand-copy"><strong>${title}</strong><span>${subtitle}</span></span>
        </a>
        <div style="display:flex;align-items:center;gap:8px">
          <a class="icon-btn" href="notifications.html" aria-label="Notifications" style="position:relative">
            ${BELL_ICON}
            <span style="position:absolute;top:6px;right:6px;width:8px;height:8px;background:var(--danger);border-radius:50%;border:1.5px solid white;"></span>
          </a>
          <a class="avatar photo" href="profile.html" aria-label="Dr. Riya Sharma"></a>
        </div>
      </header>`;
  }

  function tabs(active = "home") {
    const slot = document.querySelector("[data-tabs]");
    if (!slot) return;
    const items = [
      ["home", "Home"],
      ["appointments", "Appts"],
      ["patients", "Patients"],
      ["earnings", "Earnings"],
      ["profile", "Profile"]
    ];
    slot.innerHTML = `<nav class="bottom-tabs" aria-label="Primary navigation">
      ${items.map(([key, label]) => `
        <a class="${key === active ? "active" : ""}" href="${screens[key]}">
          <span class="nav-ico">${NAV_ICONS[key]}</span>
          <span>${label}</span>
        </a>`).join("")}
    </nav>`;
  }

  function toast(message) {
    let el = document.querySelector(".toast");
    if (!el) {
      el = document.createElement("div");
      el.className = "toast";
      document.body.appendChild(el);
    }
    el.textContent = message;
    el.classList.add("show");
    clearTimeout(window.__pbToast);
    window.__pbToast = setTimeout(() => el.classList.remove("show"), 2200);
  }

  function sheet() {
    document.querySelectorAll("[data-open-sheet]").forEach((button) => {
      button.addEventListener("click", () => {
        const id = button.getAttribute("data-open-sheet");
        document.querySelector(`[data-sheet-backdrop="${id}"]`)?.classList.add("open");
        document.querySelector(`[data-sheet="${id}"]`)?.classList.add("open");
      });
    });
    document.querySelectorAll("[data-close-sheet]").forEach((button) => {
      button.addEventListener("click", () => {
        button.closest(".sheet")?.classList.remove("open");
        document.querySelectorAll(".sheet-backdrop.open").forEach((el) => el.classList.remove("open"));
      });
    });
    document.querySelectorAll(".sheet-backdrop").forEach((backdrop) => {
      backdrop.addEventListener("click", () => {
        backdrop.classList.remove("open");
        document.querySelectorAll(".sheet.open").forEach((el) => el.classList.remove("open"));
      });
    });
  }

  function bindBasics() {
    document.querySelectorAll("[data-toast]").forEach((el) => {
      el.addEventListener("click", () => toast(el.getAttribute("data-toast")));
    });
    document.querySelectorAll("[data-toggle-availability], #avail-toggle").forEach((el) => {
      el.addEventListener("click", () => {
        el.classList.toggle("off");
        const online = !el.classList.contains("off");
        const label = document.querySelector("[data-availability-label]");
        if (label) label.textContent = online ? "Available for home visits & clinic" : "Unavailable — tap to go online";
        const chip = document.querySelector(".chip.active");
        if (chip && chip.textContent.includes("Online")) chip.textContent = online ? "● Online" : "● Offline";
        toast(online ? "You are now online and visible to patients" : "You are now offline");
      });
    });
    document.querySelectorAll(".range-scale button").forEach((button) => {
      button.addEventListener("click", () => {
        button.parentElement.querySelectorAll("button").forEach((b) => b.classList.remove("active"));
        button.classList.add("active");
      });
    });
    document.querySelectorAll("[data-segmented] button, .tabs button.tab").forEach((button) => {
      button.addEventListener("click", () => {
        button.parentElement.querySelectorAll("button").forEach((b) => b.classList.remove("active"));
        button.classList.add("active");
        const target = button.getAttribute("data-panel");
        if (target) {
          document.querySelectorAll(".panel").forEach((panel) => panel.classList.remove("active"));
          document.querySelector(`[data-panel-view="${target}"]`)?.classList.add("active");
        }
        if (button.dataset.toast) toast(button.dataset.toast);
      });
    });
    document.querySelectorAll("[data-next]").forEach((button) => {
      button.addEventListener("click", () => {
        const target = button.getAttribute("data-next");
        if (target) window.location.href = target;
      });
    });
    document.querySelectorAll("[data-complete-flow]").forEach((button) => {
      button.addEventListener("click", () => {
        const copy = button.getAttribute("data-complete-flow") || "Saved";
        const target = button.getAttribute("data-target");
        toast(copy);
        button.setAttribute("disabled", "");
        setTimeout(() => {
          if (target) window.location.href = target;
          else button.removeAttribute("disabled");
        }, target ? 650 : 1200);
      });
    });
    document.querySelectorAll("[data-upload-state]").forEach((button) => {
      button.addEventListener("click", () => {
        const card = button.closest(".task-card, .card, .check-row");
        const chip = card?.querySelector(".chip");
        if (chip) { chip.className = "chip pending"; chip.textContent = "Uploaded"; }
        button.textContent = "Uploaded for review";
        button.setAttribute("disabled", "");
        toast("Document uploaded for review");
      });
    });
    document.querySelectorAll("[data-validate-phone]").forEach((form) => {
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        const input = form.querySelector("input");
        const field = input?.closest(".field");
        const value = (input?.value || "").replace(/\D/g, "");
        if (value.length < 10) {
          field?.classList.add("invalid");
          toast("Enter a valid 10 digit mobile number");
          return;
        }
        field?.classList.remove("invalid");
        window.location.href = form.getAttribute("data-success") || "otp.html";
      });
    });
  }

  function otp() {
    document.querySelectorAll(".otp-cell").forEach((input, index, inputs) => {
      input.addEventListener("input", () => {
        input.value = input.value.replace(/\D/g, "").slice(0, 1);
        input.classList.toggle("filled", !!input.value);
        if (input.value && inputs[index + 1]) inputs[index + 1].focus();
      });
      input.addEventListener("keydown", (event) => {
        if (event.key === "Backspace" && !input.value && inputs[index - 1]) inputs[index - 1].focus();
      });
    });
    document.querySelectorAll("[data-otp-submit]").forEach((button) => {
      button.addEventListener("click", () => {
        const cells = Array.from(document.querySelectorAll(".otp-cell"));
        const code = cells.map((cell) => cell.value).join("");
        if (code.length < cells.length) { toast("Enter the complete OTP"); return; }
        const target = button.getAttribute("data-target");
        toast(button.getAttribute("data-success") || "OTP verified");
        setTimeout(() => { if (target) window.location.href = target; }, 550);
      });
    });
  }

  function init(options = {}) {
    platformClass();
    header(options.title, options.subtitle);
    tabs(options.active);
    sheet();
    bindBasics();
    otp();
  }

  return { init, toast };
})();
