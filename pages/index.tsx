import {
  Center,
  Container,
  Heading,
  HStack,
  Icon,
  Text,
  VStack,
} from '@chakra-ui/react';
import Link from 'next/link';
import { FaGithub, FaLinkedin, FaMastodon, FaTwitter } from 'react-icons/fa';

const ICON_SIZE = 7;

export default function Home() {
  return (
    <Center h="100vh">
      <Container>
        <VStack spacing={4} align="start">
          <Heading>Welcome to Dario&apos;s blog</Heading>
          <Text>
            Sadly, you won&apos;t find much here at the moment - but please come
            back in late December! In the meantime, you can reach out to me
            through any of the following sites:
          </Text>
          <HStack>
            <Link href="https://www.linkedin.com/in/dario-djuric/">
              <Icon as={FaLinkedin} w={ICON_SIZE} h={ICON_SIZE} />
            </Link>
            <Link href="https://github.com/dariodjuric">
              <Icon as={FaGithub} w={ICON_SIZE} h={ICON_SIZE} />
            </Link>
            <Link href="https://twitter.com/dario_djuric">
              <Icon as={FaTwitter} w={ICON_SIZE} h={ICON_SIZE} />
            </Link>
            <Link href="https://mastodon.social/@dariodjuric">
              <Icon as={FaMastodon} w={ICON_SIZE} h={ICON_SIZE} />
            </Link>
          </HStack>
        </VStack>
      </Container>
    </Center>
  );
}
