import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

test.describe('Verificação do Perfil Executivo @obrunuaf — Estrutura e Seções Exatas', () => {
  test('README.md local deve conter as seções Tech Stack, GitHub Stats e Connect com cards estáveis e sem Martins Distribuidora', () => {
    const readmePath = path.join(__dirname, '..', 'README.md');
    const content = fs.readFileSync(readmePath, 'utf-8');

    // 1. Saudação inicial e Waving
    expect(content).toContain('capsule-render');
    expect(content).toContain('Bruno%20Alves%20França');

    // 2. Foco em Dojoro
    expect(content).toContain('Dojoro');
    expect(content).toContain('X-Academia-Id');

    // 3. Garantir remoção do item incorreto
    expect(content).not.toContain('Martins Distribuidora');

    // 4. Seções exatas solicitadas
    expect(content).toContain('### 🛠️ Tech Stack');
    expect(content).toContain('### 📊 GitHub Stats');
    expect(content).toContain('### 🔗 Connect');

    // 5. Estilo for-the-badge sem subtítulos extras
    expect(content).toContain('style=for-the-badge');

    // 6. Animação do Snake e Gráficos estáveis do Aryaman (theme=radical)
    expect(content).toContain('github-contribution-grid-snake');
    expect(content).toContain('github-readme-stats');
    expect(content).toContain('theme=radical');

    // 7. Garantir que a seção antiga foi removida
    expect(content).not.toContain('Outros Projetos & Ecossistema');
  });

  test('Página pública do GitHub obrunuaf deve renderizar o perfil e repositórios', async ({ page }) => {
    await page.goto('https://github.com/obrunuaf');
    
    // Verifica o título principal da página do usuário
    await expect(page).toHaveTitle(/obrunuaf/i);
    
    // Verifica se a seção de repositórios populares existe no DOM
    const popularRepos = page.locator('text=Popular repositories');
    await expect(popularRepos).toBeVisible();
  });
});
