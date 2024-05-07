import StratagemImg from '@/components/StratagemImg';
import type {Stratagem} from '@/utils';
import {keymap, randomOrder} from '@/utils';

type InititalState = {
  key: string;
  stratagemIndex: number;
  codeIndex: number;
  direction: string;
  complete: boolean;
  correct: boolean;
  end: boolean;
  score: number;
  entries: string;
  stratagems: Stratagem[];
  images: JSX.Element[];
  loading: boolean;
  start: boolean;
  showControls: boolean;
};

export const inititalState: InititalState = {
  key: '',
  stratagemIndex: 0,
  codeIndex: 0,
  direction: '',
  complete: false,
  correct: false,
  end: false,
  score: 0,
  entries: '',
  stratagems: [],
  images: [],
  loading: true,
  start: false,
  showControls: false,
};

export function reducer(state: InititalState, action: any) {
  switch (action.type) {
    case 'toggle-controls':
      return {...state, showControls: !state.showControls};
    case 'toggle-start':
      return {...state, start: true};

    case 'reset':
      return {
        ...inititalState,
        loading: false,
        showControls: state.showControls,
      };

    case 'timesup':
      return {...state, end: true};

    case 'stratagems':
      const order = randomOrder(action.stratagems.length);
      const statagemList = [];
      const imgList = [];

      for (const i of order) {
        statagemList.push(action.stratagems[i]);
        imgList.push(<StratagemImg imgData={action.stratagems[i]} />);
      }

      return {
        ...inititalState,
        stratagems: statagemList,
        images: imgList,
        loading: false,
        end: false,
        showControls: state.showControls,
      };

    case 'keyup':
      let {codeIndex, stratagemIndex, correct, score, stratagems, start} =
        state;

      if (!start) return {...state};

      if (stratagemIndex === stratagems.length) {
        return {...state, direction: '', entries: ''};
      }

      let complete = false;
      let stratagem = stratagems[stratagemIndex];
      let correctDir = stratagem.code[codeIndex];
      let entries = '';
      const userDir = keymap[action.key];

      if (userDir === correctDir) {
        correct = true;
        entries = state.entries + userDir;

        // handle last code index
        if (codeIndex + 1 < stratagem.code.length) {
          codeIndex += 1;
        } else {
          complete = true;
          codeIndex = 0;
          score += 1;
          entries = '';
          stratagemIndex += 1;
        }
      } else {
        // handle incorrect direction
        codeIndex = 0;
        correct = false;
        entries = '';
      }

      return {
        ...state,
        key: action.key,
        codeIndex,
        stratagemIndex,
        direction: userDir,
        correct,
        complete,
        score,
        entries,
      };

    default:
      return state;
  }
}
