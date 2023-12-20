import initPaginationChanger from './dynamicPagination/init';
import makeSlider from './sliderHandler';
import Swiper from 'swiper';

export interface IInitializedSlider {
  name: string;
  slider: Swiper | undefined;
  isDynamicPagination?: boolean;
}

const sliderSghowcaseInit = (sliders: Array<IInitializedSlider>) => {
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

  sliderSghowcaseInit(sliders);

  return sliders;
};

export default slidersInit;
