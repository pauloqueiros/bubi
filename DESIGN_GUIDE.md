# Guia de Estilo - Projeto Romântico Minimalista

## 🎨 **Identidade Visual**

### **Paleta de Cores**
```css
/* Cores Principais */
--primary-color: #8b4356;      /* Marrom rosado elegante */
--secondary-color: #5a4044;    /* Texto principal */
--accent-color: #6d3442;       /* Hover states */

/* Backgrounds */
--bg-gradient-start: #fef7f7;  /* Rosa muito claro */
--bg-gradient-end: #f8e8eb;    /* Rosa suave */

/* Transparências */
--glass-bg: rgba(255, 255, 255, 0.4);
--glass-border: rgba(255, 255, 255, 0.3);
--glass-hover: rgba(255, 255, 255, 0.5);
```

### **Tipografia**
```css
/* Fontes Principais */
font-family: 'Playfair Display', serif;  /* Para títulos */
font-family: 'Inter', sans-serif;        /* Para textos */

/* Pesos de Fonte */
font-weight: 300;  /* Light - Para textos delicados */
font-weight: 400;  /* Regular - Para texto normal */
font-weight: 500;  /* Medium - Para títulos */

/* Tamanhos Base */
--title-size: 3rem;      /* Mobile: 2.2rem */
--text-size: 1.1rem;     /* Mobile: 1rem */
--caption-size: 0.9rem;
```

### **Espaçamentos**
```css
/* Sistema de Espaçamento (múltiplos de 0.5rem) */
--space-xs: 0.5rem;   /* 8px */
--space-sm: 1rem;     /* 16px */
--space-md: 1.5rem;   /* 24px */
--space-lg: 2rem;     /* 32px */
--space-xl: 3rem;     /* 48px */
```

## 🏗️ **Padrões de Design**

### **Glassmorphism Effect**
```css
.glass-container {
  background: var(--glass-bg);
  backdrop-filter: blur(10px);
  border: 1px solid var(--glass-border);
  border-radius: 20px;
}

.glass-container:hover {
  background: var(--glass-hover);
  transform: translateY(-2px);
  transition: all 0.3s ease;
}
```

### **Botões Circulares**
```css
.circular-button {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: var(--primary-color);
  border: none;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(139, 67, 86, 0.3);
}

.circular-button:hover {
  background: var(--accent-color);
  transform: scale(1.05);
  box-shadow: 0 6px 20px rgba(139, 67, 86, 0.4);
}
```

### **Animações Sutis**
```css
/* Fade In para componentes */
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

.fade-in {
  animation: fadeIn 2s ease-in-out;
}
```

## 📱 **Responsividade**

### **Breakpoints**
```css
/* Mobile First Approach */
@media (max-width: 600px) {
  .title { font-size: 2.2rem; }
  .text { font-size: 1rem; }
  .container { padding: 1rem; }
  .circular-button { 
    width: 50px; 
    height: 50px; 
  }
}
```

## 🎵 **Componentes de Mídia**

### **Player de Áudio**
- Sempre usar controles nativos do HTML5 como fallback
- Botão customizado circular para play/pause
- Símbolos Unicode: ▶ (play), ⏸ (pause), ♪ (nota musical)
- Container com efeito glassmorphism

### **Estrutura do Player**
```typescript
// Estrutura recomendada para players
interface MusicPlayer {
  isPlaying: boolean;
  togglePlay(): void;
  // Sempre incluir elemento audio nativo
  // Sempre incluir botão customizado
  // Sempre incluir caption descritiva
}
```

## 📝 **Padrões de Texto**

### **Hierarquia de Conteúdo**
1. **Título Principal**: Playfair Display, 3rem, peso 500
2. **Mensagem Principal**: Inter, 1.1rem, peso 300
3. **Assinatura**: Inter, peso 400, itálico
4. **Captions**: Inter, 0.9rem, peso 300, itálico

### **Tom de Voz**
- **Romântico mas sutil**: Evitar excessos de emojis
- **Pessoal**: Uso da primeira pessoa
- **Elegante**: Linguagem cuidada e carinhosa
- **Minimalista**: Frases concisas e impactantes

## 🛠️ **Estrutura de Componentes**

### **Organização de Arquivos**
```
src/
├── app/
│   ├── app.ts (componente principal)
│   └── [feature]/
│       └── [feature].ts
├── assets/
│   ├── audio/
│   ├── images/
│   └── .gitkeep
└── styles.css (estilos globais)
```

### **Padrão de Componente Angular**
```typescript
@Component({
  selector: 'app-[nome]',
  imports: [CommonModule], // Sempre incluir se usar *ngIf, *ngFor
  template: `
    <div class="[nome]-container">
      <!-- Conteúdo estruturado -->
    </div>
  `,
  styles: [`
    /* Estilos específicos do componente */
    /* Sempre usar variáveis CSS quando possível */
  `]
})
```

## 🎯 **Diretrizes de UX**

### **Interações**
- **Hover Effects**: Sempre suaves (0.3s ease)
- **Transform**: Usar translateY(-2px) e scale(1.05) para levitar
- **Shadows**: Aumentar sombra no hover para profundidade
- **Loading States**: Fade-in de 2s para conteúdo principal

### **Acessibilidade**
- Sempre incluir fallbacks para elementos de mídia
- Usar contrastes adequados (verificar com ferramentas)
- Tamanhos de toque mínimos (44px)
- Navegação por teclado funcional

## 🔧 **Implementação Técnica**

### **Google Fonts**
```html
<!-- Sempre importar no componente principal -->
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500&family=Inter:wght@300;400&display=swap');
```

### **Estrutura CSS**
```css
/* Ordem recomendada */
1. Imports
2. Variáveis CSS
3. Layout principal
4. Componentes
5. Estados (hover, active)
6. Animações
7. Media queries
```

### **Performance**
- Usar `preload="none"` em elementos de áudio
- Otimizar imagens (WebP quando possível)
- Lazy loading para conteúdo não crítico
- Minimizar reflows com transforms

## 📋 **Checklist de Implementação**

### **Antes de Adicionar Novos Componentes**
- [ ] Segue a paleta de cores definida?
- [ ] Usa as fontes corretas?
- [ ] Tem animações sutis?
- [ ] É responsivo?
- [ ] Mantém o tom romântico e minimalista?
- [ ] Tem fallbacks apropriados?
- [ ] Segue a estrutura de nomenclatura?

### **Antes de Deploy**
- [ ] Testa em mobile
- [ ] Verifica acessibilidade
- [ ] Valida performance
- [ ] Confirma que áudio funciona
- [ ] Testa em diferentes navegadores

---

*Este documento deve ser atualizado sempre que novos padrões forem estabelecidos no projeto.*
