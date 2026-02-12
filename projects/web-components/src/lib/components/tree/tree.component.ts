import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostBinding,
  OnInit,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface TreeNode {
  id: string | number;
  label: string;
  icon?: string;
  avatar?: string;
  badge?: string;
  badgeColor?: string;
  children?: TreeNode[];
  expanded?: boolean;
  selected?: boolean;
  disabled?: boolean;
  checked?: boolean;
  indeterminate?: boolean;
  meta?: string;
  data?: any;
  // Custom colors per node
  labelColor?: string;
  iconColor?: string;
  backgroundColor?: string;
}

export type TreeSelectionMode = 'single' | 'multiple' | 'checkbox' | 'none';
export type TreeSize = 'small' | 'medium' | 'large';
export type TreeVariant = 'default' | 'bordered' | 'filled';
export type TreeLineStyle = 'solid' | 'dashed' | 'dotted' | 'none';

export interface TreeNodeEvent {
  node: TreeNode;
  event: MouseEvent;
}

@Component({
  selector: 'web-tree',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="tree-container"
         [class]="'tree-' + variant + ' tree-' + size"
         [class.tree-show-lines]="showLines && lineStyle !== 'none'"
         [class]="'tree-lines-' + lineStyle"
         [style.background]="backgroundColor"
         [style.borderColor]="borderColor">

      <!-- Header -->
      <div *ngIf="title || searchable"
           class="tree-header"
           [style.background]="headerBackgroundColor"
           [style.borderColor]="borderColor">
        <div class="tree-header-content">
          <h3 *ngIf="title" class="tree-title" [style.color]="titleColor">
            {{ title }}
            <span *ngIf="badge"
                  class="tree-badge"
                  [style.background]="badgeColor || '#007bff'">
              {{ badge }}
            </span>
          </h3>
        </div>

        <div class="tree-header-actions">
          <button *ngIf="expandable"
                  type="button"
                  class="tree-action-btn"
                  (click)="expandAll()"
                  title="Expandir todos">
            <span class="material-symbols-outlined">unfold_more</span>
          </button>
          <button *ngIf="expandable"
                  type="button"
                  class="tree-action-btn"
                  (click)="collapseAll()"
                  title="Colapsar todos">
            <span class="material-symbols-outlined">unfold_less</span>
          </button>
        </div>
      </div>

      <!-- Search -->
      <div *ngIf="searchable" class="tree-search">
        <span class="material-symbols-outlined search-icon">search</span>
        <input type="text"
               class="tree-search-input"
               placeholder="Buscar..."
               [(ngModel)]="searchText"
               (input)="onSearch()">
        <button *ngIf="searchText"
                type="button"
                class="search-clear"
                (click)="clearSearch()">
          <span class="material-symbols-outlined">close</span>
        </button>
      </div>

      <!-- Tree Nodes -->
      <div class="tree-nodes" [style.padding]="rootPadding">
        <ng-container *ngFor="let node of filteredNodes; trackBy: trackByNode">
          <div class="tree-node-wrapper">
            <ng-container *ngTemplateOutlet="nodeTemplate; context: { node: node, level: 0 }"></ng-container>
          </div>
        </ng-container>
      </div>

      <!-- Empty State -->
      <div *ngIf="filteredNodes.length === 0" class="tree-empty">
        <span class="material-symbols-outlined tree-empty-icon">search_off</span>
        <p>{{ emptyText }}</p>
      </div>
    </div>

    <!-- Node Template -->
    <ng-template #nodeTemplate let-node="node" let-level="level">
      <div class="tree-node"
           [class.tree-node-selected]="node.selected"
           [class.tree-node-disabled]="node.disabled"
           [class.tree-node-has-children]="hasChildren(node)"
           [style.paddingLeft.px]="level * indentSize"
           [style.background]="node.backgroundColor || (node.selected ? selectedNodeBackground : '')"
           [style.borderColor]="borderColor">

        <!-- Expand/Collapse Button -->
        <button *ngIf="hasChildren(node) && expandable"
                type="button"
                class="tree-expand-btn"
                [class.tree-expand-btn-expanded]="node.expanded"
                (click)="toggleExpand(node, $event)">
          <span class="material-symbols-outlined">
            {{ node.expanded ? 'expand_more' : 'chevron_right' }}
          </span>
        </button>

        <div *ngIf="!hasChildren(node) && showLines" class="tree-node-spacer"></div>

        <!-- Checkbox -->
        <label *ngIf="selectionMode === 'checkbox'"
               class="tree-checkbox"
               (click)="$event.stopPropagation()">
          <input type="checkbox"
                 [checked]="node.checked"
                 [indeterminate]="node.indeterminate"
                 [disabled]="node.disabled"
                 (change)="onCheckboxChange(node, $event)">
          <span class="checkbox-mark"
                [class.checkbox-indeterminate]="node.indeterminate"></span>
        </label>

        <!-- Node Content -->
        <div class="tree-node-content"
             [class.tree-node-clickable]="!node.disabled"
             (click)="onNodeClick(node, $event)">

          <!-- Avatar -->
          <div *ngIf="node.avatar" class="tree-node-avatar">
            <img *ngIf="node.avatar.startsWith('http')" [src]="node.avatar" [alt]="node.label">
            <div *ngIf="!node.avatar.startsWith('http')" class="avatar-text">{{ node.avatar }}</div>
          </div>

          <!-- Icon -->
          <span *ngIf="node.icon && !node.avatar"
                class="material-symbols-outlined tree-node-icon"
                [style.color]="node.iconColor || iconColor">
            {{ node.icon }}
          </span>

          <!-- Label -->
          <span class="tree-node-label"
                [style.color]="node.labelColor || labelColor">
            {{ node.label }}
          </span>

          <!-- Badge -->
          <span *ngIf="node.badge"
                class="tree-node-badge"
                [style.background]="node.badgeColor || badgeColor || '#007bff'">
            {{ node.badge }}
          </span>

          <!-- Meta -->
          <span *ngIf="node.meta"
                class="tree-node-meta"
                [style.color]="metaColor">
            {{ node.meta }}
          </span>
        </div>
      </div>

      <!-- Children -->
      <div *ngIf="hasChildren(node) && node.expanded"
           class="tree-node-children">
        <ng-container *ngFor="let child of node.children; trackBy: trackByNode">
          <ng-container *ngTemplateOutlet="nodeTemplate; context: { node: child, level: level + 1 }"></ng-container>
        </ng-container>
      </div>
    </ng-template>
  `,
  styles: [`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');

    :host {
      display: block;
      font-family: 'Inter', system-ui, -apple-system, sans-serif;
    }

    /* Container */
    .tree-container {
      background: white;
      border-radius: 8px;
      overflow: hidden;
    }

    .tree-default {
      /* Clean style */
    }

    .tree-bordered {
      border: 1px solid #e0e0e0;
    }

    .tree-filled {
      background: #f8f9fa;
    }

    /* Sizes */
    .tree-small {
      font-size: 13px;
    }

    .tree-small .tree-node {
      padding: 4px 8px;
    }

    .tree-medium {
      font-size: 14px;
    }

    .tree-medium .tree-node {
      padding: 8px 12px;
    }

    .tree-large {
      font-size: 15px;
    }

    .tree-large .tree-node {
      padding: 12px 16px;
    }

    /* Header */
    .tree-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 20px;
      border-bottom: 1px solid #e0e0e0;
      background: #fafafa;
    }

    .tree-header-content {
      flex: 1;
    }

    .tree-title {
      margin: 0;
      font-size: 16px;
      font-weight: 600;
      color: #1a1a1a;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .tree-badge {
      display: inline-block;
      padding: 2px 8px;
      border-radius: 12px;
      font-size: 11px;
      font-weight: 600;
      color: white;
    }

    .tree-header-actions {
      display: flex;
      gap: 4px;
    }

    .tree-action-btn {
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: transparent;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: background 0.2s;
      color: #666;
    }

    .tree-action-btn:hover {
      background: rgba(0, 0, 0, 0.05);
    }

    .tree-action-btn .material-symbols-outlined {
      font-size: 20px;
    }

    /* Search */
    .tree-search {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 12px 16px;
      border-bottom: 1px solid #e0e0e0;
      background: white;
    }

    .search-icon {
      font-size: 20px;
      color: #999;
    }

    .tree-search-input {
      flex: 1;
      border: none;
      outline: none;
      font-size: 14px;
      color: #1a1a1a;
    }

    .tree-search-input::placeholder {
      color: #999;
    }

    .search-clear {
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: transparent;
      border: none;
      border-radius: 50%;
      cursor: pointer;
      color: #999;
    }

    .search-clear:hover {
      background: rgba(0, 0, 0, 0.05);
    }

    .search-clear .material-symbols-outlined {
      font-size: 18px;
    }

    /* Nodes */
    .tree-nodes {
      padding: 8px 0;
    }

    .tree-node-wrapper {
      position: relative;
    }

    .tree-node {
      display: flex;
      align-items: center;
      gap: 8px;
      transition: background 0.2s;
      position: relative;
    }

    .tree-node-selected {
      background: rgba(0, 123, 255, 0.08);
    }

    .tree-node-disabled {
      opacity: 0.5;
      pointer-events: none;
    }

    /* Lines */
    .tree-show-lines .tree-node-wrapper {
      position: relative;
    }

    .tree-show-lines .tree-node-wrapper::before {
      content: '';
      position: absolute;
      left: 20px;
      top: 0;
      bottom: 0;
      width: 1px;
      background: #e0e0e0;
    }

    .tree-lines-dashed .tree-node-wrapper::before {
      background: none;
      border-left: 1px dashed #e0e0e0;
    }

    .tree-lines-dotted .tree-node-wrapper::before {
      background: none;
      border-left: 1px dotted #e0e0e0;
    }

    .tree-show-lines .tree-node::after {
      content: '';
      position: absolute;
      left: 20px;
      top: 50%;
      width: 20px;
      height: 1px;
      background: #e0e0e0;
    }

    .tree-lines-dashed .tree-node::after {
      background: none;
      border-top: 1px dashed #e0e0e0;
    }

    .tree-lines-dotted .tree-node::after {
      background: none;
      border-top: 1px dotted #e0e0e0;
    }

    /* Expand Button */
    .tree-expand-btn {
      width: 20px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: transparent;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.2s;
      color: #666;
      flex-shrink: 0;
    }

    .tree-expand-btn:hover {
      background: rgba(0, 0, 0, 0.05);
    }

    .tree-expand-btn .material-symbols-outlined {
      font-size: 18px;
      transition: transform 0.2s;
    }

    .tree-expand-btn-expanded .material-symbols-outlined {
      transform: rotate(0deg);
    }

    .tree-node-spacer {
      width: 20px;
      flex-shrink: 0;
    }

    /* Checkbox */
    .tree-checkbox {
      position: relative;
      width: 18px;
      height: 18px;
      cursor: pointer;
      flex-shrink: 0;
    }

    .tree-checkbox input {
      position: absolute;
      opacity: 0;
      width: 0;
      height: 0;
    }

    .checkbox-mark {
      position: absolute;
      top: 0;
      left: 0;
      width: 18px;
      height: 18px;
      border: 2px solid #d0d0d0;
      border-radius: 3px;
      background: white;
      transition: all 0.2s;
    }

    .tree-checkbox:hover .checkbox-mark {
      border-color: #007bff;
    }

    .tree-checkbox input:checked ~ .checkbox-mark {
      background: #007bff;
      border-color: #007bff;
    }

    .tree-checkbox input:checked ~ .checkbox-mark::after {
      content: '';
      position: absolute;
      left: 5px;
      top: 2px;
      width: 4px;
      height: 8px;
      border: solid white;
      border-width: 0 2px 2px 0;
      transform: rotate(45deg);
    }

    .checkbox-indeterminate {
      background: #007bff;
      border-color: #007bff;
    }

    .checkbox-indeterminate::after {
      content: '';
      position: absolute;
      left: 3px;
      top: 7px;
      width: 8px;
      height: 2px;
      background: white;
    }

    /* Node Content */
    .tree-node-content {
      display: flex;
      align-items: center;
      gap: 8px;
      flex: 1;
      min-width: 0;
    }

    .tree-node-clickable {
      cursor: pointer;
    }

    .tree-node-clickable:hover {
      opacity: 0.8;
    }

    .tree-node-avatar {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #e0e0e0;
      flex-shrink: 0;
    }

    .tree-node-avatar img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .avatar-text {
      font-size: 10px;
      font-weight: 600;
      color: white;
    }

    .tree-node-icon {
      font-size: 20px;
      color: #666;
      flex-shrink: 0;
    }

    .tree-node-label {
      font-weight: 500;
      color: #1a1a1a;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .tree-node-badge {
      display: inline-block;
      padding: 2px 6px;
      border-radius: 10px;
      font-size: 10px;
      font-weight: 600;
      color: white;
      flex-shrink: 0;
    }

    .tree-node-meta {
      font-size: 12px;
      color: #999;
      margin-left: auto;
      flex-shrink: 0;
    }

    /* Children */
    .tree-node-children {
      overflow: hidden;
      animation: slideDown 0.2s ease-out;
    }

    @keyframes slideDown {
      from {
        opacity: 0;
        max-height: 0;
      }
      to {
        opacity: 1;
        max-height: 1000px;
      }
    }

    /* Empty */
    .tree-empty {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 48px 20px;
      gap: 12px;
      color: #999;
    }

    .tree-empty-icon {
      font-size: 48px;
      opacity: 0.5;
    }

    .tree-empty p {
      margin: 0;
      font-size: 14px;
    }

    .material-symbols-outlined {
      font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
      user-select: none;
    }
  `]
})
export class TreeComponent implements OnInit, OnChanges {
  @Input() nodes: TreeNode[] = [];
  @Input() selectionMode: TreeSelectionMode = 'single';
  @Input() size: TreeSize = 'medium';
  @Input() variant: TreeVariant = 'default';
  @Input() title = '';
  @Input() badge = '';
  @Input() expandable = true;
  @Input() showLines = false;
  @Input() lineStyle: TreeLineStyle = 'solid';
  @Input() searchable = false;
  @Input() indentSize = 24;
  @Input() rootPadding = '0';
  @Input() emptyText = 'Nenhum item encontrado';
  @Input() expandAll = false;

  // Color customization
  @Input() backgroundColor = '';
  @Input() borderColor = '';
  @Input() headerBackgroundColor = '';
  @Input() titleColor = '';
  @Input() badgeColor = '';
  @Input() labelColor = '';
  @Input() iconColor = '';
  @Input() metaColor = '';
  @Input() selectedNodeBackground = '';

  @Output() nodeClick = new EventEmitter<TreeNodeEvent>();
  @Output() nodeExpand = new EventEmitter<TreeNode>();
  @Output() nodeCollapse = new EventEmitter<TreeNode>();
  @Output() nodeCheck = new EventEmitter<TreeNode>();
  @Output() selectionChange = new EventEmitter<TreeNode[]>();

  searchText = '';
  filteredNodes: TreeNode[] = [];

  ngOnInit() {
    this.filteredNodes = [...this.nodes];

    if (this.expandAll) {
      this.expandAllNodes();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['nodes'] && !this.searchText) {
      this.filteredNodes = [...this.nodes];
    }
  }

  hasChildren(node: TreeNode): boolean {
    return !!(node.children && node.children.length > 0);
  }

  toggleExpand(node: TreeNode, event: MouseEvent) {
    event.stopPropagation();
    node.expanded = !node.expanded;

    if (node.expanded) {
      this.nodeExpand.emit(node);
    } else {
      this.nodeCollapse.emit(node);
    }
  }

  onNodeClick(node: TreeNode, event: MouseEvent) {
    if (node.disabled) return;

    this.nodeClick.emit({ node, event });

    if (this.selectionMode === 'single') {
      this.clearSelection(this.nodes);
      node.selected = true;
      this.selectionChange.emit([node]);
    } else if (this.selectionMode === 'multiple') {
      node.selected = !node.selected;
      this.selectionChange.emit(this.getSelectedNodes());
    }
  }

  onCheckboxChange(node: TreeNode, event: Event) {
    event.stopPropagation();
    const checked = (event.target as HTMLInputElement).checked;

    this.setNodeChecked(node, checked);
    this.updateParentCheckState(node);

    this.nodeCheck.emit(node);
    this.selectionChange.emit(this.getCheckedNodes());
  }

  setNodeChecked(node: TreeNode, checked: boolean) {
    node.checked = checked;
    node.indeterminate = false;

    if (node.children) {
      node.children.forEach(child => this.setNodeChecked(child, checked));
    }
  }

  updateParentCheckState(node: TreeNode) {
    const parent = this.findParent(node, this.nodes);
    if (!parent || !parent.children) return;

    const allChecked = parent.children.every(child => child.checked);
    const someChecked = parent.children.some(child => child.checked || child.indeterminate);

    parent.checked = allChecked;
    parent.indeterminate = !allChecked && someChecked;

    this.updateParentCheckState(parent);
  }

  findParent(targetNode: TreeNode, nodes: TreeNode[], parent: TreeNode | null = null): TreeNode | null {
    for (const node of nodes) {
      if (node.children?.includes(targetNode)) {
        return node;
      }
      if (node.children) {
        const found = this.findParent(targetNode, node.children, node);
        if (found) return found;
      }
    }
    return null;
  }

  clearSelection(nodes: TreeNode[]) {
    nodes.forEach(node => {
      node.selected = false;
      if (node.children) {
        this.clearSelection(node.children);
      }
    });
  }

  getSelectedNodes(): TreeNode[] {
    const selected: TreeNode[] = [];
    const traverse = (nodes: TreeNode[]) => {
      nodes.forEach(node => {
        if (node.selected) selected.push(node);
        if (node.children) traverse(node.children);
      });
    };
    traverse(this.nodes);
    return selected;
  }

  getCheckedNodes(): TreeNode[] {
    const checked: TreeNode[] = [];
    const traverse = (nodes: TreeNode[]) => {
      nodes.forEach(node => {
        if (node.checked) checked.push(node);
        if (node.children) traverse(node.children);
      });
    };
    traverse(this.nodes);
    return checked;
  }

  expandAllNodes() {
    const expand = (nodes: TreeNode[]) => {
      nodes.forEach(node => {
        node.expanded = true;
        if (node.children) expand(node.children);
      });
    };
    expand(this.nodes);
  }

  collapseAllNodes() {
    const collapse = (nodes: TreeNode[]) => {
      nodes.forEach(node => {
        node.expanded = false;
        if (node.children) collapse(node.children);
      });
    };
    collapse(this.nodes);
  }

  onSearch() {
    if (!this.searchText.trim()) {
      this.filteredNodes = this.nodes;
      return;
    }

    const searchLower = this.searchText.toLowerCase();
    this.filteredNodes = this.filterNodes(this.nodes, searchLower);
  }

  filterNodes(nodes: TreeNode[], search: string): TreeNode[] {
    return nodes.filter(node => {
      const matches = node.label.toLowerCase().includes(search);
      const childMatches = node.children ? this.filterNodes(node.children, search) : [];

      if (childMatches.length > 0) {
        return {
          ...node,
          children: childMatches,
          expanded: true
        };
      }

      return matches;
    }).map(node => {
      if (node.children) {
        const filteredChildren = this.filterNodes(node.children, search);
        if (filteredChildren.length > 0) {
          return { ...node, children: filteredChildren, expanded: true };
        }
      }
      return node;
    });
  }

  clearSearch() {
    this.searchText = '';
    this.filteredNodes = this.nodes;
  }

  trackByNode(index: number, node: TreeNode): any {
    return node.id;
  }
}
