/* Interaktive Produktdemo. Bildet die echte DentalBoost-Oberflaeche nach.
   Alle Zahlen, Codes und Patientenreferenzen sind frei erfunden. */
(() => {
  const root = document.getElementById('software-demo');
  const state = { loaded: false, selected: 'sto', filter: 'all', query: '', decisions: {} };

  // Beispielzeilen im Format der echten Ergebnistabelle.
  const records = [
    { id: 'sto', patient: 'Pat_014', datum: '03.03.26', typ: 'FEHLT', quelle: 'FACHREGEL',
      code: 'Sto', betrag: '14,60', konf: 90, kasse: 'ÖGK-K',
      aktuell: ['F1', 'Mu'], letzte: '12.11.25: Zst, Kon' },
    { id: 'wsr', patient: 'Pat_027', datum: '05.03.26', typ: 'FEHLT', quelle: 'FACHREGEL',
      code: 'F1', betrag: '38,20', konf: 85, kasse: 'ÖGK-K',
      aktuell: ['WSR'], letzte: '18.02.26: Rö, Anä' },
    { id: 'zh', patient: 'Pat_031', datum: '09.03.26', typ: 'FEHLT', quelle: 'FACHREGEL',
      code: 'ZH', betrag: '11,40', konf: 80, kasse: 'BVAEB',
      aktuell: ['F2', 'Anä'], letzte: '04.12.25: Kon' },
    { id: 'roe', patient: 'Pat_042', datum: '12.03.26', typ: 'HINWEIS', quelle: 'FACHREGEL',
      code: 'Rö', betrag: '21,80', konf: 75, kasse: 'SVS',
      aktuell: ['Kon'], letzte: '04.09.25: Rö, Zst' },
    { id: 'kk', patient: 'Pat_068', datum: '24.03.26', typ: 'FEHLT', quelle: 'GELERNT',
      code: 'KK', betrag: '26,50', konf: 68, kasse: 'ÖGK-K',
      aktuell: ['Ext', 'Ext'], letzte: '—' },
    { id: 'stop', patient: 'Pat_055', datum: '18.03.26', typ: 'VERBOT', quelle: 'HART',
      code: 'PZR', betrag: '', konf: null, kasse: 'ÖGK-K',
      aktuell: ['Zst', 'PZR'], letzte: '21.10.25: Kon' }
  ];

  const copy = {
    de: {
      eyebrow: 'Selbst ausprobieren',
      heading: 'Das sehen Sie nach<br>einer Monatsabrechnung.',
      intro: 'Die Demo zeigt die Oberfläche von DentalBoost mit einem erfundenen Beispielmonat. Öffnen Sie den Bericht und klicken Sie sich durch die Hinweise.',
      demoChip: 'Beispielansicht', local: 'Lokal · Ohne KI',
      dropTitle: 'Monatsabrechnung hierher ziehen',
      dropText: 'PDF oder CSV aus Ihrer Praxissoftware. Die Auswertung läuft vollständig auf Ihrem Praxis-PC.',
      file: 'Monatsabrechnung_03_2026.pdf', fileNote: '1.284 Zeilen · fiktiver Beispielbericht',
      start: 'Beispielbericht analysieren', dropHint: 'Direkt im Browser. Keine Anmeldung, kein Upload.',
      done: 'Analyse abgeschlossen', doneSub: 'Monatsabrechnung 03/2026 · 1.284 Zeilen gelesen · 9 Regeln ausgelöst',
      reset: 'Neu starten',
      cards: [
        ['Mögliche vergessene Leistungen', '27', 'im Beispielmonat erkannt'],
        ['Prüfpotenzial gesamt', '1.640,00 €', 'Summe aller Vorschläge'],
        ['Hohes Prüfpotenzial', '1.284,00 €', 'Konfidenz ≥ 60 %, ohne Datenhinweis'],
        ['Gewichtetes Prüfpotenzial', '968,40 €', 'nach Konfidenz gewichtet'],
        ['Hochgerechnet auf 12 Monate', '≈ 19.680 €', 'wenn jeder Monat so ausfällt']
      ],
      searchLabel: 'Hinweise durchsuchen', searchPlaceholder: 'Suche (PatNr, Code, Text …)',
      filterLabel: 'Hinweise filtern', all: 'Alle Hinweise', open: 'Offen', doneFilter: 'Bearbeitet',
      count: (shown, total, reviewed) => `${shown} von ${total} Beispielzeilen · ${reviewed} bearbeitet`,
      head: ['ID', 'Datum', 'Regel', 'Prüfung', 'Aktuelle Codes', 'Prüfpotenzial', 'Konfidenz', 'Aktion'],
      verbs: { FEHLT: 'Fehlt', HINWEIS: 'Prüfen', VERBOT: 'Verboten' },
      sources: { FACHREGEL: 'Expertenregel G01', HART: 'Kassenregel', GELERNT: 'Gelernte Regel' },
      reasons: {
        sto: 'Stomatitisbehandlung ist bei jedem Patienten ansetzbar. An diesem Tag wurde noch kein Sto verrechnet.',
        wsr: 'Bei einer Wurzelspitzenresektion wird immer eine F1-Füllung dazu verrechnet.',
        zh: 'Zahnhals versiegeln wird bei jeder Füllung geprüft. Heute steht noch kein ZH.',
        roe: 'Bissflügel-Röntgen ist alle 6 Monate vorgesehen. Das letzte Rö liegt mehr als 6 Monate zurück.',
        kk: 'Zwei benachbarte Extraktionen im selben Kiefer – eine Kieferkammkorrektur kommt infrage.',
        stop: 'Diese beiden Positionen sind bei dieser Kasse am selben Behandlungstag nicht gemeinsam verrechenbar.'
      },
      detail: 'Begründung', why: 'Warum erscheint dieser Hinweis?', current: 'Codes an diesem Tag',
      history: 'Letzte erfasste Codes', insurance: 'Versicherung', amount: 'Prüfpotenzial',
      accept: '✓ Als geprüft markieren', reject: '✕ Hinweis verwerfen', undo: 'Entscheidung zurücknehmen',
      accepted: 'Als geprüft markiert', rejected: 'Verworfen',
      acceptedText: 'Im Beispiel als geprüft markiert. Die Nachverrechnung nehmen Sie anschließend selbst in Ihrer Praxissoftware vor.',
      rejectedText: 'Im Beispiel verworfen. Der Hinweis bleibt nachvollziehbar und lässt sich erneut öffnen.',
      empty: 'Keine passenden Hinweise.', clear: 'Alle Hinweise anzeigen',
      complete: 'Alle sechs Beispielzeilen bearbeitet.', next: 'Mit Ihren Daten kennenlernen ↗',
      foot: ['DentalBoost schlägt vor – Sie entscheiden.', 'Keine KI: feste Regeln + Konfidenz aus der Historie.', 'Verarbeitung lokal auf dem Praxis-PC.'],
      caption: 'Nachbildung der Programmoberfläche. Zahlen, Codes und Patientenreferenzen sind frei erfunden.',
      announce: 'Beispielbericht analysiert. Sechs Hinweise stehen zur Prüfung.'
    },
    en: {
      eyebrow: 'Try it yourself',
      heading: 'This is what you see after<br>one monthly statement.',
      intro: 'The demo shows the DentalBoost interface with a fictional example month. Open the report and click through the suggestions.',
      demoChip: 'Example view', local: 'Local · No AI',
      dropTitle: 'Drop your monthly statement here',
      dropText: 'PDF or CSV from your practice software. The analysis runs entirely on your practice PC.',
      file: 'Monthly_statement_03_2026.pdf', fileNote: '1,284 rows · fictional example report',
      start: 'Analyse the sample report', dropHint: 'Runs in your browser. No account, no upload.',
      done: 'Analysis complete', doneSub: 'Monthly statement 03/2026 · 1,284 rows read · 9 rules triggered',
      reset: 'Start again',
      cards: [
        ['Potentially missed services', '27', 'found in the example month'],
        ['Total review potential', '€1,640.00', 'sum of all suggestions'],
        ['High review potential', '€1,284.00', 'confidence ≥ 60 %, no data note'],
        ['Weighted review potential', '€968.40', 'weighted by confidence'],
        ['Projected over 12 months', '≈ €19,680', 'if every month looked like this']
      ],
      searchLabel: 'Search suggestions', searchPlaceholder: 'Search (patient ref., code, text …)',
      filterLabel: 'Filter suggestions', all: 'All suggestions', open: 'Open', doneFilter: 'Reviewed',
      count: (shown, total, reviewed) => `${shown} of ${total} example rows · ${reviewed} reviewed`,
      head: ['ID', 'Date', 'Rule', 'Check', 'Codes today', 'Potential', 'Confidence', 'Action'],
      verbs: { FEHLT: 'Missing', HINWEIS: 'Review', VERBOT: 'Not billable' },
      sources: { FACHREGEL: 'Expert rule G01', HART: 'Insurer rule', GELERNT: 'Learned rule' },
      reasons: {
        sto: 'Stomatitis treatment can be billed for any patient. None was recorded on this day.',
        wsr: 'An apicoectomy is always billed together with an F1 filling.',
        zh: 'Cervical sealing is checked with every filling. None recorded today.',
        roe: 'Bitewing radiographs are due every 6 months. The last one is more than 6 months ago.',
        kk: 'Two adjacent extractions in the same jaw — an alveolar ridge correction may apply.',
        stop: 'These two items cannot be billed together on the same treatment day for this insurer.'
      },
      detail: 'Explanation', why: 'Why does this suggestion appear?', current: 'Codes on this day',
      history: 'Last recorded codes', insurance: 'Insurer', amount: 'Review potential',
      accept: '✓ Mark as reviewed', reject: '✕ Dismiss suggestion', undo: 'Undo decision',
      accepted: 'Marked as reviewed', rejected: 'Dismissed',
      acceptedText: 'Marked as reviewed in this example. You would then enter the correction yourself in your practice software.',
      rejectedText: 'Dismissed in this example. The suggestion stays traceable and can be reopened.',
      empty: 'No matching suggestions.', clear: 'Show all suggestions',
      complete: 'All six example rows reviewed.', next: 'See it with your own data ↗',
      foot: ['DentalBoost suggests — you decide.', 'No AI: fixed rules plus confidence from history.', 'Processing stays on the practice PC.'],
      caption: 'Recreation of the program interface. Figures, codes and patient references are fictional.',
      announce: 'Sample report analysed. Six suggestions are ready for review.'
    }
  };

  const t = () => copy[document.documentElement.lang.startsWith('de') ? 'de' : 'en'];
  const esc = value => String(value).replace(/[&<>"']/g, c =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  function visible() {
    const copyNow = t();
    const query = state.query.trim().toLocaleLowerCase();
    return records.filter(record => {
      const decided = !!state.decisions[record.id];
      if (state.filter === 'open' && decided) return false;
      if (state.filter === 'done' && !decided) return false;
      if (!query) return true;
      const haystack = [record.patient, record.code, record.kasse, record.aktuell.join(' '),
        copyNow.reasons[record.id], copyNow.sources[record.quelle]].join(' ').toLocaleLowerCase();
      return haystack.includes(query);
    });
  }

  function rowMarkup(record) {
    const c = t();
    const decision = state.decisions[record.id];
    const amount = record.betrag
      ? `<div class="amt">+${esc(record.betrag)} €</div>`
      : `<div class="amt zero">—</div>`;
    const confidence = record.konf === null
      ? `<div class="conf"><b>Regel</b></div>`
      : `<div class="conf${record.konf < 80 ? ' mid' : ''}"><b>${record.konf} %</b>
           <span class="bar"><i style="width:${record.konf}%"></i></span></div>`;
    const actions = decision
      ? `<span class="fb-mark">${decision === 'accepted' ? '✓ ' + c.accepted : '✕ ' + c.rejected}</span>`
      : `<span class="act-btn approve" data-do="accept" data-id="${record.id}" title="${esc(c.accept)}">✓</span>
         <span class="act-btn ignore" data-do="reject" data-id="${record.id}" title="${esc(c.reject)}">✕</span>`;
    return `<button type="button" class="srow${state.selected === record.id ? ' selected' : ''}${decision ? ' resolved' : ''}"
        data-select="${record.id}" aria-pressed="${state.selected === record.id}">
      <span class="patnr">${esc(record.patient)}</span>
      <span class="cell-date">${esc(record.datum)}</span>
      <span class="cell-rule"><span class="verb ${record.typ}">${c.verbs[record.typ]}</span><span class="pill ${record.quelle}">${c.sources[record.quelle]}</span></span>
      <span class="cell-check"><span class="code">${esc(record.code)}</span><span class="reason">${esc(c.reasons[record.id])}</span></span>
      <span class="cell-codes">${record.aktuell.map(code => `<span class="code-chip">${esc(code)}</span>`).join('')}</span>
      ${amount}${confidence}
      <span class="row-actions">${actions}</span>
    </button>`;
  }

  function drawerMarkup() {
    const c = t();
    const record = records.find(item => item.id === state.selected);
    if (!record) return '';
    const decision = state.decisions[record.id];
    const decisionBlock = decision
      ? `<div class="dw-decision"><strong>${decision === 'accepted' ? '✓ ' + c.accepted : '✕ ' + c.rejected}</strong>
           <button type="button" class="app-btn ghost" data-do="undo" data-id="${record.id}">${c.undo}</button></div>
         <p class="dw-note">${decision === 'accepted' ? c.acceptedText : c.rejectedText}</p>`
      : `<div class="dw-decision"><button type="button" class="app-btn" data-do="accept" data-id="${record.id}">${c.accept}</button>
           <button type="button" class="app-btn ghost" data-do="reject" data-id="${record.id}">${c.reject}</button></div>`;
    return `<section class="app-drawer" aria-label="${esc(c.detail)}">
      <div class="dw-top"><span class="verb ${record.typ}">${c.verbs[record.typ]}</span>
        <h3>${esc(record.code)}</h3><span class="pill ${record.quelle}">${c.sources[record.quelle]}</span>
        <span class="dw-sub">${esc(record.patient)} · ${esc(record.datum)} · ${esc(record.kasse)}</span></div>
      <div class="dw-grid">
        <div class="dw-block dw-wide"><div class="dl">${c.why}</div><div class="dv">${esc(c.reasons[record.id])}</div></div>
        <div class="dw-block"><div class="dl">${c.current}</div><div class="dv">${record.aktuell.map(esc).join(', ')}</div></div>
        <div class="dw-block"><div class="dl">${c.history}</div><div class="dv">${esc(record.letzte)}</div></div>
        <div class="dw-block"><div class="dl">${c.insurance}</div><div class="dv">${esc(record.kasse)}</div></div>
        <div class="dw-block"><div class="dl">${c.amount}</div><div class="dv">${record.betrag ? '+' + esc(record.betrag) + ' €' : '—'}</div></div>
      </div>${decisionBlock}</section>`;
  }

  function screenMarkup() {
    const c = t();
    if (!state.loaded) {
      return `<div class="app-screen"><div class="app-drop">
        <div class="file-icon">PDF</div>
        <h3>${c.dropTitle}</h3><p>${c.dropText}</p>
        <div class="app-file"><span aria-hidden="true">▤</span><div><strong>${esc(c.file)}</strong><small>${c.fileNote}</small></div></div>
        <div><button type="button" class="app-btn" data-do="start">${c.start} <span aria-hidden="true">↗</span></button></div>
        <small class="hint">${c.dropHint}</small>
      </div></div>`;
    }
    const rows = visible();
    const reviewed = Object.keys(state.decisions).length;
    const list = rows.length
      ? `<div class="rows-head" aria-hidden="true">${c.head.map(h => `<span>${h}</span>`).join('')}</div>
         <div class="app-rows">${rows.map(rowMarkup).join('')}</div>`
      : `<div class="app-empty">${c.empty}<div><button type="button" class="app-btn ghost" data-do="clear">${c.clear}</button></div></div>`;
    return `<div class="app-screen">
      <div class="app-banner"><span class="tick" aria-hidden="true">✓</span>
        <div><strong>${c.done}</strong><small>${c.doneSub}</small></div>
        <button type="button" class="app-btn ghost" data-do="reset">↻ ${c.reset}</button></div>
      <div class="app-cards">${c.cards.map(([k, v, sub], index) =>
        `<div class="card${index === 1 || index === 2 || index === 3 || index === 4 ? ' money' : ''}">
           <div class="k">${k}</div><div class="v">${v}</div><div class="sub">${sub}</div></div>`).join('')}</div>
      <div class="app-toolbar">
        <label class="sr-only" for="demo-search">${c.searchLabel}</label>
        <input id="demo-search" type="search" placeholder="${esc(c.searchPlaceholder)}" value="${esc(state.query)}">
        <label class="sr-only" for="demo-filter">${c.filterLabel}</label>
        <select id="demo-filter">
          <option value="all"${state.filter === 'all' ? ' selected' : ''}>${c.all}</option>
          <option value="open"${state.filter === 'open' ? ' selected' : ''}>${c.open}</option>
          <option value="done"${state.filter === 'done' ? ' selected' : ''}>${c.doneFilter}</option>
        </select>
        <span class="count">${c.count(rows.length, records.length, reviewed)}</span>
      </div>
      ${list}
      ${rows.length ? drawerMarkup() : ''}
      ${reviewed === records.length ? `<div class="app-banner" style="margin-top:16px"><span class="tick" aria-hidden="true">✓</span>
        <div><strong>${c.complete}</strong></div><a class="app-btn" href="#kontakt">${c.next}</a></div>` : ''}
      <div class="app-foot">${c.foot.map(item => `<span>${item}</span>`).join('')}</div>
    </div>`;
  }

  function render() {
    const c = t();
    root.innerHTML = `
      <div class="section-heading"><p class="eyebrow">${c.eyebrow}</p><h2>${c.heading}</h2><p>${c.intro}</p></div>
      <div class="app-demo">
        <div class="app-chrome"><span class="dots" aria-hidden="true"><i></i><i></i><i></i></span>
          <span class="name"><span class="logo" aria-hidden="true">D+</span>DentalBoost</span>
          <span class="chip">${c.local}</span><span class="chip demo">${c.demoChip}</span></div>
        ${screenMarkup()}
      </div>
      <p class="demo-caption">${c.caption}</p>
      <p class="sr-only" id="demo-announce" aria-live="polite"></p>`;
  }

  root.addEventListener('click', event => {
    const target = event.target.closest('[data-do],[data-select]');
    if (!target) return;
    const action = target.dataset.do;
    if (action) event.stopPropagation();
    if (action === 'start') { state.loaded = true; render(); root.querySelector('.srow')?.focus({ preventScroll: true }); }
    else if (action === 'reset') { Object.assign(state, { loaded: false, selected: 'sto', filter: 'all', query: '', decisions: {} }); render(); }
    else if (action === 'clear') { state.filter = 'all'; state.query = ''; render(); }
    else if (action === 'accept' || action === 'reject') {
      state.decisions[target.dataset.id] = action === 'accept' ? 'accepted' : 'rejected';
      state.selected = target.dataset.id; render();
    } else if (action === 'undo') { delete state.decisions[target.dataset.id]; render(); }
    else if (target.dataset.select) { state.selected = target.dataset.select; render(); }
    const announce = root.querySelector('#demo-announce');
    if (announce && action === 'start') announce.textContent = t().announce;
  });

  root.addEventListener('input', event => {
    if (event.target.id !== 'demo-search') return;
    state.query = event.target.value;
    const position = event.target.selectionStart;
    render();
    const field = root.querySelector('#demo-search');
    if (field) { field.focus({ preventScroll: true }); field.setSelectionRange(position, position); }
  });

  root.addEventListener('change', event => {
    if (event.target.id !== 'demo-filter') return;
    state.filter = event.target.value;
    render();
  });

  document.addEventListener('site-language-change', render);
  render();
})();
