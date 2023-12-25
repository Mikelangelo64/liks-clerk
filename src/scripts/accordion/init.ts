import { Timeline } from 'vevet';
import vevet from '../config/vevet';

const itemHandler = (
  container: HTMLElement,
  isLabelClick: boolean,
  isOpenOnHover: boolean
) => {
  const elements = container.querySelectorAll<HTMLElement>('.accordion__item');

  if (elements.length === 0) {
    return;
  }

  let arrowClass = '.accordion__summary';

  if (isLabelClick) {
    arrowClass = '.accordion__label';
  }

  elements.forEach((element) => {
    const arrow = element.querySelector<HTMLButtonElement>(`${arrowClass}`);
    const body = element.querySelector<HTMLElement>('.accordion__details');

    if (!arrow || !body) {
      return;
    }

    const bodyInner = body.querySelector<HTMLElement>(
      '.accordion__description'
    );
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
          timeline.reverse();
        } else {
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
    itemHandler(container, isLabelClick, isOpenOnHover);
  });
};

export default accordionInit;
