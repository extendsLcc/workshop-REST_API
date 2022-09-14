import {
  Button,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useState } from 'react';

import { BsPencil } from 'react-icons/bs';
import { toast } from 'react-toastify';
import api from '../../../../../services/ApiAxios';
import { ModalInputProps } from '../../../types/ModalTypes';

export const InputModal = ({ modalHeader, id, category, onUpdate }: ModalInputProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [customersInput, setCustomersInput] = useState(category);
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const handleSubmitValues = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customersInput) {
      return false;
    }
    api
      .put(`customers/${id}`, {
        name: customersInput,
      })
      .then(() => {
        onClose();
        onUpdate();
        toast('Customers has been updated successfully!');
      })
      .catch(() => toast('Customers cannot be updated'));
  };

  return (
    <>
      <IconButton aria-label="edit-modal" onClick={onOpen} as={BsPencil} h="1.2rem" background="transparent" />

      <Modal initialFocusRef={initialRef} isOpen={isOpen} finalFocusRef={finalRef} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{modalHeader}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>ID:</FormLabel>
              <Input placeholder="ID" disabled value={id} />
            </FormControl>

            <FormControl mt={4} onSubmit={handleSubmitValues} as="form">
              <FormLabel>Customers</FormLabel>
              <Input
                ref={initialRef}
                placeholder="Customers"
                value={customersInput}
                onChange={(e) => setCustomersInput(e.target.value)}
                isRequired
              />{' '}
              <ModalFooter>
                <Button colorScheme="blue" mr={3} type="submit">
                  Submit
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </FormControl>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
