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
  Select,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useState } from 'react';

import { BsPencil } from 'react-icons/bs';
import { toast } from 'react-toastify';
import api from '../../../../../services/ApiAxios';
import { ModalInputProps } from '../../../types/ModalTypes';

export const InputModal = ({ modalHeader, id, category, onUpdate }: ModalInputProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [orderInput, setOrderInput] = useState(category);
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const handleSubmitValues = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderInput) {
      return false;
    }
    api
      .patch(`orders/${id}`, {
        status: orderInput,
      })
      .then(() => {
        onClose();
        onUpdate();
        toast('Status Order has been updated successfully!');
      })
      .catch(() => toast('Status Order cannot be updated'));
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
              <FormLabel>Status</FormLabel>
              <Select
                onChange={(e) => {
                  setOrderInput(e.target.value);
                }}
              >
                <option value="pending" selected={category === 'pending' ? true : false}>
                  Pending
                </option>
                <option value="cancelled" selected={category === 'cancelled' ? true : false}>
                  Cancelled
                </option>
                <option value="completed" selected={category === 'completed' ? true : false}>
                  Completed
                </option>
              </Select>
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
