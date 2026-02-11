/**
 * ========================================
 * 📦 COMO USAR ESTE COMPONENTE NO SEU PROJETO
 * ========================================
 * 
 * 1️⃣ INSTALAÇÃO
 * --------------
 * npm install @web/ui-components
 * 
 * 
 * 2️⃣ IMPORT NO SEU COMPONENTE
 * ----------------------------
 * import { TypographyComponent } from '@web/ui-components';
 * 
 * @Component({
 *   selector: 'app-meu-componente',
 *   standalone: true,
 *   imports: [TypographyComponent],
 *   template: `
 *     <web-typography variant="h1">
 *       Título Principal
 *     </web-typography>
 *     
 *     <web-typography variant="body1">
 *       Parágrafo de texto comum.
 *     </web-typography>
 *   `
 * })
 * export class MeuComponente {}
 * 
 * 
 * 3️⃣ USO BÁSICO
 * --------------
 * <web-typography variant="h1">
 *   Meu Título
 * </web-typography>
 * 
 * 
 * 4️⃣ VARIANTES DISPONÍVEIS
 * -------------------------
 * <!-- Headings -->
 * <web-typography variant="h1">Heading 1 (3rem)</web-typography>
 * <web-typography variant="h2">Heading 2 (2.5rem)</web-typography>
 * <web-typography variant="h3">Heading 3 (2rem)</web-typography>
 * <web-typography variant="h4">Heading 4 (1.75rem)</web-typography>
 * <web-typography variant="h5">Heading 5 (1.5rem)</web-typography>
 * <web-typography variant="h6">Heading 6 (1.25rem)</web-typography>
 * 
 * <!-- Subtitles -->
 * <web-typography variant="subtitle1">Subtitle 1 (1.125rem)</web-typography>
 * <web-typography variant="subtitle2">Subtitle 2 (1rem)</web-typography>
 * 
 * <!-- Body -->
 * <web-typography variant="body1">Body 1 (1rem)</web-typography>
 * <web-typography variant="body2">Body 2 (0.875rem)</web-typography>
 * 
 * <!-- Outros -->
 * <web-typography variant="caption">Caption (0.75rem)</web-typography>
 * <web-typography variant="overline">Overline (0.75rem uppercase)</web-typography>
 * <web-typography variant="button">Button (0.9375rem uppercase)</web-typography>
 * <web-typography variant="code">Code (0.875rem monospace)</web-typography>
 * 
 * 
 * 5️⃣ CUSTOMIZAÇÃO DE COR
 * -----------------------
 * <!-- Cor padrão: #61606a -->
 * <web-typography variant="h1">
 *   Título com cor padrão
 * </web-typography>
 * 
 * <!-- Cor customizada -->
 * <web-typography variant="h1" color="#009ADA">
 *   Título Azul
 * </web-typography>
 * 
 * <web-typography variant="body1" color="#dc3545">
 *   Texto vermelho
 * </web-typography>
 * 
 * 
 * 6️⃣ CUSTOMIZAÇÃO DE FONTE
 * -------------------------
 * <!-- Fonte padrão: Montserrat -->
 * <web-typography variant="h1">
 *   Com Montserrat (padrão)
 * </web-typography>
 * 
 * <!-- Fontes disponíveis -->
 * <web-typography variant="h1" fontFamily='"Roboto", sans-serif'>
 *   Com Roboto
 * </web-typography>
 * 
 * <web-typography variant="h1" fontFamily='"Inter", sans-serif'>
 *   Com Inter
 * </web-typography>
 * 
 * <web-typography variant="h1" fontFamily='"Poppins", sans-serif'>
 *   Com Poppins
 * </web-typography>
 * 
 * <!-- Fonte customizada própria -->
 * <web-typography variant="h1" fontFamily='"Minha Fonte", sans-serif'>
 *   Com sua própria fonte
 * </web-typography>
 * 
 * 
 * 7️⃣ PESO DA FONTE (FONT WEIGHT)
 * -------------------------------
 * <web-typography variant="h1" fontWeight="400">Normal</web-typography>
 * <web-typography variant="h1" fontWeight="500">Medium</web-typography>
 * <web-typography variant="h1" fontWeight="600">Semibold</web-typography>
 * <web-typography variant="h1" fontWeight="700">Bold</web-typography>
 * 
 * <!-- Ou use nomes -->
 * <web-typography variant="h1" fontWeight="normal">Normal</web-typography>
 * <web-typography variant="h1" fontWeight="medium">Medium</web-typography>
 * <web-typography variant="h1" fontWeight="semibold">Semibold</web-typography>
 * <web-typography variant="h1" fontWeight="bold">Bold</web-typography>
 * 
 * 
 * 8️⃣ ALINHAMENTO DE TEXTO
 * ------------------------
 * <web-typography align="left">Esquerda (padrão)</web-typography>
 * <web-typography align="center">Centro</web-typography>
 * <web-typography align="right">Direita</web-typography>
 * <web-typography align="justify">Justificado</web-typography>
 * 
 * 
 * 9️⃣ TRANSFORMAÇÃO DE TEXTO
 * --------------------------
 * <web-typography transform="uppercase">MAIÚSCULAS</web-typography>
 * <web-typography transform="lowercase">minúsculas</web-typography>
 * <web-typography transform="capitalize">Capitalizado</web-typography>
 * 
 * 
 * 🔟 TEXTO GRADIENTE (DESTAQUE)
 * -----------------------------
 * <web-typography variant="h1" [gradient]="true">
 *   Texto com Gradiente Roxo/Azul
 * </web-typography>
 * 
 * 
 * 1️⃣1️⃣ TRUNCAR TEXTO (ELLIPSIS)
 * ------------------------------
 * <!-- Truncar em 1 linha -->
 * <web-typography [noWrap]="true" style="max-width: 300px;">
 *   Texto muito longo que será cortado com reticências...
 * </web-typography>
 * 
 * <!-- Truncar em 2 linhas -->
 * <web-typography [truncate]="2" style="max-width: 300px;">
 *   Texto longo que será exibido em no máximo 2 linhas com reticências ao final...
 * </web-typography>
 * 
 * <!-- Truncar em 3 linhas -->
 * <web-typography [truncate]="3" style="max-width: 300px;">
 *   Texto longo...
 * </web-typography>
 * 
 * 
 * 1️⃣2️⃣ ESPAÇAMENTO (GUTTER)
 * --------------------------
 * <web-typography variant="h1" [gutterBottom]="true">
 *   Título com margem inferior
 * </web-typography>
 * 
 * <web-typography variant="body1">
 *   Parágrafo sem margem
 * </web-typography>
 * 
 * 
 * 1️⃣3️⃣ ESTADOS (MUTED, DISABLED, LINK)
 * --------------------------------------
 * <!-- Texto esmaecido (60% opacidade) -->
 * <web-typography [muted]="true">
 *   Texto secundário esmaecido
 * </web-typography>
 * 
 * <!-- Texto desabilitado (40% opacidade) -->
 * <web-typography [disabled]="true">
 *   Texto desabilitado
 * </web-typography>
 * 
 * <!-- Estilo de link -->
 * <web-typography [link]="true">
 *   Texto estilizado como link
 * </web-typography>
 * 
 * 
 * 1️⃣4️⃣ TAMANHO CUSTOMIZADO
 * -------------------------
 * <web-typography variant="h1" fontSize="4rem">
 *   Título extra grande
 * </web-typography>
 * 
 * <web-typography variant="body1" fontSize="1.25rem">
 *   Parágrafo maior
 * </web-typography>
 * 
 * 
 * 1️⃣5️⃣ COMPONENTE HTML (SEMÂNTICA)
 * ----------------------------------
 * Por padrão, o componente renderiza com base na variant:
 * - h1-h6 → <h1> a <h6>
 * - body1, body2, subtitle1, subtitle2 → <p>
 * - caption, overline, button → <span>
 * - code → <code>
 * 
 * Você pode forçar um elemento específico:
 * <web-typography variant="h1" component="div">
 *   H1 renderizado como div
 * </web-typography>
 * 
 * <web-typography variant="body1" component="span">
 *   Body renderizado como span
 * </web-typography>
 * 
 * 
 * 1️⃣6️⃣ EXEMPLO COMPLETO: PÁGINA DE ARTIGO
 * ----------------------------------------
 * <article>
 *   <!-- Título -->
 *   <web-typography 
 *     variant="h1" 
 *     color="#009ADA"
 *     [gutterBottom]="true">
 *     Título do Artigo
 *   </web-typography>
 *   
 *   <!-- Subtítulo -->
 *   <web-typography 
 *     variant="subtitle1"
 *     [muted]="true"
 *     [gutterBottom]="true">
 *     Por João Silva • 3 de fevereiro de 2026
 *   </web-typography>
 *   
 *   <!-- Introdução -->
 *   <web-typography 
 *     variant="body1"
 *     [gutterBottom]="true">
 *     Este é o parágrafo de introdução do artigo com informações importantes.
 *   </web-typography>
 *   
 *   <!-- Seção -->
 *   <web-typography 
 *     variant="h3"
 *     [gutterBottom]="true">
 *     Seção do Artigo
 *   </web-typography>
 *   
 *   <!-- Conteúdo -->
 *   <web-typography variant="body1">
 *     Conteúdo da seção aqui...
 *   </web-typography>
 *   
 *   <!-- Código -->
 *   <web-typography variant="code">
 *     const exemplo = 'código';
 *   </web-typography>
 * </article>
 * 
 * 
 * 1️⃣7️⃣ PROPRIEDADES COMPLETAS
 * ----------------------------
 * @Input() variant: string = 'body1';              // Tipo de tipografia
 * @Input() component: string = 'p';                // Elemento HTML
 * @Input() color: string = '#61606a';              // Cor do texto
 * @Input() fontFamily: string = '"Montserrat"...'; // Família da fonte
 * @Input() fontSize: string = '';                  // Tamanho customizado
 * @Input() fontWeight: string = '400';             // Peso da fonte
 * @Input() align: string = 'left';                 // Alinhamento
 * @Input() transform: string = 'none';             // Transformação de texto
 * @Input() gutterBottom: boolean = false;          // Margem inferior
 * @Input() noWrap: boolean = false;                // Sem quebra de linha
 * @Input() truncate: number = 0;                   // Truncar em N linhas
 * @Input() gradient: boolean = false;              // Texto gradiente
 * @Input() link: boolean = false;                  // Estilo de link
 * @Input() muted: boolean = false;                 // Esmaecido
 * @Input() disabled: boolean = false;              // Desabilitado
 * @Input() customClass: string = '';               // Classe CSS customizada
 * 
 * 
 * 1️⃣8️⃣ PARA COMPONENTES NÃO-STANDALONE (NgModule)
 * ------------------------------------------------
 * import { TypographyComponent } from '@web/ui-components';
 * 
 * @NgModule({
 *   declarations: [MeuComponente],
 *   imports: [TypographyComponent]
 * })
 * export class MeuModule {}
 * 
 * 
 * 💡 DICAS PRO:
 * -------------
 * 1. Use variant adequada para SEO (h1 para título principal, etc)
 * 2. Use gutterBottom para espaçamento consistente
 * 3. Use muted para textos secundários (datas, legendas)
 * 4. Use gradient para destacar títulos importantes
 * 5. Use truncate para cards e listas
 * 6. Use fontWeight para criar hierarquia visual
 * 7. Combine color + fontFamily para identidade visual
 * 8. Use component="div" para layouts flexíveis
 * 
 * 💡 VEJA OS EXEMPLOS ABAIXO PARA TODAS AS VARIAÇÕES!
 * 
 */

import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { TypographyComponent } from './typography.component';

const meta: Meta<TypographyComponent> = {
  title: 'Layout/Typography',
  component: TypographyComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [TypographyComponent],
    }),
  ],
};

export default meta;
type Story = StoryObj<TypographyComponent>;

// ========== BASIC ==========

export const Default: Story = {
  args: {
    variant: 'body1',
    color: '#61606a',
  },
  render: (args) => ({
    props: args,
    template: `
      <web-typography 
        [variant]="variant"
        [color]="color">
        Este é um texto de exemplo usando o componente Typography com a variante body1.
      </web-typography>
    `
  })
};

export const H1Example: Story = {
  name: 'Exemplo H1',
  args: {
    variant: 'h1',
    color: '#61606a',
  },
  render: (args) => ({
    props: args,
    template: `
      <web-typography 
        [variant]="variant"
        [color]="color">
        Este é um título H1
      </web-typography>
    `
  })
};

export const ColorExample: Story = {
  name: 'Exemplo com Cor',
  args: {
    variant: 'h2',
    color: '#009ADA',
  },
  render: (args) => ({
    props: args,
    template: `
      <web-typography 
        [variant]="variant"
        [color]="color">
        Título Azul Customizado
      </web-typography>
    `
  })
};

// ========== HEADINGS ==========

export const Showcase: Story = {
  name: 'Showcase Completo',
  render: () => ({
    template: `
      <div style="padding: 2rem; background: white;">
        <!-- Cor Padrão -->
        <web-typography variant="h2" [gutterBottom]="true">
          Cor Padrão (#61606a)
        </web-typography>
        
        <web-typography variant="body1" [gutterBottom]="true">
          Este é um parágrafo usando a cor padrão do componente Typography.
          A cor padrão é #61606a conforme especificado.
        </web-typography>
        
        <hr style="margin: 2rem 0; border: none; border-top: 1px solid #e5e7eb;">
        
        <!-- Cores Customizadas -->
        <web-typography variant="h2" [gutterBottom]="true">
          Cores Customizadas
        </web-typography>
        
        <web-typography variant="h3" color="#009ADA" [gutterBottom]="true">
          Título Azul (#009ADA)
        </web-typography>
        
        <web-typography variant="h3" color="#28a745" [gutterBottom]="true">
          Título Verde (#28a745)
        </web-typography>
        
        <web-typography variant="h3" color="#dc3545" [gutterBottom]="true">
          Título Vermelho (#dc3545)
        </web-typography>
        
        <hr style="margin: 2rem 0; border: none; border-top: 1px solid #e5e7eb;">
        
        <!-- Fontes -->
        <web-typography variant="h2" [gutterBottom]="true">
          Fontes Customizadas
        </web-typography>
        
        <web-typography variant="h4" [gutterBottom]="true">
          Montserrat (Padrão): The quick brown fox jumps over the lazy dog
        </web-typography>
        
        <web-typography variant="h4" fontFamily='"Roboto", sans-serif' [gutterBottom]="true">
          Roboto: The quick brown fox jumps over the lazy dog
        </web-typography>
        
        <web-typography variant="h4" fontFamily='"Inter", sans-serif' [gutterBottom]="true">
          Inter: The quick brown fox jumps over the lazy dog
        </web-typography>
        
        <web-typography variant="h4" fontFamily='"Poppins", sans-serif'>
          Poppins: The quick brown fox jumps over the lazy dog
        </web-typography>
      </div>
    `
  })
};

export const AllHeadings: Story = {
  name: 'Todos os Headings',
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 1.5rem;">
        <web-typography variant="h1">Heading 1 - 3rem (48px)</web-typography>
        <web-typography variant="h2">Heading 2 - 2.5rem (40px)</web-typography>
        <web-typography variant="h3">Heading 3 - 2rem (32px)</web-typography>
        <web-typography variant="h4">Heading 4 - 1.75rem (28px)</web-typography>
        <web-typography variant="h5">Heading 5 - 1.5rem (24px)</web-typography>
        <web-typography variant="h6">Heading 6 - 1.25rem (20px)</web-typography>
      </div>
    `
  })
};

export const AllVariants: Story = {
  name: 'Todas as Variantes',
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <div>
          <web-typography variant="overline" [muted]="true">Headings</web-typography>
          <web-typography variant="h1">Heading 1</web-typography>
          <web-typography variant="h2">Heading 2</web-typography>
          <web-typography variant="h3">Heading 3</web-typography>
        </div>
        
        <div style="margin-top: 1.5rem;">
          <web-typography variant="overline" [muted]="true">Subtitles</web-typography>
          <web-typography variant="subtitle1">Subtitle 1 - Texto de apoio maior</web-typography>
          <web-typography variant="subtitle2">Subtitle 2 - Texto de apoio menor</web-typography>
        </div>
        
        <div style="margin-top: 1.5rem;">
          <web-typography variant="overline" [muted]="true">Body</web-typography>
          <web-typography variant="body1">Body 1 - Parágrafo padrão com texto corrido para leitura. Lorem ipsum dolor sit amet.</web-typography>
          <web-typography variant="body2">Body 2 - Parágrafo menor para textos secundários ou descrições.</web-typography>
        </div>
        
        <div style="margin-top: 1.5rem;">
          <web-typography variant="overline" [muted]="true">Outros</web-typography>
          <web-typography variant="caption">Caption - Texto pequeno para legendas e anotações</web-typography>
          <br><br>
          <web-typography variant="overline">Overline - Texto de categoria</web-typography>
          <br><br>
          <web-typography variant="button">Button Text</web-typography>
          <br><br>
          <web-typography variant="code">const code = 'exemplo';</web-typography>
        </div>
      </div>
    `
  })
};

// ========== COLORS ==========

export const CustomColors: Story = {
  name: 'Cores Customizadas',
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <web-typography variant="h3">Cor padrão (#61606a)</web-typography>
        <web-typography variant="h3" color="#009ADA">Azul web (#009ADA)</web-typography>
        <web-typography variant="h3" color="#28a745">Verde (#28a745)</web-typography>
        <web-typography variant="h3" color="#dc3545">Vermelho (#dc3545)</web-typography>
        <web-typography variant="h3" color="#ffc107">Amarelo (#ffc107)</web-typography>
        <web-typography variant="h3" color="#6f42c1">Roxo (#6f42c1)</web-typography>
      </div>
    `
  })
};

export const GradientText: Story = {
  name: 'Texto com Gradiente',
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 1.5rem; background: white; padding: 2rem;">
        <web-typography variant="h1" [gradient]="true">
          Título com Gradiente
        </web-typography>
        <web-typography variant="h2" [gradient]="true">
          Destaque Visual Premium
        </web-typography>
        <web-typography variant="h3" [gradient]="true">
          Texto Gradiente Roxo/Azul
        </web-typography>
      </div>
    `
  })
};

// ========== FONTS ==========

export const FontFamilies: Story = {
  name: 'Famílias de Fonte',
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 1.5rem;">
        <div>
          <web-typography variant="overline" [muted]="true">Montserrat (Padrão)</web-typography>
          <web-typography variant="h3">The quick brown fox jumps over the lazy dog</web-typography>
        </div>
        
        <div>
          <web-typography variant="overline" [muted]="true">Roboto</web-typography>
          <web-typography variant="h3" fontFamily='"Roboto", sans-serif'>
            The quick brown fox jumps over the lazy dog
          </web-typography>
        </div>
        
        <div>
          <web-typography variant="overline" [muted]="true">Inter</web-typography>
          <web-typography variant="h3" fontFamily='"Inter", sans-serif'>
            The quick brown fox jumps over the lazy dog
          </web-typography>
        </div>
        
        <div>
          <web-typography variant="overline" [muted]="true">Poppins</web-typography>
          <web-typography variant="h3" fontFamily='"Poppins", sans-serif'>
            The quick brown fox jumps over the lazy dog
          </web-typography>
        </div>
      </div>
    `
  })
};

export const FontWeights: Story = {
  name: 'Pesos de Fonte',
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <web-typography variant="h3" fontWeight="400">Weight 400 - Normal</web-typography>
        <web-typography variant="h3" fontWeight="500">Weight 500 - Medium</web-typography>
        <web-typography variant="h3" fontWeight="600">Weight 600 - Semibold</web-typography>
        <web-typography variant="h3" fontWeight="700">Weight 700 - Bold</web-typography>
      </div>
    `
  })
};

// ========== ALIGNMENT ==========

export const TextAlignment: Story = {
  name: 'Alinhamento',
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 1.5rem;">
        <web-typography variant="body1" align="left">
          Alinhado à esquerda (padrão). Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </web-typography>
        
        <web-typography variant="body1" align="center">
          Centralizado. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </web-typography>
        
        <web-typography variant="body1" align="right">
          Alinhado à direita. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </web-typography>
        
        <web-typography variant="body1" align="justify">
          Justificado. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
        </web-typography>
      </div>
    `
  })
};

// ========== TEXT TRANSFORM ==========

export const TextTransform: Story = {
  name: 'Transformação de Texto',
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <web-typography variant="h4" transform="uppercase">
          Texto em maiúsculas
        </web-typography>
        
        <web-typography variant="h4" transform="lowercase">
          TEXTO EM MINÚSCULAS
        </web-typography>
        
        <web-typography variant="h4" transform="capitalize">
          texto capitalizado com primeira letra maiúscula
        </web-typography>
      </div>
    `
  })
};

// ========== TRUNCATE ==========

export const TruncateText: Story = {
  name: 'Truncar Texto',
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 2rem; max-width: 400px;">
        <div>
          <web-typography variant="overline" [muted]="true">NoWrap (1 linha)</web-typography>
          <web-typography variant="body1" [noWrap]="true">
            Texto muito longo que será cortado com reticências quando ultrapassar o limite da div e não vai quebrar linha
          </web-typography>
        </div>
        
        <div>
          <web-typography variant="overline" [muted]="true">Truncate 2 linhas</web-typography>
          <web-typography variant="body1" [truncate]="2">
            Texto mais longo que será exibido em no máximo duas linhas com reticências ao final. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.
          </web-typography>
        </div>
        
        <div>
          <web-typography variant="overline" [muted]="true">Truncate 3 linhas</web-typography>
          <web-typography variant="body1" [truncate]="3">
            Texto ainda mais longo que será exibido em no máximo três linhas com reticências ao final. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
          </web-typography>
        </div>
      </div>
    `
  })
};

// ========== STATES ==========

export const States: Story = {
  name: 'Estados (Muted, Disabled, Link)',
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 1.5rem;">
        <div>
          <web-typography variant="h4">Texto Normal</web-typography>
          <web-typography variant="body1">
            Este é um texto com opacidade normal (100%)
          </web-typography>
        </div>
        
        <div>
          <web-typography variant="h4" [muted]="true">Texto Muted</web-typography>
          <web-typography variant="body1" [muted]="true">
            Este é um texto esmaecido (60% opacidade) - ideal para textos secundários
          </web-typography>
        </div>
        
        <div>
          <web-typography variant="h4" [disabled]="true">Texto Disabled</web-typography>
          <web-typography variant="body1" [disabled]="true">
            Este é um texto desabilitado (40% opacidade)
          </web-typography>
        </div>
        
        <div>
          <web-typography variant="h4">Texto Link</web-typography>
          <web-typography variant="body1" [link]="true">
            Este texto tem estilo de link (azul com hover underline)
          </web-typography>
        </div>
      </div>
    `
  })
};

// ========== USE CASES ==========

export const ArticlePage: Story = {
  name: 'Página de Artigo',
  render: () => ({
    template: `
      <article style="max-width: 800px; margin: 0 auto; padding: 2rem;">
        <!-- Categoria -->
        <web-typography variant="overline" color="#009ADA">
          Tecnologia
        </web-typography>
        
        <!-- Título -->
        <web-typography 
          variant="h1" 
          [gutterBottom]="true"
          style="margin-top: 0.5rem;">
          Como a Inteligência Artificial está Transformando o Mundo
        </web-typography>
        
        <!-- Metadados -->
        <web-typography 
          variant="subtitle2"
          [muted]="true"
          [gutterBottom]="true">
          Por João Silva • 3 de fevereiro de 2026 • 5 min de leitura
        </web-typography>
        
        <!-- Introdução -->
        <web-typography 
          variant="subtitle1"
          [gutterBottom]="true"
          style="margin-top: 1.5rem;">
          A inteligência artificial não é mais ficção científica. Ela está presente em nosso dia a dia de formas que nem imaginamos.
        </web-typography>
        
        <!-- Conteúdo -->
        <web-typography 
          variant="body1"
          [gutterBottom]="true">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
        </web-typography>
        
        <!-- Seção -->
        <web-typography 
          variant="h3"
          [gutterBottom]="true"
          style="margin-top: 2rem;">
          O Impacto na Sociedade
        </web-typography>
        
        <web-typography 
          variant="body1"
          [gutterBottom]="true">
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.
        </web-typography>
        
        <!-- Código -->
        <web-typography variant="code">
          const ai = new ArtificialIntelligence();
        </web-typography>
        
        <!-- Citação -->
        <web-typography 
          variant="body1"
          [gutterBottom]="true"
          style="margin-top: 1.5rem; padding-left: 1rem; border-left: 4px solid #009ADA; font-style: italic;">
          "A IA não vai substituir humanos, mas humanos com IA vão substituir humanos sem IA."
        </web-typography>
        
        <!-- Legenda -->
        <web-typography 
          variant="caption"
          [muted]="true"
          align="center"
          style="display: block; margin-top: 0.5rem;">
          Fonte: Tech Insights 2026
        </web-typography>
      </article>
    `
  })
};

export const CardExample: Story = {
  name: 'Card com Tipografia',
  render: () => ({
    template: `
      <div style="max-width: 350px; border: 1px solid #e5e7eb; border-radius: 0.5rem; overflow: hidden;">
        <div style="padding: 1.5rem;">
          <web-typography variant="overline" color="#009ADA">
            Categoria
          </web-typography>
          
          <web-typography 
            variant="h5"
            [gutterBottom]="true"
            style="margin-top: 0.5rem;">
            Título do Card
          </web-typography>
          
          <web-typography 
            variant="body2"
            [muted]="true"
            [truncate]="3">
            Descrição do card que será truncada em 3 linhas quando o texto for muito longo e exceder o limite estabelecido para manter o layout consistente.
          </web-typography>
          
          <web-typography 
            variant="caption"
            [muted]="true"
            style="display: block; margin-top: 1rem;">
            Há 2 horas
          </web-typography>
        </div>
      </div>
    `
  })
};

export const GutterBottom: Story = {
  name: 'Com Gutter Bottom',
  render: () => ({
    template: `
      <div>
        <web-typography variant="h2" [gutterBottom]="true">
          Título com margem inferior
        </web-typography>
        
        <web-typography variant="body1" [gutterBottom]="true">
          Primeiro parágrafo com margem inferior para separar do próximo.
        </web-typography>
        
        <web-typography variant="body1">
          Segundo parágrafo sem margem inferior.
        </web-typography>
      </div>
    `
  })
};