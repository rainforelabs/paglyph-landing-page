// Animates FAQ answers open and closed. Height follows the content with an ease-in-out curve so
// the rows below glide instead of jumping, and reversing mid-animation continues from where it is.
const root = document.documentElement;
const resize = 'cubic-bezier(.645, .045, .355, 1)';
const fadeIn = 'cubic-bezier(.32, .72, 0, 1)';

// Reduced motion and keyboard input set these tokens to 0ms, which leaves the native toggle in place.
const duration = (token: '--motion-expand' | '--motion-collapse') =>
  Number.parseFloat(getComputedStyle(root).getPropertyValue(token)) || 0;

for (const list of document.querySelectorAll<HTMLElement>('.faq-list')) {
  list.dataset.enhanced = 'true';

  for (const details of list.querySelectorAll<HTMLDetailsElement>('details')) {
    const summary = details.querySelector<HTMLElement>(':scope > summary');
    const answer = details.querySelector<HTMLElement>(':scope > p');
    if (!summary || !answer) continue;

    let height: Animation | undefined;
    let fade: Animation | undefined;

    const settle = () => {
      height?.cancel();
      fade?.cancel();
      height = fade = undefined;
      details.style.removeProperty('overflow');
      delete details.dataset.state;
    };

    summary.addEventListener('click', (event) => {
      const closing = details.open && details.dataset.state !== 'closing';
      const time = duration(closing ? '--motion-collapse' : '--motion-expand');
      if (!time) {
        settle();
        return;
      }

      event.preventDefault();
      // Read the in-flight values before cancelling so a reversal starts from what is on screen.
      const from = details.getBoundingClientRect().height;
      const opacity = getComputedStyle(answer).opacity;
      height?.cancel();
      fade?.cancel();
      details.style.overflow = 'hidden';

      if (closing) {
        details.dataset.state = 'closing';
        const to = summary.getBoundingClientRect().height + borderBlock(details);
        height = details.animate({ height: [`${from}px`, `${to}px`] }, { duration: time, easing: resize, fill: 'forwards' });
        fade = answer.animate({ opacity: [opacity, '0'] }, { duration: time * .6, easing: 'ease-out', fill: 'forwards' });
        height.onfinish = () => {
          details.open = false;
          settle();
        };
        return;
      }

      const reversing = details.dataset.state === 'closing';
      details.open = true;
      details.dataset.state = 'opening';
      const to = details.getBoundingClientRect().height;
      height = details.animate({ height: [`${from}px`, `${to}px`] }, { duration: time, easing: resize });
      fade = answer.animate(
        reversing ? { opacity: [opacity, '1'] } : { opacity: ['0', '1'], transform: ['translateY(-4px)', 'none'] },
        { duration: time, easing: fadeIn },
      );
      height.onfinish = settle;
    });
  }
}

function borderBlock(element: HTMLElement) {
  const style = getComputedStyle(element);
  return Number.parseFloat(style.borderTopWidth) + Number.parseFloat(style.borderBottomWidth);
}
