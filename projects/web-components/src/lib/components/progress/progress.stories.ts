/**
 * ========================================
 * 📊 PROGRESS BAR MODERNO - MUITO ALÉM DO MATERIAL/BOOTSTRAP!
 * ========================================
 *
 * DIFERENCIAIS:
 * ✅ 8 variantes visuais únicas
 * ✅ Animação de valores suave
 * ✅ Progresso circular/radial
 * ✅ Sistema de etapas (steps)
 * ✅ Segmentos separados
 * ✅ Efeitos: glow, pulse, gradient
 * ✅ Indeterminate mode
 * ✅ 5 tamanhos
 */

import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { ProgressComponent, ProgressStep } from './progress.component';
import { CommonModule } from '@angular/common';

const meta: Meta<ProgressComponent> = {
  title: 'Buttons & Indicators/Progress',
  component: ProgressComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [ProgressComponent, CommonModule],
    }),
  ],
};

export default meta;
type Story = StoryObj<ProgressComponent>;

// ========== VARIANTES ==========

export const Default: Story = {
  args: {
    value: 75,
    label: 'Download',
    showLabel: true,
    showValue: true,
    unit: 'MB',
  }
};

export const Gradient: Story = {
  name: 'Gradiente Animado',
  args: {
    value: 60,
    variant: 'gradient',
    label: 'Processando',
    showLabel: true,
    animated: true,
    size: 'lg',
  }
};

export const Striped: Story = {
  name: 'Listras Animadas',
  args: {
    value: 45,
    variant: 'striped',
    label: 'Upload',
    showLabel: true,
    showValue: true,
    showPercentage: true,
    size: 'lg',
  }
};

export const Glow: Story = {
  name: 'Efeito Neon/Brilho',
  args: {
    value: 80,
    variant: 'glow',
    label: 'Carregando',
    showLabel: true,
    size: 'lg',
  }
};

export const Pulse: Story = {
  name: 'Pulsação',
  args: {
    value: 55,
    variant: 'pulse',
    label: 'Sincronizando',
    showLabel: true,
    showValue: true,
    size: 'lg',
  }
};

export const Segmented: Story = {
  name: 'Segmentos',
  args: {
    value: 70,
    variant: 'segmented',
    segments: 10,
    label: 'Nível XP',
    showLabel: true,
    showValue: true,
    size: 'xl',
  }
};

export const Circular: Story = {
  name: 'Circular',
  args: {
    value: 65,
    variant: 'circular',
    label: 'Completado',
    circularSize: 140,
    strokeWidth: 10,
  }
};

export const Steps: Story = {
  name: 'Progresso por Etapas',
  args: {
    value: 50,
    variant: 'steps',
    size: 'lg',
    steps: [
      { label: 'Carrinho', icon: 'shopping_cart', completed: true },
      { label: 'Dados', icon: 'person', completed: true },
      { label: 'Pagamento', icon: 'payment', completed: false },
      { label: 'Confirmação', icon: 'check_circle', completed: false }
    ],
    activeStep: 1,
    showStepLabels: true,
  }
};

// ========== TAMANHOS ==========

export const AllSizes: Story = {
  name: 'Todos os Tamanhos',
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 2rem; padding: 1rem;">
        <div>
          <p style="margin: 0 0 0.5rem 0; font-family: Montserrat; font-weight: 600;">Extra Small (xs - 4px)</p>
          <web-progress [value]="75" size="xs"></web-progress>
        </div>

        <div>
          <p style="margin: 0 0 0.5rem 0; font-family: Montserrat; font-weight: 600;">Small (sm - 8px)</p>
          <web-progress [value]="75" size="sm"></web-progress>
        </div>

        <div>
          <p style="margin: 0 0 0.5rem 0; font-family: Montserrat; font-weight: 600;">Medium (md - 12px)</p>
          <web-progress [value]="75" size="md"></web-progress>
        </div>

        <div>
          <p style="margin: 0 0 0.5rem 0; font-family: Montserrat; font-weight: 600;">Large (lg - 16px)</p>
          <web-progress [value]="75" size="lg"></web-progress>
        </div>

        <div>
          <p style="margin: 0 0 0.5rem 0; font-family: Montserrat; font-weight: 600;">Extra Large (xl - 24px)</p>
          <web-progress [value]="75" size="xl" [showInnerLabel]="true"></web-progress>
        </div>
      </div>
    `
  })
};

// ========== ESTADOS ==========

export const Indeterminate: Story = {
  name: 'Indeterminado',
  args: {
    indeterminate: true,
    variant: 'glow',
    label: 'Carregando...',
    showLabel: true,
    size: 'lg',
  }
};

export const Complete: Story = {
  name: 'Completo (100%)',
  args: {
    value: 100,
    variant: 'glow',
    label: 'Concluído!',
    showLabel: true,
    showValue: true,
    showPercentage: true,
    statusMessage: '✓ Upload finalizado com sucesso',
    size: 'lg',
  }
};

// ========== INTERATIVO ==========

export const AnimatedProgress: Story = {
  name: 'Animação Automática',
  render: () => ({
    props: {
      progress: 0,
      startProgress() {
        (this as any).progress = 0;
        setTimeout(() => {
          (this as any).progress = 100;
        }, 500);
      }
    },
    template: `
      <div style="padding: 1rem;">
        <button
          (click)="startProgress()"
          style="margin-bottom: 1.5rem; padding: 0.75rem 1.5rem; background: #009ADA; color: white; border: none; border-radius: 0.5rem; font-family: Montserrat; font-weight: 600; cursor: pointer;">
          Iniciar Progresso
        </button>

        <web-progress
          [value]="progress"
          variant="gradient"
          label="Processando"
          [showLabel]="true"
          [showValue]="true"
          [showPercentage]="true"
          [animateValue]="true"
          [animationDuration]="2000"
          size="lg">
        </web-progress>
      </div>
    `
  })
};

export const LiveProgress: Story = {
  name: 'Progresso Ao Vivo',
  render: () => ({
    props: {
      value: 0,
      interval: null as any,
      start() {
        (this as any).value = 0;
        (this as any).interval = setInterval(() => {
          (this as any).value += 1;
          if ((this as any).value >= 100) {
            clearInterval((this as any).interval);
          }
        }, 50);
      },
      stop() {
        if ((this as any).interval) {
          clearInterval((this as any).interval);
        }
      },
      reset() {
        (this as any).stop();
        (this as any).value = 0;
      }
    },
    template: `
      <div style="padding: 1rem;">
        <div style="display: flex; gap: 0.75rem; margin-bottom: 1.5rem;">
          <button
            (click)="start()"
            style="padding: 0.75rem 1.5rem; background: #10b981; color: white; border: none; border-radius: 0.5rem; font-family: Montserrat; font-weight: 600; cursor: pointer;">
            Iniciar
          </button>
          <button
            (click)="stop()"
            style="padding: 0.75rem 1.5rem; background: #dc3545; color: white; border: none; border-radius: 0.5rem; font-family: Montserrat; font-weight: 600; cursor: pointer;">
            Parar
          </button>
          <button
            (click)="reset()"
            style="padding: 0.75rem 1.5rem; background: #6c757d; color: white; border: none; border-radius: 0.5rem; font-family: Montserrat; font-weight: 600; cursor: pointer;">
            Resetar
          </button>
        </div>

        <web-progress
          [value]="value"
          variant="glow"
          label="Download"
          [showLabel]="true"
          [showValue]="true"
          unit="MB"
          [showPercentage]="true"
          [animateValue]="false"
          size="xl"
          [showInnerLabel]="true">
        </web-progress>
      </div>
    `
  })
};

// ========== USE CASES ==========

export const FileUpload: Story = {
  name: 'Upload de Arquivo',
  args: {
    value: 65,
    variant: 'striped',
    label: 'documento.pdf',
    showLabel: true,
    showValue: true,
    unit: 'MB',
    showPercentage: true,
    statusMessage: 'Enviando... 3.2 MB restantes',
    size: 'lg',
  }
};

export const LevelSystem: Story = {
  name: 'Sistema de Níveis',
  args: {
    value: 75,
    variant: 'segmented',
    segments: 20,
    label: 'Nível 12 → Nível 13',
    showLabel: true,
    showValue: true,
    unit: ' XP',
    statusMessage: '750 XP de 1000 XP',
    size: 'xl',
    color: '#ffc107',
  }
};

export const CheckoutSteps: Story = {
  name: 'Checkout (Etapas)',
  args: {
    value: 66,
    variant: 'steps',
    size: 'lg',
    steps: [
      {
        label: 'Carrinho',
        description: '3 itens',
        icon: 'shopping_cart',
        completed: true
      },
      {
        label: 'Entrega',
        description: 'Endereço',
        icon: 'local_shipping',
        completed: true
      },
      {
        label: 'Pagamento',
        description: 'Cartão',
        icon: 'payment',
        completed: false
      },
      {
        label: 'Confirmação',
        description: 'Finalizar',
        icon: 'check_circle',
        completed: false
      }
    ],
    activeStep: 2,
    showStepLabels: true,
  }
};

export const Dashboard: Story = {
  name: 'Dashboard (Circular)',
  render: () => ({
    template: `
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 2rem; padding: 2rem; background: white; border-radius: 1rem;">
        <web-progress
          variant="circular"
          [value]="85"
          label="CPU"
          [circularSize]="140"
          [strokeWidth]="10"
          color="#009ADA">
        </web-progress>

        <web-progress
          variant="circular"
          [value]="62"
          label="RAM"
          [circularSize]="140"
          [strokeWidth]="10"
          color="#10b981">
        </web-progress>

        <web-progress
          variant="circular"
          [value]="45"
          label="Disco"
          [circularSize]="140"
          [strokeWidth]="10"
          color="#ffc107">
        </web-progress>

        <web-progress
          variant="circular"
          [value]="90"
          label="Rede"
          [circularSize]="140"
          [strokeWidth]="10"
          color="#dc3545">
        </web-progress>
      </div>
    `
  })
};
