const hoverMotion = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');

const cards = [...document.querySelectorAll<HTMLElement>('.feature-card')].flatMap((card) => {
  const foreground = card.querySelector<HTMLElement>('.feature-parallax');
  const background = card.querySelector<HTMLElement>('.feature-background');
  if (!foreground || !background) return [];

  let bounds: DOMRect | undefined;
  let frame = 0;
  let x = 0;
  let y = 0;

  const reset = () => {
    cancelAnimationFrame(frame);
    frame = 0;
    bounds = undefined;
    delete card.dataset.parallax;
    foreground.style.removeProperty('transform');
    background.style.removeProperty('transform');
  };

  const followPointer = (event: PointerEvent) => {
    if (event.pointerType === 'touch' || event.buttons !== 0 || card.dataset.reveal === 'pending' || card.dataset.reveal === 'entering') {
      reset();
      return;
    }

    bounds ??= card.getBoundingClientRect();
    x = Math.max(-1, Math.min(1, (event.clientX - bounds.left) / bounds.width * 2 - 1));
    y = Math.max(-1, Math.min(1, (event.clientY - bounds.top) / bounds.height * 2 - 1));
    if (frame) return;

    frame = requestAnimationFrame(() => {
      frame = 0;
      card.dataset.parallax = 'active';
      foreground.style.transform = `translate3d(${x * 6}px, ${y * 6}px, 0) scale(1.02)`;
      background.style.transform = `translate3d(${-x * 3}px, ${-y * 3}px, 0) scale(1.04)`;
    });
  };

  return [{ card, followPointer, reset }];
});

let listeners: AbortController | undefined;

const syncMotion = () => {
  listeners?.abort();
  cards.forEach(({ reset }) => reset());
  if (!hoverMotion.matches) return;

  listeners = new AbortController();
  const options = { signal: listeners.signal, passive: true };
  const resetAll = () => cards.forEach(({ reset }) => reset());

  for (const { card, followPointer, reset } of cards) {
    card.addEventListener('pointerenter', followPointer, options);
    card.addEventListener('pointermove', followPointer, options);
    card.addEventListener('pointerleave', reset, options);
    card.addEventListener('pointercancel', reset, options);
  }

  document.addEventListener('keydown', resetAll, options);
  window.addEventListener('scroll', resetAll, options);
  window.addEventListener('resize', resetAll, options);
  window.addEventListener('blur', resetAll, options);
};

hoverMotion.addEventListener('change', syncMotion);
syncMotion();
