/**
 * Locks document scroll while preserving position and avoiding layout shift
 * from scrollbar disappearance. Restores the exact scrollY on unlock.
 * Pass scrollY captured before any layout change (e.g. before opening a drawer).
 */
export function lockBodyScroll(
  scrollY: number = window.scrollY || document.documentElement.scrollTop || 0,
): number {
  const scrollbarWidth =
    window.innerWidth - document.documentElement.clientWidth;

  document.documentElement.style.setProperty(
    "--body-scroll-lock-compensation",
    `${scrollbarWidth}px`,
  );
  document.documentElement.style.overflow = "hidden";

  document.body.dataset.scrollLocked = "true";
  document.body.style.position = "fixed";
  document.body.style.top = `-${scrollY}px`;
  document.body.style.left = "0";
  document.body.style.right = "0";
  document.body.style.width = "100%";
  document.body.style.overflow = "hidden";
  if (scrollbarWidth > 0) {
    document.body.style.paddingRight = `${scrollbarWidth}px`;
  }

  return scrollY;
}

export function unlockBodyScroll(scrollY: number) {
  document.body.style.position = "";
  document.body.style.top = "";
  document.body.style.left = "";
  document.body.style.right = "";
  document.body.style.width = "";
  document.body.style.overflow = "";
  document.body.style.paddingRight = "";
  delete document.body.dataset.scrollLocked;

  document.documentElement.style.overflow = "";
  document.documentElement.style.removeProperty(
    "--body-scroll-lock-compensation",
  );

  const root = document.documentElement;
  const previousBehavior = root.style.scrollBehavior;
  root.style.scrollBehavior = "auto";
  window.scrollTo(0, scrollY);
  root.style.scrollBehavior = previousBehavior;
}
