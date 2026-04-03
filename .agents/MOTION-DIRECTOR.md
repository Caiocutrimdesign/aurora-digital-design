# Motion & FX Director (O Mestre das Animações)

**Foco:** Transformar interfaces estáticas em experiências vivas com Framer Motion e GSAP.

---

## Diretrizes de Implementação

### 1. Realismo com LayoutId (Morphing)
```jsx
const Card = ({ isSelected }) => (
  <motion.div
    layoutId="card-container"
    className="glass-card"
    transition={{ type: "spring", stiffness: 300, damping: 30 }}
  >
    <motion.div layoutId="card-content">
      {isSelected ? <ExpandedContent /> : <CompactContent />}
    </motion.div>
  </motion.div>
);
```
- Elementos que existem em múltiplas telas devem usar `layoutId` idêntico
- Transições suaves entre estados compacto/expandido

### 2. Feedback Tátil
```jsx
const RippleButton = ({ children, onClick }) => (
  <motion.button
    onClick={onClick}
    whileTap={{ scale: 0.97 }}
    whileHover={{ scale: 1.02 }}
  >
    <motion.span
      className="absolute inset-0 bg-white/20 rounded-full"
      initial={{ scale: 0, opacity: 1 }}
      whileTap={{ scale: 2, opacity: 0 }}
      transition={{ duration: 0.5 }}
    />
    {children}
  </motion.button>
);
```
- Todo botão/clique deve ter reação visual
- Scale down sutil (0.97-0.98) no tap
- Ripple effects ou flash de confirmação

### 3. Entradas Épicas com Stagger
```jsx
const StaggerContainer = ({ items }) => (
  <motion.div
    initial="hidden"
    animate="visible"
    variants={{
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.2 }
      }
    }}
  >
    {items.map(item => (
      <motion.div
        key={item.id}
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: {
            opacity: 1, y: 0,
            transition: { type: "spring", stiffness: 300, damping: 24 }
          }
        }}
      />
    ))}
  </motion.div>
);
```
- Curvas de spring realistas (stiffness: 300, damping: 24)
- Stagger de 50-100ms entre elementos
- Fade + slide como animação base

### 4. Lógica de Telemetria (Alertas)
```jsx
const AlertCard = ({ status, children }) => {
  const isAlert = status === "critical" || status === "warning";
  
  return (
    <motion.div
      animate={isAlert ? {
        boxShadow: [
          "0 0 20px rgba(239, 68, 68, 0.3)",
          "0 0 40px rgba(239, 68, 68, 0.6)",
          "0 0 20px rgba(239, 68, 68, 0.3)"
        ],
        scale: [1, 1.02, 1]
      } : {}}
      transition={{ duration: 1.5, repeat: Infinity }}
      className={isAlert ? "border-red-500" : "border-border"}
    >
      <motion.div
        className="absolute inset-0 rounded-xl bg-red-500/10"
        animate={isAlert ? { opacity: [0, 0.5, 0] } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      />
      {children}
    </motion.div>
  );
};
```
- Cards de alerta pulsam com glow vermelho orgânico
- Animação de breathing (inspirar/expirar)
- Escala sutil (1.02) para chamar atenção

### 5. Micro-Interações de Hover
```jsx
const HoverCard = ({ children }) => (
  <motion.div
    whileHover={{
      y: -4,
      boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
      borderColor: "hsl(var(--primary))"
    }}
    transition={{ type: "spring", stiffness: 400, damping: 25 }}
  >
    {children}
  </motion.div>
);
```
- Elevação sutil no hover (y: -4)
- Glow intensificado
- Border color transition

---

## Checklist de Implementação
- [ ] Setup de `AnimatePresence` no App root
- [ ] Criar `useSpringTransition` custom hook
- [ ] Criar `RippleEffect` component reutilizável
- [ ] Implementar `StaggerList` para listas animadas
- [ ] Adicionar `ParallaxScroll` para backgrounds
- [ ] Configurar `layoutId` para transições de página
- [ ] Adicionar spring physics configuráveis

---

## Configuração de Springs
```typescript
const springConfig = {
  gentle: { stiffness: 120, damping: 14 },
  wobbly: { stiffness: 180, damping: 12 },
  stiff: { stiffness: 400, damping: 30 },
  slow: { stiffness: 280, damping: 60 }
};
```

---

## Velocidade de Animações
```
Micro (hover, tap): 100-200ms
Pequena (tooltip, badge): 200-300ms
Média (card expand): 300-400ms
Grande (page transition): 400-600ms
Épica (stagger list): 600-1000ms
```
