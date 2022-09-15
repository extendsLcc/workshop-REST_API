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
  Stack,
  useDisclosure,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import api from '../../../../../services/ApiAxios';

export const CreateModalComponentOrders = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [customerId, setCustomerId] = useState('');
  const [productsQuantity, setProductsQuantity] = useState(1);
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const route = useRouter();

  const handleSubmitValues = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerId) {
      return false;
    }
    api
      .post('orders', {
        customerId: 1,
        products: [
          {
            productId: 1,
            quantity: 1,
          },
          {
            productId: 4,
            quantity: 4,
          },
        ],
      })
      .then(() => {
        onClose();
        toast('Order has been created successfully!');
        if (route.route === '/orders') {
          route.reload();
        } else {
          route.push('/orders');
        }
      })
      .catch(() => toast('Order cannot be created'));
  };

  const handleCreateInput = () => {
    let toReturn = <></>;
    if (productsQuantity <= 11) {
      for (let i = 1; i < productsQuantity; i++) {
        toReturn = (
          <>
            {toReturn}
            <FormLabel>Product Id:</FormLabel>
            <Input
              ref={initialRef}
              placeholder="Product Id"
              value={customerId}
              type="number"
              min="0"
              onChange={(e) => setCustomerId(e.target.value)}
              isRequired
            />
            <FormLabel>Quantity:</FormLabel>
            <Input
              ref={initialRef}
              placeholder="Quantity"
              value={customerId}
              type="number"
              min="0"
              onChange={(e) => setCustomerId(e.target.value)}
              isRequired
            />
          </>
        );
      }
    } else {
      for (let i = 1; i <= 11; i++) {
        toReturn = (
          <>
            {toReturn}
            <FormLabel>Customer Id:</FormLabel>
            <Input
              ref={initialRef}
              placeholder="Customer Id"
              value={customerId}
              type="number"
              min="0"
              onChange={(e) => setCustomerId(e.target.value)}
              isRequired
            />
          </>
        );
      }
    }
    return toReturn;
  };

  return (
    <>
      <Box aria-label="create-modal" onClick={onOpen}>
        <Button background="transparent" fontSize="0.9rem" fontWeight="normal">
          Create a new order
        </Button>
      </Box>

      <Modal initialFocusRef={initialRef} isOpen={isOpen} finalFocusRef={finalRef} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a new order</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl mt={4} onSubmit={handleSubmitValues} as="form" h="24rem" overflowY="auto">
              <Stack>
                <FormLabel>Customer Id:</FormLabel>
                <Input
                  ref={initialRef}
                  placeholder="Customer Id"
                  value={customerId}
                  type="number"
                  min="0"
                  onChange={(e) => setCustomerId(e.target.value)}
                  isRequired
                />
                <FormLabel>Products Quantity:</FormLabel>
                <Input
                  placeholder="Customer Id"
                  value={productsQuantity}
                  min="1"
                  max="5"
                  onChange={(e) => setProductsQuantity(Number(e.target.value))}
                  isRequired
                />
                {handleCreateInput()}
              </Stack>
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
