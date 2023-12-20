import vevet from '../config/vevet';
import initPaginationChanger from './dynamicPagination/init';
import initOnMobile from './initOnMobile/initOnMobile';
import makeSlider from './sliderHandler';
import Swiper from 'swiper';

export interface IInitializedSlider {
  name: string;
  slider: Swiper | undefined;
  initFunc?: (
    sliders: Array<IInitializedSlider>,
    isModifyArary?: boolean
  ) => void;
  isDynamicPagination?: boolean;
  isMobileOnly?: boolean;
}

const sliderPotentailInit = (
  sliders: Array<IInitializedSlider>,
  isModifyArary?: boolean
) => {
  const sectionArray = document.querySelectorAll(
    '.potential'
  ) as NodeListOf<HTMLElement>;

  if (sectionArray.length === 0) {
    return;
  }

  sectionArray.forEach((item, sliderIndex) => {
    const containerArray =
      item.querySelectorAll<HTMLElement>('.potential__main');

    if (containerArray.length === 0) {
      return;
    }

    containerArray.forEach((container, innerIndex) => {
      const slider = makeSlider({
        container: container,
        className: 'potential',

        renderBullets(index, className) {
          return `
            <button class="${className}">
            </button>
          `;
        },

        config: {
          allowTouchMove: true,
          slidesPerView: 'auto',
          // slidesPerGroup: 1,
          spaceBetween: 16,
          // loop: true,

          // autoplay: {
          //   // delay: 2000,
          //   disableOnInteraction: false
          // }
          breakpoints: {
            // 900: {
            //   slidesPerView: 2,
            //   slidesPerGroup: 2
            // },
            // 1200: {
            //   slidesPerView: 3,
            //   slidesPerGroup: 3
            // }
          }
        }
      });

      if (slider) {
        const name = `potential-${sliderIndex}-${innerIndex}`;

        if (!isModifyArary) {
          const info: IInitializedSlider = {
            name,
            slider,
            isMobileOnly: true,
            initFunc: sliderPotentailInit
          };

          // еще не обновляется состояния дайнемик - потом допилить
          sliders.push(info);
          return;
        }

        sliders.forEach((sliderInfoProp) => {
          const sliderInfo = sliderInfoProp;

          if (sliderInfo.name !== name) {
            return;
          }

          sliderInfo.slider = slider;
        });
      }
    });
  });
};

const sliderShowcaseInit = (sliders: Array<IInitializedSlider>) => {
  const sectionArray = document.querySelectorAll(
    '.showcase'
  ) as NodeListOf<HTMLElement>;

  if (sectionArray.length === 0) {
    return;
  }

  sectionArray.forEach((item, sliderIndex) => {
    const containerArray =
      item.querySelectorAll<HTMLElement>('.showcase__main');

    if (containerArray.length === 0) {
      return;
    }

    containerArray.forEach((container, innerIndex) => {
      const slider = makeSlider({
        container: container,
        className: 'showcase',

        renderBullets(index, className) {
          return `
            <button class="${className}">
            </button>
          `;
        },

        config: {
          allowTouchMove: true,
          slidesPerView: 1,
          slidesPerGroup: 1,
          spaceBetween: 24,
          // loop: true,

          // autoplay: {
          //   // delay: 2000,
          //   disableOnInteraction: false
          // }
          breakpoints: {
            900: {
              slidesPerView: 2,
              slidesPerGroup: 2
            },
            1200: {
              slidesPerView: 3,
              slidesPerGroup: 3
            }
          }
        }
      });

      if (slider) {
        const info: IInitializedSlider = {
          name: `showcase-${sliderIndex}-${innerIndex}`,
          slider
        };

        initPaginationChanger(info);

        // еще не обновляется состояния дайнемик - потом допилить
        sliders.push(info);
      }
    });
  });
};

const slidersInit = () => {
  const sliders: Array<IInitializedSlider> = [];

  sliderShowcaseInit(sliders);

  sliderPotentailInit(sliders);

  sliders.forEach((sliderInfo) => {
    if (
      !sliderInfo.isMobileOnly ||
      !sliderInfo.slider ||
      !sliderInfo.initFunc
    ) {
      return;
    }

    if (!vevet.viewport.isPhone) {
      sliderInfo.slider.destroy();
    }
  });

  initOnMobile(sliders);
  return sliders;
};

export default slidersInit;
