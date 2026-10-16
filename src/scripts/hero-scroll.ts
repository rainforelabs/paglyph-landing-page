function initHeroScroll() {
  const hero = document.querySelector<HTMLElement>('.hero');
  const phone = hero?.querySelector<HTMLElement>('.hero-layer--phone');
  const wordmark = hero?.querySelector<HTMLElement>('.hero-layer--wordmark');
  const pattern = hero?.querySelector<HTMLElement>('.hero-layer--pattern');
  if (!hero || !phone || !wordmark || !pattern || !('IntersectionObserver' in window)) return;

  const root = document.documentElement;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const mobile = window.matchMedia('(max-width: 640px)');
  const layers = [phone, wordmark, pattern];
  let listeners: AbortController | undefined;
  let observer: IntersectionObserver | undefined;
  let frame = 0;
  let visible = false;
  let distance = 1;
  let strength = 1;
  let previousProgress = -1;

  const reset = () => {
    cancelAnimationFrame(frame);
    frame = 0;
    previousProgress = -1;
    for (const layer of layers) {
      layer.style.removeProperty('transform');
      layer.style.removeProperty('opacity');
    }
  };

  const render = () => {
    frame = 0;
    if (root.dataset.input === 'keyboard') {
      reset();
      return;
    }

    const progress = Math.min(1, Math.max(0, window.scrollY / distance));
    if (progress === previousProgress) return;
    previousProgress = progress;
    const depth = progress * strength;

    phone.style.transform = `translate3d(0, ${depth * 90}px, 0) rotate(${-depth * 1.5}deg) scale(${1 + depth * 0.06})`;
    wordmark.style.transform = `translate3d(0, ${-depth * 64}px, 0) scale(${1 - depth * 0.02})`;
    wordmark.style.opacity = String(1 - depth * 0.55);
    pattern.style.transform = `translate3d(0, ${-depth * 30}px, 0) scale(${1 + depth * 0.025})`;
    pattern.style.opacity = String(1 - depth * 0.3);
  };

  const schedule = () => {
    if (visible && !frame) frame = requestAnimationFrame(render);
  };

  const measure = () => {
    distance = Math.max(1, hero.getBoundingClientRect().bottom + window.scrollY);
    strength = mobile.matches ? 0.55 : 1;
    previousProgress = -1;
    schedule();
  };

  const syncMotion = () => {
    listeners?.abort();
    observer?.disconnect();
    visible = false;
    delete hero.dataset.scrollMotion;
    reset();
    if (reducedMotion.matches) return;

    listeners = new AbortController();
    const options = { signal: listeners.signal, passive: true };
    measure();
    observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) {
        hero.dataset.scrollMotion = 'active';
        schedule();
      } else {
        delete hero.dataset.scrollMotion;
        cancelAnimationFrame(frame);
        frame = 0;
      }
    });
    observer.observe(hero);

    window.addEventListener('scroll', schedule, options);
    window.addEventListener('resize', measure, options);
    window.addEventListener('pageshow', measure, options);
    document.addEventListener('keydown', reset, options);
  };

  reducedMotion.addEventListener('change', syncMotion);
  syncMotion();
}

initHeroScroll();
