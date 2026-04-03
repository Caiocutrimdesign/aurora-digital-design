# Immersive Audio-Visual (O Especialista em Som e Imagem)

**Foco:** Criar imersão total através de integração profissional de som e vídeo (Videotelemetria).

---

## Diretrizes de Implementação

### 1. Audio Feedback (Sons Clean Sci-Fi)

```typescript
// useAudio.ts - Hook para gerenciar sons
import { useCallback, useRef } from 'react';

type SoundType = 'click' | 'success' | 'alert' | 'transition' | 'hover' | 'error';

const soundFiles = {
  click: '/sounds/interface-click.mp3',
  success: '/sounds/success-chime.mp3',
  alert: '/sounds/alert-pulse.mp3',
  transition: '/sounds/tab-switch.mp3',
  hover: '/sounds/hover-blip.mp3',
  error: '/sounds/error-tone.mp3'
};

export const useAudio = () => {
  const audioRefs = useRef<Record<SoundType, HTMLAudioElement | null>>({});

  const playSound = useCallback((type: SoundType) => {
    if (!audioRefs.current[type]) {
      audioRefs.current[type] = new Audio(soundFiles[type]);
      audioRefs.current[type]!.volume = 0.3;
    }
    audioRefs.current[type]!.currentTime = 0;
    audioRefs.current[type]!.play();
  }, []);

  return { playSound };
};
```

```jsx
// Botão com feedback de som
const SoundButton = ({ children, soundType = 'click', onClick }) => {
  const { playSound } = useAudio();
  
  return (
    <motion.button
      onClick={() => {
        playSound(soundType);
        onClick?.();
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </motion.button>
  );
};
```

#### Padrões de Som
| Ação | Som | Duração |
|------|-----|---------|
| Click | Soft click digital | 50-100ms |
| Hover | Blip sutil | 30-50ms |
| Success | Chime升 | 300-500ms |
| Alert | Pulse grave | 200-400ms |
| Transition | Woosh clean | 150-250ms |
| Error | Tom grave | 200-300ms |

### 2. Video Integration (Player Customizado)

```jsx
const VideoOverlay = ({ videoUrl, position, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 20 }}
        className="fixed z-50 glass-panel w-96 rounded-2xl overflow-hidden shadow-2xl"
        style={{ 
          top: position.y, 
          left: position.x,
          boxShadow: '0 0 60px rgba(0, 212, 255, 0.3)'
        }}
      >
        <div className="relative aspect-video bg-black">
          <video
            src={videoUrl}
            autoPlay={isPlaying}
            className="w-full h-full object-cover"
          />
          
          {/* Controles Minimalistas */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="text-white/80 hover:text-white transition-colors"
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              </button>
              
              <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-cyber-cyan"
                  initial={{ width: '0%' }}
                  animate={{ width: '45%' }}
                />
              </div>
              
              <button
                onClick={onClose}
                className="text-white/80 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
```

### 3. Data Sonification (Marcos e Celebrações)

```jsx
const MilestoneCelebration = ({ milestone, currentValue, targetValue }) => {
  const [showCelebration, setShowCelebration] = useState(false);
  
  useEffect(() => {
    if (currentValue >= targetValue && !showCelebration) {
      setShowCelebration(true);
      playSound('success'); // Som atmosférico de sucesso
      
      // Auto-hide após 3 segundos
      setTimeout(() => setShowCelebration(false), 3000);
    }
  }, [currentValue, targetValue]);
  
  return (
    <AnimatePresence>
      {showCelebration && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] pointer-events-none"
        >
          {/* Partículas */}
          <ParticleExplosion 
            colors={['#39ff14', '#00d4ff', '#ffd700']}
            particleCount={100}
          />
          
          {/* Texto do Marco */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, type: 'spring' }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="text-center">
              <motion.h1
                className="text-6xl font-bold text-white mb-4"
                style={{ textShadow: '0 0 40px rgba(57, 255, 20, 0.8)' }}
                animate={{ 
                  scale: [1, 1.1, 1],
                  textShadow: [
                    '0 0 40px rgba(57, 255, 20, 0.8)',
                    '0 0 80px rgba(57, 255, 20, 1)',
                    '0 0 40px rgba(57, 255, 20, 0.8)'
                  ]
                }}
                transition={{ duration: 1, repeat: 2 }}
              >
                🎉 {milestone}
              </motion.h1>
              <p className="text-2xl text-cyber-cyan">{currentValue.toLocaleString()} veículos!</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
```

```jsx
const ParticleExplosion = ({ colors, particleCount = 100 }) => {
  const particles = Array.from({ length: particleCount }, (_, i) => ({
    id: i,
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    color: colors[Math.floor(Math.random() * colors.length)],
    size: Math.random() * 8 + 4,
    duration: Math.random() * 2 + 1,
    angle: Math.random() * 360
  }));
  
  return (
    <>
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`
          }}
          initial={{ 
            x: particle.x, 
            y: particle.y, 
            opacity: 1,
            scale: 1
          }}
          animate={{
            x: particle.x + Math.cos(particle.angle) * 300,
            y: particle.y + Math.sin(particle.angle) * 300,
            opacity: 0,
            scale: 0
          }}
          transition={{ duration: particle.duration }}
        />
      ))}
    </>
  );
};
```

---

## Configuração de Volume e Preferências

```jsx
const AudioProvider = ({ children }) => {
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0.3);
  
  return (
    <AudioContext.Provider value={{ muted, setMuted, volume, setVolume }}>
      {children}
    </AudioContext.Provider>
  );
};
```

---

## Checklist de Implementação
- [ ] Criar pasta `/public/sounds/` com arquivos de áudio
- [ ] Implementar `useAudio` hook
- [ ] Criar componente `SoundButton` reutilizável
- [ ] Desenvolver `VideoOverlay` player
- [ ] Implementar `ParticleExplosion` component
- [ ] Criar `MilestoneCelebration` para marcos
- [ ] Adicionar toggle de mudo global
- [ ] Configurar AudioContext provider

---

## Recursos de Áudio Recomendados
- Freesound.org (sons gratuitos)
- Sonnivex (biblioteca Sci-Fi)
- BBC Sound Effects
- Zapsplat (interface sounds)

## Considerações de Acessibilidade
```jsx
// Sempre respeitar preferência do usuário
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const prefersReducedSound = window.matchMedia('(prefers-reduced-sound)').matches;

// Desabilitar animações/sons se preferir
if (prefersReducedMotion) {
  // Desabilitar animações visuais
}

if (prefersReducedSound) {
  // Silenciar todos os sons
}
```
