
"use strict";

/* =====================================================================
   EDITABLE CONFIGURATION: change values here, the whole page updates.
   Everything below marked SAMPLE is demonstration data, not confirmed
   by the laboratory. Replace it before launch.
   ===================================================================== */
const BUSINESS_INFO = {
  name: "Shiva Sathvika Diagnostic Lab",
  location: "Chikkaballapur, Karnataka, India",
  hours: "Monday–Saturday, 7:00 AM–8:30 PM",
  openFrom: "07:00",
  openTo: "20:30"
};
const PHONE_NUMBER = "0909090909";   // PLACEHOLDER: replace with the real number
const WHATSAPP_NUMBER = "";          // Digits only with country code, e.g. 919876543210. Empty = disabled.
const SETTINGS = {
  reportHours: 24,                                   // SAMPLE target, confirm with lab
  collectionArea: "To be confirmed by the lab",      // REPLACE with real coverage
  collectionHours: "To be confirmed by the lab",     // REPLACE with real timings
  freeCollectionMin: 500                             // SAMPLE bill amount (₹)
};

const CATS = { H:"Haematology", U:"Urine Analysis", S:"Stool Analysis", B:"Bio-chemistry", L:"Lipid Profile", V:"Liver Function", O:"Hormones", R:"Serology", M:"Microbiology" };
const CAT_DESC = { H:"A haematology test.", U:"A urine analysis test.", S:"A stool analysis test.", B:"A bio-chemistry test.", L:"A lipid profile test.", V:"A liver function test.", O:"A hormone or related test.", R:"A serology test.", M:"A microbiology or pathology test." };

// REAL catalogue, transcribed from the lab's displayed price list. Row: [name, category, price in ₹].
// Report time, sample type and fasting rules are not on the list, so the site says "confirm with lab".
const TEST_ROWS = [
  ["HB%","H",100],["RBC Count","H",50],["WBC Count","H",50],["D.C. (Differential Count)","H",50],["ESR","H",50],["AEC (Absolute Eosinophil Count)","H",150],["CBC","H",300],["PCV","H",30],["MCV","H",30],["MCH","H",30],["MCHC","H",30],["BT (Bleeding Time)","H",50],["CT (Clotting Time)","H",50],["Platelet Count","H",150],["PT with INR","H",450],["Reticulocyte Count","H",400],["LE Cell Phenomenon","H",450],["Peripheral Smear","H",300],["Malarial Parasites","H",200],["Blood Group & Rh","H",50],["Dengue NS1, IgM, IgG","H",500],["Pf / Pv (Malaria)","H",250],
  ["Urine Sugar","U",20],["Urine Albumin","U",20],["Urine Microscopy","U",20],["Bile Salt","U",20],["Bile Pigment","U",20],["Ketone Bodies","U",150],["24 Hrs Urine Protein","U",500],["Urobilinogen","U",100],["Bence Jones Protein","U",100],["Pregnancy Test","U",100],
  ["Stool Routine","S",150],["Stool Occult","S",50],["Stool Substances","S",40],
  ["FBS (Fasting Blood Sugar)","B",50],["PPBS (Post-Prandial Blood Sugar)","B",50],["RBS (Random Blood Sugar)","B",50],["GTT (Glucose Tolerance Test)","B",250],["Glycosylated Hb (HbA1c)","B",500],["Urea","B",100],["S. Creatinine","B",100],["Uric Acid","B",150],["RFT (Renal Function Test)","B",300],["S. Calcium","B",200],["CPK","B",300],["CPK-MB","B",400],["Amylase","B",600],["Sodium","B",150],["Potassium","B",150],["Acid Phosphatase","B",350],["CA 125","B",1000],
  ["Lipid Profile","L",400],["Total Cholesterol","L",100],["Triglycerides","L",100],["HDL","L",100],["LDL & VLDL","L",200],
  ["Liver Function Test (LFT)","V",600],["T. Bilirubin","V",100],["D. Bilirubin","V",100],["T. Protein","V",100],["Albumin (Serum)","V",100],["Globulin","V",100],["A/G Ratio","V",100],["SGPT","V",100],["SGOT","V",100],["Alkaline Phosphatase","V",180],
  ["T3, T4, TSH","O",500],["LH / FSH / Prolactin","O",1200],["Testosterone","O",1200],["TORCH","O",2000],["B-HCG","O",800],
  ["Widal","R",100],["VDRL","R",150],["RA Factor","R",150],["HIV","R",250],["CRP","R",150],["ASLO","R",150],["Dilution (each)","R",100],["HBsAg","R",200],["Mantoux","R",150],
  ["Urine (Microbiology)","M",500],["Faeces (Microbiology)","M",500],["Pus (Microbiology)","M",500],["Throat (Microbiology)","M",500],["Swab (Microbiology)","M",500],["Sputum (Microbiology)","M",500],["Sputum for AFB","M",150],["Gram Stain","M",250],["Semen Analysis","M",200],["Blood (Microbiology)","M",650],["Histopathology","M",1000]
];
const POPULAR_TEST_IDS = ["cbc","fbs-fasting-blood-sugar","glycosylated-hb-hba1c","lipid-profile","t3-t4-tsh","liver-function-test-lft","rft-renal-function-test","esr","crp","widal"];

// SAMPLE packages built from the real tests above. The original price is the sum of the test prices;
// "disc" is a SAMPLE discount percentage. Set the real package prices and discounts when confirmed.
const PACKAGES = [
  { name:"Basic Health Check", desc:"A starting set of routine checks.", tests:["CBC","FBS (Fasting Blood Sugar)","Lipid Profile","Urine Sugar","Urine Albumin","Urine Microscopy"], disc:10 },
  { name:"Full Body Checkup", desc:"A wider panel covering several body systems.", tests:["CBC","ESR","FBS (Fasting Blood Sugar)","Glycosylated Hb (HbA1c)","Lipid Profile","Liver Function Test (LFT)","RFT (Renal Function Test)","T3, T4, TSH","Urine Sugar","Urine Albumin","Urine Microscopy"], disc:20, badge:"Most Popular" },
  { name:"Diabetes Care", desc:"Sugar-related checks and kidney markers.", tests:["FBS (Fasting Blood Sugar)","PPBS (Post-Prandial Blood Sugar)","Glycosylated Hb (HbA1c)","Urine Sugar","Urine Albumin","RFT (Renal Function Test)"], disc:10 },
  { name:"Heart Health", desc:"Cholesterol and related heart markers.", tests:["Lipid Profile","CRP","CPK","CPK-MB","FBS (Fasting Blood Sugar)"], disc:10 },
  { name:"Thyroid Profile", desc:"Thyroid hormones with a blood count and lipid check.", tests:["T3, T4, TSH","CBC","Lipid Profile"], disc:10 },
  { name:"Senior Citizen", desc:"A routine panel for older adults.", tests:["CBC","FBS (Fasting Blood Sugar)","Glycosylated Hb (HbA1c)","Lipid Profile","Liver Function Test (LFT)","RFT (Renal Function Test)","S. Calcium","Urine Sugar","Urine Albumin"], disc:15 },
  { name:"Women's Wellness", desc:"Common checks for women's health.", tests:["CBC","ESR","T3, T4, TSH","S. Calcium","Blood Group & Rh","Urine Microscopy"], disc:10 }
];

// SAMPLE offers. Set expires to "YYYY-MM-DD" only when the lab confirms it. Empty = not confirmed.
const OFFERS = [
  { title:"Full Body Checkup discount", desc:"A sample discount on the Full Body Checkup package.", benefit:"20% off", cond:"Package booking only", expires:"" },
  { title:"Free home collection", desc:"Home collection with no collection charge above a minimum bill.", benefit:"No collection charge", cond:"Bills above ₹" + SETTINGS.freeCollectionMin, expires:"" },
  { title:"Senior citizen discount", desc:"A sample discount for patients aged 60 and above.", benefit:"10% off", cond:"Age proof may be needed", expires:"" },
  { title:"Family package discount", desc:"A sample discount when several family members book together.", benefit:"Family rate", cond:"2 or more members", expires:"" },
  { title:"First-booking discount", desc:"A sample welcome discount for new patients.", benefit:"10% off", cond:"New patients only", expires:"" }
];

const REVIEWS = [   // SAMPLE layout content, not real feedback
  "Sample review text to show how a patient comment will look in this card.",
  "Another sample comment. Replace with real, permitted patient feedback.",
  "A third sample entry for the carousel layout.",
  "A fourth sample entry showing a slightly longer comment so you can check wrapping on small screens."
];
const FAQS = [
  ["Do I need to fast before my test?", "Some tests need fasting and many do not. Please confirm the preparation for your test with the lab before you visit."],
  ["How long do test reports take?", "Timing depends on the test. Please confirm the expected report time with the lab."],
  ["Is home sample collection available?", "You can request it through this site. The lab will confirm whether it is available for your area and test."],
  ["What payment methods are accepted?", "Please ask the lab which payment methods it accepts."],
  ["How can I access my report online?", "Ask the lab how online reports are shared with you. The method will be confirmed when you enquire."],
  ["How should I prepare for my test?", "Preparation differs by test. Follow the instructions given by your doctor and confirm details with the lab."],
  ["Are discounts or offers available?", "Offers shown here are samples. Ask the lab which offers are currently running."],
  ["Are senior citizen discounts available?", "Please ask the lab whether a senior citizen discount applies to your tests."]
];

/* =====================================================================
   DATA BUILD AND VALIDATION
   ===================================================================== */
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const TESTS = TEST_ROWS.map(([name, c, price]) => ({
  id: slug(name), name, cat: CATS[c], catKey: c, price, desc: CAT_DESC[c]
}));
const TEST_MAP = new Map(TESTS.map((t) => [t.id, t]));
if (TEST_MAP.size !== TESTS.length) console.warn("Duplicate test IDs found.");
PACKAGES.forEach((p) => {
  p.id = "pkg-" + slug(p.name);
  p.testIds = p.tests.map(slug);
  p.testIds.forEach((id) => { if (!TEST_MAP.has(id)) console.warn("Package", p.name, "references unknown test", id); });
  p.orig = p.testIds.reduce((s, id) => s + (TEST_MAP.has(id) ? TEST_MAP.get(id).price : 0), 0);
  p.price = Math.round(p.orig * (1 - p.disc / 100) / 10) * 10;
  p.discount = Math.round((1 - p.price / p.orig) * 100);
});
POPULAR_TEST_IDS.forEach((id) => { if (!TEST_MAP.has(id)) console.warn("Unknown popular test", id); });
const PKG_MAP = new Map(PACKAGES.map((p) => [p.id, p]));
const getItem = (id) => TEST_MAP.get(id) || PKG_MAP.get(id);

/* =====================================================================
   HELPERS
   ===================================================================== */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const rupee = (n) => "₹" + n.toLocaleString("en-IN");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Click effects: ripple on buttons, sparks and "+1" on add/claim */
let lastPt = { x: innerWidth / 2, y: innerHeight / 2 };
document.addEventListener("click", (e) => {
  const t = e.target.closest(".btn,.tab,.fab");
  const r = t ? t.getBoundingClientRect() : null;
  lastPt = e.clientX || e.clientY ? { x: e.clientX, y: e.clientY } : r ? { x: r.left + r.width / 2, y: r.top + r.height / 2 } : lastPt;
  if (!t || reduceMotion) return;
  const d = Math.max(r.width, r.height), s = h("span", "ripple");
  s.style.cssText = "width:" + d + "px;height:" + d + "px;left:" + (lastPt.x - r.left - d / 2) + "px;top:" + (lastPt.y - r.top - d / 2) + "px";
  t.append(s);
  setTimeout(() => s.remove(), 650);
}, true);
function burst(n) {
  if (reduceMotion) return;
  for (let i = 0; i < n; i++) {
    const s = h("span", "spark"), a = (i / n) * Math.PI * 2, d = 34 + (i % 3) * 14;
    s.style.cssText = "left:" + lastPt.x + "px;top:" + lastPt.y + "px;--dx:" + Math.cos(a) * d + "px;--dy:" + Math.sin(a) * d + "px";
    document.body.append(s);
    setTimeout(() => s.remove(), 750);
  }
}
function fxAdd() {
  if (reduceMotion) return;
  burst(8);
  const p = h("span", "plus", "+1");
  p.style.cssText = "left:" + (lastPt.x - 18) + "px;top:" + (lastPt.y - 30) + "px";
  document.body.append(p);
  setTimeout(() => p.remove(), 950);
  const c = document.getElementById("cart");
  c.classList.remove("bump"); void c.offsetWidth; c.classList.add("bump");
}
function h(tag, cls, text) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (text != null) e.textContent = text;
  return e;
}
function btn(label, cls, onClick, aria) {
  const b = h("button", cls, label);
  b.type = "button";
  if (aria) b.setAttribute("aria-label", aria);
  b.addEventListener("click", onClick);
  return b;
}
const phoneDigits = PHONE_NUMBER.replace(/[^\d+]/g, "");
const phoneOk = /^\+?\d{8,15}$/.test(phoneDigits);
const waOk = /^\d{11,15}$/.test(WHATSAPP_NUMBER);

let toastTimer;
function toast(msg, linkText, href) {
  const t = $("#toast");
  t.textContent = msg;
  if (linkText) { const a = h("a", "", linkText); a.href = href; t.append(a); }
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 4000);
}

/* =====================================================================
   STATIC BINDINGS
   ===================================================================== */
$("#year").textContent = new Date().getFullYear();
$("#statTests").dataset.count = TESTS.length;
$("#statHours").dataset.count = SETTINGS.reportHours;
$("#areaTxt").textContent = SETTINGS.collectionArea;
$("#collHours").textContent = SETTINGS.collectionHours;
$$("[data-phone]").forEach((a) => {
  if (phoneOk) { a.href = "tel:" + phoneDigits; a.textContent = PHONE_NUMBER; if (a.classList.contains("fab")) a.textContent = "Call"; }
  else { a.textContent = "Phone to be added"; a.removeAttribute("href"); }
});

/* =====================================================================
   OFFERS MARQUEE AND OFFER CARDS
   ===================================================================== */
const offerLine = (o) => o.title + " (" + o.benefit + ")";
(function marquee() {
  const track = $("#marquee");
  for (let i = 0; i < 2; i++) {
    const g = h("div"); g.style.display = "flex";
    if (i) g.setAttribute("aria-hidden", "true");
    OFFERS.forEach((o) => g.append(h("span", "", "✦ " + offerLine(o))));
    track.append(g);
  }
})();
function expiryText(o) {
  if (!o.expires) return "Expiry: to be confirmed";
  const d = new Date(o.expires + "T23:59:59");
  return d < new Date() ? "Expired on " + o.expires : "Valid until " + o.expires;
}
OFFERS.forEach((o, i) => {
  const c = h("article", "card reveal");
  c.style.setProperty("--i", i);
  c.append((() => { const g = h("span", "ico glow", "%"); g.setAttribute("aria-hidden", "true"); return g; })(), h("span", "badge", "Sample promotion"), h("h3", "", o.title), h("p", "", o.desc), h("div", "benefit", o.benefit),
    h("p", "", "Conditions: " + o.cond), h("p", "", expiryText(o)));
  const b = btn("Claim Offer", "btn btn-g", () => {
    burst(12);
    $("#serviceSelect").value = "general";
    $("#patientMessage").value = "I would like to ask about this offer: " + o.title + ".";
    goToForm();
  });
  c.append(b);
  $("#offerGrid").append(c);
});

/* =====================================================================
   BOOKING CART (memory only; never persisted)
   ===================================================================== */
const cart = new Map();
function addToCart(id) {
  const item = getItem(id);
  if (!item) return;
  cart.set(id, (cart.get(id) || 0) + 1);
  renderCart();
  fxAdd();
  toast("Added " + item.name + " to your booking.", "View booking", "#cart");
}
function cartTotals() {
  let total = 0, save = 0;
  cart.forEach((q, id) => {
    const it = getItem(id);
    total += it.price * q;
    if (it.orig) save += (it.orig - it.price) * q;
  });
  return { total, save };
}
function renderCart() {
  const list = $("#cartList");
  list.replaceChildren();
  cart.forEach((q, id) => {
    const it = getItem(id);
    const li = h("li");
    li.append(h("span", "", it.name), h("b", "", rupee(it.price * q)));
    const qty = h("div", "qty");
    qty.append(
      btn("−", "", () => { if (q > 1) cart.set(id, q - 1); else cart.delete(id); renderCart(); }, "Decrease quantity of " + it.name),
      h("span", "", String(q)),
      btn("+", "", () => { cart.set(id, q + 1); renderCart(); }, "Increase quantity of " + it.name)
    );
    const rm = btn("Remove", "link-btn", () => { cart.delete(id); renderCart(); }, "Remove " + it.name);
    li.append(qty, rm);
    list.append(li);
  });
  const { total, save } = cartTotals();
  const has = cart.size > 0;
  $("#cartEmpty").hidden = has;
  $("#cartTotal").hidden = !has;
  $("#cartSave").hidden = !(has && save > 0);
  $("#cartSum").textContent = rupee(total);
  $("#cartSave").textContent = "Package savings (sample): " + rupee(save);
  $("#cartNote").textContent = has ? cart.size + " item(s) from your booking cart will be included." : "";
}
$("#clearCart").addEventListener("click", () => { cart.clear(); renderCart(); });
$("#sendCart").addEventListener("click", () => {
  if (!cart.size) { toast("Add at least one test or package first."); return; }
  $("#serviceSelect").value = "cart";
  goToForm();
});

/* =====================================================================
   CARDS: POPULAR TESTS, CATALOGUE, PACKAGES
   ===================================================================== */
let detailId = null;
function openDetail(id) {
  const t = TEST_MAP.get(id);
  detailId = id;
  $("#dTitle").textContent = t.name;
  $("#dDesc").textContent = t.desc;
  const f = $("#dFacts");
  f.replaceChildren();
  [["Category", t.cat], ["Price (lab list)", rupee(t.price)], ["Preparation", "Confirm with lab"], ["Report time", "Confirm with lab"]].forEach(([k, v]) => {
    const d = h("div"); d.append(h("dt", "", k), h("dd", "", v)); f.append(d);
  });
  $("#detail").showModal();
}
$("#dAdd").addEventListener("click", () => { addToCart(detailId); $("#detail").close(); });
$("#dClose").addEventListener("click", () => $("#detail").close());
$("#detail").addEventListener("click", (e) => { if (e.target === e.currentTarget) e.currentTarget.close(); });

POPULAR_TEST_IDS.forEach((id, i) => {
  const t = TEST_MAP.get(id);
  if (!t) return;
  const c = h("article", "card reveal");
  c.style.setProperty("--i", i % 5);
  const meta = h("ul", "meta");
  meta.append(h("li", "", t.cat), h("li", "", "Report time: confirm with lab"));
  const actions = h("div", "card-btns");
  actions.append(btn("Add to Booking", "btn btn-p", () => addToCart(id)), btn("View Details", "link-btn", () => openDetail(id), "View details for " + t.name));
  c.append(h("span", "ico", t.catKey), h("h3", "", t.name), h("p", "", t.desc), meta, h("div", "price", rupee(t.price)), actions);
  $("#popularGrid").append(c);
});

PACKAGES.forEach((p, i) => {
  const c = h("article", "card reveal" + (p.badge ? " feature" : ""));
  c.style.setProperty("--i", i % 4);
  if (p.badge) c.append(h("span", "badge", p.badge));
  const price = h("div", "price", rupee(p.price));
  price.append(h("s", "", rupee(p.orig)));
  const det = h("details");
  det.append(h("summary", "", "Included tests (" + p.tests.length + ")"));
  const ul = h("ul");
  p.tests.forEach((n) => ul.append(h("li", "", n)));
  det.append(ul);
  c.append(h("h3", "", p.name), h("p", "", p.desc), h("p", "", p.tests.length + " tests included."),
    price, h("span", "tag off", p.discount + "% off (sample)"), det,
    (() => { const a = h("div", "card-btns"); a.append(btn("Book Package", "btn btn-p", () => addToCart(p.id))); return a; })());
  $("#pkgGrid").append(c);
});

/* Catalogue: search + category tabs */
const state = { cat: "all", q: "" };
const tabsEl = $("#tabs");
[["all", "All"], ...Object.entries(CATS)].forEach(([key, label]) => {
  const b = h("button", "tab", label);
  b.type = "button"; b.dataset.cat = key;
  b.setAttribute("role", "tab");
  b.setAttribute("aria-selected", key === "all" ? "true" : "false");
  b.setAttribute("aria-controls", "results");
  b.tabIndex = key === "all" ? 0 : -1;
  tabsEl.append(b);
});
function setCat(key) {
  state.cat = key;
  $$(".tab", tabsEl).forEach((b) => {
    const on = b.dataset.cat === key;
    b.setAttribute("aria-selected", String(on));
    b.tabIndex = on ? 0 : -1;
  });
  renderCatalogue();
}
tabsEl.addEventListener("click", (e) => { const b = e.target.closest(".tab"); if (b) setCat(b.dataset.cat); });
tabsEl.addEventListener("keydown", (e) => {
  const tabs = $$(".tab", tabsEl);
  const i = tabs.findIndex((b) => b.getAttribute("aria-selected") === "true");
  let n = -1;
  if (e.key === "ArrowRight") n = (i + 1) % tabs.length;
  else if (e.key === "ArrowLeft") n = (i - 1 + tabs.length) % tabs.length;
  else if (e.key === "Home") n = 0;
  else if (e.key === "End") n = tabs.length - 1;
  if (n < 0) return;
  e.preventDefault();
  setCat(tabs[n].dataset.cat);
  tabs[n].focus();
});
function renderCatalogue() {
  const q = state.q.trim().toLowerCase();
  const list = TESTS.filter((t) => (state.cat === "all" || t.catKey === state.cat) &&
    (!q || (t.name + " " + t.cat).toLowerCase().includes(q)));
  const out = $("#results");
  out.replaceChildren();
  out.style.animation = "none"; void out.offsetWidth; out.style.animation = "";
  $("#count").textContent = list.length + " of " + TESTS.length + " tests shown";
  if (!list.length) {
    out.append(h("div", "empty", "No tests match your search. Try a shorter name, or choose “All” to see every category."));
    return;
  }
  list.forEach((t) => {
    const r = h("article", "row");
    const name = h("div", "name");
    name.append(btn(t.name, "link-btn", () => openDetail(t.id), "View details for " + t.name), h("br"), h("span", "tag", t.cat));
    const meta = h("div", "meta rm");
    meta.append(h("span", "", "Preparation and report time: confirm with lab"));
    name.classList.add("name");
    const price = h("b", "price rp", rupee(t.price));
    const add = btn("Add to Booking", "btn btn-o rb", () => addToCart(t.id), "Add " + t.name + " to booking");
    r.append(name, meta, price, add);
    out.append(r);
  });
}
$("#q").addEventListener("input", (e) => { state.q = e.target.value; renderCatalogue(); });
$("#heroSearch").addEventListener("submit", (e) => {
  e.preventDefault();
  const v = $("#heroQ").value;
  $("#q").value = v; state.q = v; setCat("all");
  $("#tests").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
});

/* =====================================================================
   REVIEWS CAROUSEL AND FAQ
   ===================================================================== */
REVIEWS.forEach((t, i) => {
  const c = h("article", "card review");
  c.append(h("span", "badge", "Sample review"), h("q", "", t), h("small", "", "Reviewer " + (i + 1)));
  $("#carTrack").append(c);
});
const step = () => $("#carTrack").clientWidth * 0.8;
$("#carPrev").addEventListener("click", () => $("#carTrack").scrollBy({ left: -step(), behavior: reduceMotion ? "auto" : "smooth" }));
$("#carNext").addEventListener("click", () => $("#carTrack").scrollBy({ left: step(), behavior: reduceMotion ? "auto" : "smooth" }));
$("#carTrack").addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") { e.preventDefault(); $("#carNext").click(); }
  if (e.key === "ArrowLeft") { e.preventDefault(); $("#carPrev").click(); }
});

FAQS.forEach(([q, a], i) => {
  const item = h("div", "faq-item");
  const trig = h("button", "faq-q", q);
  trig.type = "button";
  trig.id = "faq-q" + i;
  trig.setAttribute("aria-expanded", "false");
  trig.setAttribute("aria-controls", "faq-p" + i);
  const panel = h("div", "faq-p");
  panel.id = "faq-p" + i;
  panel.setAttribute("role", "region");
  panel.setAttribute("aria-labelledby", trig.id);
  const inner = h("div"); inner.append(h("p", "", a)); panel.append(inner);
  trig.addEventListener("click", () => {
    const open = trig.getAttribute("aria-expanded") === "true";
    trig.setAttribute("aria-expanded", String(!open));
    panel.classList.toggle("open", !open);
  });
  item.append(h("h3", "", ""), panel);
  item.firstChild.append(trig);
  $("#faqList").append(item);
});

/* =====================================================================
   ENQUIRY FORM
   ===================================================================== */
const form = $("#enquiryForm");
const sel = $("#serviceSelect");
(function fillSelect() {
  const add = (parent, value, label) => { const o = h("option", "", label); o.value = value; parent.append(o); };
  add(sel, "general", "General enquiry");
  add(sel, "home", "Home sample collection");
  add(sel, "cart", "Items in my booking cart");
  const gp = document.createElement("optgroup"); gp.label = "Packages";
  PACKAGES.forEach((p) => add(gp, p.id, p.name));
  const gt = document.createElement("optgroup"); gt.label = "Tests (sample catalogue)";
  TESTS.forEach((t) => add(gt, t.id, t.name));
  sel.append(gp, gt);
})();
const today = new Date(); today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
$("#prefDate").min = today.toISOString().slice(0, 10);

function goToForm() {
  renderCart();
  $("#contact").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
  setTimeout(() => $("#patientName").focus({ preventScroll: true }), reduceMotion ? 0 : 600);
}
$$("[data-action]").forEach((a) => a.addEventListener("click", () => {
  if (a.dataset.action === "home") sel.value = "home";
}));

function setErr(id, msg, field) {
  $("#e-" + id).textContent = msg;
  if (field) field.setAttribute("aria-invalid", msg ? "true" : "false");
}
function validate() {
  let bad = null;
  const name = $("#patientName"), phone = $("#patientPhone"), date = $("#prefDate"), time = $("#prefTime");
  const fail = (key, msg, field) => { setErr(key, msg, field); bad = bad || field; };
  setErr("name", "", name); setErr("phone", "", phone); setErr("date", "", date); setErr("time", "", time);
  if (!name.value.trim()) fail("name", "Enter your name.", name);
  const digits = phone.value.replace(/[\s-]/g, "");
  if (!/^(\+?91)?[6-9]\d{9}$/.test(digits)) fail("phone", "Enter a 10-digit mobile number, with or without +91.", phone);
  if (date.value && new Date(date.value + "T00:00").getDay() === 0) fail("date", "The lab lists Monday–Saturday hours. Please choose another day.", date);
  if (time.value && (time.value < BUSINESS_INFO.openFrom || time.value > BUSINESS_INFO.openTo)) fail("time", "Choose a time between 7:00 AM and 8:30 PM.", time);
  if (sel.value === "cart" && !cart.size) { toast("Your booking cart is empty. Add items or choose another option."); bad = bad || sel; }
  if (bad) bad.focus();
  return !bad;
}
function buildEnquiry() {
  const lines = [BUSINESS_INFO.name + " enquiry", "", "Name: " + $("#patientName").value.trim(), "Phone: " + $("#patientPhone").value.trim()];
  if (sel.value === "cart") {
    lines.push("Items (prices from the lab list, to be confirmed):");
    cart.forEach((q, id) => { const it = getItem(id); lines.push("- " + it.name + " x" + q + ": " + rupee(it.price * q)); });
    lines.push("Total (estimate): " + rupee(cartTotals().total));
  } else {
    lines.push("Enquiry: " + sel.options[sel.selectedIndex].text);
  }
  if ($("#prefDate").value) lines.push("Preferred date: " + $("#prefDate").value);
  if ($("#prefTime").value) lines.push("Preferred time: " + $("#prefTime").value);
  lines.push("Message: " + ($("#patientMessage").value.trim() || "No additional message"));
  return lines.join("\n");
}
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!validate()) return;
  $("#enquiryText").value = buildEnquiry();
  $("#result").hidden = false;
  $("#waBtn").disabled = !waOk;
  $("#waNote").textContent = waOk ? "WhatsApp opens only when you choose it. Review the message before sending." : "WhatsApp is not set up yet. Copy the enquiry and send it by call or message.";
  $("#resultMsg").focus?.();
  $("#result").scrollIntoView({ block: "nearest", behavior: reduceMotion ? "auto" : "smooth" });
});
$("#copyBtn").addEventListener("click", () => {
  const ta = $("#enquiryText");
  const fallback = () => { ta.focus(); ta.select(); $("#waNote").textContent = "Press Ctrl+C (or Copy) to copy the selected text."; };
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(ta.value).then(() => { $("#waNote").textContent = "Enquiry copied. It has not been sent."; }, fallback);
  } else fallback();
});
function openWhatsApp() {
  if (!waOk) { goToForm(); toast("WhatsApp is not set up yet. Prepare and copy your enquiry instead."); return; }
  const text = $("#result").hidden ? "" : $("#enquiryText").value;
  window.open("https://wa.me/" + WHATSAPP_NUMBER + (text ? "?text=" + encodeURIComponent(text) : ""), "_blank", "noopener,noreferrer");
}
$("#waBtn").addEventListener("click", openWhatsApp);
$("#waFab").addEventListener("click", openWhatsApp);
if (!waOk) $("#waFab").hidden = true;   // hidden until a WhatsApp number is set

/* =====================================================================
   NAVIGATION, SCROLL EFFECTS AND ANIMATION
   ===================================================================== */
const nav = $("#mainNav"), menuBtn = $("#menuBtn"), scrim = $("#scrim");
function setMenu(open) {
  nav.classList.toggle("open", open);
  scrim.hidden = !open;
  menuBtn.setAttribute("aria-expanded", String(open));
  menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
}
menuBtn.addEventListener("click", () => setMenu(!nav.classList.contains("open")));
scrim.addEventListener("click", () => setMenu(false));
$$("a", nav).forEach((a) => a.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", (e) => { if (e.key === "Escape") { setMenu(false); menuBtn.focus(); } });

// Scroll progress, back-to-top and hero parallax share one rAF-throttled handler
const bar = $("#progress"), toTop = $("#toTop"), heroImg = $("#heroImg"), heroArt = $("#heroArt");
let ticking = false;
function onScroll() {
  const y = window.scrollY, max = document.documentElement.scrollHeight - window.innerHeight;
  bar.style.transform = "scaleX(" + (max > 0 ? y / max : 0) + ")";
  toTop.hidden = y < 700;
  if (!reduceMotion) {
    document.documentElement.style.setProperty("--sy", Math.min(y, 2500));
    if (y < 900) { const t = "translateY(" + (y * 0.12) + "px)"; heroImg.style.transform = t; heroArt.style.transform = t; }
  }
  ticking = false;
}
window.addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
onScroll();
toTop.addEventListener("click", () => { window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" }); $("#home").focus?.(); });

// Active nav link
if ("IntersectionObserver" in window) {
  const links = $$(".nav a");
  const spy = new IntersectionObserver((entries) => entries.forEach((en) => {
    if (en.isIntersecting) links.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + en.target.id));
  }), { rootMargin: "-45% 0px -50% 0px" });
  ["home", "tests", "packages", "offers", "why", "contact"].forEach((id) => spy.observe($("#" + id)));
}

// Reveal (staggered via --i) and count-up
function countUp(el) {
  const end = Number(el.dataset.count), suffix = el.dataset.suffix || "";
  if (reduceMotion || !end) { el.textContent = end + suffix; return; }
  const start = performance.now(), dur = 1200;
  (function tick(now) {
    const p = Math.min((now - start) / dur, 1);
    el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))) + suffix;
    if (p < 1) requestAnimationFrame(tick);
  })(start);
}
$$(".sec-h").forEach((el) => el.classList.add("reveal"));
$$(".split > div:first-child, .contact-grid > div:first-child").forEach((el) => el.classList.add("fx-left"));
$$(".split > figure, .form-card").forEach((el) => el.classList.add("fx-right"));
$$(".wide-photo, .banner").forEach((el) => el.classList.add("fx-zoom"));
$$(".lab-tile").forEach((el, i) => { el.style.setProperty("--i", i); el.addEventListener("click", () => { el.classList.remove("tap"); void el.offsetWidth; el.classList.add("tap"); }); });
$$("#why .card, .steps li").forEach((el, i) => el.style.setProperty("--i", i % 6));
if ("IntersectionObserver" in window && !reduceMotion) {
  const io = new IntersectionObserver((entries, o) => entries.forEach((en) => {
    if (!en.isIntersecting) return;
    en.target.classList.add("in");
    o.unobserve(en.target);
  }), { threshold: 0.12, rootMargin: "0px 0px -30px 0px" });
  $$(".reveal").forEach((el) => io.observe(el));
  const so = new IntersectionObserver((entries, o) => entries.forEach((en) => {
    if (!en.isIntersecting) return;
    $$("[data-count]", en.target).forEach(countUp);
    o.unobserve(en.target);
  }), { threshold: 0.4 });
  so.observe($(".stats"));
} else {
  $$(".reveal").forEach((el) => el.classList.add("in"));
  $$("[data-count]").forEach(countUp);
}

/* Hide a photo slot whose file is missing so the instrument art shows through */
$$(".photo img").forEach((img) => {
  const miss = () => img.parentElement.classList.add("nophoto");
  if (img.complete && img.naturalWidth === 0) miss();
  img.addEventListener("error", miss);
});

/* INITIAL RENDER */
renderCatalogue();
renderCart();
/* Premium scroll interactions */
(() => {
  "use strict";

  const header = document.querySelector(".site-header");
  const progress = document.getElementById("progress");
  const navLinks = [
    ...document.querySelectorAll("#mainNav a[href^='#']")
  ];

  if (!header) return;

  let ticking = false;

  function updateScrollEffects() {
    const scrollTop = window.scrollY;
    const maxScroll =
      document.documentElement.scrollHeight - window.innerHeight;

    header.classList.toggle("scrolled", scrollTop > 12);

    if (progress) {
      const percentage =
        maxScroll > 0 ? scrollTop / maxScroll : 0;

      progress.style.transform =
        `scaleX(${Math.min(1, Math.max(0, percentage))})`;
    }

    ticking = false;
  }

  window.addEventListener("scroll", () => {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(updateScrollEffects);
    }
  }, { passive: true });

  updateScrollEffects();

  // Highlight the current navigation destination.
  const sections = navLinks
    .map(link => {
      const target = document.querySelector(link.getAttribute("href"));
      return target ? { link, target } : null;
    })
    .filter(Boolean);

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      const visible = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

      if (!visible.length) return;

      const current = sections.find(
        section => section.target === visible[0].target
      );

      if (!current) return;

      navLinks.forEach(link => {
        if (link === current.link) {
          link.classList.add("active");
          link.setAttribute("aria-current", "location");
        } else {
          link.classList.remove("active");
          link.removeAttribute("aria-current");
        }
      });
    }, {
      rootMargin: "-20% 0px -60% 0px",
      threshold: [0, 0.25, 0.5]
    });

    sections.forEach(section => observer.observe(section.target));
  }

  // Keep the existing reveal animations, but ensure content
  // remains accessible if IntersectionObserver is unavailable.
  if (!("IntersectionObserver" in window)) {
    document.querySelectorAll(".reveal").forEach(element => {
      element.classList.add("in");
    });
  }
})();
