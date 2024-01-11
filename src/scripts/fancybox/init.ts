import { Fancybox } from '@fancyapps/ui';

const typographyFancyInit = () => {
  const typographyArray = document.querySelectorAll<HTMLElement>(
    '.typography-article .typography.typography-article__content'
  );

  if (typographyArray.length === 0) {
    return;
  }

  typographyArray.forEach(() => {
    Fancybox.bind(`[data-fancybox="typography"]`, {
      ...Fancybox.defaults,
      dragToClose: false,
      backdropClick: 'close',
      compact: false,

      Images: {
        // Disable animation from/to thumbnail on start/close
        zoom: false
      },

      Toolbar: {
        absolute: true,
        display: {
          left: [],
          middle: [],
          right: ['close']
        }
      },

      Thumbs: {
        type: 'classic'
      },

      Carousel: {
        transition: 'crossfade',
        breakpoints: {
          '(max-width: 900px)': {
            Navigation: false
          }
        }
      }
    });
  });
};

const fancyboxInit = () => {
  typographyFancyInit();
};

export default fancyboxInit;
