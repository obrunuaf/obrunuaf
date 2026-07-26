import { test, expect } from '@playwright/test';

test('verificar ao vivo a página pública @obrunuaf no GitHub e tirar print', async ({ page }) => {
  // Acessa a página pública com domcontentloaded para evitar timeout por sockets ativos
  await page.goto('https://github.com/obrunuaf', { waitUntil: 'domcontentloaded' });

  // Aguarda 2 segundos para dar tempo à renderização da capa
  await page.waitForTimeout(2000);

  // Tira um print da tela para inspeção
  await page.screenshot({ path: 'screenshot-live-profile.png', fullPage: false });

  // Verifica o título da página
  await expect(page).toHaveTitle(/obrunuaf/);

  // Busca se o texto do novo README já está aparecendo no DOM da página
  const contentText = await page.content();
  const isReadmeVisible = contentText.includes('Software Architect & Full-Stack Engineer') || contentText.includes('Oi, eu sou o Bruno Alves França');

  console.log('--- RESULTADO DA INSPEÇÃO AO VIVO COM PLAYWRIGHT ---');
  if (isReadmeVisible) {
    console.log('✅ O Profile README ESTÁ ATIVO E VISÍVEL na página pública!');
  } else {
    console.log('⏳ O Profile README ainda não apareceu na home (cache do GitHub ou configuração oculta).');
    
    if (contentText.includes('Popular repositories')) {
      console.log('ℹ️ O bloco "Popular repositories" está aparecendo como primeiro elemento na home.');
    }
  }
});
