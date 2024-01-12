const setPaddingTop = (
  navigation: HTMLElement,
  navigationContainer: HTMLElement,
  itemProp: HTMLElement
) => {
  const item = itemProp;
  const paddingTop = navigation.offsetTop - navigationContainer.offsetTop;

  item.style.paddingTop = `${paddingTop}px`;
};

const clientsPreviewHelper = () => {
  const containerArray = document.querySelectorAll<HTMLElement>(
    '.clients-preview .clients-preview__main.desktop'
  );
  if (containerArray.length === 0) {
    return;
  }

  containerArray.forEach((container) => {
    const navigationContainer = container.querySelector<HTMLElement>(
      '.clients-preview-navigation'
    );
    if (!navigationContainer) {
      return;
    }

    const navigationArray = navigationContainer.querySelectorAll<HTMLElement>(
      '.clients-preview-navigation li'
    );
    if (navigationArray.length === 0) {
      return;
    }

    const elementArray = container.querySelectorAll<HTMLElement>(
      '.clients-preview-comment'
    );
    if (elementArray.length === 0) {
      return;
    }

    navigationArray.forEach((navigation, index) => {
      setPaddingTop(navigation, navigationContainer, elementArray[index]);
    });
  });
};

export default clientsPreviewHelper;
