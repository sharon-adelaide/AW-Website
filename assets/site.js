/* A.W. Agro Processing Limited — shared site behaviour.
   Loaded at the end of <body> on every page. */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia
    ? window.matchMedia("(prefers-reduced-motion: reduce)")
    : { matches: false };

  function scrollBehavior() {
    return reduceMotion.matches ? "auto" : "smooth";
  }

  /* ---- Reveal icons only once the icon font is actually available ----
     The icons are Google's Material Symbols ligatures: if the font never
     arrives, the raw words ("arrow_forward") would render as text. The CSS
     keeps them invisible until this check passes. */
  function iconGlyphRendered() {
    // A real icon glyph is roughly square; the ligature text is far wider.
    var probe = document.createElement("span");
    probe.className = "material-symbols-outlined";
    // Excluded from the width clamp in site.css, or it would measure itself
    // as ready even when the font is missing.
    probe.setAttribute("data-probe", "");
    probe.textContent = "arrow_forward";
    probe.style.cssText = "position:absolute;left:-9999px;top:0;font-size:24px;visibility:hidden;";
    document.body.appendChild(probe);
    var w = probe.offsetWidth;
    document.body.removeChild(probe);
    return w > 0 && w < 48;
  }

  (function waitForIcons(attempt) {
    if (iconGlyphRendered()) {
      document.documentElement.classList.add("icons-ready");
    } else if (attempt < 30) {
      window.setTimeout(function () { waitForIcons(attempt + 1); }, 200);
    }
    // After ~6s with no icon font, icons stay hidden rather than
    // printing ligature names across the page.
  })(0);

  /* ---- Mobile navigation ------------------------------------------- */
  var toggle = document.getElementById("menu-toggle");
  var menu = document.getElementById("mobile-menu");

  function setMenu(open) {
    if (!toggle || !menu) return;
    if (open) {
      menu.removeAttribute("hidden");
    } else {
      menu.setAttribute("hidden", "");
    }
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    var icon = toggle.querySelector(".material-symbols-outlined");
    if (icon) icon.textContent = open ? "close" : "menu";
  }

  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      setMenu(menu.hasAttribute("hidden"));
    });

    // Following a link closes the menu.
    menu.addEventListener("click", function (e) {
      if (e.target.closest("a")) setMenu(false);
    });

    // Escape closes it and returns focus to the button.
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !menu.hasAttribute("hidden")) {
        setMenu(false);
        toggle.focus();
      }
    });

    // Rotating to landscape / resizing past the breakpoint would otherwise
    // leave an open panel stranded above the desktop nav.
    if (window.matchMedia) {
      var wide = window.matchMedia("(min-width: 768px)");
      var onWide = function (e) { if (e.matches) setMenu(false); };
      if (wide.addEventListener) wide.addEventListener("change", onWide);
      else if (wide.addListener) wide.addListener(onWide);
    }
  }

  /* ---- Same-page anchors ------------------------------------------- */
  function goTo(target, block) {
    target.scrollIntoView({ behavior: scrollBehavior(), block: block || "start" });
    // Targets carrying tabindex="-1" (the <main> landmark, the confirmation
    // panels) also take focus, so keyboard and screen-reader users actually
    // land there instead of just watching the page move.
    if (target.hasAttribute("tabindex")) target.focus({ preventScroll: true });
  }

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      var id = this.getAttribute("href");
      if (id === "#") return;
      var target;
      try { target = document.querySelector(id); } catch (err) { return; }
      if (!target) return;
      e.preventDefault();
      goTo(target);
      // Not available on some file:// and sandboxed contexts — never fatal.
      try { history.replaceState(null, "", id); } catch (err) { /* ignore */ }
    });
  });

  /* ---- Deep links arriving from another page (contact.html#request) --- */
  if (window.location.hash) {
    var landing;
    try { landing = document.querySelector(window.location.hash); } catch (err) { landing = null; }
    if (landing) {
      window.setTimeout(function () { goTo(landing); }, 150);
    }
  }

  /* ==== Forms ========================================================
     Both enquiry forms end up as an email to the trade desk.

     There are two ways to get there, and this file supports both:

     1. HOSTED FORM SERVICE (recommended once you are live). Sign up for
        Formspree, Web3Forms, FormSubmit or similar, then paste the endpoint
        they give you into FORM_ENDPOINT below. The browser posts the answers
        straight to them and they email you — the sender never leaves the page
        and never sees your inbox address in their mail client.

     2. NO ENDPOINT SET (what happens today). The form opens the sender's own
        mail app with a tidy, pre-filled message addressed to the trade desk;
        they press send. Nothing to sign up for and it works on a plain static
        host, but a visitor with no mail app configured — common on phones
        using webmail — will hit a dead end, so treat it as a stopgap.

     Recipient and subject come from each <form>'s data-email and data-subject
     attributes, so you can route the two forms to different desks in the HTML
     without touching this file.                                          */

  var FORM_ENDPOINT = ""; // e.g. "https://formspree.io/f/abcdwxyz"

  function fieldLabel(form, el) {
    var label = el.id && form.querySelector('label[for="' + el.id + '"]');
    var text = label ? label.textContent : el.name;
    text = text.replace(/\s+/g, " ").trim();
    if (text.indexOf(":") > 0) text = text.slice(0, text.indexOf(":"));
    return text.replace(/\s*\*$/, "").slice(0, 60);
  }

  function fieldValue(el) {
    if (el.type === "checkbox") return el.checked ? "Yes" : "No";
    if (el.tagName === "SELECT") {
      var opt = el.options[el.selectedIndex];
      return opt ? opt.text : el.value;
    }
    return el.value.trim();
  }

  function collect(form) {
    var rows = [];
    Array.prototype.forEach.call(form.elements, function (el) {
      if (!el.name || el.type === "submit" || el.type === "button") return;
      rows.push({ name: el.name, label: fieldLabel(form, el), value: fieldValue(el) });
    });
    return rows;
  }

  function mailtoUrl(form, rows) {
    var to = form.dataset.email || "";
    var subject = form.dataset.subject || "Website enquiry";
    var org = rows.filter(function (r) { return r.name === "organization"; })[0];
    if (org && org.value) subject += " — " + org.value;
    var body = rows.map(function (r) {
      return r.label + ": " + (r.value || "—");
    }).join("\n");
    body += "\n\nSent from the A.W. Agro Processing website";
    // mailto: links get truncated by some clients past ~2000 characters.
    if (body.length > 1600) body = body.slice(0, 1600) + "\n…(truncated)";
    return "mailto:" + encodeURIComponent(to) +
      "?subject=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(body);
  }

  function show(panel, note) {
    if (!panel) return;
    if (note) {
      var slot = panel.querySelector("[data-note]");
      if (slot) slot.textContent = note;
    }
    panel.removeAttribute("hidden");
    goTo(panel, "nearest");
  }

  document.querySelectorAll("form[data-success]").forEach(function (form) {
    var okPanel = document.getElementById(form.dataset.success);
    var errPanel = form.dataset.error ? document.getElementById(form.dataset.error) : null;
    var button = form.querySelector('button[type="submit"]');
    var buttonLabel = button ? button.innerHTML : "";

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;

      var rows = collect(form);
      var mailto = mailtoUrl(form, rows);

      // The error panel offers a direct mail link so nobody loses their typing.
      if (errPanel) {
        var link = errPanel.querySelector("[data-mailto]");
        if (link) link.setAttribute("href", mailto);
        errPanel.setAttribute("hidden", "");
      }
      if (okPanel) okPanel.setAttribute("hidden", "");

      if (!FORM_ENDPOINT) {
        window.location.href = mailto;
        show(okPanel, "Your email app should now be open with this request filled in — press send and our commercial officer will reply within one business day.");
        return;
      }

      var payload = { _subject: form.dataset.subject || "Website enquiry" };
      rows.forEach(function (r) { payload[r.label] = r.value; });

      if (button) {
        button.disabled = true;
        button.textContent = "Sending…";
      }

      fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload)
      }).then(function (res) {
        if (!res.ok) throw new Error("HTTP " + res.status);
        form.reset();
        show(okPanel);
      }).catch(function () {
        show(errPanel);
      }).then(function () {
        if (button) {
          button.disabled = false;
          button.innerHTML = buttonLabel;
        }
      });
    });
  });

  /* ---- Sack colour picker (home page) --------------------------------
     Hovering, focusing or tapping a product recolours the sack's second
     ink and swaps the wording that goes with it. The SVG defaults to fine
     gari in the markup, so it still reads correctly with JS switched off. */
  var picker = document.getElementById("sack-picker");
  var sack = document.getElementById("sack-svg");

  if (picker && sack) {
    var parts = {
      product: document.getElementById("sack-product"),
      grade: document.getElementById("sack-grade"),
      langs: document.getElementById("sack-langs"),
      feed: document.getElementById("sack-feed"),
      foot: document.getElementById("sack-foot")
    };
    var buttons = picker.querySelectorAll("button");

    function showProduct(btn) {
      var d = btn.dataset;
      sack.style.setProperty("--ink2", d.ink);
      if (parts.product) {
        parts.product.textContent = d.product;
        parts.product.setAttribute("letter-spacing", d.spacing);
      }
      if (parts.grade) {
        parts.grade.textContent = d.grade;
        parts.grade.setAttribute("fill", d.gradefg);
      }
      if (parts.foot) parts.foot.textContent = d.foot;
      // Feed sacks carry a warning instead of the export descriptors.
      var isFeed = d.feed === "true";
      if (parts.langs) parts.langs.style.display = isFeed ? "none" : "";
      if (parts.feed) parts.feed.style.display = isFeed ? "" : "none";
      sack.setAttribute("aria-label",
        "A 25kg sack of " + btn.textContent.trim().toLowerCase() +
        ", printed in dark green and " + (d.ink === "#d9a441" ? "gold" : d.ink === "#8c5a32" ? "brown" : "teal") + ".");

      buttons.forEach(function (b) {
        var on = b === btn;
        b.setAttribute("aria-pressed", on ? "true" : "false");
        b.classList.toggle("shadow-md", on);
        b.classList.toggle("ring-2", on);
        b.classList.toggle("ring-primary", on);
      });
    }

    buttons.forEach(function (btn) {
      ["mouseenter", "focus", "click"].forEach(function (evt) {
        btn.addEventListener(evt, function () { showProduct(btn); });
      });
    });
  }

  /* ---- Footer copyright year ---------------------------------------- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
