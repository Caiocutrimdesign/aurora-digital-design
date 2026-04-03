# Data-Visualizer Sênior (O Engenheiro de Dashboard)

**Foco:** Transformar dados brutos de 8 mil veículos em gráficos e mapas intuitivos para decisão executiva instantânea.

---

## Regras de Visualização

### 1. Grids de Dados Densos
- Evitar tabelas brandas e genéricas
- Scroll snap para navegação fluida entre cards
- Filtros inteligentes com preview em tempo real
- Hierarquia visual clara (status → métricas → detalhes)

### 2. Mapas de Elite (Mapbox Dark Custom)
```
mapStyle: dark-v11 customizado
textures: grid pattern sutil, topografia simplificada
camadas: 3+ layers sobrepostas (tráfego, clima, frotas)
```
- Marcadores que mudam de forma conforme velocidade:
  - **Parado:** Círculo estático
  - **Movimento lento (<40km/h):** Círculo pulsante
  - **Movimento normal (40-80km/h):** Triângulo apontando direção
  - **Alta velocidade (>80km/h):** Triângulo alongado + trail

### 3. KPIs de Impacto - Telemetria Visual
Widgets com gradientes dinâmicos e SVG customizados:

| Métrica | Visual |
|---------|--------|
| Combustível | Barra de progresso com gradiente verde→amarelo→vermelho |
| RPM | Tachometer SVG com zona verde/amarela/vermelha |
| Fadiga Motorista | Indicador circular com preenchimento radial |
| Temperatura | Termômetro vertical com gradiente térmico |
| Velocidade | Velocímetro arejado com needle animada |

### 4. Hierarquia de Informação
```
Nível 1: Status geral (ônibus de olho)
Nível 2: Grupos de métricas (telemetria, localização, alertas)
Nível 3: Detalhamento (histórico, gráficos de tendência)
```

### 5. Performance
- Lazy loading para 8000+ marcadores
- Clusterização inteligente no mapa
- Virtualização de listas com React Window
- Cache de dados com stale-while-revalidate

---

## Componentes Recomendados
- [ ] `<FleetMap>` - Mapa principal com camadas customizadas
- [ ] `<VehicleMarker>` - Marcador dinâmico por velocidade
- [ ] `<TelemetryGauge>` - Widget de telemetria com gradiente
- [ ] `<KPICard>` - Card de KPI com sparkline
- [ ] `<DataGrid>` - Grid denso com filtros e scroll snap
- [ ] `<AlertStack>` - Stack de alertas priorizados
