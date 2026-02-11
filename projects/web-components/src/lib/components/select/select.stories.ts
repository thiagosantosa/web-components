import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { FormsModule } from '@angular/forms';
import { SelectComponent, SelectOption } from './select.component';

const meta: Meta<SelectComponent> = {
  title: 'Form Controls/Select',
  component: SelectComponent,
  decorators: [
    moduleMetadata({
      imports: [SelectComponent, FormsModule],
    }),
  ],
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
import { SelectComponent } from '@web/ui-components';
import { FormsModule } from '@angular/forms'; // Para [(ngModel)]
import { ReactiveFormsModule } from '@angular/forms'; // Para formControlName

@Component({
  selector: 'app-meu-componente',
  standalone: true,
  imports: [
    SelectComponent,
    FormsModule,        // ← Se usar [(ngModel)]
    ReactiveFormsModule // ← Se usar Reactive Forms
  ],
  template: \`
    <web-select 
      label="Estado"
      [options]="estados"
      [(ngModel)]="estadoSelecionado">
    </web-select>
  \`
})
export class MeuComponente {
  estadoSelecionado = 'SP';

  estados = [
    { value: 'SP', label: 'São Paulo' },
    { value: 'RJ', label: 'Rio de Janeiro' },
    { value: 'MG', label: 'Minas Gerais' }
  ];
}
\`\`\`

---

## 3️⃣ USO NO TEMPLATE

### Com Two-Way Binding [(ngModel)]

\`\`\`html
<web-select 
  label="Selecione uma opção"
  placeholder="Escolha..."
  [options]="opcoes"
  [(ngModel)]="selecionado">
</web-select>
\`\`\`

---

### Com Reactive Forms (formControlName)

\`\`\`html
<form [formGroup]="meuForm">
  <web-select 
    label="Estado"
    placeholder="Selecione o estado"
    [options]="estados"
    formControlName="estado"
    [required]="true"
    [searchable]="true"
    [error]="meuForm.get('estado')?.invalid && meuForm.get('estado')?.touched"
    errorMessage="Estado é obrigatório">
  </web-select>
</form>
\`\`\`

---

## 4️⃣ EXEMPLO COMPLETO COM REACTIVE FORMS

### NO COMPONENTE TYPESCRIPT

\`\`\`ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { SelectComponent } from '@web/ui-components';

interface SelectOption {
  value: string;
  label: string;
}

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [ReactiveFormsModule, SelectComponent],
  templateUrl: './cadastro.component.html'
})
export class CadastroComponent implements OnInit {
  cadastroForm!: FormGroup;

  paises: SelectOption[] = [
    { value: 'BR', label: 'Brasil' },
    { value: 'US', label: 'Estados Unidos' },
    { value: 'AR', label: 'Argentina' }
  ];

  estados: SelectOption[] = [
    { value: 'SP', label: 'São Paulo' },
    { value: 'RJ', label: 'Rio de Janeiro' },
    { value: 'MG', label: 'Minas Gerais' },
    { value: 'RS', label: 'Rio Grande do Sul' }
  ];

  cidades: SelectOption[] = [];

  cidadesPorEstado: { [key: string]: SelectOption[] } = {
    'SP': [
      { value: 'sao-paulo', label: 'São Paulo' },
      { value: 'campinas', label: 'Campinas' },
      { value: 'santos', label: 'Santos' }
    ],
    'RJ': [
      { value: 'rio-janeiro', label: 'Rio de Janeiro' },
      { value: 'niteroi', label: 'Niterói' }
    ],
    'MG': [
      { value: 'bh', label: 'Belo Horizonte' },
      { value: 'uberlandia', label: 'Uberlândia' }
    ]
  };

  tecnologias: SelectOption[] = [
    { value: 'angular', label: 'Angular' },
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue.js' },
    { value: 'node', label: 'Node.js' }
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.cadastroForm = this.fb.group({
      pais: ['BR', Validators.required],
      estado: ['', Validators.required],
      cidade: ['', Validators.required],
      tecnologias: [[], Validators.required]
    });

    this.cadastroForm.get('estado')?.valueChanges.subscribe(estado => {
      this.atualizarCidades(estado);
      this.cadastroForm.patchValue({ cidade: '' });
    });
  }

  atualizarCidades(estado: string) {
    this.cidades = this.cidadesPorEstado[estado] || [];
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

  <web-select
    label="País"
    placeholder="Selecione o país"
    [options]="paises"
    formControlName="pais"
    [required]="true"
    [error]="isFieldInvalid('pais')"
    errorMessage="País é obrigatório">
  </web-select>

  <web-select
    label="Estado"
    placeholder="Selecione o estado"
    [options]="estados"
    formControlName="estado"
    [required]="true"
    [searchable]="true"
    [error]="isFieldInvalid('estado')"
    errorMessage="Estado é obrigatório">
  </web-select>

  <web-select
    label="Cidade"
    placeholder="Selecione a cidade"
    [options]="cidades"
    formControlName="cidade"
    [required]="true"
    [searchable]="true"
    [disabled]="!cadastroForm.get('estado')?.value"
    [error]="isFieldInvalid('cidade')"
    errorMessage="Cidade é obrigatória">
  </web-select>

  <web-select
    label="Tecnologias"
    placeholder="Selecione suas tecnologias"
    [options]="tecnologias"
    formControlName="tecnologias"
    [multiple]="true"
    [searchable]="true"
    helperText="Selecione todas que você domina">
  </web-select>

  <button type="submit" [disabled]="cadastroForm.invalid">
    Cadastrar
  </button>
</form>

<pre>{{ cadastroForm.value | json }}</pre>
\`\`\`

---

## 5️⃣ SELECT DEPENDENTE (ESTADO → CIDADE)

\`\`\`ts
this.form = this.fb.group({
  estado: [''],
  cidade: ['']
});

this.form.get('estado')?.valueChanges.subscribe(estado => {
  this.cidades = this.getCidadesPorEstado(estado);
  this.form.patchValue({ cidade: '' });
});
\`\`\`

---

## 6️⃣ SELECT MÚLTIPLO

\`\`\`html
<web-select
  label="Habilidades"
  [options]="habilidades"
  formControlName="minhasHabilidades"
  [multiple]="true"
  [searchable]="true">
</web-select>
\`\`\`

\`\`\`ts
this.form = this.fb.group({
  minhasHabilidades: [[]]
});

console.log(this.form.value);
\`\`\`

---

## 7️⃣ DEFININDO VALOR INICIAL

\`\`\`ts
this.form = this.fb.group({
  estado: ['SP']
});

this.form.patchValue({
  estado: 'RJ',
  cidade: 'rio-janeiro'
});

this.form.patchValue({
  tecnologias: ['angular', 'typescript']
});
\`\`\`

---

## 8️⃣ PARA COMPONENTES NÃO-STANDALONE (NgModule)

\`\`\`ts
import { SelectComponent } from '@web/ui-components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [MeuComponente],
  imports: [
    SelectComponent,
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
  argTypes: {
    multiple: {
      control: 'boolean',
      description: 'Permite seleção múltipla'
    },
    searchable: {
      control: 'boolean',
      description: 'Habilita busca nas opções'
    },
    clearable: {
      control: 'boolean',
      description: 'Mostra botão para limpar seleção'
    },
    useNative: {
      control: 'boolean',
      description: 'Usa select nativo do HTML'
    }
  }
};

export default meta;
type Story = StoryObj<SelectComponent>;

// Dados de exemplo
const countries: SelectOption[] = [
  { value: 'br', label: 'Brasil', icon: 'flag' },
  { value: 'us', label: 'Estados Unidos', icon: 'flag' },
  { value: 'uk', label: 'Reino Unido', icon: 'flag' },
  { value: 'fr', label: 'França', icon: 'flag' },
  { value: 'de', label: 'Alemanha', icon: 'flag' },
  { value: 'it', label: 'Itália', icon: 'flag' },
  { value: 'es', label: 'Espanha', icon: 'flag' },
  { value: 'pt', label: 'Portugal', icon: 'flag' },
  { value: 'jp', label: 'Japão', icon: 'flag' },
  { value: 'cn', label: 'China', icon: 'flag' }
];

const cities: SelectOption[] = [
  { value: 'sp', label: 'São Paulo', icon: 'location_city' },
  { value: 'rj', label: 'Rio de Janeiro', icon: 'location_city' },
  { value: 'bh', label: 'Belo Horizonte', icon: 'location_city' },
  { value: 'bsb', label: 'Brasília', icon: 'location_city' },
  { value: 'sal', label: 'Salvador', icon: 'location_city' },
  { value: 'for', label: 'Fortaleza', icon: 'location_city' },
  { value: 'cwb', label: 'Curitiba', icon: 'location_city' },
  { value: 'rec', label: 'Recife', icon: 'location_city' }
];

const priorities: SelectOption[] = [
  { value: 'low', label: 'Baixa', icon: 'arrow_downward', description: 'Sem urgência' },
  { value: 'medium', label: 'Média', icon: 'remove', description: 'Prioridade normal' },
  { value: 'high', label: 'Alta', icon: 'arrow_upward', description: 'Urgente' },
  { value: 'critical', label: 'Crítica', icon: 'priority_high', description: 'Requer atenção imediata' }
];

const users: SelectOption[] = [
  { value: '1', label: 'Thiago Silva', icon: 'person', description: 'Frontend Developer' },
  { value: '2', label: 'Maria Santos', icon: 'person', description: 'UX Designer' },
  { value: '3', label: 'João Oliveira', icon: 'person', description: 'Backend Developer' },
  { value: '4', label: 'Ana Costa', icon: 'person', description: 'Product Manager' },
  { value: '5', label: 'Pedro Alves', icon: 'person', description: 'DevOps Engineer' }
];

const estados: SelectOption[] = [
  { value: 'AC', label: 'Acre' },
  { value: 'AL', label: 'Alagoas' },
  { value: 'AP', label: 'Amapá' },
  { value: 'AM', label: 'Amazonas' },
  { value: 'BA', label: 'Bahia' },
  { value: 'CE', label: 'Ceará' },
  { value: 'DF', label: 'Distrito Federal' },
  { value: 'ES', label: 'Espírito Santo' },
  { value: 'GO', label: 'Goiás' },
  { value: 'MA', label: 'Maranhão' },
  { value: 'MT', label: 'Mato Grosso' },
  { value: 'MS', label: 'Mato Grosso do Sul' },
  { value: 'MG', label: 'Minas Gerais' },
  { value: 'PA', label: 'Pará' },
  { value: 'PB', label: 'Paraíba' },
  { value: 'PR', label: 'Paraná' },
  { value: 'PE', label: 'Pernambuco' },
  { value: 'PI', label: 'Piauí' },
  { value: 'RJ', label: 'Rio de Janeiro' },
  { value: 'RN', label: 'Rio Grande do Norte' },
  { value: 'RS', label: 'Rio Grande do Sul' },
  { value: 'RO', label: 'Rondônia' },
  { value: 'RR', label: 'Roraima' },
  { value: 'SC', label: 'Santa Catarina' },
  { value: 'SP', label: 'São Paulo' },
  { value: 'SE', label: 'Sergipe' },
  { value: 'TO', label: 'Tocantins' }
];

// ========== BÁSICOS ==========

export const Default: Story = {
  args: {
    label: 'Selecione um país',
    placeholder: 'Escolha uma opção',
    options: countries.slice(0, 5)
  }
};

export const WithIcon: Story = {
  args: {
    label: 'Cidade',
    placeholder: 'Selecione uma cidade',
    icon: 'location_city',
    options: cities.slice(0, 5)
  }
};

export const Required: Story = {
  args: {
    label: 'País',
    placeholder: 'Selecione um país *',
    required: true,
    options: countries.slice(0, 5),
    icon: 'public'
  }
};

export const Disabled: Story = {
  args: {
    label: 'País (Desabilitado)',
    placeholder: 'Não disponível',
    disabled: true,
    options: countries.slice(0, 5),
    icon: 'lock'
  }
};

export const Readonly: Story = {
  args: {
    label: 'País (Somente Leitura)',
    readonly: true,
    options: countries.slice(0, 5)
  }
};

// ========== VALIDAÇÕES ==========

export const WithError: Story = {
  args: {
    label: 'País',
    placeholder: 'Selecione um país',
    error: true,
    errorMessage: 'Este campo é obrigatório',
    options: countries.slice(0, 5),
    icon: 'public'
  }
};

export const WithSuccess: Story = {
  args: {
    label: 'País',
    placeholder: 'Selecione um país',
    success: true,
    successMessage: 'Seleção válida!',
    options: countries.slice(0, 5),
    icon: 'public'
  }
};

export const WithHelper: Story = {
  args: {
    label: 'Prioridade',
    placeholder: 'Selecione a prioridade',
    helperText: 'Escolha o nível de urgência da tarefa',
    options: priorities,
    icon: 'flag'
  }
};

// ========== FUNCIONALIDADES ==========

export const Searchable: Story = {
  args: {
    label: 'Estado',
    placeholder: 'Buscar estado...',
    searchable: true,
    options: estados,
    icon: 'search'
  }
};

export const SearchableWithManyOptions: Story = {
  name: 'Busca com Muitas Opções',
  args: {
    label: 'País (Buscar)',
    placeholder: 'Digite para buscar...',
    searchable: true,
    searchPlaceholder: 'Buscar país...',
    options: countries,
    icon: 'search'
  }
};

export const Clearable: Story = {
  args: {
    label: 'Cidade',
    placeholder: 'Selecione uma cidade',
    clearable: true,
    options: cities,
    icon: 'location_city',
    helperText: 'Clique no X para limpar a seleção'
  }
};

export const SearchableAndClearable: Story = {
  name: 'Busca + Limpar',
  args: {
    label: 'Estado',
    placeholder: 'Buscar estado...',
    searchable: true,
    clearable: true,
    options: estados,
    icon: 'search'
  }
};

export const Multiple: Story = {
  args: {
    label: 'Selecione múltiplos países',
    placeholder: 'Escolha um ou mais países',
    multiple: true,
    options: countries,
    icon: 'public'
  }
};

export const MultipleSearchable: Story = {
  name: 'Múltiplo + Busca',
  args: {
    label: 'Cidades',
    placeholder: 'Selecione cidades...',
    multiple: true,
    searchable: true,
    clearable: true,
    options: cities,
    icon: 'location_city',
    maxTags: 2
  }
};

export const NativeSelect: Story = {
  name: 'Select Nativo',
  args: {
    label: 'País (Nativo)',
    placeholder: 'Selecione',
    useNative: true,
    options: countries.slice(0, 5)
  }
};

// ========== COM DESCRIÇÕES ==========

export const WithDescriptions: Story = {
  name: 'Com Descrições',
  args: {
    label: 'Prioridade da Tarefa',
    placeholder: 'Selecione a prioridade',
    options: priorities,
    icon: 'priority_high'
  }
};

export const WithDescriptionsAndSearch: Story = {
  name: 'Descrições + Busca',
  args: {
    label: 'Atribuir para',
    placeholder: 'Buscar usuário...',
    searchable: true,
    options: users,
    icon: 'person_search'
  }
};

// ========== ESTADOS ESPECIAIS ==========

export const Loading: Story = {
  args: {
    label: 'Carregando opções',
    placeholder: 'Aguarde...',
    loading: true,
    loadingText: 'Buscando dados...',
    options: [],
    icon: 'cloud_download'
  }
};

export const Empty: Story = {
  name: 'Sem Opções',
  args: {
    label: 'Sem resultados',
    placeholder: 'Nenhuma opção disponível',
    options: [],
    emptyText: 'Nenhum item encontrado',
    icon: 'search_off'
  }
};

export const DisabledOptions: Story = {
  name: 'Opções Desabilitadas',
  args: {
    label: 'Países',
    placeholder: 'Algumas opções desabilitadas',
    options: [
      { value: 'br', label: 'Brasil', icon: 'flag' },
      { value: 'us', label: 'Estados Unidos (Indisponível)', icon: 'flag', disabled: true },
      { value: 'uk', label: 'Reino Unido', icon: 'flag' },
      { value: 'fr', label: 'França (Indisponível)', icon: 'flag', disabled: true },
      { value: 'de', label: 'Alemanha', icon: 'flag' }
    ],
    icon: 'public'
  }
};

// ========== CASOS DE USO REAIS ==========

export const CountrySelector: Story = {
  name: 'Seletor de País',
  render: () => ({
    template: `
      <div style="max-width: 400px;">
        <web-select
          label="País de Residência"
          placeholder="Selecione seu país"
          [searchable]="true"
          [clearable]="true"
          [options]="countries"
          icon="public"
          helperText="Escolha o país onde você mora atualmente">
        </web-select>
      </div>
    `,
    props: { countries }
  })
};

export const PriorityPicker: Story = {
  name: 'Seletor de Prioridade',
  render: () => ({
    template: `
      <div style="max-width: 400px;">
        <web-select
          label="Prioridade"
          placeholder="Definir prioridade"
          [options]="priorities"
          icon="flag"
          helperText="Selecione o nível de urgência">
        </web-select>
      </div>
    `,
    props: { priorities }
  })
};

export const UserAssignment: Story = {
  name: 'Atribuir Usuário',
  render: () => ({
    template: `
      <div style="max-width: 500px;">
        <web-select
          label="Atribuir Tarefa"
          placeholder="Buscar usuário..."
          [searchable]="true"
          [options]="users"
          icon="person_add"
          helperText="Busque e selecione o responsável pela tarefa">
        </web-select>
      </div>
    `,
    props: { users }
  })
};

export const MultipleSelection: Story = {
  name: 'Seleção Múltipla',
  render: () => ({
    template: `
      <div style="max-width: 500px;">
        <web-select
          label="Selecione Cidades"
          placeholder="Escolha uma ou mais cidades..."
          [multiple]="true"
          [searchable]="true"
          [clearable]="true"
          [options]="cities"
          [maxTags]="2"
          icon="location_city"
          helperText="Você pode selecionar múltiplas cidades">
        </web-select>
      </div>
    `,
    props: { cities }
  })
};

export const AddressForm: Story = {
  name: 'Formulário de Endereço',
  render: () => ({
    template: `
      <div style="max-width: 600px; display: flex; flex-direction: column; gap: 1.5rem; padding: 2rem; background: #f9fafb; border-radius: 0.5rem;">
        <h2 style="margin: 0 0 1rem 0; font-family: Montserrat; color: #443A3A;">Endereço de Entrega</h2>
        
        <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 1rem;">
          <web-select
            label="Estado"
            placeholder="Selecione o estado"
            [searchable]="true"
            [options]="estados"
            icon="map"
            required="true">
          </web-select>
          
          <web-select
            label="Cidade"
            placeholder="Cidade"
            [searchable]="true"
            [options]="cities"
            icon="location_city"
            required="true">
          </web-select>
        </div>
        
        <web-select
          label="País"
          placeholder="Brasil"
          [options]="[{ value: 'br', label: 'Brasil' }]"
          icon="flag"
          readonly="true">
        </web-select>
      </div>
    `,
    props: { estados, cities }
  })
};

export const FilterPanel: Story = {
  name: 'Painel de Filtros',
  render: () => ({
    template: `
      <div style="max-width: 800px; padding: 2rem; background: #f9fafb; border-radius: 0.5rem;">
        <h2 style="margin: 0 0 1.5rem 0; font-family: Montserrat; color: #443A3A;">Filtros Avançados</h2>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem;">
          <web-select
            label="País"
            placeholder="Todos os países"
            [searchable]="true"
            [clearable]="true"
            [options]="countries"
            icon="public">
          </web-select>
          
          <web-select
            label="Cidade"
            placeholder="Todas as cidades"
            [searchable]="true"
            [clearable]="true"
            [multiple]="true"
            [options]="cities"
            [maxTags]="2"
            icon="location_city">
          </web-select>
          
          <web-select
            label="Prioridade"
            placeholder="Todas"
            [clearable]="true"
            [multiple]="true"
            [options]="priorities"
            [maxTags]="2"
            icon="filter_list">
          </web-select>
          
          <web-select
            label="Responsável"
            placeholder="Todos"
            [searchable]="true"
            [clearable]="true"
            [multiple]="true"
            [options]="users"
            [maxTags]="1"
            icon="person">
          </web-select>
        </div>
      </div>
    `,
    props: { countries, cities, priorities, users }
  })
};

export const AllVariants: Story = {
  name: 'Todas as Variações',
  render: () => ({
    template: `
      <div style="max-width: 1200px; display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem;">
        <web-select
          label="Padrão"
          placeholder="Selecione..."
          [options]="countries.slice(0, 3)"
          icon="public">
        </web-select>
        
        <web-select
          label="Com Busca"
          placeholder="Buscar..."
          [searchable]="true"
          [options]="estados.slice(0, 10)"
          icon="search">
        </web-select>
        
        <web-select
          label="Múltiplo"
          placeholder="Vários..."
          [multiple]="true"
          [options]="cities"
          [maxTags]="2"
          icon="done_all">
        </web-select>
        
        <web-select
          label="Com Descrição"
          placeholder="Selecione..."
          [options]="priorities"
          icon="info">
        </web-select>
        
        <web-select
          label="Com Erro"
          placeholder="Obrigatório"
          [error]="true"
          errorMessage="Campo obrigatório"
          [options]="countries.slice(0, 3)"
          icon="error">
        </web-select>
        
        <web-select
          label="Desabilitado"
          placeholder="Não disponível"
          [disabled]="true"
          [options]="countries.slice(0, 3)"
          icon="lock">
        </web-select>
        
        <web-select
          label="Carregando"
          placeholder="Aguarde..."
          [loading]="true"
          [options]="[]"
          icon="cloud_download">
        </web-select>
        
        <web-select
          label="Limpar"
          placeholder="Seleção limpável"
          [clearable]="true"
          [options]="countries.slice(0, 5)"
          icon="public">
        </web-select>
      </div>
    `,
    props: { countries, estados, cities, priorities }
  })
};