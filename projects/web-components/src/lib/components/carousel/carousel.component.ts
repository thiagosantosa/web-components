import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  HostListener,
  AfterViewInit,
  ChangeDetectorRef
} from '@angular/core';
import { CommonModule } from '@angular/common';

export interface CarouselSlide {
  id?: string | number;
  image: string;
  thumbnail?: string;
  title?: string;
  description?: string;
  alt?: string;
  link?: string;
}

export type CarouselEffect =
  | 'slide'
  | 'fade'
  | 'zoom'
  | 'flip'
  | 'cube'
  | 'coverflow';

export type ThumbnailPosition = 'bottom' | 'top' | 'left' | 'right' | 'none';

export interface CarouselBreakpoint {
  breakpoint: number;
  slidesPerView: number;
  spaceBetween: number;
}

@Component({
  selector: 'web-carousel',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="carousel-wrapper"
         [class]="'carousel-effect-' + effect"
         [class.carousel-autoplay]="autoplay"
         [class.carousel-has-thumbnails]="thumbnailPosition !== 'none'">

      <!-- Main Carousel -->
      <div class="carousel-container"
           #carouselContainer
           (mouseenter)="onMouseEnter()"
           (mouseleave)="onMouseLeave()">

        <!-- Slides Track -->
        <div class="carousel-track"
             #trackElement
             [style.transform]="getTrackTransform()"
             [style.transition]="isAnimating ? 'transform ' + speed + 'ms ' + easing : 'none'"
             (transitionend)="onTransitionEnd()"
             (touchstart)="onTouchStart($event)"
             (touchmove)="onTouchMove($event)"
             (touchend)="onTouchEnd($event)"
             (mousedown)="onMouseDown($event)"
             (mousemove)="onMouseMove($event)"
             (mouseup)="onMouseUp($event)"
             (mouseleave)="onDragEnd()">

          <div *ngFor="let slide of getVisibleSlides(); let i = index; trackBy: trackBySlide"
               class="carousel-slide"
               [class.slide-active]="isActiveSlide(slide)"
               [class.slide-prev]="isPrevSlide(slide)"
               [class.slide-next]="isNextSlide(slide)"
               [style.width]="getSlideWidth()"
               [style.margin-right.px]="spaceBetween">

            <!-- Image -->
            <div class="slide-image-wrapper" (click)="onSlideClick(slide, i)">
              <img
                *ngIf="shouldLoadImage(slide)"
                [src]="slide.image"
                [alt]="slide.alt || slide.title || 'Carousel slide'"
                class="slide-image"
                [class.image-zoom]="effect === 'zoom'"
                (load)="onImageLoad(slide)"
                (error)="onImageError(slide)">

              <!-- Loading placeholder -->
              <div *ngIf="!shouldLoadImage(slide)" class="slide-loading">
                <div class="loading-spinner"></div>
              </div>

              <!-- Overlay -->
              <div *ngIf="showOverlay && (slide.title || slide.description)"
                   class="slide-overlay"
                   [style.background]="overlayColor">
                <div class="slide-caption">
                  <h3 *ngIf="slide.title" class="slide-title">{{ slide.title }}</h3>
                  <p *ngIf="slide.description" class="slide-description">{{ slide.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Navigation Arrows -->
        <button *ngIf="showArrows && slides.length > 1"
                class="carousel-arrow carousel-arrow-prev"
                [disabled]="!loop && currentIndex === 0"
                (click)="prev()"
                [attr.aria-label]="'Previous slide'">
          <span class="material-symbols-outlined">chevron_left</span>
        </button>

        <button *ngIf="showArrows && slides.length > 1"
                class="carousel-arrow carousel-arrow-next"
                [disabled]="!loop && currentIndex === slides.length - 1"
                (click)="next()"
                [attr.aria-label]="'Next slide'">
          <span class="material-symbols-outlined">chevron_right</span>
        </button>

        <!-- Pagination Dots -->
        <div *ngIf="showDots && slides.length > 1" class="carousel-dots">
          <button *ngFor="let slide of slides; let i = index"
                  class="dot"
                  [class.dot-active]="i === currentIndex"
                  (click)="goToSlide(i)"
                  [attr.aria-label]="'Go to slide ' + (i + 1)">
          </button>
        </div>

        <!-- Counter -->
        <div *ngIf="showCounter && slides.length > 1" class="carousel-counter">
          {{ currentIndex + 1 }} / {{ slides.length }}
        </div>

        <!-- Autoplay Progress -->
        <div *ngIf="autoplay && showProgress" class="carousel-progress">
          <div class="progress-bar"
               [style.transform]="'scaleX(' + (autoplayProgress / 100) + ')'">
          </div>
        </div>
      </div>

      <!-- Thumbnails -->
      <div *ngIf="thumbnailPosition !== 'none' && slides.length > 1"
           class="carousel-thumbnails"
           [class]="'thumbnails-' + thumbnailPosition"
           #thumbnailsContainer>
        <div class="thumbnails-track" #thumbnailsTrack>
          <div *ngFor="let slide of slides; let i = index"
               class="thumbnail"
               [class.thumbnail-active]="i === currentIndex"
               (click)="goToSlide(i)">
            <img [src]="slide.thumbnail || slide.image"
                 [alt]="slide.alt || 'Thumbnail ' + (i + 1)"
                 class="thumbnail-image">
            <div class="thumbnail-overlay"></div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .carousel-wrapper {
      font-family: "Montserrat", sans-serif;
      width: 100%;
      position: relative;
    }

    /* Container */
    .carousel-container {
      position: relative;
      overflow: hidden;
      border-radius: 0.75rem;
      background: #f9fafb;
    }

    /* Container ocupa todo espaço com thumbnails verticais */
    .carousel-wrapper:has(.thumbnails-left) .carousel-container,
    .carousel-wrapper:has(.thumbnails-right) .carousel-container {
      flex: 1;
      min-width: 0;
    }

    /* Track */
    .carousel-track {
      display: flex;
      will-change: transform;
      user-select: none;
      cursor: grab;
    }

    .carousel-track:active {
      cursor: grabbing;
    }

    /* Slide */
    .carousel-slide {
      flex-shrink: 0;
      position: relative;
      overflow: hidden;
    }

    .slide-image-wrapper {
      position: relative;
      width: 100%;
      height: 0;
      padding-bottom: 56.25%; /* 16:9 aspect ratio */
      overflow: hidden;
      background: #e5e7eb;
      cursor: pointer;
    }

    .slide-image {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    .slide-image-wrapper:hover .slide-image {
      transform: scale(1.05);
    }

    /* Loading */
    .slide-loading {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #f3f4f6;
    }

    .loading-spinner {
      width: 40px;
      height: 40px;
      border: 4px solid #e5e7eb;
      border-top-color: #009ADA;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    /* Overlay */
    .slide-overlay {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 2rem;
      background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
      color: white;
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .slide-image-wrapper:hover .slide-overlay {
      opacity: 1;
    }

    .slide-caption {
      max-width: 600px;
    }

    .slide-title {
      font-size: 1.5rem;
      font-weight: 700;
      margin: 0 0 0.5rem 0;
    }

    .slide-description {
      font-size: 0.9375rem;
      margin: 0;
      opacity: 0.9;
    }

    /* Navigation Arrows */
    .carousel-arrow {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      z-index: 10;
      width: 48px;
      height: 48px;
      border: none;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.9);
      color: #1f2937;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    }

    .carousel-arrow:hover {
      background: white;
      transform: translateY(-50%) scale(1.1);
    }

    .carousel-arrow:disabled {
      opacity: 0.3;
      cursor: not-allowed;
    }

    .carousel-arrow-prev {
      left: 1rem;
    }

    .carousel-arrow-next {
      right: 1rem;
    }

    .carousel-arrow .material-symbols-outlined {
      font-size: 2rem;
    }

    /* Dots */
    .carousel-dots {
      position: absolute;
      bottom: 1rem;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      gap: 0.5rem;
      z-index: 10;
    }

    .dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      border: 2px solid white;
      background: rgba(255, 255, 255, 0.5);
      cursor: pointer;
      transition: all 0.3s ease;
      padding: 0;
    }

    .dot:hover {
      background: rgba(255, 255, 255, 0.8);
      transform: scale(1.2);
    }

    .dot-active {
      background: white;
      width: 24px;
      border-radius: 5px;
    }

    /* Counter */
    .carousel-counter {
      position: absolute;
      top: 1rem;
      right: 1rem;
      background: rgba(0, 0, 0, 0.7);
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 0.375rem;
      font-weight: 600;
      font-size: 0.875rem;
      z-index: 10;
    }

    /* Progress */
    .carousel-progress {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: rgba(255, 255, 255, 0.3);
      z-index: 10;
      overflow: hidden;
    }

    .progress-bar {
      height: 100%;
      width: 100%;
      background: #009ADA;
      transform-origin: left;
      will-change: transform;
    }

    /* Thumbnails */
    .carousel-thumbnails {
      margin-top: 1rem;
      overflow: hidden;
    }

    /* Thumbnails Verticais (Left/Right) */
    .carousel-wrapper:has(.thumbnails-left),
    .carousel-wrapper:has(.thumbnails-right) {
      display: flex;
      gap: 1rem;
    }

    .carousel-wrapper:has(.thumbnails-left) {
      flex-direction: row-reverse;
    }

    .carousel-wrapper:has(.thumbnails-right) {
      flex-direction: row;
    }

    .thumbnails-left,
    .thumbnails-right {
      margin-top: 0;
      max-width: 150px;
      flex-shrink: 0;
    }

    .thumbnails-left .thumbnails-track,
    .thumbnails-right .thumbnails-track {
      flex-direction: column;
      overflow-y: auto;
      overflow-x: hidden;
      max-height: 500px;
    }

    .thumbnails-left .thumbnails-track::-webkit-scrollbar,
    .thumbnails-right .thumbnails-track::-webkit-scrollbar {
      width: 4px;
      height: auto;
    }

    .thumbnails-left .thumbnail,
    .thumbnails-right .thumbnail {
      width: 100%;
      height: 100px;
    }

    /* Thumbnails Top */
    .thumbnails-top {
      order: -1;
      margin-top: 0;
      margin-bottom: 1rem;
    }

    .thumbnails-track {
      display: flex;
      gap: 0.5rem;
      overflow-x: auto;
      scroll-behavior: smooth;
      padding: 0.25rem;
    }

    .thumbnails-track::-webkit-scrollbar {
      height: 4px;
    }

    .thumbnails-track::-webkit-scrollbar-track {
      background: #f1f1f1;
    }

    .thumbnails-track::-webkit-scrollbar-thumb {
      background: #009ADA;
      border-radius: 2px;
    }

    .thumbnail {
      flex-shrink: 0;
      width: 100px;
      height: 60px;
      border-radius: 0.375rem;
      overflow: hidden;
      cursor: pointer;
      position: relative;
      border: 3px solid transparent;
      transition: all 0.2s ease;
    }

    .thumbnail:hover {
      transform: translateY(-4px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    .thumbnail-active {
      border-color: #009ADA;
    }

    .thumbnail-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .thumbnail-overlay {
      position: absolute;
      inset: 0;
      background: rgba(0, 0, 0, 0.3);
      transition: opacity 0.2s;
    }

    .thumbnail:hover .thumbnail-overlay,
    .thumbnail-active .thumbnail-overlay {
      opacity: 0;
    }

    /* Effects */
    .carousel-effect-fade .carousel-slide {
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0;
      transition: opacity 0.5s ease;
    }

    .carousel-effect-fade .slide-active {
      opacity: 1;
      z-index: 1;
    }

    .carousel-effect-zoom .image-zoom {
      transform: scale(1.2);
    }

    .carousel-effect-zoom .slide-active .image-zoom {
      transform: scale(1);
    }

    /* Responsive */
    @media (max-width: 768px) {
      .carousel-arrow {
        width: 36px;
        height: 36px;
      }

      .carousel-arrow .material-symbols-outlined {
        font-size: 1.5rem;
      }

      .slide-overlay {
        padding: 1rem;
      }

      .slide-title {
        font-size: 1.125rem;
      }

      .slide-description {
        font-size: 0.875rem;
      }

      .thumbnail {
        width: 80px;
        height: 48px;
      }

      /* Mobile: Thumbnails verticais viram horizontais */
      .carousel-wrapper:has(.thumbnails-left),
      .carousel-wrapper:has(.thumbnails-right) {
        flex-direction: column;
      }

      .thumbnails-left,
      .thumbnails-right {
        max-width: 100%;
        margin-top: 1rem;
      }

      .thumbnails-left .thumbnails-track,
      .thumbnails-right .thumbnails-track {
        flex-direction: row;
        overflow-x: auto;
        overflow-y: hidden;
        max-height: none;
      }

      .thumbnails-left .thumbnail,
      .thumbnails-right .thumbnail {
        width: 80px;
        height: 48px;
      }
    }
  `]
})
export class CarouselComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('carouselContainer') containerElement!: ElementRef;
  @ViewChild('trackElement') trackElement!: ElementRef;
  @ViewChild('thumbnailsContainer') thumbnailsContainer?: ElementRef;
  @ViewChild('thumbnailsTrack') thumbnailsTrack?: ElementRef;

  @Input() slides: CarouselSlide[] = [];
  @Input() effect: CarouselEffect = 'slide';
  @Input() slidesPerView = 1;
  @Input() spaceBetween = 16;
  @Input() loop = true;
  @Input() autoplay = false;
  @Input() autoplayDelay = 3000;
  @Input() speed = 500;
  @Input() easing = 'ease-out';
  @Input() showArrows = true;
  @Input() showDots = true;
  @Input() showCounter = false;
  @Input() showProgress = true;
  @Input() showOverlay = true;
  @Input() overlayColor = 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)';
  @Input() thumbnailPosition: ThumbnailPosition = 'bottom';
  @Input() lazyLoad = true;
  @Input() initialSlide = 0;
  @Input() breakpoints: CarouselBreakpoint[] = [];
  @Input() draggable = true;
  @Input() keyboard = true;

  @Output() slideChange = new EventEmitter<number>();
  @Output() slideClick = new EventEmitter<{ slide: CarouselSlide; index: number }>();
  @Output() reachBeginning = new EventEmitter<void>();
  @Output() reachEnd = new EventEmitter<void>();

  currentIndex = 0;
  isAnimating = false;
  autoplayProgress = 0;
  loadedImages = new Set<string>();

  private autoplayTimer?: number;
  private progressTimer?: number;
  private isDragging = false;
  private startX = 0;
  private currentX = 0;
  private translateX = 0;
  private resizeObserver?: ResizeObserver;
  private intersectionObserver?: IntersectionObserver;
  private isVisible = true;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.currentIndex = this.initialSlide;
    this.applyBreakpoints();

    if (this.autoplay) {
      this.startAutoplay();
    }
  }

  ngAfterViewInit() {
    this.setupResizeObserver();
    this.setupIntersectionObserver();
    this.preloadNearbyImages();
  }

  ngOnDestroy() {
    this.stopAutoplay();
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
  }

  private setupResizeObserver() {
    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(() => {
        this.applyBreakpoints();
      });
      this.resizeObserver.observe(this.containerElement.nativeElement);
    }
  }

  private setupIntersectionObserver() {
    if (typeof IntersectionObserver !== 'undefined' && this.autoplay) {
      this.intersectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            this.isVisible = entry.isIntersecting;

            if (this.autoplay) {
              if (entry.isIntersecting) {
                this.startAutoplay();
              } else {
                this.stopAutoplay();
              }
            }
          });
        },
        { threshold: 0.5 } // Trigger when 50% visible
      );

      this.intersectionObserver.observe(this.containerElement.nativeElement);
    }
  }

  private applyBreakpoints() {
    if (this.breakpoints.length === 0) return;

    const width = window.innerWidth;
    const matchedBreakpoint = this.breakpoints
      .sort((a, b) => b.breakpoint - a.breakpoint)
      .find(bp => width >= bp.breakpoint);

    if (matchedBreakpoint) {
      this.slidesPerView = matchedBreakpoint.slidesPerView;
      this.spaceBetween = matchedBreakpoint.spaceBetween;
    }
  }

  getTrackTransform(): string {
    if (this.effect === 'fade') return 'none';

    const slideWidth = 100 / this.slidesPerView;
    const offset = -this.currentIndex * slideWidth;
    return `translateX(${offset}%)`;
  }

  getSlideWidth(): string {
    return `calc(${100 / this.slidesPerView}% - ${this.spaceBetween * (this.slidesPerView - 1) / this.slidesPerView}px)`;
  }

  getVisibleSlides(): CarouselSlide[] {
    return this.slides;
  }

  isActiveSlide(slide: CarouselSlide): boolean {
    return this.slides[this.currentIndex] === slide;
  }

  isPrevSlide(slide: CarouselSlide): boolean {
    const prevIndex = this.currentIndex === 0 ? this.slides.length - 1 : this.currentIndex - 1;
    return this.slides[prevIndex] === slide;
  }

  isNextSlide(slide: CarouselSlide): boolean {
    const nextIndex = this.currentIndex === this.slides.length - 1 ? 0 : this.currentIndex + 1;
    return this.slides[nextIndex] === slide;
  }

  shouldLoadImage(slide: CarouselSlide): boolean {
    if (!this.lazyLoad) return true;

    const slideIndex = this.slides.indexOf(slide);
    const distance = Math.abs(slideIndex - this.currentIndex);
    return distance <= 1 || this.loadedImages.has(slide.image);
  }

  onImageLoad(slide: CarouselSlide) {
    this.loadedImages.add(slide.image);
  }

  onImageError(slide: CarouselSlide) {
    console.error('Failed to load image:', slide.image);
  }

  private preloadNearbyImages() {
    const indices = [
      this.currentIndex,
      this.currentIndex - 1,
      this.currentIndex + 1
    ].filter(i => i >= 0 && i < this.slides.length);

    indices.forEach(i => {
      this.loadedImages.add(this.slides[i].image);
    });
  }

  next() {
    if (!this.loop && this.currentIndex >= this.slides.length - 1) {
      this.reachEnd.emit();
      return;
    }

    this.goToSlide((this.currentIndex + 1) % this.slides.length);
  }

  prev() {
    if (!this.loop && this.currentIndex <= 0) {
      this.reachBeginning.emit();
      return;
    }

    const newIndex = this.currentIndex === 0 ? this.slides.length - 1 : this.currentIndex - 1;
    this.goToSlide(newIndex);
  }

  goToSlide(index: number) {
    if (index === this.currentIndex || this.isAnimating) return;

    this.isAnimating = true;
    this.currentIndex = index;
    this.slideChange.emit(this.currentIndex);
    this.preloadNearbyImages();
    this.scrollThumbnailIntoView();

    if (this.autoplay) {
      this.resetAutoplay();
    }
  }

  onTransitionEnd() {
    this.isAnimating = false;
  }

  onSlideClick(slide: CarouselSlide, index: number) {
    this.slideClick.emit({ slide, index });
  }

  // Touch & Drag
  onTouchStart(event: TouchEvent) {
    if (!this.draggable) return;
    this.startDrag(event.touches[0].clientX);
  }

  onTouchMove(event: TouchEvent) {
    if (!this.draggable || !this.isDragging) return;
    this.updateDrag(event.touches[0].clientX);
  }

  onTouchEnd(event: TouchEvent) {
    if (!this.draggable) return;
    this.endDrag();
  }

  onMouseDown(event: MouseEvent) {
    if (!this.draggable) return;
    this.startDrag(event.clientX);
  }

  onMouseMove(event: MouseEvent) {
    if (!this.draggable || !this.isDragging) return;
    this.updateDrag(event.clientX);
  }

  onMouseUp(event: MouseEvent) {
    if (!this.draggable) return;
    this.endDrag();
  }

  private startDrag(x: number) {
    this.isDragging = true;
    this.startX = x;
    this.currentX = x;
  }

  private updateDrag(x: number) {
    this.currentX = x;
  }

  private endDrag() {
    if (!this.isDragging) return;

    const diff = this.currentX - this.startX;
    const threshold = 50;

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        this.prev();
      } else {
        this.next();
      }
    }

    this.isDragging = false;
  }

  onDragEnd() {
    this.isDragging = false;
  }

  // Autoplay
  private startAutoplay() {
    if (!this.isVisible) return; // Don't start if not visible

    this.stopAutoplay();
    this.autoplayProgress = 0;

    this.autoplayTimer = window.setTimeout(() => {
      this.next();
    }, this.autoplayDelay);

    this.animateProgress();
  }

  private stopAutoplay() {
    if (this.autoplayTimer) {
      clearTimeout(this.autoplayTimer);
      this.autoplayTimer = undefined;
    }
    if (this.progressTimer) {
      cancelAnimationFrame(this.progressTimer);
      this.progressTimer = undefined;
    }
    this.autoplayProgress = 0;
  }

  private resetAutoplay() {
    if (this.autoplay) {
      this.startAutoplay();
    }
  }

  private animateProgress() {
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      this.autoplayProgress = Math.min((elapsed / this.autoplayDelay) * 100, 100);

      if (elapsed < this.autoplayDelay) {
        this.progressTimer = requestAnimationFrame(animate);
      }

      // Use markForCheck instead of detectChanges to avoid scroll issues
      this.cdr.markForCheck();
    };

    animate();
  }

  onMouseEnter() {
    if (this.autoplay) {
      this.stopAutoplay();
    }
  }

  onMouseLeave() {
    if (this.autoplay) {
      this.startAutoplay();
    }
  }

  // Thumbnails
  private scrollThumbnailIntoView() {
    if (!this.thumbnailsTrack) return;

    const track = this.thumbnailsTrack.nativeElement;
    const thumbnails = track.children;
    const activeThumbnail = thumbnails[this.currentIndex] as HTMLElement;

    if (activeThumbnail) {
      activeThumbnail.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }

  // Keyboard
  @HostListener('document:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (!this.keyboard) return;

    switch(event.key) {
      case 'ArrowLeft':
        this.prev();
        break;
      case 'ArrowRight':
        this.next();
        break;
    }
  }

  trackBySlide(index: number, slide: CarouselSlide): any {
    return slide.id || index;
  }
}
