import { Timeline } from 'vevet';
import clickHandler from './clickHandler';
import debounce from '../config/debounce';
import { makeTimeline } from './makeTimeline';
import { onPreparation } from './onPreparation';
import vevet from '../config/vevet';

export interface IDataWidth {
  minWidth: number;
  maxWidth: number;
}

const barCardsInit = () => {
  const containerArray = document.querySelectorAll<HTMLElement>(
    '.bar-cards[data-bar-section="true"]'
  );

  if (containerArray.length === 0) {
    return;
  }

  containerArray.forEach((container) => {
    const dataWidth: IDataWidth = {
      minWidth: 0,
      maxWidth: 0
    };

    let listenerArray: Array<() => void> = [];

    let isLaunch = !vevet.viewport.isPhone;

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
      if (vevet.viewport.isPhone) {
        return;
      }

      maxWidth = onPreparation(array, minWidth);
      dataWidth.maxWidth = maxWidth;

      const timeline = makeTimeline(item, dataWidth, array, container);

      timelineArray.push(timeline);
    });

    // execute loop
    itemArray.forEach((item, index) => {
      if (vevet.viewport.isPhone) {
        return;
      }

      const listener = clickHandler(
        index,
        itemArray,
        timelineArray,
        container,
        dataWidth
      );

      listenerArray.push(listener);
    });

    window.addEventListener(
      'resize',
      debounce({
        callback: () => {
          if (!vevet.viewport.isPhone) {
            maxWidth = onPreparation(itemArray, minWidth);
            dataWidth.maxWidth = maxWidth;
          } else {
            isLaunch = false;

            listenerArray.forEach((listener, index) => {
              const button = itemArray[index].querySelector<HTMLButtonElement>(
                '.bar-cards__item__inner'
              );

              if (!button) {
                return;
              }

              button.removeEventListener('click', listener);
            });

            listenerArray = [];
            // container.classList.add('mobile');

            itemArray.forEach((itemProp) => {
              const item = itemProp;
              item.style.width = '';
              item.style.height = '';
            });

            return;
          }

          if (!vevet.viewport.isPhone && !isLaunch) {
            isLaunch = true;

            container.classList.remove('mobile');

            itemArray.forEach((item, index) => {
              const listener = clickHandler(
                index,
                itemArray,
                timelineArray,
                container,
                dataWidth
              );

              listenerArray.push(listener);
            });
          }
        }
      })
    );
  });
};

export default barCardsInit;
