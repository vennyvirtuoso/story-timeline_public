import React, { useEffect, useRef } from 'react';

/**
 * Inspired by Nova Residences (nova-homes-beyond-expectation.md):
 * Context-aware floating cursor pill that reads `data-cursor` under the pointer
 * (e.g. "Flip", "Expand", "Drag", "Open") with zero React re-renders.
 */
const EditorialCursor = React.memo(() => {
  const pillRef = useRef(null);

  useEffect(() => {
    if (
      typeof window === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !window.matchMedia('(hover: hover) and (pointer: fine)').matches
    ) {
      return;
    }

    const pill = pillRef.current;
    if (!pill) return;

    let lastX = -100;
    let lastY = -100;

    const evaluateAt = (x, y) => {
      const target = document.elementFromPoint(x, y);
      const tagged = target?.closest?.('[data-cursor]');
      const label = tagged?.getAttribute?.('data-cursor');

      if (label && !target?.closest?.('input, textarea, select')) {
        if (pill.textContent !== label) pill.textContent = label;
        pill.style.transform = `translate3d(${x + 14}px, ${y + 14}px, 0) scale(1)`;
        pill.classList.add('visible');
      } else {
        pill.classList.remove('visible');
      }
    };

    const onMove = (e) => {
      lastX = e.clientX;
      lastY = e.clientY;
      evaluateAt(lastX, lastY);
    };

    const onScroll = () => {
      if (lastX >= 0 && lastY >= 0) evaluateAt(lastX, lastY);
    };

    const onLeave = () => {
      pill.classList.remove('visible');
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true, capture: true });
    document.addEventListener('mouseleave', onLeave);

    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('scroll', onScroll, true);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return <div ref={pillRef} className="editorial-cursor-pill" aria-hidden="true" />;
});

EditorialCursor.displayName = 'EditorialCursor';

export default EditorialCursor;
