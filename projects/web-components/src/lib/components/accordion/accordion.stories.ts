import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccordionComponent, AccordionItemComponent } from './accordion.component';

const meta: Meta<AccordionComponent> = {
  title: 'Layout/Accordion',
  component: AccordionComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `

---

### ⚠️ Atenção: dependência obrigatória

Este componente requer **@angular/animations**.

Instale com:

\`\`\`bash
npm install @angular/animations
\`\`\`

---

### 1️⃣ Instalação

\`\`\`bash
npm install @web/ui-components
npm install @angular/animations
\`\`\`

---

### ⚠️ Importante: Animations Module

O Accordion utiliza animações nativas do Angular.  
Você **precisa obrigatoriamente** habilitar animações no projeto.

#### Angular Standalone

\`\`\`ts
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations()
  ]
};
\`\`\`

---

### 2️⃣ Import no seu componente

\`\`\`ts
import { AccordionComponent, AccordionItemComponent } from '@web/ui-components';

@Component({
  selector: 'app-meu-componente',
  standalone: true,
  imports: [AccordionComponent, AccordionItemComponent],
  template: \`
    <web-accordion>
      <web-accordion-item title="Item 1">
        Conteúdo do item 1
      </web-accordion-item>

      <web-accordion-item title="Item 2">
        Conteúdo do item 2
      </web-accordion-item>
    </web-accordion>
  \`
})
export class MeuComponente {}
\`\`\`

---

### 3️⃣ Uso básico

\`\`\`html
<web-accordion>
  <web-accordion-item title="Pergunta 1">
    Resposta da pergunta 1
  </web-accordion-item>

  <web-accordion-item title="Pergunta 2">
    Resposta da pergunta 2
  </web-accordion-item>
</web-accordion>
\`\`\`

---

### 4️⃣ Com ícones e subtítulos

\`\`\`html
<web-accordion>
  <web-accordion-item
    title="Configurações"
    subtitle="Configure suas preferências"
    icon="settings"
    iconColor="#009ADA">
    Conteúdo das configurações...
  </web-accordion-item>

  <web-accordion-item
    title="Notificações"
    subtitle="Gerencie suas notificações"
    icon="notifications"
    iconColor="#28a745">
    Conteúdo de notificações...
  </web-accordion-item>
</web-accordion>
\`\`\`

---

### 5️⃣ Com badges

\`\`\`html
<web-accordion>
  <web-accordion-item title="Mensagens" icon="mail" badge="5">
    Suas mensagens não lidas...
  </web-accordion-item>

  <web-accordion-item title="Tarefas" icon="task" badge="novo">
    Suas tarefas pendentes...
  </web-accordion-item>
</web-accordion>
\`\`\`

---

### 6️⃣ Ordenação (setas ↑ ↓)

\`\`\`html
<web-accordion [orderable]="true">
  <web-accordion-item title="Item 1">
    Use as setas para reordenar!
  </web-accordion-item>

  <web-accordion-item title="Item 2">
    Clique na seta ↑ para mover para cima
  </web-accordion-item>

  <web-accordion-item title="Item 3">
    Clique na seta ↓ para mover para baixo
  </web-accordion-item>
</web-accordion>
\`\`\`

- Mostra número da posição atual  
- Seta ↑ desabilitada no primeiro item  
- Seta ↓ desabilitada no último item  

---

### 7️⃣ Variantes

\`\`\`html
<web-accordion variant="default"></web-accordion>
<web-accordion variant="separated"></web-accordion>
<web-accordion variant="compact"></web-accordion>
<web-accordion variant="bordered"></web-accordion>
\`\`\`

---

### 8️⃣ Múltiplos itens abertos

\`\`\`html
<web-accordion [multiple]="true">
  <web-accordion-item title="Item 1"></web-accordion-item>
  <web-accordion-item title="Item 2"></web-accordion-item>
  <web-accordion-item title="Item 3"></web-accordion-item>
</web-accordion>
\`\`\`

---

### 9️⃣ Item expandido por padrão

\`\`\`html
<web-accordion>
  <web-accordion-item title="Item Aberto" [expanded]="true">
    Este item inicia aberto
  </web-accordion-item>

  <web-accordion-item title="Item Fechado">
    Este item inicia fechado
  </web-accordion-item>
</web-accordion>
\`\`\`

---

### 🔟 Item desabilitado

\`\`\`html
<web-accordion>
  <web-accordion-item title="Item Normal"></web-accordion-item>
  <web-accordion-item title="Item Desabilitado" [disabled]="true"></web-accordion-item>
</web-accordion>
\`\`\`

---

### 1️⃣1️⃣ Loading

\`\`\`html
<web-accordion>
  <web-accordion-item title="Carregando..." [loading]="true"></web-accordion-item>
</web-accordion>
\`\`\`

---

### 1️⃣2️⃣ Ações no header

\`\`\`html
<div header-actions>
  <button>Editar</button>
  <button>Excluir</button>
</div>
\`\`\`

---

### 1️⃣3️⃣ Sem padding no conteúdo

\`\`\`html
<web-accordion-item [contentPadding]="false"></web-accordion-item>
\`\`\`

---

### 1️⃣4️⃣ Controle programático

\`\`\`ts
@ViewChild('accordion') accordion!: AccordionComponent;

expandAll() {
  this.accordion.expandAll();
}

collapseAll() {
  this.accordion.collapseAll();
}
\`\`\`

---

### 1️⃣5️⃣ Eventos

\`\`\`html
<web-accordion-item
  (expandedChange)="onExpandChange($event)">
</web-accordion-item>
\`\`\`

---

### 1️⃣6️⃣ Propriedades completas

**AccordionComponent**
- variant
- multiple
- collapsible
- orderable

**AccordionItemComponent**
- title
- subtitle
- icon
- iconColor
- badge
- expanded
- disabled
- loading
- contentPadding
- expandIcon

---

### 1️⃣7️⃣ NgModule (não-standalone)

\`\`\`ts
imports: [
  BrowserAnimationsModule,
  AccordionComponent,
  AccordionItemComponent
]
\`\`\`

---

### 💡 Dicas Pro

- Use orderable para dashboards
- Use badges para indicadores
- Use loading para dados assíncronos
- Use variant="compact" para FAQ
- Combine ícones e cores para semântica visual
        `
      }
    }
  },
  decorators: [
    moduleMetadata({
      imports: [AccordionComponent, AccordionItemComponent, BrowserAnimationsModule],
    }),
  ],
};

export default meta;
type Story = StoryObj<AccordionComponent>;

// ========== BASIC ==========

export const Default: Story = {
  render: () => ({
    template: `
      <web-accordion>
        <web-accordion-item title="O que é o web?">
          O web é um método de estudo que desenvolve a autonomia dos alunos através de materiais didáticos autoinstrutivos.
        </web-accordion-item>
        
        <web-accordion-item title="Como funciona?">
          O aluno progride em seu próprio ritmo, desenvolvendo habilidades de forma gradual e consistente.
        </web-accordion-item>
        
        <web-accordion-item title="Quais são os benefícios?">
          Desenvolvimento de autodidatismo, concentração, raciocínio lógico e hábito de estudos.
        </web-accordion-item>
      </web-accordion>
    `
  })
};

export const WithIcons: Story = {
  name: 'Com Ícones',
  render: () => ({
    template: `
      <web-accordion>
        <web-accordion-item 
          title="Perfil"
          subtitle="Informações pessoais"
          icon="person"
          iconColor="#009ADA">
          Configure seus dados pessoais, foto de perfil e preferências de conta.
        </web-accordion-item>
        
        <web-accordion-item 
          title="Segurança"
          subtitle="Senha e autenticação"
          icon="lock"
          iconColor="#28a745">
          Altere sua senha, configure autenticação em dois fatores e gerencie dispositivos conectados.
        </web-accordion-item>
        
        <web-accordion-item 
          title="Notificações"
          subtitle="Preferências de comunicação"
          icon="notifications"
          iconColor="#ffc107">
          Escolha quais notificações deseja receber por email, push e SMS.
        </web-accordion-item>
        
        <web-accordion-item 
          title="Privacidade"
          subtitle="Controle seus dados"
          icon="shield"
          iconColor="#6f42c1">
          Gerencie quem pode ver seu perfil e suas publicações.
        </web-accordion-item>
      </web-accordion>
    `
  })
};

export const WithBadges: Story = {
  name: 'Com Badges',
  render: () => ({
    template: `
      <web-accordion>
        <web-accordion-item 
          title="Caixa de Entrada"
          icon="inbox"
          badge="5">
          Você tem 5 mensagens não lidas aguardando sua resposta.
        </web-accordion-item>
        
        <web-accordion-item 
          title="Notificações"
          icon="notifications"
          badge="12">
          12 notificações novas desde sua última visita.
        </web-accordion-item>
        
        <web-accordion-item 
          title="Tarefas Pendentes"
          icon="task"
          badge="novo">
          Novas tarefas foram atribuídas a você.
        </web-accordion-item>
      </web-accordion>
    `
  })
};

export const Orderable: Story = {
  name: 'Ordenável (Setas)',
  render: () => ({
    template: `
      <div style="padding: 1rem; background: #f3f4f6; border-radius: 0.5rem;">
        <p style="margin: 0 0 1rem 0; font-family: Montserrat; color: #6b7280;">
          <strong>💡 Dica:</strong> Use as setas para reordenar os itens! O número indica a posição atual.
        </p>
        
        <web-accordion [orderable]="true">
          <web-accordion-item 
            title="Primeira Prioridade"
            subtitle="Use ↑↓ para reordenar"
            icon="star"
            iconColor="#ffc107">
            Este item tem alta prioridade. Use as setas para reorganizar.
          </web-accordion-item>
          
          <web-accordion-item 
            title="Segunda Prioridade"
            subtitle="Use ↑↓ para reordenar"
            icon="schedule"
            iconColor="#009ADA">
            Item de prioridade média. Pode ser reordenado conforme necessário.
          </web-accordion-item>
          
          <web-accordion-item 
            title="Terceira Prioridade"
            subtitle="Use ↑↓ para reordenar"
            icon="low_priority"
            iconColor="#6b7280">
            Item de baixa prioridade. Organize como preferir.
          </web-accordion-item>
          
          <web-accordion-item 
            title="Quarta Prioridade"
            subtitle="Use ↑↓ para reordenar"
            icon="done"
            iconColor="#28a745">
            Último item da lista. Reordene à vontade!
          </web-accordion-item>
        </web-accordion>
      </div>
    `
  })
};

// ========== VARIANTS ==========

export const VariantSeparated: Story = {
  name: 'Variant: Separated',
  render: () => ({
    template: `
      <web-accordion variant="separated">
        <web-accordion-item title="Item 1" icon="looks_one">
          Conteúdo do item 1 com espaçamento maior entre os itens.
        </web-accordion-item>
        
        <web-accordion-item title="Item 2" icon="looks_two">
          Conteúdo do item 2 com melhor legibilidade.
        </web-accordion-item>
        
        <web-accordion-item title="Item 3" icon="looks_3">
          Conteúdo do item 3 bem separado dos outros.
        </web-accordion-item>
      </web-accordion>
    `
  })
};

export const VariantCompact: Story = {
  name: 'Variant: Compact',
  render: () => ({
    template: `
      <web-accordion variant="compact">
        <web-accordion-item title="Pergunta 1">
          Resposta da primeira pergunta. Ideal para FAQ.
        </web-accordion-item>
        
        <web-accordion-item title="Pergunta 2">
          Resposta da segunda pergunta sem espaçamento.
        </web-accordion-item>
        
        <web-accordion-item title="Pergunta 3">
          Resposta da terceira pergunta em formato compacto.
        </web-accordion-item>
        
        <web-accordion-item title="Pergunta 4">
          Resposta da quarta pergunta. Perfeito para listas longas.
        </web-accordion-item>
      </web-accordion>
    `
  })
};

export const VariantBordered: Story = {
  name: 'Variant: Bordered',
  render: () => ({
    template: `
      <web-accordion variant="bordered">
        <web-accordion-item title="Seção 1" icon="folder">
          Conteúdo dentro de um container com borda externa.
        </web-accordion-item>
        
        <web-accordion-item title="Seção 2" icon="folder">
          Estilo elegante com borda ao redor de todo o accordion.
        </web-accordion-item>
        
        <web-accordion-item title="Seção 3" icon="folder">
          Ideal para destacar um grupo de itens relacionados.
        </web-accordion-item>
      </web-accordion>
    `
  })
};

// ========== FEATURES ==========

export const MultipleOpen: Story = {
  name: 'Múltiplos Itens Abertos',
  render: () => ({
    template: `
      <div style="margin-bottom: 1rem; padding: 1rem; background: #dbeafe; border-radius: 0.5rem;">
        <p style="margin: 0; font-family: Montserrat; color: #1e40af;">
          <strong>💡 Modo Múltiplo:</strong> Vários itens podem ficar abertos ao mesmo tempo!
        </p>
      </div>
      
      <web-accordion [multiple]="true">
        <web-accordion-item title="Capítulo 1" [expanded]="true">
          Conteúdo do capítulo 1. Este item inicia aberto.
        </web-accordion-item>
        
        <web-accordion-item title="Capítulo 2" [expanded]="true">
          Conteúdo do capítulo 2. Este também inicia aberto.
        </web-accordion-item>
        
        <web-accordion-item title="Capítulo 3">
          Conteúdo do capítulo 3. Você pode abrir quantos quiser!
        </web-accordion-item>
      </web-accordion>
    `
  })
};

export const WithDisabled: Story = {
  name: 'Com Item Desabilitado',
  render: () => ({
    template: `
      <web-accordion>
        <web-accordion-item title="Item Ativo" icon="check_circle" iconColor="#28a745">
          Este item está ativo e pode ser expandido normalmente.
        </web-accordion-item>
        
        <web-accordion-item 
          title="Item Desabilitado (Em Breve)"
          subtitle="Recurso não disponível"
          icon="lock"
          [disabled]="true">
          Este item está desabilitado e não pode ser expandido.
        </web-accordion-item>
        
        <web-accordion-item title="Outro Item Ativo" icon="check_circle" iconColor="#28a745">
          Este item também está ativo.
        </web-accordion-item>
      </web-accordion>
    `
  })
};

export const WithLoading: Story = {
  name: 'Com Loading',
  render: () => ({
    props: {
      isLoading: true,
      loadData() {
        (this as any).isLoading = true;
        setTimeout(() => {
          (this as any).isLoading = false;
        }, 2000);
      }
    },
    template: `
      <button 
        (click)="loadData()"
        style="margin-bottom: 1rem; padding: 0.625rem 1.25rem; background: #009ADA; color: white; border: none; border-radius: 0.5rem; cursor: pointer; font-family: Montserrat;">
        Carregar Dados
      </button>
      
      <web-accordion>
        <web-accordion-item 
          title="Carregando dados..."
          icon="cloud_download"
          [loading]="isLoading"
          [expanded]="true">
          
          <div *ngIf="!isLoading">
            Dados carregados com sucesso! Os dados foram obtidos do servidor e estão prontos para visualização.
          </div>
          
          <div *ngIf="isLoading" style="text-align: center; padding: 2rem; color: #6b7280;">
            Aguarde...
          </div>
        </web-accordion-item>
      </web-accordion>
    `
  })
};

export const WithHeaderActions: Story = {
  name: 'Com Ações no Header',
  render: () => ({
    props: {
      edit(item: string) {
        alert(`Editar: ${item}`);
      },
      delete(item: string) {
        if (confirm(`Excluir: ${item}?`)) {
          alert('Item excluído!');
        }
      }
    },
    template: `
      <web-accordion>
        <web-accordion-item 
          title="Documento Importante.pdf"
          subtitle="Modificado há 2 horas"
          icon="description">
          
          <div header-actions style="display: flex; gap: 0.5rem;">
            <button 
              (click)="edit('Documento Importante'); $event.stopPropagation()"
              style="padding: 0.5rem; background: transparent; border: none; cursor: pointer; border-radius: 0.25rem; display: flex; align-items: center;"
              title="Editar">
              <span class="material-symbols-outlined" style="font-size: 1.25rem; color: #009ADA;">edit</span>
            </button>
            <button 
              (click)="delete('Documento Importante'); $event.stopPropagation()"
              style="padding: 0.5rem; background: transparent; border: none; cursor: pointer; border-radius: 0.25rem; display: flex; align-items: center;"
              title="Excluir">
              <span class="material-symbols-outlined" style="font-size: 1.25rem; color: #dc3545;">delete</span>
            </button>
          </div>
          
          Este é o conteúdo do documento. Você pode editar ou excluir usando os botões no header.
        </web-accordion-item>
        
        <web-accordion-item 
          title="Relatório Mensal.xlsx"
          subtitle="Modificado há 1 dia"
          icon="table_chart">
          
          <div header-actions style="display: flex; gap: 0.5rem;">
            <button 
              (click)="edit('Relatório Mensal'); $event.stopPropagation()"
              style="padding: 0.5rem; background: transparent; border: none; cursor: pointer;">
              <span class="material-symbols-outlined" style="font-size: 1.25rem; color: #009ADA;">edit</span>
            </button>
            <button 
              (click)="delete('Relatório Mensal'); $event.stopPropagation()"
              style="padding: 0.5rem; background: transparent; border: none; cursor: pointer;">
              <span class="material-symbols-outlined" style="font-size: 1.25rem; color: #dc3545;">delete</span>
            </button>
          </div>
          
          Planilha com dados do relatório mensal. Use as ações no header para gerenciar.
        </web-accordion-item>
      </web-accordion>
    `
  })
};

// ========== USE CASES ==========

export const FAQ: Story = {
  name: 'FAQ (Perguntas Frequentes)',
  render: () => ({
    template: `
      <div style="max-width: 800px; margin: 0 auto;">
        <h2 style="font-family: Montserrat; margin-bottom: 1.5rem;">Perguntas Frequentes</h2>
        
        <web-accordion variant="compact">
          <web-accordion-item 
            title="Como faço para criar uma conta?"
            icon="help">
            Para criar uma conta, clique no botão "Cadastrar" no topo da página, preencha seus dados pessoais e confirme seu email.
          </web-accordion-item>
          
          <web-accordion-item 
            title="Esqueci minha senha, o que fazer?"
            icon="help">
            Clique em "Esqueci minha senha" na tela de login. Você receberá um email com instruções para redefinir sua senha.
          </web-accordion-item>
          
          <web-accordion-item 
            title="Como cancelo minha assinatura?"
            icon="help">
            Acesse Configurações > Assinatura > Cancelar Plano. Você poderá usar o serviço até o fim do período pago.
          </web-accordion-item>
          
          <web-accordion-item 
            title="Posso mudar meu plano depois?"
            icon="help">
            Sim! Você pode fazer upgrade ou downgrade do seu plano a qualquer momento nas configurações da conta.
          </web-accordion-item>
          
          <web-accordion-item 
            title="Há reembolso se eu cancelar?"
            icon="help">
            Oferecemos reembolso total se você cancelar nos primeiros 30 dias. Após isso, não há reembolso proporcional.
          </web-accordion-item>
        </web-accordion>
      </div>
    `
  })
};

export const Dashboard: Story = {
  name: 'Dashboard Personalizável',
  render: () => ({
    template: `
      <div style="max-width: 900px; margin: 0 auto;">
        <h2 style="font-family: Montserrat; margin-bottom: 0.5rem;">Meu Dashboard</h2>
        <p style="color: #6b7280; font-family: Montserrat; margin-bottom: 1.5rem;">
          Arraste os widgets para reorganizar seu dashboard
        </p>
        
        <web-accordion [multiple]="true">
          <web-accordion-item 
            title="Vendas do Mês"
            subtitle="R$ 52.340 • +12% vs mês anterior"
            icon="trending_up"
            iconColor="#28a745"
            [draggable]="true"
            [expanded]="true"
            [contentPadding]="false">
            
            <div style="padding: 1.5rem;">
              <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem;">
                <div style="text-align: center;">
                  <div style="font-size: 2rem; font-weight: bold; color: #009ADA;">234</div>
                  <div style="color: #6b7280; font-size: 0.875rem;">Vendas</div>
                </div>
                <div style="text-align: center;">
                  <div style="font-size: 2rem; font-weight: bold; color: #28a745;">R$ 223</div>
                  <div style="color: #6b7280; font-size: 0.875rem;">Ticket Médio</div>
                </div>
                <div style="text-align: center;">
                  <div style="font-size: 2rem; font-weight: bold; color: #ffc107;">89%</div>
                  <div style="color: #6b7280; font-size: 0.875rem;">Taxa Conversão</div>
                </div>
              </div>
            </div>
          </web-accordion-item>
          
          <web-accordion-item 
            title="Tarefas Pendentes"
            subtitle="8 tarefas para hoje"
            icon="task"
            iconColor="#009ADA"
            badge="8"
            [draggable]="true">
            
            <ul style="margin: 0; padding-left: 1.5rem;">
              <li>Revisar proposta de cliente</li>
              <li>Reunião com equipe às 14h</li>
              <li>Enviar relatório mensal</li>
              <li>Atualizar documentação</li>
            </ul>
          </web-accordion-item>
          
          <web-accordion-item 
            title="Notificações"
            subtitle="12 novas notificações"
            icon="notifications"
            iconColor="#ffc107"
            badge="12"
            [draggable]="true">
            
            <div style="display: flex; flex-direction: column; gap: 0.75rem;">
              <div style="padding: 0.75rem; background: #f3f4f6; border-radius: 0.375rem;">
                <strong>Nova venda</strong> • Há 5 minutos
              </div>
              <div style="padding: 0.75rem; background: #f3f4f6; border-radius: 0.375rem;">
                <strong>Comentário em documento</strong> • Há 15 minutos
              </div>
              <div style="padding: 0.75rem; background: #f3f4f6; border-radius: 0.375rem;">
                <strong>Tarefa atribuída</strong> • Há 1 hora
              </div>
            </div>
          </web-accordion-item>
        </web-accordion>
      </div>
    `
  })
};