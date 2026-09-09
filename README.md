# DentalBoost — Website

Statischer Einseiter für DentalBoost (Nexus Lead FlexCo). Deutsch mit
Umschalter auf Englisch, ohne Cookies, ohne Analysewerkzeuge, ohne Formular.

## Lokale Vorschau

```bash
python3 -m http.server 4173
# http://127.0.0.1:4173
```

## Aufbau

| Datei | Zweck |
|---|---|
| `index.html` | Startseite: Vorteile, Ablauf, Kompatibilität, Demo, FAQ, Kontakt |
| `styles.css` | Gestaltung der Seite |
| `languages.css` | Sprachumschalter |
| `script.js` | Umschaltung DE/EN (fest hinterlegte Übersetzungen) |
| `demo.js`, `demo.css` | interaktive Demo im Look der echten Software |
| `impressum.html`, `datenschutz.html`, `legal.css` | Rechtstexte |
| `_headers` | Sicherheits-Header für Cloudflare Pages |
| `robots.txt`, `sitemap.xml`, `favicon.svg` | Suchmaschinen und Browser-Tab |

## Inhaltliche Regeln

- Alle Zahlen, Codes und Patientenreferenzen sind **frei erfunden**. Es werden
  keine Patientendaten verarbeitet oder übertragen.
- Die Demo läuft vollständig im Browser der Besucherin oder des Besuchers.
- Aussagen bleiben vorsichtig: DentalBoost **schlägt vor**, die fachliche
  Prüfung und die Verantwortung für die Abrechnung bleiben bei der Ordination.

## Veröffentlichung

Siehe `HOSTING.md`: GitHub für den Quellcode, Cloudflare Pages für die
Auslieferung, Adresse `nexuslead.net`.
