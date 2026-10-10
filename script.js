
"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const $ = (selector) => document.querySelector(selector);

  const serviceGrid = $("#serviceGrid");
  const packageGrid = $("#packageGrid");
  const testSearch = $("#testSearch");
  const categoryFilter = $("#categoryFilter");
  const testResults = $("#testResults");
  const resultsCount = $("#resultsCount");
  const searchHint = $("#searchHint");
  const testFinder = $("#testFinder");
  const clearSearch = $("#clearSearch");

  const escapeHTML = (value) =>
    String(value ?? "").replace(/[&<>"']/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    })[char]);

  const money = (price) =>
    price == null ? "Contact for price" : `₹${Number(price).toLocaleString("en-IN")}`;

  function setupRevealAnimations(container) {
    if (!container) return;

    const cards = container.querySelectorAll(".reveal-card");

    if (!("IntersectionObserver" in window)) {
      cards.forEach((card) => card.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });

    cards.forEach((card) => observer.observe(card));
  }

  function renderServices() {
    if (!serviceGrid) return;

    serviceGrid.innerHTML = SERVICES.map((service, index) => `
      <article class="service-card reveal-card" style="--card-index:${index % 8}">
        <div class="service-icon" aria-hidden="true">${escapeHTML(service.icon)}</div>
        <h3>${escapeHTML(service.name)}</h3>
        <p>${escapeHTML(service.description)}</p>
        <button
          class="button button-outline service-explore"
          type="button"
          data-category="${escapeHTML(service.name)}"
        >
          Explore Tests <span aria-hidden="true">→</span>
        </button>
      </article>
    `).join("");

    // Critical fix: initialize animations after adding the service cards.
    setupRevealAnimations(serviceGrid);
  }

  function populateCategories() {
    if (!categoryFilter) return;

    categoryFilter.innerHTML = [
      '<option value="">All categories</option>',
      ...SERVICES.map((service) =>
        `<option value="${escapeHTML(service.name)}">${escapeHTML(service.name)}</option>`
      )
    ].join("");
  }

  function renderTests() {
    if (!testResults || !testSearch || !categoryFilter) return;

    const query = testSearch.value.trim().toLowerCase();
    const category = categoryFilter.value;
    const shouldShow = query.length > 0 || category.length > 0;

    clearSearch?.classList.toggle("is-visible", query.length > 0);

    if (!shouldShow) {
      testResults.innerHTML = "";
      testResults.hidden = true;
      resultsCount.textContent = "Browse our diagnostic categories";
      searchHint.textContent = "Choose a category or enter a test name to get started.";
      return;
    }

    const filtered = TESTS.filter((test) => {
      const matchesQuery =
        test.name.toLowerCase().includes(query) ||
        test.category.toLowerCase().includes(query);

      const matchesCategory = !category || test.category === category;
      return matchesQuery && matchesCategory;
    });

    resultsCount.textContent =
      `${filtered.length} ${filtered.length === 1 ? "test" : "tests"} found`;

    searchHint.textContent = filtered.length
      ? "Select a test to enquire about its availability and price."
      : "No matching tests found. Try another search or category.";

    testResults.hidden = false;

    if (!filtered.length) {
      testResults.innerHTML = `
        <div class="empty-results">
          <strong>No tests found</strong>
          <p>Please try a different keyword or select another category.</p>
        </div>
      `;
      return;
    }

    testResults.innerHTML = filtered.map((test, index) => `
      <article class="test-card reveal-card" style="--card-index:${index % 6}">
        <span class="test-card-icon" aria-hidden="true">✚</span>
        <div class="test-card-content">
          <h3>${escapeHTML(test.name)}</h3>
          <p>${escapeHTML(test.category)}</p>
          <strong class="test-price">${escapeHTML(money(test.price))}</strong>
        </div>
        <button
          type="button"
          class="text-link test-enquire"
          data-test="${escapeHTML(test.name)}"
        >Enquire →</button>
      </article>
    `).join("");

    setupRevealAnimations(testResults);
  }

  function renderPackages() {
    if (!packageGrid) return;

    packageGrid.innerHTML = PACKAGES.map((item, index) => `
      <article class="package-card reveal-card ${item.featured ? "package-featured" : ""}"
        style="--card-index:${index % 6}">
        <div class="package-card-top">
          <span class="package-label">${escapeHTML(item.label)}</span>
          <span class="package-symbol" aria-hidden="true">♡</span>
        </div>
        <h3>${escapeHTML(item.name)}</h3>
        <p class="package-description">${escapeHTML(item.description)}</p>
        <div class="package-includes">
          <strong>Package enquiries include</strong>
          ${item.includes.map((detail) =>
            `<span><b aria-hidden="true">✓</b>${escapeHTML(detail)}</span>`
          ).join("")}
        </div>
        <button
          class="button ${item.featured ? "button-primary" : "button-outline"} button-full package-enquire"
          type="button"
          data-package="${escapeHTML(item.name)}"
        >Enquire About Package <span aria-hidden="true">→</span></button>
      </article>
    `).join("");

    setupRevealAnimations(packageGrid);
  }

  function openTestFinder(category = "") {
    if (categoryFilter) categoryFilter.value = category;

    if (testFinder) {
      testFinder.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    if (category) {
      if (testSearch) testSearch.value = "";
      renderTests();
    }

    if (categoryFilter) {
      categoryFilter.focus({ preventScroll: true });
    }
  }

  serviceGrid?.addEventListener("click", (event) => {
    const button = event.target.closest(".service-explore");
    if (!button) return;

    const category = button.dataset.category || "";

    // Health Packages is a separate section, so its card links to packages.
    if (category === "Health Packages") {
      $("#packages")?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    openTestFinder(category);
  });

  testSearch?.addEventListener("input", renderTests);
  categoryFilter?.addEventListener("change", renderTests);

  clearSearch?.addEventListener("click", () => {
    if (testSearch) {
      testSearch.value = "";
      testSearch.focus();
    }
    renderTests();
  });

  $("#openTestFinder")?.addEventListener("click", () => {
    $("#tests")?.scrollIntoView({ behavior: "smooth" });
    testSearch?.focus({ preventScroll: true });
  });

  document.addEventListener("click", (event) => {
    const testButton = event.target.closest(".test-enquire");
    const packageButton = event.target.closest(".package-enquire");

    if (testButton) {
      const field = $("#visitorMessage");
      if (field) {
        field.value = `I would like to enquire about the ${testButton.dataset.test} test, including its availability, price and preparation instructions.`;
      }
      $("#contact")?.scrollIntoView({ behavior: "smooth" });
    }

    if (packageButton) {
      const field = $("#visitorMessage");
      if (field) {
        field.value = `I would like to enquire about the ${packageButton.dataset.package} package, including its price, test inclusions and availability.`;
      }
      $("#contact")?.scrollIntoView({ behavior: "smooth" });
    }
  });

  // Mobile navigation
  const menuToggle = $("#menuToggle");
  const mainNav = $("#mainNav");

  menuToggle?.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
    mainNav?.classList.toggle("is-open", !isOpen);
    document.body.classList.toggle("menu-open", !isOpen);
  });

  mainNav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("is-open");
      document.body.classList.remove("menu-open");
      menuToggle?.setAttribute("aria-expanded", "false");
      menuToggle?.setAttribute("aria-label", "Open navigation");
    });
  });

  // Contact information
  const setText = (selector, value) => {
    const element = $(selector);
    if (element && value) element.textContent = value;
  };

  setText("#centerAddress", CENTER_CONTENT.address);
  setText("#centerPhone", CENTER_CONTENT.phoneDisplay);
  setText("#centerHours", CENTER_CONTENT.hours);
  setText("#currentYear", new Date().getFullYear());

  // WhatsApp enquiry form
  $("#contactForm")?.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = $("#visitorName")?.value.trim() || "";
    const phone = $("#visitorPhone")?.value.trim() || "";
    const message = $("#visitorMessage")?.value.trim() || "";
    const note = $("#formNote");

    if (!name || !phone || !message) {
      if (note) note.textContent = "Please complete all fields.";
      return;
    }

    const whatsapp = String(CENTER_CONTENT.whatsappDigits || "").replace(/\D/g, "");

    if (!whatsapp) {
      if (note) {
        note.textContent = "WhatsApp is not configured yet. Please add whatsappDigits in content.js.";
      }
      return;
    }

    const text = [
      `Hello ${CENTER_CONTENT.name},`,
      "",
      `Name: ${name}`,
      `Contact number: ${phone}`,
      `Enquiry: ${message}`
    ].join("\n");

    const url = `https://wa.me/${whatsapp}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");

    if (note) note.textContent = "WhatsApp enquiry opened in a new tab.";
  });

  // Initialize the page in dependency order.
  populateCategories();
  renderServices();
  renderPackages();
  renderTests();
});
