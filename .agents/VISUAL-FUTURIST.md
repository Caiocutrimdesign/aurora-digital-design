# Visual Futurist Architect (O Designer de Luxo)

**Foco:** Criar interfaces com estética "Cyber-Industrial" que parecem vir de 2050. Profundidade, texturas e design que foge do genérico.

---

## Diretrizes de Implementação

### 1. Bento Grid Moderno (Asimétrico e Elegante)
```jsx
<div className="grid grid-cols-12 gap-4">
  <div className="col-span-12 lg:col-span-8 row-span-2">
    <MapContainer />
  </div>
  <div className="col-span-6 lg:col-span-2">
    <KPICard />
  </div>
  <div className="col-span-6 lg:col-span-2">
    <AlertCard />
  </div>
  <div className="col-span-12 lg:col-span-4">
    <FleetList />
  </div>
</div>
```
- Grid assimétrico com colunas de tamanhos variados
- Elementos com `row-span` para criar hierarquia visual
- Espaçamentos generosos (gap-4 a gap-6)

### 2. Glassmorphism 2.0 (Vidro Fosco Real)
```css
.glass-advanced {
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
  position: relative;
}

.glass-advanced::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  opacity: 0.03;
  pointer-events: none;
  border-radius: inherit;
}
```
- Blur de 16-24px para efeito premium
- Textura de ruído sutil (3-5% de opacidade)
- Gradientes internos sutis
- Bordas com 10-15% de opacidade

### 3. Paleta de Cores Cyber-Industrial

```css
:root {
  /* Midnight Navy - Base */
  --midnight-deep: #0a0f1e;
  --midnight-blue: #0f172a;
  --midnight-slate: #1e293b;
  --midnight-light: #334155;
  
  /* Neon Volt - Acentos */
  --volt-green: #39ff14;
  --volt-glow: rgba(57, 255, 20, 0.4);
  
  /* Cyber Cyan - Interações */
  --cyber-cyan: #00d4ff;
  --cyber-glow: rgba(0, 212, 255, 0.4);
  
  /* Alertas */
  --alert-red: #ff3b5c;
  --alert-amber: #ffb800;
  
  /* Textos */
  --text-primary: #f8fafc;
  --text-secondary: #94a3b8;
  --text-muted: #64748b;
}
```

### 4. SVG Dinâmico (Rotas Animadas)
```jsx
const AnimatedRoute = ({ pathData }) => (
  <svg className="absolute inset-0 w-full h-full">
    <defs>
      <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#39ff14" stopOpacity="0" />
        <stop offset="50%" stopColor="#39ff14" stopOpacity="1" />
        <stop offset="100%" stopColor="#00d4ff" stopOpacity="0" />
      </linearGradient>
      <filter id="glow">
        <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    
    <motion.path
      d={pathData}
      fill="none"
      stroke="url(#routeGradient)"
      strokeWidth="3"
      filter="url(#glow)"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 3, ease: "easeInOut" }}
    />
  </svg>
);
```
- Gradientes ao longo do caminho
- Glow filter para efeito neon
- Animação de desenho progressivo
- Partículas opcionais seguindo o caminho

---

## Texturas e Sobreposições

### Grid Pattern High-Tech
```css
.grid-tech {
  background-image: 
    linear-gradient(rgba(57, 255, 20, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(57, 255, 20, 0.03) 1px, transparent 1px);
  background-size: 40px 40px;
}
```

### Scanline Effect
```css
.scanlines::after {
  content: '';
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(0, 0, 0, 0.1) 2px,
    rgba(0, 0, 0, 0.1) 4px
  );
  pointer-events: none;
}
```

### Vignette
```css
.vignette::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse at center,
    transparent 0%,
    transparent 60%,
    rgba(0, 0, 0, 0.4) 100%
  );
  pointer-events: none;
}
```

---

## Componentes de Profundidade

### Parallax Layers
```jsx
const ParallaxSection = () => (
  <div className="relative overflow-hidden">
    <motion.div
      className="absolute inset-0 bg-grid"
      style={{ y: useTransform(scrollY, [0, 500], [0, -100]) }}
    />
    <motion.div
      className="relative z-10"
      style={{ y: useTransform(scrollY, [0, 500], [0, -50]) }}
    >
      {children}
    </motion.div>
  </div>
);
```

### Depth Cards (Camadas)
```jsx
const DepthCard = ({ children, depth = 1 }) => (
  <div className="relative">
    <div 
      className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent"
      style={{ transform: `translateY(${depth * 4}px) scale(${1 - depth * 0.02})` }}
    />
    <div className="relative glass-advanced rounded-2xl p-6">
      {children}
    </div>
  </div>
);
```

---

## Checklist de Implementação
- [ ] Configurar variáveis CSS da paleta cyber-industrial
- [ ] Criar componente `GlassPanel` com ruído
- [ ] Implementar `BentoGrid` responsivo
- [ ] Adicionar texturas de grid e scanlines
- [ ] Criar `AnimatedSVG` para rotas
- [ ] Desenvolver `DepthCard` com camadas
- [ ] Configurar sistema de vignette global

---

## Referências Visuais
- Blade Runner 2049 (interfaces)
- Cyberpunk 2077 (HUDs)
- Westworld (texturas de luxo)
- Iron Man JARVIS interfaces
