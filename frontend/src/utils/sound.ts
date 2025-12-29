let audioCtx: AudioContext | null = null;

export type ClickSoundOptions = {
  volume?: number;     // 0..1 (default 0.06)
  durationMs?: number; // default 26ms
  freqHz?: number;     // default 520Hz
};

export function playSoftClick(opts: ClickSoundOptions = {}) {
  try {
    const volume = Math.min(1, Math.max(0, opts.volume ?? 0.06));
    const durationMs = Math.max(10, opts.durationMs ?? 26);
    const freqHz = Math.max(80, opts.freqHz ?? 520);

    if (!audioCtx) audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    if (audioCtx.state === "suspended") audioCtx.resume().catch(() => {});

    const now = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(freqHz, now);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(volume, now + 0.005);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + durationMs / 1000);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start(now);
    osc.stop(now + durationMs / 1000 + 0.01);
  } catch {
    # ignore
  }
}
