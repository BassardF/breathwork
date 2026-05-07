let ctx: AudioContext | null = null;

function getContext(): AudioContext {
  if (!ctx) {
    ctx = new AudioContext();
  }
  if (ctx.state === 'suspended') {
    void ctx.resume();
  }
  return ctx;
}

interface PlayOptions {
  frequency?: number;
  duration?: number;
  type?: OscillatorType;
  volume?: number;
}

function play({ frequency = 660, duration = 0.15, type = 'sine', volume = 0.3 }: PlayOptions = {}) {
  const context = getContext();
  const osc = context.createOscillator();
  const gain = context.createGain();
  osc.type = type;
  osc.frequency.value = frequency;
  gain.gain.setValueAtTime(volume, context.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + duration);
  osc.connect(gain).connect(context.destination);
  osc.start();
  osc.stop(context.currentTime + duration);
}

export const sound = {
  phaseChange(kind?: string) {
    switch (kind) {
      case 'inhale':
        play({ frequency: 660, duration: 0.15 });
        break;
      case 'exhale':
        play({ frequency: 440, duration: 0.15 });
        break;
      case 'hold':
      case 'hold2':
        play({ frequency: 520, duration: 0.1 });
        break;
      default:
        play({ frequency: 560, duration: 0.12 });
    }
  },

  sessionStart() {
    play({ frequency: 880, duration: 0.3 });
  },

  sessionComplete() {
    play({ frequency: 660, duration: 0.2 });
    setTimeout(() => play({ frequency: 880, duration: 0.3 }), 200);
  },
};
