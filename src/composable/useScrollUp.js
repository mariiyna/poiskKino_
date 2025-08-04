export function useScrollUp(behavior = 'auto') {
  window.scrollTo({
    top: 0,
    behavior: behavior,
  });
}