# A.W. Agro Processing Limited — website

Static, self-contained site. Open `index.html` in a browser to view it; no build step,
no server required. To publish, upload the whole folder to any static host
(Netlify, Cloudflare Pages, GitHub Pages, cPanel).

## Files

| File | Page |
|---|---|
| `index.html` | Home |
| `services.html` | Services & supply specifications |
| `about.html` | About us / facility dossier |
| `contact.html` | Contact & sample desk (`contact.html#request` jumps to the form) |
| `assets/site.css` | Compiled stylesheet (all pages) — generated, don't hand-edit |
| `assets/site.js` | Mobile menu, smooth scrolling, form handling, footer year |
| `tailwind.config.js` | Design tokens: colours, spacing, type scale |
| `src/input.css` | Stylesheet source |

Every page shares the same header, footer and design tokens. If you change a colour
or a font size, change it once in `tailwind.config.js` and rebuild:

```
npx tailwindcss@3 -c tailwind.config.js -i src/input.css -o assets/site.css --minify
```

Rebuild whenever you add Tailwind classes to the HTML too — unused classes are
stripped out of `site.css`, so a class that wasn't in the markup at build time
won't have any CSS behind it.

## Before you go live

1. **Point the forms at a form service.** Both enquiry forms currently open the
   sender's own mail app with the answers pre-filled, addressed to
   `wiafeadelaide@gmail.com` — it works on any static host with nothing to set up, but a
   visitor with no mail app configured (common on phones using webmail) hits a dead
   end. Sign up for Formspree, Web3Forms or FormSubmit, then paste the endpoint they
   give you into `FORM_ENDPOINT` at the top of the forms section in `assets/site.js`.
   Nothing else changes: success and failure panels, the disabled-while-sending
   button and the "email us directly" fallback are already wired.
   Recipients live on the `data-email` attribute of each `<form>`, so the two forms
   can go to different desks.
2. **Swap in a branded email when the domain exists.** Contact details are now
   real: `+44 7765 643764` and `wiafeadelaide@gmail.com`, on every page and on both
   forms. The invented second line (`+233 (0)50 000 0000`) and the `hello@` /
   `trade@` / `info@awagro.com.gh` split were removed rather than left pointing at
   addresses nobody reads. A Gmail address on a B2B commodity site reads as less
   established than `trade@awagro.com.gh` would, so this is worth revisiting once
   the domain is registered — search for the address to replace it in one pass.
3. **Fill in the registration numbers** on `about.html` (Registrar of Companies,
   GSA certificate, EPA permit) — they currently read "add before launch".
4. **Confirm the plant coordinates.** `contact.html` uses 6.941° N, 0.285° E and the
   About page schematic says 6.94° N, 0.23° E. Pick the correct one and make them match.
5. **Host the images yourself.** The logo and the three photographs load from Google
   URLs that will expire. Save them into `assets/` and update the `src` attributes.
6. **Put the real numbers back when you can evidence them.** Capacity, outgrower
   count, daily intake, GS 238 conformity, ISO 22000 and the digestibility index now
   read "On request", "Contracted", "Published spec" and similar. The layout has room
   for figures — swap them in once they are documented.
7. **Finish the social preview.** Each page carries Open Graph tags so a pasted link
   shows a title and description in WhatsApp and LinkedIn. Add `og:url` and `og:image`
   (both must be absolute URLs) once the domain exists — the placeholder comment in
   each `<head>` marks the spot. A 1200×630 image works best.

## Notes

- **Fonts and icons** come from Google Fonts. If the icon font is slow or blocked,
  the icons stay hidden rather than printing their names ("arrow_forward") across
  the page — the layout holds either way. Icons are `aria-hidden`, so screen readers
  skip them.
- **Styling is self-hosted** in `assets/site.css`, so the site renders correctly even
  with no CDN available.
- **Colour** comes from the palette brief: husk `#EFE4CB` and paper `#F7F1E4` for
  surfaces, leaf `#1B2E22` for text and primary, gari gold `#D9A441` as the accent,
  peel `#744826` for the second product line, lake `#2C6B70` for focus rings. Some
  values are a shade darker than the brief so text clears WCAG AA on the warm
  backgrounds. Fonts are unchanged (Work Sans / Source Sans 3).
- **Mobile**: checked on iPhone 13, iPhone SE, Pixel 5, Galaxy S9+ and iPad Mini
  profiles — no sideways scroll down to a 320px viewport, tap targets at or above
  24px, and the menu works by touch.
- **Accessibility**: every page has a skip link, one `h1` with no skipped heading
  levels, labelled form fields, a keyboard-visible focus ring, and text that meets
  WCAG AA contrast on every background used. The mobile menu closes on Escape and
  returns focus to its button. Confirmation panels announce themselves (`role="status"`)
  and take focus. `prefers-reduced-motion` disables smooth scrolling and animation.
  If you change a colour, re-check contrast: several palette values are already
  darkened a shade from the brief for exactly this reason.
