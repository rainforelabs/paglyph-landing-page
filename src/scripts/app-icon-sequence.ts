import { entranceMotionAllowed } from './entrance-motion';

function initAppIconSequence() {
  const button = document.querySelector<HTMLButtonElement>('.icon-sequence');
  if (!button) return;

  const icons = [...button.querySelectorAll<HTMLElement>('.app-icon-option')];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const intervals = [180, 320, 540];
  let current = 0;
  let timer: ReturnType<typeof setTimeout> | undefined;
  let visible = false;
  let played = !('IntersectionObserver' in window);
  let loading = false;
  let ready = false;

  const canAnimate = () => !reducedMotion.matches && document.documentElement.dataset.input !== 'keyboard' && !document.hidden;

  const stop = () => {
    clearTimeout(timer);
    delete button.dataset.playing;
    delete button.dataset.settling;
  };

  const showCurrent = () => {
    icons.forEach((icon, index) => { icon.dataset.active = String(index === current); });
    button.setAttribute('aria-label', `Cycle app icons. Current icon: ${icons[current].dataset.iconName}.`);
  };

  const advance = () => {
    current = (current + 1) % icons.length;
    showCurrent();
  };

  const play = () => {
    if (!ready || !visible || !canAnimate()) return;
    stop();
    button.dataset.playing = 'true';
    let step = 0;

    const next = () => {
      if (!visible || !canAnimate()) {
        stop();
        return;
      }
      advance();
      if (step < intervals.length) {
        timer = setTimeout(next, intervals[step++]);
      } else {
        delete button.dataset.playing;
        button.dataset.settling = 'true';
        timer = setTimeout(stop, 620);
      }
    };

    next();
  };

  const preview = () => {
    if (played || !visible || !ready || !canAnimate() || !entranceMotionAllowed()) return;
    played = true;
    timer = setTimeout(play, 660);
  };

  const prepareImages = () => {
    if (loading) return;
    loading = true;
    const images = [...button.querySelectorAll('img')];
    images.forEach((image) => { image.loading = 'eager'; });
    Promise.allSettled(images.map((image) => image.decode())).then(() => {
      ready = true;
      button.disabled = false;
      preview();
    });
  };

  button.addEventListener('click', (event) => {
    played = true;
    if (event.detail === 0 || !canAnimate()) {
      stop();
      advance();
    } else if (!button.hasAttribute('data-playing') && !button.hasAttribute('data-settling')) {
      play();
    }
  });

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting && entry.intersectionRatio >= .75;
      if (visible) {
        prepareImages();
        preview();
      } else {
        stop();
      }
    }, { threshold: .75 });
    observer.observe(button);
  } else {
    visible = true;
    prepareImages();
  }

  document.addEventListener('keydown', stop);
  document.addEventListener('visibilitychange', () => { if (document.hidden) stop(); });
  reducedMotion.addEventListener('change', stop);
  window.addEventListener('pagehide', stop);
  window.addEventListener('beforeprint', stop);
  showCurrent();
}

initAppIconSequence();
