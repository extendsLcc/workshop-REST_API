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
import { ModalViewProps, OrderItemResultProps } from '../../../types/ModalTypes';

export const ViewModal = ({ id }: ModalViewProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [date, setDate] = useState('');
  const [status, setStatus] = useState('');
  const [customerId, setCustomerId] = useState(0);
  const [customerName, setCustomerName] = useState('');
  const [orderItem, setOrderItem] = useState([]);
  const [totalValue, setTotalValue] = useState(0);

  const [isCalled, setIsCalled] = useState(false);

  useEffect(() => {
    if (isCalled) {
      api
        .get(`orders/${id}`)
        .then((ordersResult) => {
          setDate(ordersResult.data.date);
          setStatus(ordersResult.data.status);
          setCustomerId(ordersResult.data.customer.id);
          setCustomerName(ordersResult.data.customer.name);
          setOrderItem(ordersResult.data.OrderItem);
          setTotalValue(0);
          const actualyValue = totalValue;
          let value = totalValue;
          ordersResult.data.OrderItem.map((orderItem: OrderItemResultProps) => {
            value += orderItem.price;
            setTotalValue(actualyValue + value);
          });
        })
        .then(() => setIsCalled(false))
        .catch(() => setIsCalled(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCalled, id, orderItem]);

  const dateIsoToPtBr = (date: string) => {
    const toDate = new Date(date);
    return toDate.toLocaleDateString();
  };

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

      <Modal
        onClose={() => {
          onClose();
          setTotalValue(0);
        }}
        isOpen={isOpen}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Order {id}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack>
              <Text>ID: {id}</Text>
              <Text>Date: {dateIsoToPtBr(date)}</Text>
              <Text>Status: {status}</Text>
              <Text>Customer Id: {customerId}</Text>
              <Text>Customer Name: {customerName}</Text>
              <Text>
                Order Items:
                <Stack ml="6rem">
                  {orderItem.map((orderItem: OrderItemResultProps) => (
                    <Text key={orderItem.product.id}>{orderItem.quantity + 'x ' + orderItem.product.name + '\n '}</Text>
                  ))}
                </Stack>
              </Text>
              <Text>Total value: {totalValue}</Text>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={() => {
                onClose();
                setTotalValue(0);
              }}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
