let language = 'de';
// Authored translations only; visitor input is never inserted as HTML.
const english = {
  '.skip-link': ['Skip to content'],
  '.header nav a': ['Your benefits', 'Features', 'How it works', 'Compatibility', 'FAQ'],
  '.header .button': ['Request a demo <span aria-hidden="true">↗</span>'],
  '.hero-copy .eyebrow': ['<span class="dot"></span> For dental practices in Austria'],
  'h1': ['More clarity.<br>Fewer <span class="accent">oversights.</span>'],
  '.intro': ['Good work deserves a careful billing review. DentalBoost flags potentially overlooked services and brings clarity to your second check.'],
  '.actions .button': ['Request a personal demo <span aria-hidden="true">↗</span>'],
  '.actions .text-link': ['Try the demo <span aria-hidden="true">↓</span>'],
  '.hero-note': ['<span aria-hidden="true">✓</span> Locally on your practice PC <span aria-hidden="true">✓</span> You decide'],
  '.local': ['<span class="dot"></span> Local'],
  '.hero-banner strong': ['Analysis complete'],
  '.hero-banner small': ['Monthly statement 03/2026 · 1,284 rows · example'],
  '.metrics .k': ['Potentially missed services', 'Total review potential'],
  '.metrics>div:last-child strong': ['€1,640.00'],
  '.mock-row .verb': ['Missing', 'Missing', 'Review'],
  '.mock-row .mock-check small': ['Stomatitis not billed on this day', 'Apicoectomy without the usual F1 filling', 'Last bitewing radiograph over 6 months ago'],
  '.app-bottom': ['<span class="dot"></span> Every suggestion remains your decision.'],
  '.floating-note strong': ['A thoughtful second look.'],
  '.floating-note small': ['Understand the reason behind every suggestion.'],
  '.preview-play>span:last-child': ['Try the interactive demo'],
  '.visual-caption': ['Simplified illustration with fictional demo data'],
  '.trust-items>span': ['⚙ &nbsp; Built for <strong>everyday practice.</strong>', '↗ &nbsp; Independent of your practice software', '⌘ &nbsp; Local processing', '✓ &nbsp; Explainable review'],
  '#vorteile .eyebrow': ['Your benefits'],
  '#vorteile h2': ['The reassurance of<br>taking a second look.'],
  '#vorteile .section-heading>p:last-child': ['Between patient care and running a practice, there is little time for detailed checks. That is where DentalBoost helps.'],
  '#vorteile .benefits h3': ['Make potential visible', 'Less searching. Clearer reviews.', 'Your data. Your control.'],
  '#vorteile .benefits article>p': ['Spot potentially missing billing items for services already performed, before they get lost in the day-to-day workload.', 'A structured list brings relevant items together. Each suggestion includes an explanation to support your professional review.', 'Analysis runs locally on your practice PC. You review the suggestions and decide which changes are appropriate.'],
  '#vorteile .feature-tag': ['More focused checks', 'Clarity over searching', 'Fits your existing workflow'],
  '#ablauf .eyebrow': ['Simple in practice'],
  '#ablauf h2': ['One report. Three steps.<br>A clearer picture.'],
  '.steps h3': ['Export the monthly statement', 'Run a local check', 'Make an informed decision'],
  '.steps p': ['Export the monthly statement or performance report as a PDF from the practice software you already use.', 'Drag the report into DentalBoost. The software analyses the services on your practice PC.', 'Review the explained suggestions. Make confirmed changes in your practice software as usual.'],
  '#kompatibilitaet .eyebrow': ['Fits your day'],
  '#kompatibilitaet h2': ['Your practice software stays.<br>Only a PDF is added.'],
  '#kompatibilitaet .section-heading>p:last-child': ['DentalBoost needs no interface and no changes to your practice system. You keep working the way you do today.'],
  '#kompatibilitaet .benefits h3': ['The PDF is enough', 'CSV and Excel too', 'Vendor-independent'],
  '#kompatibilitaet .benefits article>p': ['Export the monthly statement as a PDF and open it in DentalBoost. The report is read locally, without access to your practice system.', 'Structured exports are mapped to the DentalBoost fields once. The mapping is stored and can be adjusted at any time.', 'DentalBoost is not tied to any vendor. We review an unfamiliar report layout together with you before you start, using a sample report.'],
  '#kompatibilitaet .feature-tag': ['Export instead of interface', 'Map once, keep using it', 'Layout check before you start'],
  '.privacy .eyebrow': ['Designed to run locally'],
  '.privacy h2': ['The review stays in your practice.'],
  '.privacy div>p:last-child': ['DentalBoost processes your reports on your practice PC. Analysis does not require a cloud upload. Every decision about a suggestion remains with you.'],
  '.privacy-pill': ['On your PC.<br>Under your control.'],
  '.faq-section .eyebrow': ['Good to know'],
  '.faq-section h2': ['Still have questions?<br>Find clarity here.'],
  '.faq-list summary': ['Does DentalBoost work with my practice software?', 'Will my billing be changed automatically?', 'Does DentalBoost find every missing service?', 'Can I try DentalBoost first?', 'Do I get support setting it up?', 'Where are my reports processed?'],
  '.faq-list details>p': ['DentalBoost works with what your practice software already produces: the monthly statement as a PDF. Structured CSV or Excel exports can be imported through a one-time column mapping. No interface or vendor approval is required. A report layout we do not know yet is checked with a sample report before you start.', 'No. DentalBoost provides review suggestions. You assess each item and make appropriate changes in your practice software yourself. Your practice remains responsible for billing.', 'DentalBoost supports a second review using stored rules and available data. Suggestions do not guarantee completeness, correctness or reimbursement. Time-dependent suggestions may be omitted when there is insufficient history.', 'Yes. The trial unlocks one complete billing period, including every suggestion and explanation. Further periods are analysed too: you see the number of suggestions and the review potential, and the explanations become visible with an annual licence.', 'Yes. If you decide to use DentalBoost after the demo, I will set it up together with you — on site at your practice or remotely, whichever suits you better. During the trial you can reach me any time with questions, with no pressure to decide right away.', 'Analysis and analysis history are stored locally on your practice PC. This website demo uses only fictional examples and does not require a performance report.'],
  '.closing .eyebrow': ['Your next step'],
  '.closing h2': ['Discover the difference<br>a second look can make.'],
  '.founder .eyebrow': ['From medicine. For everyday practice.'],
  '.founder h2': ['Developed by a doctor.<br>Being tested in practice.'],
  '.founder>p:last-child': ['DentalBoost is a product of Nexus Lead FlexCo. Developed by a doctor and currently being tested in clinical settings, it aims to make everyday billing reviews easier to understand.'],
  '.closing>p:not(.eyebrow):not(.closing-note)': ['Get to know DentalBoost in a personal demo.<br>Email us and we will arrange a time together.'],
  '#contact-cta': ['Request a demo by email <span aria-hidden="true">↗</span>'],
  '.closing-note': ['One billing period free · Please do not send patient data by email.'],
  '.footer>p:not(.disclaimer)': ['A product of Nexus Lead FlexCo.'],
  '.footer>span': ['For dental practices in Austria'],
  '.showcase-caption': ['Screenshot of the actual DentalBoost software · example data is fictional'],
  '#funktionen .eyebrow': ['More than review suggestions', 'Statistics', 'Implant register'],
  '#funktionen h2': ['The overview you would otherwise<br>have to piece together yourself.'],
  '.feature-row:nth-child(1) h3': ['Your practice, year over year.'],
  '.feature-row:nth-child(1) .feature-text>p:not(.eyebrow)': ['This quarter against the same quarter last year, this year against last year — or any period you choose. Private and insurer billing shown separately, broken down by service, with a bar chart and trend line.'],
  '.feature-row:nth-child(1) .feature-tags span': ['Any time period', 'Private vs. insurer'],
  '.feature-row:nth-child(2) h3': ['Implants, from insertion to follow-up.'],
  '.feature-row:nth-child(2) .feature-text>p:not(.eyebrow)': ['DentalBoost automatically detects from the billing data when and where an implant was placed. Add insertion torque, depth and the clinical course directly to it — including complications and loss tracking per surgeon.'],
  '.feature-row:nth-child(2) .feature-tags span': ['Detects insertions automatically', 'Loss only with your confirmation'],
  '.legal-links a': ['Imprint', 'Privacy'],
  '.disclaimer': ['DentalBoost provides review suggestions. Your practice remains responsible for professional assessment and billing.']
};
const translations = Object.entries(english).flatMap(([selector, values]) =>
  Array.from(document.querySelectorAll(selector), (element, index) => ({ element, de: element.innerHTML, en: values[index] }))
);
const accessibleLabels = [
  ['.header .brand', 'DentalBoost home'], ['.header nav', 'Main navigation'],
].map(([selector, en]) => {
  const element = document.querySelector(selector);
  return { element, de: element.getAttribute('aria-label'), en };
});
const altTexts = [
  ['.showcase-hero img', 'Screenshot of the DentalBoost software: analysis overview with review-potential figures'],
  ['.feature-row:nth-child(1) img', 'Screenshot: statistics view with year-over-year comparison figures and a bar chart per service'],
  ['.feature-row:nth-child(2) img', 'Screenshot: implant register with a detected insertion, surgeon statistics and the implant list'],
].map(([selector, en]) => {
  const element = document.querySelector(selector);
  return { element, de: element.getAttribute('alt'), en };
});
const germanTitle = document.title;
const description = document.querySelector('meta[name="description"]');
const germanDescription = description.content;
const contactCta = document.getElementById('contact-cta');
const germanContactUrl = contactCta.getAttribute('href');
document.querySelector('.language-switch').addEventListener('click', event => {
  language = language === 'de' ? 'en' : 'de';
  document.documentElement.lang = language === 'de' ? 'de-AT' : 'en';
  for (const translation of translations) translation.element.innerHTML = translation[language];
  for (const label of accessibleLabels) label.element.setAttribute('aria-label', label[language]);
  for (const alt of altTexts) alt.element.setAttribute('alt', alt[language]);
  document.title = language === 'de' ? germanTitle : 'DentalBoost — More clarity. Fewer oversights.';
  description.content = language === 'de' ? germanDescription : 'DentalBoost helps Austrian dental practices review billing: spot potentially missing items, understand suggestions and analyse reports locally.';
  contactCta.href = language === 'de' ? germanContactUrl : 'mailto:nexuslead.austria@gmail.com?subject=' + encodeURIComponent('DentalBoost demo request') + '&body=' + encodeURIComponent('Hello,\n\nI am interested in a DentalBoost demo.\n\nPractice: \nPractice software: \nPreferred times: \n\nKind regards');
  event.currentTarget.textContent = language === 'de' ? 'DE / EN' : 'EN / DE';
  event.currentTarget.setAttribute('aria-label', language === 'de' ? 'Switch to English' : 'Auf Deutsch wechseln');
  document.dispatchEvent(new CustomEvent('site-language-change', { detail: language }));
});
