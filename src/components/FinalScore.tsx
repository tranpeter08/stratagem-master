import {
  Heading,
  CircularProgress,
  CircularProgressLabel,
  Flex,
  Button,
} from '@chakra-ui/react';
import {useEffect, useState} from 'react';

export default function FinalScore({
  score,
  handleReset,
}: {
  score: number;
  handleReset: () => void;
}) {
  const [isindeterminate, setIsindeterminate] = useState(true);
  const value = Math.round((score / 52) * 10000) / 100;

  function handleClick() {
    setIsindeterminate(true);
    handleReset();
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsindeterminate(false);
    }, 1000);

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, []);

  return (
    <Flex flexDirection={'column'} alignItems={'center'}>
      <Heading>Final Score:</Heading>
      <CircularProgress
        thickness="10px"
        size="120px"
        value={value}
        color="blue.400"
        isIndeterminate={isindeterminate}
        mt={4}
      >
        <CircularProgressLabel fontSize={18}>
          {!isindeterminate && `${score}/52`}
        </CircularProgressLabel>
      </CircularProgress>

      <Button
        isDisabled={isindeterminate}
        colorScheme="blue"
        w={36}
        mt={4}
        onClick={handleClick}
      >
        Try Again?
      </Button>
    </Flex>
  );
}
