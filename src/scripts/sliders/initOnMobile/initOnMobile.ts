import { IInitializedSlider } from '../init';

const initOnMobile = (sliders: IInitializedSlider[]) => {
  const breakpoint = '(max-width: 899px)';
  const breakpointList = window.matchMedia(breakpoint);

  breakpointList.addEventListener('change', (evt) => {
    // console.log(sliders);

    sliders.forEach((sliderInfo) => {
      if (
        !sliderInfo.isMobileOnly ||
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

export default initOnMobile;
