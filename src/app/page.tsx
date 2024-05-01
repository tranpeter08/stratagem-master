'use client';
import Image from 'next/image';
import styles from './page.module.css';
import { ReactElement, useEffect, useReducer } from 'react';
import { keymap, stratagems } from '@/utils';
import { armed, buzzer, dirAudio } from '@/utils/audio';

import {} from '@chakra-ui/next-js';
import { Box, ComponentWithAs, Flex, IconProps } from '@chakra-ui/react';
import ArrowIcon from '@/components/ArrowIcon';

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
};

const inititalState: InititalState = {
  key: '',
  stratagemIndex: 0,
  codeIndex: 0,
  direction: '',
  complete: false,
  correct: false,
  end: false,
  score: 0,
  entries: '',
};

function reducer(state = inititalState, action: any) {
  switch (action.type) {
    case 'keyup':
      const userDir = keymap[action.key];
      let { codeIndex, stratagemIndex, correct, end, score } = state;
      let complete = false;
      let stratagem = stratagems[stratagemIndex];
      let correctDir = stratagem.code[codeIndex];
      let entries = '';

      if (userDir === correctDir) {
        codeIndex += 1;
        correct = true;
        entries = state.entries + userDir;

        // handle last code index
        if (codeIndex === stratagem.code.length) {
          complete = true;
          codeIndex = 0;
          stratagemIndex += 1;
          score += 1;
          entries = '';
        }

        // handle last strategem index
        if (stratagemIndex === stratagems.length) {
          stratagemIndex -= 1;
          end = true;
        }
      } else {
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
        end,
        score,
        entries,
      };

    default:
      return state;
  }
}

export default function Home() {
  const [state, dispatch] = useReducer(reducer, inititalState);
  const currentStratagem = stratagems[state.stratagemIndex];
  const { direction, complete, correct, score, entries } = state;

  if (direction) {
    if (complete) {
      armed.load();
      armed.play();
    }

    if (correct) {
      const dirMedia = dirAudio[direction];
      dirMedia.load();
      dirMedia.play();
    }

    if (!correct) {
      buzzer.load();
      buzzer.play();
    }
  }

  const codeIcons = [];

  for (let i = 0; i < currentStratagem.code.length; i++) {
    let direction = currentStratagem.code[i];
    codeIcons.push(
      <ArrowIcon
        key={currentStratagem.title + '-' + direction}
        direction={direction}
        style={i < state.codeIndex ? 'c' : ''}
      />
    );
  }

  useEffect(() => {
    function handleKeypress(e: KeyboardEvent) {
      const key = e.key.toLowerCase();

      if (key in keymap) {
        dispatch({ type: 'keyup', key: key });
      }
    }

    document.addEventListener('keyup', handleKeypress);

    return () => {
      document.removeEventListener('keyup', handleKeypress);
    };
  }, [dispatch]);

  return (
    <main className={styles.main}>
      <p>Stratagem: {currentStratagem.title}</p>
      <p>Code: </p>
      <Flex gap={2}>{codeIcons}</Flex>
      <p>You pressed: {state.key}</p>
      <p>entry: {entries}</p>
      <p>Score: {score}</p>
      <p>{state.end && 'END!!!!'}</p>
    </main>
  );
}
