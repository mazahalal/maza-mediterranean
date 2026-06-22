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
  await page.goto('http://localhost:3000/menu-board', { waitUntil: 'networkidle0' });
  await new Promise(resolve => setTimeout(resolve, 1500));

  const date = new Date().toISOString().split('T')[0];
  const outputDir = path.join(process.cwd(), 'generated', 'menu-boards', date);
  fs.mkdirSync(outputDir, { recursive: true });

  await page.screenshot({
    path: path.join(outputDir, 'menu-screen-1.png'),
    clip: { x: 0, y: 0, width: 1920, height: 1080 },
  });

  console.log(`✅ Generated menu boards → ${outputDir}`);

  await browser.close();
}

generateMenuBoards().catch(console.error);