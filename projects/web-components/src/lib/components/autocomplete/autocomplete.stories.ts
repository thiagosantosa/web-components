import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AutocompleteComponent, AutocompleteOption } from './autocomplete.component';

// Mock Data
const countries: AutocompleteOption[] = [
  { label: 'Brasil', value: 'BR', icon: 'flag', description: 'América do Sul' },
  { label: 'Estados Unidos', value: 'US', icon: 'flag', description: 'América do Norte' },
  { label: 'Portugal', value: 'PT', icon: 'flag', description: 'Europa' },
  { label: 'Argentina', value: 'AR', icon: 'flag', description: 'América do Sul' },
  { label: 'Canadá', value: 'CA', icon: 'flag', description: 'América do Norte' },
  { label: 'Alemanha', value: 'DE', icon: 'flag', description: 'Europa' },
  { label: 'Japão', value: 'JP', icon: 'flag', description: 'Ásia' },
  { label: 'China', value: 'CN', icon: 'flag', description: 'Ásia' },
  { label: 'França', value: 'FR', icon: 'flag', description: 'Europa' },
  { label: 'Itália', value: 'IT', icon: 'flag', description: 'Europa' },
];

const technologies: AutocompleteOption[] = [
  { label: 'Angular', value: 'angular', icon: 'code' },
  { label: 'React', value: 'react', icon: 'code' },
  { label: 'Vue.js', value: 'vue', icon: 'code' },
  { label: 'TypeScript', value: 'typescript', icon: 'code' },
  { label: 'JavaScript', value: 'javascript', icon: 'code' },
  { label: 'Python', value: 'python', icon: 'code' },
  { label: 'Java', value: 'java', icon: 'code' },
  { label: 'C#', value: 'csharp', icon: 'code' },
  { label: 'Node.js', value: 'nodejs', icon: 'code' },
  { label: 'Docker', value: 'docker', icon: 'code' },
];

const users: AutocompleteOption[] = [
  { label: 'João Silva', value: 'joao@email.com', icon: 'person', description: 'Desenvolvedor Frontend' },
  { label: 'Maria Santos', value: 'maria@email.com', icon: 'person', description: 'Designer UX/UI' },
  { label: 'Pedro Costa', value: 'pedro@email.com', icon: 'person', description: 'Backend Developer' },
  { label: 'Ana Lima', value: 'ana@email.com', icon: 'person', description: 'Product Manager' },
  { label: 'Carlos Mendes', value: 'carlos@email.com', icon: 'person', description: 'DevOps Engineer' },
];

const meta: Meta<AutocompleteComponent> = {
  title: 'Form Controls/Autocomplete',
  component: AutocompleteComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [AutocompleteComponent, ReactiveFormsModule],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `
# 🔍 Web Autocomplete

Componente de seleção avançado com **design idêntico ao Web Input**, mas com funcionalidades **MUITO SUPERIORES** aos autocompletes do mercado!

## 🚀 Diferenciais

| Feature | Material | PrimeNG | ng-select | **Web Autocomplete** |
|---------|----------|---------|-----------|----------------------|
| Virtual Scroll | ❌ | ⚠️ | ⚠️ | ✅ **CDK Nativo** |
| Fuzzy Search | ❌ | ❌ | ❌ | ✅ **Nativo** |
| Multi-Select Chips | ❌ | ⚠️ | ✅ | ✅ **Melhorado** |
| Highlight Match | ❌ | ❌ | ⚠️ | ✅ **Visual** |
| Create New | ❌ | ⚠️ | ⚠️ | ✅ **Completo** |
| Design Montserrat | ❌ | ❌ | ❌ | ✅ **Idêntico Input** |

## 💡 Uso Básico

\`\`\`typescript
import { AutocompleteComponent, AutocompleteOption } from './web-autocomplete.component';

@Component({
  standalone: true,
  imports: [AutocompleteComponent],
  template: \`
    <web-autocomplete
      label="Selecione um país"
      [options]="countries"
      [(ngModel)]="selectedCountry">
    </web-autocomplete>
  \`
})
export class MyComponent {
  countries: AutocompleteOption[] = [
    { label: 'Brasil', value: 'BR', icon: 'flag' },
    { label: 'Estados Unidos', value: 'US', icon: 'flag' }
  ];
  selectedCountry: string = '';
}
\`\`\`

## 📦 Instalação

\`\`\`bash
npm install @angular/cdk
\`\`\`

## ✨ Funcionalidades

- ✅ Virtual Scrolling (100k+ itens)
- ✅ Fuzzy Search
- ✅ Multi-Select com Chips
- ✅ Highlight de busca
- ✅ Criação de novas opções
- ✅ Keyboard navigation
- ✅ Templates customizáveis
- ✅ Loading state
- ✅ Validação (error/success)
        `
      }
    }
  }
};

export default meta;
type Story = StoryObj<AutocompleteComponent>;

// ========== BÁSICO ==========

export const Default: Story = {
  args: {
    label: 'Selecione um país',
    icon: 'public',
    placeholder: 'Buscar país...',
    options: countries,
  }
};

export const WithIcon: Story = {
  name: 'Com Ícone',
  args: {
    label: 'Tecnologia',
    icon: 'code',
    placeholder: 'Buscar tecnologia...',
    options: technologies,
  }
};

export const WithDescription: Story = {
  name: 'Com Descrição',
  args: {
    label: 'Selecionar usuário',
    icon: 'person',
    placeholder: 'Buscar por nome...',
    options: users,
  }
};

// ========== MULTI-SELECT ==========

export const MultiSelect: Story = {
  name: 'Multi-Seleção',
  args: {
    label: 'Tecnologias',
    icon: 'code',
    placeholder: 'Selecione múltiplas tecnologias...',
    options: technologies,
    multiple: true,
  }
};

export const MultiSelectWithLimit: Story = {
  name: 'Multi-Seleção (Limite)',
  args: {
    label: 'Até 3 tecnologias',
    icon: 'code',
    placeholder: 'Selecione até 3...',
    options: technologies,
    multiple: true,
    maxSelections: 3,
    helperText: 'Você pode selecionar no máximo 3 opções',
  }
};

export const MultiSelectWithFooter: Story = {
  name: 'Multi-Seleção (Com Footer)',
  args: {
    label: 'Países visitados',
    icon: 'public',
    placeholder: 'Selecione os países...',
    options: countries,
    multiple: true,
    showFooter: true,
  }
};

// ========== VALIDAÇÃO ==========

export const WithError: Story = {
  name: 'Com Erro',
  args: {
    label: 'País *',
    icon: 'public',
    placeholder: 'Selecione um país',
    options: countries,
    required: true,
    error: true,
    errorMessage: 'Por favor, selecione um país',
  }
};

export const WithSuccess: Story = {
  name: 'Com Sucesso',
  args: {
    label: 'País',
    icon: 'public',
    placeholder: 'Buscar país...',
    options: countries,
    success: true,
    successMessage: 'País selecionado com sucesso!',
  }
};

export const WithHelperText: Story = {
  name: 'Com Texto de Ajuda',
  args: {
    label: 'Tecnologia Principal',
    icon: 'code',
    placeholder: 'Buscar tecnologia...',
    options: technologies,
    helperText: 'Selecione sua tecnologia principal de trabalho',
  }
};

// ========== FUNCIONALIDADES AVANÇADAS ==========

export const FuzzySearch: Story = {
  name: 'Busca Fuzzy',
  args: {
    label: 'Busca Inteligente',
    icon: 'search',
    placeholder: 'Tente "brzl" ou "jap"',
    options: countries,
    fuzzySearch: true,
    helperText: 'A busca fuzzy tolera erros de digitação',
  }
};

export const CreateNew: Story = {
  name: 'Criar Nova Opção',
  args: {
    label: 'Tags',
    icon: 'label',
    placeholder: 'Digite para criar uma tag...',
    options: [
      { label: 'Frontend', value: 'frontend' },
      { label: 'Backend', value: 'backend' },
      { label: 'DevOps', value: 'devops' },
    ],
    multiple: true,
    allowCreate: true,
    helperText: 'Digite e pressione Enter para criar uma nova tag',
  }
};

export const WithLoading: Story = {
  name: 'Com Loading',
  args: {
    label: 'Buscando dados...',
    icon: 'search',
    placeholder: 'Aguarde...',
    options: countries,
    loading: true,
  }
};

export const NoVirtualScroll: Story = {
  name: 'Sem Virtual Scroll',
  args: {
    label: 'Scrolling Normal',
    icon: 'public',
    placeholder: 'Buscar...',
    options: countries,
    virtualScroll: false,
    helperText: 'Útil para listas pequenas (< 50 itens)',
  }
};

// ========== ESTADOS ==========

export const Disabled: Story = {
  name: 'Desabilitado',
  args: {
    label: 'País',
    icon: 'public',
    placeholder: 'Seleção desabilitada',
    options: countries,
    disabled: true,
  }
};

export const Readonly: Story = {
  name: 'Somente Leitura',
  args: {
    label: 'País Selecionado',
    icon: 'public',
    placeholder: 'Brasil',
    options: countries,
    readonly: true,
  }
};

export const Required: Story = {
  name: 'Campo Obrigatório',
  args: {
    label: 'País',
    icon: 'public',
    placeholder: 'Selecione...',
    options: countries,
    required: true,
    helperText: 'Este campo é obrigatório',
  }
};

// ========== CASOS DE USO REAIS ==========

export const CountrySelector: Story = {
  name: '📍 Seletor de País',
  args: {
    label: 'País de Residência *',
    icon: 'public',
    placeholder: 'Buscar país...',
    options: countries,
    required: true,
    helperText: 'Selecione o país onde você mora atualmente',
  }
};

export const SkillsSelector: Story = {
  name: '💻 Seletor de Skills',
  args: {
    label: 'Habilidades Técnicas',
    icon: 'code',
    placeholder: 'Selecione suas habilidades...',
    options: technologies,
    multiple: true,
    maxSelections: 5,
    helperText: 'Selecione até 5 tecnologias que você domina',
  }
};

export const TeamMemberAssign: Story = {
  name: '👥 Atribuir Membro',
  args: {
    label: 'Atribuir para',
    icon: 'person',
    placeholder: 'Buscar membro do time...',
    options: users,
    helperText: 'Selecione um membro para atribuir esta tarefa',
  }
};

export const TagsEditor: Story = {
  name: '🏷️ Editor de Tags',
  args: {
    label: 'Tags do Artigo',
    icon: 'label',
    placeholder: 'Adicionar tags...',
    options: [
      { label: 'Angular', value: 'angular' },
      { label: 'TypeScript', value: 'typescript' },
      { label: 'Frontend', value: 'frontend' },
    ],
    multiple: true,
    allowCreate: true,
    showFooter: true,
    helperText: 'Digite para criar novas tags ou selecione existentes',
  }
};

// ========== INTEGRAÇÃO COM FORMS ==========

export const ReactiveForm: Story = {
  name: '📝 Reactive Forms',
  render: () => ({
    template: `
      <div style="padding: 2rem; max-width: 600px; font-family: Montserrat;">
        <h3>Formulário com Reactive Forms</h3>
        
        <web-autocomplete
          label="País *"
          icon="public"
          [options]="countries"
          [formControl]="countryControl"
          [error]="countryControl.invalid && countryControl.touched"
          errorMessage="Selecione um país"
          placeholder="Buscar país...">
        </web-autocomplete>
        
        <br>
        
        <web-autocomplete
          label="Tecnologias"
          icon="code"
          [options]="technologies"
          [formControl]="techControl"
          [multiple]="true"
          [maxSelections]="3"
          placeholder="Selecione até 3...">
        </web-autocomplete>
        
        <br>
        
        <div style="padding: 1rem; background: #f8f9fa; border-radius: 0.375rem;">
          <strong>Valores:</strong>
          <pre>{{ getFormValues() }}</pre>
        </div>
      </div>
    `,
    props: {
      countries,
      technologies,
      countryControl: new FormControl(''),
      techControl: new FormControl([]),
      getFormValues() {
        return JSON.stringify({
          country: this['countryControl'].value,
          technologies: this['techControl'].value
        }, null, 2);
      }
    }
  })
};

// ========== COMPARAÇÃO VISUAL ==========

export const ComparisonWithInput: Story = {
  name: '🎨 Comparação com Web Input',
  render: () => ({
    template: `
      <div style="padding: 2rem; max-width: 800px; font-family: Montserrat;">
        <h3>Design Idêntico ao Web Input</h3>
        <p style="color: #6c757d;">Os componentes compartilham o mesmo design system</p>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-top: 2rem;">
          <div>
            <h4>Web Input</h4>
            <div style="border: 2px solid #e5e7eb; padding: 1rem; border-radius: 0.5rem;">
              <p style="font-size: 0.875rem; color: #6c757d; margin-bottom: 1rem;">
                Componente de input tradicional
              </p>
              <div class="input-wrapper">
                <label class="input-label">Nome</label>
                <div class="input-container">
                  <input 
                    type="text" 
                    placeholder="Digite seu nome"
                    style="width: 100%; padding: 0.95rem; border: 1px solid #CED4DA; border-radius: 0.375rem; font-family: Montserrat;">
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h4>Web Autocomplete</h4>
            <div style="border: 2px solid #007bff; padding: 1rem; border-radius: 0.5rem;">
              <p style="font-size: 0.875rem; color: #6c757d; margin-bottom: 1rem;">
                Componente de seleção avançado
              </p>
              <web-autocomplete
                label="País"
                icon="public"
                [options]="countries"
                placeholder="Selecione um país">
              </web-autocomplete>
            </div>
          </div>
        </div>
        
        <div style="margin-top: 2rem; padding: 1rem; background: #f0f9ff; border-radius: 0.375rem; border-left: 4px solid #007bff;">
          <strong>✨ Mesmos Estilos:</strong>
          <ul style="margin: 0.5rem 0; padding-left: 1.5rem;">
            <li>Tipografia: Montserrat</li>
            <li>Cores: #443A3A (text), #CED4DA (border), #007bff (focus)</li>
            <li>Espaçamentos: 0.95rem padding, 0.375rem border-radius</li>
            <li>Estados: error, success, disabled, readonly</li>
            <li>Ícones: Material Symbols Outlined</li>
          </ul>
        </div>
      </div>
    `,
    props: { countries }
  })
};

// ========== EXEMPLOS COM FORMCONTROLNAME ==========

export const WithFormControlName: Story = {
  name: '📝 Com formControlName',
  render: () => ({
    template: `
      <div style="padding: 2rem; max-width: 600px; font-family: Montserrat;">
        <h3>Usando formControlName</h3>
        <p style="color: #6c757d; margin-bottom: 2rem;">
          O componente funciona perfeitamente com Reactive Forms usando <code>formControlName</code>
        </p>
        
        <form [formGroup]="form">
          <!-- Single Select -->
          <web-autocomplete
            label="País *"
            icon="public"
            placeholder="Selecione um país"
            [options]="countries"
            formControlName="country"
            [error]="form.get('country')?.invalid && form.get('country')?.touched"
            [errorMessage]="getErrorMessage('country')"
            helperText="Campo obrigatório">
          </web-autocomplete>
          
          <br>
          
          <!-- Multi-Select -->
          <web-autocomplete
            label="Tecnologias"
            icon="code"
            placeholder="Selecione suas tecnologias"
            [options]="technologies"
            [multiple]="true"
            [maxSelections]="5"
            formControlName="technologies"
            helperText="Selecione até 5 tecnologias">
          </web-autocomplete>
          
          <br>
          
          <!-- Com Validação -->
          <web-autocomplete
            label="Líder do Time *"
            icon="person"
            placeholder="Selecione o líder"
            [options]="users"
            formControlName="teamLead"
            [error]="form.get('teamLead')?.invalid && form.get('teamLead')?.touched"
            errorMessage="Selecione um líder para o time">
          </web-autocomplete>
          
          <br>
          
          <!-- Botões -->
          <div style="display: flex; gap: 1rem;">
            <button 
              type="button"
              (click)="form.reset()"
              style="padding: 0.75rem 1.5rem; border: 1px solid #CED4DA; background: white; border-radius: 0.375rem; font-family: Montserrat; cursor: pointer;">
              Limpar
            </button>
            <button 
              type="button"
              (click)="submitForm()"
              [disabled]="form.invalid"
              style="padding: 0.75rem 1.5rem; border: none; background: #007bff; color: white; border-radius: 0.375rem; font-family: Montserrat; font-weight: 600; cursor: pointer;"
              [style.opacity]="form.invalid ? '0.5' : '1'">
              Enviar
            </button>
          </div>
        </form>
        
        <br>
        
        <!-- Valores do Form -->
        <div style="padding: 1rem; background: #f8f9fa; border-radius: 0.375rem; border-left: 4px solid #007bff;">
          <strong>📊 Valores do Formulário:</strong>
          <pre style="margin: 0.5rem 0; font-size: 0.875rem;">{{ form.value | json }}</pre>
          
          <strong>✅ Status:</strong>
          <div style="margin-top: 0.5rem;">
            <span [style.color]="form.valid ? '#28a745' : '#dc3545'">
              {{ form.valid ? '✓ Válido' : '✗ Inválido' }}
            </span>
          </div>
        </div>
      </div>
    `,
    props: {
      countries,
      technologies,
      users,
      form: new (class {
        constructor() {
          const { FormGroup, FormControl, Validators } = require('@angular/forms');
          return new FormGroup({
            country: new FormControl('', Validators.required),
            technologies: new FormControl([]),
            teamLead: new FormControl('', Validators.required)
          });
        }
      })(),
      getErrorMessage(controlName: string) {
        const control = this['form'].get(controlName);
        if (control?.hasError('required')) {
          return 'Este campo é obrigatório';
        }
        return '';
      },
      submitForm() {
        if (this['form'].valid) {
          alert('Formulário enviado com sucesso!\n\n' + JSON.stringify(this['form'].value, null, 2));
        } else {
          Object.keys(this['form'].controls).forEach(key => {
            this['form'].get(key)?.markAsTouched();
          });
        }
      }
    }
  })
};

export const FormValidation: Story = {
  name: '✅ Validação de Formulário',
  render: () => ({
    template: `
      <div style="padding: 2rem; max-width: 600px; font-family: Montserrat;">
        <h3>Validação Completa</h3>
        
        <form [formGroup]="validationForm">
          <!-- Required -->
          <web-autocomplete
            label="Campo Obrigatório *"
            icon="star"
            placeholder="Selecione..."
            [options]="countries"
            formControlName="required"
            [error]="validationForm.get('required')?.invalid && validationForm.get('required')?.touched"
            errorMessage="Este campo é obrigatório">
          </web-autocomplete>
          
          <br>
          
          <!-- Min Length (Multi-Select) -->
          <web-autocomplete
            label="Mínimo 2 Seleções *"
            icon="checklist"
            placeholder="Selecione pelo menos 2..."
            [options]="technologies"
            [multiple]="true"
            formControlName="minLength"
            [error]="validationForm.get('minLength')?.invalid && validationForm.get('minLength')?.touched"
            [errorMessage]="getMinLengthError()">
          </web-autocomplete>
          
          <br>
          
          <!-- Max Length (Multi-Select) -->
          <web-autocomplete
            label="Máximo 3 Seleções"
            icon="filter_3"
            placeholder="Selecione até 3..."
            [options]="technologies"
            [multiple]="true"
            [maxSelections]="3"
            formControlName="maxLength"
            helperText="Você pode selecionar no máximo 3 opções">
          </web-autocomplete>
          
          <br>
          
          <!-- Custom Validator -->
          <web-autocomplete
            label="Apenas Brasil ou Portugal"
            icon="public"
            placeholder="Selecione..."
            [options]="countries"
            formControlName="custom"
            [error]="validationForm.get('custom')?.invalid && validationForm.get('custom')?.touched"
            [errorMessage]="getCustomError()">
          </web-autocomplete>
          
          <br>
          
          <button 
            type="button"
            (click)="validateAll()"
            style="padding: 0.75rem 1.5rem; background: #007bff; color: white; border: none; border-radius: 0.375rem; font-family: Montserrat; font-weight: 600; cursor: pointer;">
            Validar Tudo
          </button>
        </form>
        
        <br>
        
        <div style="padding: 1rem; background: #f8f9fa; border-radius: 0.375rem;">
          <strong>Status:</strong>
          <pre style="margin: 0.5rem 0; font-size: 0.875rem;">{{ validationForm.value | json }}</pre>
          <div [style.color]="validationForm.valid ? '#28a745' : '#dc3545'">
            {{ validationForm.valid ? '✓ Todos os campos válidos' : '✗ Existem erros no formulário' }}
          </div>
        </div>
      </div>
    `,
    props: {
      countries,
      technologies,
      validationForm: new (class {
        constructor() {
          const { FormGroup, FormControl, Validators } = require('@angular/forms');
          
          // Custom validator: apenas BR ou PT
          const onlyBrazilPortugal = (control: any) => {
            const value = control.value;
            if (value && value !== 'BR' && value !== 'PT') {
              return { custom: true };
            }
            return null;
          };
          
          // Min length validator para arrays
          const minLengthArray = (min: number) => {
            return (control: any) => {
              const value = control.value;
              if (Array.isArray(value) && value.length < min) {
                return { minLength: { required: min, actual: value.length } };
              }
              return null;
            };
          };
          
          return new FormGroup({
            required: new FormControl('', Validators.required),
            minLength: new FormControl([], minLengthArray(2)),
            maxLength: new FormControl([]),
            custom: new FormControl('', onlyBrazilPortugal)
          });
        }
      })(),
      getMinLengthError() {
        const control = this['validationForm'].get('minLength');
        if (control?.hasError('minLength')) {
          const error = control.getError('minLength');
          return `Selecione pelo menos ${error.required} opções (atual: ${error.actual})`;
        }
        return '';
      },
      getCustomError() {
        const control = this['validationForm'].get('custom');
        if (control?.hasError('custom')) {
          return 'Apenas Brasil ou Portugal são permitidos';
        }
        return '';
      },
      validateAll() {
        Object.keys(this['validationForm'].controls).forEach(key => {
          this['validationForm'].get(key)?.markAsTouched();
        });
        
        if (this['validationForm'].valid) {
          alert('✓ Formulário válido!');
        } else {
          alert('✗ Existem erros no formulário');
        }
      }
    }
  })
};

export const DynamicForm: Story = {
  name: '🔄 Formulário Dinâmico',
  render: () => ({
    template: `
      <div style="padding: 2rem; max-width: 600px; font-family: Montserrat;">
        <h3>Controle Dinâmico</h3>
        <p style="color: #6c757d;">
          Habilitar/desabilitar e atualizar valores programaticamente
        </p>
        
        <form [formGroup]="dynamicForm">
          <web-autocomplete
            label="País"
            icon="public"
            placeholder="Selecione um país"
            [options]="countries"
            formControlName="country">
          </web-autocomplete>
          
          <br>
          
          <web-autocomplete
            label="Tecnologias (depende do país)"
            icon="code"
            placeholder="Selecione tecnologias"
            [options]="technologies"
            [multiple]="true"
            formControlName="technologies">
          </web-autocomplete>
        </form>
        
        <br>
        
        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
          <button 
            type="button"
            (click)="disableCountry()"
            style="padding: 0.5rem 1rem; border: 1px solid #CED4DA; background: white; border-radius: 0.375rem; font-family: Montserrat; cursor: pointer; font-size: 0.875rem;">
            Desabilitar País
          </button>
          <button 
            type="button"
            (click)="enableCountry()"
            style="padding: 0.5rem 1rem; border: 1px solid #CED4DA; background: white; border-radius: 0.375rem; font-family: Montserrat; cursor: pointer; font-size: 0.875rem;">
            Habilitar País
          </button>
          <button 
            type="button"
            (click)="setValueBrazil()"
            style="padding: 0.5rem 1rem; background: #007bff; color: white; border: none; border-radius: 0.375rem; font-family: Montserrat; cursor: pointer; font-size: 0.875rem;">
            Setar Brasil
          </button>
          <button 
            type="button"
            (click)="setMultipleTech()"
            style="padding: 0.5rem 1rem; background: #28a745; color: white; border: none; border-radius: 0.375rem; font-family: Montserrat; cursor: pointer; font-size: 0.875rem;">
            Setar Angular + TS
          </button>
          <button 
            type="button"
            (click)="clearAll()"
            style="padding: 0.5rem 1rem; background: #dc3545; color: white; border: none; border-radius: 0.375rem; font-family: Montserrat; cursor: pointer; font-size: 0.875rem;">
            Limpar Tudo
          </button>
        </div>
        
        <br>
        
        <div style="padding: 1rem; background: #f8f9fa; border-radius: 0.375rem;">
          <strong>Valores Atuais:</strong>
          <pre style="margin: 0.5rem 0; font-size: 0.875rem;">{{ dynamicForm.value | json }}</pre>
          <strong>Status dos Controles:</strong>
          <ul style="margin: 0.5rem 0; padding-left: 1.5rem; font-size: 0.875rem;">
            <li>País: {{ dynamicForm.get('country')?.disabled ? 'Desabilitado' : 'Habilitado' }}</li>
            <li>Tecnologias: {{ dynamicForm.get('technologies')?.disabled ? 'Desabilitado' : 'Habilitado' }}</li>
          </ul>
        </div>
      </div>
    `,
    props: {
      countries,
      technologies,
      dynamicForm: new (class {
        constructor() {
          const { FormGroup, FormControl } = require('@angular/forms');
          return new FormGroup({
            country: new FormControl(''),
            technologies: new FormControl([])
          });
        }
      })(),
      disableCountry() {
        this['dynamicForm'].get('country')?.disable();
      },
      enableCountry() {
        this['dynamicForm'].get('country')?.enable();
      },
      setValueBrazil() {
        this['dynamicForm'].patchValue({ country: 'BR' });
      },
      setMultipleTech() {
        this['dynamicForm'].patchValue({ 
          technologies: ['angular', 'typescript'] 
        });
      },
      clearAll() {
        this['dynamicForm'].reset();
      }
    }
  })
};