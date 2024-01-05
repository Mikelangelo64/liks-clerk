import { Timeline } from 'vevet';
import { IDataWidth } from './init';

const createAdditionalTimeline = (
  itemProp: HTMLElement,
  previousHeight: number,
  array: NodeListOf<HTMLElement>
) => {
  const item = itemProp;
  const content = item.querySelector<HTMLElement>('.bar-cards__content');
  if (!content) {
    return;
  }

  const contentInner = content.querySelector<HTMLElement>(
    '.bar-cards__content__inner'
  );
  if (!contentInner) {
    return;
  }

  const timeline = new Timeline({ duration: 400, shouldDestroyOnEnd: true });
  const standartHeight = content.clientHeight;
  const contentHeight = contentInner.clientHeight;
  const differ = contentHeight - standartHeight;

  timeline.addCallback('progress', ({ progress, easing }) => {
    item.style.height = `${previousHeight + differ * easing}px`;

    if (progress === 0) {
      // item.style.height = '';
      array.forEach((elementProp) => {
        const element = elementProp;

        if (element !== item) {
          element.style.height = '';
        }
      });
    }
  });

  timeline.play();
};

export const makeTimeline = (
  itemProp: HTMLElement,
  dataWidth: IDataWidth,
  array: NodeListOf<HTMLElement>,
  container: HTMLElement
) => {
  const item = itemProp;
  const timeline = new Timeline({ duration: 800 });

  timeline.addCallback('progress', ({ easing, progress }) => {
    // main manipulations
    if (progress === 1) {
      item.style.width = `${dataWidth.maxWidth}px`;
    } else {
      const currentProgress =
        dataWidth.minWidth > progress * dataWidth.maxWidth
          ? dataWidth.minWidth
          : easing * dataWidth.maxWidth;

      item.style.width = progress === 0 ? '' : `${currentProgress}px`;
    }

    // add/remove progress
    container.classList.add('progress');
    item.classList.add('progress');

    if (progress === 1 || progress === 0) {
      container.classList.remove('progress');
      item.classList.remove('progress');
    }

    // remove progress/previous classes
    if (timeline.isReversed) {
      if (progress === 0) {
        array.forEach((element) => {
          element.classList.remove('other-progress');
          element.classList.remove('previous');
        });
      }
    }

    if (!timeline.isReversed) {
      if (progress === 1) {
        createAdditionalTimeline(item, item.clientHeight, array);

        array.forEach((element) => {
          element.classList.remove('other-progress');
        });
      }
    }
  });

  if (item.classList.contains('active')) {
    timeline.progress = 1;
  }

  return timeline;
};
