function initNavigationScroll() {
  const navigation = document.querySelector<HTMLElement>('[data-scroll-header]');
  if (!navigation) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const targets = [...navigation.querySelectorAll<HTMLElement>(
    '.navigation-surface, .brand, .brand-symbol img, .brand > img, .nav-links--desktop a, .download-button, .download-surface, .download-button > img, .download-button > span:not(.download-surface), .nav-toggle',
  )];
  const animations = new Map<HTMLElement, Animation>();
  let compact = navigation.dataset.compact === 'true';
  let frame = 0;

  const stop = () => {
    for (const [target, animation] of animations) {
      animation.cancel();
      target.style.removeProperty('will-change');
    }
    animations.clear();
  };

  const update = (animate = true) => {
    frame = 0;
    const next = compact ? window.scrollY > 1 : window.scrollY > 8;
    if (next === compact) return;

    const motion = animate && !reducedMotion.matches && document.documentElement.dataset.input !== 'keyboard' && !document.hidden;
    const previous = motion ? targets.map((target) => ({
      rect: target.getBoundingClientRect(),
      opacity: getComputedStyle(target).opacity,
    })) : [];

    stop();
    compact = next;
    navigation.dataset.compact = String(compact);
    if (!motion) return;

    // Measure only at the state change; animate the surfaces and contents independently.
    const current = targets.map((target) => ({
      rect: target.getBoundingClientRect(),
      opacity: getComputedStyle(target).opacity,
    }));

    targets.forEach((target, index) => {
      const from = previous[index];
      const to = current[index];
      if (!from.rect.width || !to.rect.width || !from.rect.height || !to.rect.height) return;
      const parent = target.parentElement?.closest<HTMLElement>('.brand, .download-button');
      const parentIndex = parent ? targets.indexOf(parent) : -1;
      const parentX = parentIndex < 0 ? 0 : previous[parentIndex].rect.left - current[parentIndex].rect.left;
      const parentY = parentIndex < 0 ? 0 : previous[parentIndex].rect.top - current[parentIndex].rect.top;
      const x = from.rect.left - to.rect.left - parentX;
      const y = from.rect.top - to.rect.top - parentY;
      const control = target.matches('.brand, .download-button');
      const scaleX = control ? 1 : from.rect.width / to.rect.width;
      const scaleY = control ? 1 : from.rect.height / to.rect.height;
      if (x === 0 && y === 0 && scaleX === 1 && scaleY === 1 && from.opacity === to.opacity) return;

      target.style.willChange = 'transform, opacity';
      const animation = target.animate([
        { transform: `translate(${x}px, ${y}px) scale(${scaleX}, ${scaleY})`, opacity: from.opacity },
        { transform: 'none', opacity: to.opacity },
      ], { duration: 320, easing: 'cubic-bezier(.65, 0, .35, 1)' });
      animations.set(target, animation);
      animation.onfinish = () => {
        if (animations.get(target) !== animation) return;
        animations.delete(target);
        target.style.removeProperty('will-change');
      };
    });
  };

  const schedule = () => {
    if (!frame) frame = requestAnimationFrame(() => update());
  };

  const reset = () => {
    cancelAnimationFrame(frame);
    frame = 0;
    stop();
    update(false);
  };

  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', reset, { passive: true });
  window.addEventListener('pageshow', reset);
  window.addEventListener('pagehide', reset);
  window.addEventListener('beforeprint', reset);
  document.addEventListener('keydown', reset);
  document.addEventListener('visibilitychange', () => { if (document.hidden) reset(); });
  reducedMotion.addEventListener('change', reset);
  update(false);
}

initNavigationScroll();
