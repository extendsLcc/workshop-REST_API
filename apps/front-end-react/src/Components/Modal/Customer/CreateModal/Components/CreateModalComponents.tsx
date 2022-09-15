import {
  Box,
  Button,
  FormControl,
  FormLabel,
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
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import api from '../../../../../services/ApiAxios';

export const CreateModalComponentCustomer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [customerInput, setCustomerInput] = useState('');
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const route = useRouter();

  const handleSubmitValues = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerInput) {
      return false;
    }
    api
      .post('customers', {
        name: customerInput,
      })
      .then(() => {
        onClose();
        toast('Customer has been created successfully!');
        if (route.route === '/customers') {
          route.reload();
        } else {
          route.push('/customers');
        }
      })
      .catch(() => toast('Customer cannot be created'));
  };

  return (
    <>
      <Box aria-label="create-modal" onClick={onOpen}>
        <Button background="transparent" fontSize="0.9rem" fontWeight="normal">
          Create a new customer
        </Button>
      </Box>

      <Modal initialFocusRef={initialRef} isOpen={isOpen} finalFocusRef={finalRef} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a new customer</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl mt={4} onSubmit={handleSubmitValues} as="form">
              <FormLabel>Customer name</FormLabel>
              <Input
                ref={initialRef}
                placeholder="Customer"
                value={customerInput}
                onChange={(e) => setCustomerInput(e.target.value)}
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
