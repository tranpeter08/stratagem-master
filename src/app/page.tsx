'use client';
import styles from './page.module.css';
import {useState, useEffect, useReducer, useRef} from 'react';
import {keymap} from '@/utils';
import {Box, Flex, Heading} from '@chakra-ui/react';
import ArrowIcon from '@/components/ArrowIcon';
import {getStratagems} from '@/database/StratagemService';
import type {Stratagem} from '@/utils';
import Loading from '@/components/Loading';
import ProgressBar from '@/components/ProgressBar';
import {inititalState, reducer} from './reducer';
import FinalScore from '@/components/FinalScore';
import Instructions from '@/components/Instructions';

export type AudioPlayer = {
  [buzzer: string]: HTMLAudioElement;
  armed: HTMLAudioElement;
  u: HTMLAudioElement;
  d: HTMLAudioElement;
  l: HTMLAudioElement;
  r: HTMLAudioElement;
};

export default function Home() {
  const audio = useRef<AudioPlayer | null>(null);
  const [state, dispatch] = useReducer(reducer, inititalState);
  const {
    direction,
    correct,
    score,
    images,
    stratagemIndex,
    stratagems,
    loading,
    start,
    complete,
    end,
  } = state;

  const currentStratagem = stratagems[stratagemIndex] as Stratagem;
  const currentStratagemImg = images[stratagemIndex];
  const isFinished = stratagemIndex >= stratagems.length || end;

  if (start && direction && audio.current && !isFinished) {
    if (correct) {
      if (complete) {
        audio.current?.armed.load();
        audio.current?.armed.play().catch(() => {});
      }

      if (direction in audio.current) {
        const dirMedia = audio.current?.[direction];
        dirMedia?.load();
        dirMedia?.play().catch(() => {});
      }
    }

    if (!correct) {
      audio.current?.buzzer.load();
      audio.current?.buzzer.play().catch(() => {});
    }
  }

  const codeIcons = [];

  if (currentStratagem) {
    for (let i = 0; i < currentStratagem.code.length; i++) {
      let direction = currentStratagem.code[i];
      codeIcons.push(
        <ArrowIcon
          key={currentStratagem.name + '-' + i}
          direction={direction}
          style={i < state.codeIndex ? 'c' : ''}
        />
      );
    }
  }

  function handleStart() {
    dispatch({type: 'toggle-start'});
  }

  async function getStratagemData() {
    try {
      const d = await getStratagems();
      dispatch({type: 'stratagems', stratagems: d.data as Stratagem[]});
    } catch (error) {
      console.log(error);
    }
  }

  function handleReset() {
    getStratagemData();
  }

  useEffect(() => {
    audio.current = {
      u: new Audio('/media/up.m4a'),
      d: new Audio('/media/down.m4a'),
      l: new Audio('/media/left.m4a'),
      r: new Audio('/media/right.m4a'),
      buzzer: new Audio('/media/buzzer.m4a'),
      armed: new Audio('/media/armed.m4a'),
    };

    function handleKeypress(e: KeyboardEvent) {
      const key = e.key.toLowerCase();

      if (key in keymap) {
        dispatch({type: 'keyup', key: key});
      }
    }

    document.addEventListener('keyup', handleKeypress);
    getStratagemData();

    return () => {
      document.removeEventListener('keyup', handleKeypress);
    };
  }, []);

  return (
    <main className={styles.main}>
      <Flex flexDirection="column" alignItems="center" p={8}>
        {loading && <Loading />}
        {!loading && !start && <Instructions handleStart={handleStart} />}
        {!loading && start && !isFinished && (
          <Flex flexDir="column" alignItems="center" gap={4}>
            <Heading as="h1" size="md">
              {currentStratagem.name}
            </Heading>
            <Box h="70px">{currentStratagemImg}</Box>
            <Flex gap={2} height="28px">
              {codeIcons}
            </Flex>
            <ProgressBar dispatch={dispatch} />
            <p>Score: {score}</p>
          </Flex>
        )}
        {!loading && isFinished && (
          <FinalScore score={score} handleReset={handleReset} />
        )}
      </Flex>
    </main>
  );
}
