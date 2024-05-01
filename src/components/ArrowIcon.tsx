import {
  ArrowBackIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  ArrowForwardIcon,
} from '@chakra-ui/icons';
import { Box, ComponentWithAs, Flex, IconProps } from '@chakra-ui/react';
import styles from './ArrowIcon.module.css';
import clsx from 'clsx';

export default function ArrowIcon({
  direction,
  style,
}: {
  direction: string;
  style?: string;
}) {
  const iconMap: { [key: string]: ComponentWithAs<'svg', IconProps> } = {
    u: ArrowUpIcon,
    d: ArrowDownIcon,
    l: ArrowBackIcon,
    r: ArrowForwardIcon,
  };

  const IconElem = iconMap[direction];

  return (
    <Flex
      placeContent='center'
      padding={2}
      border='1px solid black'
      borderRadius='10px'
      background={style === 'c' ? 'darkcyan' : 'white'}
    >
      <IconElem
        color={style === 'c' ? 'white' : 'black'}
        fontWeight={800}
        boxSize={6}
      />
    </Flex>
  );
}
