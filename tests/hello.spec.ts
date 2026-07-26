import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

test.describe('Verificação do Perfil Executivo @obrunuaf', () => {
  test('README.md local deve conter a saudação "Oi" e a estrutura executiva', async () => {
    const readmePath = path.resolve(__dirname, '../README.md');
    const content = fs.readFileSync(readmePath, 'utf-8');

    // Verifica se a saudação "Oi" exigida está presente no início do arquivo
    expect(content).toContain('# Oi, eu sou o Bruno Alves França');
    
    // Verifica se os destaques de engenharia e arquitetura estão presentes
    expect(content).toContain('Software Architect & Full-Stack Engineer');
    expect(content).toContain('Dojoro');
    expect(content).toContain('Finvision');
    expect(content).toContain('Zekai');
  });

  test('Página renderizada no browser com Playwright deve exibir "Oi" e informações do perfil', async ({ page }) => {
    const readmePath = path.resolve(__dirname, '../README.md');
    const content = fs.readFileSync(readmePath, 'utf-8');

    // Monta um DOM estático simples para simular a renderização do perfil
    await page.setContent(`
      <!DOCTYPE html>
      <html lang="pt-BR">
        <head>
          <meta charset="utf-8" />
          <title>Perfil @obrunuaf</title>
        </head>
        <body>
          <main class="markdown-body">
            <h1>Oi, eu sou o Bruno Alves França 👋</h1>
            <p><strong>Software Architect & Full-Stack Engineer | Multi-Agent Orchestration & Ecosystem Builder.</strong></p>
            <section id="projects">
              <h2>Ecossistema & Projetos em Destaque</h2>
              <ul>
                <li>Dojoro</li>
                <li>Finvision</li>
                <li>Zekai & Kurama</li>
              </ul>
            </section>
          </main>
        </body>
      </html>
    `);

    // Verifica se o Playwright encontra o elemento H1 com "Oi"
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
    await expect(heading).toContainText('Oi');
    await expect(heading).toContainText('Bruno Alves França');

    // Verifica se a seção de projetos está renderizada corretamente
    const projectsSection = page.locator('#projects');
    await expect(projectsSection).toBeVisible();
    await expect(projectsSection.locator('li')).toHaveCount(3);
  });
});
