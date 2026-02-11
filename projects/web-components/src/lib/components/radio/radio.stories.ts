import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { RadioComponent } from './radio.component';
import { FormsModule } from '@angular/forms';

const meta: Meta<RadioComponent> = {
  title: 'Form Controls/Radio',
  component: RadioComponent,
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
\`\`\`ts
import { RadioComponent } from '@web/ui-components';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-meu-componente',
  standalone: true,
  imports: [
    RadioComponent,
    FormsModule,
    ReactiveFormsModule
  ],
  template: \`
    <web-radio name="opcao" value="1" label="Opção 1" [(ngModel)]="selecionado"></web-radio>
    <web-radio name="opcao" value="2" label="Opção 2" [(ngModel)]="selecionado"></web-radio>
  \`
})
export class MeuComponente {
  selecionado = '1';
}
\`\`\`

3️⃣ USO NO TEMPLATE
-------------------

⚠️ IMPORTANTE: Todos os radios do MESMO GRUPO devem ter o MESMO "name"

### Two-Way Binding
\`\`\`html
<web-radio name="pagamento" value="credito" label="Cartão de Crédito" [(ngModel)]="metodoPagamento"></web-radio>
<web-radio name="pagamento" value="debito" label="Cartão de Débito" [(ngModel)]="metodoPagamento"></web-radio>
<web-radio name="pagamento" value="pix" label="PIX" [(ngModel)]="metodoPagamento"></web-radio>
\`\`\`

\`\`\`ts
metodoPagamento = 'credito';
\`\`\`

### Reactive Forms
\`\`\`html
<form [formGroup]="meuForm">
  <web-radio name="genero" value="M" label="Masculino" formControlName="genero"></web-radio>
  <web-radio name="genero" value="F" label="Feminino" formControlName="genero"></web-radio>
</form>
\`\`\`

4️⃣ CONFIGURANDO REACTIVE FORMS
-------------------------------
\`\`\`ts
this.meuForm = this.fb.group({
  genero: ['', Validators.required],
  plano: ['pro', Validators.required]
});
\`\`\`

5️⃣ VARIANTES DISPONÍVEIS
-------------------------
\`\`\`html
<web-radio variant="button" name="tamanho" value="P" label="P"></web-radio>
<web-radio variant="card" name="plano" value="basic" label="Plano Básico" description="R$ 29/mês"></web-radio>
<web-radio variant="inline" name="resposta" value="sim" label="Sim"></web-radio>
\`\`\`

6️⃣ CORES DISPONÍVEIS
---------------------
\`\`\`html
<web-radio color="primary" label="Primary"></web-radio>
<web-radio color="success" label="Success"></web-radio>
<web-radio color="danger" label="Danger"></web-radio>
<web-radio color="warning" label="Warning"></web-radio>
\`\`\`

❌ ERRO COMUM
--------------
\`\`\`html
<!-- ERRADO -->
<web-radio name="opcao1" value="1"></web-radio>
<web-radio name="opcao2" value="2"></web-radio>

<!-- CORRETO -->
<web-radio name="opcao" value="1"></web-radio>
<web-radio name="opcao" value="2"></web-radio>
\`\`\`

💡 DICA: Veja os exemplos abaixo para conhecer todas as variações disponíveis!
        `
      }
    }
  },
  decorators: [
    moduleMetadata({
      imports: [RadioComponent, FormsModule],
    }),
  ],
};

export default meta;
type Story = StoryObj<RadioComponent>;

// ========== BASIC ==========

export const Default: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 0.75rem;">
        <web-radio name="option" value="1" label="Opção 1"></web-radio>
        <web-radio name="option" value="2" label="Opção 2"></web-radio>
        <web-radio name="option" value="3" label="Opção 3"></web-radio>
      </div>
    `
  })
};

export const WithDescription: Story = {
  name: 'Com Descrição',
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <web-radio 
          name="plan" 
          value="basic" 
          label="Plano Básico"
          description="Ideal para uso pessoal • R$ 29,90/mês">
        </web-radio>
        <web-radio 
          name="plan" 
          value="pro" 
          label="Plano Professional"
          description="Para profissionais • R$ 59,90/mês">
        </web-radio>
        <web-radio 
          name="plan" 
          value="enterprise" 
          label="Plano Enterprise"
          description="Para empresas • R$ 99,90/mês">
        </web-radio>
      </div>
    `
  })
};

export const Disabled: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 0.75rem;">
        <web-radio name="status" value="available" label="Disponível"></web-radio>
        <web-radio name="status" value="locked" label="Bloqueado (faça upgrade)" [disabled]="true"></web-radio>
        <web-radio name="status" value="soon" label="Em breve" [disabled]="true"></web-radio>
      </div>
    `
  })
};

// ========== SIZES ==========

export const AllSizes: Story = {
  name: 'Todos os Tamanhos',
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 2rem;">
        <div>
          <h4 style="margin: 0 0 0.5rem 0; font-family: Montserrat; color: #6c757d;">SMALL</h4>
          <div style="display: flex; flex-direction: column; gap: 0.5rem;">
            <web-radio name="size-small" value="1" label="Opção 1" size="small"></web-radio>
            <web-radio name="size-small" value="2" label="Opção 2" size="small"></web-radio>
          </div>
        </div>
        
        <div>
          <h4 style="margin: 0 0 0.5rem 0; font-family: Montserrat; color: #6c757d;">MEDIUM (Padrão)</h4>
          <div style="display: flex; flex-direction: column; gap: 0.75rem;">
            <web-radio name="size-medium" value="1" label="Opção 1" size="medium"></web-radio>
            <web-radio name="size-medium" value="2" label="Opção 2" size="medium"></web-radio>
          </div>
        </div>
        
        <div>
          <h4 style="margin: 0 0 0.5rem 0; font-family: Montserrat; color: #6c757d;">LARGE</h4>
          <div style="display: flex; flex-direction: column; gap: 1rem;">
            <web-radio name="size-large" value="1" label="Opção 1" size="large"></web-radio>
            <web-radio name="size-large" value="2" label="Opção 2" size="large"></web-radio>
          </div>
        </div>
      </div>
    `
  })
};

// ========== COLORS ==========

export const AllColors: Story = {
  name: 'Todas as Cores',
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <web-radio name="colors-demo" value="primary" label="Primary" color="primary"></web-radio>
        <web-radio name="colors-demo" value="success" label="Success" color="success"></web-radio>
        <web-radio name="colors-demo" value="danger" label="Danger" color="danger"></web-radio>
        <web-radio name="colors-demo" value="warning" label="Warning" color="warning"></web-radio>
        <web-radio name="colors-demo" value="info" label="Info" color="info"></web-radio>
        <web-radio name="colors-demo" value="dark" label="Dark" color="dark"></web-radio>
      </div>
    `
  })
};

// ========== VARIANTS ==========

export const ButtonStyle: Story = {
  name: 'Estilo Botão',
  render: () => ({
    template: `
      <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
        <web-radio name="button-demo" value="1" label="Opção 1" variant="button"></web-radio>
        <web-radio name="button-demo" value="2" label="Opção 2" variant="button"></web-radio>
        <web-radio name="button-demo" value="3" label="Opção 3" variant="button"></web-radio>
        <web-radio name="button-demo" value="4" label="Opção 4" variant="button"></web-radio>
      </div>
    `
  })
};

export const CardStyle: Story = {
  name: 'Estilo Card',
  render: () => ({
    template: `
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem; max-width: 900px;">
        <web-radio 
          name="card-demo" 
          value="starter" 
          label="Starter" 
          description="R$ 0/mês • Até 3 projetos • 1GB storage"
          variant="card">
        </web-radio>
        <web-radio 
          name="card-demo" 
          value="pro" 
          label="Professional" 
          description="R$ 59/mês • Projetos ilimitados • 50GB"
          variant="card">
        </web-radio>
        <web-radio 
          name="card-demo" 
          value="enterprise" 
          label="Enterprise" 
          description="R$ 99/mês • Tudo ilimitado • Suporte"
          variant="card">
        </web-radio>
      </div>
    `
  })
};

export const Inline: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 0.5rem;">
        <web-radio name="inline-demo" value="1" label="Sim" variant="inline"></web-radio>
        <web-radio name="inline-demo" value="2" label="Não" variant="inline"></web-radio>
        <web-radio name="inline-demo" value="3" label="Talvez" variant="inline"></web-radio>
      </div>
    `
  })
};

// ========== USE CASES ==========

export const PaymentMethod: Story = {
  name: 'Método de Pagamento',
  render: () => ({
    template: `
      <div style="max-width: 500px; padding: 2rem; background: white; border-radius: 0.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
        <h3 style="margin: 0 0 0.5rem 0; font-family: Montserrat;">Selecione o método de pagamento</h3>
        <p style="margin: 0 0 1.5rem 0; color: #6c757d; font-family: Montserrat; font-size: 0.875rem;">
          Escolha como deseja pagar sua compra
        </p>
        
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          <web-radio 
            name="payment" 
            value="credit" 
            label="Cartão de Crédito"
            description="Parcelamento em até 12x sem juros">
          </web-radio>
          
          <web-radio 
            name="payment" 
            value="debit" 
            label="Cartão de Débito"
            description="Pagamento à vista com desconto">
          </web-radio>
          
          <web-radio 
            name="payment" 
            value="pix" 
            label="PIX"
            description="Aprovação imediata • Desconto de 5%"
            color="success">
          </web-radio>
          
          <web-radio 
            name="payment" 
            value="boleto" 
            label="Boleto Bancário"
            description="Vencimento em 3 dias úteis">
          </web-radio>
        </div>
        
        <button style="margin-top: 2rem; width: 100%; padding: 0.875rem; background: #009ADA; color: white; border: none; border-radius: 0.375rem; font-family: Montserrat; font-weight: 500; cursor: pointer;">
          Continuar para Pagamento
        </button>
      </div>
    `
  })
};

export const ShippingOptions: Story = {
  name: 'Opções de Entrega',
  render: () => ({
    template: `
      <div style="max-width: 600px; padding: 2rem; border: 1px solid #e5e7eb; border-radius: 0.5rem;">
        <h3 style="margin: 0 0 1.5rem 0; font-family: Montserrat;">Escolha a forma de entrega</h3>
        
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          <div style="padding: 1rem; border: 2px solid #e5e7eb; border-radius: 0.5rem; transition: all 0.2s;">
            <web-radio 
              name="shipping" 
              value="standard" 
              label="Entrega Padrão"
              description="Receba em 7-10 dias úteis • Grátis">
            </web-radio>
          </div>
          
          <div style="padding: 1rem; border: 2px solid #e5e7eb; border-radius: 0.5rem; transition: all 0.2s;">
            <web-radio 
              name="shipping" 
              value="express" 
              label="Entrega Expressa"
              description="Receba em 2-3 dias úteis • R$ 25,00"
              color="primary">
            </web-radio>
          </div>
          
          <div style="padding: 1rem; border: 2px solid #e5e7eb; border-radius: 0.5rem; transition: all 0.2s;">
            <web-radio 
              name="shipping" 
              value="same-day" 
              label="Entrega no Mesmo Dia"
              description="Receba hoje antes das 20h • R$ 45,00"
              color="success">
            </web-radio>
          </div>
        </div>
      </div>
    `
  })
};

export const Quiz: Story = {
  render: () => ({
    template: `
      <div style="max-width: 600px; padding: 2rem; background: white; border-radius: 0.5rem; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
        <div style="margin-bottom: 0.5rem;">
          <span style="font-family: Montserrat; font-size: 0.875rem; font-weight: 600; color: #009ADA;">
            PERGUNTA 1 DE 5
          </span>
        </div>
        
        <h3 style="margin: 0 0 1.5rem 0; font-family: Montserrat; font-size: 1.25rem;">
          Qual é a capital do Brasil?
        </h3>
        
        <div style="display: flex; flex-direction: column; gap: 0.75rem;">
          <web-radio 
            name="quiz1" 
            value="a" 
            label="A) São Paulo"
            variant="button">
          </web-radio>
          <web-radio 
            name="quiz1" 
            value="b" 
            label="B) Rio de Janeiro"
            variant="button">
          </web-radio>
          <web-radio 
            name="quiz1" 
            value="c" 
            label="C) Brasília"
            variant="button">
          </web-radio>
          <web-radio 
            name="quiz1" 
            value="d" 
            label="D) Salvador"
            variant="button">
          </web-radio>
        </div>
        
        <button style="margin-top: 2rem; padding: 0.75rem 2rem; background: #009ADA; color: white; border: none; border-radius: 0.375rem; font-family: Montserrat; font-weight: 500; cursor: pointer;">
          Próxima Pergunta →
        </button>
      </div>
    `
  })
};

export const PricingPlans: Story = {
  name: 'Planos de Preço',
  render: () => ({
    template: `
      <div style="max-width: 1200px; margin: 0 auto;">
        <div style="text-align: center; margin-bottom: 3rem;">
          <h2 style="margin: 0 0 0.5rem 0; font-family: Montserrat; font-size: 2rem;">
            Escolha seu plano
          </h2>
          <p style="margin: 0; color: #6c757d; font-family: Montserrat;">
            Cancele quando quiser, sem compromisso
          </p>
        </div>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem;">
          <web-radio 
            name="pricing" 
            value="basic" 
            variant="card"
            label="Básico"
            description="R$ 29/mês">
            <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid #e5e7eb;">
              <div style="display: flex; flex-direction: column; gap: 0.75rem; font-family: Montserrat; font-size: 0.875rem;">
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                  <span class="material-symbols-outlined" style="font-size: 1.125rem; color: #28a745;">check</span>
                  <span>10 projetos</span>
                </div>
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                  <span class="material-symbols-outlined" style="font-size: 1.125rem; color: #28a745;">check</span>
                  <span>5GB storage</span>
                </div>
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                  <span class="material-symbols-outlined" style="font-size: 1.125rem; color: #28a745;">check</span>
                  <span>Suporte email</span>
                </div>
              </div>
            </div>
          </web-radio>
          
          <web-radio 
            name="pricing" 
            value="pro" 
            variant="card"
            label="Professional"
            description="R$ 59/mês"
            color="primary">
            <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid #e5e7eb;">
              <div style="display: flex; flex-direction: column; gap: 0.75rem; font-family: Montserrat; font-size: 0.875rem;">
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                  <span class="material-symbols-outlined" style="font-size: 1.125rem; color: #28a745;">check</span>
                  <span>Projetos ilimitados</span>
                </div>
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                  <span class="material-symbols-outlined" style="font-size: 1.125rem; color: #28a745;">check</span>
                  <span>50GB storage</span>
                </div>
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                  <span class="material-symbols-outlined" style="font-size: 1.125rem; color: #28a745;">check</span>
                  <span>Suporte prioritário</span>
                </div>
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                  <span class="material-symbols-outlined" style="font-size: 1.125rem; color: #28a745;">check</span>
                  <span>Colaboração</span>
                </div>
              </div>
            </div>
          </web-radio>
          
          <web-radio 
            name="pricing" 
            value="enterprise" 
            variant="card"
            label="Enterprise"
            description="R$ 99/mês">
            <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid #e5e7eb;">
              <div style="display: flex; flex-direction: column; gap: 0.75rem; font-family: Montserrat; font-size: 0.875rem;">
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                  <span class="material-symbols-outlined" style="font-size: 1.125rem; color: #28a745;">check</span>
                  <span>Tudo ilimitado</span>
                </div>
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                  <span class="material-symbols-outlined" style="font-size: 1.125rem; color: #28a745;">check</span>
                  <span>Storage ilimitado</span>
                </div>
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                  <span class="material-symbols-outlined" style="font-size: 1.125rem; color: #28a745;">check</span>
                  <span>Suporte 24/7</span>
                </div>
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                  <span class="material-symbols-outlined" style="font-size: 1.125rem; color: #28a745;">check</span>
                  <span>SLA garantido</span>
                </div>
              </div>
            </div>
          </web-radio>
        </div>
        
        <div style="text-align: center; margin-top: 3rem;">
          <button style="padding: 1rem 3rem; background: #009ADA; color: white; border: none; border-radius: 0.5rem; font-family: Montserrat; font-weight: 600; font-size: 1rem; cursor: pointer; box-shadow: 0 4px 6px rgba(0, 154, 218, 0.2);">
            Continuar
          </button>
        </div>
      </div>
    `
  })
};

export const SurveyQuestion: Story = {
  name: 'Pergunta de Pesquisa',
  render: () => ({
    template: `
      <div style="max-width: 500px; padding: 2rem; background: white; border-radius: 0.5rem; border: 1px solid #e5e7eb;">
        <h3 style="margin: 0 0 0.5rem 0; font-family: Montserrat;">
          Como você avalia nosso atendimento?
        </h3>
        <p style="margin: 0 0 1.5rem 0; color: #6c757d; font-family: Montserrat; font-size: 0.875rem;">
          Sua opinião é muito importante para nós
        </p>
        
        <div style="display: flex; flex-direction: column; gap: 0.75rem;">
          <web-radio 
            name="rating" 
            value="5" 
            label="⭐⭐⭐⭐⭐ Excelente"
            color="success">
          </web-radio>
          <web-radio 
            name="rating" 
            value="4" 
            label="⭐⭐⭐⭐ Bom"
            color="success">
          </web-radio>
          <web-radio 
            name="rating" 
            value="3" 
            label="⭐⭐⭐ Regular"
            color="warning">
          </web-radio>
          <web-radio 
            name="rating" 
            value="2" 
            label="⭐⭐ Ruim"
            color="warning">
          </web-radio>
          <web-radio 
            name="rating" 
            value="1" 
            label="⭐ Péssimo"
            color="danger">
          </web-radio>
        </div>
        
        <button style="margin-top: 2rem; width: 100%; padding: 0.75rem; background: #009ADA; color: white; border: none; border-radius: 0.375rem; font-family: Montserrat; font-weight: 500; cursor: pointer;">
          Enviar Avaliação
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
            <web-radio name="default-group" value="1" label="Opção 1"></web-radio>
            <web-radio name="default-group" value="2" label="Opção 2"></web-radio>
            <web-radio name="default-group" value="3" label="Opção 3"></web-radio>
          </div>
        </div>

        <div>
          <h3 style="font-family: Montserrat; margin-bottom: 1rem;">Button</h3>
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
            <web-radio name="button-group" value="1" label="Opção 1" variant="button"></web-radio>
            <web-radio name="button-group" value="2" label="Opção 2" variant="button"></web-radio>
            <web-radio name="button-group" value="3" label="Opção 3" variant="button"></web-radio>
          </div>
        </div>

        <div>
          <h3 style="font-family: Montserrat; margin-bottom: 1rem;">Card</h3>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; max-width: 800px;">
            <web-radio name="card-group" value="1" label="Opção 1" description="Descrição" variant="card"></web-radio>
            <web-radio name="card-group" value="2" label="Opção 2" description="Descrição" variant="card"></web-radio>
            <web-radio name="card-group" value="3" label="Opção 3" description="Descrição" variant="card"></web-radio>
          </div>
        </div>

        <div>
          <h3 style="font-family: Montserrat; margin-bottom: 1rem;">Inline</h3>
          <div style="display: flex; gap: 0.5rem;">
            <web-radio name="inline-group" value="1" label="Opção 1" variant="inline"></web-radio>
            <web-radio name="inline-group" value="2" label="Opção 2" variant="inline"></web-radio>
            <web-radio name="inline-group" value="3" label="Opção 3" variant="inline"></web-radio>
          </div>
        </div>
      </div>
    `
  })
};