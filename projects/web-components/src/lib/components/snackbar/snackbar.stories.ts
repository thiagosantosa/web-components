import type { Meta, StoryObj } from '@storybook/angular';
import { Component } from '@angular/core';
import { SnackbarService } from './snackbar.service';
import { applicationConfig } from '@storybook/angular';

@Component({
  selector: 'snackbar-demo',
  standalone: true,
  template: `
    <div style="padding: 32px; font-family: 'Inter', sans-serif;">
      <div style="background: #f9fafb; border-radius: 12px; padding: 24px; max-width: 800px;">
        <h3 style="margin: 0 0 16px 0; font-weight: 600; color: #111827;">
          Snackbar via Service
        </h3>
        <p style="margin: 0 0 24px 0; color: #6b7280; font-size: 14px;">
          Clique nos botões abaixo para ver os snackbars em ação.
        </p>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px;">
          <ng-content></ng-content>
        </div>
      </div>
    </div>
  `
})
class SnackbarDemoWrapper {}

// 1️⃣ Quick Methods Demo
@Component({
  selector: 'quick-methods-demo',
  standalone: true,
  template: `
    <snackbar-demo>
      <button
        (click)="snackbar.success('Operação realizada com sucesso!')"
        style="padding: 12px 20px; background: #22c55e; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 500; font-size: 14px; width: 100%;">
        ✓ Success
      </button>

      <button
        (click)="snackbar.error('Erro ao processar a solicitação')"
        style="padding: 12px 20px; background: #ef4444; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 500; font-size: 14px; width: 100%;">
        ✕ Error
      </button>

      <button
        (click)="snackbar.warning('Atenção: verifique os dados')"
        style="padding: 12px 20px; background: #f59e0b; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 500; font-size: 14px; width: 100%;">
        ⚠ Warning
      </button>

      <button
        (click)="snackbar.info('Nova atualização disponível')"
        style="padding: 12px 20px; background: #3b82f6; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 500; font-size: 14px; width: 100%;">
        ℹ Info
      </button>

      <button
        (click)="snackbar.show('Mensagem genérica')"
        style="padding: 12px 20px; background: #6b7280; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 500; font-size: 14px; width: 100%;">
        Default
      </button>
    </snackbar-demo>
  `
})
class QuickMethodsDemo {
  constructor(public snackbar: SnackbarService) {}
}

// 2️⃣ Variants Demo
@Component({
  selector: 'variants-demo',
  standalone: true,
  template: `
    <snackbar-demo>
      <button
        (click)="showFilled()"
        style="padding: 12px 20px; background: #22c55e; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 500; font-size: 14px; width: 100%;">
        Filled
      </button>

      <button
        (click)="showOutlined()"
        style="padding: 12px 20px; background: #22c55e; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 500; font-size: 14px; width: 100%;">
        Outlined
      </button>

      <button
        (click)="showSoft()"
        style="padding: 12px 20px; background: #22c55e; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 500; font-size: 14px; width: 100%;">
        Soft
      </button>

      <button
        (click)="showStandard()"
        style="padding: 12px 20px; background: #6b7280; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 500; font-size: 14px; width: 100%;">
        Standard
      </button>
    </snackbar-demo>
  `
})
class VariantsDemo {
  constructor(private snackbar: SnackbarService) {}

  showFilled() {
    this.snackbar.show({
      message: 'Snackbar preenchido',
      type: 'success',
      variant: 'filled'
    });
  }

  showOutlined() {
    this.snackbar.show({
      message: 'Snackbar com borda',
      type: 'success',
      variant: 'outlined'
    });
  }

  showSoft() {
    this.snackbar.show({
      message: 'Snackbar suave',
      type: 'success',
      variant: 'soft'
    });
  }

  showStandard() {
    this.snackbar.show({
      message: 'Snackbar padrão',
      type: 'default',
      variant: 'standard'
    });
  }
}

// 3️⃣ Positions Demo
@Component({
  selector: 'positions-demo',
  standalone: true,
  template: `
    <snackbar-demo>
      <button
        (click)="show('top-left')"
        style="padding: 12px 20px; background: #3b82f6; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 500; font-size: 14px; width: 100%;">
        Top Left
      </button>

      <button
        (click)="show('top-center')"
        style="padding: 12px 20px; background: #3b82f6; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 500; font-size: 14px; width: 100%;">
        Top Center
      </button>

      <button
        (click)="show('top-right')"
        style="padding: 12px 20px; background: #3b82f6; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 500; font-size: 14px; width: 100%;">
        Top Right
      </button>

      <button
        (click)="show('bottom-left')"
        style="padding: 12px 20px; background: #22c55e; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 500; font-size: 14px; width: 100%;">
        Bottom Left
      </button>

      <button
        (click)="show('bottom-center')"
        style="padding: 12px 20px; background: #22c55e; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 500; font-size: 14px; width: 100%;">
        Bottom Center
      </button>

      <button
        (click)="show('bottom-right')"
        style="padding: 12px 20px; background: #22c55e; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 500; font-size: 14px; width: 100%;">
        Bottom Right
      </button>
    </snackbar-demo>
  `
})
class PositionsDemo {
  constructor(private snackbar: SnackbarService) {}

  show(position: any) {
    this.snackbar.show({
      message: `Snackbar em ${position}`,
      type: 'info',
      position
    });
  }
}

// 4️⃣ With Action Demo
@Component({
  selector: 'with-action-demo',
  standalone: true,
  template: `
    <snackbar-demo>
      <button
        (click)="showWithAction()"
        style="padding: 12px 20px; background: #1f2937; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 500; font-size: 14px; width: 100%;">
        Mostrar com Ação
      </button>
    </snackbar-demo>
  `
})
class WithActionDemo {
  constructor(private snackbar: SnackbarService) {}

  showWithAction() {
    this.snackbar.show({
      message: 'Item removido do carrinho',
      type: 'default',
      actionLabel: 'Desfazer',
      onAction: () => {
        alert('Ação de Desfazer executada!');
      }
    });
  }
}

// 5️⃣ With Progress Demo
@Component({
  selector: 'with-progress-demo',
  standalone: true,
  template: `
    <snackbar-demo>
      <button
        (click)="showWithProgress()"
        style="padding: 12px 20px; background: #3b82f6; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 500; font-size: 14px; width: 100%;">
        Mostrar com Progress
      </button>
    </snackbar-demo>
  `
})
class WithProgressDemo {
  constructor(private snackbar: SnackbarService) {}

  showWithProgress() {
    this.snackbar.show({
      message: 'Arquivo sendo enviado...',
      type: 'info',
      showProgress: true,
      duration: 5000
    });
  }
}

// 6️⃣ Custom Colors Demo
@Component({
  selector: 'custom-colors-demo',
  standalone: true,
  template: `
    <snackbar-demo>
      <button
        (click)="showPurple()"
        style="padding: 12px 20px; background: #a855f7; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 500; font-size: 14px; width: 100%;">
        Roxo
      </button>

      <button
        (click)="showPink()"
        style="padding: 12px 20px; background: #ec4899; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 500; font-size: 14px; width: 100%;">
        Rosa
      </button>

      <button
        (click)="showCyan()"
        style="padding: 12px 20px; background: #06b6d4; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 500; font-size: 14px; width: 100%;">
        Ciano
      </button>

      <button
        (click)="showGradient()"
        style="padding: 12px 20px; background: #667eea; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 500; font-size: 14px; width: 100%;">
        Gradient
      </button>
    </snackbar-demo>
  `
})
class CustomColorsDemo {
  constructor(private snackbar: SnackbarService) {}

  showPurple() {
    this.snackbar.show({
      message: 'Snackbar roxo customizado',
      backgroundColor: '#a855f7',
      textColor: '#ffffff'
    });
  }

  showPink() {
    this.snackbar.show({
      message: 'Snackbar rosa customizado',
      backgroundColor: '#ec4899',
      textColor: '#ffffff'
    });
  }

  showCyan() {
    this.snackbar.show({
      message: 'Snackbar ciano customizado',
      backgroundColor: '#06b6d4',
      textColor: '#ffffff'
    });
  }

  showGradient() {
    this.snackbar.show({
      message: 'Snackbar gradient-style',
      backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      textColor: '#ffffff'
    });
  }
}

// 7️⃣ Complete Demo
@Component({
  selector: 'complete-demo',
  standalone: true,
  template: `
    <snackbar-demo>
      <button
        (click)="showComplete()"
        style="padding: 12px 20px; background: #22c55e; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 500; font-size: 14px; width: 100%;">
        Exemplo Completo
      </button>
    </snackbar-demo>
  `
})
class CompleteDemo {
  constructor(private snackbar: SnackbarService) {}

  showComplete() {
    this.snackbar.show({
      message: 'Produto adicionado ao carrinho!',
      type: 'success',
      variant: 'filled',
      position: 'top-right',
      icon: 'shopping_cart',
      actionLabel: 'Ver Carrinho',
      showProgress: true,
      duration: 5000,
      closable: true,
      onAction: () => {
        alert('Navegando para o carrinho...');
      },
      onClosed: () => {
        console.log('Snackbar fechado');
      }
    });
  }
}

const meta: Meta = {
  title: 'Popups & Modals/Snackbar',
  component: SnackbarDemoWrapper,
  decorators: [
    applicationConfig({
      providers: [SnackbarService]
    })
  ],
  tags: ['autodocs'],
  parameters: {
  docs: {
    description: {
      component: `
# Snackbar Service - Uso Programático

O Snackbar é usado **EXCLUSIVAMENTE via Service**, não como componente no template.

---

## 📦 Como Usar

### 1. Injetar o Service
\`\`\`typescript
import { SnackbarService } from '@thiagosantosa/web-components';

export class MyComponent {
  constructor(private snackbar: SnackbarService) {}
}
\`\`\`

### 2. Métodos Rápidos
\`\`\`typescript
this.snackbar.success('Salvo com sucesso!');
this.snackbar.error('Erro ao salvar');
this.snackbar.warning('Atenção necessária');
this.snackbar.info('Nova atualização disponível');
\`\`\`

---

## Exemplos de Código

### Métodos Rápidos
\`\`\`typescript
this.snackbar.success('Salvo!');
this.snackbar.error('Erro!');
this.snackbar.warning('Atenção!');
this.snackbar.info('Info!');
\`\`\`

### Com Configuração Completa
\`\`\`typescript
this.snackbar.show({
  message: 'Produto adicionado!',
  type: 'success',
  variant: 'filled',
  position: 'top-right',
  icon: 'shopping_cart',
  actionLabel: 'Ver',
  showProgress: true,
  duration: 5000,
  onAction: () => this.goToCart()
});
\`\`\`

### Após Salvar Formulário
\`\`\`typescript
async saveForm() {
  try {
    await this.api.save(this.form.value);
    this.snackbar.success('Dados salvos!');
    this.router.navigate(['/list']);
  } catch (error) {
    this.snackbar.error('Erro ao salvar');
  }
}
\`\`\`

### Com Ação de Desfazer
\`\`\`typescript
deleteItem(item: any) {
  this.items = this.items.filter(i => i.id !== item.id);

  this.snackbar.show({
    message: 'Item removido',
    actionLabel: 'Desfazer',
    duration: 5000,
    onAction: () => {
      this.items.push(item);
    }
  });
}
\`\`\`
      `
    }
  }
},
};

export default meta;
type Story = StoryObj;

/**
 * Métodos rápidos para cada tipo de snackbar.
 */
export const QuickMethods: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [SnackbarDemoWrapper, QuickMethodsDemo]
    },
    template: '<quick-methods-demo></quick-methods-demo>'
  })
};

/**
 * Todas as 4 variantes disponíveis.
 */
export const Variants: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [SnackbarDemoWrapper, VariantsDemo]
    },
    template: '<variants-demo></variants-demo>'
  })
};

/**
 * Diferentes posições na tela.
 */
export const Positions: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [SnackbarDemoWrapper, PositionsDemo]
    },
    template: '<positions-demo></positions-demo>'
  })
};

/**
 * Com ações customizadas.
 */
export const WithAction: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [SnackbarDemoWrapper, WithActionDemo]
    },
    template: '<with-action-demo></with-action-demo>'
  })
};

/**
 * Com progress bar visual.
 */
export const WithProgress: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [SnackbarDemoWrapper, WithProgressDemo]
    },
    template: '<with-progress-demo></with-progress-demo>'
  })
};

/**
 * Com cores customizadas.
 */
export const CustomColors: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [SnackbarDemoWrapper, CustomColorsDemo]
    },
    template: '<custom-colors-demo></custom-colors-demo>'
  })
};

/**
 * Exemplo completo com todas as features.
 */
export const Complete: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [SnackbarDemoWrapper, CompleteDemo]
    },
    template: '<complete-demo></complete-demo>'
  })
};


export const CodeExamples: Story = {
  parameters: {
    docs: {
      source: {
        code: `
// Métodos Rápidos
this.snackbar.success('Salvo!');
this.snackbar.error('Erro!');
this.snackbar.warning('Atenção!');
this.snackbar.info('Info!');

// Com Configuração Completa
this.snackbar.show({
  message: 'Produto adicionado!',
  type: 'success',
  variant: 'filled',
  position: 'top-right',
  icon: 'shopping_cart',
  actionLabel: 'Ver',
  showProgress: true,
  duration: 5000,
  onAction: () => this.goToCart()
});
        `
      }
    }
  }
};
