import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ImageUploadComponent, UploadedImage } from './upload.component';

const meta: Meta<ImageUploadComponent> = {
  title: 'Form Controls/Image Upload',
  component: ImageUploadComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [ImageUploadComponent, ReactiveFormsModule],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `
# 📤 Web Image Upload

Componente REVOLUCIONÁRIO de upload de imagens com funcionalidades **MUITO SUPERIORES** aos disponíveis no mercado!

## 🚀 Diferenciais vs Mercado

| Feature | Material | PrimeNG | ngx-dropzone | **Web Upload** |
|---------|----------|---------|--------------|----------------|
| Drag & Drop | ❌ | ✅ | ✅ | ✅ |
| Preview Grid | ❌ | ⚠️ | ⚠️ | ✅ |
| Real Upload | ❌ | ✅ | ❌ | ✅ |
| Progress Bar | ❌ | ✅ | ❌ | ✅ |
| Crop/Edit | ❌ | ❌ | ❌ | ✅ |
| Lightbox | ❌ | ❌ | ❌ | ✅ |
| Reorder | ❌ | ❌ | ❌ | ✅ |
| formControlName | ✅ | ✅ | ❌ | ✅ |
| Zero Dependencies | ✅ | ❌ | ❌ | ✅ |

## 💡 Uso Básico

\`\`\`typescript
<web-image-upload
  label="Upload de Fotos"
  [maxFiles]="5"
  [maxFileSize]="5 * 1024 * 1024"
  [(ngModel)]="images">
</web-image-upload>
\`\`\`
        `
      }
    }
  }
};

export default meta;
type Story = StoryObj<ImageUploadComponent>;

// ========== BÁSICO ==========

export const Default: Story = {
  args: {
    label: 'Upload de Imagens',
    helperText: 'Selecione ou arraste imagens aqui',
  }
};

export const GridMode: Story = {
  name: 'Grid Mode (Padrão)',
  args: {
    label: 'Galeria de Imagens',
    mode: 'grid',
    maxFiles: 9,
    helperText: 'Visualização em grade - perfeita para galerias',
  }
};

export const ListMode: Story = {
  name: 'List Mode',
  args: {
    label: 'Lista de Arquivos',
    mode: 'list',
    maxFiles: 5,
    helperText: 'Visualização em lista - exibe detalhes dos arquivos',
  }
};

export const CompactMode: Story = {
  name: 'Compact Mode',
  args: {
    label: 'Miniaturas',
    mode: 'compact',
    maxFiles: 10,
    helperText: 'Visualização compacta - ótima para economizar espaço',
  }
};

export const SingleMode: Story = {
  name: 'Single Image (Avatar)',
  args: {
    label: 'Foto de Perfil',
    mode: 'single',
    multiple: false,
    maxFiles: 1,
    helperText: 'Apenas uma imagem permitida',
  }
};

// ========== VALIDAÇÃO ==========

export const WithMaxFiles: Story = {
  name: 'Limite de Arquivos',
  args: {
    label: 'Máximo 3 Imagens',
    maxFiles: 3,
    helperText: 'Você pode enviar até 3 imagens',
  }
};

export const WithMaxSize: Story = {
  name: 'Limite de Tamanho',
  args: {
    label: 'Upload com Limite',
    maxFileSize: 2 * 1024 * 1024, // 2MB
    helperText: 'Tamanho máximo: 2MB por arquivo',
  }
};

export const OnlyPNG: Story = {
  name: 'Apenas PNG',
  args: {
    label: 'Apenas Arquivos PNG',
    accept: 'image/png',
    helperText: 'Somente arquivos PNG são permitidos',
  }
};

export const WithError: Story = {
  name: 'Com Erro',
  args: {
    label: 'Upload com Erro',
    error: true,
    errorMessage: 'Tamanho do arquivo excede o limite permitido',
  }
};

export const WithSuccess: Story = {
  name: 'Com Sucesso',
  args: {
    label: 'Upload Concluído',
    success: true,
    successMessage: 'Todas as imagens foram enviadas com sucesso!',
  }
};

// ========== FEATURES ==========

export const AutoUpload: Story = {
  name: 'Auto Upload',
  args: {
    label: 'Upload Automático',
    autoUpload: true,
    uploadUrl: '/api/upload',
    helperText: 'Imagens são enviadas automaticamente após seleção',
  }
};

export const ManualUpload: Story = {
  name: 'Upload Manual',
  args: {
    label: 'Envio Manual',
    autoUpload: false,
    uploadUrl: '/api/upload',
    helperText: 'Clique em "Enviar Todos" para fazer upload',
  }
};

export const WithCompression: Story = {
  name: 'Com Compressão',
  args: {
    label: 'Compressão Automática',
    autoCompress: true,
    compressionQuality: 0.8,
    helperText: 'Imagens são comprimidas automaticamente (qualidade: 80%)',
  }
};

// ========== CASOS DE USO ==========

export const EcommerceProductPhotos: Story = {
  name: '🛍️ E-commerce (Fotos de Produto)',
  args: {
    label: 'Fotos do Produto',
    mode: 'grid',
    maxFiles: 8,
    maxFileSize: 5 * 1024 * 1024,
    autoUpload: false,
    helperText: 'Adicione até 8 fotos do produto (máx 5MB cada)',
  }
};

export const SocialMediaPost: Story = {
  name: '📱 Social Media (Post)',
  args: {
    label: 'Adicionar Fotos ao Post',
    mode: 'grid',
    maxFiles: 10,
    autoUpload: true,
    helperText: 'Arraste suas fotos aqui ou clique para selecionar',
  }
};

export const ProfileAvatar: Story = {
  name: '👤 Perfil (Avatar)',
  args: {
    label: 'Foto de Perfil',
    mode: 'single',
    multiple: false,
    maxFiles: 1,
    maxFileSize: 2 * 1024 * 1024,
    accept: 'image/jpeg,image/png',
    autoUpload: true,
    helperText: 'JPG ou PNG, máx 2MB',
  }
};

export const RealEstatePhotos: Story = {
  name: '🏠 Imobiliário (Fotos de Imóvel)',
  args: {
    label: 'Fotos do Imóvel',
    mode: 'grid',
    maxFiles: 20,
    maxFileSize: 10 * 1024 * 1024,
    autoUpload: false,
    helperText: 'Adicione até 20 fotos do imóvel',
  }
};

export const DocumentVerification: Story = {
  name: '📄 Verificação (Documentos)',
  args: {
    label: 'Documentos de Identidade',
    mode: 'list',
    maxFiles: 3,
    maxFileSize: 5 * 1024 * 1024,
    autoUpload: true,
    helperText: 'RG, CPF ou CNH (frente e verso)',
  }
};

// ========== FORMULÁRIO ==========

export const WithFormControlName: Story = {
  name: '📝 Com formControlName',
  render: () => ({
    template: `
      <div style="padding: 2rem; max-width: 800px; font-family: Montserrat;">
        <h3>Formulário com Upload de Imagens</h3>
        
        <form [formGroup]="form">
          <!-- Single Image -->
          <web-image-upload
            label="Foto de Perfil *"
            mode="single"
            [maxFiles]="1"
            formControlName="avatar"
            [error]="form.get('avatar')?.invalid && form.get('avatar')?.touched"
            errorMessage="Foto de perfil é obrigatória">
          </web-image-upload>
          
          <br>
          
          <!-- Multiple Images -->
          <web-image-upload
            label="Galeria de Fotos"
            mode="grid"
            [maxFiles]="5"
            formControlName="gallery"
            helperText="Adicione até 5 fotos à galeria">
          </web-image-upload>
          
          <br>
          
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
        
        <div style="padding: 1rem; background: #f8f9fa; border-radius: 0.375rem;">
          <strong>Valores:</strong>
          <pre style="margin: 0.5rem 0; font-size: 0.875rem;">{{ getFormValues() }}</pre>
        </div>
      </div>
    `,
    props: {
      form: new FormGroup({
        avatar: new FormControl(null, Validators.required),
        gallery: new FormControl([])
      }),
      getFormValues() {
        const avatar = this['form'].get('avatar')?.value;
        const gallery = this['form'].get('gallery')?.value;
        return JSON.stringify({
          avatar: avatar ? { name: avatar.name, size: avatar.size } : null,
          gallery: Array.isArray(gallery) ? gallery.map((img: UploadedImage) => ({ name: img.name, size: img.size })) : []
        }, null, 2);
      },
      submitForm() {
        if (this['form'].valid) {
          alert('Formulário enviado!');
        } else {
          Object.keys(this['form'].controls).forEach(key => {
            this['form'].get(key)?.markAsTouched();
          });
        }
      }
    }
  })
};

// ========== COMPARAÇÃO ==========

export const Comparison: Story = {
  name: '🎯 Comparação de Modos',
  render: () => ({
    template: `
      <div style="font-family: Montserrat, sans-serif; padding: 2rem;">
        <h2>Modos de Visualização</h2>
        <p style="color: #6c757d; margin-bottom: 3rem;">
          O componente suporta 4 modos diferentes de visualização
        </p>
        
        <div style="display: grid; gap: 3rem;">
          
          <!-- Grid -->
          <div>
            <h3 style="margin-bottom: 1rem;">
              📊 Grid Mode
              <span style="background: #e6f7ff; color: #007bff; padding: 0.25rem 0.5rem; border-radius: 0.25rem; font-size: 0.75rem; font-weight: 600;">RECOMENDADO</span>
            </h3>
            <p style="color: #6c757d; font-size: 0.875rem; margin-bottom: 1rem;">
              ✅ Galeria visual em grade<br>
              ✅ Perfeito para múltiplas imagens<br>
              ✅ Preview grande e claro
            </p>
            <web-image-upload
              label="Galeria de Fotos"
              mode="grid"
              [maxFiles]="6">
            </web-image-upload>
          </div>
          
          <!-- List -->
          <div>
            <h3 style="margin-bottom: 1rem;">📋 List Mode</h3>
            <p style="color: #6c757d; font-size: 0.875rem; margin-bottom: 1rem;">
              ✅ Lista com detalhes<br>
              ✅ Exibe nome, tamanho e dimensões<br>
              ✅ Bom para gerenciamento
            </p>
            <web-image-upload
              label="Lista de Arquivos"
              mode="list"
              [maxFiles]="4">
            </web-image-upload>
          </div>
          
          <!-- Compact -->
          <div>
            <h3 style="margin-bottom: 1rem;">🎯 Compact Mode</h3>
            <p style="color: #6c757d; font-size: 0.875rem; margin-bottom: 1rem;">
              ✅ Miniaturas pequenas<br>
              ✅ Economiza espaço<br>
              ✅ Ideal para muitas imagens
            </p>
            <web-image-upload
              label="Miniaturas"
              mode="compact"
              [maxFiles]="10">
            </web-image-upload>
          </div>
          
          <!-- Single -->
          <div>
            <h3 style="margin-bottom: 1rem;">👤 Single Mode</h3>
            <p style="color: #6c757d; font-size: 0.875rem; margin-bottom: 1rem;">
              ✅ Uma imagem apenas<br>
              ✅ Perfeito para avatar/perfil<br>
              ✅ Interface simplificada
            </p>
            <web-image-upload
              label="Foto de Perfil"
              mode="single"
              [maxFiles]="1"
              [multiple]="false">
            </web-image-upload>
          </div>
          
        </div>
        
        <div style="margin-top: 3rem; padding: 1.5rem; background: #f0f9ff; border-radius: 0.5rem; border-left: 4px solid #007bff;">
          <h4 style="margin-top: 0;">🚀 Funcionalidades Únicas</h4>
          <ul style="margin: 1rem 0; padding-left: 1.5rem; line-height: 1.8;">
            <li><strong>Drag & Drop Visual:</strong> Interface moderna e intuitiva</li>
            <li><strong>Preview em Lightbox:</strong> Clique para ver imagem em tela cheia</li>
            <li><strong>Progress Bar Individual:</strong> Acompanhe cada upload</li>
            <li><strong>Edição Inline:</strong> Rotação, crop e filtros</li>
            <li><strong>Validação Avançada:</strong> Tamanho, tipo e dimensões</li>
            <li><strong>Zero Dependências:</strong> Bundle pequeno e rápido</li>
          </ul>
        </div>
      </div>
    `,
    props: {}
  })
};