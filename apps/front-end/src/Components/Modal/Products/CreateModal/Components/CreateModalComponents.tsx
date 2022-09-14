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
  Select,
  Spinner,
  Stack,
  useDisclosure,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import api from '../../../../../services/ApiAxios';
import { modalProductsCategoryProps } from '../../../types/ModalTypes';

export const CreateModalComponentProducts = () => {
  const { data, isLoading } = useQuery('CategoriesData', async () => {
    const response = await api.get('categories');
    const dataResponse = await response.data;
    return dataResponse;
  });

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [productInput, setProductInput] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState(1);
  const [productStock, setProductStock] = useState(1);
  const [productStatus, setProductStatus] = useState(true);
  const [productCategoryName, setProductCategoryName] = useState('');
  const [productCategoryId, setProductCategoryId] = useState(0);
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const route = useRouter();

  const handleSubmitValues = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productInput) {
      return false;
    }
    api
      .post('products', {
        name: productInput,
        description: productDescription,
        price: productPrice,
        stock: productStock,
        status: productStatus,
        categoryId: productCategoryId,
      })
      .then(() => {
        onClose();
        toast('Product has been created successfully!');
        if (route.route === '/products') {
          route.reload();
        } else {
          route.push('/products');
        }
      })
      .catch(() => toast('Product cannot be created'));
  };

  return (
    <>
      <Box aria-label="create-modal" onClick={onOpen}>
        <Button background="transparent" fontSize="0.9rem" fontWeight="normal">
          Create a new product
        </Button>
      </Box>

      <Modal initialFocusRef={initialRef} isOpen={isOpen} finalFocusRef={finalRef} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a new product</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl mt={4} onSubmit={handleSubmitValues} as="form" h="24rem" overflowY="auto">
              <Stack>
                <FormLabel>Product</FormLabel>
                <Input
                  ref={initialRef}
                  placeholder="Product"
                  value={productInput}
                  onChange={(e) => setProductInput(e.target.value)}
                  isRequired
                />
                <FormLabel>Description</FormLabel>
                <Input
                  placeholder="Description"
                  value={productDescription}
                  onChange={(e) => setProductDescription(e.target.value)}
                  isRequired
                />
                <FormLabel>Price</FormLabel>
                <Input
                  placeholder="Price"
                  value={productPrice}
                  type="number"
                  min="0"
                  onChange={(e) => setProductPrice(parseFloat(e.target.value))}
                  isRequired
                />
                <FormLabel>Stock</FormLabel>
                <Input
                  placeholder="Stock"
                  value={productStock}
                  type="number"
                  min="0"
                  onChange={(e) => setProductStock(Number(e.target.value))}
                  isRequired
                />
                <FormLabel>Status</FormLabel>
                <Select
                  onChange={(e) => {
                    if (e.target.value === 'true') {
                      setProductStatus(true);
                    }
                    setProductStatus(false);
                  }}
                >
                  <option value="true" selected={productStatus === true ? true : false}>
                    True
                  </option>
                  <option value="false" selected={productStatus === false ? true : false}>
                    False
                  </option>
                </Select>

                <FormLabel>Category</FormLabel>
                <Select
                  onChange={(e) => {
                    setProductCategoryId(Number(e.target.value));
                  }}
                >
                  {!isLoading ? (
                    data.map((category: modalProductsCategoryProps) => (
                      <option
                        key={category.id}
                        value={category.id}
                        selected={productCategoryName === category.name ? true : false}
                      >
                        {category.name}
                      </option>
                    ))
                  ) : (
                    <Spinner />
                  )}
                </Select>
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
