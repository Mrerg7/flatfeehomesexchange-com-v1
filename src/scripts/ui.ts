const root = document.documentElement;

function currentTheme(): "dark" | "light" {
  return root.classList.contains("dark") ? "dark" : "light";
}

function setTheme(theme: "dark" | "light") {
  root.classList.toggle("dark", theme === "dark");
  localStorage.setItem("ffhe-theme", theme);
  document.querySelectorAll<HTMLButtonElement>("[data-theme-toggle]").forEach((btn) => {
    btn.setAttribute("aria-pressed", String(theme === "dark"));
  });
}

document.querySelectorAll<HTMLButtonElement>("[data-theme-toggle]").forEach((btn) => {
  btn.setAttribute("aria-pressed", String(currentTheme() === "dark"));
  btn.addEventListener("click", () => {
    setTheme(currentTheme() === "dark" ? "light" : "dark");
    track("theme", { mode: currentTheme() });
  });
});

const menu = document.querySelector<HTMLElement>("#mobile-nav");
const menuBtn = document.querySelector<HTMLButtonElement>("[data-menu-toggle]");
menuBtn?.addEventListener("click", () => {
  const open = menu?.classList.toggle("hidden") === false;
  menuBtn.setAttribute("aria-expanded", String(open));
});

function track(event: string, detail?: Record<string, string>) {
  const payload = { event, ...detail, at: new Date().toISOString() };
  const w = window as Window & { dataLayer?: unknown[] };
  w.dataLayer = w.dataLayer ?? [];
  w.dataLayer.push(payload);
  try {
    const prev = JSON.parse(localStorage.getItem("ffhe-events") || "[]") as unknown[];
    prev.push(payload);
    localStorage.setItem("ffhe-events", JSON.stringify(prev.slice(-40)));
  } catch {
    /* private mode */
  }
}

document.querySelectorAll<HTMLElement>("[data-track]").forEach((el) => {
  el.addEventListener("click", () => {
    track("cta", { id: el.dataset.track || "unknown" });
  });
});

const offer = document.querySelector<HTMLDialogElement>("#offer-dialog");
document.querySelectorAll<HTMLButtonElement>("[data-open-offer]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const intent = btn.dataset.openOffer || "Make Offer";
    const label = offer?.querySelector<HTMLElement>("[data-intent-label]");
    const input = offer?.querySelector<HTMLInputElement>("input[name=intent]");
    if (label) label.textContent = intent;
    if (input) input.value = intent;
    document.querySelectorAll("dialog").forEach((node) => node.close());
    offer?.showModal();
    track("cta", { id: intent });
  });
});

document.querySelectorAll<HTMLFormElement>("[data-offer-form]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const amount = String(data.get("amount") || "").trim();
    const message = String(data.get("message") || "").trim();
    const intent = String(data.get("intent") || "Make Offer");
    const error = form.querySelector<HTMLElement>("[data-form-error]");
    if (name.length < 2) {
      if (error) error.textContent = "Add your name.";
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      if (error) error.textContent = "Add a real email so the owner can reply.";
      return;
    }
    if (error) error.textContent = "";
    const record = { name, email, amount, message, intent, at: new Date().toISOString() };
    try {
      const prev = JSON.parse(localStorage.getItem("ffhe-inquiries") || "[]") as unknown[];
      prev.push(record);
      localStorage.setItem("ffhe-inquiries", JSON.stringify(prev.slice(-20)));
    } catch {
      /* ignore */
    }
    track("inquiry_submit", { intent });
    const status = form.querySelector<HTMLElement>("[data-form-status]");
    if (status) {
      status.hidden = false;
      form.querySelectorAll("input, textarea, button[type=submit]").forEach((node) => {
        (node as HTMLInputElement).disabled = true;
      });
    }
    const subject = `Domain inquiry: flatfeehomesexchange.com (${intent})`;
    const body = `Name: ${name}\nEmail: ${email}\nOffer USD: ${amount || "not specified"}\nIntent: ${intent}\n\n${message || "(no message)"}`;
    window.location.href = `mailto:erg@flatfeehomesexchange.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
});

const searchForm = document.querySelector<HTMLFormElement>("#fit-search-form");
const searchInput = document.querySelector<HTMLInputElement>("#fit-search");
const cards = Array.from(document.querySelectorAll<HTMLElement>("[data-fit]"));
const empty = document.querySelector<HTMLElement>("#fit-empty");

function applyFilters(push: boolean) {
  const params = new URLSearchParams(location.search);
  const q = (searchInput?.value || params.get("q") || "").trim().toLowerCase();
  const cat = document.querySelector<HTMLButtonElement>("[data-cat][aria-pressed=true]")?.dataset.cat || params.get("cat") || "all";
  let shown = 0;
  cards.forEach((card) => {
    const category = card.dataset.category || "";
    const text = (card.dataset.text || "").toLowerCase();
    const okCat = cat === "all" || category === cat;
    const okQ = !q || text.includes(q);
    const visible = okCat && okQ;
    card.hidden = !visible;
    if (visible) shown += 1;
  });
  if (empty) empty.hidden = shown !== 0;
  if (push) {
    const next = new URLSearchParams();
    if (q) next.set("q", q);
    if (cat !== "all") next.set("cat", cat);
    const qs = next.toString();
    history.replaceState(null, "", qs ? `/?${qs}` : "/");
  }
}

if (searchInput) {
  const params = new URLSearchParams(location.search);
  const initialQ = params.get("q") || "";
  const initialCat = params.get("cat") || "all";
  searchInput.value = initialQ;
  document.querySelectorAll<HTMLButtonElement>("[data-cat]").forEach((btn) => {
    const on = btn.dataset.cat === initialCat;
    btn.setAttribute("aria-pressed", String(on));
    btn.classList.toggle("bg-sage", on);
    btn.classList.toggle("text-sage-ink", on);
    btn.classList.toggle("border", !on);
    btn.classList.toggle("border-line", !on);
    btn.classList.toggle("bg-card", !on);
  });
  applyFilters(false);
  searchForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    track("search", { q: searchInput.value });
    applyFilters(true);
  });
  document.querySelectorAll<HTMLButtonElement>("[data-cat]").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll<HTMLButtonElement>("[data-cat]").forEach((other) => {
        const on = other === btn;
        other.setAttribute("aria-pressed", String(on));
        other.classList.toggle("bg-sage", on);
        other.classList.toggle("text-sage-ink", on);
        other.classList.toggle("border", !on);
        other.classList.toggle("border-line", !on);
        other.classList.toggle("bg-card", !on);
      });
      track("filter", { cat: btn.dataset.cat || "all" });
      applyFilters(true);
    });
  });
}

const exit = document.querySelector<HTMLDialogElement>("#exit-dialog");
if (exit && !sessionStorage.getItem("ffhe-exit") && matchMedia("(hover: hover) and (pointer: fine)").matches) {
  const onOut = (event: MouseEvent) => {
    if (event.clientY > 8 || event.relatedTarget) return;
    sessionStorage.setItem("ffhe-exit", "1");
    exit.showModal();
    track("exit_intent");
    document.removeEventListener("mouseout", onOut);
  };
  document.addEventListener("mouseout", onOut);
}

document.querySelectorAll<HTMLButtonElement>("[data-close-dialog]").forEach((btn) => {
  btn.addEventListener("click", () => btn.closest("dialog")?.close());
});
