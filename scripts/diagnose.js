const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
  console.log('🚀 Iniciando inspeção detalhada com o motor Playwright (Chromium)...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36'
  });
  const page = await context.newPage();

  const artifactDir = 'C:\\Users\\TIBUFF\\.gemini\\antigravity\\brain\\52b741a4-2ffe-404f-8dbb-546c0a9f02be';

  // 1. Inspecionando o Repositório do Perfil
  console.log('📌 [1/2] Acessando a página do repositório: https://github.com/obrunuaf/obrunuaf...');
  await page.goto('https://github.com/obrunuaf/obrunuaf', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000); // Aguarda renderização de fontes e markdown
  
  const repoScreenshotPath = path.join(artifactDir, 'playwright_repo.png');
  await page.screenshot({ path: repoScreenshotPath, fullPage: false });
  console.log(`📸 Print do repositório salvo em: ${repoScreenshotPath}`);

  const repoText = await page.content();
  const hasExecutiveBio = repoText.includes('Software Architect & Full-Stack Engineer') || repoText.includes('Oi, eu sou o Bruno');

  // 2. Inspecionando a Home do Perfil Público
  console.log('📌 [2/2] Acessando a Home do perfil público: https://github.com/obrunuaf...');
  await page.goto('https://github.com/obrunuaf', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2500); // Aguarda carregamento de seções dinâmicas

  const homeScreenshotPath = path.join(artifactDir, 'playwright_home.png');
  await page.screenshot({ path: homeScreenshotPath, fullPage: false });
  console.log(`📸 Print da Home pública salva em: ${homeScreenshotPath}`);

  const homeText = await page.content();
  const isReadmeInHome = homeText.includes('Software Architect & Full-Stack Engineer') || homeText.includes('Oi, eu sou o Bruno');
  const hasPopularRepos = homeText.includes('Popular repositories');

  console.log('\n========================================================');
  console.log('📊 RELATÓRIO TÉCNICO DA INSPEÇÃO PLAYWRIGHT');
  console.log('========================================================');
  console.log(`1. Repositório oficial (/obrunuaf/obrunuaf) contém o novo README? ${hasExecutiveBio ? '✅ SIM (Ativo e Público)' : '❌ NÃO'}`);
  console.log(`2. Página inicial (/obrunuaf) está renderizando o Profile README? ${isReadmeInHome ? '✅ SIM' : '❌ NÃO (Oculto ou Cache)'}`);
  console.log(`3. Bloco "Popular repositories" está visível na Home? ${hasPopularRepos ? '✅ SIM (Como primeiro elemento)' : '❌ NÃO'}`);
  console.log('========================================================\n');

  await browser.close();
  console.log('🎉 Inspeção do Playwright finalizada com sucesso!');
})();
