# Documentação Técnica - Projeto bubi2

## 📖 **Visão Geral**

Este projeto é uma aplicação Angular minimalista criada para exibir uma mensagem romântica de Dia dos Namorados, com foco em design elegante e experiência suave.

## 🏗️ **Arquitetura**

### **Stack Tecnológica**
- **Framework**: Angular 20.0.0 (Standalone Components)
- **Language**: TypeScript
- **Styling**: CSS modular com imports de Google Fonts
- **Build Tool**: Angular CLI
- **Package Manager**: npm

### **Estrutura do Projeto**
```
bubi2/
├── src/
│   ├── app/
│   │   ├── app.ts              # Componente principal
│   │   ├── app.config.ts       # Configuração da app
│   │   ├── app.routes.ts       # Rotas (vazio para SPA simples)
│   │   └── music-player/
│   │       └── music-player.ts # Componente do player de áudio
│   ├── assets/                 # Arquivos de mídia
│   ├── index.html             # HTML principal
│   ├── main.ts                # Bootstrap da aplicação
│   └── styles.css             # Estilos globais
├── public/
│   └── favicon.ico
├── .github/
│   └── copilot-instructions.md # Instruções para o Copilot
├── angular.json               # Configuração do Angular CLI
├── package.json               # Dependências e scripts
└── tsconfig.json              # Configuração TypeScript
```

## 🧩 **Componentes**

### **App Component** (`src/app/app.ts`)
**Responsabilidade**: Componente raiz que renderiza a página principal

**Features**:
- Layout responsivo com flexbox
- Gradiente de fundo personalizado
- Animação de fade-in
- Typography hierarchy com Google Fonts
- Integração com MusicPlayer component

**Dependências**:
- `MusicPlayer` component

### **MusicPlayer Component** (`src/app/music-player/music-player.ts`)
**Responsabilidade**: Interface para reprodução de áudio

**Features**:
- Player HTML5 nativo como fallback
- Botão customizado de play/pause
- Efeito glassmorphism
- Estados visuais para playing/paused
- Design circular minimalista

**Métodos**:
```typescript
togglePlay(): void // Alterna entre play/pause
```

**Estados**:
```typescript
isPlaying: boolean // Controla o estado visual do botão
```

## 🎨 **Sistema de Design**

### **Design Tokens**
```typescript
// Cores
const colors = {
  primary: '#8b4356',      // Marrom rosado
  secondary: '#5a4044',    // Texto
  accent: '#6d3442',       // Hover
  bgStart: '#fef7f7',      // Gradiente início
  bgEnd: '#f8e8eb'         // Gradiente fim
};

// Tipografia
const typography = {
  titleFont: 'Playfair Display, serif',
  bodyFont: 'Inter, sans-serif',
  titleSize: '3rem',       // 2.2rem mobile
  bodySize: '1.1rem',      // 1rem mobile
  captionSize: '0.9rem'
};

// Espaçamento
const spacing = {
  xs: '0.5rem',
  sm: '1rem', 
  md: '1.5rem',
  lg: '2rem',
  xl: '3rem'
};
```

### **Padrões de Animação**
```css
/* Transições padrão */
transition: all 0.3s ease;

/* Fade-in principal */
animation: fadeIn 2s ease-in-out;

/* Hover effects */
transform: translateY(-2px) | scale(1.05);
```

## 📱 **Responsividade**

### **Breakpoints**
- **Desktop**: > 600px (padrão)
- **Mobile**: ≤ 600px

### **Adaptações Mobile**
- Título: 3rem → 2.2rem
- Texto: 1.1rem → 1rem  
- Padding: 2rem → 1rem
- Botões: 60px → 50px

## 🔧 **Scripts Disponíveis**

```json
{
  "start": "ng serve",           // Dev server
  "build": "ng build",           // Build produção
  "watch": "ng build --watch",   // Build com watch
  "test": "ng test"              // Testes unitários
}
```

## 🚀 **Deploy e Build**

### **Desenvolvimento**
```bash
npm install
npm start
# Acessa http://localhost:4200
```

### **Produção**
```bash
npm run build
# Gera arquivos em dist/
```

### **Configurações de Build**
- Output: `dist/bubi2/`
- Assets: Copiados automaticamente de `src/assets/` e `public/`
- Optimization: Habilitada para produção
- Source maps: Habilitados para desenvolvimento

## 🎵 **Assets de Mídia**

### **Áudio**
- Localização: `src/assets/romantic-song.mp3`
- Formato suportado: MP3
- Carregamento: `preload="none"` para performance
- Fallback: Mensagem de erro para browsers incompatíveis

### **Favicon**
- Localização: `public/favicon.ico`
- Formato: ICO
- Tamanho: 16x16, 32x32 padrão

## 🧪 **Testing Strategy**

### **Componentes**
- Testes unitários com Jasmine/Karma
- Testar renderização de templates
- Testar interações de usuário (click, play/pause)
- Testar responsividade

### **E2E Testing**
- Verificar carregamento da página
- Testar funcionamento do player
- Validar responsividade em diferentes dispositivos

## 🔍 **Debugging**

### **Common Issues**
1. **Áudio não carrega**:
   - Verificar se arquivo existe em `src/assets/`
   - Confirmar formato MP3
   - Testar HTTPS (alguns browsers exigem)

2. **Fontes não carregam**:
   - Verificar conexão com Google Fonts
   - Fallback para fontes do sistema

3. **Animações lentas**:
   - Verificar GPU acceleration
   - Reduzir complexidade de backdrop-filter

### **Debug Tools**
```typescript
// Para debug do player
console.log('Audio element:', document.querySelector('audio'));
console.log('Is playing:', this.isPlaying);
```

## 📈 **Performance**

### **Métricas Alvo**
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.1

### **Otimizações Implementadas**
- Lazy loading de fontes
- `preload="none"` em áudio
- CSS modular por componente
- Animações com transform (GPU accelerated)

## 🔄 **Futuras Melhorias**

### **Funcionalidades**
- [ ] Playlist de múltiplas músicas
- [ ] Controle de volume
- [ ] Progress bar customizada
- [ ] Modo dark/light
- [ ] Compartilhamento social

### **Técnicas**
- [ ] Service Worker para cache
- [ ] PWA capabilities
- [ ] Testes automatizados
- [ ] CI/CD pipeline
- [ ] Performance monitoring

## 📚 **Referências**

- [Angular Documentation](https://angular.dev/)
- [Google Fonts](https://fonts.google.com/)
- [CSS Glassmorphism](https://css.glass/)
- [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)

---

*Última atualização: Junho 2025*
