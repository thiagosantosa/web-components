import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { TabsComponent, TabComponent } from './tabs.component';

const meta: Meta<TabsComponent> = {
  title: 'Layout/Tabs',
  component: TabsComponent,
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
⚠️ O Tabs é composto por dois componentes: Tabs e Tab

\`\`\`ts
import { TabsComponent, TabComponent } from '@web/ui-components';

@Component({
  selector: 'app-meu-componente',
  standalone: true,
  imports: [
    TabsComponent,
    TabComponent
  ],
  template: \`
    <web-tabs>
      <web-tab label="Aba 1">
        Conteúdo da Aba 1
      </web-tab>

      <web-tab label="Aba 2">
        Conteúdo da Aba 2
      </web-tab>
    </web-tabs>
  \`
})
export class MeuComponente {}
\`\`\`

3️⃣ USO NO TEMPLATE
-------------------

### Exemplo Básico
\`\`\`html
<web-tabs>
  <web-tab label="Dados Gerais">
    <p>Conteúdo da aba Dados Gerais</p>
  </web-tab>

  <web-tab label="Endereço">
    <p>Conteúdo da aba Endereço</p>
  </web-tab>

  <web-tab label="Configurações">
    <p>Conteúdo da aba Configurações</p>
  </web-tab>
</web-tabs>
\`\`\`

4️⃣ DEFININDO ABA ATIVA (VALOR INICIAL)
---------------------------------------

\`\`\`html
<web-tabs [activeIndex]="1">
  <web-tab label="Aba 1">Conteúdo 1</web-tab>
  <web-tab label="Aba 2">Conteúdo 2</web-tab>
  <web-tab label="Aba 3">Conteúdo 3</web-tab>
</web-tabs>
\`\`\`

\`\`\`ts
activeIndex = 1; // Segunda aba ativa
\`\`\`

5️⃣ OUVINDO MUDANÇA DE ABA
--------------------------

\`\`\`html
<web-tabs (tabChange)="onTabChange($event)">
  <web-tab label="Perfil">Perfil</web-tab>
  <web-tab label="Segurança">Segurança</web-tab>
</web-tabs>
\`\`\`

\`\`\`ts
onTabChange(index: number) {
  console.log('Aba selecionada:', index);
}
\`\`\`

6️⃣ DESABILITANDO ABAS
----------------------

\`\`\`html
<web-tabs>
  <web-tab label="Ativa">
    Conteúdo disponível
  </web-tab>

  <web-tab label="Bloqueada" [disabled]="true">
    Conteúdo indisponível
  </web-tab>
</web-tabs>
\`\`\`

7️⃣ USO COM FORMULÁRIOS (CASO COMUM)
------------------------------------

\`\`\`html
<web-tabs>
  <web-tab label="Dados Pessoais">
    <app-dados-pessoais></app-dados-pessoais>
  </web-tab>

  <web-tab label="Endereço">
    <app-endereco></app-endereco>
  </web-tab>

  <web-tab label="Pagamento">
    <app-pagamento></app-pagamento>
  </web-tab>
</web-tabs>
\`\`\`

💡 Ideal para separar formulários longos em etapas visuais.

8️⃣ PROPRIEDADES PRINCIPAIS
---------------------------

### Tabs
- activeIndex: number
- align: 'start' | 'center' | 'end'
- variant: 'default' | 'underline' | 'card'
- size: 'sm' | 'md' | 'lg'

### Tab
- label: string
- disabled: boolean
- icon: string (opcional)

9️⃣ PARA COMPONENTES NÃO-STANDALONE (NgModule)
----------------------------------------------
\`\`\`ts
import { TabsComponent, TabComponent } from '@web/ui-components';

@NgModule({
  declarations: [MeuComponente],
  imports: [
    TabsComponent,
    TabComponent
  ]
})
export class MeuModule {}
\`\`\`

❌ ERRO COMUM
--------------
❌ Usar conteúdo fora do <web-tab>  
✅ Todo conteúdo deve estar dentro de uma aba

💡 DICA: Use Tabs para melhorar organização visual e experiência do usuário!
        `
      }
    }
  },
  decorators: [
    moduleMetadata({
      imports: [TabsComponent, TabComponent],
    }),
  ],
};

export default meta;
type Story = StoryObj<TabsComponent>;

// ========== BASIC ==========

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <web-tabs>
        <web-tab id="tab1" label="Visão Geral">
          <div style="padding: 1rem;">
            <h3>Visão Geral</h3>
            <p>Conteúdo da aba de visão geral. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
        </web-tab>
        <web-tab id="tab2" label="Detalhes">
          <div style="padding: 1rem;">
            <h3>Detalhes</h3>
            <p>Informações detalhadas sobre o item selecionado.</p>
          </div>
        </web-tab>
        <web-tab id="tab3" label="Configurações">
          <div style="padding: 1rem;">
            <h3>Configurações</h3>
            <p>Ajuste suas preferências e configurações.</p>
          </div>
        </web-tab>
      </web-tabs>
    `
  })
};

export const WithIcons: Story = {
  name: 'Com Ícones',
  render: () => ({
    template: `
      <web-tabs>
        <web-tab id="home" label="Início" icon="home">
          <div style="padding: 1rem;">
            <h3>🏠 Página Inicial</h3>
            <p>Bem-vindo à página inicial do sistema.</p>
          </div>
        </web-tab>
        <web-tab id="profile" label="Perfil" icon="person">
          <div style="padding: 1rem;">
            <h3>👤 Perfil do Usuário</h3>
            <p>Gerencie suas informações pessoais.</p>
          </div>
        </web-tab>
        <web-tab id="settings" label="Configurações" icon="settings">
          <div style="padding: 1rem;">
            <h3>⚙️ Configurações</h3>
            <p>Personalize o sistema de acordo com suas preferências.</p>
          </div>
        </web-tab>
        <web-tab id="notifications" label="Notificações" icon="notifications">
          <div style="padding: 1rem;">
            <h3>🔔 Central de Notificações</h3>
            <p>Veja todas as suas notificações.</p>
          </div>
        </web-tab>
      </web-tabs>
    `
  })
};

export const WithBadges: Story = {
  name: 'Com Badges',
  render: () => ({
    template: `
      <web-tabs>
        <web-tab id="all" label="Todos" icon="inbox">
          <div style="padding: 1rem;">
            <h3>Todas as Mensagens</h3>
            <p>Veja todas as mensagens recebidas.</p>
          </div>
        </web-tab>
        <web-tab id="unread" label="Não Lidas" icon="mail" badge="5">
          <div style="padding: 1rem;">
            <h3>Mensagens Não Lidas</h3>
            <p>Você tem 5 mensagens não lidas.</p>
          </div>
        </web-tab>
        <web-tab id="starred" label="Favoritas" icon="star" badge="12">
          <div style="padding: 1rem;">
            <h3>Mensagens Favoritas</h3>
            <p>12 mensagens marcadas como favoritas.</p>
          </div>
        </web-tab>
        <web-tab id="archived" label="Arquivadas" icon="archive">
          <div style="padding: 1rem;">
            <h3>Mensagens Arquivadas</h3>
            <p>Mensagens antigas arquivadas.</p>
          </div>
        </web-tab>
      </web-tabs>
    `
  })
};

export const WithDisabled: Story = {
  name: 'Com Aba Desabilitada',
  render: () => ({
    template: `
      <web-tabs>
        <web-tab id="available" label="Disponível" icon="check_circle">
          <div style="padding: 1rem;">
            <h3>Recurso Disponível</h3>
            <p>Este recurso está disponível para uso.</p>
          </div>
        </web-tab>
        <web-tab id="locked" label="Bloqueado" icon="lock" [disabled]="true">
          <div style="padding: 1rem;">
            <h3>Recurso Bloqueado</h3>
            <p>Faça upgrade para desbloquear.</p>
          </div>
        </web-tab>
        <web-tab id="coming" label="Em Breve" icon="schedule" [disabled]="true">
          <div style="padding: 1rem;">
            <h3>Em Breve</h3>
            <p>Este recurso estará disponível em breve.</p>
          </div>
        </web-tab>
      </web-tabs>
    `
  })
};

// ========== VARIANTS ==========

export const Pills: Story = {
  render: () => ({
    template: `
      <web-tabs variant="pills">
        <web-tab id="dashboard" label="Dashboard" icon="dashboard">
          <div style="padding: 1rem;">
            <h3>📊 Dashboard</h3>
            <p>Visão geral dos principais indicadores.</p>
          </div>
        </web-tab>
        <web-tab id="analytics" label="Analytics" icon="analytics">
          <div style="padding: 1rem;">
            <h3>📈 Analytics</h3>
            <p>Análise detalhada de dados e métricas.</p>
          </div>
        </web-tab>
        <web-tab id="reports" label="Relatórios" icon="description">
          <div style="padding: 1rem;">
            <h3>📄 Relatórios</h3>
            <p>Gere e visualize relatórios personalizados.</p>
          </div>
        </web-tab>
      </web-tabs>
    `
  })
};

export const Boxed: Story = {
  render: () => ({
    template: `
      <web-tabs variant="boxed">
        <web-tab id="code" label="Código" icon="code">
          <div style="padding: 1.5rem;">
            <pre style="background: #f5f5f5; padding: 1rem; border-radius: 0.25rem;">
console.log('Hello World');
            </pre>
          </div>
        </web-tab>
        <web-tab id="preview" label="Preview" icon="visibility">
          <div style="padding: 1.5rem;">
            <p><strong>Hello World</strong></p>
            <p>Visualização do resultado do código.</p>
          </div>
        </web-tab>
        <web-tab id="output" label="Output" icon="terminal">
          <div style="padding: 1.5rem;">
            <code style="background: #1e1e1e; color: #d4d4d4; padding: 1rem; display: block; border-radius: 0.25rem;">
              > Hello World
            </code>
          </div>
        </web-tab>
      </web-tabs>
    `
  })
};

export const Enclosed: Story = {
  render: () => ({
    template: `
      <web-tabs variant="enclosed">
        <web-tab id="personal" label="Pessoal" icon="person">
          <div style="padding: 1.5rem;">
            <h4>Informações Pessoais</h4>
            <p>Nome: João Silva</p>
            <p>Email: joao@example.com</p>
            <p>Telefone: (11) 98765-4321</p>
          </div>
        </web-tab>
        <web-tab id="address" label="Endereço" icon="home">
          <div style="padding: 1.5rem;">
            <h4>Endereço de Entrega</h4>
            <p>Rua: Avenida Paulista, 1000</p>
            <p>Cidade: São Paulo - SP</p>
            <p>CEP: 01310-100</p>
          </div>
        </web-tab>
        <web-tab id="payment" label="Pagamento" icon="credit_card">
          <div style="padding: 1.5rem;">
            <h4>Método de Pagamento</h4>
            <p>Cartão: •••• •••• •••• 1234</p>
            <p>Validade: 12/25</p>
          </div>
        </web-tab>
      </web-tabs>
    `
  })
};

export const Vertical: Story = {
  render: () => ({
    template: `
      <div style="height: 400px;">
        <web-tabs variant="vertical">
          <web-tab id="account" label="Conta" icon="person">
            <div style="padding: 1.5rem;">
              <h3>Configurações de Conta</h3>
              <p>Gerencie suas informações de conta e preferências.</p>
              <button style="margin-top: 1rem; padding: 0.5rem 1rem; background: #009ADA; color: white; border: none; border-radius: 0.25rem; cursor: pointer;">
                Salvar Alterações
              </button>
            </div>
          </web-tab>
          <web-tab id="security" label="Segurança" icon="security">
            <div style="padding: 1.5rem;">
              <h3>Segurança</h3>
              <p>Atualize sua senha e configure autenticação de dois fatores.</p>
              <button style="margin-top: 1rem; padding: 0.5rem 1rem; background: #009ADA; color: white; border: none; border-radius: 0.25rem; cursor: pointer;">
                Alterar Senha
              </button>
            </div>
          </web-tab>
          <web-tab id="notifications" label="Notificações" icon="notifications">
            <div style="padding: 1.5rem;">
              <h3>Preferências de Notificação</h3>
              <p>Escolha como e quando deseja receber notificações.</p>
              <label style="display: block; margin-top: 0.5rem;">
                <input type="checkbox" checked> Notificações por email
              </label>
              <label style="display: block; margin-top: 0.5rem;">
                <input type="checkbox"> Notificações push
              </label>
            </div>
          </web-tab>
          <web-tab id="privacy" label="Privacidade" icon="shield">
            <div style="padding: 1.5rem;">
              <h3>Privacidade</h3>
              <p>Controle quem pode ver suas informações.</p>
            </div>
          </web-tab>
          <web-tab id="billing" label="Cobrança" icon="receipt">
            <div style="padding: 1.5rem;">
              <h3>Cobrança e Assinatura</h3>
              <p>Gerencie sua assinatura e histórico de pagamentos.</p>
            </div>
          </web-tab>
        </web-tabs>
      </div>
    `
  })
};

// ========== SIZES ==========

export const Small: Story = {
  render: () => ({
    template: `
      <web-tabs size="small">
        <web-tab id="tab1" label="Pequena" icon="filter_1">
          <div style="padding: 1rem;">Conteúdo da aba pequena</div>
        </web-tab>
        <web-tab id="tab2" label="Compacta" icon="filter_2">
          <div style="padding: 1rem;">Ideal para espaços reduzidos</div>
        </web-tab>
        <web-tab id="tab3" label="Mini" icon="filter_3">
          <div style="padding: 1rem;">Tamanho compacto</div>
        </web-tab>
      </web-tabs>
    `
  })
};

export const Large: Story = {
  render: () => ({
    template: `
      <web-tabs size="large">
        <web-tab id="tab1" label="Grande" icon="filter_1">
          <div style="padding: 2rem;">Conteúdo da aba grande</div>
        </web-tab>
        <web-tab id="tab2" label="Espaçosa" icon="filter_2">
          <div style="padding: 2rem;">Mais espaço para clique</div>
        </web-tab>
        <web-tab id="tab3" label="Ampla" icon="filter_3">
          <div style="padding: 2rem;">Tamanho generoso</div>
        </web-tab>
      </web-tabs>
    `
  })
};

// ========== FEATURES ==========

export const Centered: Story = {
  name: 'Centralizado',
  render: () => ({
    template: `
      <web-tabs [centered]="true">
        <web-tab id="tab1" label="Opção 1" icon="looks_one">
          <div style="padding: 1rem; text-align: center;">
            <h3>Opção 1</h3>
            <p>Conteúdo centralizado</p>
          </div>
        </web-tab>
        <web-tab id="tab2" label="Opção 2" icon="looks_two">
          <div style="padding: 1rem; text-align: center;">
            <h3>Opção 2</h3>
            <p>Tabs centralizadas</p>
          </div>
        </web-tab>
        <web-tab id="tab3" label="Opção 3" icon="looks_3">
          <div style="padding: 1rem; text-align: center;">
            <h3>Opção 3</h3>
            <p>Visual equilibrado</p>
          </div>
        </web-tab>
      </web-tabs>
    `
  })
};

export const FullWidth: Story = {
  name: 'Largura Total',
  render: () => ({
    template: `
      <web-tabs [fullWidth]="true">
        <web-tab id="tab1" label="25%">
          <div style="padding: 1rem;">Cada aba ocupa 25% da largura</div>
        </web-tab>
        <web-tab id="tab2" label="25%">
          <div style="padding: 1rem;">Distribuição igual</div>
        </web-tab>
        <web-tab id="tab3" label="25%">
          <div style="padding: 1rem;">Ideal para navegação</div>
        </web-tab>
        <web-tab id="tab4" label="25%">
          <div style="padding: 1rem;">Visual uniforme</div>
        </web-tab>
      </web-tabs>
    `
  })
};

export const NoPadding: Story = {
  name: 'Sem Padding no Conteúdo',
  render: () => ({
    template: `
      <web-tabs [contentPadding]="false">
        <web-tab id="image" label="Imagem" icon="image">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); height: 300px; display: flex; align-items: center; justify-content: center; color: white;">
            <div style="text-align: center;">
              <h2>Sem Padding</h2>
              <p>Conteúdo vai até as bordas</p>
            </div>
          </div>
        </web-tab>
        <web-tab id="video" label="Vídeo" icon="play_circle">
          <div style="background: #1e1e1e; height: 300px; display: flex; align-items: center; justify-content: center; color: white;">
            <div style="text-align: center;">
              <h2>Ideal para Mídia</h2>
              <p>Imagens e vídeos em tela cheia</p>
            </div>
          </div>
        </web-tab>
      </web-tabs>
    `
  })
};

// ========== USE CASES ==========

export const ProductDetails: Story = {
  name: 'Detalhes do Produto',
  render: () => ({
    template: `
      <web-tabs variant="pills">
        <web-tab id="description" label="Descrição" icon="description">
          <div style="padding: 1.5rem;">
            <h3>Notebook Dell Inspiron 15</h3>
            <p>Processador Intel Core i7 de 11ª geração</p>
            <p>16GB RAM DDR4</p>
            <p>SSD 512GB NVMe</p>
            <p>Tela Full HD 15.6"</p>
            <p>Windows 11 Pro</p>
            <p style="margin-top: 1rem; color: #6c757d;">
              Ideal para trabalho, estudos e entretenimento. 
              Design elegante e portátil com bateria de longa duração.
            </p>
          </div>
        </web-tab>
        <web-tab id="specs" label="Especificações" icon="list">
          <div style="padding: 1.5rem;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr style="border-bottom: 1px solid #e5e7eb;">
                <td style="padding: 0.5rem; font-weight: 600;">Processador</td>
                <td style="padding: 0.5rem;">Intel Core i7-1165G7</td>
              </tr>
              <tr style="border-bottom: 1px solid #e5e7eb;">
                <td style="padding: 0.5rem; font-weight: 600;">Memória RAM</td>
                <td style="padding: 0.5rem;">16GB DDR4</td>
              </tr>
              <tr style="border-bottom: 1px solid #e5e7eb;">
                <td style="padding: 0.5rem; font-weight: 600;">Armazenamento</td>
                <td style="padding: 0.5rem;">512GB SSD NVMe</td>
              </tr>
              <tr style="border-bottom: 1px solid #e5e7eb;">
                <td style="padding: 0.5rem; font-weight: 600;">Tela</td>
                <td style="padding: 0.5rem;">15.6" Full HD (1920x1080)</td>
              </tr>
              <tr>
                <td style="padding: 0.5rem; font-weight: 600;">Peso</td>
                <td style="padding: 0.5rem;">1.8 kg</td>
              </tr>
            </table>
          </div>
        </web-tab>
        <web-tab id="reviews" label="Avaliações" icon="star" badge="128">
          <div style="padding: 1.5rem;">
            <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
              <div style="font-size: 3rem; font-weight: bold; color: #009ADA;">4.5</div>
              <div>
                <div style="color: #ffc107; font-size: 1.5rem;">★★★★★</div>
                <div style="color: #6c757d; font-size: 0.875rem;">128 avaliações</div>
              </div>
            </div>
            <div style="border-top: 1px solid #e5e7eb; padding-top: 1rem; margin-top: 1rem;">
              <p style="font-weight: 600;">Excelente custo-benefício!</p>
              <p style="color: #6c757d; font-size: 0.875rem;">
                Comprei há 2 meses e estou muito satisfeito. 
                Rápido, silencioso e com ótima bateria.
              </p>
              <p style="color: #6c757d; font-size: 0.75rem; margin-top: 0.5rem;">
                João Silva - 15/01/2024
              </p>
            </div>
          </div>
        </web-tab>
        <web-tab id="shipping" label="Entrega" icon="local_shipping">
          <div style="padding: 1.5rem;">
            <h4>Opções de Entrega</h4>
            <div style="margin-top: 1rem; padding: 1rem; border: 1px solid #e5e7eb; border-radius: 0.5rem;">
              <div style="display: flex; justify-content: space-between;">
                <div>
                  <p style="font-weight: 600; margin: 0;">Entrega Padrão</p>
                  <p style="color: #6c757d; font-size: 0.875rem; margin: 0.25rem 0 0 0;">
                    Receba em 7-10 dias úteis
                  </p>
                </div>
                <div style="font-weight: 600;">R$ 25,00</div>
              </div>
            </div>
            <div style="margin-top: 0.5rem; padding: 1rem; border: 2px solid #009ADA; border-radius: 0.5rem; background: rgba(0, 154, 218, 0.05);">
              <div style="display: flex; justify-content: space-between;">
                <div>
                  <p style="font-weight: 600; margin: 0; color: #009ADA;">Entrega Expressa</p>
                  <p style="color: #6c757d; font-size: 0.875rem; margin: 0.25rem 0 0 0;">
                    Receba em 2-3 dias úteis
                  </p>
                </div>
                <div style="font-weight: 600; color: #009ADA;">R$ 45,00</div>
              </div>
            </div>
          </div>
        </web-tab>
      </web-tabs>
    `
  })
};

export const Dashboard: Story = {
  render: () => ({
    template: `
      <web-tabs variant="enclosed">
        <web-tab id="overview" label="Visão Geral" icon="dashboard">
          <div style="padding: 1.5rem;">
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
              <div style="padding: 1.5rem; background: #e7f3ff; border-radius: 0.5rem;">
                <div style="color: #009ADA; font-size: 0.875rem; font-weight: 600;">VENDAS</div>
                <div style="font-size: 2rem; font-weight: bold; margin-top: 0.5rem;">R$ 52.340</div>
                <div style="color: #28a745; font-size: 0.875rem; margin-top: 0.25rem;">↑ 12.5%</div>
              </div>
              <div style="padding: 1.5rem; background: #fff3cd; border-radius: 0.5rem;">
                <div style="color: #856404; font-size: 0.875rem; font-weight: 600;">CLIENTES</div>
                <div style="font-size: 2rem; font-weight: bold; margin-top: 0.5rem;">1,234</div>
                <div style="color: #28a745; font-size: 0.875rem; margin-top: 0.25rem;">↑ 8.2%</div>
              </div>
              <div style="padding: 1.5rem; background: #d4edda; border-radius: 0.5rem;">
                <div style="color: #155724; font-size: 0.875rem; font-weight: 600;">PEDIDOS</div>
                <div style="font-size: 2rem; font-weight: bold; margin-top: 0.5rem;">89</div>
                <div style="color: #28a745; font-size: 0.875rem; margin-top: 0.25rem;">↑ 5.1%</div>
              </div>
            </div>
          </div>
        </web-tab>
        <web-tab id="sales" label="Vendas" icon="trending_up">
          <div style="padding: 1.5rem;">
            <h4>Relatório de Vendas</h4>
            <p style="color: #6c757d;">Análise detalhada das vendas do período.</p>
          </div>
        </web-tab>
        <web-tab id="customers" label="Clientes" icon="people">
          <div style="padding: 1.5rem;">
            <h4>Base de Clientes</h4>
            <p style="color: #6c757d;">Informações sobre seus clientes.</p>
          </div>
        </web-tab>
        <web-tab id="products" label="Produtos" icon="inventory">
          <div style="padding: 1.5rem;">
            <h4>Catálogo de Produtos</h4>
            <p style="color: #6c757d;">Gerencie seu inventário.</p>
          </div>
        </web-tab>
      </web-tabs>
    `
  })
};

export const AllVariants: Story = {
  name: 'Todas as Variantes',
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 3rem;">
        <div>
          <h3 style="font-family: Montserrat; margin-bottom: 1rem;">Underline (Padrão)</h3>
          <web-tabs variant="underline">
            <web-tab id="u1" label="Tab 1" icon="filter_1">
              <div style="padding: 1rem;">Conteúdo Underline</div>
            </web-tab>
            <web-tab id="u2" label="Tab 2" icon="filter_2">
              <div style="padding: 1rem;">Estilo padrão</div>
            </web-tab>
            <web-tab id="u3" label="Tab 3" icon="filter_3">
              <div style="padding: 1rem;">Linha inferior</div>
            </web-tab>
          </web-tabs>
        </div>

        <div>
          <h3 style="font-family: Montserrat; margin-bottom: 1rem;">Pills</h3>
          <web-tabs variant="pills">
            <web-tab id="p1" label="Tab 1" icon="filter_1">
              <div style="padding: 1rem;">Conteúdo Pills</div>
            </web-tab>
            <web-tab id="p2" label="Tab 2" icon="filter_2">
              <div style="padding: 1rem;">Estilo arredondado</div>
            </web-tab>
            <web-tab id="p3" label="Tab 3" icon="filter_3">
              <div style="padding: 1rem;">Visual moderno</div>
            </web-tab>
          </web-tabs>
        </div>

        <div>
          <h3 style="font-family: Montserrat; margin-bottom: 1rem;">Boxed</h3>
          <web-tabs variant="boxed">
            <web-tab id="b1" label="Tab 1" icon="filter_1">
              <div style="padding: 1rem;">Conteúdo Boxed</div>
            </web-tab>
            <web-tab id="b2" label="Tab 2" icon="filter_2">
              <div style="padding: 1rem;">Com caixas</div>
            </web-tab>
            <web-tab id="b3" label="Tab 3" icon="filter_3">
              <div style="padding: 1rem;">Visual destacado</div>
            </web-tab>
          </web-tabs>
        </div>

        <div>
          <h3 style="font-family: Montserrat; margin-bottom: 1rem;">Enclosed</h3>
          <web-tabs variant="enclosed">
            <web-tab id="e1" label="Tab 1" icon="filter_1">
              <div style="padding: 1rem;">Conteúdo Enclosed</div>
            </web-tab>
            <web-tab id="e2" label="Tab 2" icon="filter_2">
              <div style="padding: 1rem;">Totalmente fechado</div>
            </web-tab>
            <web-tab id="e3" label="Tab 3" icon="filter_3">
              <div style="padding: 1rem;">Visual completo</div>
            </web-tab>
          </web-tabs>
        </div>
      </div>
    `
  })
};