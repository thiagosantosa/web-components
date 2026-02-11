import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TextareaComponent, Template } from './textarea.component';

const demoTemplates: Template[] = [
  {
    label: 'Greeting',
    content: 'Hi there!\n\nThank you for reaching out. How can I help you today?',
    icon: 'waving_hand'
  },
  {
    label: 'Thank You',
    content: 'Thank you for your message. We appreciate your feedback!',
    icon: 'favorite'
  },
  {
    label: 'Follow Up',
    content: 'Just following up on my previous message. Did you have a chance to review it?',
    icon: 'schedule'
  }
];

const meta: Meta<TextareaComponent> = {
  title: 'Form Controls/Textarea',
  component: TextareaComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [TextareaComponent, ReactiveFormsModule],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `
# 📝 Web Textarea

O textarea MAIS AVANÇADO do mercado Angular!

## 🚀 Diferenciais

| Feature | Material | PrimeNG | Ant Design | **Web Textarea** |
|---------|----------|---------|------------|------------------|
| Auto-resize | ❌ | ⚠️ | ✅ | ✅ |
| Char Counter | ❌ | ❌ | ✅ | ✅ |
| Word Counter | ❌ | ❌ | ❌ | ✅ |
| Markdown Preview | ❌ | ❌ | ❌ | ✅ |
| Emoji Picker | ❌ | ❌ | ❌ | ✅ |
| Templates | ❌ | ❌ | ❌ | ✅ |
| Toolbar | ❌ | ❌ | ❌ | ✅ |
| Auto-save | ❌ | ❌ | ❌ | ✅ |

---

## 💡 Exemplos de Uso

### 1️⃣ Com ngModel (Two-way Binding)

\`\`\`typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TextareaComponent } from './textarea.component';

@Component({
  selector: 'app-my-form',
  standalone: true,
  imports: [FormsModule, TextareaComponent],
  template: \\\`
    <web-textarea
      label="Message"
      placeholder="Type your message..."
      [(ngModel)]="message"
      [showCounter]="true"
      [maxLength]="500">
    </web-textarea>
    
    <p>Current: {{ message }}</p>
  \\\`
})
export class MyFormComponent {
  message = '';
}
\`\`\`

### 2️⃣ Com formControlName (Reactive Forms)

**Component TypeScript:**
\`\`\`typescript
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { TextareaComponent } from './textarea.component';

@Component({
  selector: 'app-my-form',
  standalone: true,
  imports: [ReactiveFormsModule, TextareaComponent],
  templateUrl: './my-form.component.html'
})
export class MyFormComponent {
  form = new FormGroup({
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(500)
    ])
  });

  onSubmit() {
    if (this.form.valid) {
      console.log('Submitted:', this.form.value);
    }
  }

  isFieldInvalid(field: string): boolean {
    const control = this.form.get(field);
    return !!(control?.invalid && control?.touched);
  }

  getErrorMessage(field: string): string {
    const control = this.form.get(field);
    if (control?.hasError('required')) return 'Campo obrigatório';
    if (control?.hasError('minlength')) return 'Mínimo 10 caracteres';
    if (control?.hasError('maxlength')) return 'Máximo 500 caracteres';
    return '';
  }
}
\`\`\`

**Template HTML:**
\`\`\`html
<form [formGroup]="form" (ngSubmit)="onSubmit()">
  <web-textarea
    label="Description *"
    placeholder="Enter description..."
    formControlName="description"
    [showCounter]="true"
    [maxLength]="500"
    [error]="isFieldInvalid('description')"
    [errorMessage]="getErrorMessage('description')"
    helperText="Min 10, max 500 characters">
  </web-textarea>
  
  <button type="submit" [disabled]="form.invalid">
    Submit
  </button>
</form>
\`\`\`

### 3️⃣ Com Markdown Preview

\`\`\`html
<web-textarea
  label="Blog Post"
  placeholder="Write using markdown..."
  [showToolbar]="true"
  [showMarkdownPreview]="true"
  [(ngModel)]="content">
</web-textarea>
\`\`\`

### 4️⃣ Com Templates

\`\`\`typescript
templates: Template[] = [
  {
    label: 'Greeting',
    content: 'Hi there!\\n\\nHow can I help you?',
    icon: 'waving_hand'
  },
  {
    label: 'Thank You',
    content: 'Thank you for your message!',
    icon: 'favorite'
  }
];
\`\`\`

\`\`\`html
<web-textarea
  label="Message"
  [showTemplates]="true"
  [templates]="templates"
  [(ngModel)]="message">
</web-textarea>
\`\`\`

### 5️⃣ Com Emoji Picker

\`\`\`html
<web-textarea
  label="Comment"
  placeholder="Add a comment..."
  [showEmojiPicker]="true"
  [autoResize]="true"
  [(ngModel)]="comment">
</web-textarea>
\`\`\`

---

## 🎨 Propriedades Principais

| Propriedade | Tipo | Padrão | Descrição |
|-------------|------|--------|-----------|
| \`label\` | \`string\` | \`''\` | Label do campo |
| \`placeholder\` | \`string\` | \`''\` | Texto placeholder |
| \`disabled\` | \`boolean\` | \`false\` | Desabilita o campo |
| \`required\` | \`boolean\` | \`false\` | Campo obrigatório |
| \`autoResize\` | \`boolean\` | \`true\` | Auto-resize ao digitar |
| \`showCounter\` | \`boolean\` | \`true\` | Mostra contador de caracteres |
| \`showWordCount\` | \`boolean\` | \`true\` | Mostra contador de palavras |
| \`maxLength\` | \`number\` | \`undefined\` | Limite máximo de caracteres |
| \`showToolbar\` | \`boolean\` | \`true\` | Mostra toolbar de formatação |
| \`showMarkdownPreview\` | \`boolean\` | \`false\` | Preview markdown em tempo real |
| \`showEmojiPicker\` | \`boolean\` | \`true\` | Seletor de emojis |
| \`showTemplates\` | \`boolean\` | \`true\` | Mostra templates |
| \`templates\` | \`Template[]\` | \`[]\` | Array de templates |
| \`autoSave\` | \`boolean\` | \`false\` | Auto-save no localStorage |

## ⌨️ Keyboard Shortcuts

- **Ctrl+B** - Bold (\`**text**\`)
- **Ctrl+I** - Italic (\`*text*\`)
- **Ctrl+K** - Link (\`[text](url)\`)
- **Ctrl+Enter** - Submit form

## 📤 Eventos

- \`valueChange\` - Emitido quando o valor muda
- \`focused\` - Emitido ao focar no campo
- \`blurred\` - Emitido ao perder foco

---

## 🎯 Casos de Uso

✅ **Blog/CMS** - Editor markdown com preview  
✅ **Chat/Messaging** - Com emojis e mentions  
✅ **Comments** - Auto-resize e contador  
✅ **Forms** - Validação avançada  
✅ **Support Tickets** - Templates reutilizáveis  
✅ **Email Composer** - Formatação rich text
        `
      }
    }
  }
};

export default meta;
type Story = StoryObj<TextareaComponent>;

// ========== BÁSICO ==========

export const Default: Story = {
  args: {
    label: 'Message',
    placeholder: 'Type your message here...'
  }
};

export const WithCounter: Story = {
  name: 'Com Contador',
  args: {
    label: 'Comment',
    placeholder: 'Write a comment...',
    showCounter: true,
    showWordCount: true,
    maxLength: 500
  }
};

export const AutoResize: Story = {
  name: 'Auto-Resize',
  args: {
    label: 'Auto-resizing Textarea',
    placeholder: 'Type and watch it grow...',
    autoResize: true,
    minHeight: 100,
    maxHeight: 400,
    helperText: 'This textarea grows as you type'
  }
};

export const WithToolbar: Story = {
  name: 'Com Toolbar',
  args: {
    label: 'Rich Text',
    placeholder: 'Use the toolbar to format...',
    showToolbar: true,
    helperText: 'Use Ctrl+B (bold), Ctrl+I (italic), Ctrl+K (link)'
  }
};

// ========== FEATURES ==========

export const MarkdownPreview: Story = {
  name: 'Markdown Preview',
  args: {
    label: 'Write in Markdown',
    placeholder: 'Try: **bold**, *italic*, [link](url)',
    showToolbar: true,
    showMarkdownPreview: true,
    helperText: 'Live markdown preview below'
  }
};

export const WithTemplates: Story = {
  name: 'Com Templates',
  args: {
    label: 'Message with Templates',
    placeholder: 'Or use a template...',
    showToolbar: true,
    showTemplates: true,
    templates: demoTemplates,
    helperText: 'Click the template button in toolbar'
  }
};

export const WithEmoji: Story = {
  name: 'Com Emoji Picker',
  args: {
    label: 'Message',
    placeholder: 'Add some emojis! 😊',
    showToolbar: true,
    showEmojiPicker: true,
    helperText: 'Click the emoji button to insert emojis'
  }
};

export const Complete: Story = {
  name: 'Completo (Todas Features)',
  args: {
    label: 'Complete Textarea',
    placeholder: 'Type here...',
    showToolbar: true,
    showMarkdownPreview: true,
    showEmojiPicker: true,
    showTemplates: true,
    templates: demoTemplates,
    showCounter: true,
    showWordCount: true,
    maxLength: 1000,
    helperText: 'Full-featured textarea with all options'
  }
};

// ========== VALIDAÇÃO ==========

export const Required: Story = {
  name: 'Campo Obrigatório',
  args: {
    label: 'Required Field',
    placeholder: 'This field is required',
    required: true,
    error: false,
    errorMessage: 'This field is required'
  }
};

export const WithError: Story = {
  name: 'Com Erro',
  args: {
    label: 'Description',
    placeholder: 'Enter description',
    error: true,
    errorMessage: 'Description must be at least 10 characters',
    helperText: 'Min 10 characters'
  }
};

export const WithSuccess: Story = {
  name: 'Com Sucesso',
  args: {
    label: 'Message',
    placeholder: 'Your message',
    success: true,
    successMessage: 'Message saved successfully!'
  }
};

export const CharacterLimit: Story = {
  name: 'Limite de Caracteres',
  args: {
    label: 'Tweet',
    placeholder: 'What\'s happening?',
    maxLength: 280,
    showCounter: true,
    helperText: 'Max 280 characters (like Twitter)'
  }
};

// ========== FORMULÁRIO ==========

export const WithNgModel: Story = {
  name: '📘 Usando ngModel',
  render: (args) => ({
    props: {
      ...args,
      message: '',
      onValueChange(value: string) {
        this['message'] = value;
        console.log('Value changed:', value);
      }
    },
    template: `
      <div style="padding: 2rem; max-width: 800px; font-family: Montserrat;">
        <h3>Exemplo com [(ngModel)]</h3>
        
        <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 0.5rem; margin-bottom: 2rem;">
          <h4 style="margin-top: 0;">Component TypeScript:</h4>
          <pre style="background: #1e1e1e; color: #d4d4d4; padding: 1rem; border-radius: 0.375rem; overflow-x: auto;"><code>import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TextareaComponent } from './textarea.component';

@Component({
  selector: 'app-my-form',
  standalone: true,
  imports: [FormsModule, TextareaComponent],
  template: \\\`
    &lt;web-textarea
      label="Message"
      placeholder="Type your message..."
      [(ngModel)]="message"
      [showCounter]="true"
      [maxLength]="500"&gt;
    &lt;/web-textarea&gt;
    
    &lt;p&gt;Current value: {{ '{' }}{{ '{' }} message }}{{ '}' }}{{ '}' }}&lt;/p&gt;
  \\\`
})
export class MyFormComponent {
  message = '';
}</code></pre>
        </div>
        
        <web-textarea
          label="Message"
          placeholder="Type your message..."
          [(ngModel)]="message"
          [showCounter]="true"
          [maxLength]="500"
          (valueChange)="onValueChange($event)">
        </web-textarea>
        
        <div style="margin-top: 1rem; padding: 1rem; background: #e6f7ff; border-radius: 0.375rem;">
          <strong>Current value:</strong>
          <pre style="margin: 0.5rem 0; white-space: pre-wrap;">{{ message || '(empty)' }}</pre>
          <div style="color: #6c757d; font-size: 0.875rem;">
            Length: {{ message.length }} characters
          </div>
        </div>
      </div>
    `
  }),
  args: {}
};

export const WithFormControl: Story = {
  name: '📘 Usando formControlName',
  render: () => ({
    props: {
      form: new FormGroup({
        description: new FormControl('', [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(500)
        ])
      }),
      onSubmit() {
        if (this['form'].valid) {
          console.log('Form submitted:', this['form'].value);
          alert('Form submitted! Check console.');
        } else {
          Object.keys(this['form'].controls).forEach(key => {
            this['form'].get(key)?.markAsTouched();
          });
        }
      },
      isFieldInvalid(field: string) {
        const control = this['form'].get(field);
        return !!(control?.invalid && control?.touched);
      },
      getErrorMessage(field: string) {
        const control = this['form'].get(field);
        if (control?.hasError('required')) {
          return 'This field is required';
        }
        if (control?.hasError('minlength')) {
          const min = control.getError('minlength').requiredLength;
          return 'Minimum ' + min + ' characters required';
        }
        if (control?.hasError('maxlength')) {
          const max = control.getError('maxlength').requiredLength;
          return 'Maximum ' + max + ' characters allowed';
        }
        return '';
      },
      getFormJson() {
        return JSON.stringify(this['form'].value, null, 2);
      }
    },
    template: `
      <div style="padding: 2rem; max-width: 800px; font-family: Montserrat;">
        <h3>Exemplo com formControlName</h3>
        
        <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 0.5rem; margin-bottom: 2rem;">
          <h4 style="margin-top: 0;">Component TypeScript:</h4>
          <pre style="background: #1e1e1e; color: #d4d4d4; padding: 1rem; border-radius: 0.375rem; overflow-x: auto; font-size: 0.875rem;"><code>import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-my-form',
  standalone: true,
  imports: [ReactiveFormsModule, TextareaComponent],
  templateUrl: './my-form.component.html'
})
export class MyFormComponent {
  form = new FormGroup({
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(500)
    ])
  });

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
    }
  }

  isFieldInvalid(field: string): boolean {
    const control = this.form.get(field);
    return !!(control?.invalid && control?.touched);
  }
}</code></pre>

          <h4>Template HTML:</h4>
          <pre style="background: #1e1e1e; color: #d4d4d4; padding: 1rem; border-radius: 0.375rem; overflow-x: auto; font-size: 0.875rem;"><code>&lt;form [formGroup]="form" (ngSubmit)="onSubmit()"&gt;
  &lt;web-textarea
    label="Description *"
    formControlName="description"
    [showCounter]="true"
    [maxLength]="500"
    [error]="isFieldInvalid('description')"&gt;
  &lt;/web-textarea&gt;

  &lt;button type="submit"&gt;Submit&lt;/button&gt;
&lt;/form&gt;</code></pre>
        </div>
        
        <form [formGroup]="form" (ngSubmit)="onSubmit()">
          <web-textarea
            label="Description *"
            placeholder="Enter description (min 10 chars)"
            formControlName="description"
            [showCounter]="true"
            [maxLength]="500"
            [error]="isFieldInvalid('description')"
            [errorMessage]="getErrorMessage('description')"
            helperText="Between 10 and 500 characters">
          </web-textarea>
          
          <div style="margin-top: 1rem; display: flex; gap: 1rem;">
            <button type="button" (click)="form.reset()" style="padding: 0.75rem 1.5rem; border: 1px solid #CED4DA; background: white; border-radius: 0.375rem; font-family: Montserrat; cursor: pointer;">
              Reset
            </button>
            <button type="submit" [disabled]="form.invalid" style="padding: 0.75rem 1.5rem; border: none; background: #007bff; color: white; border-radius: 0.375rem; font-family: Montserrat; font-weight: 600; cursor: pointer;" [style.opacity]="form.invalid ? '0.5' : '1'" [style.cursor]="form.invalid ? 'not-allowed' : 'pointer'">
              Submit
            </button>
          </div>
        </form>
        
        <div style="margin-top: 2rem; padding: 1rem; background: #f8f9fa; border-radius: 0.375rem;">
          <strong>Form Status:</strong>
          <pre style="margin: 0.5rem 0;">{{ form.status }}</pre>
          <strong>Form Value:</strong>
          <pre style="margin: 0.5rem 0;">{{ getFormJson() }}</pre>
        </div>
      </div>
    `
  })
};

// ========== CASOS DE USO ==========

export const BlogPost: Story = {
  name: '📝 Blog Post Editor',
  args: {
    label: 'Post Content',
    placeholder: 'Write your blog post using markdown...',
    showToolbar: true,
    showMarkdownPreview: true,
    autoResize: true,
    minHeight: 200,
    maxHeight: 600,
    showCounter: true,
    showWordCount: true,
    helperText: 'Use markdown for formatting'
  }
};

export const ChatMessage: Story = {
  name: '💬 Chat Message',
  args: {
    label: 'Message',
    placeholder: 'Type a message...',
    showToolbar: true,
    showEmojiPicker: true,
    autoResize: true,
    minHeight: 60,
    maxHeight: 200,
    maxLength: 2000,
    showCounter: true,
    helperText: 'Press Ctrl+Enter to send'
  }
};

export const Comment: Story = {
  name: '💭 Comment Box',
  args: {
    label: 'Add a comment',
    placeholder: 'What are your thoughts?',
    showEmojiPicker: true,
    autoResize: true,
    minHeight: 80,
    maxLength: 500,
    showCounter: true
  }
};

export const SupportTicket: Story = {
  name: '🎫 Support Ticket',
  args: {
    label: 'Describe your issue',
    placeholder: 'Please describe the problem in detail...',
    showToolbar: true,
    showTemplates: true,
    templates: [
      {
        label: 'Bug Report',
        content: '**Bug Description:**\n\n**Steps to Reproduce:**\n1. \n2. \n3. \n\n**Expected Behavior:**\n\n**Actual Behavior:**',
        icon: 'bug_report'
      },
      {
        label: 'Feature Request',
        content: '**Feature Description:**\n\n**Use Case:**\n\n**Benefits:**',
        icon: 'lightbulb'
      }
    ],
    required: true,
    showCounter: true,
    minHeight: 150
  }
};

export const EmailCompose: Story = {
  name: '📧 Email Composer',
  args: {
    label: 'Message',
    placeholder: 'Compose your email...',
    showToolbar: true,
    showTemplates: true,
    templates: demoTemplates,
    autoResize: true,
    minHeight: 200,
    maxHeight: 500,
    showCounter: true,
    showWordCount: true
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
          Todas as funcionalidades do Web Textarea
        </p>
        
        <div style="display: grid; gap: 2rem;">
          
          <div style="padding: 1.5rem; background: #f0f9ff; border-radius: 0.5rem; border-left: 4px solid #007bff;">
            <h3 style="margin-top: 0;">✨ Features Principais</h3>
            <ul style="line-height: 1.8;">
              <li>✅ <strong>Auto-resize:</strong> Cresce automaticamente ao digitar</li>
              <li>✅ <strong>Character Counter:</strong> Mostra contagem de caracteres</li>
              <li>✅ <strong>Word Counter:</strong> Conta palavras em tempo real</li>
              <li>✅ <strong>Markdown Preview:</strong> Visualização ao vivo do markdown</li>
              <li>✅ <strong>Emoji Picker:</strong> Seletor de emojis integrado</li>
              <li>✅ <strong>Templates:</strong> Textos pré-definidos reutilizáveis</li>
              <li>✅ <strong>Rich Toolbar:</strong> Bold, Italic, Link</li>
              <li>✅ <strong>Keyboard Shortcuts:</strong> Ctrl+B, Ctrl+I, Ctrl+K</li>
              <li>✅ <strong>Full-screen Mode:</strong> Modo tela cheia</li>
              <li>✅ <strong>Auto-save:</strong> Salva no localStorage</li>
            </ul>
          </div>
          
          <div style="padding: 1.5rem; background: #fff3cd; border-radius: 0.5rem; border-left: 4px solid #ffc107;">
            <h3 style="margin-top: 0;">📏 Validação</h3>
            <ul style="line-height: 1.8;">
              <li>✅ <strong>Required:</strong> Campo obrigatório</li>
              <li>✅ <strong>Min/Max Length:</strong> Limite de caracteres</li>
              <li>✅ <strong>Pattern:</strong> Validação por regex</li>
              <li>✅ <strong>Custom Validators:</strong> Validadores customizados</li>
              <li>✅ <strong>Real-time Feedback:</strong> Erro/sucesso instantâneo</li>
              <li>✅ <strong>Visual Warning:</strong> Alerta quando próximo do limite</li>
            </ul>
          </div>
          
          <div style="padding: 1.5rem; background: #d1ecf1; border-radius: 0.5rem; border-left: 4px solid #17a2b8;">
            <h3 style="margin-top: 0;">🎨 Customização</h3>
            <ul style="line-height: 1.8;">
              <li>✅ <strong>Min/Max Height:</strong> Controle de altura</li>
              <li>✅ <strong>Resizable:</strong> Redimensionável pelo usuário</li>
              <li>✅ <strong>Spell Check:</strong> Verificação ortográfica</li>
              <li>✅ <strong>Read-only:</strong> Modo apenas leitura</li>
              <li>✅ <strong>Disabled:</strong> Estado desabilitado</li>
              <li>✅ <strong>Custom Icons:</strong> Ícones personalizáveis</li>
            </ul>
          </div>
          
          <div style="padding: 1.5rem; background: #d4edda; border-radius: 0.5rem; border-left: 4px solid #28a745;">
            <h3 style="margin-top: 0;">🔄 Integração</h3>
            <ul style="line-height: 1.8;">
              <li>✅ <strong>[(ngModel)]:</strong> Two-way binding</li>
              <li>✅ <strong>formControlName:</strong> Reactive Forms</li>
              <li>✅ <strong>Validators:</strong> Angular Validators nativos</li>
              <li>✅ <strong>Events:</strong> valueChange, focused, blurred</li>
              <li>✅ <strong>Programmatic Control:</strong> Controle via código</li>
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
                <th style="padding: 0.75rem; text-align: center; border-bottom: 2px solid #e5e7eb;">Web Textarea</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="padding: 0.75rem; border-bottom: 1px solid #e5e7eb;">Auto-resize</td>
                <td style="padding: 0.75rem; text-align: center; border-bottom: 1px solid #e5e7eb;">❌</td>
                <td style="padding: 0.75rem; text-align: center; border-bottom: 1px solid #e5e7eb;">⚠️</td>
                <td style="padding: 0.75rem; text-align: center; border-bottom: 1px solid #e5e7eb;">✅</td>
                <td style="padding: 0.75rem; text-align: center; border-bottom: 1px solid #e5e7eb;">✅</td>
              </tr>
              <tr>
                <td style="padding: 0.75rem; border-bottom: 1px solid #e5e7eb;">Character Counter</td>
                <td style="padding: 0.75rem; text-align: center; border-bottom: 1px solid #e5e7eb;">❌</td>
                <td style="padding: 0.75rem; text-align: center; border-bottom: 1px solid #e5e7eb;">❌</td>
                <td style="padding: 0.75rem; text-align: center; border-bottom: 1px solid #e5e7eb;">✅</td>
                <td style="padding: 0.75rem; text-align: center; border-bottom: 1px solid #e5e7eb;">✅</td>
              </tr>
              <tr>
                <td style="padding: 0.75rem; border-bottom: 1px solid #e5e7eb;">Word Counter</td>
                <td style="padding: 0.75rem; text-align: center; border-bottom: 1px solid #e5e7eb;">❌</td>
                <td style="padding: 0.75rem; text-align: center; border-bottom: 1px solid #e5e7eb;">❌</td>
                <td style="padding: 0.75rem; text-align: center; border-bottom: 1px solid #e5e7eb;">❌</td>
                <td style="padding: 0.75rem; text-align: center; border-bottom: 1px solid #e5e7eb;">✅</td>
              </tr>
              <tr>
                <td style="padding: 0.75rem; border-bottom: 1px solid #e5e7eb;">Markdown Preview</td>
                <td style="padding: 0.75rem; text-align: center; border-bottom: 1px solid #e5e7eb;">❌</td>
                <td style="padding: 0.75rem; text-align: center; border-bottom: 1px solid #e5e7eb;">❌</td>
                <td style="padding: 0.75rem; text-align: center; border-bottom: 1px solid #e5e7eb;">❌</td>
                <td style="padding: 0.75rem; text-align: center; border-bottom: 1px solid #e5e7eb;">✅</td>
              </tr>
              <tr>
                <td style="padding: 0.75rem; border-bottom: 1px solid #e5e7eb;">Emoji Picker</td>
                <td style="padding: 0.75rem; text-align: center; border-bottom: 1px solid #e5e7eb;">❌</td>
                <td style="padding: 0.75rem; text-align: center; border-bottom: 1px solid #e5e7eb;">❌</td>
                <td style="padding: 0.75rem; text-align: center; border-bottom: 1px solid #e5e7eb;">❌</td>
                <td style="padding: 0.75rem; text-align: center; border-bottom: 1px solid #e5e7eb;">✅</td>
              </tr>
              <tr>
                <td style="padding: 0.75rem;">Templates</td>
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