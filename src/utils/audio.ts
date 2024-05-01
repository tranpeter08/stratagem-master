export const buzzer = new Audio('/media/buzzer.m4a');
export const armed = new Audio('/media/armed.m4a');
export const dirAudio: { [key: string]: HTMLAudioElement } = {
  u: new Audio('/media/up.m4a'),
  d: new Audio('/media/down.m4a'),
  l: new Audio('/media/left.m4a'),
  r: new Audio('/media/right.m4a'),
};
