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

type ModalDeletClientProps = {
  name: string;
  id: number;
  onClick: (id: number) => void;
};

export const DeleteModal = (props: ModalDeletClientProps) => {
  const { name, onClick, id } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleExcludClick = () => {
    onClick(id);
    onClose();
  };
  return (
    <>
      <IconButton
        aria-label="read"
        //as={AiOutlineDelete}
        onClick={onOpen}
        h="1.5rem"
        _hover={{ color: '#E53E3E' }}
      />

      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent bg="gray.700">
          <ModalHeader>Atenção</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>Você realmente deseja excluir a(o) cliente {name}?</ModalBody>

          <ModalFooter>
            <Button onClick={handleExcludClick} colorScheme="red" mr={3}>
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
