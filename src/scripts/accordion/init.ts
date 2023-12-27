import { Timeline } from 'vevet';
import vevet from '../config/vevet';

const itemHandler = (
  container: HTMLElement,
  isLabelClick: boolean,
  isOpenOnHover: boolean,
  prefix: string | undefined
) => {
  let arrowClass = `.accordion__summary${prefix ? '-' + prefix : ''}`;

  if (isLabelClick) {
    arrowClass = `.accordion__label${prefix ? '-' + prefix : ''}`;
  }

  const elementClass = `.accordion__item${prefix ? '-' + prefix : ''}`;
  const deatailsClass = `.accordion__details${prefix ? '-' + prefix : ''}`;
  const descriptionClass = `.accordion__description${
    prefix ? '-' + prefix : ''
  }`;

  const elements = container.querySelectorAll<HTMLElement>(`${elementClass}`);

  if (elements.length === 0) {
    return;
  }

  // console.log(container, arrowClass);

  // let arrowClass = '.accordion__summary';

  if (isLabelClick) {
    arrowClass = '.accordion__label';
  }

  elements.forEach((element) => {
    const arrow = element.querySelector<HTMLButtonElement>(`${arrowClass}`);
    const body = element.querySelector<HTMLElement>(`${deatailsClass}`);

    if (!arrow || !body) {
      return;
    }

    const bodyInner = body.querySelector<HTMLElement>(`${descriptionClass}`);
    if (!bodyInner) {
      return;
    }

    const timeline = new Timeline({ duration: 400 });
    timeline.addCallback('progress', ({ easing, progress }) => {
      const height =
        progress === 1 ? 'auto' : `${bodyInner.clientHeight * easing}px`;

      body.style.height = height;
      body.style.opacity = `${easing}`;
    });

    if (!vevet.isMobile && isOpenOnHover) {
      element.addEventListener('mouseenter', () => {
        element.classList.add('_active');
        timeline.play();
      });

      element.addEventListener('mouseleave', () => {
        element.classList.remove('_active');
        timeline.reverse();
      });
    } else {
      arrow.addEventListener('click', () => {
        element.classList.toggle('_active');

        if (timeline.progress > 0) {
          if (prefix) {
            arrow.innerHTML = `<span>Load more</span>`;
          }

          timeline.reverse();
        } else {
          if (prefix) {
            arrow.innerHTML = `<span>Hide</span>`;
          }

          timeline.play();
        }
      });
    }
  });
};

const accordionInit = () => {
  const containerArray = document.querySelectorAll<HTMLElement>('.accordion');

  if (containerArray.length === 0) {
    return;
  }

  containerArray.forEach((container) => {
    const isLabelClick = container.dataset.isLabelClick === 'true';
    const isOpenOnHover = container.dataset.isOpenOnHover === 'true';
    const prefix = container.dataset.prefix;
    itemHandler(container, isLabelClick, isOpenOnHover, prefix);
  });
};

export default accordionInit;
