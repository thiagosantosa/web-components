import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { FormsModule } from '@angular/forms';
import { InputComponent } from './input.component';

const meta: Meta<InputComponent> = {
  title: 'Form Controls/Input',
  component: InputComponent,
  parameters: {
    docs: {
      description: {
        component: `
---

## 1️⃣ INSTALAÇÃO

\`\`\`bash
npm install @web/ui-components
\`\`\`

---

## 2️⃣ IMPORT NO SEU COMPONENTE

\`\`\`ts
import { InputComponent } from '@web/ui-components';
import { FormsModule } from '@angular/forms'; // Para [(ngModel)]
import { ReactiveFormsModule } from '@angular/forms'; // Para formControlName

@Component({
  selector: 'app-meu-componente',
  standalone: true,
  imports: [
    InputComponent,
    FormsModule,        // ← Se usar [(ngModel)]
    ReactiveFormsModule // ← Se usar Reactive Forms
  ],
  template: \`
    <web-input label="Nome" [(ngModel)]="nome"></web-input>
  \`
})
export class MeuComponente {
  nome = '';
}
\`\`\`

---

## 3️⃣ USO NO TEMPLATE

### Com Two-Way Binding [(ngModel)]

\`\`\`html
<web-input 
  label="E-mail"
  type="email"
  placeholder="seu@email.com"
  [(ngModel)]="email">
</web-input>
\`\`\`

---

### Com Reactive Forms (formControlName)

\`\`\`html
<form [formGroup]="meuForm">
  <web-input 
    label="Nome"
    placeholder="Digite seu nome"
    formControlName="nome"
    [required]="true"
    [error]="meuForm.get('nome')?.invalid && meuForm.get('nome')?.touched"
    errorMessage="Nome é obrigatório">
  </web-input>
</form>
\`\`\`

---

## 4️⃣ CONFIGURANDO REACTIVE FORMS

\`\`\`ts
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export class MeuComponente implements OnInit {
  meuForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.meuForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.meuForm.valid) {
      console.log(this.meuForm.value);
    }
  }
}
\`\`\`

---

## 5️⃣ EXEMPLO COMPLETO COM VALIDAÇÕES

### NO COMPONENTE TYPESCRIPT

\`\`\`ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from '@web/ui-components';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [ReactiveFormsModule, InputComponent],
  templateUrl: './cadastro.component.html'
})
export class CadastroComponent implements OnInit {
  cadastroForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.cadastroForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', Validators.required],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.cadastroForm.get(fieldName);
    return !!(field?.invalid && field?.touched);
  }

  getErrorMessage(fieldName: string): string {
    const field = this.cadastroForm.get(fieldName);

    if (field?.hasError('required')) {
      return 'Este campo é obrigatório';
    }
    if (field?.hasError('email')) {
      return 'E-mail inválido';
    }
    if (field?.hasError('minlength')) {
      const minLength = field.errors?.['minlength'].requiredLength;
      return \`Mínimo de \${minLength} caracteres\`;
    }
    return '';
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

  <web-input
    label="Nome Completo"
    placeholder="Digite seu nome"
    formControlName="nome"
    [required]="true"
    [error]="isFieldInvalid('nome')"
    [errorMessage]="getErrorMessage('nome')">
  </web-input>

  <web-input
    label="E-mail"
    type="email"
    placeholder="seu@email.com"
    formControlName="email"
    icon="mail"
    [required]="true"
    [error]="isFieldInvalid('email')"
    [errorMessage]="getErrorMessage('email')">
  </web-input>

  <web-input
    label="Telefone"
    type="tel"
    placeholder="(11) 98765-4321"
    formControlName="telefone"
    mask="(00) 00000-0000"
    [required]="true"
    [error]="isFieldInvalid('telefone')"
    errorMessage="Telefone é obrigatório">
  </web-input>

  <web-input
    label="Senha"
    type="password"
    placeholder="Mínimo 6 caracteres"
    formControlName="senha"
    [required]="true"
    [error]="isFieldInvalid('senha')"
    [errorMessage]="getErrorMessage('senha')"
    helperText="Use letras, números e caracteres especiais">
  </web-input>

  <button type="submit" [disabled]="cadastroForm.invalid">
    Cadastrar
  </button>
</form>
\`\`\`

---

## 6️⃣ OBSERVANDO MUDANÇAS NO FORMULÁRIO

\`\`\`ts
this.cadastroForm.get('email')?.valueChanges.subscribe(value => {
  console.log('Email alterado:', value);
});

this.cadastroForm.valueChanges.subscribe(values => {
  console.log('Formulário alterado:', values);
});

this.cadastroForm.statusChanges.subscribe(status => {
  console.log('Status:', status);
});
\`\`\`

---

## 7️⃣ PARA COMPONENTES NÃO-STANDALONE (NgModule)

\`\`\`ts
import { InputComponent } from '@web/ui-components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [MeuComponente],
  imports: [
    InputComponent,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class MeuModule {}
\`\`\`

💡 **DICA:** Veja os exemplos abaixo para conhecer todas as variações disponíveis!
        `,
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [InputComponent, FormsModule],
    }),
  ],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'date', 'time', 'cpf', 'cnpj', 'phone', 'cep', 'currency']
    },
    icon: {
      control: 'text',
      description: 'Material Icon name (ex: search, email, lock)'
    }
  }
};

export default meta;
type Story = StoryObj<InputComponent>;

// ========== BÁSICOS ==========

export const Default: Story = {
  args: {
    label: 'Nome',
    placeholder: 'Digite seu nome'
  }
};

export const Required: Story = {
  args: {
    label: 'Email',
    type: 'email',
    placeholder: 'seu@email.com',
    required: true,
    icon: 'email'
  }
};

export const Disabled: Story = {
  args: {
    label: 'Campo Desabilitado',
    placeholder: 'Você não pode editar',
    disabled: true,
    icon: 'lock'
  }
};

// ========== VALIDAÇÕES ==========

export const WithError: Story = {
  args: {
    label: 'Email',
    type: 'email',
    error: true,
    errorMessage: 'Email inválido',
    placeholder: 'seu@email.com',
    icon: 'email'
  }
};

export const WithSuccess: Story = {
  args: {
    label: 'Email',
    type: 'email',
    success: true,
    successMessage: 'Email válido!',
    placeholder: 'seu@email.com',
    icon: 'email'
  }
};

export const WithHelper: Story = {
  args: {
    label: 'Senha',
    type: 'password',
    helperText: 'Mínimo 8 caracteres, incluindo letra e número',
    placeholder: '••••••••',
    icon: 'lock'
  }
};

// ========== TIPOS NATIVOS ==========

export const Password: Story = {
  args: {
    label: 'Senha',
    type: 'password',
    placeholder: 'Digite sua senha',
    helperText: 'Clique no ícone para mostrar/ocultar',
    icon: 'lock'
  }
};

export const Email: Story = {
  args: {
    label: 'Email',
    type: 'email',
    placeholder: 'seu@email.com',
    icon: 'email'
  }
};

export const Number: Story = {
  args: {
    label: 'Idade',
    type: 'number',
    placeholder: '0',
    min: 0,
    max: 120,
    step: 1,
    icon: 'tag'
  }
};

export const Date: Story = {
  args: {
    label: 'Data de Nascimento',
    type: 'date',
    icon: 'calendar_today'
  }
};

export const Time: Story = {
  args: {
    label: 'Horário',
    type: 'time',
    icon: 'schedule'
  }
};

export const URL: Story = {
  args: {
    label: 'Website',
    type: 'url',
    placeholder: 'https://exemplo.com',
    icon: 'language'
  }
};

// ========== MÁSCARAS BRASILEIRAS (APENAS NÚMEROS) ==========

export const CPF: Story = {
  args: {
    label: 'CPF',
    type: 'cpf',
    placeholder: '000.000.000-00',
    helperText: 'Digite apenas números',
    icon: 'badge'
  }
};

export const CNPJ: Story = {
  args: {
    label: 'CNPJ',
    type: 'cnpj',
    placeholder: '00.000.000/0000-00',
    helperText: 'Digite apenas números',
    icon: 'business'
  }
};

export const Phone: Story = {
  args: {
    label: 'Telefone',
    type: 'phone',
    placeholder: '(00) 00000-0000',
    helperText: 'Digite apenas números',
    icon: 'phone'
  }
};

export const CEP: Story = {
  args: {
    label: 'CEP',
    type: 'cep',
    placeholder: '00000-000',
    helperText: 'Digite apenas números',
    icon: 'location_on'
  }
};

export const Currency: Story = {
  args: {
    label: 'Valor',
    type: 'currency',
    placeholder: '0,00',
    prefix: 'R$',
    helperText: 'Digite apenas números',
    icon: 'attach_money'
  }
};

// ========== COM ÍCONES MATERIAL ==========

export const WithSearchIcon: Story = {
  args: {
    label: 'Buscar',
    placeholder: 'Digite para buscar...',
    icon: 'search'
  }
};

export const WithPersonIcon: Story = {
  args: {
    label: 'Nome de Usuário',
    placeholder: 'Digite seu nome de usuário',
    icon: 'person'
  }
};

export const WithHomeIcon: Story = {
  args: {
    label: 'Endereço',
    placeholder: 'Digite seu endereço',
    icon: 'home'
  }
};

export const WithWorkIcon: Story = {
  args: {
    label: 'Empresa',
    placeholder: 'Nome da empresa',
    icon: 'work'
  }
};

// ========== COM PREFIXOS E SUFIXOS ==========

export const WithPrefix: Story = {
  args: {
    label: 'Website',
    placeholder: 'exemplo.com',
    prefix: 'https://',
    icon: 'language'
  }
};

export const WithSuffix: Story = {
  args: {
    label: 'Peso',
    type: 'number',
    placeholder: '0',
    suffix: 'kg',
    icon: 'monitor_weight'
  }
};

export const WithPrefixAndSuffix: Story = {
  args: {
    label: 'Preço',
    type: 'number',
    placeholder: '0.00',
    prefix: 'R$',
    suffix: '/mês'
  }
};

// ========== FUNCIONALIDADES ==========

export const Clearable: Story = {
  args: {
    label: 'Nome',
    placeholder: 'Digite e teste o botão limpar',
    clearable: true,
    helperText: 'Digite algo para ver o botão de limpar',
    icon: 'person'
  }
};

export const WithCharCount: Story = {
  args: {
    label: 'Descrição',
    placeholder: 'Digite sua descrição',
    maxLength: 100,
    showCharCount: true,
    helperText: 'Máximo 100 caracteres',
    icon: 'description'
  }
};

// ========== CASOS DE USO REAIS ==========

export const LoginForm: Story = {
  name: 'Formulário de Login',
  render: () => ({
    template: `
      <div style="max-width: 400px; display: flex; flex-direction: column; gap: 1.5rem; padding: 2rem; background: #f9fafb; border-radius: 0.5rem;">
        <h2 style="margin: 0 0 1rem 0; font-family: Montserrat; color: #443A3A;">Login</h2>
        
        <web-input 
          label="Email" 
          type="email"
          placeholder="seu@email.com"
          icon="email"
          required="true">
        </web-input>
        
        <web-input 
          label="Senha" 
          type="password"
          placeholder="••••••••"
          helperText="Mínimo 8 caracteres"
          icon="lock"
          required="true">
        </web-input>
      </div>
    `
  })
};

export const AddressForm: Story = {
  name: 'Formulário de Endereço',
  render: () => ({
    template: `
      <div style="max-width: 600px; display: flex; flex-direction: column; gap: 1.5rem; padding: 2rem; background: #f9fafb; border-radius: 0.5rem;">
        <h2 style="margin: 0 0 1rem 0; font-family: Montserrat; color: #443A3A;">Endereço</h2>
        
        <web-input 
          label="CEP" 
          type="cep"
          placeholder="00000-000"
          icon="location_on">
        </web-input>
        
        <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 1rem;">
          <web-input 
            label="Rua" 
            placeholder="Nome da rua"
            icon="signpost">
          </web-input>
          
          <web-input 
            label="Número" 
            type="number"
            placeholder="123"
            icon="tag">
          </web-input>
        </div>
        
        <web-input 
          label="Complemento" 
          placeholder="Apto, Bloco, etc."
          icon="home">
        </web-input>
        
        <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 1rem;">
          <web-input 
            label="Cidade" 
            placeholder="São Paulo"
            icon="location_city">
          </web-input>
          
          <web-input 
            label="UF" 
            placeholder="SP"
            maxLength="2">
          </web-input>
        </div>
      </div>
    `
  })
};

export const PaymentForm: Story = {
  name: 'Formulário de Pagamento',
  render: () => ({
    template: `
      <div style="max-width: 400px; display: flex; flex-direction: column; gap: 1.5rem; padding: 2rem; background: #f9fafb; border-radius: 0.5rem;">
        <h2 style="margin: 0 0 1rem 0; font-family: Montserrat; color: #443A3A;">Dados de Pagamento</h2>
        
        <web-input 
          label="Valor" 
          type="currency"
          prefix="R$"
          placeholder="0,00"
          icon="attach_money">
        </web-input>
        
        <web-input 
          label="Nome no Cartão" 
          placeholder="NOME COMPLETO"
          icon="credit_card">
        </web-input>
        
        <web-input 
          label="CPF" 
          type="cpf"
          placeholder="000.000.000-00"
          icon="badge">
        </web-input>
        
        <web-input 
          label="Telefone" 
          type="phone"
          placeholder="(00) 00000-0000"
          icon="phone">
        </web-input>
      </div>
    `
  })
};

export const ContactForm: Story = {
  name: 'Formulário de Contato',
  render: () => ({
    template: `
      <div style="max-width: 500px; display: flex; flex-direction: column; gap: 1.5rem; padding: 2rem; background: #f9fafb; border-radius: 0.5rem;">
        <h2 style="margin: 0 0 1rem 0; font-family: Montserrat; color: #443A3A;">Entre em Contato</h2>
        
        <web-input 
          label="Nome Completo" 
          placeholder="Digite seu nome"
          icon="person"
          required="true">
        </web-input>
        
        <web-input 
          label="Email" 
          type="email"
          placeholder="seu@email.com"
          icon="email"
          required="true">
        </web-input>
        
        <web-input 
          label="Telefone" 
          type="phone"
          placeholder="(00) 00000-0000"
          icon="phone">
        </web-input>
        
        <web-input 
          label="Assunto" 
          placeholder="Sobre o que deseja falar?"
          icon="subject">
        </web-input>
      </div>
    `
  })
};

export const MaterialIconsShowcase: Story = {
  name: 'Showcase de Ícones Material',
  render: () => ({
    template: `
      <div style="max-width: 900px; display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem;">
        <web-input label="Buscar" icon="search" placeholder="Buscar..."></web-input>
        <web-input label="Email" icon="email" type="email" placeholder="email@exemplo.com"></web-input>
        <web-input label="Senha" icon="lock" type="password"></web-input>
        <web-input label="Telefone" icon="phone" type="phone"></web-input>
        <web-input label="Localização" icon="location_on" type="cep"></web-input>
        <web-input label="Calendário" icon="calendar_today" type="date"></web-input>
        <web-input label="Pessoa" icon="person" placeholder="Nome"></web-input>
        <web-input label="Empresa" icon="business" placeholder="Nome da empresa"></web-input>
        <web-input label="Dinheiro" icon="attach_money" type="currency" prefix="R$"></web-input>
        <web-input label="Casa" icon="home" placeholder="Endereço"></web-input>
        <web-input label="Trabalho" icon="work" placeholder="Profissão"></web-input>
        <web-input label="Cartão" icon="credit_card" placeholder="Número do cartão"></web-input>
      </div>
    `
  })
};