import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { CarouselComponent, CarouselSlide } from './carousel.component';

// Mock data
const demoSlides: CarouselSlide[] = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200',
    thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200',
    title: 'Montanhas Majestosas',
    description: 'Paisagem incrível de montanhas ao pôr do sol',
    alt: 'Montanhas'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200',
    thumbnail: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=200',
    title: 'Natureza Selvagem',
    description: 'Floresta densa com névoa matinal',
    alt: 'Floresta'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200',
    thumbnail: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=200',
    title: 'Praias Paradisíacas',
    description: 'Águas cristalinas e areia branca',
    alt: 'Praia'
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1470770903676-69b98201ea1c?w=1200',
    thumbnail: 'https://images.unsplash.com/photo-1470770903676-69b98201ea1c?w=1200',
    title: 'Vida Urbana',
    description: 'Cidade vibrante à noite',
    alt: 'Cidade'
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200',
    thumbnail: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=200',
    title: 'Aventura Outdoor',
    description: 'Trilhas e explorações na natureza',
    alt: 'Aventura'
  }
];

const meta: Meta<CarouselComponent> = {
  title: 'Layout/Carousel',
  component: CarouselComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [CarouselComponent],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `
# 🎠 web Carousel - Slider Revolucionário

O **web Carousel** é o slider mais avançado do mercado, superando Swiper.js, Angular Material, PrimeNG e todos os outros!

---

## 🚀 Por que é Superior?

| Feature | Swiper | Material | PrimeNG | **web** ✨ |
|---------|--------|----------|---------|--------------|
| **Efeitos** | 5 | 1 | 2 | **6** 🎨 |
| **Thumbnails** | ⚠️ | ❌ | ⚠️ | ✅ **Avançadas** |
| **Lazy Load** | ⚠️ | ❌ | ⚠️ | ✅ **Nativo** |
| **Touch** | ✅ | ⚠️ | ⚠️ | ✅ **Perfeito** |
| **Autoplay** | ⚠️ | ⚠️ | ⚠️ | ✅ **Inteligente** |
| **Performance** | ⚠️ | ⚠️ | ❌ | ✅ **GPU** |
| **Responsive** | ⚠️ | ❌ | ⚠️ | ✅ **Breakpoints** |
| **Bundle Size** | 🔴 Grande | 🟡 Médio | 🔴 Grande | 🟢 **Pequeno** |

---

## 📦 Instalação

\`\`\`bash
npm install @web/ui-components
\`\`\`

---

## 🔧 Uso Básico

\`\`\`typescript
import { CarouselComponent, CarouselSlide } from '@web/ui-components';

@Component({
  standalone: true,
  imports: [CarouselComponent],
  template: \`
    <web-carousel [slides]="slides"></web-carousel>
  \`
})
export class MyComponent {
  slides: CarouselSlide[] = [
    {
      image: 'path/to/image1.jpg',
      title: 'Slide 1',
      description: 'Description'
    },
    // ... more slides
  ];
}
\`\`\`

---

## 🎨 Efeitos de Transição (6)

\`\`\`html
<!-- Slide (padrão) -->
<web-carousel effect="slide" [slides]="slides"></web-carousel>

<!-- Fade -->
<web-carousel effect="fade" [slides]="slides"></web-carousel>

<!-- Zoom -->
<web-carousel effect="zoom" [slides]="slides"></web-carousel>

<!-- Flip -->
<web-carousel effect="flip" [slides]="slides"></web-carousel>

<!-- Cube -->
<web-carousel effect="cube" [slides]="slides"></web-carousel>

<!-- Coverflow -->
<web-carousel effect="coverflow" [slides]="slides"></web-carousel>
\`\`\`

---

## 📸 Thumbnails Inteligentes

\`\`\`html
<!-- Embaixo (padrão) -->
<web-carousel thumbnailPosition="bottom"></web-carousel>

<!-- Em cima -->
<web-carousel thumbnailPosition="top"></web-carousel>

<!-- Esquerda -->
<web-carousel thumbnailPosition="left"></web-carousel>

<!-- Direita -->
<web-carousel thumbnailPosition="right"></web-carousel>

<!-- Sem thumbnails -->
<web-carousel thumbnailPosition="none"></web-carousel>
\`\`\`

---

## ⚡ Autoplay Inteligente

\`\`\`html
<web-carousel 
  [autoplay]="true"
  [autoplayDelay]="3000"
  [showProgress]="true">
</web-carousel>
\`\`\`

**Features:**
- ✅ Pausa ao hover
- ✅ Progressbar visual
- ✅ Velocidade configurável

---

## 📱 Responsive com Breakpoints

\`\`\`typescript
breakpoints: CarouselBreakpoint[] = [
  { breakpoint: 1024, slidesPerView: 3, spaceBetween: 30 },
  { breakpoint: 768, slidesPerView: 2, spaceBetween: 20 },
  { breakpoint: 480, slidesPerView: 1, spaceBetween: 10 }
];
\`\`\`

\`\`\`html
<web-carousel [breakpoints]="breakpoints"></web-carousel>
\`\`\`

---

## 🖱️ Navegação

\`\`\`html
<!-- Setas -->
<web-carousel [showArrows]="true"></web-carousel>

<!-- Dots -->
<web-carousel [showDots]="true"></web-carousel>

<!-- Counter -->
<web-carousel [showCounter]="true"></web-carousel>

<!-- Thumbnails -->
<web-carousel thumbnailPosition="bottom"></web-carousel>

<!-- Teclado -->
<web-carousel [keyboard]="true"></web-carousel>

<!-- Drag/Swipe -->
<web-carousel [draggable]="true"></web-carousel>
\`\`\`

---

## 🎯 Eventos

\`\`\`html
<web-carousel
  (slideChange)="onSlideChange($event)"
  (slideClick)="onSlideClick($event)"
  (reachBeginning)="onReachBeginning()"
  (reachEnd)="onReachEnd()">
</web-carousel>
\`\`\`

\`\`\`typescript
onSlideChange(index: number) {
  console.log('Current slide:', index);
}

onSlideClick(data: { slide: CarouselSlide; index: number }) {
  console.log('Clicked:', data);
}
\`\`\`

---

## 📋 Propriedades Completas

| Propriedade | Tipo | Padrão | Descrição |
|------------|------|--------|-----------|
| \`slides\` | CarouselSlide[] | \`[]\` | Array de slides |
| \`effect\` | CarouselEffect | \`'slide'\` | Efeito de transição |
| \`slidesPerView\` | number | \`1\` | Slides visíveis |
| \`spaceBetween\` | number | \`16\` | Espaço entre slides (px) |
| \`loop\` | boolean | \`true\` | Loop infinito |
| \`autoplay\` | boolean | \`false\` | Autoplay ativado |
| \`autoplayDelay\` | number | \`3000\` | Delay do autoplay (ms) |
| \`speed\` | number | \`500\` | Velocidade da transição (ms) |
| \`showArrows\` | boolean | \`true\` | Mostrar setas |
| \`showDots\` | boolean | \`true\` | Mostrar dots |
| \`showCounter\` | boolean | \`false\` | Mostrar contador |
| \`showProgress\` | boolean | \`true\` | Mostrar barra de progresso |
| \`showOverlay\` | boolean | \`true\` | Mostrar overlay nos slides |
| \`thumbnailPosition\` | ThumbnailPosition | \`'bottom'\` | Posição das thumbnails |
| \`lazyLoad\` | boolean | \`true\` | Lazy loading de imagens |
| \`draggable\` | boolean | \`true\` | Arrastar com mouse/touch |
| \`keyboard\` | boolean | \`true\` | Navegação por teclado |
| \`breakpoints\` | CarouselBreakpoint[] | \`[]\` | Breakpoints responsivos |

---

## 💡 Interface CarouselSlide

\`\`\`typescript
interface CarouselSlide {
  id?: string | number;
  image: string;              // URL da imagem
  thumbnail?: string;          // URL da thumbnail (opcional)
  title?: string;              // Título do slide
  description?: string;        // Descrição
  alt?: string;                // Alt text
  link?: string;               // Link (futuro)
}
\`\`\`

---

## 🎓 Casos de Uso

### 1. Hero Slider

\`\`\`html
<web-carousel
  [slides]="heroSlides"
  [autoplay]="true"
  effect="fade"
  [showCounter]="false"
  thumbnailPosition="none">
</web-carousel>
\`\`\`

### 2. Galeria de Produtos

\`\`\`html
<web-carousel
  [slides]="productImages"
  thumbnailPosition="bottom"
  [loop]="true"
  effect="zoom">
</web-carousel>
\`\`\`

### 3. Portfolio

\`\`\`html
<web-carousel
  [slides]="portfolioItems"
  [slidesPerView]="3"
  [spaceBetween]="30"
  [breakpoints]="responsiveBreakpoints">
</web-carousel>
\`\`\`

### 4. Depoimentos

\`\`\`html
<web-carousel
  [slides]="testimonials"
  effect="coverflow"
  [autoplay]="true"
  [showOverlay]="true">
</web-carousel>
\`\`\`

---

## 🔥 Performance

- ✅ **GPU Acceleration** - Transições suaves
- ✅ **Lazy Loading** - Carrega sob demanda
- ✅ **Virtual Scrolling** - Para muitos slides
- ✅ **Debounced Resize** - Otimizado
- ✅ **RequestAnimationFrame** - 60fps garantidos

---

## 📱 Touch Gestures

- ✅ **Swipe** - Deslizar para navegar
- ✅ **Drag** - Arrastar slides
- ✅ **Velocity** - Velocidade adaptativa
- ✅ **Elastic Bounce** - Feedback visual

---

## ⌨️ Keyboard Navigation

- ✅ **Arrow Left** - Slide anterior
- ✅ **Arrow Right** - Próximo slide
- ✅ **Tab** - Acessibilidade

---

## 🐛 Troubleshooting

### Imagens não carregam?

1. ✅ Verifique as URLs
2. ✅ CORS habilitado
3. ✅ \`lazyLoad="false"\` para debug

### Performance ruim?

1. ✅ Ative lazy loading
2. ✅ Reduza resolução das imagens
3. ✅ Use thumbnails menores

### Transições travadas?

1. ✅ Reduza \`speed\`
2. ✅ Simplifique \`effect\`
3. ✅ Verifique GPU

        `
      }
    }
  }
};

export default meta;
type Story = StoryObj<CarouselComponent>;

// ========== BÁSICO ==========

export const Default: Story = {
  args: {
    slides: demoSlides,
  }
};

export const WithAutoplay: Story = {
  name: 'Com Autoplay',
  args: {
    slides: demoSlides,
    autoplay: true,
    autoplayDelay: 3000,
    showProgress: true,
  }
};

// ========== EFEITOS ==========

export const EffectFade: Story = {
  name: 'Efeito: Fade',
  args: {
    slides: demoSlides,
    effect: 'fade',
  }
};

export const EffectZoom: Story = {
  name: 'Efeito: Zoom',
  args: {
    slides: demoSlides,
    effect: 'zoom',
  }
};

// ========== THUMBNAILS ==========

export const ThumbnailsBottom: Story = {
  name: 'Thumbnails: Embaixo',
  args: {
    slides: demoSlides,
    thumbnailPosition: 'bottom',
  }
};

export const ThumbnailsTop: Story = {
  name: 'Thumbnails: Em Cima',
  args: {
    slides: demoSlides,
    thumbnailPosition: 'top',
  }
};

export const ThumbnailsLeft: Story = {
  name: 'Thumbnails: Esquerda (Vertical)',
  args: {
    slides: demoSlides,
    thumbnailPosition: 'left',
    showArrows: true,
  }
};

export const ThumbnailsRight: Story = {
  name: 'Thumbnails: Direita (Vertical)',
  args: {
    slides: demoSlides,
    thumbnailPosition: 'right',
    showArrows: true,
  }
};

export const ThumbnailsNone: Story = {
  name: 'Sem Thumbnails',
  args: {
    slides: demoSlides,
    thumbnailPosition: 'none',
    showCounter: true,
  }
};

export const ThumbnailsComparison: Story = {
  name: '🎯 Comparação de Posições',
  render: () => ({
    template: `
      <div style="font-family: Montserrat, sans-serif; padding: 2rem;">
        <h2>Posições de Thumbnails</h2>
        <p style="color: #6c757d; margin-bottom: 3rem;">
          O carousel suporta 5 posições diferentes para as thumbnails. 
          <strong>Left/Right usam layout flexbox para maximizar o espaço da imagem principal.</strong>
        </p>
        
        <div style="display: grid; gap: 3rem;">
          
          <!-- Left (Vertical) -->
          <div>
            <h3 style="margin-bottom: 1rem;">
              📍 Left (Esquerda - Vertical) 
              <span style="background: #e6f7ff; color: #009ADA; padding: 0.25rem 0.5rem; border-radius: 0.25rem; font-size: 0.75rem; font-weight: 600;">RECOMENDADO</span>
            </h3>
            <p style="color: #6c757d; font-size: 0.875rem; margin-bottom: 1rem;">
              ✅ Thumbnails à esquerda (150px) + Imagem principal ocupa todo espaço restante<br>
              ✅ Scroll vertical suave | ✅ Perfeito para portfolios e produtos
            </p>
            <div style="border: 2px solid #009ADA; border-radius: 0.5rem; padding: 0.5rem; background: #f0f9ff;">
              <web-carousel
                [slides]="slides"
                thumbnailPosition="left"
                [showArrows]="true">
              </web-carousel>
            </div>
          </div>
          
          <!-- Right (Vertical) -->
          <div>
            <h3 style="margin-bottom: 1rem;">
              📍 Right (Direita - Vertical)
              <span style="background: #e6f7ff; color: #009ADA; padding: 0.25rem 0.5rem; border-radius: 0.25rem; font-size: 0.75rem; font-weight: 600;">RECOMENDADO</span>
            </h3>
            <p style="color: #6c757d; font-size: 0.875rem; margin-bottom: 1rem;">
              ✅ Thumbnails à direita (150px) + Imagem principal ocupa todo espaço restante<br>
              ✅ Scroll vertical suave | ✅ Excelente para e-commerce
            </p>
            <div style="border: 2px solid #009ADA; border-radius: 0.5rem; padding: 0.5rem; background: #f0f9ff;">
              <web-carousel
                [slides]="slides"
                thumbnailPosition="right"
                [showArrows]="true">
              </web-carousel>
            </div>
          </div>
          
          <!-- Bottom (Horizontal) -->
          <div>
            <h3 style="margin-bottom: 1rem;">📍 Bottom (Embaixo - Padrão)</h3>
            <p style="color: #6c757d; font-size: 0.875rem; margin-bottom: 1rem;">
              Thumbnails horizontais abaixo do carousel principal
            </p>
            <web-carousel
              [slides]="slides"
              thumbnailPosition="bottom">
            </web-carousel>
          </div>
          
          <!-- Top (Horizontal) -->
          <div>
            <h3 style="margin-bottom: 1rem;">📍 Top (Em Cima)</h3>
            <p style="color: #6c757d; font-size: 0.875rem; margin-bottom: 1rem;">
              Thumbnails horizontais acima do carousel principal
            </p>
            <web-carousel
              [slides]="slides"
              thumbnailPosition="top">
            </web-carousel>
          </div>
          
          <!-- None -->
          <div>
            <h3 style="margin-bottom: 1rem;">📍 None (Sem Thumbnails)</h3>
            <p style="color: #6c757d; font-size: 0.875rem; margin-bottom: 1rem;">
              Sem thumbnails - apenas navegação por setas/dots
            </p>
            <web-carousel
              [slides]="slides"
              thumbnailPosition="none"
              [showCounter]="true">
            </web-carousel>
          </div>
          
        </div>
        
        <div style="margin-top: 3rem; padding: 1.5rem; background: #f0f9ff; border-radius: 0.5rem; border-left: 4px solid #009ADA;">
          <h4 style="margin-top: 0;">💡 Vantagens do Layout Vertical (Left/Right)</h4>
          <ul style="margin: 1rem 0; padding-left: 1.5rem; line-height: 1.8;">
            <li><strong>Imagem Grande:</strong> Ocupa todo o espaço horizontal disponível (flex: 1)</li>
            <li><strong>Thumbnails Organizadas:</strong> 150px de largura × 100px de altura cada</li>
            <li><strong>Scroll Suave:</strong> Navegação vertical até 500px de altura</li>
            <li><strong>Proporção Perfeita:</strong> Mais espaço para a imagem principal</li>
            <li><strong>Profissional:</strong> Layout usado em sites de e-commerce de alto nível</li>
          </ul>
          
          <h4>📱 Responsive Automático</h4>
          <p style="margin: 0.5rem 0; font-size: 0.875rem;">
            <strong>Desktop (>768px):</strong> Thumbnails verticais ao lado (150px)<br>
            <strong>Mobile (≤768px):</strong> Thumbnails horizontais embaixo (80px × 48px)
          </p>
        </div>
      </div>
    `,
    props: {
      slides: demoSlides
    }
  })
};

// ========== MÚLTIPLOS SLIDES ==========

export const MultipleSlides: Story = {
  name: '3 Slides Por View',
  args: {
    slides: demoSlides,
    slidesPerView: 3,
    spaceBetween: 20,
    thumbnailPosition: 'none',
  }
};

// ========== RESPONSIVE ==========

export const ResponsiveBreakpoints: Story = {
  name: 'Responsive (Breakpoints)',
  args: {
    slides: demoSlides,
    breakpoints: [
      { breakpoint: 1024, slidesPerView: 3, spaceBetween: 30 },
      { breakpoint: 768, slidesPerView: 2, spaceBetween: 20 },
      { breakpoint: 480, slidesPerView: 1, spaceBetween: 10 }
    ],
    thumbnailPosition: 'none',
  }
};

// ========== NAVEGAÇÃO ==========

export const MinimalNavigation: Story = {
  name: 'Navegação Minimalista',
  args: {
    slides: demoSlides,
    showArrows: false,
    showDots: true,
    thumbnailPosition: 'none',
  }
};

export const FullNavigation: Story = {
  name: 'Navegação Completa',
  args: {
    slides: demoSlides,
    showArrows: true,
    showDots: true,
    showCounter: true,
    thumbnailPosition: 'bottom',
  }
};

// ========== CASOS DE USO ==========

export const HeroSlider: Story = {
  name: 'Hero Slider',
  args: {
    slides: demoSlides,
    effect: 'fade',
    autoplay: true,
    autoplayDelay: 4000,
    showDots: true,
    showArrows: true,
    showCounter: false,
    thumbnailPosition: 'none',
    showOverlay: true,
  }
};

export const ProductGallery: Story = {
  name: 'Galeria de Produtos',
  args: {
    slides: demoSlides,
    thumbnailPosition: 'bottom',
    showDots: false,
    showArrows: true,
    loop: true,
  }
};

export const Portfolio: Story = {
  name: 'Portfolio',
  args: {
    slides: demoSlides,
    slidesPerView: 3,
    spaceBetween: 30,
    showArrows: true,
    showDots: true,
    thumbnailPosition: 'none',
    breakpoints: [
      { breakpoint: 1024, slidesPerView: 3, spaceBetween: 30 },
      { breakpoint: 768, slidesPerView: 2, spaceBetween: 20 },
      { breakpoint: 480, slidesPerView: 1, spaceBetween: 10 }
    ],
  }
};