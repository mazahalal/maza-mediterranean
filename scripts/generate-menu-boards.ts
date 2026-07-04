import puppeteer from 'puppeteer';
import * as fs from 'fs';
import * as path from 'path';

async function generateMenuBoards() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 2 });
  page.setDefaultNavigationTimeout(30000);

  const date = new Date().toISOString().split('T')[0];
  const outputDir = path.join(process.cwd(), 'generated', 'menu-boards', date);
  fs.mkdirSync(outputDir, { recursive: true });

  const screens = [
    { name: 'menu-screen-1.png', url: 'http://localhost:3000/menu-board?screen=1' },
    { name: 'menu-screen-2.png', url: 'http://localhost:3000/menu-board?screen=2' },
    { name: 'menu-screen-1-no-shawarma.png', url: 'http://localhost:3000/menu-board?screen=1&shawarma=false' },
    { name: 'menu-screen-2-no-shawarma.png', url: 'http://localhost:3000/menu-board?screen=2&shawarma=false' },
  ];

  for (const screen of screens) {
    await page.goto(screen.url, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('h1', { timeout: 10000 }).catch(() => {
      console.warn(`⚠️  No h1 found on ${screen.name}, continuing`);
    });
    await new Promise(resolve => setTimeout(resolve, 2000));
    await page.screenshot({
      path: path.join(outputDir, screen.name),
      clip: { x: 0, y: 0, width: 1920, height: 1080 },
    });
    console.log(`✅ Generated ${screen.name}`);
  }

  await browser.close();
  console.log(`\nAll done → ${outputDir}`);
}

generateMenuBoards().catch(console.error);
