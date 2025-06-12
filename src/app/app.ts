import { Component } from '@angular/core';
import { MusicPlayer } from './music-player/music-player';
import { PhotoCarousel } from './photo-carousel/photo-carousel';
import { LoveCounter } from './love-counter/love-counter';

@Component({
  selector: 'app-root',
  imports: [MusicPlayer, PhotoCarousel, LoveCounter],  template: `
    <div class="container">
      <div class="content">
        <app-music-player></app-music-player>
        
        <h1 class="title">Para Bruna ♡</h1>
        <div class="message">
          <p>Você é a razão do meu sorriso todos os dias.</p>
          <p>Te amo mais do que infinitos e absurdos.</p>
          <p class="signature">— Paulo</p>
        </div>
        
        <app-photo-carousel></app-photo-carousel>
        
        <app-love-counter></app-love-counter>
      </div>
    </div>
  `,  styles: [`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500&family=Inter:wght@300;400&display=swap');
      
    .container {
      min-height: 100vh;
      height: 100vh;
      background: linear-gradient(135deg, #fef7f7 0%, #f8e8eb 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem;
      font-family: 'Inter', sans-serif;
      overflow: hidden;
    }
    
    .content {
      max-width: 450px;
      width: 100%;
      text-align: center;
      animation: fadeIn 2s ease-in-out;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: start;
      gap: 1rem;
    }
    
    .title {
      font-family: 'Playfair Display', serif;
      font-size: 2.5rem;
      font-weight: 500;
      color: #8b4356;
      margin: 0;
      letter-spacing: -0.02em;
    }
    
    .message {
      margin: 0;
    }
    
    .message p {
      font-size: 1rem;
      color: #5a4044;
      margin: 0 0 0.5rem 0;
      font-weight: 300;
    }
    
    .signature {
      font-style: italic;
      margin-top: 1rem !important;
      color: #8b4356 !important;
      font-weight: 400 !important;
    }
    
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    /* Mobile */
    @media (max-width: 600px) {
      .container {
        padding: 0.5rem;
        height: 100vh;
        align-items: center;
      }
      
      .content {
        max-width: 100%;
        gap: 0.8rem;
      }
      
      .title {
        font-size: 2rem;
        margin: 0;
      }
      
      .message p {
        font-size: 0.9rem;
        padding: 0 0.5rem;
        margin: 0 0 0.3rem 0;
      }
      
      .signature {
        margin-top: 0.8rem !important;
      }
    }
  `],
})
export class App {
  protected title = 'bubi2-tmp';
}
