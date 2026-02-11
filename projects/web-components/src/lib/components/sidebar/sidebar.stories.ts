import { Meta, StoryObj, moduleMetadata, applicationConfig } from '@storybook/angular';
import { provideRouter } from '@angular/router';
import { SidebarComponent, MenuItem, UserProfile, QuickAction } from './sidebar.component';

// Menu items de exemplo
const demoMenuItems: MenuItem[] = [
  {
    label: 'Dashboard',
    icon: 'dashboard',
    route: '/dashboard',
    badge: { value: '5', color: '#007bff', pulse: true }
  },
  {
    label: 'Analytics',
    icon: 'analytics',
    children: [
      { label: 'Overview', icon: 'bar_chart', route: '/analytics/overview' },
      { label: 'Reports', icon: 'description', route: '/analytics/reports', badge: { value: 'New', color: '#28a745' } },
      { label: 'Export', icon: 'download', route: '/analytics/export' }
    ]
  },
  {
    label: 'E-commerce',
    icon: 'shopping_cart',
    children: [
      { label: 'Products', icon: 'inventory_2', route: '/products' },
      { label: 'Orders', icon: 'shopping_bag', route: '/orders', badge: { value: 12, color: '#ffc107' } },
      { label: 'Customers', icon: 'people', route: '/customers' }
    ]
  },
  { separator: true },
  {
    label: 'Settings',
    icon: 'settings',
    route: '/settings'
  },
  {
    label: 'Help',
    icon: 'help',
    route: '/help'
  }
];

const userProfileDemo: UserProfile = {
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://i.pravatar.cc/150?img=12',
  role: 'Administrator',
  status: 'online'
};

const quickActionsDemo: QuickAction[] = [
  { icon: 'settings', label: 'Settings', action: () => console.log('Settings clicked') },
  { icon: 'logout', label: 'Logout', action: () => console.log('Logout clicked') }
];

const meta: Meta<SidebarComponent> = {
  title: 'Navigation/Sidebar',
  component: SidebarComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [SidebarComponent],
    }),
    applicationConfig({
      providers: [provideRouter([])],
    }),
  ],
  parameters: {
  docs: {
  description: {
    component: `
# 📘 Guia Completo de Implementação - Web Sidebar

## 🚀 Como Usar o Sidebar

### **1. Importar o Componente**

\`\`\`typescript
// app.component.ts (ou seu componente principal)
import { Component } from '@angular/core';
import { SidebarComponent, MenuItem, UserProfile, QuickAction } from './sidebar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SidebarComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {
  // Configurações aqui...
}
\`\`\`

---

## 📋 **2. Criar o Array de Menu Items**

### **Exemplo Básico:**

\`\`\`typescript
export class AppComponent {
  menuItems: MenuItem[] = [
    {
      label: 'Dashboard',
      icon: 'dashboard',
      route: '/dashboard'
    },
    {
      label: 'Users',
      icon: 'people',
      route: '/users'
    },
    {
      label: 'Settings',
      icon: 'settings',
      route: '/settings'
    }
  ];
}
\`\`\`

### **Com Badges (Contadores):**

\`\`\`typescript
menuItems: MenuItem[] = [
  {
    label: 'Inbox',
    icon: 'inbox',
    route: '/inbox',
    badge: {
      value: '42',
      color: '#007bff',
      pulse: true
    }
  },
  {
    label: 'Notifications',
    icon: 'notifications',
    route: '/notifications',
    badge: {
      value: 'New',
      color: '#28a745'
    }
  }
];
\`\`\`

### **Menu Multi-Level (Submenu):**

\`\`\`typescript
menuItems: MenuItem[] = [
  {
    label: 'Dashboard',
    icon: 'dashboard',
    route: '/dashboard'
  },
  {
    label: 'Products',
    icon: 'inventory_2',
    children: [
      {
        label: 'All Products',
        icon: 'list',
        route: '/products/all'
      },
      {
        label: 'Categories',
        icon: 'category',
        route: '/products/categories'
      },
      {
        label: 'Stock',
        icon: 'warehouse',
        route: '/products/stock',
        badge: { value: 'Low', color: '#dc3545' }
      }
    ]
  },
  {
    label: 'Orders',
    icon: 'shopping_cart',
    badge: { value: 24, color: '#ffc107' },
    children: [
      {
        label: 'Pending',
        icon: 'pending',
        route: '/orders/pending'
      },
      {
        label: 'Completed',
        icon: 'check_circle',
        route: '/orders/completed'
      }
    ]
  },
  { separator: true },
  {
    label: 'Settings',
    icon: 'settings',
    route: '/settings'
  }
];
\`\`\`

---

## 👤 **3. Configurar User Profile (Opcional)**

\`\`\`typescript
userProfile: UserProfile = {
  name: 'Maria Silva',
  email: 'maria@company.com',
  avatar: 'https://i.pravatar.cc/150?img=45',
  role: 'Administrator',
  status: 'online'
};
\`\`\`

---

## ⚡ **4. Configurar Quick Actions (Opcional)**

\`\`\`typescript
quickActions: QuickAction[] = [
  {
    icon: 'settings',
    label: 'Settings',
    action: () => this.openSettings()
  },
  {
    icon: 'help',
    label: 'Help',
    action: () => this.openHelp()
  },
  {
    icon: 'logout',
    label: 'Logout',
    action: () => this.logout()
  }
];
\`\`\`

---

## 🎨 **5. Template HTML**

\`\`\`html
<web-sidebar
  mode="push"
  position="left"
  [width]="280"
  [resizable]="true"
  [showToggle]="true"
  title="My Application"
  logo="🚀"
  [items]="menuItems"
  [userProfile]="userProfile"
  [quickActions]="quickActions"
  (openChange)="onSidebarToggle($event)"
  (itemClick)="onMenuItemClick($event)">
</web-sidebar>
\`\`\`

---

## 🎨 **Propriedades Disponíveis**

| Propriedade | Tipo | Padrão | Descrição |
|------------|------|--------|-----------|
| mode | 'push' \\| 'overlay' \\| 'mini' \\| 'fixed' | 'push' | Modo de operação |
| position | 'left' \\| 'right' | 'left' | Posição |
| width | number | 280 | Largura |
| resizable | boolean | false | Redimensionável |
| items | MenuItem[] | [] | Menu |
| userProfile | UserProfile | - | Usuário |
| quickActions | QuickAction[] | [] | Ações rápidas |

---

## 📤 **Eventos**

| Evento | Tipo | Descrição |
|------|------|-----------|
| itemClick | MenuItem | Clique em item |
| openChange | boolean | Abre / fecha |

---

## 💡 **Dicas Importantes**

- Use **Material Symbols Icons**
- Sidebar é **responsivo automático**
- Estado é salvo no **localStorage**
- Rota ativa já vem implementada

---

**Pronto para uso em produção.** 🚀
`
  }  
  },
    layout: 'fullscreen',
  }
};

export default meta;
type Story = StoryObj<SidebarComponent>;

// ========== MODOS ==========

export const PushMode: Story = {
  name: 'Push Mode (Empurra Conteúdo)',
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; height: 100vh;">
        <web-sidebar
          [mode]="mode"
          [items]="items"
          [userProfile]="userProfile"
          [quickActions]="quickActions"
          [title]="title"
          [logo]="logo">
        </web-sidebar>
        
        <main style="flex: 1; padding: 2rem; background: #f9fafb; overflow: auto;">
          <h1 style="font-family: Montserrat;">Push Mode</h1>
          <p style="font-family: Montserrat; color: #6c757d;">
            O sidebar empurra o conteúdo principal para o lado.
          </p>
          <div style="background: white; padding: 2rem; border-radius: 0.5rem; margin-top: 2rem;">
            <h3>Conteúdo Principal</h3>
            <p>Este conteúdo é empurrado quando o sidebar abre/fecha.</p>
          </div>
        </main>
      </div>
    `
  }),
  args: {
    mode: 'push',
    title: 'My App',
    logo: '🚀',
    items: demoMenuItems,
    userProfile: userProfileDemo,
    quickActions: quickActionsDemo
  }
};

export const OverlayMode: Story = {
  name: 'Overlay Mode (Sobrepõe)',
  render: (args) => ({
    props: args,
    template: `
      <div style="height: 100vh; position: relative;">
        <web-sidebar
          [mode]="mode"
          [items]="items"
          [userProfile]="userProfile"
          [quickActions]="quickActions"
          [title]="title">
        </web-sidebar>
        
        <main style="padding: 2rem; background: #f9fafb; height: 100%;">
          <h1 style="font-family: Montserrat;">Overlay Mode</h1>
          <p style="font-family: Montserrat; color: #6c757d;">
            O sidebar sobrepõe o conteúdo (ideal para mobile).
          </p>
          <div style="background: white; padding: 2rem; border-radius: 0.5rem; margin-top: 2rem;">
            <h3>Conteúdo Principal</h3>
            <p>Este conteúdo permanece fixo, o sidebar sobrepõe.</p>
          </div>
        </main>
      </div>
    `
  }),
  args: {
    mode: 'overlay',
    title: 'My App',
    items: demoMenuItems,
    userProfile: userProfileDemo,
    quickActions: quickActionsDemo
  }
};

export const MiniMode: Story = {
  name: 'Mini Mode (Compacto)',
  render: (args) => ({
    props: {
      ...args,
      isMini: true
    },
    template: `
      <div style="display: flex; height: 100vh;">
        <web-sidebar
          [mode]="mode"
          [items]="items"
          [userProfile]="userProfile"
          [quickActions]="quickActions"
          [title]="title">
        </web-sidebar>
        
        <main style="flex: 1; padding: 2rem; background: #f9fafb;">
          <h1 style="font-family: Montserrat;">Mini Mode</h1>
          <p style="font-family: Montserrat; color: #6c757d;">
            Modo compacto mostrando apenas ícones. Clique no botão de menu para expandir.
          </p>
          <div style="background: white; padding: 2rem; border-radius: 0.5rem; margin-top: 2rem;">
            <h3>💡 Dica</h3>
            <p>Clique no ícone de menu (☰) no topo do sidebar para alternar entre normal e mini.</p>
          </div>
        </main>
      </div>
    `
  }),
  args: {
    mode: 'push',
    title: 'App',
    items: demoMenuItems,
    userProfile: userProfileDemo,
    quickActions: quickActionsDemo
  }
};

// ========== FEATURES ==========

export const WithUserProfile: Story = {
  name: 'Com Perfil de Usuário',
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; height: 100vh;">
        <web-sidebar
          [mode]="mode"
          [items]="items"
          [userProfile]="userProfile"
          [title]="title">
        </web-sidebar>
        
        <main style="flex: 1; padding: 2rem; background: #f9fafb;">
          <h1 style="font-family: Montserrat;">User Profile Section</h1>
          <p style="font-family: Montserrat; color: #6c757d;">
            O sidebar pode exibir informações do usuário logado.
          </p>
          <div style="background: white; padding: 2rem; border-radius: 0.5rem; margin-top: 2rem;">
            <h3>Funcionalidades:</h3>
            <ul style="font-family: Montserrat; line-height: 1.8;">
              <li>✅ Avatar (imagem ou iniciais)</li>
              <li>✅ Nome e cargo</li>
              <li>✅ Status online/offline/away</li>
              <li>✅ Modo mini mostra apenas avatar</li>
            </ul>
          </div>
        </main>
      </div>
    `
  }),
  args: {
    mode: 'push',
    title: 'Dashboard',
    items: demoMenuItems,
    userProfile: {
      name: 'Maria Silva',
      email: 'maria@company.com',
      avatar: 'https://i.pravatar.cc/150?img=45',
      role: 'Product Manager',
      status: 'online'
    }
  }
};

export const MultiLevelMenu: Story = {
  name: 'Menu Multi-Level',
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; height: 100vh;">
        <web-sidebar
          [mode]="mode"
          [items]="items"
          [title]="title">
        </web-sidebar>
        
        <main style="flex: 1; padding: 2rem; background: #f9fafb;">
          <h1 style="font-family: Montserrat;">Multi-Level Menu</h1>
          <p style="font-family: Montserrat; color: #6c757d;">
            Menu hierárquico com subitens expansíveis.
          </p>
          <div style="background: white; padding: 2rem; border-radius: 0.5rem; margin-top: 2rem;">
            <h3>Features:</h3>
            <ul style="font-family: Montserrat; line-height: 1.8;">
              <li>✅ Subitens infinitos</li>
              <li>✅ Expansão/colapso animado</li>
              <li>✅ Ícones customizáveis</li>
              <li>✅ Badge/contador por item</li>
              <li>✅ Active route detection</li>
            </ul>
          </div>
        </main>
      </div>
    `
  }),
  args: {
    mode: 'push',
    title: 'E-commerce Admin',
    items: [
      {
        label: 'Dashboard',
        icon: 'dashboard',
        route: '/dashboard'
      },
      {
        label: 'Products',
        icon: 'inventory_2',
        children: [
          { label: 'All Products', icon: 'list', route: '/products/all' },
          { label: 'Categories', icon: 'category', route: '/products/categories' },
          { label: 'Inventory', icon: 'warehouse', route: '/products/inventory', badge: { value: 'Low', color: '#dc3545' } },
          { label: 'Suppliers', icon: 'local_shipping', route: '/products/suppliers' }
        ]
      },
      {
        label: 'Orders',
        icon: 'shopping_cart',
        badge: { value: 24, color: '#ffc107' },
        children: [
          { label: 'Pending', icon: 'pending', route: '/orders/pending', badge: { value: 12, color: '#ffc107' } },
          { label: 'Processing', icon: 'autorenew', route: '/orders/processing' },
          { label: 'Shipped', icon: 'local_shipping', route: '/orders/shipped' },
          { label: 'Completed', icon: 'check_circle', route: '/orders/completed' }
        ]
      },
      {
        label: 'Customers',
        icon: 'people',
        children: [
          { label: 'All Customers', icon: 'group', route: '/customers/all' },
          { label: 'VIP', icon: 'star', route: '/customers/vip' },
          { label: 'Reviews', icon: 'rate_review', route: '/customers/reviews' }
        ]
      },
      { separator: true },
      {
        label: 'Settings',
        icon: 'settings',
        route: '/settings'
      }
    ]
  }
};

export const WithBadges: Story = {
  name: 'Com Badges e Contadores',
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; height: 100vh;">
        <web-sidebar
          [mode]="mode"
          [items]="items"
          [title]="title">
        </web-sidebar>
        
        <main style="flex: 1; padding: 2rem; background: #f9fafb;">
          <h1 style="font-family: Montserrat;">Badges & Counters</h1>
          <p style="font-family: Montserrat; color: #6c757d;">
            Mostre notificações, contadores e status nos itens do menu.
          </p>
        </main>
      </div>
    `
  }),
  args: {
    mode: 'push',
    title: 'Notifications',
    items: [
      {
        label: 'Inbox',
        icon: 'inbox',
        route: '/inbox',
        badge: { value: 42, color: '#007bff', pulse: true }
      },
      {
        label: 'Messages',
        icon: 'message',
        route: '/messages',
        badge: { value: 'New', color: '#28a745', pulse: true }
      },
      {
        label: 'Notifications',
        icon: 'notifications',
        route: '/notifications',
        badge: { value: 99, color: '#dc3545' }
      },
      { separator: true },
      {
        label: 'Tasks',
        icon: 'task',
        route: '/tasks',
        badge: { value: '5/12', color: '#ffc107' }
      }
    ]
  }
};

export const Resizable: Story = {
  name: 'Redimensionável',
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; height: 100vh;">
        <web-sidebar
          [mode]="mode"
          [items]="items"
          [userProfile]="userProfile"
          [resizable]="resizable"
          [title]="title">
        </web-sidebar>
        
        <main style="flex: 1; padding: 2rem; background: #f9fafb;">
          <h1 style="font-family: Montserrat;">Resizable Sidebar</h1>
          <p style="font-family: Montserrat; color: #6c757d;">
            Arraste a borda direita do sidebar para redimensioná-lo.
          </p>
          <div style="background: white; padding: 2rem; border-radius: 0.5rem; margin-top: 2rem;">
            <h3>💡 Como usar:</h3>
            <ol style="font-family: Montserrat; line-height: 1.8;">
              <li>Passe o mouse na borda direita do sidebar</li>
              <li>O cursor mudará para ↔️</li>
              <li>Clique e arraste para redimensionar</li>
              <li>A largura é salva automaticamente</li>
            </ol>
          </div>
        </main>
      </div>
    `
  }),
  args: {
    mode: 'push',
    title: 'Resizable Demo',
    resizable: true,
    items: demoMenuItems,
    userProfile: userProfileDemo
  }
};

export const RightPosition: Story = {
  name: 'Posição Direita',
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; height: 100vh;">
        <main style="flex: 1; padding: 2rem; background: #f9fafb;">
          <h1 style="font-family: Montserrat;">Right Sidebar</h1>
          <p style="font-family: Montserrat; color: #6c757d;">
            O sidebar também pode ser posicionado à direita.
          </p>
        </main>
        
        <web-sidebar
          [mode]="mode"
          [position]="position"
          [items]="items"
          [title]="title">
        </web-sidebar>
      </div>
    `
  }),
  args: {
    mode: 'push',
    position: 'right',
    title: 'Right Side',
    items: demoMenuItems
  }
};

// ========== COMPARAÇÃO ==========

export const Comparison: Story = {
  name: '🎯 Comparação de Modos',
  render: () => ({
    template: `
      <div style="font-family: Montserrat, sans-serif; padding: 2rem;">
        <h2>Comparação de Modos</h2>
        <p style="color: #6c757d; margin-bottom: 2rem;">
          O sidebar suporta 4 modos diferentes de operação
        </p>
        
        <div style="display: grid; gap: 2rem;">
          
          <div style="padding: 1.5rem; background: #f0f9ff; border-radius: 0.5rem; border-left: 4px solid #007bff;">
            <h3 style="margin-top: 0;">🔵 Push Mode</h3>
            <p>O sidebar empurra o conteúdo principal para o lado.</p>
            <ul style="line-height: 1.8;">
              <li>✅ Melhor para desktop</li>
              <li>✅ Conteúdo sempre visível</li>
              <li>✅ Layout responsivo</li>
            </ul>
          </div>
          
          <div style="padding: 1.5rem; background: #fff3cd; border-radius: 0.5rem; border-left: 4px solid #ffc107;">
            <h3 style="margin-top: 0;">🟡 Overlay Mode</h3>
            <p>O sidebar sobrepõe o conteúdo (drawer).</p>
            <ul style="line-height: 1.8;">
              <li>✅ Melhor para mobile</li>
              <li>✅ Economiza espaço</li>
              <li>✅ Backdrop escuro</li>
            </ul>
          </div>
          
          <div style="padding: 1.5rem; background: #d1ecf1; border-radius: 0.5rem; border-left: 4px solid #17a2b8;">
            <h3 style="margin-top: 0;">🔵 Mini Mode</h3>
            <p>Modo compacto mostrando apenas ícones.</p>
            <ul style="line-height: 1.8;">
              <li>✅ Economiza muito espaço</li>
              <li>✅ Tooltips no hover</li>
              <li>✅ Toggle fácil</li>
            </ul>
          </div>
          
          <div style="padding: 1.5rem; background: #d4edda; border-radius: 0.5rem; border-left: 4px solid #28a745;">
            <h3 style="margin-top: 0;">🟢 Fixed Mode</h3>
            <p>Sidebar fixo sempre visível.</p>
            <ul style="line-height: 1.8;">
              <li>✅ Sempre acessível</li>
              <li>✅ Navegação rápida</li>
              <li>✅ Perfeito para dashboards</li>
            </ul>
          </div>
          
        </div>
        
        <div style="margin-top: 2rem; padding: 1.5rem; background: white; border-radius: 0.5rem; border: 2px solid #e5e7eb;">
          <h3 style="margin-top: 0;">📊 Tabela Comparativa</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="background: #f9fafb;">
                <th style="padding: 0.75rem; text-align: left; border-bottom: 2px solid #e5e7eb;">Feature</th>
                <th style="padding: 0.75rem; text-align: center; border-bottom: 2px solid #e5e7eb;">Push</th>
                <th style="padding: 0.75rem; text-align: center; border-bottom: 2px solid #e5e7eb;">Overlay</th>
                <th style="padding: 0.75rem; text-align: center; border-bottom: 2px solid #e5e7eb;">Mini</th>
                <th style="padding: 0.75rem; text-align: center; border-bottom: 2px solid #e5e7eb;">Fixed</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="padding: 0.75rem; border-bottom: 1px solid #e5e7eb;">Mobile Friendly</td>
                <td style="padding: 0.75rem; text-align: center; border-bottom: 1px solid #e5e7eb;">⚠️</td>
                <td style="padding: 0.75rem; text-align: center; border-bottom: 1px solid #e5e7eb;">✅</td>
                <td style="padding: 0.75rem; text-align: center; border-bottom: 1px solid #e5e7eb;">✅</td>
                <td style="padding: 0.75rem; text-align: center; border-bottom: 1px solid #e5e7eb;">⚠️</td>
              </tr>
              <tr>
                <td style="padding: 0.75rem; border-bottom: 1px solid #e5e7eb;">Economiza Espaço</td>
                <td style="padding: 0.75rem; text-align: center; border-bottom: 1px solid #e5e7eb;">⚠️</td>
                <td style="padding: 0.75rem; text-align: center; border-bottom: 1px solid #e5e7eb;">✅</td>
                <td style="padding: 0.75rem; text-align: center; border-bottom: 1px solid #e5e7eb;">✅</td>
                <td style="padding: 0.75rem; text-align: center; border-bottom: 1px solid #e5e7eb;">❌</td>
              </tr>
              <tr>
                <td style="padding: 0.75rem; border-bottom: 1px solid #e5e7eb;">Sempre Visível</td>
                <td style="padding: 0.75rem; text-align: center; border-bottom: 1px solid #e5e7eb;">✅</td>
                <td style="padding: 0.75rem; text-align: center; border-bottom: 1px solid #e5e7eb;">❌</td>
                <td style="padding: 0.75rem; text-align: center; border-bottom: 1px solid #e5e7eb;">✅</td>
                <td style="padding: 0.75rem; text-align: center; border-bottom: 1px solid #e5e7eb;">✅</td>
              </tr>
              <tr>
                <td style="padding: 0.75rem;">Navegação Rápida</td>
                <td style="padding: 0.75rem; text-align: center;">✅</td>
                <td style="padding: 0.75rem; text-align: center;">⚠️</td>
                <td style="padding: 0.75rem; text-align: center;">✅</td>
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