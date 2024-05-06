import {Box, Progress} from '@chakra-ui/react';
import {useEffect, useState, useRef, Dispatch} from 'react';

export default function ProgressBar({dispatch}: {dispatch: Dispatch<any>}) {
  const [time, setTime] = useState(0);
  let timer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    timer.current = setInterval(() => {
      setTime((t) => t + 25);
    }, 25);

    return () => {
      if (timer.current) {
        clearInterval(timer.current);
      }
    };
  }, []);

  useEffect(() => {
    if (time === 30_000) {
      if (timer.current) {
        clearInterval(timer.current);
      }

      dispatch({type: 'timesup'});
    }
  }, [time, dispatch]);

  return (
    <Box>
      <Progress
        border="1px solid black"
        w={240}
        colorScheme="blue"
        value={(time / 30_000) * 100}
      />
    </Box>
  );
}
