export type Stratagem = {
  id: number;
  name: string;
  code: string;
  category: number;
  img: string;
};

export const keymap: {[key: string]: string} = {
  w: 'u',
  s: 'd',
  a: 'l',
  d: 'r',
  arrowup: 'u',
  arrowdown: 'd',
  arrowleft: 'l',
  arrowright: 'r',
};

export function randomOrder(n: number) {
  const selected: {[key: number]: boolean} = {};
  const order = [];

  while (order.length < n) {
    const index = getRandomIntInclusive(0, n - 1);

    if (!(index in selected)) {
      selected[index] = true;
      order.push(index);
    }
  }

  return order;
}

export function getRandomIntInclusive(min: number, max: number) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
}
