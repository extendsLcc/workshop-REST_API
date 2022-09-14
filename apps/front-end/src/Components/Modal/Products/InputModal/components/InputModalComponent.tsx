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
  Spinner,
  Stack,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

import { BsPencil } from 'react-icons/bs';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import api from '../../../../../services/ApiAxios';
import { modalProductsCategoryProps, ModalProductsInputProps } from '../../../types/ModalTypes';

export const InputModal = ({ modalHeader, id, product, onUpdate }: ModalProductsInputProps) => {
  const { data, isLoading } = useQuery('CategoriesData', async () => {
    const response = await api.get('categories');
    const dataResponse = await response.data;
    return dataResponse;
  });

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [productInput, setProductInput] = useState(product);
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState(0.0);
  const [productStock, setProductStock] = useState(0);
  const [productStatus, setProductStatus] = useState(false);
  const [productCategoryName, setProductCategoryName] = useState('');
  const [productCategoryId, setProductCategoryId] = useState(0);
  const [isCalled, setIsCalled] = useState(false);

  useEffect(() => {
    if (isCalled) {
      api
        .get(`products/${id}`)
        .then((productsResult) => {
          setProductInput(productsResult.data.name);
          setProductDescription(productsResult.data.description);
          setProductPrice(productsResult.data.price);
          setProductStock(productsResult.data.stock);
          setProductStatus(productsResult.data.status);
          setProductCategoryName(productsResult.data.category.name);
          setProductCategoryId(productsResult.data.category.id);
        })
        .then(() => setIsCalled(false))
        .catch(() => setIsCalled(false));
    }
  }, [isCalled, id]);

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const verifyInputs = () => {
    if (!productInput) false;
    if (!productDescription) false;
    if (!productPrice) false;
    if (!productStock) false;
    if (!productStatus) false;
    if (!productCategoryName) false;
    if (!productCategoryId) false;

    return true;
  };

  const handleSubmitValues = (e: React.FormEvent) => {
    e.preventDefault();
    if (!verifyInputs()) {
      return false;
    }
    api
      .put(`products/${id}`, {
        name: productInput,
        description: productDescription,
        price: productPrice,
        stock: productStock,
        status: productStatus,
        categoryId: productCategoryId,
      })
      .then(() => {
        onClose();
        onUpdate();
        toast('Category has been updated successfully!');
      })
      .catch(() => toast('Category cannot be updated'));
  };

  return (
    <>
      <IconButton
        aria-label="edit-modal"
        onClick={() => {
          onOpen();
          setIsCalled(true);
        }}
        as={BsPencil}
        h="1.2rem"
        background="transparent"
      />

      <Modal initialFocusRef={initialRef} isOpen={isOpen} finalFocusRef={finalRef} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{modalHeader}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl mt={4} onSubmit={handleSubmitValues} as="form" h="24rem" overflowY="auto">
              <Stack>
                <FormLabel>ID:</FormLabel>
                <Input placeholder="ID" disabled value={id} />

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
                  onChange={(e) => setProductPrice(parseFloat(e.target.value))}
                  isRequired
                />
                <FormLabel>Stock</FormLabel>
                <Input
                  placeholder="Stock"
                  value={productStock}
                  type="number"
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
