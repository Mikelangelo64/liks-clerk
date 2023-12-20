import { IInitializedSlider } from '../init';

const initOnDesktop = (sliders: IInitializedSlider[]) => {
  const breakpoint = '(min-width: 900px)';
  const breakpointList = window.matchMedia(breakpoint);

  breakpointList.addEventListener('change', (evt) => {
    // console.log(sliders);

    sliders.forEach((sliderInfo) => {
      if (
        !sliderInfo.isDesktopOnly ||
        !sliderInfo.slider ||
        !sliderInfo.initFunc
      ) {
        return;
      }

      if (evt.matches) {
        sliderInfo.initFunc(sliders, true);
      } else {
        sliderInfo.slider?.destroy();
      }
    });
  });
};

export default initOnDesktop;
