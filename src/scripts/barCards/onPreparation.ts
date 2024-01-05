export const onPreparation = (
  array: NodeListOf<HTMLElement>,
  minWidth: number
) => {
  let maxWidth = minWidth;
  array.forEach((elementProp) => {
    const element = elementProp;

    if (element.classList.contains('active')) {
      const content = element.querySelector<HTMLElement>('.bar-cards__content');
      if (!content) {
        return;
      }

      const contentInner = content.querySelector<HTMLElement>(
        '.bar-cards__content__inner'
      );
      if (!contentInner) {
        return;
      }

      element.style.width = '';
      element.style.height = '';

      const standartHeight = content.clientHeight;
      const contentHeight = contentInner.clientHeight;
      const differ = contentHeight - standartHeight;

      element.style.height = `${element.clientHeight + differ}px`;
      maxWidth = element.clientWidth;
      element.style.width = `${maxWidth}px`;
    }
  });

  return maxWidth;
};
