const { chromium } = require('playwright');

(async () => {
  console.log('🌐 Abrindo o navegador Playwright (Chromium) na sua tela em modo VISUAL (headless: false)...');
  
  const browser = await chromium.launch({ 
    headless: false,
    slowMo: 1500 // Atraso de 1.5s entre navegações para você acompanhar na tela
  });
  
  const context = await browser.newContext({
    viewport: { width: 1366, height: 768 }
  });
  const page = await context.newPage();

  console.log('📌 [1/2] Abrindo a sua home pública: https://github.com/obrunuaf...');
  await page.goto('https://github.com/obrunuaf', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(5000); // Fica 5 segundos para você ver que pula direto para "Popular repositories"

  console.log('📌 [2/2] Abrindo o repositório da capa: https://github.com/obrunuaf/obrunuaf...');
  await page.goto('https://github.com/obrunuaf/obrunuaf', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(5000); // Fica 5 segundos para você ver o novo README executivo renderizado e ativo

  console.log('✅ Demonstração visual no navegador Playwright concluída!');
  await browser.close();
})();
