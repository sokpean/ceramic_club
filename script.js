/* =========================================================
   Tutorials — edit this list to add or change videos.
   Use the ID from the YouTube link: youtube.com/watch?v=THIS_PART
   ========================================================= */
const tutorials = [
  { title: "Centering", videoId: "-YCGK33c0xs" },
  { title: "Opening", videoId: "HF5IAJ0x2g0" },
  { title: "Pulling", videoId: "VM8SJZ4lNRY" },
  { title: "Trimming", videoId: "XhlJLVL-Zg8" },
];

function renderTutorials() {
  document.getElementById("tutorial-grid").innerHTML = tutorials
    .map(
      (t, i) => `
        <article class="tutorial-card">
          <div class="tutorial-video">
            <iframe
              src="https://www.youtube-nocookie.com/embed/${t.videoId}"
              title="${t.title}"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe>
          </div>
          <h2>${i + 1}. ${t.title}</h2>
          ${t.description ? `<p>${t.description}</p>` : ""}
        </article>`
    )
    .join("");
}

/* =========================================================
   Page switching — uses #/hours, #/resources, #/contact
   ========================================================= */
const PAGES = ["home", "hours", "resources", "contact"];
const pagesEl = document.getElementById("pages");
const nav = document.getElementById("main-nav");
const menuButton = document.getElementById("menu-button");
let currentPage = null;

function pageFromHash() {
  const page = location.hash.replace("#/", "");
  return PAGES.includes(page) ? page : "home";
}

function showPage(page) {
  if (page === currentPage) return;
  currentPage = page;

  document.querySelectorAll("[data-page]").forEach((el) => {
    el.hidden = el.dataset.page !== page;
  });
  nav.querySelectorAll("[data-nav]").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.nav === page);
  });

  // Restart the fade-in animation
  pagesEl.classList.remove("page-transition");
  void pagesEl.offsetWidth;
  pagesEl.classList.add("page-transition");
}

function setMenu(open) {
  nav.classList.toggle("nav-open", open);
  menuButton.setAttribute("aria-expanded", open);
}

/* =========================================================
   Init
   ========================================================= */
renderTutorials();

document.querySelectorAll("[data-nav]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const page = btn.dataset.nav;
    location.hash = page === "home" ? "/" : `/${page}`;
    showPage(page);
    setMenu(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

menuButton.addEventListener("click", () => setMenu(!nav.classList.contains("nav-open")));
window.addEventListener("hashchange", () => showPage(pageFromHash()));
showPage(pageFromHash());
