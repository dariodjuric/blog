import {
  Center,
  Container,
  Heading,
  HStack,
  Icon,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import Link from 'next/link';
import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaMastodon,
  FaMedium,
  FaTwitter,
} from 'react-icons/fa';

const ICON_SIZE = 7;

export default function Home() {
  return (
    <Center h="100vh">
      <Container>
        <VStack spacing={4} align="start">
          <Heading>Welcome to Dario&apos;s blog</Heading>
          <Text>
            Sadly, you won&apos;t find much here at the moment - but please come
            back in late December! In the meantime, I&apos;m also on the
            following social networks:
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
            <Link href="https://dario-djuric.medium.com/">
              <Icon as={FaMedium} w={ICON_SIZE} h={ICON_SIZE} />
            </Link>
            <Link href="https://www.instagram.com/dariodjuric/">
              <Icon as={FaInstagram} w={ICON_SIZE} h={ICON_SIZE} />
            </Link>
            <Link href="https://www.facebook.com/dario.djuric/">
              <Icon as={FaFacebook} w={ICON_SIZE} h={ICON_SIZE} />
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
