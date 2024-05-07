import {Flex, Button} from '@chakra-ui/react';

export default function MobileControls({
  handleKeyPadPress,
}: {
  handleKeyPadPress: (direction: string) => void;
}) {
  return (
    <Flex flexDirection="column" width={220}>
      <Flex justifyContent="center">
        <Button
          fontSize={20}
          onClick={() => handleKeyPadPress('w')}
          aria-label="Up"
          w="80px"
        >
          ▲
        </Button>
      </Flex>
      <Flex flexDirection="row">
        <Button
          mr="auto"
          fontSize={20}
          onClick={() => handleKeyPadPress('a')}
          transform={'rotate(-90deg)'}
          aria-label="Left"
          h="80px"
        >
          ▲
        </Button>
        <Button
          rotate={90}
          fontSize={20}
          onClick={() => handleKeyPadPress('d')}
          transform={'rotate(90deg)'}
          aria-label="Right"
          h="80px"
        >
          ▲
        </Button>
      </Flex>
      <Flex justifyContent="center">
        <Button
          fontSize={20}
          onClick={() => handleKeyPadPress('s')}
          aria-label="Down"
          w="80px"
        >
          ▼
        </Button>
      </Flex>
    </Flex>
  );
}
