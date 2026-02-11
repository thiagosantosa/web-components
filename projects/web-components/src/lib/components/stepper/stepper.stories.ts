import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StepperComponent, StepperStepComponent, Step } from './stepper.component';

const meta: Meta<StepperComponent> = {
  title: 'Layout/Stepper',
  component: StepperComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [StepperComponent, StepperStepComponent, ReactiveFormsModule],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `
# 🚶 Web Stepper

O stepper MAIS AVANÇADO do mercado Angular!

## 🚀 Diferenciais

| Feature | Material | PrimeNG | Ant Design | **Web Stepper** |
|---------|----------|---------|------------|-----------------|
| Form Validation | ⚠️ | ❌ | ❌ | ✅ |
| Optional Steps | ⚠️ | ❌ | ❌ | ✅ |
| Edit Completed | ❌ | ❌ | ❌ | ✅ |
| Save/Resume | ❌ | ❌ | ❌ | ✅ |
| Async Validation | ❌ | ❌ | ❌ | ✅ |

---

## 💡 Exemplos de Uso

### 1️⃣ Básico com Array de Steps

\`\`\`typescript
import { Component } from '@angular/core';
import { StepperComponent, Step } from './stepper.component';

@Component({
  selector: 'app-my-wizard',
  standalone: true,
  imports: [StepperComponent],
  template: \\\`
    <web-stepper
      [steps]="steps"
      
      (completed)="onComplete()">
    </web-stepper>
  \\\`
})
export class MyWizardComponent {
  steps: Step[] = [
    { label: 'Personal Info', icon: 'person' },
    { label: 'Address', icon: 'home' },
    { label: 'Review', icon: 'check_circle' }
  ];

  onComplete() {
    console.log('Wizard completed!');
  }
}
\`\`\`

### 2️⃣ Com Componentes Filhos (Content Projection)

\`\`\`typescript
import { Component } from '@angular/core';
import { StepperComponent, StepperStepComponent } from './stepper.component';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [StepperComponent, StepperStepComponent],
  template: \\\`
    <web-stepper orientation="horizontal">
      
      <web-stepper-step label="Cart" icon="shopping_cart">
        <h3>Your Cart</h3>
        <p>Review your items...</p>
      </web-stepper-step>
      
      <web-stepper-step label="Shipping" icon="local_shipping">
        <h3>Shipping Address</h3>
        <p>Enter your address...</p>
      </web-stepper-step>
      
      <web-stepper-step label="Payment" icon="payment">
        <h3>Payment Details</h3>
        <p>Enter payment info...</p>
      </web-stepper-step>
      
    </web-stepper>
  \\\`
})
export class CheckoutComponent {}
\`\`\`

### 3️⃣ Com Validação de Formulários

\`\`\`typescript
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StepperComponent, Step } from './stepper.component';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [ReactiveFormsModule, StepperComponent],
  templateUrl: './registration.component.html'
})
export class RegistrationComponent {
  personalForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email])
  });

  addressForm = new FormGroup({
    street: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required)
  });

  steps: Step[] = [
    {
      label: 'Personal Info',
      icon: 'person',
      validator: () => this.personalForm.valid
    },
    {
      label: 'Address',
      icon: 'home',
      validator: () => this.addressForm.valid
    },
    {
      label: 'Review',
      icon: 'check_circle'
    }
  ];

  onComplete() {
    if (this.personalForm.valid && this.addressForm.valid) {
      console.log('Registration complete!', {
        personal: this.personalForm.value,
        address: this.addressForm.value
      });
    }
  }
}
\`\`\`

**Template HTML:**
\`\`\`html
<web-stepper
  [steps]="steps"
  [linear]="true"
  
  (completed)="onComplete()">
</web-stepper>
\`\`\`

### 4️⃣ Com Steps Opcionais

\`\`\`typescript
steps: Step[] = [
  {
    label: 'Required Step 1',
    icon: 'looks_one'
  },
  {
    label: 'Optional Step',
    icon: 'looks_two',
    optional: true  // Pode pular
  },
  {
    label: 'Required Step 2',
    icon: 'looks_3'
  }
];
\`\`\`

### 5️⃣ Com Save & Resume

\`\`\`typescript
<web-stepper
  [steps]="steps"
  [saveState]="true"
  stateKey="my-wizard-progress">
</web-stepper>
\`\`\`

### 6️⃣ Validação Assíncrona

\`\`\`typescript
steps: Step[] = [
  {
    label: 'Email Verification',
    validator: async () => {
      // Simula chamada API
      const response = await this.api.verifyEmail(this.email);
      return response.valid;
    }
  }
];
\`\`\`

### 7️⃣ Steps Condicionais

\`\`\`typescript
steps: Step[] = [
  {
    label: 'User Type',
    icon: 'person'
  },
  {
    label: 'Business Info',
    icon: 'business',
    condition: () => this.userType === 'business'  // Só aparece se business
  },
  {
    label: 'Personal Info',
    icon: 'badge',
    condition: () => this.userType === 'individual'
  }
];
\`\`\`

### 8️⃣ Cores Customizadas

\`\`\`html
<web-stepper
  [steps]="steps"
  activeColor="#9c27b0"
  completedColor="#ff5722"
  inactiveColor="#e0e0e0">
</web-stepper>
\`\`\`

**Cores disponíveis:**
- \`activeColor\` - Cor do step atual
- \`completedColor\` - Cor dos steps completados  
- \`inactiveColor\` - Cor dos steps inativos
- \`errorColor\` - Cor do step com erro
- \`warningColor\` - Cor do step com aviso

---

## 🎨 Propriedades

| Propriedade | Tipo | Padrão | Descrição |
|-------------|------|--------|-----------|
| \`orientation\` | \`'horizontal' \\| 'vertical'\` | \`'horizontal'\` | Orientação do stepper |
| \`linear\` | \`boolean\` | \`true\` | Navegação linear (ordem) |
| \`steps\` | \`Step[]\` | \`[]\` | Array de steps |
| \`currentStepIndex\` | \`number\` | \`0\` | Index do step atual |
| \`editable\` | \`boolean\` | \`true\` | Permite editar steps anteriores |
| \`saveState\` | \`boolean\` | \`false\` | Salva progresso no localStorage |
| \`stateKey\` | \`string\` | \`'web-stepper-state'\` | Chave do localStorage |
| \`activeColor\` | \`string\` | \`'#007bff'\` | Cor do step ativo |
| \`completedColor\` | \`string\` | \`'#28a745'\` | Cor dos steps completados |
| \`inactiveColor\` | \`string\` | \`'#e5e7eb'\` | Cor dos steps inativos |
| \`errorColor\` | \`string\` | \`'#dc3545'\` | Cor do step com erro |
| \`warningColor\` | \`string\` | \`'#ffc107'\` | Cor do step com aviso |

## 📤 Eventos

| Evento | Tipo | Descrição |
|--------|------|-----------|
| \`stepChange\` | \`EventEmitter<StepChangeEvent>\` | Emitido ao mudar de step |
| \`completed\` | \`EventEmitter<void>\` | Emitido ao completar |
| \`stepValidation\` | \`EventEmitter<{index, valid}>\` | Emitido após validação |

## 🎯 Interface Step

\`\`\`typescript
interface Step {
  label: string;              // Nome do step
  description?: string;       // Descrição
  icon?: string;             // Ícone Material
  state?: StepState;         // Estado visual
  optional?: boolean;        // Step opcional
  editable?: boolean;        // Pode editar depois
  validator?: () => boolean | Promise<boolean>;  // Validador
  condition?: () => boolean; // Condição para exibir
}
\`\`\`

---

## 🎯 Casos de Uso

✅ **Checkout** - Carrinho → Shipping → Pagamento  
✅ **Registro** - Dados → Endereço → Confirmação  
✅ **Onboarding** - Boas-vindas → Tour → Setup  
✅ **Formulários** - Multi-page forms  
✅ **Quiz** - Perguntas em etapas  
✅ **Configuração** - Wizard de setup
        `
      }
    }
  }
};

export default meta;
type Story = StoryObj<StepperComponent>;

// ========== BÁSICO ==========

export const Horizontal: Story = {
  name: 'Horizontal (Padrão)',
  args: {
    orientation: 'horizontal',
    
    steps: [
      { label: 'Step 1', description: 'First step', icon: 'looks_one' },
      { label: 'Step 2', description: 'Second step', icon: 'looks_two' },
      { label: 'Step 3', description: 'Third step', icon: 'looks_3' }
    ]
  }
};

export const ContentProjection: Story = {
  name: '📘 Content Projection (Recomendado)',
  render: () => ({
    template: `
      <div style="padding: 2rem; max-width: 900px; font-family: Montserrat;">
        <h3>Uso com Content Projection</h3>
        
        <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 0.5rem; margin-bottom: 2rem;">
          <h4 style="margin-top: 0;">Código:</h4>
          <pre style="background: #1e1e1e; color: #d4d4d4; padding: 1rem; border-radius: 0.375rem; overflow-x: auto;"><code>&lt;web-stepper orientation="horizontal"&gt;
      
  &lt;web-stepper-step label="Cart" icon="shopping_cart"&gt;
    &lt;h3&gt;Your Cart&lt;/h3&gt;
    &lt;p&gt;Review your items...&lt;/p&gt;
  &lt;/web-stepper-step&gt;
  
  &lt;web-stepper-step label="Shipping" icon="local_shipping"&gt;
    &lt;h3&gt;Shipping Address&lt;/h3&gt;
    &lt;p&gt;Enter your address...&lt;/p&gt;
  &lt;/web-stepper-step&gt;
  
  &lt;web-stepper-step label="Payment" icon="payment"&gt;
    &lt;h3&gt;Payment Details&lt;/h3&gt;
    &lt;p&gt;Enter payment info...&lt;/p&gt;
  &lt;/web-stepper-step&gt;
  
&lt;/web-stepper&gt;</code></pre>
        </div>
        
        <web-stepper orientation="horizontal">
          
          <web-stepper-step label="Cart" icon="shopping_cart">
            <div style="padding: 2rem; background: #f0f9ff; border-radius: 0.5rem;">
              <h3 style="margin-top: 0; color: #007bff;">🛒 Your Cart</h3>
              <p style="color: #6c757d;">Review items in your cart before proceeding to checkout.</p>
              <ul style="line-height: 1.8;">
                <li>Item 1 - $29.99</li>
                <li>Item 2 - $19.99</li>
                <li>Item 3 - $39.99</li>
              </ul>
              <strong>Total: $89.97</strong>
            </div>
          </web-stepper-step>
          
          <web-stepper-step label="Shipping" icon="local_shipping">
            <div style="padding: 2rem; background: #fff3cd; border-radius: 0.5rem;">
              <h3 style="margin-top: 0; color: #856404;">🚚 Shipping Address</h3>
              <p style="color: #6c757d;">Enter your delivery address.</p>
              <div style="display: grid; gap: 1rem;">
                <input type="text" placeholder="Street Address" style="padding: 0.5rem; border: 1px solid #CED4DA; border-radius: 0.375rem;">
                <input type="text" placeholder="City" style="padding: 0.5rem; border: 1px solid #CED4DA; border-radius: 0.375rem;">
                <input type="text" placeholder="ZIP Code" style="padding: 0.5rem; border: 1px solid #CED4DA; border-radius: 0.375rem;">
              </div>
            </div>
          </web-stepper-step>
          
          <web-stepper-step label="Payment" icon="payment">
            <div style="padding: 2rem; background: #d4edda; border-radius: 0.5rem;">
              <h3 style="margin-top: 0; color: #155724;">💳 Payment Details</h3>
              <p style="color: #6c757d;">Enter your payment information securely.</p>
              <div style="display: grid; gap: 1rem;">
                <input type="text" placeholder="Card Number" style="padding: 0.5rem; border: 1px solid #CED4DA; border-radius: 0.375rem;">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                  <input type="text" placeholder="MM/YY" style="padding: 0.5rem; border: 1px solid #CED4DA; border-radius: 0.375rem;">
                  <input type="text" placeholder="CVV" style="padding: 0.5rem; border: 1px solid #CED4DA; border-radius: 0.375rem;">
                </div>
              </div>
            </div>
          </web-stepper-step>
          
        </web-stepper>
        
        <div style="margin-top: 2rem; padding: 1rem; background: #e6f7ff; border-radius: 0.375rem;">
          <strong>✅ Vantagens do Content Projection:</strong>
          <ul style="margin: 0.5rem 0; line-height: 1.8;">
            <li>Conteúdo HTML completo dentro de cada step</li>
            <li>Mais flexível que array de steps</li>
            <li>Fácil de adicionar forms, componentes, etc</li>
          </ul>
        </div>
      </div>
    `
  })
};

export const Vertical: Story = {
  name: 'Vertical',
  args: {
    orientation: 'vertical',
    
    steps: [
      { label: 'Personal Info', description: 'Enter your details', icon: 'person' },
      { label: 'Address', description: 'Shipping address', icon: 'home' },
      { label: 'Payment', description: 'Payment method', icon: 'payment' },
      { label: 'Review', description: 'Review order', icon: 'check_circle' }
    ]
  }
};

export const WithProgress: Story = {
  name: 'Com Barra de Progresso',
  args: {
    
    steps: [
      { label: 'Cart', icon: 'shopping_cart' },
      { label: 'Shipping', icon: 'local_shipping' },
      { label: 'Payment', icon: 'payment' },
      { label: 'Confirm', icon: 'check_circle' }
    ]
  }
};

// ========== FEATURES ==========

export const OptionalSteps: Story = {
  name: 'Com Steps Opcionais',
  args: {
    steps: [
      { label: 'Required Info', icon: 'info' },
      { label: 'Optional Details', icon: 'description', optional: true },
      { label: 'Optional Preferences', icon: 'tune', optional: true },
      { label: 'Finish', icon: 'check_circle' }
    ]
  }
};

export const WithIcons: Story = {
  name: 'Com Ícones Customizados',
  args: {
    steps: [
      { label: 'Account', icon: 'account_circle' },
      { label: 'Security', icon: 'security' },
      { label: 'Notifications', icon: 'notifications' },
      { label: 'Complete', icon: 'done_all' }
    ]
  }
};

export const NonLinear: Story = {
  name: 'Não Linear (Livre)',
  args: {
    linear: false,
    steps: [
      { label: 'Overview', icon: 'dashboard' },
      { label: 'Settings', icon: 'settings' },
      { label: 'Advanced', icon: 'build' },
      { label: 'Finish', icon: 'check' }
    ]
  }
};

export const CustomColors: Story = {
  name: '🎨 Cores Customizadas',
  render: () => ({
    props: {
      steps: [
        { label: 'Start', icon: 'play_arrow' },
        { label: 'Process', icon: 'sync' },
        { label: 'Review', icon: 'visibility' },
        { label: 'Complete', icon: 'done_all' }
      ]
    },
    template: `
      <div style="padding: 2rem; max-width: 1000px; font-family: Montserrat;">
        <h2 style="margin-top: 0;">🎨 Customização de Cores</h2>
        
        <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 0.5rem; margin-bottom: 2rem;">
          <h4 style="margin-top: 0;">📝 Como Usar:</h4>
          <pre style="background: #1e1e1e; color: #d4d4d4; padding: 1rem; border-radius: 0.375rem; overflow-x: auto; font-size: 0.875rem;"><code>&lt;web-stepper
  [steps]="steps"
  activeColor="#9c27b0"        &lt;!-- Roxo para step atual --&gt;
  completedColor="#ff5722"     &lt;!-- Laranja para completados --&gt;
  inactiveColor="#e0e0e0"&gt;     &lt;!-- Cinza claro para inativos --&gt;
&lt;/web-stepper&gt;</code></pre>
        </div>
        
        <div style="margin-bottom: 3rem;">
          <h3>Exemplo 1: Tema Roxo & Laranja 🟣🟠</h3>
          <div style="padding: 1.5rem; background: white; border-radius: 0.5rem; border: 2px solid #e5e7eb;">
            <web-stepper
              [steps]="steps"
              activeColor="#9c27b0"
              completedColor="#ff5722"
              inactiveColor="#e0e0e0">
            </web-stepper>
          </div>
          <p style="margin-top: 1rem; color: #6c757d; font-size: 0.875rem;">
            <strong>Ativo:</strong> #9c27b0 (Roxo) | 
            <strong>Completado:</strong> #ff5722 (Laranja) | 
            <strong>Inativo:</strong> #e0e0e0 (Cinza)
          </p>
        </div>
        
        <div style="margin-bottom: 3rem;">
          <h3>Exemplo 2: Tema Rosa & Azul 🌸💙</h3>
          <div style="padding: 1.5rem; background: white; border-radius: 0.5rem; border: 2px solid #e5e7eb;">
            <web-stepper
              [steps]="steps"
              activeColor="#e91e63"
              completedColor="#1976d2"
              inactiveColor="#f5f5f5">
            </web-stepper>
          </div>
          <p style="margin-top: 1rem; color: #6c757d; font-size: 0.875rem;">
            <strong>Ativo:</strong> #e91e63 (Rosa) | 
            <strong>Completado:</strong> #1976d2 (Azul) | 
            <strong>Inativo:</strong> #f5f5f5 (Cinza Claro)
          </p>
        </div>
        
        <div style="margin-bottom: 3rem;">
          <h3>Exemplo 3: Tema Verde & Dourado 🌿✨</h3>
          <div style="padding: 1.5rem; background: white; border-radius: 0.5rem; border: 2px solid #e5e7eb;">
            <web-stepper
              [steps]="steps"
              activeColor="#00bcd4"
              completedColor="#ffc107"
              inactiveColor="#eeeeee">
            </web-stepper>
          </div>
          <p style="margin-top: 1rem; color: #6c757d; font-size: 0.875rem;">
            <strong>Ativo:</strong> #00bcd4 (Ciano) | 
            <strong>Completado:</strong> #ffc107 (Dourado) | 
            <strong>Inativo:</strong> #eeeeee (Cinza)
          </p>
        </div>
        
        <div style="margin-bottom: 3rem;">
          <h3>Exemplo 4: Tema Dark Mode 🌙</h3>
          <div style="padding: 1.5rem; background: #1e1e1e; border-radius: 0.5rem; border: 2px solid #333;">
            <web-stepper
              [steps]="steps"
              activeColor="#bb86fc"
              completedColor="#03dac6"
              inactiveColor="#3c3c3c">
            </web-stepper>
          </div>
          <p style="margin-top: 1rem; color: #6c757d; font-size: 0.875rem;">
            <strong>Ativo:</strong> #bb86fc (Roxo Claro) | 
            <strong>Completado:</strong> #03dac6 (Verde Água) | 
            <strong>Inativo:</strong> #3c3c3c (Cinza Escuro)
          </p>
        </div>
        
        <div style="padding: 1.5rem; background: #e6f7ff; border-radius: 0.5rem; border-left: 4px solid #007bff;">
          <h4 style="margin-top: 0;">💡 Todas as Propriedades de Cores:</h4>
          <table style="width: 100%; border-collapse: collapse; font-size: 0.875rem;">
            <thead>
              <tr style="background: #f8f9fa;">
                <th style="padding: 0.75rem; text-align: left; border-bottom: 2px solid #dee2e6;">Propriedade</th>
                <th style="padding: 0.75rem; text-align: left; border-bottom: 2px solid #dee2e6;">Padrão</th>
                <th style="padding: 0.75rem; text-align: left; border-bottom: 2px solid #dee2e6;">Descrição</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="padding: 0.75rem; border-bottom: 1px solid #dee2e6;"><code>activeColor</code></td>
                <td style="padding: 0.75rem; border-bottom: 1px solid #dee2e6;">#007bff</td>
                <td style="padding: 0.75rem; border-bottom: 1px solid #dee2e6;">Cor do step atual (em progresso)</td>
              </tr>
              <tr>
                <td style="padding: 0.75rem; border-bottom: 1px solid #dee2e6;"><code>completedColor</code></td>
                <td style="padding: 0.75rem; border-bottom: 1px solid #dee2e6;">#28a745</td>
                <td style="padding: 0.75rem; border-bottom: 1px solid #dee2e6;">Cor dos steps completados (com ✓)</td>
              </tr>
              <tr>
                <td style="padding: 0.75rem; border-bottom: 1px solid #dee2e6;"><code>inactiveColor</code></td>
                <td style="padding: 0.75rem; border-bottom: 1px solid #dee2e6;">#e5e7eb</td>
                <td style="padding: 0.75rem; border-bottom: 1px solid #dee2e6;">Cor dos steps não visitados</td>
              </tr>
              <tr>
                <td style="padding: 0.75rem; border-bottom: 1px solid #dee2e6;"><code>errorColor</code></td>
                <td style="padding: 0.75rem; border-bottom: 1px solid #dee2e6;">#dc3545</td>
                <td style="padding: 0.75rem; border-bottom: 1px solid #dee2e6;">Cor do step com erro</td>
              </tr>
              <tr>
                <td style="padding: 0.75rem;"><code>warningColor</code></td>
                <td style="padding: 0.75rem;">#ffc107</td>
                <td style="padding: 0.75rem;">Cor do step com aviso</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div style="margin-top: 2rem; padding: 1rem; background: #fff3cd; border-radius: 0.375rem; border-left: 4px solid #ffc107;">
          <strong>⚡ Dica:</strong> Use cores que contrastem bem com branco (texto interno dos círculos) para melhor legibilidade!
        </div>
      </div>
    `
  })
};

// ========== VALIDAÇÃO ==========

export const TestBackButton: Story = {
  name: '🔙 Teste do Botão Back',
  render: () => ({
    props: {
      currentStep: 0,
      steps: [
        { label: 'Step 1', description: 'Primeiro step', icon: 'looks_one' },
        { label: 'Step 2', description: 'Segundo step', icon: 'looks_two' },
        { label: 'Step 3', description: 'Terceiro step', icon: 'looks_3' },
        { label: 'Step 4', description: 'Quarto step', icon: 'looks_4' }
      ]
    },
    template: `
      <div style="padding: 2rem; max-width: 900px; font-family: Montserrat;">
        <h3>Teste do Botão Back</h3>
        
        <div style="background: #e6f7ff; padding: 1.5rem; border-radius: 0.5rem; margin-bottom: 2rem;">
          <h4 style="margin-top: 0;">🧪 Como testar:</h4>
          <ol style="line-height: 1.8;">
            <li>Clique em <strong>"Next"</strong> para avançar para Step 2</li>
            <li>Clique em <strong>"Next"</strong> novamente para Step 3</li>
            <li>Clique em <strong>"Back"</strong> - deve voltar para Step 2 <strong>com 1 clique</strong></li>
            <li>Clique em <strong>"Back"</strong> novamente - deve voltar para Step 1</li>
            <li>✅ Se funcionar com 1 clique apenas, o bug está corrigido!</li>
          </ol>
        </div>
        
        <web-stepper
          [steps]="steps"
          
          [linear]="false">
        </web-stepper>
        
        <div style="margin-top: 2rem; padding: 1rem; background: #fff3cd; border-radius: 0.375rem;">
          <strong>💡 Correção Aplicada:</strong>
          <ul style="margin: 0.5rem 0; line-height: 1.8;">
            <li>✅ Removida validação assíncrona do botão Back</li>
            <li>✅ Validação agora é <code>sync</code> para navegação</li>
            <li>✅ Estado do botão atualiza corretamente</li>
            <li>✅ Sem necessidade de cliques duplos</li>
          </ul>
        </div>
      </div>
    `
  })
};

export const WithValidation: Story = {
  name: '📘 Com Validação de Forms',
  render: () => ({
    props: {
      personalForm: new FormGroup({
        name: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email])
      }),
      addressForm: new FormGroup({
        street: new FormControl('', Validators.required),
        city: new FormControl('', Validators.required),
        zip: new FormControl('', Validators.required)
      }),
      getSteps() {
        return [
          {
            label: 'Personal Info',
            description: 'Name and email',
            icon: 'person',
            validator: () => this['personalForm'].valid
          },
          {
            label: 'Address',
            description: 'Shipping address',
            icon: 'home',
            validator: () => this['addressForm'].valid
          },
          {
            label: 'Review',
            description: 'Confirm details',
            icon: 'check_circle'
          }
        ];
      },
      onComplete() {
        console.log('Form completed!');
        alert('Registration complete!');
      }
    },
    template: `
      <div style="padding: 2rem; max-width: 900px; font-family: Montserrat;">
        <h3>Formulário com Validação</h3>
        
        <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 0.5rem; margin-bottom: 2rem;">
          <h4 style="margin-top: 0;">Exemplo TypeScript:</h4>
          <pre style="background: #1e1e1e; color: #d4d4d4; padding: 1rem; border-radius: 0.375rem; overflow-x: auto; font-size: 0.875rem;"><code>steps: Step[] = [
  {
    label: 'Personal Info',
    validator: () => this.personalForm.valid  // ✅ Validação
  },
  {
    label: 'Address',
    validator: () => this.addressForm.valid
  }
];</code></pre>
        </div>
        
        <web-stepper
          [steps]="getSteps()"
          [linear]="true"
          
          (completed)="onComplete()">
        </web-stepper>
        
        <div style="margin-top: 2rem; padding: 1rem; background: #e6f7ff; border-radius: 0.375rem;">
          <strong>💡 Como funciona:</strong>
          <ul style="margin: 0.5rem 0; line-height: 1.8;">
            <li>Cada step tem um <code>validator</code></li>
            <li>Botão "Next" só ativa se validação passar</li>
            <li>Suporta validação síncrona e assíncrona</li>
          </ul>
        </div>
      </div>
    `
  })
};

// ========== CASOS DE USO ==========

export const CheckoutFlow: Story = {
  name: '🛒 Checkout E-commerce',
  args: {
    orientation: 'horizontal',
    
    linear: true,
    steps: [
      {
        label: 'Cart',
        description: 'Review items',
        icon: 'shopping_cart'
      },
      {
        label: 'Shipping',
        description: 'Delivery address',
        icon: 'local_shipping'
      },
      {
        label: 'Payment',
        description: 'Payment method',
        icon: 'payment'
      },
      {
        label: 'Confirm',
        description: 'Place order',
        icon: 'check_circle'
      }
    ]
  }
};

export const UserRegistration: Story = {
  name: '✍️ Cadastro de Usuário',
  args: {
    
    steps: [
      {
        label: 'Account',
        description: 'Email and password',
        icon: 'account_circle'
      },
      {
        label: 'Profile',
        description: 'Personal details',
        icon: 'badge'
      },
      {
        label: 'Preferences',
        description: 'Optional settings',
        icon: 'tune',
        optional: true
      },
      {
        label: 'Complete',
        description: 'Finish setup',
        icon: 'done_all'
      }
    ]
  }
};

export const Onboarding: Story = {
  name: '👋 Onboarding Flow',
  args: {
    orientation: 'vertical',
    
    linear: false,
    steps: [
      {
        label: 'Welcome',
        description: 'Introduction',
        icon: 'waving_hand'
      },
      {
        label: 'Features',
        description: 'Product tour',
        icon: 'lightbulb'
      },
      {
        label: 'Setup',
        description: 'Configure app',
        icon: 'settings'
      },
      {
        label: 'Ready',
        description: 'Start using',
        icon: 'rocket_launch'
      }
    ]
  }
};

export const BookingWizard: Story = {
  name: '🏨 Reserva de Hotel',
  args: {
    
    steps: [
      {
        label: 'Destination',
        description: 'Where to?',
        icon: 'location_on'
      },
      {
        label: 'Dates',
        description: 'Check-in/out',
        icon: 'calendar_today'
      },
      {
        label: 'Rooms',
        description: 'Guests & rooms',
        icon: 'hotel'
      },
      {
        label: 'Extras',
        description: 'Add-ons',
        icon: 'add_circle',
        optional: true
      },
      {
        label: 'Payment',
        description: 'Complete booking',
        icon: 'payment'
      }
    ]
  }
};

// ========== COMPARAÇÃO ==========

export const Comparison: Story = {
  name: '🎯 Comparação de Features',
  render: () => ({
    template: `
      <div style="font-family: Montserrat, sans-serif; padding: 2rem;">
        <h2>Comparação de Features</h2>
        <p style="color: #6c757d; margin-bottom: 2rem;">
          Todas as funcionalidades do Web Stepper
        </p>
        
        <div style="display: grid; gap: 2rem;">
          
          <div style="padding: 1.5rem; background: #f0f9ff; border-radius: 0.5rem; border-left: 4px solid #007bff;">
            <h3 style="margin-top: 0;">✨ Features Principais</h3>
            <ul style="line-height: 1.8;">
              <li>✅ <strong>Horizontal/Vertical:</strong> Ambos layouts</li>
              <li>✅ <strong>Progress Bar:</strong> Barra visual de progresso</li>
              <li>✅ <strong>Linear/Non-linear:</strong> Controle de navegação</li>
              <li>✅ <strong>Optional Steps:</strong> Steps opcionais (skip)</li>
              <li>✅ <strong>Custom Icons:</strong> Ícones Material personalizáveis</li>
              <li>✅ <strong>Form Validation:</strong> Validação integrada</li>
              <li>✅ <strong>Edit Completed:</strong> Editar steps concluídos</li>
              <li>✅ <strong>Save & Resume:</strong> Salva no localStorage</li>
            </ul>
          </div>
          
          <div style="padding: 1.5rem; background: #fff3cd; border-radius: 0.5rem; border-left: 4px solid #ffc107;">
            <h3 style="margin-top: 0;">🎨 Estados Visuais</h3>
            <ul style="line-height: 1.8;">
              <li>✅ <strong>Active:</strong> Step atual (azul)</li>
              <li>✅ <strong>Completed:</strong> Step concluído (verde + ✓)</li>
              <li>✅ <strong>Error:</strong> Step com erro (vermelho)</li>
              <li>✅ <strong>Warning:</strong> Step com aviso (amarelo)</li>
              <li>✅ <strong>Disabled:</strong> Step desabilitado</li>
              <li>✅ <strong>Optional:</strong> Badge "Optional"</li>
            </ul>
          </div>
          
          <div style="padding: 1.5rem; background: #d1ecf1; border-radius: 0.5rem; border-left: 4px solid #17a2b8;">
            <h3 style="margin-top: 0;">🔄 Navegação</h3>
            <ul style="line-height: 1.8;">
              <li>✅ <strong>Next/Previous:</strong> Botões de navegação</li>
              <li>✅ <strong>Click Header:</strong> Clique no step para ir</li>
              <li>✅ <strong>Programmatic:</strong> goToStep(), reset()</li>
              <li>✅ <strong>Validation Guards:</strong> Bloqueia se inválido</li>
              <li>✅ <strong>Keyboard:</strong> Navegação por teclado</li>
            </ul>
          </div>
          
          <div style="padding: 1.5rem; background: #d4edda; border-radius: 0.5rem; border-left: 4px solid #28a745;">
            <h3 style="margin-top: 0;">📱 Responsivo</h3>
            <ul style="line-height: 1.8;">
              <li>✅ <strong>Desktop:</strong> Horizontal completo</li>
              <li>✅ <strong>Tablet:</strong> Horizontal compacto</li>
              <li>✅ <strong>Mobile:</strong> Scroll horizontal</li>
              <li>✅ <strong>Touch:</strong> Touch-friendly</li>
            </ul>
          </div>
          
        </div>
        
        <div style="margin-top: 2rem; padding: 1.5rem; background: white; border-radius: 0.5rem; border: 2px solid #e5e7eb;">
          <h3 style="margin-top: 0;">📊 Tabela Comparativa</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="background: #f9fafb;">
                <th style="padding: 0.75rem; text-align: left; border-bottom: 2px solid #e5e7eb;">Feature</th>
                <th style="padding: 0.75rem; text-align: center; border-bottom: 2px solid #e5e7eb;">Material</th>
                <th style="padding: 0.75rem; text-align: center; border-bottom: 2px solid #e5e7eb;">PrimeNG</th>
                <th style="padding: 0.75rem; text-align: center; border-bottom: 2px solid #e5e7eb;">Ant Design</th>
                <th style="padding: 0.75rem; text-align: center; border-bottom: 2px solid #e5e7eb;">Web Stepper</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="padding: 0.75rem; border-bottom: 1px solid #e5e7eb;">Progress %</td>
                <td style="padding: 0.75rem; text-align: center; border-bottom: 1px solid #e5e7eb;">❌</td>
                <td style="padding: 0.75rem; text-align: center; border-bottom: 1px solid #e5e7eb;">❌</td>
                <td style="padding: 0.75rem; text-align: center; border-bottom: 1px solid #e5e7eb;">❌</td>
                <td style="padding: 0.75rem; text-align: center; border-bottom: 1px solid #e5e7eb;">✅</td>
              </tr>
              <tr>
                <td style="padding: 0.75rem; border-bottom: 1px solid #e5e7eb;">Form Validation</td>
                <td style="padding: 0.75rem; text-align: center; border-bottom: 1px solid #e5e7eb;">⚠️</td>
                <td style="padding: 0.75rem; text-align: center; border-bottom: 1px solid #e5e7eb;">❌</td>
                <td style="padding: 0.75rem; text-align: center; border-bottom: 1px solid #e5e7eb;">❌</td>
                <td style="padding: 0.75rem; text-align: center; border-bottom: 1px solid #e5e7eb;">✅</td>
              </tr>
              <tr>
                <td style="padding: 0.75rem; border-bottom: 1px solid #e5e7eb;">Optional Steps</td>
                <td style="padding: 0.75rem; text-align: center; border-bottom: 1px solid #e5e7eb;">⚠️</td>
                <td style="padding: 0.75rem; text-align: center; border-bottom: 1px solid #e5e7eb;">❌</td>
                <td style="padding: 0.75rem; text-align: center; border-bottom: 1px solid #e5e7eb;">❌</td>
                <td style="padding: 0.75rem; text-align: center; border-bottom: 1px solid #e5e7eb;">✅</td>
              </tr>
              <tr>
                <td style="padding: 0.75rem; border-bottom: 1px solid #e5e7eb;">Edit Completed</td>
                <td style="padding: 0.75rem; text-align: center; border-bottom: 1px solid #e5e7eb;">❌</td>
                <td style="padding: 0.75rem; text-align: center; border-bottom: 1px solid #e5e7eb;">❌</td>
                <td style="padding: 0.75rem; text-align: center; border-bottom: 1px solid #e5e7eb;">❌</td>
                <td style="padding: 0.75rem; text-align: center; border-bottom: 1px solid #e5e7eb;">✅</td>
              </tr>
              <tr>
                <td style="padding: 0.75rem;">Save/Resume</td>
                <td style="padding: 0.75rem; text-align: center;">❌</td>
                <td style="padding: 0.75rem; text-align: center;">❌</td>
                <td style="padding: 0.75rem; text-align: center;">❌</td>
                <td style="padding: 0.75rem; text-align: center;">✅</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `,
    props: {}
  })
};