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
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { AiOutlineEye } from 'react-icons/ai';
import api from '../../../../../services/ApiAxios';
import { ModalViewProps } from '../../../types/ModalTypes';

export const ViewModal = ({ id }: ModalViewProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [category, setCategory] = useState('');
  const [isCalled, setIsCalled] = useState(false);

  useEffect(() => {
    if (isCalled) {
      api
        .get(`categories/${id}`)
        .then((categoryResult) => {
          setCategory(categoryResult.data.name);
        })
        .then(() => setIsCalled(false))
        .catch(() => setIsCalled(false));
    }
  }, [isCalled, id]);

  return (
    <>
      <IconButton
        onClick={() => {
          onOpen();
          setIsCalled(true);
        }}
        aria-label="eye-icon"
        as={AiOutlineEye}
        h="1.3rem"
        background="transparent"
      />

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{category}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack>
              <Text>ID: {id}</Text>
              <Text>Name: {category}</Text>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
