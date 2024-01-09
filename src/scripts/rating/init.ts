import { Timeline } from 'vevet';
import useObserver from '../config/useObserver';

const ratingInit = () => {
  const containerArray = document.querySelectorAll<HTMLElement>('.rating');

  if (containerArray.length === 0) {
    return;
  }

  containerArray.forEach((container) => {
    const dataStars = container.dataset.rating;
    // const totalDom = container.querySelector<HTMLElement>(
    //   '.rating-total__title'
    // );
    const ratingListDom =
      container.querySelectorAll<HTMLElement>('.rating-list__item');

    if (!dataStars || ratingListDom.length === 0) {
      return;
    }

    const dataArray = dataStars
      .split(',')
      .reverse()
      .map((value) => +value);

    const total = dataArray.reduce((sum, current) => sum + current, 0);

    ratingListDom.forEach((item, index) => {
      const bar = item.querySelector<HTMLElement>('.rating-list-bar__progress');
      const title = item.querySelector<HTMLElement>('.rating-list__count span');

      if (!bar || !title) {
        return;
      }

      title.innerHTML = `${dataArray[index]}`;
      let percent = Math.floor((dataArray[index] / total) * 100 * 100) / 100;
      // console.log(percent);

      // if (percent < 10) {
      //   percent += 10;
      // }

      const timeline = new Timeline({
        duration: 1000
      });

      timeline.addCallback('progress', ({ easing }) => {
        bar.style.transform = `translate(${easing * percent - 100}%, 0)`;
      });

      useObserver({
        target: item,
        isCallOnce: true,
        callbackIn: () => {
          timeline.play();
        }
      });
    });
  });
};

export default ratingInit;
