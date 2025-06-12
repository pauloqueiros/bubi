import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-music-player',
  imports: [CommonModule],
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.component.css']
})
export class MusicPlayer implements AfterViewInit {
  @ViewChild('audioPlayer') audioPlayer!: ElementRef<HTMLAudioElement>;
  isPlaying = false;

  ngAfterViewInit() {
    // Aguarda um pouco para garantir que o DOM esteja completamente renderizado
    setTimeout(() => {
      this.initializeAutoplay();
    }, 500);
  }

  private initializeAutoplay() {
    const audio = this.audioPlayer?.nativeElement;
    if (!audio) {
      console.log('❌ Elemento de áudio não encontrado');
      return;
    }

    // Configura o volume
    audio.volume = 0.7;
    
    // Verifica se a música estava tocando antes do reload
    const wasPlayingBeforeReload = localStorage.getItem('musicWasPlaying') === 'true';
    
    // Sempre tenta tocar automaticamente, seja primeira vez ou reload
    if (audio.readyState >= 3) {
      this.attemptAutoplay(wasPlayingBeforeReload);
      return;
    }

    // Estratégia 2: Aguardar o evento canplaythrough
    const onCanPlay = () => {
      this.attemptAutoplay(wasPlayingBeforeReload);
      audio.removeEventListener('canplaythrough', onCanPlay);
    };
    
    audio.addEventListener('canplaythrough', onCanPlay);

    // Estratégia 3: Timeout como fallback
    setTimeout(() => {
      if (!this.isPlaying) {
        this.attemptAutoplay(wasPlayingBeforeReload);
      }
    }, 2000);

    // Adiciona listener para salvar o estado antes da página ser fechada/recarregada
    window.addEventListener('beforeunload', () => {
      localStorage.setItem('musicWasPlaying', this.isPlaying.toString());
    });
  }  private attemptAutoplay(wasPlayingBeforeReload: boolean = false) {
    const audio = this.audioPlayer?.nativeElement;
    if (!audio) return;

    // Remove o mute e configura o volume
    audio.muted = false;
    audio.volume = 0.7;

    audio.play()
      .then(() => {
        this.isPlaying = true;
        if (wasPlayingBeforeReload) {
          console.log('🎵 Música retomada após reload da página');
        } else {
          console.log('🎵 Música iniciada automaticamente');
        }
      })
      .catch((error) => {
        console.log('❌ Autoplay bloqueado pelo navegador:', error);
        // Adiciona um listener para tentar reproduzir na primeira interação do usuário
        this.addUserInteractionListener();
      });
  }  private addUserInteractionListener() {
    const startOnInteraction = () => {
      const audio = this.audioPlayer?.nativeElement;
      if (audio && !this.isPlaying) {
        audio.muted = false;
        audio.volume = 0.7;
        audio.play()
          .then(() => {
            this.isPlaying = true;
            // Salva o estado no localStorage
            localStorage.setItem('musicWasPlaying', 'true');
            console.log('🎵 Música iniciada após interação do usuário');
          })
          .catch((error) => {
            console.log('❌ Ainda não foi possível reproduzir:', error);
          });
      }
      // Remove o listener após a primeira tentativa
      document.removeEventListener('click', startOnInteraction);
      document.removeEventListener('touchstart', startOnInteraction);
    };

    document.addEventListener('click', startOnInteraction, { once: true });
    document.addEventListener('touchstart', startOnInteraction, { once: true });
  }
  togglePlay() {
    const audio = this.audioPlayer?.nativeElement;
    if (audio) {
      if (this.isPlaying) {
        audio.pause();
        this.isPlaying = false;
      } else {
        audio.play();
        this.isPlaying = true;
      }
      
      // Salva o estado atual no localStorage
      localStorage.setItem('musicWasPlaying', this.isPlaying.toString());
    }
  }
}
