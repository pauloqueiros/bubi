# Como personalizar o contador de amor

## 📅 **Alterando a data de início**

Para personalizar a data de início do relacionamento, edite o arquivo:
`src/app/love-counter/love-counter.ts`

Procure por esta linha:
```typescript
private readonly startDate = new Date('2024-02-14T00:00:00'); // 14 de fevereiro de 2024
```

## 🔧 **Formato da data**
Use o formato ISO: `YYYY-MM-DDTHH:MM:SS`

### **Exemplos:**
- `'2023-01-15T20:30:00'` - 15 de janeiro de 2023 às 20:30
- `'2022-12-25T00:00:00'` - 25 de dezembro de 2022 à meia-noite
- `'2024-06-10T14:45:00'` - 10 de junho de 2024 às 14:45

## ✨ **Funcionalidades do contador:**
- ⏱️ **Atualização em tempo real** (a cada segundo)
- 📊 **Unidades múltiplas**: anos, dias, horas, minutos, segundos
- 📱 **Responsivo**: adapta-se a mobile e desktop
- 🎨 **Design elegante**: glassmorphism com animação de coração
- 💕 **Interativo**: hover effects nos números

## 🎭 **Animações incluídas:**
- Heartbeat no emoji de coração (💕)
- Hover effect nos cartões de tempo
- Scale effect ao passar o mouse nos números
