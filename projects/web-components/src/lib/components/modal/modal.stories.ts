import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { ModalComponent } from './modal.component';
import { FormsModule } from '@angular/forms';

const meta: Meta<ModalComponent> = {
  title: 'Layout/Modal',
  component: ModalComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `

O **Modal** é um componente altamente configurável para exibição de conteúdos críticos, formulários, confirmações e fluxos avançados. Ele suporta diferentes tamanhos, ícones, estados de loading, ações customizadas, fullscreen, minimização e arraste.

---

### 1️⃣ Instalação

\`\`\`bash
npm install @web/ui-components
\`\`\`

---

### 2️⃣ Importação no componente

#### Standalone Component
\`\`\`ts
import { ModalComponent } from '@web/ui-components';

@Component({
  standalone: true,
  imports: [ModalComponent],
  template: \`
    <web-modal
      [isOpen]="isOpen"
      title="Meu Modal"
      (closed)="isOpen = false">
      <p>Conteúdo do modal</p>
    </web-modal>
  \`
})
export class MeuComponente {
  isOpen = true;
}
\`\`\`

#### NgModule
\`\`\`ts
@NgModule({
  imports: [ModalComponent]
})
export class MeuModule {}
\`\`\`

---

### 3️⃣ Uso básico

\`\`\`html
<web-modal
  [isOpen]="isOpen"
  title="Título do Modal"
  (closed)="isOpen = false">
  <p>Conteúdo do modal</p>
</web-modal>
\`\`\`

---

### 4️⃣ Modal com ícone e subtítulo

\`\`\`html
<web-modal
  [isOpen]="isOpen"
  title="Novo Documento"
  subtitle="Crie um novo documento para começar"
  icon="description"
  iconColor="#009ADA">
</web-modal>
\`\`\`

---

### 5️⃣ Tamanhos disponíveis

| Tamanho | Largura |
|-------|--------|
| small | 28rem (448px) |
| medium | 40rem (640px) |
| large | 56rem (896px) |
| xlarge | 72rem (1152px) |
| full | Quase fullscreen |

\`\`\`html
<web-modal size="large"></web-modal>
\`\`\`

---

### 6️⃣ Fullscreen e Minimizar

\`\`\`html
<web-modal
  [fullscreenable]="true"
  [minimizable]="true"
  (fullscreenChange)="onFullscreenChange($event)"
  (minimizedChange)="onMinimizedChange($event)">
</web-modal>
\`\`\`

---

### 7️⃣ Modal arrastável (Draggable)

\`\`\`html
<web-modal
  [draggable]="true"
  title="Arraste-me!">
</web-modal>
\`\`\`

---

### 8️⃣ Controle de fechamento

\`\`\`html
<web-modal
  [closable]="true"
  [closeOnBackdropClick]="false"
  [closeOnEscape]="false">
</web-modal>
\`\`\`

---

### 9️⃣ Footer customizado

\`\`\`html
<web-modal [footer]="true">
  <p>Conteúdo</p>

  <div modal-footer>
    <button>Cancelar</button>
    <button>Confirmar</button>
  </div>
</web-modal>
\`\`\`

---

### 🔟 Estado de loading

\`\`\`html
<web-modal
  [loading]="true"
  loadingText="Processando...">
</web-modal>
\`\`\`

---

### 1️⃣1️⃣ Ações customizadas no header

\`\`\`html
<web-modal title="Documento">
  <div header-actions>
    <button>
      <span class="material-symbols-outlined">download</span>
    </button>
    <button>
      <span class="material-symbols-outlined">share</span>
    </button>
  </div>
</web-modal>
\`\`\`

---

### 1️⃣2️⃣ Propriedades disponíveis

**Inputs**
- title
- subtitle
- icon
- iconColor
- size
- isOpen
- closable
- closeOnBackdropClick
- closeOnEscape
- fullscreenable
- minimizable
- draggable
- bodyPadding
- blurBackground
- footer
- loading
- loadingText

**Outputs**
- opened
- closed
- minimizedChange
- fullscreenChange

---

💡 **Dica:** Utilize fullscreen para conteúdos extensos, minimização para multitarefa e loading para operações assíncronas.

👉 Veja abaixo todos os exemplos interativos disponíveis no Storybook.
        `
      }
    }
},
  decorators: [
    moduleMetadata({
      imports: [ModalComponent, FormsModule],
    }),
  ],
};

export default meta;
type Story = StoryObj<ModalComponent>;

// ========== BASIC ==========

export const Default: Story = {
  render: (args) => ({
    props: {
      ...args,
      isModalOpen: false,
      openModal() {
        (this as any).isModalOpen = true;
      }
    },
    template: `
      <button 
        (click)="openModal()"
        style="padding: 0.875rem 1.75rem; background: #009ADA; color: white; border: none; border-radius: 0.5rem; font-family: Montserrat; font-weight: 600; cursor: pointer; font-size: 1rem;">
        Abrir Modal
      </button>
      
      <web-modal
        [isOpen]="isModalOpen"
        title="Modal Básico"
        subtitle="Este é um exemplo de modal simples"
        (closed)="isModalOpen = false">
        
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          <p style="margin: 0; line-height: 1.6;">
            Este é um modal moderno e elegante com design premium.
          </p>
          <p style="margin: 0; line-height: 1.6; color: #6b7280;">
            Clique fora do modal, pressione ESC ou use o botão X para fechar.
          </p>
        </div>
      </web-modal>
    `
  })
};

export const WithIcon: Story = {
  name: 'Com Ícone',
  render: () => ({
    props: {
      isOpen: false,
      open() { (this as any).isOpen = true; }
    },
    template: `
      <button 
        (click)="open()"
        style="padding: 0.875rem 1.75rem; background: #009ADA; color: white; border: none; border-radius: 0.5rem; font-weight: 600; cursor: pointer;">
        Modal com Ícone
      </button>
      
      <web-modal
        [isOpen]="isOpen"
        title="Sucesso!"
        subtitle="Sua operação foi concluída com êxito"
        icon="check_circle"
        iconColor="#28a745"
        (closed)="isOpen = false">
        <p style="margin: 0;">Os dados foram salvos com sucesso no sistema.</p>
      </web-modal>
    `
  })
};

// ========== SIZES ==========

export const Small: Story = {
  render: () => ({
    props: {
      isOpen: false,
      open() { (this as any).isOpen = true; }
    },
    template: `
      <button (click)="open()" style="padding: 0.875rem 1.75rem; background: #009ADA; color: white; border: none; border-radius: 0.5rem; cursor: pointer;">
        Modal Pequeno
      </button>
      
      <web-modal
        [isOpen]="isOpen"
        title="Confirmação"
        size="small"
        (closed)="isOpen = false">
        <p style="margin: 0;">Ideal para confirmações rápidas e alertas.</p>
      </web-modal>
    `
  })
};

export const Large: Story = {
  render: () => ({
    props: {
      isOpen: false,
      open() { (this as any).isOpen = true; }
    },
    template: `
      <button (click)="open()" style="padding: 0.875rem 1.75rem; background: #009ADA; color: white; border: none; border-radius: 0.5rem; cursor: pointer;">
        Modal Grande
      </button>
      
      <web-modal
        [isOpen]="isOpen"
        title="Formulário Extenso"
        subtitle="Preencha todos os campos abaixo"
        size="large"
        (closed)="isOpen = false">
        <div style="display: flex; flex-direction: column; gap: 1.5rem;">
          <p style="margin: 0;">Modal grande para formulários e conteúdo extenso.</p>
          <p style="margin: 0; color: #6b7280;">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      </web-modal>
    `
  })
};

export const ExtraLarge: Story = {
  name: 'Extra Grande',
  render: () => ({
    props: {
      isOpen: false,
      open() { (this as any).isOpen = true; }
    },
    template: `
      <button (click)="open()" style="padding: 0.875rem 1.75rem; background: #009ADA; color: white; border: none; border-radius: 0.5rem; cursor: pointer;">
        Modal XL
      </button>
      
      <web-modal
        [isOpen]="isOpen"
        title="Dashboard"
        subtitle="Visualize todos os dados em um só lugar"
        size="xlarge"
        icon="dashboard"
        (closed)="isOpen = false">
        <p style="margin: 0;">Perfeito para dashboards, relatórios complexos e visualizações de dados.</p>
      </web-modal>
    `
  })
};

// ========== FEATURES ==========

export const Fullscreen: Story = {
  name: 'Com Fullscreen',
  render: () => ({
    props: {
      isOpen: false,
      open() { (this as any).isOpen = true; }
    },
    template: `
      <button (click)="open()" style="padding: 0.875rem 1.75rem; background: #009ADA; color: white; border: none; border-radius: 0.5rem; cursor: pointer;">
        Modal com Fullscreen
      </button>
      
      <web-modal
        [isOpen]="isOpen"
        title="Editor de Documento"
        subtitle="Clique no botão de fullscreen para expandir"
        icon="open_in_full"
        iconColor="#2563eb"
        [fullscreenable]="true"
        (closed)="isOpen = false">
        
        <div style="padding: 1.5rem; background: #f3f4f6; border-radius: 0.5rem;">
          <h4 style="margin: 0 0 1rem 0;">🎯 Recurso Premium: Fullscreen</h4>
          <p style="margin: 0; line-height: 1.6;">
            Clique no botão <strong>open_in_full</strong> no canto superior direito para expandir o modal em tela cheia!
          </p>
          <p style="margin: 1rem 0 0 0; line-height: 1.6; color: #6b7280;">
            Perfeito para edição de documentos, visualização de dados complexos, apresentações e muito mais.
          </p>
        </div>
      </web-modal>
    `
  })
};

export const Minimizable: Story = {
  name: 'Minimizável',
  render: () => ({
    props: {
      isOpen: false,
      open() { (this as any).isOpen = true; }
    },
    template: `
      <button (click)="open()" style="padding: 0.875rem 1.75rem; background: #009ADA; color: white; border: none; border-radius: 0.5rem; cursor: pointer;">
        Modal Minimizável
      </button>
      
      <web-modal
        [isOpen]="isOpen"
        title="Chat de Suporte"
        subtitle="Estamos aqui para ajudar"
        icon="chat"
        iconColor="#009ADA"
        [minimizable]="true"
        (closed)="isOpen = false">
        
        <div style="padding: 1.5rem; background: #dbeafe; border-radius: 0.5rem;">
          <h4 style="margin: 0 0 1rem 0;">💬 Recurso Premium: Minimize</h4>
          <p style="margin: 0; line-height: 1.6;">
            Clique no botão <strong>minimize</strong> para reduzir o modal a uma barra no canto inferior direito!
          </p>
          <p style="margin: 1rem 0 0 0; line-height: 1.6; color: #1e40af;">
            Ideal para chats, players de música, temporizadores - qualquer coisa que você queira manter aberta enquanto trabalha.
          </p>
        </div>
      </web-modal>
    `
  })
};

export const Draggable: Story = {
  name: 'Arrastável',
  render: () => ({
    props: {
      isOpen: false,
      open() { (this as any).isOpen = true; }
    },
    template: `
      <button (click)="open()" style="padding: 0.875rem 1.75rem; background: #009ADA; color: white; border: none; border-radius: 0.5rem; cursor: pointer;">
        Modal Arrastável
      </button>
      
      <web-modal
        [isOpen]="isOpen"
        title="Arraste-me! 🖱️"
        subtitle="Clique e arraste o header"
        icon="pan_tool"
        iconColor="#f59e0b"
        [draggable]="true"
        (closed)="isOpen = false">
        
        <div style="padding: 1.5rem; background: #fef3c7; border-radius: 0.5rem;">
          <h4 style="margin: 0 0 1rem 0;">🖱️ Recurso Premium: Drag & Drop</h4>
          <p style="margin: 0; line-height: 1.6;">
            <strong>Clique e segure o header</strong> do modal, depois arraste para posicioná-lo onde quiser na tela!
          </p>
          <p style="margin: 1rem 0 0 0; line-height: 1.6; color: #92400e;">
            Útil quando você precisa ver o conteúdo por trás do modal ou trabalhar com múltiplas janelas.
          </p>
        </div>
      </web-modal>
    `
  })
};

export const WithLoading: Story = {
  name: 'Com Loading',
  render: () => ({
    props: {
      isOpen: false,
      isLoading: false,
      open() {
        (this as any).isOpen = true;
        (this as any).isLoading = false;
      },
      startLoading() {
        (this as any).isLoading = true;
        setTimeout(() => {
          (this as any).isLoading = false;
          (this as any).isOpen = false;
        }, 3000);
      }
    },
    template: `
      <button (click)="open()" style="padding: 0.875rem 1.75rem; background: #009ADA; color: white; border: none; border-radius: 0.5rem; cursor: pointer;">
        Modal com Loading
      </button>
      
      <web-modal
        [isOpen]="isOpen"
        title="Salvando Dados"
        subtitle="Processando sua solicitação"
        icon="save"
        [loading]="isLoading"
        loadingText="Aguarde enquanto salvamos seus dados..."
        [footer]="true"
        (closed)="isOpen = false">
        
        <p style="margin: 0;">Clique no botão abaixo para simular um salvamento com loading!</p>
        
        <div modal-footer>
          <button 
            (click)="isOpen = false"
            style="padding: 0.625rem 1.25rem; background: #e5e7eb; border: none; border-radius: 0.5rem; cursor: pointer;">
            Cancelar
          </button>
          <button 
            (click)="startLoading()"
            style="padding: 0.625rem 1.25rem; background: #009ADA; color: white; border: none; border-radius: 0.5rem; cursor: pointer;">
            Salvar
          </button>
        </div>
      </web-modal>
    `
  })
};

export const NonClosable: Story = {
  name: 'Não Fecha ao Clicar Fora',
  render: () => ({
    props: {
      isOpen: false,
      open() { (this as any).isOpen = true; }
    },
    template: `
      <button (click)="open()" style="padding: 0.875rem 1.75rem; background: #dc2626; color: white; border: none; border-radius: 0.5rem; cursor: pointer;">
        Modal Crítico
      </button>
      
      <web-modal
        [isOpen]="isOpen"
        title="Ação Crítica"
        subtitle="Esta ação requer sua atenção"
        icon="warning"
        iconColor="#dc2626"
        [closeOnBackdropClick]="false"
        [closeOnEscape]="false"
        [footer]="true"
        (closed)="isOpen = false">
        
        <div style="padding: 1rem; background: #fee2e2; border-radius: 0.5rem; border-left: 4px solid #dc2626;">
          <p style="margin: 0; color: #991b1b; font-weight: 600;">
            ⚠️ Este modal NÃO fecha ao clicar fora ou pressionar ESC
          </p>
          <p style="margin: 0.5rem 0 0 0; color: #991b1b;">
            Use para ações críticas que requerem decisão consciente do usuário.
          </p>
        </div>
        
        <div modal-footer>
          <button 
            (click)="isOpen = false"
            style="padding: 0.625rem 1.25rem; background: #e5e7eb; border: none; border-radius: 0.5rem; cursor: pointer;">
            Entendi
          </button>
        </div>
      </web-modal>
    `
  })
};

// ========== USE CASES ==========

export const ConfirmDialog: Story = {
  name: 'Diálogo de Confirmação',
  render: () => ({
    props: {
      isOpen: false,
      isDeleting: false,
      open() {
        (this as any).isOpen = true;
        (this as any).isDeleting = false;
      },
      async confirmDelete() {
        (this as any).isDeleting = true;
        await new Promise(r => setTimeout(r, 2000));
        (this as any).isDeleting = false;
        (this as any).isOpen = false;
        alert('Item excluído!');
      }
    },
    template: `
      <button (click)="open()" style="padding: 0.875rem 1.75rem; background: #dc2626; color: white; border: none; border-radius: 0.5rem; cursor: pointer;">
        Excluir Item
      </button>
      
      <web-modal
        [isOpen]="isOpen"
        title="Confirmar Exclusão"
        subtitle="Esta ação não pode ser desfeita"
        icon="delete"
        iconColor="#dc2626"
        size="small"
        [loading]="isDeleting"
        loadingText="Excluindo item..."
        [footer]="true"
        (closed)="isOpen = false">
        
        <p style="margin: 0;">Tem certeza que deseja excluir este item permanentemente?</p>
        
        <div modal-footer style="width: 100%; justify-content: flex-end;">
          <button 
            (click)="isOpen = false"
            style="padding: 0.625rem 1.25rem; background: #e5e7eb; border: none; border-radius: 0.5rem; cursor: pointer; font-family: Montserrat; font-weight: 500;">
            Cancelar
          </button>
          <button 
            (click)="confirmDelete()"
            style="padding: 0.625rem 1.25rem; background: #dc2626; color: white; border: none; border-radius: 0.5rem; cursor: pointer; font-family: Montserrat; font-weight: 600;">
            Sim, Excluir
          </button>
        </div>
      </web-modal>
    `
  })
};

export const FormModal: Story = {
  name: 'Modal com Formulário',
  render: () => ({
    props: {
      isOpen: false,
      isSaving: false,
      formData: { name: '', email: '' },
      open() {
        (this as any).isOpen = true;
        (this as any).formData = { name: '', email: '' };
      },
      async save() {
        (this as any).isSaving = true;
        await new Promise(r => setTimeout(r, 1500));
        (this as any).isSaving = false;
        (this as any).isOpen = false;
        alert('Usuário cadastrado!');
      },
      isValid() {
        return (this as any).formData.name && (this as any).formData.email;
      }
    },
    template: `
      <button (click)="open()" style="padding: 0.875rem 1.75rem; background: #009ADA; color: white; border: none; border-radius: 0.5rem; cursor: pointer;">
        Novo Usuário
      </button>
      
      <web-modal
        [isOpen]="isOpen"
        title="Cadastrar Usuário"
        subtitle="Preencha os dados abaixo"
        icon="person_add"
        size="large"
        [loading]="isSaving"
        loadingText="Salvando usuário..."
        [footer]="true"
        (closed)="isOpen = false">
        
        <div style="display: flex; flex-direction: column; gap: 1.25rem;">
          <div>
            <label style="display: block; margin-bottom: 0.5rem; font-weight: 600; color: #374151;">Nome *</label>
            <input 
              [(ngModel)]="formData.name"
              placeholder="Digite o nome completo"
              style="width: 100%; padding: 0.75rem; border: 2px solid #e5e7eb; border-radius: 0.5rem; font-family: Montserrat; font-size: 0.9375rem;">
          </div>
          
          <div>
            <label style="display: block; margin-bottom: 0.5rem; font-weight: 600; color: #374151;">E-mail *</label>
            <input 
              [(ngModel)]="formData.email"
              type="email"
              placeholder="seu@email.com"
              style="width: 100%; padding: 0.75rem; border: 2px solid #e5e7eb; border-radius: 0.5rem; font-family: Montserrat; font-size: 0.9375rem;">
          </div>
        </div>
        
        <div modal-footer style="width: 100%; justify-content: flex-end;">
          <button 
            (click)="isOpen = false"
            style="padding: 0.625rem 1.25rem; background: #e5e7eb; border: none; border-radius: 0.5rem; cursor: pointer; font-family: Montserrat; font-weight: 500;">
            Cancelar
          </button>
          <button 
            (click)="save()"
            [disabled]="!isValid()"
            style="padding: 0.625rem 1.25rem; background: #009ADA; color: white; border: none; border-radius: 0.5rem; cursor: pointer; font-family: Montserrat; font-weight: 600;"
            [style.opacity]="isValid() ? '1' : '0.5'">
            Salvar
          </button>
        </div>
      </web-modal>
    `
  })
};

export const AllFeatures: Story = {
  name: 'Todos os Recursos',
  render: () => ({
    props: {
      isOpen: false,
      open() { (this as any).isOpen = true; }
    },
    template: `
      <button (click)="open()" style="padding: 0.875rem 1.75rem; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; border-radius: 0.5rem; cursor: pointer; font-weight: 600;">
        🚀 Modal Completo
      </button>
      
      <web-modal
        [isOpen]="isOpen"
        title="Modal Premium"
        subtitle="Todos os recursos em um só lugar"
        icon="star"
        iconColor="#f59e0b"
        size="large"
        [fullscreenable]="true"
        [minimizable]="true"
        [draggable]="true"
        [blurBackground]="true"
        (closed)="isOpen = false">
        
        <div style="display: flex; flex-direction: column; gap: 1.5rem;">
          <div style="padding: 1.5rem; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 0.75rem; color: white;">
            <h3 style="margin: 0 0 1rem 0;">🎉 Recursos Premium Disponíveis:</h3>
            <ul style="margin: 0; padding-left: 1.5rem; line-height: 1.8;">
              <li>✨ <strong>Fullscreen</strong> - Expanda para tela cheia</li>
              <li>📌 <strong>Minimize</strong> - Reduza a uma barra no canto</li>
              <li>🖱️ <strong>Draggable</strong> - Arraste o modal pela tela</li>
              <li>🎨 <strong>Blur Background</strong> - Efeito de desfoque no fundo</li>
              <li>🔔 <strong>Icon</strong> com cor customizada</li>
              <li>📏 <strong>Size Large</strong> - Modal espaçoso</li>
            </ul>
          </div>
          
          <p style="margin: 0; color: #6b7280; line-height: 1.6;">
            Este modal demonstra todos os recursos premium disponíveis. 
            Experimente cada botão no header para ver as funcionalidades em ação!
          </p>
        </div>
      </web-modal>
    `
  })
};