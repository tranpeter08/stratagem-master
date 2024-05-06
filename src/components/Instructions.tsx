import {Flex, Heading, Text, Kbd, Button, Box} from '@chakra-ui/react';
import {useEffect, useRef, useState} from 'react';

export default function Instructions({handleStart}: {handleStart: () => void}) {
  const startAudio = useRef<HTMLAudioElement | null>(null);

  function handleClick() {
    if (startAudio.current) {
      startAudio.current.load();
      startAudio.current.play();
    }

    handleStart();
  }

  useEffect(() => {
    startAudio.current = new Audio('/media/start.m4a');
  }, []);

  return (
    <Flex flexDirection={'column'} alignItems="center" width={320}>
      <Heading as="h1" textAlign="center">
        Instructions
      </Heading>
      <Box mt={8}>
        <Text>Greetings, Helldiver!</Text>
        <Text mt={2}>
          Test your stratagem mastery by inputing the correct code to activate
          each stratagem. You will have 30 seconds to input as many correct
          codes as you can. There are a total of 52 stratagems. Good luck!
        </Text>
      </Box>
      <Box mt={8}>
        <Heading as="h2" size="md" textDecoration="underline">
          Controls:
        </Heading>
        <Text mt={2}>
          Up = <Kbd>W</Kbd> or <Kbd>↑</Kbd>
        </Text>
        <Text>
          Down = <Kbd>S</Kbd> or <Kbd>↓</Kbd>
        </Text>
        <Text>
          Left = <Kbd>A</Kbd> or <Kbd>←</Kbd>
        </Text>
        <Text>
          Right = <Kbd>D</Kbd> or <Kbd>→</Kbd>
        </Text>
      </Box>
      <Flex placeContent="center" mt={8}>
        <Button width="80px" colorScheme="blue" onClick={handleClick}>
          Start
        </Button>
      </Flex>
    </Flex>
  );
}
