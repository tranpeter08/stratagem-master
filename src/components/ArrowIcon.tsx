import {
  ArrowBackIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  ArrowForwardIcon,
} from '@chakra-ui/icons';
import {ComponentWithAs, Flex, IconProps} from '@chakra-ui/react';
import {useEffect, useState} from 'react';

type IconMap = {
  [key: string]: {icon: ComponentWithAs<'svg', IconProps>; title: string};
};

export default function ArrowIcon({
  direction,
  style,
}: {
  direction: string;
  style?: string;
}) {
  const [iconMap, setIconMap] = useState<IconMap | null>(null);
  const dir = iconMap?.[direction];
  const IconElem = dir?.icon;

  useEffect(() => {
    setIconMap({
      u: {icon: ArrowUpIcon, title: 'up'},
      d: {icon: ArrowDownIcon, title: 'down'},
      l: {icon: ArrowBackIcon, title: 'left'},
      r: {icon: ArrowForwardIcon, title: 'right'},
    });
  }, []);

  return (
    <Flex
      placeContent="center"
      border="1px solid black"
      borderRadius="6px"
      background={style === 'c' ? 'blue.400' : 'black'}
      title={dir?.title}
    >
      {IconElem && <IconElem color="white" boxSize={6} />}
    </Flex>
  );
}
