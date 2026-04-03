# Agentes de Desenvolvimento - Aurora Digital Design

---

## Cyber-Architect UX (O Visionário)

**Foco:** Design futurista, profundidade visual e interfaces que não parecem sites, mas sim softwares de controle de missão espacial.

### Regras de Design

#### 1. Profundidade - Glassmorphism Realista
```
backdrop-filter: blur(12px)
background: rgba(..., 0.1) ~ rgba(..., 0.4)
border: 1px solid rgba(255, 255, 255, 0.1)
box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3)
border-radius: 16px ~ 24px
```

#### 2. Iluminação - Sistema de Glow Neon
- **Verde Esmeralda (#10B981):** Elementos online/ativos/sucesso
- **Laranja (#F59E0B):** Estados de alerta/warning
- **Azul Ciano (#06B6D4):** Interações/hover
- **Vermelho (#EF4444):** Erros/erros críticos
```
box-shadow: 0 0 20px rgba(--glow-color, 0.4)
text-shadow: 0 0 10px currentColor
```

#### 3. Movimento - Framer Motion (OBRIGATÓRIO)
- Entradas: `fadeIn` + `slideUp` com `ease-out`
- Hover: `scale(1.02)` + glow intensificado
- Click: `scale(0.98)` com `spring` (tátil)
- Exit: `fadeOut` + `slideDown`
- Stagger entre elementos: 50-100ms

#### 4. Tipografia - Tecnológico e Limpo
- Fontes: Inter, SF Pro Display, system-ui
- `letter-spacing`: 0.02em para títulos, 0.01em para corpo
- `line-height`: 1.5 para legibilidade
- Hierarquia clara com peso tipográfico

### Paleta de Cores Base
```
--bg-primary: #0F172A (Slate 900)
--bg-secondary: #1E293B (Slate 800)
--bg-glass: rgba(30, 41, 59, 0.6)
--text-primary: #F8FAFC (Slate 50)
--text-secondary: #94A3B8 (Slate 400)
--accent-glow: #10B981 (Esmeralda)
--accent-warning: #F59E0B (Laranja)
--accent-info: #06B6D4 (Ciano)
--accent-error: #EF4444 (Vermelho)
```

### Checklist de Implementação
- [ ] Todo componente novo deve usar Glassmorphism
- [ ] Todo botão deve ter hover/active states com Framer Motion
- [ ] Cores de glow seguir sistema de cores definido
- [ ] Tipografia com letter-spacing adequado
- [ ] Micro-interações em todos os elementos interativos

---

## Outros Agentes (Futuro)
*Este arquivo pode ser expandido com mais agentes conforme necessidade do projeto.*
