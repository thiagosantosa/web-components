import { Injectable, ApplicationRef, ComponentRef, createComponent, EnvironmentInjector } from '@angular/core';
import { SnackbarComponent, SnackbarPosition, SnackbarType, SnackbarVariant } from './snackbar.component';

export interface SnackbarConfig {
  message: string;
  type?: SnackbarType;
  variant?: SnackbarVariant;
  position?: SnackbarPosition;
  icon?: string;
  actionLabel?: string;
  duration?: number;
  closable?: boolean;
  showProgress?: boolean;
  backgroundColor?: string;
  textColor?: string;
  iconColor?: string;
  borderColor?: string;
  progressColor?: string;
  onAction?: () => void;
  onClosed?: () => void;
}

/**
 * # Snackbar Service
 *
 * Serviço para exibir snackbars programaticamente de qualquer componente.
 *
 * ## 📦 Como Usar
 *
 * ### 1. Injetar o Service
 * ```typescript
 * import { SnackbarService } from '@thiagosantosa/web-components';
 *
 * @Component({
 *   selector: 'app-my-component'
 * })
 * export class MyComponent {
 *   constructor(private snackbar: SnackbarService) {}
 * }
 * ```
 *
 * ### 2. Métodos Rápidos
 * ```typescript
 * // Success
 * this.snackbar.success('Salvo com sucesso!');
 *
 * // Error
 * this.snackbar.error('Erro ao salvar');
 *
 * // Warning
 * this.snackbar.warning('Atenção necessária');
 *
 * // Info
 * this.snackbar.info('Nova atualização disponível');
 *
 * // Default
 * this.snackbar.show('Mensagem genérica');
 * ```
 *
 * ### 3. Com Configuração Completa
 * ```typescript
 * this.snackbar.show({
 *   message: 'Produto adicionado ao carrinho!',
 *   type: 'success',
 *   variant: 'filled',
 *   position: 'top-right',
 *   icon: 'shopping_cart',
 *   actionLabel: 'Ver Carrinho',
 *   duration: 5000,
 *   showProgress: true,
 *   onAction: () => {
 *     this.router.navigate(['/cart']);
 *   },
 *   onClosed: () => {
 *     console.log('Snackbar fechado');
 *   }
 * });
 * ```
 *
 * ### 4. Com Cores Customizadas
 * ```typescript
 * this.snackbar.show({
 *   message: 'Snackbar roxo personalizado',
 *   backgroundColor: '#a855f7',
 *   textColor: '#ffffff',
 *   iconColor: '#ffffff',
 *   duration: 5000
 * });
 * ```
 *
 * ### 5. Com Ação
 * ```typescript
 * this.snackbar.show({
 *   message: 'Item removido',
 *   actionLabel: 'Desfazer',
 *   onAction: () => {
 *     this.undoRemove();
 *   }
 * });
 * ```
 *
 * ### 6. Sem Auto-dismiss (Infinito)
 * ```typescript
 * this.snackbar.show({
 *   message: 'Processando...',
 *   duration: 0, // 0 = não fecha automaticamente
 *   closable: true
 * });
 * ```
 *
 * ## 💡 Exemplos Práticos
 *
 * ### Após Salvar Formulário
 * ```typescript
 * async saveForm() {
 *   try {
 *     await this.api.save(this.form.value);
 *
 *     this.snackbar.success('Dados salvos com sucesso!');
 *     this.router.navigate(['/list']);
 *   } catch (error) {
 *     this.snackbar.error('Erro ao salvar os dados');
 *   }
 * }
 * ```
 *
 * ### Após Deletar Item
 * ```typescript
 * deleteItem(item: any) {
 *   this.items = this.items.filter(i => i.id !== item.id);
 *
 *   this.snackbar.show({
 *     message: 'Item removido',
 *     type: 'default',
 *     actionLabel: 'Desfazer',
 *     duration: 5000,
 *     onAction: () => {
 *       this.items.push(item); // Restaura o item
 *     }
 *   });
 * }
 * ```
 *
 * ### Upload de Arquivo
 * ```typescript
 * async uploadFile(file: File) {
 *   this.snackbar.info('Enviando arquivo...');
 *
 *   try {
 *     await this.api.upload(file);
 *     this.snackbar.success('Arquivo enviado com sucesso!');
 *   } catch (error) {
 *     this.snackbar.error('Falha ao enviar arquivo');
 *   }
 * }
 * ```
 *
 * ### Copiar para Clipboard
 * ```typescript
 * copyToClipboard(text: string) {
 *   navigator.clipboard.writeText(text);
 *
 *   this.snackbar.show({
 *     message: 'Copiado para área de transferência!',
 *     type: 'success',
 *     position: 'bottom-center',
 *     duration: 2000
 *   });
 * }
 * ```
 *
 * ### Adicionar ao Carrinho
 * ```typescript
 * addToCart(product: Product) {
 *   this.cart.add(product);
 *
 *   this.snackbar.show({
 *     message: `${product.name} adicionado ao carrinho`,
 *     type: 'success',
 *     icon: 'shopping_cart',
 *     actionLabel: 'Ver Carrinho',
 *     showProgress: true,
 *     duration: 4000,
 *     onAction: () => {
 *       this.router.navigate(['/cart']);
 *     }
 *   });
 * }
 * ```
 *
 * ### Login com Erro
 * ```typescript
 * async login(credentials: any) {
 *   try {
 *     await this.auth.login(credentials);
 *
 *     this.snackbar.success('Login realizado com sucesso!');
 *     this.router.navigate(['/dashboard']);
 *   } catch (error) {
 *     this.snackbar.show({
 *       message: 'Usuário ou senha inválidos',
 *       type: 'error',
 *       position: 'top-center',
 *       duration: 5000
 *     });
 *   }
 * }
 * ```
 *
 * ### Validação de Formulário
 * ```typescript
 * validateAndSubmit() {
 *   if (this.form.invalid) {
 *     this.snackbar.warning('Preencha todos os campos obrigatórios');
 *     return;
 *   }
 *
 *   this.submit();
 * }
 * ```
 *
 * ### Notificação de Sistema
 * ```typescript
 * ngOnInit() {
 *   this.websocket.onMessage().subscribe(msg => {
 *     this.snackbar.show({
 *       message: msg.content,
 *       type: 'info',
 *       icon: 'notifications',
 *       position: 'top-right',
 *       duration: 6000,
 *       actionLabel: 'Ver',
 *       onAction: () => {
 *         this.openNotification(msg);
 *       }
 *     });
 *   });
 * }
 * ```
 *
 * ### Com Progress para Operação Longa
 * ```typescript
 * async processLargeFile() {
 *   this.snackbar.show({
 *     message: 'Processando arquivo grande...',
 *     type: 'info',
 *     showProgress: true,
 *     duration: 10000, // 10 segundos
 *     closable: false
 *   });
 *
 *   try {
 *     await this.api.processFile();
 *     this.snackbar.success('Arquivo processado!');
 *   } catch (error) {
 *     this.snackbar.error('Erro no processamento');
 *   }
 * }
 * ```
 */
@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  private snackbarRefs: ComponentRef<SnackbarComponent>[] = [];

  constructor(
    private appRef: ApplicationRef,
    private injector: EnvironmentInjector
  ) {}

  /**
   * Exibe um snackbar com configuração completa
   */
  show(config: SnackbarConfig | string): void {
    const snackbarConfig: SnackbarConfig = typeof config === 'string'
      ? { message: config }
      : config;

    // Create component
    const componentRef = createComponent(SnackbarComponent, {
      environmentInjector: this.injector
    });

    // Set inputs
    componentRef.setInput('show', true);
    componentRef.setInput('message', snackbarConfig.message);
    componentRef.setInput('type', snackbarConfig.type || 'default');
    componentRef.setInput('variant', snackbarConfig.variant || 'filled');
    componentRef.setInput('position', snackbarConfig.position || 'bottom-center');
    componentRef.setInput('icon', snackbarConfig.icon || '');
    componentRef.setInput('actionLabel', snackbarConfig.actionLabel || '');
    componentRef.setInput('duration', snackbarConfig.duration ?? 5000);
    componentRef.setInput('closable', snackbarConfig.closable ?? true);
    componentRef.setInput('showProgress', snackbarConfig.showProgress ?? false);
    componentRef.setInput('backgroundColor', snackbarConfig.backgroundColor || '');
    componentRef.setInput('textColor', snackbarConfig.textColor || '');
    componentRef.setInput('iconColor', snackbarConfig.iconColor || '');
    componentRef.setInput('borderColor', snackbarConfig.borderColor || '');
    componentRef.setInput('progressColor', snackbarConfig.progressColor || '');

    // Subscribe to outputs
    componentRef.instance.closed.subscribe(() => {
      if (snackbarConfig.onClosed) {
        snackbarConfig.onClosed();
      }
      this.removeSnackbar(componentRef);
    });

    componentRef.instance.action.subscribe(() => {
      if (snackbarConfig.onAction) {
        snackbarConfig.onAction();
      }
    });

    // Attach to app
    this.appRef.attachView(componentRef.hostView);
    const domElem = componentRef.location.nativeElement;
    document.body.appendChild(domElem);

    // Force change detection
    componentRef.changeDetectorRef.detectChanges();

    // Store reference
    this.snackbarRefs.push(componentRef);
  }

  /**
   * Exibe snackbar de sucesso
   */
  success(message: string, config?: Partial<SnackbarConfig>): void {
    this.show({
      message,
      type: 'success',
      ...config
    });
  }

  /**
   * Exibe snackbar de erro
   */
  error(message: string, config?: Partial<SnackbarConfig>): void {
    this.show({
      message,
      type: 'error',
      ...config
    });
  }

  /**
   * Exibe snackbar de aviso
   */
  warning(message: string, config?: Partial<SnackbarConfig>): void {
    this.show({
      message,
      type: 'warning',
      ...config
    });
  }

  /**
   * Exibe snackbar de informação
   */
  info(message: string, config?: Partial<SnackbarConfig>): void {
    this.show({
      message,
      type: 'info',
      ...config
    });
  }

  /**
   * Remove um snackbar específico
   */
  private removeSnackbar(componentRef: ComponentRef<SnackbarComponent>): void {
    const index = this.snackbarRefs.indexOf(componentRef);
    if (index !== -1) {
      this.snackbarRefs.splice(index, 1);
      this.appRef.detachView(componentRef.hostView);
      componentRef.destroy();
    }
  }

  /**
   * Remove todos os snackbars
   */
  clearAll(): void {
    this.snackbarRefs.forEach(ref => {
      this.appRef.detachView(ref.hostView);
      ref.destroy();
    });
    this.snackbarRefs = [];
  }
}
