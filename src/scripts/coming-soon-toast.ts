const VISIBLE_MS = 4000;

const toast = document.querySelector<HTMLElement>('[data-coming-soon-toast]');
const copy = toast?.querySelector<HTMLElement>('[data-toast-copy]');
const message = document.querySelector<HTMLTemplateElement>('template[data-toast-message]');
const dismiss = toast?.querySelector<HTMLButtonElement>('[data-toast-dismiss]');

if (toast && copy && message && dismiss) {
  let timer = 0;
  let paused = false;

  const close = () => {
    window.clearTimeout(timer);
    toast.dataset.state = 'closed';
  };

  const schedule = () => {
    window.clearTimeout(timer);
    if (!paused) timer = window.setTimeout(close, VISIBLE_MS);
  };

  const open = () => {
    if (toast.dataset.state !== 'open') {
      // Filling the live region on open is what screen readers announce.
      copy.replaceChildren(message.content.cloneNode(true));
      toast.dataset.state = 'open';
    }
    schedule();
  };

  document.addEventListener('click', (event) => {
    if (event.defaultPrevented) return;
    if (!(event.target instanceof Element) || !event.target.closest('a[data-coming-soon]')) return;
    event.preventDefault();
    open();
  });

  dismiss.addEventListener('click', close);

  const pause = () => {
    paused = true;
    window.clearTimeout(timer);
  };
  const resume = () => {
    if (toast.matches(':hover, :focus-within')) return;
    paused = false;
    if (toast.dataset.state === 'open') schedule();
  };
  toast.addEventListener('pointerenter', pause);
  toast.addEventListener('pointerleave', resume);
  toast.addEventListener('focusin', pause);
  toast.addEventListener('focusout', () => requestAnimationFrame(resume));
  // Don't let the toast expire while the visitor is on another tab.
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) pause();
    else resume();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && toast.dataset.state === 'open') close();
  });
}
