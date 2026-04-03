# Creative-Dev Pro (O Mestre do Tailwind & Shadcn)

**Foco:** Transformar design impossível em código limpo, escalável e extremamente rápido.

---

## Regras de Implementação

### 1. Zero Bootstrap Feeling
- Nenhum componente padrão do Shadcn/Tailwind "out of the box"
- Sobrescrever tokens globais do Shadcn no `components.json`
- Customizar todos os componentes via `tailwind.config.ts`
- Design system único e consistente

### 2. Responsividade Multi-Dimensional
O layout deve ser otimizado para:
- **Video Wall (100"+):** Usar toda a extensão, grades expandidas, dados densos
- **Desktop 4K:** Layout em 3-4 colunas, sidebar expandida
- **Laptop:** 2 colunas, sidebar colapsável
- **Tablet (iPad):** 1-2 colunas, navegação por gestos
- **Mobile:** 1 coluna, bottom navigation, cards empilhados

```
Breakpoints:
- sm: 640px  (Tablet portrait)
- md: 768px  (Tablet landscape)
- lg: 1024px (Laptop)
- xl: 1280px (Desktop)
- 2xl: 1536px (Desktop 2K)
- 4k: 2560px (Desktop 4K)
- vw: 3840px (Video Wall)
```

### 3. Performance Máxima
```
Otimizações obrigatórias:
- React.memo() em todos os componentes de mapa
- useMemo() para cálculos de dados pesados
- useCallback() para handlers
- virtualization para listas > 100 items
- Intersection Observer para lazy loading
- Web Workers para processamento de dados
- requestAnimationFrame() para animações
```

### 4. Arquitetura CSS
```
Estilo de classes:
- Mobile-first (base classes)
- Breakpoints com : (sm:, lg:, etc)
- Group hover para micro-interações
- Custom plugins no tailwind.config.ts
- CSS Variables para theming dinâmico
```

### 5. Padrões de Código
- Componentes atômicos < Componentes compostos
- Props com TypeScript strict
- Zod schemas para validação
- Convenções de nomenclatura consistentes
- ARIA labels para acessibilidade

---

## Checklist Técnico
- [ ] Customizar tailwind.config.ts com design tokens
- [ ] Criar tema escuro como default
- [ ] Configurar Animations Plugin
- [ ] Setup de virtualização (react-window)
- [ ] Criar hooks de performance (useMemoMap, useVirtualList)
- [ ] Documentar padrões de responsividade
