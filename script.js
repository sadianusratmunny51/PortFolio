"use strict";

const menuButton = document.getElementById("menu-icon");
const navigation = document.getElementById("primary-navigation");
const navLinks = [...navigation.querySelectorAll("a")];
const mobileViewport = window.matchMedia("(max-width: 760px)");

function closeMenu(returnFocus = false) {
  const wasOpen = menuButton.getAttribute("aria-expanded") === "true";
  navigation.classList.remove("is-open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.querySelector(".menu-label").textContent = "Menu";
  if (returnFocus && wasOpen) menuButton.focus();
}

menuButton.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  navigation.classList.toggle("is-open", !isOpen);
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  menuButton.querySelector(".menu-label").textContent = isOpen ? "Menu" : "Close";
});
navLinks.forEach(link => link.addEventListener("click", () => {
  closeMenu();
  const section = document.querySelector(link.hash);
  section.setAttribute("tabindex", "-1");
  section.focus({ preventScroll: true });
}));
document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeMenu(true);
});
document.addEventListener("click", event => {
  if (!navigation.contains(event.target) && !menuButton.contains(event.target)) closeMenu();
});
document.addEventListener("focusin", event => {
  if (!navigation.contains(event.target) && !menuButton.contains(event.target)) closeMenu();
});
mobileViewport.addEventListener("change", () => closeMenu());
menuButton.hidden = false;
document.documentElement.classList.add("js");

// Keep the current section highlighted, including deep links and the page bottom.
const sections = [...document.querySelectorAll("main > section[id]")];
let scrollPending = false;
function updateActiveSection() {
  const marker = window.innerHeight * 0.35;
  let current = sections[0].id;
  for (const section of sections) {
    if (section.getBoundingClientRect().top <= marker) current = section.id;
  }
  if (Math.ceil(window.scrollY + window.innerHeight) >= document.documentElement.scrollHeight - 2) {
    current = sections[sections.length - 1].id;
  }
  for (const link of navLinks) {
    const active = link.hash === "#" + current;
    link.classList.toggle("active", active);
    if (active) link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  }
  scrollPending = false;
}
function scheduleActiveSection() {
  if (!scrollPending) {
    scrollPending = true;
    window.requestAnimationFrame(updateActiveSection);
  }
}
window.addEventListener("scroll", scheduleActiveSection, { passive: true });
window.addEventListener("resize", scheduleActiveSection);
window.addEventListener("load", updateActiveSection);
updateActiveSection();

const contactForm = document.getElementById("contact-form");
contactForm.addEventListener("submit", event => {
  event.preventDefault();
  if (!contactForm.reportValidity()) return;
  const values = new FormData(contactForm);
  const subject = String(values.get("subject")).trim();
  const body = String(values.get("body")).trim() + "\n\nFrom: " +
    String(values.get("name")).trim() + "\nEmail: " + String(values.get("email")).trim();
  window.location.href = "mailto:sadiamunny51@gmail.com?subject=" +
    encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
  document.getElementById("form-status").textContent =
    "Your email app should open with a draft. Send it there to complete your message. If it doesn’t open, email sadiamunny51@gmail.com directly.";
});
document.getElementById("current-year").textContent = new Date().getFullYear();

// Filters enhance the static project list; every project remains readable without JS.
const projectToolbar = document.querySelector(".project-toolbar");
const filterButtons = [...document.querySelectorAll("[data-project-filter]")];
const projectCards = [...document.querySelectorAll("[data-project-category]")];
const projectGroups = [...document.querySelectorAll(".recent-project-section, .other-projects-section, .additional-projects")];
const projectContainer = document.querySelector(".projects-container");
const projectCount = document.getElementById("project-count");

function filterProjects(category) {
  for (const card of projectCards) {
    card.hidden = category !== "all" && card.dataset.projectCategory !== category;
  }
  for (const group of projectGroups) {
    group.hidden = ![...group.querySelectorAll("[data-project-category]")].some(card => !card.hidden);
  }
  const visibleColumns = [...projectContainer.children].filter(group => !group.hidden).length;
  projectContainer.classList.toggle("is-single-column", visibleColumns === 1);
  for (const button of filterButtons) {
    button.setAttribute("aria-pressed", String(button.dataset.projectFilter === category));
  }
  const count = projectCards.filter(card => !card.hidden).length;
  projectCount.textContent = count + " of " + projectCards.length + " projects";
  scheduleActiveSection();
}

filterButtons.forEach(button => button.addEventListener("click", () => filterProjects(button.dataset.projectFilter)));
projectToolbar.hidden = false;
filterProjects("all");

// Research links must still work after a visitor filters to another category.
document.querySelectorAll('a[href="#research-project"]').forEach(link => {
  link.addEventListener("click", () => filterProjects("all"));
});
window.addEventListener("hashchange", () => {
  if (window.location.hash === "#research-project") {
    filterProjects("all");
    document.getElementById("research-project").scrollIntoView();
  }
});
