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

export const CreateModalComponent = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [categoryInput, setCategoryInput] = useState('');
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const route = useRouter();

  const handleSubmitValues = (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryInput) {
      return false;
    }
    api
      .post('categories', {
        name: categoryInput,
      })
      .then(() => {
        onClose();
        toast('Category has been created successfully!');
        if (route.route === '/categories') {
          route.reload();
        } else {
          route.push('/categories');
        }
      })
      .catch(() => toast('Category cannot be created'));
  };

  return (
    <>
      <Box aria-label="create-modal" onClick={onOpen}>
        <Button background="transparent" fontSize="0.9rem" fontWeight="normal">
          Create a new category
        </Button>
      </Box>

      <Modal initialFocusRef={initialRef} isOpen={isOpen} finalFocusRef={finalRef} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a new category</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl mt={4} onSubmit={handleSubmitValues} as="form">
              <FormLabel>Category name</FormLabel>
              <Input
                ref={initialRef}
                placeholder="Category"
                value={categoryInput}
                onChange={(e) => setCategoryInput(e.target.value)}
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
