type Stratagem = {
  id: number;
  title: string;
  code: string;
  category: number;
};

export const stratagems: Stratagem[] = [
  { id: 0, title: 'Gatling Sentry Gun', code: 'durl', category: 3 },
  { id: 1, title: 'Eagle Air Strike', code: 'urdr', category: 0 },
];

export const keymap: { [key: string]: string } = {
  w: 'u',
  s: 'd',
  a: 'l',
  d: 'r',
  arrowup: 'u',
  arrowdown: 'd',
  arrowleft: 'l',
  arrowright: 'r',
};
