type HeadlineResult = 'finished' | 'skipped';

function initHeadlineScroll(): Promise<HeadlineResult> {
  const headline = document.querySelector<HTMLElement>('.scroll-headline');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!headline || !('animate' in headline) || reducedMotion.matches || location.hash || window.scrollY > 8) return Promise.resolve('skipped');

  const root = document.documentElement;
  const words = [...headline.querySelectorAll<HTMLElement>('.headline-word')];
  const listeners = new AbortController();
  const { signal } = listeners;
  const duration = 760;
  const stagger = 90;
  // The curve settles each word by ~40% of its duration, so the feature cards follow from there
  // instead of waiting for the last word's imperceptible tail.
  const handoffAt = .4;
  let resolveFinished: (result: HeadlineResult) => void;
  const finished = new Promise<HeadlineResult>(resolve => { resolveFinished = resolve; });
  let animations: Animation[] = [];
  let frame = 0;
  let handoff = 0;
  let trigger = 0;
  let previousScrollY = window.scrollY;
  let playing = false;
  let complete = false;

  const finish = (result: HeadlineResult) => {
    if (complete) return;
    complete = true;
    playing = false;
    cancelAnimationFrame(frame);
    window.clearTimeout(handoff);
    listeners.abort();
    headline.dataset.headlineState = 'complete';
    for (const animation of animations) animation.cancel();
    animations = [];
    resolveFinished(result);
  };
  const skip = () => finish('skipped');

  const measure = () => {
    if (complete) return;
    if (playing) {
      skip();
      return;
    }
    const top = headline.getBoundingClientRect().top + window.scrollY;
    trigger = Math.max(8, top - innerHeight * .78);
  };

  const play = () => {
    playing = true;
    headline.dataset.headlineState = 'playing';
    animations = words.map((word, index) => word.animate([
      { opacity: 0, filter: 'blur(14px)', transform: 'translateY(8px) scale(.92)' },
      { opacity: 1, filter: 'blur(0px)', transform: 'translateY(0) scale(1)' },
    ], {
      duration,
      delay: index * stagger,
      easing: 'cubic-bezier(.22, 1, .36, 1)',
      fill: 'both',
    }));
    handoff = window.setTimeout(() => resolveFinished('finished'), (words.length - 1) * stagger + duration * handoffAt);
    void Promise.all(animations.map(animation => animation.finished)).then(() => finish('finished'), skip);
  };

  const onScroll = () => {
    if (frame || playing) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      if (root.dataset.input === 'keyboard') {
        skip();
        return;
      }
      const scrollY = window.scrollY;
      if (scrollY > previousScrollY && scrollY >= trigger) play();
      previousScrollY = scrollY;
    });
  };

  headline.dataset.headlineState = 'pending';
  measure();
  void document.fonts.ready.then(measure);
  window.addEventListener('scroll', onScroll, { signal, passive: true });
  window.addEventListener('resize', measure, { signal, passive: true });
  window.addEventListener('pagehide', skip, { signal });
  window.addEventListener('pageshow', event => { if (event.persisted) skip(); }, { signal });
  window.addEventListener('beforeprint', skip, { signal });
  window.addEventListener('hashchange', skip, { signal });
  document.addEventListener('visibilitychange', () => { if (document.hidden) skip(); }, { signal });
  document.addEventListener('keydown', skip, { signal, capture: true });
  document.addEventListener('click', event => {
    if (event.target instanceof Element && event.target.closest('a, button, summary')) skip();
  }, { signal, capture: true });
  reducedMotion.addEventListener('change', skip, { signal });
  return finished;
}

export const headlineEntrance = initHeadlineScroll();
