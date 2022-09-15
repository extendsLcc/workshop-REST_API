import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import CardsComponent from '../../Cards/Cards';
import { SidebarProps } from '../types/SidebarTypes';

export const SidebarComponent = ({ isFirstOpen = false }: SidebarProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  useEffect(() => {
    if (isFirstOpen) {
      onOpen();
    }
  }, [isFirstOpen, onOpen]);

  return (
    <>
      <IconButton aria-label="menu-open" as={AiOutlineMenu} onClick={onOpen} h="1.5rem" />

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Orders API - Menu</DrawerHeader>
          <DrawerBody>
            <CardsComponent />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
