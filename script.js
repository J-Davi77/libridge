const body = document.body;
const themeToggle = document.getElementById("themeToggle");
const menuBtn = document.getElementById("menuBtn");
const nav = document.querySelector(".nav");
const backTop = document.getElementById("backTop");
const progress = document.querySelector(".progress");

const savedTheme = localStorage.getItem("libridge-theme");
if (savedTheme) body.dataset.theme = savedTheme;

themeToggle.addEventListener("click", () => {
    const theme = body.dataset.theme === "dark" ? "light" : "dark";
    if (theme === "dark") body.dataset.theme = "dark";
    else delete body.dataset.theme;
    localStorage.setItem("libridge-theme", theme);
});

menuBtn.addEventListener("click", () => nav.classList.toggle("open"));

document.querySelectorAll(".nav a").forEach(link => {
    link.addEventListener("click", () => nav.classList.remove("open"));
});

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

const sections = [...document.querySelectorAll("main section[id]")];
const navLinks = [...document.querySelectorAll(".nav a")];

function updateScrollUI() {
    const scrollTop = window.scrollY;
    const total = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = `${total ? (scrollTop / total) * 100 : 0}%`;
    backTop.classList.toggle("show", scrollTop > 500);

    let current = sections[0]?.id;
    sections.forEach(section => {
        if (scrollTop >= section.offsetTop - 180) current = section.id;
    });
    navLinks.forEach(link => link.classList.toggle("active", link.getAttribute("href") === `#${current}`));
}

window.addEventListener("scroll", updateScrollUI, { passive: true });
updateScrollUI();

backTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
