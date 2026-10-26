// Headless check of the register-tablet page: renders styled, form hydrates, and
// a submit round-trips to /api/review-request. Run from the repo root.
const puppeteer = require('puppeteer-core');

const BASE = process.env.BASE || 'http://127.0.0.1:3821';
const OUT = process.env.OUT || '/tmp/review-request-tablet.png';

(async () => {
  const browser = await puppeteer.launch({
    executablePath: '/root/.cache/ms-playwright/chromium-1234/chrome-linux64/chrome',
    headless: true,
    protocolTimeout: 240000,
    args: ['--no-sandbox', '--disable-gpu', '--hide-scrollbars', '--disable-dev-shm-usage', '--single-process'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 820, height: 1180, deviceScaleFactor: 1 });

  const errors = [];
  page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`));
  page.on('requestfailed', (r) => errors.push(`reqfail: ${r.url()} ${r.failure()?.errorText}`));
  page.on('response', (r) => { if (r.status() >= 400) errors.push(`http${r.status()}: ${r.url()}`); });

  await page.goto(`${BASE}/review-request`, { waitUntil: 'domcontentloaded' });

  const cssHref = await page.evaluate(() =>
    Array.from(document.querySelectorAll('link[rel="stylesheet"]')).map((l) => l.getAttribute('href'))
  );

  // wait for hydration: retry typing until the controlled input keeps a value
  await page.waitForSelector('#review-phone', { visible: true });
  for (let i = 0; i < 10; i++) {
    await page.click('#review-phone');
    await page.type('#review-phone', '4805550997', { delay: 30 });
    const v = await page.$eval('#review-phone', (el) => el.value);
    if (v.replace(/\D/g, '').length === 10) break;
    await page.$eval('#review-phone', (el) => { el.value = ''; });
    await new Promise((r) => setTimeout(r, 700));
  }

  const phoneVal = await page.$eval('#review-phone', (el) => el.value);
  const submitBefore = await page.$eval('button[type="submit"]', (b) => b.disabled);

  await page.click('label input[type="checkbox"]');
  await new Promise((r) => setTimeout(r, 300));
  const submitAfterConsent = await page.$eval('button[type="submit"]', (b) => b.disabled);

  // click send, retry until the result panel appears
  let resultText = null;
  for (let i = 0; i < 8; i++) {
    await page.click('button[type="submit"]').catch(() => {});
    await new Promise((r) => setTimeout(r, 1200));
    resultText = await page.evaluate(() => {
      const el = Array.from(document.querySelectorAll('p')).map((p) => p.textContent || '');
      return el.find((t) => /NOT sent|Review request sent|Already asked|replied STOP|Network error|wrong/i.test(t)) || null;
    });
    if (resultText) break;
  }

  const styled = await page.evaluate(() => {
    const h1 = document.querySelector('h1');
    const btn = document.querySelector('button[type="submit"]');
    const cs = (el) => (el ? getComputedStyle(el) : null);
    // Is the site-wide floating takeout CTA present on this staff surface?
    const floating = Array.from(document.querySelectorAll('button')).find((b) => /Order Now|✕/.test(b.textContent || ''));
    // Does the long review URL stay inside its card?
    const smsCap = Array.from(document.querySelectorAll('p')).find((p) => (p.textContent || '').includes('g.page/r/'));
    const card = smsCap?.closest('div');
    const overflow = smsCap && card
      ? smsCap.getBoundingClientRect().right > card.getBoundingClientRect().right + 1
      : null;
    return {
      h1Font: cs(h1)?.fontFamily,
      h1Size: cs(h1)?.fontSize,
      pageBg: cs(document.querySelector('.bg-\\[\\#0A1F1E\\]'))?.backgroundColor,
      btnBg: cs(btn)?.backgroundColor,
      btnRadius: cs(btn)?.borderRadius,
      floatingCtaPresent: Boolean(floating),
      smsOverflowsCard: overflow,
      docScrollW: document.documentElement.scrollWidth,
      innerW: window.innerWidth,
    };
  });

  await page.screenshot({ path: OUT, fullPage: true });
  console.log(JSON.stringify({ cssHref, phoneVal, submitBefore, submitAfterConsent, resultText, styled, errors }, null, 1));
  await browser.close();
})().catch((e) => { console.error('FAILED', e); process.exit(1); });
