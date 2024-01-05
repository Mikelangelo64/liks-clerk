import { Timeline } from 'vevet';
import { IDataWidth } from './init';
import { makeTimeline } from './makeTimeline';

const clickHandler = (
  currentIndex: number,
  arrayProp: NodeListOf<HTMLElement>,
  timelineArrayProp: Timeline[],
  container: HTMLElement,
  dataWidth: IDataWidth
) => {
  const array = arrayProp;
  let timelineArray = timelineArrayProp;
  const currentItem = array[currentIndex];
  // const timeline = timelineArray[currentIndex];

  const button = currentItem.querySelector<HTMLButtonElement>(
    '.bar-cards__item__inner'
  );
  if (!button) {
    return;
  }

  button.addEventListener('click', () => {
    if (currentItem.classList.contains('active')) {
      return;
    }

    timelineArray = [];

    array.forEach((item) => {
      const timeline = makeTimeline(item, dataWidth, array, container);
      timelineArray.push(timeline);
    });

    const timeline = timelineArray[currentIndex];

    timeline.addCallback('end', () => {
      timelineArray.forEach((tm) => {
        tm.destroy();
      });
    });

    array.forEach((element, index) => {
      if (element.classList.contains('active')) {
        timelineArray[index].reverse();
        element.classList.add('previous');
      } else if (element !== currentItem) {
        element.classList.add('other-progress');
      }

      element.classList.remove('active');
    });

    if (timeline.progress > 0) {
      currentItem.classList.remove('active');
      timeline.reverse();
    } else {
      currentItem.classList.add('active');
      timeline.play();
    }
  });
};

export default clickHandler;
