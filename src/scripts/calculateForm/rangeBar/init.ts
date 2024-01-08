import { calculateAll } from '../init';
import rangeSliderInit from './rangeSlider';

interface IRangeEvent extends CustomEvent {
  detail: {
    value: number;
  };
}

const rangeBarInit = (
  parent: HTMLElement,
  globalInputProp: HTMLInputElement,
  counter: HTMLElement,
  title: HTMLElement
) => {
  const globalInput = globalInputProp;
  rangeSliderInit();

  const containerArray = parent.querySelectorAll<HTMLElement>(
    '.calculate-form-range'
  );
  if (containerArray.length === 0) {
    return containerArray;
  }

  containerArray.forEach((container) => {
    const rangeBars = container.querySelectorAll<HTMLElement>('.r-slider');
    const label = container.querySelector<HTMLElement>(
      '.calculate-form-range__value'
    );

    if (rangeBars.length === 0 || !label) {
      return;
    }

    rangeBars.forEach((rangeBar) => {
      label.innerHTML = `${rangeBar.dataset.value}`;
      label.dataset.range = `${rangeBar.dataset.value}`;

      rangeBar.addEventListener('r-slider-updated', (e) => {
        const evt = e as IRangeEvent;
        const value = evt.detail.value;
        globalInput.value = `${value}`;

        label.innerHTML = `${value}`;
        label.dataset.range = `${value}`;

        calculateAll(globalInput, containerArray, counter, title);
        // globalInput.innerHTML = `${value}`;
        // console.log(globalInput.value);
      });
    });
  });

  return containerArray;
};

export default rangeBarInit;
