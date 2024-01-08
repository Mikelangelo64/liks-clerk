const counterInit = () => {
  const counterArray = document.querySelectorAll<HTMLElement>('.counter');
  if (counterArray.length === 0) {
    return;
  }

  counterArray.forEach((counterProp) => {
    const counter = counterProp;

    document.addEventListener('mousedown', (evt) => {
      const plus = counter.querySelector<HTMLButtonElement>('.plus');
      const minus = counter.querySelector<HTMLButtonElement>('.minus');
      const input = counter.querySelector<HTMLInputElement>('input');

      if (!plus || !minus || !input) {
        return;
      }

      const min = input.getAttribute('min') || '1';
      const max = input.getAttribute('max') || '10';

      const target = evt.target as Node | null;

      if (plus.contains(target) && evt.which === 1) {
        input.value = `${+input.value === +max ? max : +input.value + 1}`;
      }

      if (minus.contains(target) && evt.which === 1) {
        input.value = `${+input.value === +min ? min : +input.value - 1}`;
      }

      counter.dataset.value = input.value;

      const counterInputChange = new Event('change');
      input.dispatchEvent(counterInputChange);
    });
  });
};

export default counterInit;
