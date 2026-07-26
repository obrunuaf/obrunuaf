import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

test.describe('Verificação do Perfil Executivo @obrunuaf — Dojoro & AI Engineering', () => {
  test('README.md local deve conter a saudação, foco no Dojoro, especialização em AI e links sociais', () => {
    const readmePath = path.join(__dirname, '..', 'README.md');
    const content = fs.readFileSync(readmePath, 'utf-8');

    // 1. Saudação inicial
    expect(content).toContain('Oi, eu sou o Bruno Alves França 👋');

    // 2. Título executivo
    expect(content).toContain('AI Engineer & Software Architect');

    // 3. Foco em Dojoro (SaaS Jiu-Jitsu)
    expect(content).toContain('Dojoro');
    expect(content).toContain('academias de Jiu-Jitsu');
    expect(content).toContain('X-Academia-Id');
    expect(content).toContain('Whatsmeow');

    // 4. Especialização em AI Engineering & Orquestração Multi-Agente
    expect(content).toContain('AI Engineering');
    expect(content).toContain('Zekai');
    expect(content).toContain('Kurama');
    expect(content).toContain('Model Context Protocol (MCP)');

    // 5. Redes sociais (LinkedIn e Instagram)
    expect(content).toContain('linkedin.com/in/balvesfranca/');
    expect(content).toContain('instagram.com/obrunuaf/');
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
