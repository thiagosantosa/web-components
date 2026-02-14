import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { TooltipComponent } from './tooltip.component';

const meta: Meta<TooltipComponent> = {
  title: 'Popups & Modals/Tooltip',
  component: TooltipComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [TooltipComponent],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `
# 💬 Web Tooltip - Componente Avançado

O **Web Tooltip** é um componente tooltip ultra-moderno que vai **MUITO ALÉM** dos frameworks tradicionais como Angular Material, Bootstrap e PrimeNG.

---

## 🚀 Diferenciais

### Comparativo com outros frameworks:

| Feature | Angular Material | Bootstrap | PrimeNG | **Web Tooltip** ✨ |
|---------|-----------------|-----------|---------|-------------------|
| **Posições** | 4 | 4 | 4 | **12** 🎯 |
| **HTML Rico** | ❌ | ⚠️ | ⚠️ | ✅ **Completo** |
| **Ícones** | ❌ | ❌ | ❌ | ✅ **Material Symbols** |
| **Cores Custom** | ❌ | ❌ | ❌ | ✅ **Total Controle** |
| **Auto-reposição** | ❌ | ❌ | ⚠️ | ✅ **Inteligente** |
| **Triggers** | 2 | 2 | 2 | **4** 🎮 |
| **Variantes** | 1 | 1 | 1 | **6** 🎨 |

---

## 📦 Instalação

\`\`\`bash
npm install @web/ui-components
\`\`\`

---

## 🔧 Configuração

### 1. Importar o Componente

\`\`\`typescript
import { Component } from '@angular/core';
import { TooltipComponent } from '@web/ui-components';

@Component({
  selector: 'app-my-component',
  standalone: true,
  imports: [TooltipComponent], // ← Adicione aqui
  template: \`
    <web-tooltip content="Hello World!">
      <button>Hover Me</button>
    </web-tooltip>
  \`
})
export class MyComponent {}
\`\`\`

---

## 💡 Uso Básico

### Tooltip Simples

\`\`\`html
<web-tooltip content="Este é um tooltip básico!">
  <button>Hover Me</button>
</web-tooltip>
\`\`\`

### Com Variante

\`\`\`html
<web-tooltip content="Operação realizada!" variant="success">
  <button>Salvar</button>
</web-tooltip>
\`\`\`

### Com Ícone

\`\`\`html
<web-tooltip content="Informação importante" icon="info" variant="info">
  <button>Info</button>
</web-tooltip>
\`\`\`

### Cor Customizada

\`\`\`html
<web-tooltip
  content="Tooltip da marca web"
  icon="school"
  customBgColor="#009ADA"
  customTextColor="#ffffff">
  <button>web Blue</button>
</web-tooltip>
\`\`\`

---

## 🎯 Posições (12 opções)

### Posições Verticais
\`\`\`html
<!-- Topo -->
<web-tooltip position="top">Centralizado em cima</web-tooltip>
<web-tooltip position="top-start">Alinhado à esquerda em cima</web-tooltip>
<web-tooltip position="top-end">Alinhado à direita em cima</web-tooltip>

<!-- Baixo -->
<web-tooltip position="bottom">Centralizado embaixo</web-tooltip>
<web-tooltip position="bottom-start">Alinhado à esquerda embaixo</web-tooltip>
<web-tooltip position="bottom-end">Alinhado à direita embaixo</web-tooltip>
\`\`\`

### Posições Horizontais
\`\`\`html
<!-- Esquerda -->
<web-tooltip position="left">Centralizado à esquerda</web-tooltip>
<web-tooltip position="left-start">Alinhado ao topo à esquerda</web-tooltip>
<web-tooltip position="left-end">Alinhado embaixo à esquerda</web-tooltip>

<!-- Direita -->
<web-tooltip position="right">Centralizado à direita</web-tooltip>
<web-tooltip position="right-start">Alinhado ao topo à direita</web-tooltip>
<web-tooltip position="right-end">Alinhado embaixo à direita</web-tooltip>
\`\`\`

---

## 🎨 Variantes

\`\`\`html
<web-tooltip variant="default">Cinza escuro (padrão)</web-tooltip>
<web-tooltip variant="info">Azul informativo</web-tooltip>
<web-tooltip variant="success">Verde de sucesso</web-tooltip>
<web-tooltip variant="warning">Amarelo de aviso</web-tooltip>
<web-tooltip variant="error">Vermelho de erro</web-tooltip>
<web-tooltip variant="dark">Preto</web-tooltip>
\`\`\`

---

## 🎮 Triggers

### Hover (Padrão)
\`\`\`html
<web-tooltip trigger="hover" content="Aparece ao passar o mouse">
  <button>Hover Me</button>
</web-tooltip>
\`\`\`

### Click
\`\`\`html
<web-tooltip trigger="click" content="Aparece ao clicar">
  <button>Click Me</button>
</web-tooltip>
\`\`\`

### Focus
\`\`\`html
<web-tooltip trigger="focus" content="Aparece ao focar">
  <input type="text" placeholder="Focus me">
</web-tooltip>
\`\`\`

### Manual (Programático)
\`\`\`typescript
@ViewChild(TooltipComponent) tooltip!: TooltipComponent;

showTooltip() {
  this.tooltip.show();
}

hideTooltip() {
  this.tooltip.hide();
}
\`\`\`

---

## ⚙️ Funcionalidades Avançadas

### HTML Rico (Template)

\`\`\`html
<web-tooltip>
  <button>Ver Detalhes</button>
  <ng-template #tooltipContent>
    <div style="text-align: left;">
      <strong>📊 Estatísticas</strong>
      <ul>
        <li>1.234 usuários</li>
        <li>98% satisfação</li>
        <li>24/7 suporte</li>
      </ul>
    </div>
  </ng-template>
</web-tooltip>
\`\`\`

### Delays Personalizados

\`\`\`html
<web-tooltip
  content="Aguarda 500ms para aparecer"
  [showDelay]="500"
  [hideDelay]="200">
  <button>Com Delay</button>
</web-tooltip>
\`\`\`

### Sem Seta

\`\`\`html
<web-tooltip content="Tooltip sem seta" [showArrow]="false">
  <button>No Arrow</button>
</web-tooltip>
\`\`\`

### Ícone Personalizado

\`\`\`html
<!-- Ícone à esquerda (padrão) -->
<web-tooltip icon="check_circle" iconPosition="left">
  <button>Left Icon</button>
</web-tooltip>

<!-- Ícone à direita -->
<web-tooltip icon="arrow_forward" iconPosition="right">
  <button>Right Icon</button>
</web-tooltip>
\`\`\`

---

## 🎭 Ícones Material Symbols

Use qualquer ícone do [Material Symbols](https://fonts.google.com/icons):

\`\`\`html
<!-- Ícones comuns -->
<web-tooltip icon="info">Info</web-tooltip>
<web-tooltip icon="check_circle">Success</web-tooltip>
<web-tooltip icon="warning">Warning</web-tooltip>
<web-tooltip icon="error">Error</web-tooltip>
<web-tooltip icon="help">Help</web-tooltip>
<web-tooltip icon="settings">Settings</web-tooltip>
<web-tooltip icon="search">Search</web-tooltip>
<web-tooltip icon="notifications">Notifications</web-tooltip>
<web-tooltip icon="favorite">Favorite</web-tooltip>
<web-tooltip icon="star">Star</web-tooltip>
<web-tooltip icon="download">Download</web-tooltip>
<web-tooltip icon="upload">Upload</web-tooltip>
<web-tooltip icon="share">Share</web-tooltip>
<web-tooltip icon="edit">Edit</web-tooltip>
<web-tooltip icon="delete">Delete</web-tooltip>
\`\`\`

---

## 🎨 Cores Customizadas

### Cores Sólidas

\`\`\`html
<web-tooltip
  content="Tooltip roxo"
  customBgColor="#8b5cf6"
  customTextColor="#ffffff">
  <button>Roxo</button>
</web-tooltip>

<web-tooltip
  content="Tooltip rosa"
  customBgColor="#ec4899"
  customTextColor="#ffffff">
  <button>Rosa</button>
</web-tooltip>
\`\`\`

### Com Gradiente

\`\`\`html
<web-tooltip
  content="Tooltip com gradiente"
  customBgColor="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
  customTextColor="#ffffff">
  <button>Gradient</button>
</web-tooltip>
\`\`\`

### Cores da Marca

\`\`\`html
<!-- web Official Blue -->
<web-tooltip
  content="Cor oficial web"
  icon="school"
  customBgColor="#009ADA"
  customTextColor="#ffffff">
  <button>web</button>
</web-tooltip>
\`\`\`

---

## 📋 Propriedades

| Propriedade | Tipo | Padrão | Descrição |
|------------|------|--------|-----------|
| \`content\` | string | \`''\` | Texto do tooltip |
| \`position\` | TooltipPosition | \`'top'\` | Posição (12 opções) |
| \`variant\` | TooltipVariant | \`'default'\` | Variante visual (6 opções) |
| \`trigger\` | TooltipTrigger | \`'hover'\` | Como ativar (hover, click, focus, manual) |
| \`showArrow\` | boolean | \`true\` | Mostrar seta |
| \`arrowSize\` | number | \`8\` | Tamanho da seta em pixels |
| \`showDelay\` | number | \`0\` | Delay para mostrar (ms) |
| \`hideDelay\` | number | \`0\` | Delay para esconder (ms) |
| \`disabled\` | boolean | \`false\` | Desabilitar tooltip |
| \`maxWidth\` | number | \`300\` | Largura máxima (px) |
| \`offset\` | number | \`8\` | Distância do trigger (px) |
| \`icon\` | string | \`''\` | Nome do ícone Material Symbols |
| \`iconPosition\` | 'left' \\| 'right' | \`'left'\` | Posição do ícone |
| \`customBgColor\` | string | \`''\` | Cor de fundo customizada (HEX, RGB, gradiente) |
| \`customTextColor\` | string | \`''\` | Cor do texto customizada |

---

## 🎯 Eventos

| Evento | Tipo | Descrição |
|--------|------|-----------|
| \`tooltipShow\` | EventEmitter<void> | Emitido quando o tooltip aparece |
| \`tooltipHide\` | EventEmitter<void> | Emitido quando o tooltip desaparece |

\`\`\`html
<web-tooltip
  content="Teste"
  (tooltipShow)="onTooltipShow()"
  (tooltipHide)="onTooltipHide()">
  <button>Com Eventos</button>
</web-tooltip>
\`\`\`

---

## 💼 Casos de Uso

### 1. Help em Formulários

\`\`\`html
<label>
  Email
  <web-tooltip
    content="Digite um email válido para recuperação de senha"
    icon="info"
    variant="info"
    position="right">
    <span class="help-icon">?</span>
  </web-tooltip>
</label>
<input type="email">
\`\`\`

### 2. Botões de Ação

\`\`\`html
<web-tooltip content="Editar" position="bottom">
  <button class="icon-btn">✏️</button>
</web-tooltip>

<web-tooltip content="Deletar" variant="error" position="bottom">
  <button class="icon-btn">🗑️</button>
</web-tooltip>
\`\`\`

### 3. Status Indicators

\`\`\`html
<web-tooltip
  content="Sistema operacional"
  icon="check_circle"
  variant="success">
  <div class="status-dot green"></div>
</web-tooltip>
\`\`\`

### 4. Keyboard Shortcuts

\`\`\`html
<web-tooltip position="right">
  <button>💾 Salvar</button>
  <ng-template #tooltipContent>
    <div style="display: flex; gap: 0.5rem;">
      <kbd>Ctrl</kbd> + <kbd>S</kbd>
    </div>
  </ng-template>
</web-tooltip>
\`\`\`

---

## 🔥 Auto-reposicionamento Inteligente

O tooltip detecta automaticamente as bordas da tela e se reposiciona:

- Se não couber em cima → Aparece embaixo
- Se não couber à esquerda → Aparece à direita
- Se não couber à direita → Aparece à esquerda
- Se não couber embaixo → Aparece em cima

**Funciona automaticamente, sem configuração!** ✨

---

## 🐛 Troubleshooting

### Tooltip não aparece?

1. ✅ Verifique se está usando \`<web-tooltip>\` (não \`<web-tooltip>\`)
2. ✅ Certifique-se de que o componente foi importado
3. ✅ Confirme que há um elemento filho dentro do tooltip
4. ✅ Verifique se não está \`[disabled]="true"\`

### Ícone não aparece?

1. ✅ Verifique se o nome do ícone está correto (ex: \`check_circle\`, não \`check-circle\`)
2. ✅ Material Symbols já vem carregado no componente

### Cor customizada não funciona?

1. ✅ Use HEX completo: \`#8b5cf6\` (não \`8b5cf6\`)
2. ✅ Cores customizadas sobrepõem as variantes

---

## 🎓 Boas Práticas

1. **Use variantes para casos comuns** (info, success, warning, error)
2. **Use cores customizadas para branding** ou casos especiais
3. **Adicione ícones para tooltips informativos** (melhora UX)
4. **Prefira \`position="top"\` ou \`position="bottom"\`** (mais natural)
5. **Use delays para evitar tooltips acidentais** em áreas densas
6. **Mantenha conteúdo conciso** (máximo 2-3 linhas)

---

## 📚 Exemplos Completos

Explore as stories abaixo para ver todos os recursos em ação:

- **🧪 Teste Básico** - Validação rápida
- **Todas as Posições** - 12 posições demonstradas
- **Todas as Variantes** - 6 variantes visuais
- **Com Ícones** - Material Symbols em ação
- **Cores Customizadas** - Paleta completa
- **Casos de Uso** - Exemplos práticos do dia a dia
        `
      }
    }
  }
};

export default meta;
type Story = StoryObj<TooltipComponent>;

// ========== BÁSICO ==========

export const Default: Story = {
  render: () => ({
    template: `
      <div style="padding: 100px; text-align: center;">
        <web-tooltip content="Este é um tooltip básico!">
          <button style="padding: 0.75rem 1.5rem; background: #009ADA; color: white; border: none; border-radius: 0.5rem; font-family: Montserrat; font-weight: 600; cursor: pointer;">
            Hover Me
          </button>
        </web-tooltip>
      </div>
    `
  })
};

// ========== POSIÇÕES (12) ==========

export const AllPositions: Story = {
  name: 'Todas as Posições (12)',
  render: () => ({
    template: `
      <div style="padding: 3rem; display: grid; grid-template-columns: repeat(4, 1fr); gap: 2rem; font-family: Montserrat;">

        <!-- Top -->
        <web-tooltip content="Top" position="top">
          <button class="demo-btn">Top</button>
        </web-tooltip>

        <web-tooltip content="Top Start" position="top-start">
          <button class="demo-btn">Top Start</button>
        </web-tooltip>

        <web-tooltip content="Top End" position="top-end">
          <button class="demo-btn">Top End</button>
        </web-tooltip>

        <div></div>

        <!-- Bottom -->
        <web-tooltip content="Bottom" position="bottom">
          <button class="demo-btn">Bottom</button>
        </web-tooltip>

        <web-tooltip content="Bottom Start" position="bottom-start">
          <button class="demo-btn">Bottom Start</button>
        </web-tooltip>

        <web-tooltip content="Bottom End" position="bottom-end">
          <button class="demo-btn">Bottom End</button>
        </web-tooltip>

        <div></div>

        <!-- Left -->
        <web-tooltip content="Left" position="left">
          <button class="demo-btn">Left</button>
        </web-tooltip>

        <web-tooltip content="Left Start" position="left-start">
          <button class="demo-btn">Left Start</button>
        </web-tooltip>

        <web-tooltip content="Left End" position="left-end">
          <button class="demo-btn">Left End</button>
        </web-tooltip>

        <div></div>

        <!-- Right -->
        <web-tooltip content="Right" position="right">
          <button class="demo-btn">Right</button>
        </web-tooltip>

        <web-tooltip content="Right Start" position="right-start">
          <button class="demo-btn">Right Start</button>
        </web-tooltip>

        <web-tooltip content="Right End" position="right-end">
          <button class="demo-btn">Right End</button>
        </web-tooltip>
      </div>

      <style>
        .demo-btn {
          padding: 0.5rem 1rem;
          background: #009ADA;
          color: white;
          border: none;
          border-radius: 0.375rem;
          font-family: Montserrat;
          font-weight: 600;
          cursor: pointer;
          width: 100%;
        }
        .demo-btn:hover {
          background: #0087c2;
        }
      </style>
    `
  })
};

// ========== VARIANTES ==========

export const AllVariants: Story = {
  name: 'Todas as Variantes',
  render: () => ({
    template: `
      <div style="padding: 3rem; display: flex; gap: 1rem; flex-wrap: wrap; font-family: Montserrat;">

        <web-tooltip content="Default tooltip" variant="default">
          <button class="btn-default">Default</button>
        </web-tooltip>

        <web-tooltip content="Informação adicional aqui" variant="info">
          <button class="btn-info">Info</button>
        </web-tooltip>

        <web-tooltip content="Operação realizada com sucesso!" variant="success">
          <button class="btn-success">Success</button>
        </web-tooltip>

        <web-tooltip content="Atenção: verifique os dados" variant="warning">
          <button class="btn-warning">Warning</button>
        </web-tooltip>

        <web-tooltip content="Erro: operação falhou" variant="error">
          <button class="btn-error">Error</button>
        </web-tooltip>

        <web-tooltip content="Modo escuro ativado" variant="dark">
          <button class="btn-dark">Dark</button>
        </web-tooltip>

      </div>

      <style>
        button {
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 0.5rem;
          font-family: Montserrat;
          font-weight: 600;
          cursor: pointer;
          color: white;
        }
        .btn-default { background: #6b7280; }
        .btn-info { background: #009ADA; }
        .btn-success { background: #10b981; }
        .btn-warning { background: #f59e0b; }
        .btn-error { background: #ef4444; }
        .btn-dark { background: #000000; }
      </style>
    `
  })
};

// ========== TRIGGERS ==========

export const DifferentTriggers: Story = {
  name: 'Diferentes Triggers',
  render: () => ({
    template: `
      <div style="padding: 3rem; display: flex; gap: 2rem; font-family: Montserrat;">

        <div style="text-align: center;">
          <p style="margin-bottom: 1rem; font-weight: 600;">Hover (padrão)</p>
          <web-tooltip content="Aparece ao passar o mouse" trigger="hover">
            <button class="demo-btn">Hover Me</button>
          </web-tooltip>
        </div>

        <div style="text-align: center;">
          <p style="margin-bottom: 1rem; font-weight: 600;">Click</p>
          <web-tooltip content="Aparece ao clicar" trigger="click">
            <button class="demo-btn">Click Me</button>
          </web-tooltip>
        </div>

        <div style="text-align: center;">
          <p style="margin-bottom: 1rem; font-weight: 600;">Focus</p>
          <web-tooltip content="Aparece ao focar" trigger="focus">
            <input
              type="text"
              placeholder="Focus me"
              style="padding: 0.75rem; border: 2px solid #d1d5db; border-radius: 0.375rem; font-family: Montserrat;">
          </web-tooltip>
        </div>

      </div>

      <style>
        .demo-btn {
          padding: 0.75rem 1.5rem;
          background: #009ADA;
          color: white;
          border: none;
          border-radius: 0.5rem;
          font-family: Montserrat;
          font-weight: 600;
          cursor: pointer;
        }
      </style>
    `
  })
};

// ========== HTML RICO ==========

export const RichContent: Story = {
  name: 'HTML Rico (Template)',
  render: () => ({
    template: `
      <div style="padding: 100px; text-align: center;">
        <web-tooltip>
          <button style="padding: 0.75rem 1.5rem; background: #009ADA; color: white; border: none; border-radius: 0.5rem; font-family: Montserrat; font-weight: 600; cursor: pointer;">
            Ver Detalhes
          </button>
          <ng-template #tooltipContent>
            <div style="text-align: left;">
              <div style="font-weight: 700; font-size: 1rem; margin-bottom: 0.5rem;">
                📊 Estatísticas
              </div>
              <div style="font-size: 0.875rem; line-height: 1.6;">
                <div>✓ 1.234 usuários ativos</div>
                <div>✓ 98% de satisfação</div>
                <div>✓ 24/7 suporte</div>
              </div>
              <div style="margin-top: 0.75rem; padding-top: 0.75rem; border-top: 1px solid rgba(255,255,255,0.2); font-size: 0.75rem; opacity: 0.8;">
                Última atualização: hoje
              </div>
            </div>
          </ng-template>
        </web-tooltip>
      </div>
    `
  })
};

// ========== DELAYS ==========

export const WithDelays: Story = {
  name: 'Com Delays',
  render: () => ({
    template: `
      <div style="padding: 3rem; display: flex; gap: 2rem; font-family: Montserrat;">

        <div style="text-align: center;">
          <p style="margin-bottom: 1rem; font-weight: 600;">Sem Delay</p>
          <web-tooltip content="Aparece instantaneamente">
            <button class="demo-btn">Instantâneo</button>
          </web-tooltip>
        </div>

        <div style="text-align: center;">
          <p style="margin-bottom: 1rem; font-weight: 600;">Show Delay 500ms</p>
          <web-tooltip content="Aguarda 500ms para aparecer" [showDelay]="500">
            <button class="demo-btn">Com Delay</button>
          </web-tooltip>
        </div>

        <div style="text-align: center;">
          <p style="margin-bottom: 1rem; font-weight: 600;">Hide Delay 1000ms</p>
          <web-tooltip content="Demora 1s para sumir" [hideDelay]="1000">
            <button class="demo-btn">Delay ao Sair</button>
          </web-tooltip>
        </div>

      </div>

      <style>
        .demo-btn {
          padding: 0.75rem 1.5rem;
          background: #009ADA;
          color: white;
          border: none;
          border-radius: 0.5rem;
          font-family: Montserrat;
          font-weight: 600;
          cursor: pointer;
        }
      </style>
    `
  })
};

// ========== SEM ARROW ==========

export const WithoutArrow: Story = {
  name: 'Sem Seta',
  render: () => ({
    template: `
      <div style="padding: 100px; text-align: center;">
        <web-tooltip content="Tooltip sem seta (mais clean)" [showArrow]="false">
          <button style="padding: 0.75rem 1.5rem; background: #009ADA; color: white; border: none; border-radius: 0.5rem; font-family: Montserrat; font-weight: 600; cursor: pointer;">
            Sem Arrow
          </button>
        </web-tooltip>
      </div>
    `
  })
};

// ========== CASOS DE USO ==========

export const FormHelp: Story = {
  name: 'Help em Formulário',
  render: () => ({
    template: `
      <div style="padding: 3rem; max-width: 400px; font-family: Montserrat;">
        <div style="margin-bottom: 1.5rem;">
          <label style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem; font-weight: 600;">
            Email
            <web-tooltip
              content="Digite um email válido para recuperação de senha"
              variant="info"
              position="right">
              <span style="display: inline-flex; align-items: center; justify-content: center; width: 18px; height: 18px; background: #009ADA; color: white; border-radius: 50%; font-size: 0.75rem; cursor: help;">
                ?
              </span>
            </web-tooltip>
          </label>
          <input
            type="email"
            placeholder="seu@email.com"
            style="width: 100%; padding: 0.75rem; border: 2px solid #d1d5db; border-radius: 0.375rem; font-family: Montserrat;">
        </div>

        <div style="margin-bottom: 1.5rem;">
          <label style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem; font-weight: 600;">
            Senha
            <web-tooltip
              variant="warning"
              position="right">
              <span style="display: inline-flex; align-items: center; justify-content: center; width: 18px; height: 18px; background: #f59e0b; color: white; border-radius: 50%; font-size: 0.75rem; cursor: help;">
                !
              </span>
              <ng-template #tooltipContent>
                <div style="line-height: 1.6;">
                  <strong>Senha forte deve ter:</strong><br>
                  • Mínimo 8 caracteres<br>
                  • Letras maiúsculas<br>
                  • Números<br>
                  • Caracteres especiais
                </div>
              </ng-template>
            </web-tooltip>
          </label>
          <input
            type="password"
            placeholder="••••••••"
            style="width: 100%; padding: 0.75rem; border: 2px solid #d1d5db; border-radius: 0.375rem; font-family: Montserrat;">
        </div>
      </div>
    `
  })
};

export const IconButtons: Story = {
  name: 'Botões com Ícones',
  render: () => ({
    template: `
      <div style="padding: 3rem; display: flex; gap: 0.5rem;">

        <web-tooltip content="Editar" position="bottom">
          <button class="icon-btn">✏️</button>
        </web-tooltip>

        <web-tooltip content="Deletar" variant="error" position="bottom">
          <button class="icon-btn">🗑️</button>
        </web-tooltip>

        <web-tooltip content="Compartilhar" variant="info" position="bottom">
          <button class="icon-btn">📤</button>
        </web-tooltip>

        <web-tooltip content="Download" variant="success" position="bottom">
          <button class="icon-btn">⬇️</button>
        </web-tooltip>

        <web-tooltip content="Favoritar" variant="warning" position="bottom">
          <button class="icon-btn">⭐</button>
        </web-tooltip>

      </div>

      <style>
        .icon-btn {
          width: 40px;
          height: 40px;
          padding: 0;
          background: white;
          border: 2px solid #e5e7eb;
          border-radius: 0.5rem;
          font-size: 1.25rem;
          cursor: pointer;
          transition: all 0.2s;
        }
        .icon-btn:hover {
          border-color: #009ADA;
          background: #f0f9ff;
        }
      </style>
    `
  })
};

export const StatusIndicators: Story = {
  name: 'Status Indicators',
  render: () => ({
    template: `
      <div style="padding: 3rem; display: flex; flex-direction: column; gap: 1rem; max-width: 400px; font-family: Montserrat;">

        <div style="display: flex; align-items: center; gap: 1rem; padding: 1rem; border: 1px solid #e5e7eb; border-radius: 0.5rem;">
          <web-tooltip content="Sistema operacional" variant="success">
            <div style="width: 12px; height: 12px; background: #10b981; border-radius: 50%; cursor: help;"></div>
          </web-tooltip>
          <span>Backend API</span>
        </div>

        <div style="display: flex; align-items: center; gap: 1rem; padding: 1rem; border: 1px solid #e5e7eb; border-radius: 0.5rem;">
          <web-tooltip content="Processando requisições" variant="warning">
            <div style="width: 12px; height: 12px; background: #f59e0b; border-radius: 50%; cursor: help;"></div>
          </web-tooltip>
          <span>Database</span>
        </div>

        <div style="display: flex; align-items: center; gap: 1rem; padding: 1rem; border: 1px solid #e5e7eb; border-radius: 0.5rem;">
          <web-tooltip content="Serviço indisponível" variant="error">
            <div style="width: 12px; height: 12px; background: #ef4444; border-radius: 50%; cursor: help;"></div>
          </web-tooltip>
          <span>Payment Gateway</span>
        </div>

      </div>
    `
  })
};

export const KeyboardShortcuts: Story = {
  name: 'Keyboard Shortcuts',
  render: () => ({
    template: `
      <div style="padding: 3rem; display: flex; flex-direction: column; gap: 1rem; max-width: 300px; font-family: Montserrat;">

        <web-tooltip position="right">
          <button class="menu-item">
            💾 Salvar
          </button>
          <ng-template #tooltipContent>
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <kbd style="padding: 0.125rem 0.375rem; background: rgba(255,255,255,0.2); border-radius: 0.25rem; font-size: 0.75rem;">Ctrl</kbd>
              <span>+</span>
              <kbd style="padding: 0.125rem 0.375rem; background: rgba(255,255,255,0.2); border-radius: 0.25rem; font-size: 0.75rem;">S</kbd>
            </div>
          </ng-template>
        </web-tooltip>

        <web-tooltip position="right">
          <button class="menu-item">
            📋 Copiar
          </button>
          <ng-template #tooltipContent>
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <kbd style="padding: 0.125rem 0.375rem; background: rgba(255,255,255,0.2); border-radius: 0.25rem; font-size: 0.75rem;">Ctrl</kbd>
              <span>+</span>
              <kbd style="padding: 0.125rem 0.375rem; background: rgba(255,255,255,0.2); border-radius: 0.25rem; font-size: 0.75rem;">C</kbd>
            </div>
          </ng-template>
        </web-tooltip>

        <web-tooltip position="right">
          <button class="menu-item">
            🔍 Buscar
          </button>
          <ng-template #tooltipContent>
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <kbd style="padding: 0.125rem 0.375rem; background: rgba(255,255,255,0.2); border-radius: 0.25rem; font-size: 0.75rem;">Ctrl</kbd>
              <span>+</span>
              <kbd style="padding: 0.125rem 0.375rem; background: rgba(255,255,255,0.2); border-radius: 0.25rem; font-size: 0.75rem;">F</kbd>
            </div>
          </ng-template>
        </web-tooltip>

      </div>

      <style>
        .menu-item {
          width: 100%;
          padding: 0.75rem 1rem;
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 0.5rem;
          font-family: Montserrat;
          font-weight: 500;
          text-align: left;
          cursor: pointer;
          transition: all 0.2s;
        }
        .menu-item:hover {
          background: #f9fafb;
          border-color: #009ADA;
        }
      </style>
    `
  })
};

// ========== EDGE CASES ==========

export const EdgeDetection: Story = {
  name: 'Detecção de Bordas (Auto-ajuste)',
  render: () => ({
    template: `
      <div style="padding: 1rem; height: 400px; position: relative; border: 2px dashed #d1d5db; font-family: Montserrat;">
        <p style="text-align: center; margin-bottom: 1rem; font-weight: 600;">
          Mova os tooltips para as bordas - eles se reposicionam automaticamente!
        </p>

        <!-- Top Left -->
        <web-tooltip content="Tento aparecer embaixo se não couber em cima" position="top">
          <button style="position: absolute; top: 10px; left: 10px; padding: 0.5rem 1rem; background: #009ADA; color: white; border: none; border-radius: 0.375rem; cursor: pointer;">
            Top Left
          </button>
        </web-tooltip>

        <!-- Top Right -->
        <web-tooltip content="Me reposiciono se passar da borda direita" position="right">
          <button style="position: absolute; top: 10px; right: 10px; padding: 0.5rem 1rem; background: #009ADA; color: white; border: none; border-radius: 0.375rem; cursor: pointer;">
            Top Right
          </button>
        </web-tooltip>

        <!-- Bottom Left -->
        <web-tooltip content="Ajusto se ultrapassar a borda esquerda" position="left">
          <button style="position: absolute; bottom: 10px; left: 10px; padding: 0.5rem 1rem; background: #009ADA; color: white; border: none; border-radius: 0.375rem; cursor: pointer;">
            Bottom Left
          </button>
        </web-tooltip>

        <!-- Bottom Right -->
        <web-tooltip content="Tento aparecer em cima se não couber embaixo" position="bottom">
          <button style="position: absolute; bottom: 10px; right: 10px; padding: 0.5rem 1rem; background: #009ADA; color: white; border: none; border-radius: 0.375rem; cursor: pointer;">
            Bottom Right
          </button>
        </web-tooltip>

        <!-- Center -->
        <web-tooltip content="No centro funciono perfeitamente em qualquer direção!" position="top" variant="success">
          <button style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); padding: 0.75rem 1.5rem; background: #10b981; color: white; border: none; border-radius: 0.5rem; font-weight: 600; cursor: pointer;">
            Centro (Ideal)
          </button>
        </web-tooltip>
      </div>
    `
  })
};

// ========== COM ÍCONES ==========

export const WithIcons: Story = {
  name: 'Com Ícones Material',
  render: () => ({
    template: `
      <div style="padding: 3rem; display: flex; gap: 2rem; font-family: Montserrat; flex-wrap: wrap;">

        <web-tooltip content="Informação importante" icon="info" variant="info">
          <button class="demo-btn">Info Icon</button>
        </web-tooltip>

        <web-tooltip content="Operação concluída!" icon="check_circle" variant="success">
          <button class="demo-btn">Success Icon</button>
        </web-tooltip>

        <web-tooltip content="Atenção necessária" icon="warning" variant="warning">
          <button class="demo-btn">Warning Icon</button>
        </web-tooltip>

        <web-tooltip content="Erro encontrado" icon="error" variant="error">
          <button class="demo-btn">Error Icon</button>
        </web-tooltip>

        <web-tooltip content="Favoritar este item" icon="star" variant="default">
          <button class="demo-btn">Star Icon</button>
        </web-tooltip>

        <web-tooltip content="Download disponível" icon="download" variant="info">
          <button class="demo-btn">Download Icon</button>
        </web-tooltip>

        <web-tooltip content="Editar informações" icon="edit" variant="default">
          <button class="demo-btn">Edit Icon</button>
        </web-tooltip>

        <web-tooltip content="Deletar permanentemente" icon="delete" variant="error">
          <button class="demo-btn">Delete Icon</button>
        </web-tooltip>

      </div>

      <style>
        .demo-btn {
          padding: 0.75rem 1.5rem;
          background: #009ADA;
          color: white;
          border: none;
          border-radius: 0.5rem;
          font-family: Montserrat;
          font-weight: 600;
          cursor: pointer;
        }
        .demo-btn:hover {
          background: #0087c2;
        }
      </style>
    `
  })
};

export const IconPositions: Story = {
  name: 'Posição do Ícone',
  render: () => ({
    template: `
      <div style="padding: 3rem; display: flex; gap: 2rem; font-family: Montserrat;">

        <div style="text-align: center;">
          <p style="margin-bottom: 1rem; font-weight: 600;">Ícone à Esquerda</p>
          <web-tooltip
            content="Ícone à esquerda do texto"
            icon="info"
            iconPosition="left"
            variant="info">
            <button class="demo-btn">Left Icon</button>
          </web-tooltip>
        </div>

        <div style="text-align: center;">
          <p style="margin-bottom: 1rem; font-weight: 600;">Ícone à Direita</p>
          <web-tooltip
            content="Ícone à direita do texto"
            icon="arrow_forward"
            iconPosition="right"
            variant="success">
            <button class="demo-btn">Right Icon</button>
          </web-tooltip>
        </div>

      </div>

      <style>
        .demo-btn {
          padding: 0.75rem 1.5rem;
          background: #009ADA;
          color: white;
          border: none;
          border-radius: 0.5rem;
          font-family: Montserrat;
          font-weight: 600;
          cursor: pointer;
        }
      </style>
    `
  })
};

// ========== CORES CUSTOMIZADAS ==========

export const CustomColors: Story = {
  name: 'Cores Customizadas',
  render: () => ({
    template: `
      <div style="padding: 3rem; display: flex; gap: 2rem; font-family: Montserrat; flex-wrap: wrap;">

        <web-tooltip
          content="Tooltip roxo personalizado"
          icon="palette"
          customBgColor="#8b5cf6"
          customTextColor="#ffffff">
          <button style="background: #8b5cf6; padding: 0.75rem 1.5rem; color: white; border: none; border-radius: 0.5rem; font-weight: 600; cursor: pointer;">
            Roxo
          </button>
        </web-tooltip>

        <web-tooltip
          content="Tooltip rosa personalizado"
          icon="favorite"
          customBgColor="#ec4899"
          customTextColor="#ffffff">
          <button style="background: #ec4899; padding: 0.75rem 1.5rem; color: white; border: none; border-radius: 0.5rem; font-weight: 600; cursor: pointer;">
            Rosa
          </button>
        </web-tooltip>

        <web-tooltip
          content="Tooltip azul escuro"
          icon="nights_stay"
          customBgColor="#1e3a8a"
          customTextColor="#ffffff">
          <button style="background: #1e3a8a; padding: 0.75rem 1.5rem; color: white; border: none; border-radius: 0.5rem; font-weight: 600; cursor: pointer;">
            Azul Escuro
          </button>
        </web-tooltip>

        <web-tooltip
          content="Tooltip laranja vibrante"
          icon="local_fire_department"
          customBgColor="#ff6b35"
          customTextColor="#ffffff">
          <button style="background: #ff6b35; padding: 0.75rem 1.5rem; color: white; border: none; border-radius: 0.5rem; font-weight: 600; cursor: pointer;">
            Laranja
          </button>
        </web-tooltip>

        <web-tooltip
          content="Tooltip verde limão"
          icon="eco"
          customBgColor="#84cc16"
          customTextColor="#1f2937">
          <button style="background: #84cc16; padding: 0.75rem 1.5rem; color: #1f2937; border: none; border-radius: 0.5rem; font-weight: 600; cursor: pointer;">
            Verde Limão
          </button>
        </web-tooltip>

        <web-tooltip
          content="Tooltip ciano"
          icon="water_drop"
          customBgColor="#06b6d4"
          customTextColor="#ffffff">
          <button style="background: #06b6d4; padding: 0.75rem 1.5rem; color: white; border: none; border-radius: 0.5rem; font-weight: 600; cursor: pointer;">
            Ciano
          </button>
        </web-tooltip>

        <web-tooltip
          content="Tooltip gradiente simulado"
          icon="gradient"
          customBgColor="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
          customTextColor="#ffffff">
          <button style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 0.75rem 1.5rem; color: white; border: none; border-radius: 0.5rem; font-weight: 600; cursor: pointer;">
            Gradiente
          </button>
        </web-tooltip>

        <web-tooltip
          content="Tema escuro com texto claro"
          icon="dark_mode"
          customBgColor="#0a0a0a"
          customTextColor="#f5f5f5">
          <button style="background: #0a0a0a; padding: 0.75rem 1.5rem; color: white; border: none; border-radius: 0.5rem; font-weight: 600; cursor: pointer;">
            Dark Theme
          </button>
        </web-tooltip>

      </div>
    `
  })
};

export const BrandedTooltips: Story = {
  name: 'Tooltips da Marca',
  render: () => ({
    template: `
      <div style="padding: 3rem; display: flex; gap: 2rem; font-family: Montserrat;">

        <div style="text-align: center;">
          <p style="margin-bottom: 1rem; font-weight: 600;">web Blue</p>
          <web-tooltip
            content="Cor oficial da web"
            icon="school"
            customBgColor="#009ADA"
            customTextColor="#ffffff">
            <button style="background: #009ADA; padding: 0.75rem 1.5rem; color: white; border: none; border-radius: 0.5rem; font-weight: 600; cursor: pointer;">
              web
            </button>
          </web-tooltip>
        </div>

        <div style="text-align: center;">
          <p style="margin-bottom: 1rem; font-weight: 600;">Custom Brand 1</p>
          <web-tooltip
            content="Sua marca aqui"
            icon="business"
            customBgColor="#6366f1"
            customTextColor="#ffffff">
            <button style="background: #6366f1; padding: 0.75rem 1.5rem; color: white; border: none; border-radius: 0.5rem; font-weight: 600; cursor: pointer;">
              Brand 1
            </button>
          </web-tooltip>
        </div>

        <div style="text-align: center;">
          <p style="margin-bottom: 1rem; font-weight: 600;">Custom Brand 2</p>
          <web-tooltip
            content="Sua marca aqui"
            icon="storefront"
            customBgColor="#f97316"
            customTextColor="#ffffff">
            <button style="background: #f97316; padding: 0.75rem 1.5rem; color: white; border: none; border-radius: 0.5rem; font-weight: 600; cursor: pointer;">
              Brand 2
            </button>
          </web-tooltip>
        </div>

      </div>
    `
  })
};

export const IconsShowcase: Story = {
  name: 'Galeria de Ícones',
  render: () => ({
    template: `
      <div style="padding: 3rem; font-family: Montserrat;">
        <h3 style="margin-bottom: 2rem;">Ícones Comuns do Material Symbols</h3>

        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 1rem;">

          <web-tooltip content="Informação" icon="info" variant="info">
            <div class="icon-card">info</div>
          </web-tooltip>

          <web-tooltip content="Check" icon="check_circle" variant="success">
            <div class="icon-card">check_circle</div>
          </web-tooltip>

          <web-tooltip content="Aviso" icon="warning" variant="warning">
            <div class="icon-card">warning</div>
          </web-tooltip>

          <web-tooltip content="Erro" icon="error" variant="error">
            <div class="icon-card">error</div>
          </web-tooltip>

          <web-tooltip content="Ajuda" icon="help" variant="info">
            <div class="icon-card">help</div>
          </web-tooltip>

          <web-tooltip content="Configurações" icon="settings" variant="default">
            <div class="icon-card">settings</div>
          </web-tooltip>

          <web-tooltip content="Buscar" icon="search" variant="default">
            <div class="icon-card">search</div>
          </web-tooltip>

          <web-tooltip content="Notificação" icon="notifications" variant="warning">
            <div class="icon-card">notifications</div>
          </web-tooltip>

          <web-tooltip content="Favorito" icon="favorite" variant="error">
            <div class="icon-card">favorite</div>
          </web-tooltip>

          <web-tooltip content="Estrela" icon="star" variant="warning">
            <div class="icon-card">star</div>
          </web-tooltip>

          <web-tooltip content="Home" icon="home" variant="default">
            <div class="icon-card">home</div>
          </web-tooltip>

          <web-tooltip content="Usuário" icon="person" variant="info">
            <div class="icon-card">person</div>
          </web-tooltip>

          <web-tooltip content="Email" icon="email" variant="info">
            <div class="icon-card">email</div>
          </web-tooltip>

          <web-tooltip content="Telefone" icon="phone" variant="success">
            <div class="icon-card">phone</div>
          </web-tooltip>

          <web-tooltip content="Localização" icon="location_on" variant="error">
            <div class="icon-card">location_on</div>
          </web-tooltip>

          <web-tooltip content="Download" icon="download" variant="success">
            <div class="icon-card">download</div>
          </web-tooltip>

          <web-tooltip content="Upload" icon="upload" variant="info">
            <div class="icon-card">upload</div>
          </web-tooltip>

          <web-tooltip content="Compartilhar" icon="share" variant="info">
            <div class="icon-card">share</div>
          </web-tooltip>

          <web-tooltip content="Editar" icon="edit" variant="default">
            <div class="icon-card">edit</div>
          </web-tooltip>

          <web-tooltip content="Deletar" icon="delete" variant="error">
            <div class="icon-card">delete</div>
          </web-tooltip>

        </div>
      </div>

      <style>
        .icon-card {
          padding: 1rem;
          background: white;
          border: 2px solid #e5e7eb;
          border-radius: 0.5rem;
          text-align: center;
          font-size: 0.75rem;
          cursor: pointer;
          transition: all 0.2s;
        }
        .icon-card:hover {
          border-color: #009ADA;
          background: #f0f9ff;
        }
      </style>
    `
  })
};
