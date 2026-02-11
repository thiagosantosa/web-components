import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { ContainerComponent } from './container.component';
import { RowComponent } from './row.component';
import { ColComponent } from './col.component';

const meta: Meta = {
  title: 'Layout/Grid System',
  decorators: [
    moduleMetadata({
      imports: [ContainerComponent, RowComponent, ColComponent],
    }),
  ],
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
 1️⃣ INSTALAÇÃO
--------------
\`\`\`bash
npm install @web/ui-components
\`\`\`

2️⃣ IMPORT NO SEU COMPONENTE
----------------------------
⚠️ O Grid System usa 3 componentes: Container, Row e Col

\`\`\`ts
import { ContainerComponent, RowComponent, ColComponent } from '@web/ui-components';

@Component({
  selector: 'app-meu-componente',
  standalone: true,
  imports: [
    ContainerComponent,
    RowComponent,
    ColComponent
  ],
  template: \`
    <web-container>
      <web-row>
        <web-col [col]="6">Coluna 1</web-col>
        <web-col [col]="6">Coluna 2</web-col>
      </web-row>
    </web-container>
  \`
})
export class MeuComponente {}
\`\`\`

3️⃣ USO NO TEMPLATE
-------------------

### Layout Básico (2 colunas)
\`\`\`html
<web-container>
  <web-row>
    <web-col [col]="6">
      <div>Conteúdo 50%</div>
    </web-col>
    <web-col [col]="6">
      <div>Conteúdo 50%</div>
    </web-col>
  </web-row>
</web-container>
\`\`\`

### Layout Responsivo (Mobile First)
\`\`\`html
<web-container>
  <web-row>
    <web-col 
      [col]="12"
      [md]="6"
      [lg]="4">
      <div>Card 1</div>
    </web-col>

    <web-col [col]="12" [md]="6" [lg]="4">
      <div>Card 2</div>
    </web-col>

    <web-col [col]="12" [md]="6" [lg]="4">
      <div>Card 3</div>
    </web-col>
  </web-row>
</web-container>
\`\`\`

### Dashboard Layout
\`\`\`html
<web-container type="fluid">
  <web-row [gap]="3">

    <!-- Sidebar -->
    <web-col [col]="12" [lg]="3">
      <div>Sidebar</div>
    </web-col>

    <!-- Main Content -->
    <web-col [col]="12" [lg]="9">
      <div>Conteúdo Principal</div>
    </web-col>

  </web-row>
</web-container>
\`\`\`

4️⃣ PROPRIEDADES PRINCIPAIS
---------------------------

### CONTAINER
- type: 'fixed' | 'fluid' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
- padding: 'none' | 'sm' | 'md' | 'lg' | 'xl'

### ROW
- gap: 0 | 1 | 2 | 3 | 4 | 5
- justify: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
- align: 'start' | 'center' | 'end' | 'stretch' | 'baseline'

### COL
- col: 1-12 | 'auto' | 'equal'
- sm, md, lg, xl, xxl: 1-12 | 'auto' | 'equal'
- offset: 0-11
- order: number | 'first' | 'last'

5️⃣ BREAKPOINTS
---------------
- XS (Mobile): < 576px
- SM (Tablet): ≥ 576px
- MD (Tablet): ≥ 768px
- LG (Desktop): ≥ 992px
- XL (Desktop): ≥ 1200px
- 2XL (Wide): ≥ 1400px

6️⃣ PARA COMPONENTES NÃO-STANDALONE (NgModule)
----------------------------------------------
\`\`\`ts
import { ContainerComponent, RowComponent, ColComponent } from '@web/ui-components';

@NgModule({
  declarations: [MeuComponente],
  imports: [
    ContainerComponent,
    RowComponent,
    ColComponent
  ]
})
export class MeuModule {}
\`\`\`

💡 DICA: Veja os exemplos abaixo para conhecer todas as variações disponíveis!
        `
      }
    }
  },
};

export default meta;
type Story = StoryObj;

// Helper styles
const colStyle = 'background: #e7f3ff; border: 1px solid #009ADA; padding: 1rem; text-align: center; font-family: Montserrat; border-radius: 0.375rem;';
const colStyle2 = 'background: #fff3cd; border: 1px solid #ffc107; padding: 1rem; text-align: center; font-family: Montserrat; border-radius: 0.375rem;';

// ========== CONTAINERS ==========

export const ContainerTypes: Story = {
  name: 'Tipos de Container',
  render: () => ({
    template: `
      <div style="font-family: Montserrat;">
        <h3>Container Fixed (Responsivo)</h3>
        <web-container type="fixed" style="background: #f8f9fa; padding: 1rem;">
          <div style="${colStyle}">Container com max-width responsivo</div>
        </web-container>
        
        <h3 style="margin-top: 2rem;">Container Fluid (100%)</h3>
        <web-container type="fluid" style="background: #f8f9fa; padding: 1rem;">
          <div style="${colStyle}">Container com largura total</div>
        </web-container>
        
        <h3 style="margin-top: 2rem;">Container SM (640px)</h3>
        <web-container type="sm" style="background: #f8f9fa; padding: 1rem;">
          <div style="${colStyle}">Container pequeno</div>
        </web-container>
        
        <h3 style="margin-top: 2rem;">Container MD (768px)</h3>
        <web-container type="md" style="background: #f8f9fa; padding: 1rem;">
          <div style="${colStyle}">Container médio</div>
        </web-container>
        
        <h3 style="margin-top: 2rem;">Container LG (1024px)</h3>
        <web-container type="lg" style="background: #f8f9fa; padding: 1rem;">
          <div style="${colStyle}">Container grande</div>
        </web-container>
      </div>
    `
  })
};

// ========== BASIC GRID ==========

export const BasicGrid: Story = {
  name: 'Grid Básico (12 colunas)',
  render: () => ({
    template: `
      <web-container type="fluid">
        <web-row>
          <web-col [col]="12"><div style="${colStyle}">col-12</div></web-col>
        </web-row>
        
        <web-row style="margin-top: 1rem;">
          <web-col [col]="6"><div style="${colStyle}">col-6</div></web-col>
          <web-col [col]="6"><div style="${colStyle2}">col-6</div></web-col>
        </web-row>
        
        <web-row style="margin-top: 1rem;">
          <web-col [col]="4"><div style="${colStyle}">col-4</div></web-col>
          <web-col [col]="4"><div style="${colStyle2}">col-4</div></web-col>
          <web-col [col]="4"><div style="${colStyle}">col-4</div></web-col>
        </web-row>
        
        <web-row style="margin-top: 1rem;">
          <web-col [col]="3"><div style="${colStyle}">col-3</div></web-col>
          <web-col [col]="3"><div style="${colStyle2}">col-3</div></web-col>
          <web-col [col]="3"><div style="${colStyle}">col-3</div></web-col>
          <web-col [col]="3"><div style="${colStyle2}">col-3</div></web-col>
        </web-row>
        
        <web-row style="margin-top: 1rem;">
          <web-col [col]="2"><div style="${colStyle}">2</div></web-col>
          <web-col [col]="2"><div style="${colStyle2}">2</div></web-col>
          <web-col [col]="2"><div style="${colStyle}">2</div></web-col>
          <web-col [col]="2"><div style="${colStyle2}">2</div></web-col>
          <web-col [col]="2"><div style="${colStyle}">2</div></web-col>
          <web-col [col]="2"><div style="${colStyle2}">2</div></web-col>
        </web-row>
      </web-container>
    `
  })
};

export const EqualColumns: Story = {
  name: 'Colunas Iguais (Auto)',
  render: () => ({
    template: `
      <web-container>
        <web-row>
          <web-col><div style="${colStyle}">Auto</div></web-col>
          <web-col><div style="${colStyle2}">Auto</div></web-col>
        </web-row>
        
        <web-row style="margin-top: 1rem;">
          <web-col><div style="${colStyle}">Auto</div></web-col>
          <web-col><div style="${colStyle2}">Auto</div></web-col>
          <web-col><div style="${colStyle}">Auto</div></web-col>
        </web-row>
        
        <web-row style="margin-top: 1rem;">
          <web-col><div style="${colStyle}">1</div></web-col>
          <web-col><div style="${colStyle2}">2</div></web-col>
          <web-col><div style="${colStyle}">3</div></web-col>
          <web-col><div style="${colStyle2}">4</div></web-col>
        </web-row>
      </web-container>
    `
  })
};

// ========== RESPONSIVE ==========

export const ResponsiveGrid: Story = {
  name: 'Grid Responsivo',
  render: () => ({
    template: `
      <web-container>
        <div style="font-family: Montserrat; margin-bottom: 1rem;">
          <p>Redimensione a janela para ver o comportamento responsivo!</p>
          <p><strong>Mobile:</strong> 12 colunas | <strong>Tablet:</strong> 6 colunas | <strong>Desktop:</strong> 4 colunas</p>
        </div>
        
        <web-row>
          <web-col [col]="12" [md]="6" [lg]="4">
            <div style="${colStyle}">col-12 md-6 lg-4</div>
          </web-col>
          <web-col [col]="12" [md]="6" [lg]="4">
            <div style="${colStyle2}">col-12 md-6 lg-4</div>
          </web-col>
          <web-col [col]="12" [md]="6" [lg]="4">
            <div style="${colStyle}">col-12 md-6 lg-4</div>
          </web-col>
          <web-col [col]="12" [md]="6" [lg]="4">
            <div style="${colStyle2}">col-12 md-6 lg-4</div>
          </web-col>
          <web-col [col]="12" [md]="6" [lg]="4">
            <div style="${colStyle}">col-12 md-6 lg-4</div>
          </web-col>
          <web-col [col]="12" [md]="6" [lg]="4">
            <div style="${colStyle2}">col-12 md-6 lg-4</div>
          </web-col>
        </web-row>
      </web-container>
    `
  })
};

export const MixedSizes: Story = {
  name: 'Tamanhos Mistos',
  render: () => ({
    template: `
      <web-container>
        <web-row>
          <web-col [col]="8"><div style="${colStyle}">col-8</div></web-col>
          <web-col [col]="4"><div style="${colStyle2}">col-4</div></web-col>
        </web-row>
        
        <web-row style="margin-top: 1rem;">
          <web-col [col]="3"><div style="${colStyle}">col-3</div></web-col>
          <web-col [col]="9"><div style="${colStyle2}">col-9</div></web-col>
        </web-row>
        
        <web-row style="margin-top: 1rem;">
          <web-col [col]="5"><div style="${colStyle}">col-5</div></web-col>
          <web-col [col]="7"><div style="${colStyle2}">col-7</div></web-col>
        </web-row>
      </web-container>
    `
  })
};

// ========== ALIGNMENT ==========

export const HorizontalAlignment: Story = {
  name: 'Alinhamento Horizontal',
  render: () => ({
    template: `
      <web-container>
        <div style="font-family: Montserrat; margin-bottom: 1rem;"><strong>Justify Start</strong></div>
        <web-row justify="start" style="background: #f8f9fa; padding: 1rem; border-radius: 0.375rem;">
          <web-col [col]="4"><div style="${colStyle}">col-4</div></web-col>
          <web-col [col]="4"><div style="${colStyle2}">col-4</div></web-col>
        </web-row>
        
        <div style="font-family: Montserrat; margin: 2rem 0 1rem 0;"><strong>Justify Center</strong></div>
        <web-row justify="center" style="background: #f8f9fa; padding: 1rem; border-radius: 0.375rem;">
          <web-col [col]="4"><div style="${colStyle}">col-4</div></web-col>
          <web-col [col]="4"><div style="${colStyle2}">col-4</div></web-col>
        </web-row>
        
        <div style="font-family: Montserrat; margin: 2rem 0 1rem 0;"><strong>Justify End</strong></div>
        <web-row justify="end" style="background: #f8f9fa; padding: 1rem; border-radius: 0.375rem;">
          <web-col [col]="4"><div style="${colStyle}">col-4</div></web-col>
          <web-col [col]="4"><div style="${colStyle2}">col-4</div></web-col>
        </web-row>
        
        <div style="font-family: Montserrat; margin: 2rem 0 1rem 0;"><strong>Justify Between</strong></div>
        <web-row justify="between" style="background: #f8f9fa; padding: 1rem; border-radius: 0.375rem;">
          <web-col [col]="4"><div style="${colStyle}">col-4</div></web-col>
          <web-col [col]="4"><div style="${colStyle2}">col-4</div></web-col>
        </web-row>
        
        <div style="font-family: Montserrat; margin: 2rem 0 1rem 0;"><strong>Justify Around</strong></div>
        <web-row justify="around" style="background: #f8f9fa; padding: 1rem; border-radius: 0.375rem;">
          <web-col [col]="4"><div style="${colStyle}">col-4</div></web-col>
          <web-col [col]="4"><div style="${colStyle2}">col-4</div></web-col>
        </web-row>
      </web-container>
    `
  })
};

export const VerticalAlignment: Story = {
  name: 'Alinhamento Vertical',
  render: () => ({
    template: `
      <web-container>
        <div style="font-family: Montserrat; margin-bottom: 1rem;"><strong>Align Start</strong></div>
        <web-row align="start" style="background: #f8f9fa; padding: 1rem; border-radius: 0.375rem; min-height: 150px;">
          <web-col [col]="4"><div style="${colStyle}">col-4</div></web-col>
          <web-col [col]="4"><div style="${colStyle2}; min-height: 80px;">col-4<br>Mais conteúdo</div></web-col>
          <web-col [col]="4"><div style="${colStyle}">col-4</div></web-col>
        </web-row>
        
        <div style="font-family: Montserrat; margin: 2rem 0 1rem 0;"><strong>Align Center</strong></div>
        <web-row align="center" style="background: #f8f9fa; padding: 1rem; border-radius: 0.375rem; min-height: 150px;">
          <web-col [col]="4"><div style="${colStyle}">col-4</div></web-col>
          <web-col [col]="4"><div style="${colStyle2}; min-height: 80px;">col-4<br>Mais conteúdo</div></web-col>
          <web-col [col]="4"><div style="${colStyle}">col-4</div></web-col>
        </web-row>
        
        <div style="font-family: Montserrat; margin: 2rem 0 1rem 0;"><strong>Align End</strong></div>
        <web-row align="end" style="background: #f8f9fa; padding: 1rem; border-radius: 0.375rem; min-height: 150px;">
          <web-col [col]="4"><div style="${colStyle}">col-4</div></web-col>
          <web-col [col]="4"><div style="${colStyle2}; min-height: 80px;">col-4<br>Mais conteúdo</div></web-col>
          <web-col [col]="4"><div style="${colStyle}">col-4</div></web-col>
        </web-row>
      </web-container>
    `
  })
};

// ========== OFFSET ==========

export const OffsetColumns: Story = {
  name: 'Offset de Colunas',
  render: () => ({
    template: `
      <web-container>
        <web-row>
          <web-col [col]="4" [offset]="4">
            <div style="${colStyle}">col-4 offset-4</div>
          </web-col>
        </web-row>
        
        <web-row style="margin-top: 1rem;">
          <web-col [col]="3" [offset]="3">
            <div style="${colStyle}">col-3 offset-3</div>
          </web-col>
          <web-col [col]="3" [offset]="3">
            <div style="${colStyle2}">col-3 offset-3</div>
          </web-col>
        </web-row>
        
        <web-row style="margin-top: 1rem;">
          <web-col [col]="6" [offset]="3">
            <div style="${colStyle}">col-6 offset-3</div>
          </web-col>
        </web-row>
      </web-container>
    `
  })
};

// ========== GAP ==========

export const GridGap: Story = {
  name: 'Espaçamento (Gap)',
  render: () => ({
    template: `
      <web-container>
        <div style="font-family: Montserrat; margin-bottom: 1rem;"><strong>Gap 0</strong></div>
        <web-row [gap]="0">
          <web-col [col]="4"><div style="${colStyle}">col-4</div></web-col>
          <web-col [col]="4"><div style="${colStyle2}">col-4</div></web-col>
          <web-col [col]="4"><div style="${colStyle}">col-4</div></web-col>
        </web-row>
        
        <div style="font-family: Montserrat; margin: 2rem 0 1rem 0;"><strong>Gap 2 (Padrão)</strong></div>
        <web-row [gap]="2">
          <web-col [col]="4"><div style="${colStyle}">col-4</div></web-col>
          <web-col [col]="4"><div style="${colStyle2}">col-4</div></web-col>
          <web-col [col]="4"><div style="${colStyle}">col-4</div></web-col>
        </web-row>
        
        <div style="font-family: Montserrat; margin: 2rem 0 1rem 0;"><strong>Gap 5 (Grande)</strong></div>
        <web-row [gap]="5">
          <web-col [col]="4"><div style="${colStyle}">col-4</div></web-col>
          <web-col [col]="4"><div style="${colStyle2}">col-4</div></web-col>
          <web-col [col]="4"><div style="${colStyle}">col-4</div></web-col>
        </web-row>
        
        <div style="font-family: Montserrat; margin: 2rem 0 1rem 0;"><strong>Row Gap e Col Gap separados</strong></div>
        <web-row [rowGap]="5" [colGap]="2">
          <web-col [col]="4"><div style="${colStyle}">col-4</div></web-col>
          <web-col [col]="4"><div style="${colStyle2}">col-4</div></web-col>
          <web-col [col]="4"><div style="${colStyle}">col-4</div></web-col>
          <web-col [col]="4"><div style="${colStyle}">col-4</div></web-col>
          <web-col [col]="4"><div style="${colStyle2}">col-4</div></web-col>
          <web-col [col]="4"><div style="${colStyle}">col-4</div></web-col>
        </web-row>
      </web-container>
    `
  })
};

// ========== ORDER ==========

export const ColumnOrder: Story = {
  name: 'Ordem das Colunas',
  render: () => ({
    template: `
      <web-container>
        <div style="font-family: Montserrat; margin-bottom: 1rem;">
          <strong>Ordem Visual Diferente da Ordem no HTML</strong>
        </div>
        <web-row>
          <web-col [col]="4" [order]="3">
            <div style="${colStyle}">Primeiro no HTML (order: 3)</div>
          </web-col>
          <web-col [col]="4" [order]="1">
            <div style="${colStyle2}">Segundo no HTML (order: 1)</div>
          </web-col>
          <web-col [col]="4" [order]="2">
            <div style="${colStyle}">Terceiro no HTML (order: 2)</div>
          </web-col>
        </web-row>
      </web-container>
    `
  })
};

// ========== USE CASES ==========

export const DashboardLayout: Story = {
  name: 'Layout de Dashboard',
  render: () => ({
    template: `
      <web-container type="fluid">
        <web-row [gap]="3">
          <!-- Sidebar -->
          <web-col [col]="12" [lg]="3">
            <div style="background: #343a40; color: white; padding: 2rem; border-radius: 0.5rem; min-height: 500px; font-family: Montserrat;">
              <h3>Menu</h3>
              <ul style="list-style: none; padding: 0;">
                <li style="margin: 1rem 0;">Dashboard</li>
                <li style="margin: 1rem 0;">Usuários</li>
                <li style="margin: 1rem 0;">Relatórios</li>
                <li style="margin: 1rem 0;">Configurações</li>
              </ul>
            </div>
          </web-col>
          
          <!-- Main Content -->
          <web-col [col]="12" [lg]="9">
            <web-row [gap]="3">
              <web-col [col]="12" [md]="6" [lg]="3">
                <div style="${colStyle}; min-height: 120px;">
                  <h4>Card 1</h4>
                  <p>Valor: 1.234</p>
                </div>
              </web-col>
              <web-col [col]="12" [md]="6" [lg]="3">
                <div style="${colStyle2}; min-height: 120px;">
                  <h4>Card 2</h4>
                  <p>Valor: 5.678</p>
                </div>
              </web-col>
              <web-col [col]="12" [md]="6" [lg]="3">
                <div style="${colStyle}; min-height: 120px;">
                  <h4>Card 3</h4>
                  <p>Valor: 9.012</p>
                </div>
              </web-col>
              <web-col [col]="12" [md]="6" [lg]="3">
                <div style="${colStyle2}; min-height: 120px;">
                  <h4>Card 4</h4>
                  <p>Valor: 3.456</p>
                </div>
              </web-col>
              
              <web-col [col]="12">
                <div style="${colStyle}; min-height: 300px;">
                  <h4>Gráfico Principal</h4>
                </div>
              </web-col>
            </web-row>
          </web-col>
        </web-row>
      </web-container>
    `
  })
};

export const BlogLayout: Story = {
  name: 'Layout de Blog',
  render: () => ({
    template: `
      <web-container>
        <web-row [gap]="4">
          <!-- Main Content -->
          <web-col [col]="12" [lg]="8">
            <div style="${colStyle}; text-align: left; min-height: 400px;">
              <h2 style="margin-top: 0;">Título do Post</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
            </div>
          </web-col>
          
          <!-- Sidebar -->
          <web-col [col]="12" [lg]="4">
            <div style="${colStyle2}; text-align: left; min-height: 200px; margin-bottom: 1rem;">
              <h3 style="margin-top: 0;">Sobre</h3>
              <p>Informações do autor...</p>
            </div>
            <div style="${colStyle2}; text-align: left; min-height: 200px;">
              <h3 style="margin-top: 0;">Posts Recentes</h3>
              <ul>
                <li>Post 1</li>
                <li>Post 2</li>
                <li>Post 3</li>
              </ul>
            </div>
          </web-col>
        </web-row>
      </web-container>
    `
  })
};

export const PricingTable: Story = {
  name: 'Tabela de Preços',
  render: () => ({
    template: `
      <web-container>
        <web-row [gap]="3" justify="center">
          <web-col [col]="12" [md]="6" [lg]="4">
            <div style="${colStyle}; min-height: 400px;">
              <h3>Básico</h3>
              <h2>R$ 29/mês</h2>
              <ul style="text-align: left;">
                <li>Feature 1</li>
                <li>Feature 2</li>
                <li>Feature 3</li>
              </ul>
            </div>
          </web-col>
          <web-col [col]="12" [md]="6" [lg]="4">
            <div style="${colStyle2}; min-height: 400px;">
              <h3>Pro</h3>
              <h2>R$ 59/mês</h2>
              <ul style="text-align: left;">
                <li>Feature 1</li>
                <li>Feature 2</li>
                <li>Feature 3</li>
                <li>Feature 4</li>
              </ul>
            </div>
          </web-col>
          <web-col [col]="12" [md]="6" [lg]="4">
            <div style="${colStyle}; min-height: 400px;">
              <h3>Enterprise</h3>
              <h2>R$ 99/mês</h2>
              <ul style="text-align: left;">
                <li>Feature 1</li>
                <li>Feature 2</li>
                <li>Feature 3</li>
                <li>Feature 4</li>
                <li>Feature 5</li>
              </ul>
            </div>
          </web-col>
        </web-row>
      </web-container>
    `
  })
};

export const CompleteExample: Story = {
  name: 'Exemplo Completo',
  render: () => ({
    template: `
      <div style="font-family: Montserrat;">
        <h2 style="text-align: center; margin-bottom: 2rem;">Sistema de Grid web</h2>
        
        <web-container type="lg">
          <!-- Header -->
          <web-row [gap]="0" style="background: #343a40; color: white; padding: 1rem; margin-bottom: 2rem; border-radius: 0.5rem;">
            <web-col [col]="6" [md]="3">
              <div style="padding: 0.5rem;">Logo</div>
            </web-col>
            <web-col [col]="6" [md]="9" style="text-align: right;">
              <div style="padding: 0.5rem;">Menu | Sobre | Contato</div>
            </web-col>
          </web-row>
          
          <!-- Hero -->
          <web-row [gap]="4" align="center" style="min-height: 300px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 3rem 1rem; margin-bottom: 2rem; border-radius: 0.5rem;">
            <web-col [col]="12" [lg]="6">
              <h1>Título Principal</h1>
              <p>Descrição do produto ou serviço</p>
            </web-col>
            <web-col [col]="12" [lg]="6" style="text-align: center;">
              <div style="background: rgba(255,255,255,0.2); padding: 2rem; border-radius: 0.5rem;">Imagem</div>
            </web-col>
          </web-row>
          
          <!-- Features -->
          <web-row [gap]="3" style="margin-bottom: 2rem;">
            <web-col [col]="12" [md]="6" [lg]="3">
              <div style="${colStyle}; min-height: 200px;">
                <h3>Feature 1</h3>
                <p>Descrição</p>
              </div>
            </web-col>
            <web-col [col]="12" [md]="6" [lg]="3">
              <div style="${colStyle2}; min-height: 200px;">
                <h3>Feature 2</h3>
                <p>Descrição</p>
              </div>
            </web-col>
            <web-col [col]="12" [md]="6" [lg]="3">
              <div style="${colStyle}; min-height: 200px;">
                <h3>Feature 3</h3>
                <p>Descrição</p>
              </div>
            </web-col>
            <web-col [col]="12" [md]="6" [lg]="3">
              <div style="${colStyle2}; min-height: 200px;">
                <h3>Feature 4</h3>
                <p>Descrição</p>
              </div>
            </web-col>
          </web-row>
          
          <!-- Footer -->
          <web-row [gap]="0" style="background: #343a40; color: white; padding: 2rem 1rem; border-radius: 0.5rem;">
            <web-col [col]="12" [md]="4">
              <h4>Empresa</h4>
              <p>Sobre nós</p>
            </web-col>
            <web-col [col]="12" [md]="4">
              <h4>Links</h4>
              <p>Produtos | Serviços</p>
            </web-col>
            <web-col [col]="12" [md]="4">
              <h4>Contato</h4>
              <p>contato@web.com</p>
            </web-col>
          </web-row>
        </web-container>
      </div>
    `
  })
};