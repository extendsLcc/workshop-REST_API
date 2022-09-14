import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuDivider,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  Image,
  HStack,
  Text,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import Link from 'next/link';
import SidebarComponent from '../../Sidebar/Sidebar';
import { useRouter } from 'next/router';

export const NavbarComponent = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const route = useRouter();

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          {route.route === '/' ? <SidebarComponent isFirstOpen={true} /> : <SidebarComponent />}
          <Box as="button">
            <Link href="/">
              <HStack>
                <Image
                  alt="image"
                  src="https://images.ctfassets.net/n80ui2xgiaml/6POH36zaJYxXTyjmBSOKtb/8c75ffc935f549d07110fa41ab104e69/Brasoes-IFPR.png?w=30&q=30"
                  placeholder="IFPR"
                />
                <Text>ORDERS API</Text>
              </HStack>
            </Link>
          </Box>

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <Button onClick={toggleColorMode}>{colorMode === 'light' ? <MoonIcon /> : <SunIcon />}</Button>

              <Menu>
                <MenuButton as={Button} rounded={'full'} variant={'link'} cursor={'pointer'} minW={0}>
                  <Avatar size={'sm'} src={'https://avatars.dicebear.com/api/male/username.svg'} />
                </MenuButton>
                <MenuList alignItems={'center'}>
                  <br />
                  <Center>
                    <Avatar size={'2xl'} src={'https://avatars.dicebear.com/api/male/username.svg'} />
                  </Center>
                  <br />
                  <Center>
                    <p>Aluno IFPR</p>
                  </Center>
                  <br />
                  <MenuDivider />
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};
