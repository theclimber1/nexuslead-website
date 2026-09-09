# DentalBoost-Website: Veröffentlichung

Stand: 9. September 2026. Domain `nexuslead.net` ist registriert (Namecheap).

## Zieladresse

| Adresse | Inhalt |
|---|---|
| `dentalboost.nexuslead.net` | diese Produktseite |
| `nexuslead.net` | später die Firmenseite; bis dahin Weiterleitung auf die Produktseite |

So bleibt die DentalBoost-Adresse dauerhaft gültig, auch wenn später eine
Firmenseite auf der Hauptdomain dazukommt.

## Vor dem Livegang erledigen

1. **Impressum** (`impressum.html`) mit Firmenbuchdaten befüllen: Anschrift,
   Telefonnummer, FN-Nummer, Firmenbuchgericht, UID, vertretungsbefugte Person,
   Gewerbebehörde. Ohne diese Angaben ist die Seite in Österreich nicht
   rechtskonform (§ 5 ECG, § 14 UGB, § 25 MedienG).
2. **Datenschutzerklärung** (`datenschutz.html`): Anschrift des Verantwortlichen
   ergänzen. Der Rest ist auf den tatsächlichen Aufbau abgestimmt (keine Cookies,
   keine Analysewerkzeuge, kein Formular, Hosting bei Cloudflare).
3. Prüfen, ob `nexuslead.austria@gmail.com` die Kontaktadresse bleiben soll oder
   auf `office@nexuslead.net` gewechselt wird (siehe unten). Adresse steht in
   `index.html`, `impressum.html`, `datenschutz.html` und `script.js`.

## Schritt 1: GitHub-Repository

Nur die Website veröffentlichen, nicht das Programm-Repository (dort liegen
Regelwerk, Lizenzlogik und lokale Daten).

```bash
cd website
git init
git add .
git commit -m "DentalBoost website"
gh repo create nexuslead-website --public --source=. --push
```

## Schritt 2: Cloudflare Pages

1. Cloudflare-Konto anlegen (kostenlos), **Workers & Pages → Create → Pages →
   Connect to Git**, das Repository `nexuslead-website` auswählen.
2. Framework: *None*. Build command: leer. Output directory: `.`
3. Deploy. Die Seite ist danach unter einer `*.pages.dev`-Adresse erreichbar –
   dort zuerst beide Sprachen und die Demo prüfen.

Statische Auslieferung ist bei Cloudflare Pages unbegrenzt und kostenlos.
GitHub Pages wäre technisch möglich, die Nutzungsbedingungen schränken den
Betrieb kommerzieller Seiten aber ein – deshalb GitHub für den Quellcode,
Cloudflare für die Auslieferung.

## Schritt 3: Domain zu Cloudflare

Nameserver auf Cloudflare umstellen (nötig für Weiterleitung der Hauptdomain und
für kostenlose E-Mail-Weiterleitung):

1. In Cloudflare **Add a site → nexuslead.net → Free plan**.
2. Cloudflare nennt zwei Nameserver.
3. Bei Namecheap unter *Domain List → Manage → Nameservers* auf **Custom DNS**
   umstellen und beide eintragen. Übernahme dauert meist unter einer Stunde.

## Schritt 4: Adressen verbinden

1. Im Pages-Projekt unter **Custom domains** `dentalboost.nexuslead.net`
   hinzufügen. Cloudflare legt den DNS-Eintrag automatisch an.
2. Für die Hauptdomain eine **Redirect Rule** anlegen
   (*Rules → Redirect Rules → Create*):
   - Wenn `Hostname gleich nexuslead.net`
   - Dann `Dynamic redirect` auf `concat("https://dentalboost.nexuslead.net", http.request.uri.path)`
   - Status 302 (später auf 301 ändern, wenn die Firmenseite steht)
3. HTTPS prüfen: Cloudflare stellt das Zertifikat automatisch aus. Die
   SSL-Option von Namecheap wird nicht benötigt.

## Schritt 5 (optional): E-Mail unter der Domain

Cloudflare **Email Routing** ist kostenlos: `office@nexuslead.net` wird an das
bestehende Gmail-Postfach weitergeleitet. Zum Versenden unter dieser Adresse in
Gmail *Einstellungen → Konten → Weitere E-Mail-Adresse hinzufügen* mit dem
Gmail-SMTP-Server und einem App-Passwort einrichten.

## Änderungen später

Dateien in `website/` bearbeiten, committen, pushen – Cloudflare Pages baut
automatisch neu. Lokale Vorschau:

```bash
cd website && python3 -m http.server 4173
```

## Dateien

| Datei | Zweck |
|---|---|
| `index.html` | Einseiter (DE, Umschalter EN) |
| `styles.css`, `languages.css` | Gestaltung und Sprachumschalter |
| `demo.css`, `demo.js` | interaktive Demo im Look der echten Software |
| `script.js` | Sprachumschaltung |
| `impressum.html`, `datenschutz.html`, `legal.css` | Rechtstexte |
| `_headers` | Sicherheits-Header (CSP, HSTS, Frame-Schutz) |
| `robots.txt`, `sitemap.xml` | Suchmaschinen |
| `favicon.svg` | Symbol im Browser-Tab |

Alle Beispieldaten auf der Website sind frei erfunden. Es werden keine
Patientendaten verarbeitet.
