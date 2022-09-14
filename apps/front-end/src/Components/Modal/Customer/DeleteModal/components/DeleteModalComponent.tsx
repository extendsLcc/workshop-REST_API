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
import { toast } from 'react-toastify';
import api from '../../../../../services/ApiAxios';
import { ModalDeleteProps } from '../../../types/ModalTypes';

export const DeleteModal = ({ nome, id, onUpdate }: ModalDeleteProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDelete = () => {
    api
      .delete(`customers/${id}`)
      .then(async () => {
        onUpdate();
        toast('Customer deleted successfully');
        onClose();
      })
      .catch(() => toast('Customer can not be deleted'));
  };

  return (
    <>
      <IconButton aria-label="read" as={AiOutlineDelete} onClick={onOpen} h="1.3rem" background="transparent" />

      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Atenção</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>Você realmente deseja excluir cliente: {nome}?</ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={handleDelete}>
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
