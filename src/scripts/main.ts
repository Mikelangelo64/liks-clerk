import accordionInit from './accordion/init';
import anchorsInit from './anchor/init';
import barCardsInit from './barCards/init';
import counterInit from './calculateForm/counter/init';
import fadeContentInit from './fadeContent/init';
import grabDesktopInit from './grabDesktop/init';
import headerEvents from './headerEvents/init';
import isViewedHandler, { isVideoViewedHandler } from './isViewedHandler/init';
import marqueeInit from './marquee/init';
import initPopups from './popup/init';
import projectToggle from './projectToggle/init';
import scrollBarInit from './scrollbar';
import slidersInit from './sliders/init';
import submenuToggle from './submenu/init';
import initCalculateForm from './calculateForm/init';
import ratingInit from './rating/init';

export const init = () => {
  scrollBarInit();
  submenuToggle();
  accordionInit();
  slidersInit();

  grabDesktopInit();
  headerEvents();
  fadeContentInit();
  marqueeInit();
  barCardsInit();
  counterInit();
  initCalculateForm();
  ratingInit();
  // console.log(scrollSectionState);

  const popups = initPopups();

  anchorsInit(0, popups);

  isViewedHandler('banner');
  isVideoViewedHandler('banner');

  const formArr = document.querySelectorAll('form');
  const hasError = false;

  if (formArr.length !== 0) {
    formArr.forEach((form) => {
      form.addEventListener('submit', (evt) => {
        evt.preventDefault();
        const inputs = Array.from(
          form.querySelectorAll('input, textarea') as NodeListOf<
            HTMLInputElement | HTMLTextAreaElement
          >
        );

        popups.forEach(({ timeline, isThanks, isError }) => {
          if (isThanks && !hasError) {
            timeline?.play();

            if (inputs.length !== 0) {
              inputs.forEach((inputProp) => {
                const input = inputProp;
                console.log(input, input.value);

                // if (input.type === 'tel') {
                //   return;
                // }

                input.value = '';
              });
            }

            // if (inputMaskArray) {
            //   inputMaskArray.forEach((inputMaskProp) => {
            //     const inputMask = inputMaskProp;
            //     inputMask.value = '';
            //     inputMask.updateValue();
            //   });
            // }
          } else if (isError && hasError) {
            timeline?.play();
          } else {
            timeline?.reverse();

            setTimeout(() => {
              document.querySelector('html')?.classList.add('lock');
              document.querySelector('body')?.classList.add('lock');
            }, 300);
          }
        });
      });
    });

    // document.addEventListener(
    //   'wpcf7mailsent',
    //   function () {
    //     popups.forEach(({ timeline, isThanks, isError }) => {
    //       if (isThanks && !hasError) {
    //         timeline?.play();

    //         formArr.forEach((form) => {
    //           const inputs = Array.from(
    //             form.querySelectorAll('input, textarea') as NodeListOf<
    //               HTMLInputElement | HTMLTextAreaElement
    //             >
    //           );

    //           if (inputs.length !== 0) {
    //             inputs.forEach((inputProp) => {
    //               const input = inputProp;
    //               // if (input.type === 'tel') {
    //               //   return;
    //               // }
    //               input.value = '';
    //             });
    //           }

    //           // if (inputMaskArray) {
    //           //   inputMaskArray.forEach((inputMaskProp) => {
    //           //     const inputMask = inputMaskProp;
    //           //     inputMask.value = '';
    //           //     inputMask.updateValue();
    //           //   });
    //           // }
    //         });
    //       } else if (isError && hasError) {
    //         timeline?.play();
    //       } else {
    //         timeline?.reverse();

    //         setTimeout(() => {
    //           document.querySelector('html')?.classList.add('lock');
    //           document.querySelector('body')?.classList.add('lock');
    //         }, 300);
    //       }
    //     });
    //   },
    //   false
    // );
  }

  projectToggle();
};
