import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { CheckboxComponent } from './checkbox.component';
import { FormsModule } from '@angular/forms';

const meta: Meta<CheckboxComponent> = {
  title: 'Form Controls/Checkbox',
  component: CheckboxComponent,
  tags: ['autodocs'],
  parameters:{
    docs:{
      description:{
        component: `
---

## 1️⃣ INSTALAÇÃO

\`\`\`bash
npm install @web/ui-components
\`\`\`

---

## 2️⃣ IMPORT NO SEU COMPONENTE

\`\`\`ts
import { CheckboxComponent } from '@web/ui-components';
import { FormsModule } from '@angular/forms'; // Para [(ngModel)]
import { ReactiveFormsModule } from '@angular/forms'; // Para formControlName

@Component({
  selector: 'app-meu-componente',
  standalone: true,
  imports: [
    CheckboxComponent,
    FormsModule,        // ← Se usar [(ngModel)]
    ReactiveFormsModule // ← Se usar Reactive Forms
  ],
  template: \`
    <web-checkbox 
      label="Aceito os termos"
      [(ngModel)]="aceitoTermos">
    </web-checkbox>
  \`
})
export class MeuComponente {
  aceitoTermos = false;
}
\`\`\`

---

## 3️⃣ USO NO TEMPLATE

### Com Two-Way Binding [(ngModel)]

\`\`\`html
<web-checkbox 
  label="Aceito receber novidades por email"
  [(ngModel)]="aceitoEmails">
</web-checkbox>
\`\`\`

---

### Com Reactive Forms (formControlName)

\`\`\`html
<form [formGroup]="meuForm">
  <web-checkbox 
    label="Li e aceito os termos de uso"
    formControlName="aceitoTermos"
    [required]="true"
    [error]="meuForm.get('aceitoTermos')?.invalid && meuForm.get('aceitoTermos')?.touched"
    errorMessage="Você precisa aceitar os termos">
  </web-checkbox>
</form>
\`\`\`

---

## 4️⃣ EXEMPLO COMPLETO COM REACTIVE FORMS

### NO COMPONENTE TYPESCRIPT

\`\`\`ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CheckboxComponent } from '@web/ui-components';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [ReactiveFormsModule, CheckboxComponent],
  templateUrl: './cadastro.component.html'
})
export class CadastroComponent implements OnInit {
  cadastroForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.cadastroForm = this.fb.group({
      aceitoTermos: [false, Validators.requiredTrue],
      receberEmails: [false],
      receberNotificacoes: [true],
      compartilharDados: [false],
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });

    this.cadastroForm.get('receberEmails')?.valueChanges.subscribe(value => {
      console.log('Receber emails:', value);
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.cadastroForm.get(fieldName);
    return !!(field?.invalid && field?.touched);
  }

  onSubmit() {
    if (this.cadastroForm.valid) {
      console.log('Dados:', this.cadastroForm.value);
    } else {
      Object.keys(this.cadastroForm.controls).forEach(key => {
        this.cadastroForm.get(key)?.markAsTouched();
      });
    }
  }
}
\`\`\`

---

### NO TEMPLATE HTML

\`\`\`html
<form [formGroup]="cadastroForm" (ngSubmit)="onSubmit()">

  <web-checkbox
    label="Li e aceito os termos de uso"
    formControlName="aceitoTermos"
    [required]="true"
    [error]="isFieldInvalid('aceitoTermos')"
    errorMessage="Você precisa aceitar os termos para continuar"
    color="primary">
  </web-checkbox>

  <web-checkbox
    label="Desejo receber emails com novidades"
    description="Você receberá ofertas exclusivas e atualizações"
    formControlName="receberEmails">
  </web-checkbox>

  <web-checkbox
    label="Receber notificações push"
    description="Alertas em tempo real no seu dispositivo"
    formControlName="receberNotificacoes">
  </web-checkbox>

  <web-checkbox
    label="Permitir compartilhamento de dados"
    description="Seus dados podem ser compartilhados com parceiros"
    formControlName="compartilharDados">
  </web-checkbox>

  <button 
    type="submit" 
    [disabled]="cadastroForm.invalid"
    style="margin-top: 1rem;">
    Cadastrar
  </button>
</form>

<pre>{{ cadastroForm.value | json }}</pre>
\`\`\`

---

## 5️⃣ VALIDAÇÃO: CHECKBOX OBRIGATÓRIO

⚠️ Para checkbox obrigatório, use **Validators.requiredTrue**

\`\`\`ts
// CORRETO ✓
this.form = this.fb.group({
  aceitoTermos: [false, Validators.requiredTrue]
});

// ERRADO ✗
this.form = this.fb.group({
  aceitoTermos: [false, Validators.required]
});
\`\`\`

---

## 6️⃣ EXEMPLO: LISTA DE PERMISSÕES

\`\`\`ts
this.form = this.fb.group({
  permissoes: this.fb.group({
    lerDados: [true],
    editarDados: [false],
    excluirDados: [false],
    exportarRelatorios: [false]
  })
});
\`\`\`

\`\`\`html
<div formGroupName="permissoes">
  <web-checkbox formControlName="lerDados" label="Ler dados"></web-checkbox>
  <web-checkbox formControlName="editarDados" label="Editar dados"></web-checkbox>
  <web-checkbox formControlName="excluirDados" label="Excluir dados"></web-checkbox>
  <web-checkbox formControlName="exportarRelatorios" label="Exportar relatórios"></web-checkbox>
</div>
\`\`\`

---

## 7️⃣ EXEMPLO: CHECKBOX COM LÓGICA CONDICIONAL

\`\`\`ts
this.form = this.fb.group({
  usarEnderecoCobranca: [false],
  enderecoEntrega: ['', Validators.required],
  enderecoCobranca: ['']
});

this.form.get('usarEnderecoCobranca')?.valueChanges.subscribe(checked => {
  const enderecoCobrancaControl = this.form.get('enderecoCobranca');

  if (checked) {
    enderecoCobrancaControl?.setValidators(Validators.required);
  } else {
    enderecoCobrancaControl?.clearValidators();
  }

  enderecoCobrancaControl?.updateValueAndValidity();
});
\`\`\`

---

## 8️⃣ MARCANDO / DESMARCANDO PROGRAMATICAMENTE

\`\`\`ts
this.form.patchValue({ aceitoTermos: true });
this.form.patchValue({ aceitoTermos: false });

const atual = this.form.get('aceitoTermos')?.value;
this.form.patchValue({ aceitoTermos: !atual });

this.form.patchValue({
  receberEmails: true,
  receberNotificacoes: true,
  compartilharDados: true
});
\`\`\`

---

## 9️⃣ EXEMPLO: TERMOS E CONDIÇÕES

\`\`\`html
<form [formGroup]="cadastroForm" (ngSubmit)="onSubmit()">

  <div style="margin-top: 2rem; padding: 1rem; border: 1px solid #e5e7eb; border-radius: 0.5rem;">
    <web-checkbox
      label="Li e aceito os termos de uso"
      description="Ao marcar, você concorda com nossas políticas"
      formControlName="aceitoTermos"
      [required]="true"
      [error]="isFieldInvalid('aceitoTermos')"
      errorMessage="Você precisa aceitar os termos">
    </web-checkbox>

    <web-checkbox
      label="Aceito receber comunicações por email (opcional)"
      formControlName="aceitoEmails"
      style="margin-top: 1rem; display: block;">
    </web-checkbox>
  </div>

  <button 
    type="submit" 
    [disabled]="cadastroForm.invalid"
    style="margin-top: 1rem; width: 100%;">
    Criar Conta
  </button>
</form>
\`\`\`

---

## 🔟 PARA COMPONENTES NÃO-STANDALONE (NgModule)

\`\`\`ts
import { CheckboxComponent } from '@web/ui-components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [MeuComponente],
  imports: [
    CheckboxComponent,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class MeuModule {}
\`\`\`

💡 **DICA:** Veja os exemplos abaixo para conhecer todas as variações disponíveis!
        `
      }
    }
  },
  decorators: [
    moduleMetadata({
      imports: [CheckboxComponent, FormsModule],
    }),
  ],
};

export default meta;
type Story = StoryObj<CheckboxComponent>;

// ========== BASIC ==========

export const Default: Story = {
  args: {
    label: 'Aceito os termos e condições',
  }
};

export const Checked: Story = {
  args: {
    label: 'Já marcado por padrão',
    checked: true,
  }
};

export const WithDescription: Story = {
  name: 'Com Descrição',
  args: {
    label: 'Receber notificações',
    description: 'Você receberá emails sobre atualizações e novidades',
  }
};

export const Disabled: Story = {
  args: {
    label: 'Opção desabilitada',
    disabled: true,
  }
};

export const DisabledChecked: Story = {
  name: 'Desabilitado e Marcado',
  args: {
    label: 'Não pode alterar',
    checked: true,
    disabled: true,
  }
};

export const Indeterminate: Story = {
  name: 'Estado Indeterminado',
  args: {
    label: 'Selecionar todos (parcial)',
    indeterminate: true,
  }
};

// ========== SIZES ==========

export const AllSizes: Story = {
  name: 'Todos os Tamanhos',
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <web-checkbox label="Small" size="small"></web-checkbox>
        <web-checkbox label="Medium (Padrão)" size="medium"></web-checkbox>
        <web-checkbox label="Large" size="large"></web-checkbox>
      </div>
    `
  })
};

export const Small: Story = {
  args: {
    label: 'Checkbox pequeno',
    size: 'small',
  }
};

export const Large: Story = {
  args: {
    label: 'Checkbox grande',
    size: 'large',
  }
};

// ========== COLORS ==========

export const AllColors: Story = {
  name: 'Todas as Cores',
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <web-checkbox label="Primary" color="primary" [checked]="true"></web-checkbox>
        <web-checkbox label="Success" color="success" [checked]="true"></web-checkbox>
        <web-checkbox label="Danger" color="danger" [checked]="true"></web-checkbox>
        <web-checkbox label="Warning" color="warning" [checked]="true"></web-checkbox>
        <web-checkbox label="Info" color="info" [checked]="true"></web-checkbox>
        <web-checkbox label="Dark" color="dark" [checked]="true"></web-checkbox>
      </div>
    `
  })
};

// ========== VARIANTS ==========

export const Rounded: Story = {
  name: 'Arredondado',
  args: {
    label: 'Checkbox circular',
    variant: 'rounded',
  }
};

export const ButtonStyle: Story = {
  name: 'Estilo Botão',
  render: () => ({
    template: `
      <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
        <web-checkbox label="Opção 1" variant="button"></web-checkbox>
        <web-checkbox label="Opção 2" variant="button"></web-checkbox>
        <web-checkbox label="Opção 3" variant="button"></web-checkbox>
      </div>
    `
  })
};

export const CardStyle: Story = {
  name: 'Estilo Card',
  render: () => ({
    template: `
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem; max-width: 800px;">
        <web-checkbox 
          label="Plano Básico" 
          description="R$ 29,90/mês - Ideal para começar"
          variant="card">
        </web-checkbox>
        <web-checkbox 
          label="Plano Pro" 
          description="R$ 59,90/mês - Para profissionais"
          variant="card">
        </web-checkbox>
        <web-checkbox 
          label="Plano Enterprise" 
          description="R$ 99,90/mês - Para empresas"
          variant="card">
        </web-checkbox>
      </div>
    `
  })
};

// ========== CUSTOM ICONS ==========

export const CustomIcons: Story = {
  name: 'Ícones Customizados',
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <web-checkbox label="Check padrão" icon="check" [checked]="true"></web-checkbox>
        <web-checkbox label="Done" icon="done" [checked]="true"></web-checkbox>
        <web-checkbox label="Done All" icon="done_all" [checked]="true"></web-checkbox>
        <web-checkbox label="Star" icon="star" [checked]="true" color="warning"></web-checkbox>
        <web-checkbox label="Favorite" icon="favorite" [checked]="true" color="danger"></web-checkbox>
      </div>
    `
  })
};

// ========== USE CASES ==========

export const TermsAndConditions: Story = {
  name: 'Termos e Condições',
  render: () => ({
    template: `
      <div style="max-width: 500px; padding: 1.5rem; border: 1px solid #e5e7eb; border-radius: 0.5rem;">
        <h3 style="margin: 0 0 1rem 0; font-family: Montserrat;">Finalizar Cadastro</h3>
        
        <web-checkbox 
          label="Li e aceito os termos de uso"
          description="Você concorda com nossas políticas de privacidade e termos de serviço">
        </web-checkbox>
        
        <web-checkbox 
          label="Desejo receber novidades por email"
          description="Receba ofertas exclusivas e atualizações (opcional)"
          style="margin-top: 1rem; display: block;">
        </web-checkbox>
        
        <button style="margin-top: 1.5rem; width: 100%; padding: 0.75rem; background: #009ADA; color: white; border: none; border-radius: 0.375rem; font-family: Montserrat; font-weight: 500; cursor: pointer;">
          Criar Conta
        </button>
      </div>
    `
  })
};

export const TodoList: Story = {
  name: 'Lista de Tarefas',
  render: () => ({
    template: `
      <div style="max-width: 400px; padding: 1.5rem; background: white; border-radius: 0.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
        <h3 style="margin: 0 0 1rem 0; font-family: Montserrat;">Minhas Tarefas</h3>
        
        <div style="display: flex; flex-direction: column; gap: 0.75rem;">
          <web-checkbox label="Revisar código do projeto" [checked]="true"></web-checkbox>
          <web-checkbox label="Responder emails" [checked]="true"></web-checkbox>
          <web-checkbox label="Preparar apresentação"></web-checkbox>
          <web-checkbox label="Reunião com time às 15h"></web-checkbox>
          <web-checkbox label="Atualizar documentação"></web-checkbox>
        </div>
      </div>
    `
  })
};

export const FilterPanel: Story = {
  name: 'Painel de Filtros',
  render: () => ({
    template: `
      <div style="max-width: 300px; padding: 1.5rem; background: white; border: 1px solid #e5e7eb; border-radius: 0.5rem;">
        <h4 style="margin: 0 0 1rem 0; font-family: Montserrat;">Filtros</h4>
        
        <div style="margin-bottom: 1.5rem;">
          <p style="margin: 0 0 0.5rem 0; font-family: Montserrat; font-weight: 600; font-size: 0.875rem; color: #6c757d;">
            CATEGORIA
          </p>
          <div style="display: flex; flex-direction: column; gap: 0.5rem;">
            <web-checkbox label="Eletrônicos" size="small"></web-checkbox>
            <web-checkbox label="Roupas" size="small"></web-checkbox>
            <web-checkbox label="Livros" size="small"></web-checkbox>
            <web-checkbox label="Casa e Decoração" size="small"></web-checkbox>
          </div>
        </div>
        
        <div style="margin-bottom: 1.5rem;">
          <p style="margin: 0 0 0.5rem 0; font-family: Montserrat; font-weight: 600; font-size: 0.875rem; color: #6c757d;">
            PREÇO
          </p>
          <div style="display: flex; flex-direction: column; gap: 0.5rem;">
            <web-checkbox label="Até R$ 50" size="small"></web-checkbox>
            <web-checkbox label="R$ 50 - R$ 100" size="small"></web-checkbox>
            <web-checkbox label="R$ 100 - R$ 500" size="small"></web-checkbox>
            <web-checkbox label="Acima de R$ 500" size="small"></web-checkbox>
          </div>
        </div>
        
        <div>
          <p style="margin: 0 0 0.5rem 0; font-family: Montserrat; font-weight: 600; font-size: 0.875rem; color: #6c757d;">
            OUTROS
          </p>
          <div style="display: flex; flex-direction: column; gap: 0.5rem;">
            <web-checkbox label="Frete Grátis" size="small" color="success"></web-checkbox>
            <web-checkbox label="Ofertas" size="small" color="danger"></web-checkbox>
          </div>
        </div>
      </div>
    `
  })
};

export const PricingCards: Story = {
  name: 'Cards de Preços',
  render: () => ({
    template: `
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; max-width: 1200px;">
        <web-checkbox 
          variant="card"
          label="Básico"
          description="R$ 29/mês • Ideal para começar • 10 projetos • 5GB armazenamento">
        </web-checkbox>
        
        <web-checkbox 
          variant="card"
          label="Profissional"
          description="R$ 59/mês • Para profissionais • Projetos ilimitados • 50GB armazenamento"
          color="primary"
          [checked]="true">
        </web-checkbox>
        
        <web-checkbox 
          variant="card"
          label="Enterprise"
          description="R$ 99/mês • Para empresas • Tudo ilimitado • Suporte prioritário">
        </web-checkbox>
      </div>
    `
  })
};

export const SelectAll: Story = {
  name: 'Selecionar Todos',
  render: () => ({
    template: `
      <div style="max-width: 400px; padding: 1.5rem; border: 1px solid #e5e7eb; border-radius: 0.5rem;">
        <web-checkbox 
          label="Selecionar todos"
          [indeterminate]="true"
          style="margin-bottom: 1rem; display: block; padding-bottom: 1rem; border-bottom: 1px solid #e5e7eb;">
        </web-checkbox>
        
        <div style="display: flex; flex-direction: column; gap: 0.75rem; padding-left: 1.5rem;">
          <web-checkbox label="Item 1" [checked]="true"></web-checkbox>
          <web-checkbox label="Item 2" [checked]="true"></web-checkbox>
          <web-checkbox label="Item 3"></web-checkbox>
          <web-checkbox label="Item 4"></web-checkbox>
        </div>
      </div>
    `
  })
};

export const FeaturesList: Story = {
  name: 'Lista de Features',
  render: () => ({
    template: `
      <div style="max-width: 500px; padding: 2rem; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 1rem; color: white;">
        <h2 style="margin: 0 0 0.5rem 0; font-family: Montserrat;">Plano Premium</h2>
        <p style="margin: 0 0 2rem 0; opacity: 0.9;">Tudo que você precisa para crescer</p>
        
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <span class="material-symbols-outlined" style="color: #4ade80; font-size: 1.5rem;">check_circle</span>
            <span>Projetos ilimitados</span>
          </div>
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <span class="material-symbols-outlined" style="color: #4ade80; font-size: 1.5rem;">check_circle</span>
            <span>100GB de armazenamento</span>
          </div>
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <span class="material-symbols-outlined" style="color: #4ade80; font-size: 1.5rem;">check_circle</span>
            <span>Suporte prioritário 24/7</span>
          </div>
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <span class="material-symbols-outlined" style="color: #4ade80; font-size: 1.5rem;">check_circle</span>
            <span>Colaboração em equipe</span>
          </div>
        </div>
        
        <button style="margin-top: 2rem; width: 100%; padding: 0.875rem; background: white; color: #667eea; border: none; border-radius: 0.5rem; font-family: Montserrat; font-weight: 600; font-size: 1rem; cursor: pointer;">
          Começar Agora
        </button>
      </div>
    `
  })
};

export const AllVariants: Story = {
  name: 'Todas as Variantes',
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 3rem;">
        <div>
          <h3 style="font-family: Montserrat; margin-bottom: 1rem;">Default</h3>
          <div style="display: flex; flex-direction: column; gap: 0.75rem;">
            <web-checkbox label="Opção 1"></web-checkbox>
            <web-checkbox label="Opção 2"></web-checkbox>
            <web-checkbox label="Opção 3"></web-checkbox>
          </div>
        </div>

        <div>
          <h3 style="font-family: Montserrat; margin-bottom: 1rem;">Rounded</h3>
          <div style="display: flex; flex-direction: column; gap: 0.75rem;">
            <web-checkbox label="Opção 1" variant="rounded"></web-checkbox>
            <web-checkbox label="Opção 2" variant="rounded"></web-checkbox>
            <web-checkbox label="Opção 3" variant="rounded"></web-checkbox>
          </div>
        </div>

        <div>
          <h3 style="font-family: Montserrat; margin-bottom: 1rem;">Button</h3>
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
            <web-checkbox label="Opção 1" variant="button"></web-checkbox>
            <web-checkbox label="Opção 2" variant="button"></web-checkbox>
            <web-checkbox label="Opção 3" variant="button"></web-checkbox>
          </div>
        </div>

        <div>
          <h3 style="font-family: Montserrat; margin-bottom: 1rem;">Card</h3>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; max-width: 800px;">
            <web-checkbox label="Opção 1" description="Descrição curta" variant="card"></web-checkbox>
            <web-checkbox label="Opção 2" description="Descrição curta" variant="card"></web-checkbox>
            <web-checkbox label="Opção 3" description="Descrição curta" variant="card"></web-checkbox>
          </div>
        </div>
      </div>
    `
  })
};