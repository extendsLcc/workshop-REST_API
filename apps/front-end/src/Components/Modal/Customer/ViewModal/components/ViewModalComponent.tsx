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

  const [customer, setCustomer] = useState('');
  const [isCalled, setIsCalled] = useState(false);

  useEffect(() => {
    if (isCalled) {
      api
        .get(`customers/${id}`)
        .then((customersResults) => {
          setCustomer(customersResults.data.name);
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
          <ModalHeader>{customer}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack>
              <Text>ID: {id}</Text>
              <Text>Name: {customer}</Text>
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
