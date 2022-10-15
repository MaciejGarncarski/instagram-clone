export const lockScroll = () => {
  const scrollBarCompensation = window.innerWidth - document.body.offsetWidth;
  document.body.style.overflow = 'hidden';
  document.body.style.paddingRight = `${scrollBarCompensation}px`;
};

export const unlockScroll = () => {
  document.body.style.overflow = '';
  document.body.style.paddingRight = '';
};
