import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

test.describe('Verificação do Perfil Executivo @obrunuaf — Estrutura e Seções Exatas', () => {
  test('README.md local deve conter as seções Tech Stack, GitHub Stats e Connect com estilo for-the-badge', () => {
    const readmePath = path.join(__dirname, '..', 'README.md');
    const content = fs.readFileSync(readmePath, 'utf-8');

    // 1. Saudação inicial, Waving e Alinhamento horizontal de badges
    expect(content).toContain('capsule-render');
    expect(content).toContain('Bruno%20Alves%20França');

    // 2. Foco em Dojoro
    expect(content).toContain('Dojoro');
    expect(content).toContain('X-Academia-Id');

    // 3. Seções exatas solicitadas
    expect(content).toContain('### 🛠️ Tech Stack');
    expect(content).toContain('### 📊 GitHub Stats');
    expect(content).toContain('### 🔗 Connect');

    // 4. Estilo for-the-badge sem subtítulos extras
    expect(content).toContain('style=for-the-badge');
    expect(content).not.toContain('#### 🤖 AI');

    // 5. Animação do Snake e Gráficos
    expect(content).toContain('github-contribution-grid-snake');
    expect(content).toContain('github-readme-stats');

    // 6. Garantir que a seção antiga foi removida
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
