import { Timeline } from 'vevet';
import clickHandler from './clickHandler';
import debounce from '../config/debounce';
import { makeTimeline } from './makeTimeline';
import { onPreparation } from './onPreparation';

export interface IDataWidth {
  minWidth: number;
  maxWidth: number;
}

const barCardsInit = () => {
  const containerArray = document.querySelectorAll<HTMLElement>('.bar-cards');

  if (containerArray.length === 0) {
    return;
  }

  containerArray.forEach((container) => {
    const dataWidth: IDataWidth = {
      minWidth: 0,
      maxWidth: 0
    };

    const minWidth = +getComputedStyle(container)
      .getPropertyValue('--minimal-width')
      .slice(0, -2);

    const itemArray =
      container.querySelectorAll<HTMLElement>('.bar-cards__item');

    if (itemArray.length === 0 || Number.isNaN(minWidth)) {
      return;
    }

    const timelineArray: Timeline[] = [];
    let maxWidth = minWidth;

    dataWidth.minWidth = minWidth;
    dataWidth.maxWidth = maxWidth;

    // preparation loop
    itemArray.forEach((item, index, array) => {
      maxWidth = onPreparation(array, minWidth);
      dataWidth.maxWidth = maxWidth;

      const timeline = makeTimeline(item, dataWidth, array, container);

      timelineArray.push(timeline);
    });

    // execute loop
    itemArray.forEach((item, index) => {
      clickHandler(index, itemArray, timelineArray, container, dataWidth);
    });

    window.addEventListener(
      'resize',
      debounce({
        callback: () => {
          maxWidth = onPreparation(itemArray, minWidth);
          dataWidth.maxWidth = maxWidth;
        }
      })
    );
  });
};

export default barCardsInit;
