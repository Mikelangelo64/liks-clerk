const makeActiveStars = (
  arr: HTMLElement[],
  activeIndex: number,
  inputProp: HTMLInputElement
) => {
  const input = inputProp;
  const data = arr[activeIndex].dataset.rating || '5';

  input.value = data;

  arr.forEach((item, index) => {
    if (activeIndex >= index) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
};

const setStars = () => {
  const containerArray = document.querySelectorAll<HTMLElement>('.form-group');
  if (containerArray.length === 0) {
    return;
  }

  containerArray.forEach((container) => {
    const stars = container.querySelectorAll<HTMLElement>(
      '.ec-rating-stars span'
    );
    const input = container.querySelector<HTMLInputElement>('input');

    if (stars.length === 0 || !input) {
      return;
    }

    Array.from(stars).forEach((item, index, arr) => {
      item.addEventListener('click', () => {
        makeActiveStars(arr, index, input);
      });
    });
  });
};

export default setStars;
