import rangeBarInit from './rangeBar/init';

export const calculateAll = (
  gloablInputProp: HTMLInputElement,
  rangeBars: NodeListOf<HTMLElement>,
  counter: HTMLElement,
  titleProp: HTMLElement
) => {
  const gloablInput = gloablInputProp;
  const title = titleProp;
  const multiply = counter.dataset.value ? +counter.dataset.value : 1;
  let sumBars = 0;

  rangeBars.forEach((rangeBar) => {
    const input = rangeBar.querySelector<HTMLElement>(
      '.calculate-form-range__input'
    );
    if (!input) {
      return;
    }

    const value = input.dataset.value;
    sumBars += value ? +value : 0;
  });

  gloablInput.value = `${sumBars * multiply}`;
  title.innerHTML = `$${gloablInput.value}`;
};

const counterChange = (
  globalInput: HTMLInputElement,
  rangeBars: NodeListOf<HTMLElement>,
  counter: HTMLElement,
  title: HTMLElement
) => {
  const input = counter.querySelector<HTMLInputElement>('input');
  if (!input) {
    return;
  }

  input.addEventListener('change', () => {
    calculateAll(globalInput, rangeBars, counter, title);
  });
};

const initCalculateForm = () => {
  const containerArray =
    document.querySelectorAll<HTMLElement>('.calculate-form');
  if (containerArray.length === 0) {
    return;
  }

  containerArray.forEach((container) => {
    const globalInput = container.querySelector<HTMLInputElement>(
      '.calculate-form-global-input'
    );

    const counter = container.querySelector<HTMLElement>('.counter');

    const title = container.querySelector<HTMLElement>(
      '.calculate-form__value'
    );

    if (!globalInput || !counter || !title) {
      return;
    }

    const rangeBars = rangeBarInit(container, globalInput, counter, title);

    calculateAll(globalInput, rangeBars, counter, title);
    // console.log(globalInput);
    counterChange(globalInput, rangeBars, counter, title);
  });
};

export default initCalculateForm;
