import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-photo-carousel',
  imports: [CommonModule],
  templateUrl: './photo-carousel.component.html',
  styleUrls: ['./photo-carousel.component.css']
})
export class PhotoCarousel implements OnDestroy {
  photos: string[] = [];
  currentIndex: number = 0;
  private autoAdvanceTimer: any;
  private readonly autoAdvanceInterval = 3000; // 3 segundos
  private isPaused = false;

  constructor() {
    this.loadAvailablePhotos();
  }

  getCurrentPhoto(): string {
    return this.photos[this.currentIndex] || '';
  }

  nextPhoto(): void {
    if (this.photos.length > 0) {
      this.currentIndex = (this.currentIndex + 1) % this.photos.length;
    }
    this.resetAutoAdvanceTimer(); // Reinicia o timer quando usuário navega manualmente
  }

  previousPhoto(): void {
    if (this.photos.length > 0) {
      this.currentIndex = this.currentIndex === 0 
        ? this.photos.length - 1 
        : this.currentIndex - 1;
    }
    this.resetAutoAdvanceTimer(); // Reinicia o timer quando usuário navega manualmente
  }

  goToPhoto(index: number): void {
    this.currentIndex = index;
    this.resetAutoAdvanceTimer(); // Reinicia o timer quando usuário navega manualmente
  }

  onImageError(): void {
    // Remove foto que falhou ao carregar da lista atual
    if (this.photos.length > 0) {
      console.log(`Erro ao carregar: ${this.photos[this.currentIndex]}`);
      this.photos.splice(this.currentIndex, 1);
      
      // Ajusta o índice se passou do limite
      if (this.currentIndex >= this.photos.length && this.photos.length > 0) {
        this.currentIndex = 0;
      }
    }
  }

  private loadAvailablePhotos(): void {
    // Lista exata das fotos que existem no projeto (elimina 404s desnecessários)
    const knownPhotos = [
      'assets/photos/photo1.jpg',
      'assets/photos/photo2.jpg', 
      'assets/photos/photo3.jpg',
      'assets/photos/photo4.jpg',
      'assets/photos/photo5.jpg',
      'assets/photos/photo6.jpg',
      'assets/photos/photo7.jpg',
      'assets/photos/photo8.jpg',
      'assets/photos/photo9.jpg',
      'assets/photos/photo10.jpg'
    ];
    
    // Primeiro vamos testar se as fotos conhecidas carregam corretamente
    console.log('🔍 Testando carregamento das fotos conhecidas...');
    
    // Para descobrir novas fotos adicionadas, testa algumas extensões extras (limitado)
    const additionalChecks = [
      'assets/photos/photo8.jpg',
      'assets/photos/photo9.jpg',
      'assets/photos/photo10.jpg',
      'assets/photos/image2.png',
      'assets/photos/image3.png'
    ];
    
    // Combina fotos conhecidas com checagem limitada para novas (reduz 404s de ~21 para ~5)
    const allPhotosToCheck = [...knownPhotos, ...additionalChecks];
    
    // Valida as fotos
    this.validateAndLoadPhotos(allPhotosToCheck);
  }

  refreshPhotos(): void {
    this.photos = [];
    this.currentIndex = 0;
    this.stopAutoAdvance();
    this.loadAvailablePhotos();
  }

  // Métodos para controle do timer automático
  private startAutoAdvance(): void {
    if (this.photos.length > 1 && !this.isPaused) {
      this.autoAdvanceTimer = setInterval(() => {
        this.autoNextPhoto();
      }, this.autoAdvanceInterval);
    }
  }

  private stopAutoAdvance(): void {
    if (this.autoAdvanceTimer) {
      clearInterval(this.autoAdvanceTimer);
      this.autoAdvanceTimer = null;
    }
  }

  private resetAutoAdvanceTimer(): void {
    this.stopAutoAdvance();
    this.startAutoAdvance();
  }

  private autoNextPhoto(): void {
    if (this.photos.length > 1) {
      this.currentIndex = (this.currentIndex + 1) % this.photos.length;
    }
  }

  // Métodos para pausar/continuar (útil para hover)
  pauseAutoAdvance(): void {
    this.isPaused = true;
    this.stopAutoAdvance();
  }

  resumeAutoAdvance(): void {
    this.isPaused = false;
    this.startAutoAdvance();
  }

  ngOnDestroy(): void {
    this.stopAutoAdvance();
  }

  private validateAndLoadPhotos(potentialPhotos: string[]): void {
    const validPhotos: string[] = [];
    let loadedCount = 0;
    const totalToCheck = potentialPhotos.length;
    
    console.log(`🔍 Verificando ${totalToCheck} fotos...`);
    
    if (totalToCheck === 0) {
      this.photos = [];
      return;
    }
    
    potentialPhotos.forEach(photoPath => {
      const img = new Image();
      
      img.onload = () => {
        console.log(`✅ Foto carregada: ${photoPath}`);
        validPhotos.push(photoPath);
        loadedCount++;
        this.checkIfAllLoaded(validPhotos, loadedCount, totalToCheck);
      };
      
      img.onerror = () => {
        console.log(`❌ Erro ao carregar: ${photoPath}`);
        // Silenciosamente ignora fotos que não existem
        loadedCount++;
        this.checkIfAllLoaded(validPhotos, loadedCount, totalToCheck);
      };
      
      console.log(`🔄 Testando: ${photoPath}`);
      img.src = photoPath;
    });
  }
  
  private checkIfAllLoaded(validPhotos: string[], loadedCount: number, totalToCheck: number): void {
    if (loadedCount === totalToCheck) {
      // Remove duplicatas e ordena alfabeticamente
      this.photos = [...new Set(validPhotos)].sort((a, b) => a.localeCompare(b));
      if (this.photos.length > 0 && this.currentIndex >= this.photos.length) {
        this.currentIndex = 0;
      }
      
      // Log apenas as fotos encontradas
      if (this.photos.length > 0) {
        console.log(`📷 Fotos carregadas: ${this.photos.length}`, this.photos.map(p => p.split('/').pop()));
        // Inicia o timer automático quando as fotos estiverem carregadas
        this.startAutoAdvance();
      }
    }
  }
}
