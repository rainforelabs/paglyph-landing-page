import { entranceMotionAllowed } from './entrance-motion';
import { headlineEntrance } from './headline-scroll';

function initScrollReveals() {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reducedMotion.matches || !entranceMotionAllowed() || document.documentElement.dataset.input === 'keyboard' || !('IntersectionObserver' in window)) return;

  const targets = [...document.querySelectorAll<HTMLElement>(
    '.feature-card, .faq-intro, .landing-faq > .faq-list, .closing > .closing-mark, .closing > h2',
  )];
  const initialTarget = document.getElementById(location.hash.slice(1));
  const pending = new Set<HTMLElement>();
  const inView = new Set<HTMLElement>();
  let waitingForHeadline = document.querySelector<HTMLElement>('.scroll-headline')?.dataset.headlineState === 'pending';
  const listeners = new AbortController();
  const options = { signal: listeners.signal };

  const revealReady = () => {
    const groups = new Map<Element | null, number>();
    for (const target of pending) {
      if (!inView.has(target) || target.dataset.reveal !== 'pending') continue;
      if (waitingForHeadline && target.matches('.feature-card')) continue;
      observer.unobserve(target);
      const order = groups.get(target.parentElement) ?? 0;
      groups.set(target.parentElement, order + 1);
      target.style.setProperty('--reveal-delay', `${Math.min(order, 2) * 70}ms`);
      target.dataset.reveal = 'entering';
    }
  };

  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      const target = entry.target as HTMLElement;
      if (entry.isIntersecting && entry.intersectionRatio >= 0.12) inView.add(target);
      else {
        inView.delete(target);
        if (entry.boundingClientRect.bottom <= 0 && pending.has(target)) finish(target);
      }
    }
    revealReady();
  }, { threshold: 0.12, rootMargin: '0px 0px -32px 0px' });

  const finish = (target: HTMLElement) => {
    target.dataset.reveal = 'visible';
    target.style.removeProperty('--reveal-delay');
    pending.delete(target);
    inView.delete(target);
    observer.unobserve(target);
    if (pending.size === 0) {
      observer.disconnect();
      listeners.abort();
    }
  };

  const showAll = () => {
    for (const target of pending) finish(target);
  };

  for (const target of targets) {
    const bounds = target.getBoundingClientRect();
    const visibleHeight = Math.max(0, Math.min(bounds.bottom, innerHeight - 32) - Math.max(bounds.top, 0));
    const visible = visibleHeight >= bounds.height * 0.12;
    const followsHeadline = waitingForHeadline && target.matches('.feature-card');
    if (bounds.bottom <= 0 || (!followsHeadline && visible) || initialTarget?.contains(target)) continue;

    pending.add(target);
    if (visible) inView.add(target);
    target.dataset.reveal = 'pending';
    const onAnimationEnd = (event: AnimationEvent) => {
      if (event.target === target && event.animationName === 'paglyph-reveal') finish(target);
    };
    target.addEventListener('animationend', onAnimationEnd, options);
    target.addEventListener('animationcancel', onAnimationEnd, options);
    observer.observe(target);
  }

  if (pending.size === 0) {
    observer.disconnect();
    return;
  }

  if (waitingForHeadline) {
    void headlineEntrance.then(result => {
      waitingForHeadline = false;
      if (result === 'finished') revealReady();
      else {
        for (const target of pending) {
          if (target.matches('.feature-card')) finish(target);
        }
      }
    });
  }

  document.addEventListener('keydown', showAll, options);
  document.addEventListener('focusin', (event) => {
    if (event.target instanceof Element && event.target.closest('[data-reveal]')) showAll();
  }, options);
  reducedMotion.addEventListener('change', () => {
    if (reducedMotion.matches) showAll();
  }, options);
}

initScrollReveals();
