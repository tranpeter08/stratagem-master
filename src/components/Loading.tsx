import {Spinner} from '@chakra-ui/spinner';
import {Box, Flex, Heading} from '@chakra-ui/layout';

export default function Loading() {
  return (
    <Flex flexDirection="column" placeItems="center" p={8}>
      <Flex flexDirection="column" alignItems="center">
        <Spinner
          width={40}
          height={40}
          thickness="14px"
          emptyColor="gray.200"
        />
        <Heading mt={8} size="lg">
          Loading...
        </Heading>
      </Flex>
    </Flex>
  );
}
