import {
  Button,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { AiOutlineDelete } from 'react-icons/ai';
import { ModalDeleteProps } from '../../types/ModalTypes';

export const DeleteModal = ({ nome }: ModalDeleteProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <IconButton aria-label="read" as={AiOutlineDelete} onClick={onOpen} h="1.3rem" background="transparent" />

      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent bg="gray.700">
          <ModalHeader>Atenção</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>Você realmente deseja excluir a categoria: {nome}?</ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3}>
              Excluir
            </Button>
            <Button onClick={onClose} colorScheme="teal">
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
