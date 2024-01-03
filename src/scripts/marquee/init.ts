import { Marquee } from 'vevet';
import useObserver from '../config/useObserver';

const marqueeInit = () => {
  const list = document.querySelectorAll(
    '.marquee'
  ) as NodeListOf<HTMLDivElement>;

  const marqueeList: Marquee[] = [];

  if (list.length === 0) {
    return;
  }

  list.forEach((item) => {
    const marquee = new Marquee({
      container: item,
      // resize: 'w',
      prependWhitespace: false,
      speed: 1,
      isEnabled: true
    });

    marqueeList.push(marquee);

    useObserver({
      target: item,
      callbackIn: () => {
        marquee.changeProps({ isEnabled: true });
      },
      callbackOut: () => {
        marquee.changeProps({ isEnabled: false });
      }
    });
  });
};

export default marqueeInit;
