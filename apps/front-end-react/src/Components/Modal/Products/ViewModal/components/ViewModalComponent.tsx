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

  const [product, setProduct] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState(0.0);
  const [productStock, setProductStock] = useState(0);
  const [productStatus, setProductStatus] = useState(false);
  const [productCategoryName, setProductCategoryName] = useState('');
  const [isCalled, setIsCalled] = useState(false);

  useEffect(() => {
    if (isCalled) {
      api
        .get(`products/${id}`)
        .then((productsResult) => {
          setProduct(productsResult.data.name);
          setProductDescription(productsResult.data.description);
          setProductPrice(productsResult.data.price);
          setProductStock(productsResult.data.stock);
          setProductStatus(productsResult.data.status);
          setProductCategoryName(productsResult.data.category.name);
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
          <ModalHeader>{product}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack>
              <Text>ID: {id}</Text>
              <Text>Name: {product}</Text>
              <Text>Description: {productDescription}</Text>
              <Text>Price: {productPrice}</Text>
              <Text>Stock: {productStock}</Text>
              <Text>Status: {String(productStatus)}</Text>
              <Text>Category: {productCategoryName}</Text>
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
