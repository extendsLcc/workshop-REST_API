import {
  Center,
  Spinner,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import NavbarComponent from '../../Navbar/navbar';
import { useQuery, useQueryClient } from 'react-query';
import api from '../../../services/ApiAxios';
import { dataTypes } from '../types/OrdersTypes';
import TitlePageComponent from '../../TitlePage/TitlePage';
import ViewModal from '../../../Components/Modal/Orders/ViewModal/ViewModal';
import InputModal from '../../../Components/Modal/Orders/InputModal/InputModal';

export const OrdersPage = () => {
  const { data, isLoading } = useQuery('OrdersData', async () => {
    const response = await api.get('orders');
    const dataResponse = await response.data;
    return dataResponse;
  });

  const dateIsoToPtBr = (date: string) => {
    const toDate = new Date(date);
    return toDate.toLocaleDateString();
  };

  const queryClient = useQueryClient();
  const handleUpdateQuery = async () => {
    await queryClient.refetchQueries(['OrdersData']);
  };

  if (!isLoading) {
    return (
      <>
        <NavbarComponent />
        <TitlePageComponent title="List all orders" />
        <Center w="100vw" mt="5rem">
          <TableContainer w="50%">
            <Table variant="striped">
              <TableCaption>Orders data</TableCaption>
              <Thead>
                <Tr>
                  <Th>ID:</Th>
                  <Th>Date:</Th>
                  <Th>Status:</Th>
                  <Th>Customer:</Th>
                  <Th>Itens:</Th>
                  <Th isNumeric>Actions:</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.map((date: dataTypes) => (
                  <Tr key={date.id}>
                    <Td>{date.id}</Td>
                    <Td>{dateIsoToPtBr(date.date)}</Td>
                    <Td>{date.status}</Td>
                    <Td>{date.customer.name}</Td>
                    <Td>{date.OrderItem.length} itens</Td>
                    <Td isNumeric>
                      <ViewModal id={date.id} />
                      <InputModal
                        modalHeader={'Edit Order Item'}
                        id={date.id}
                        category={date.status}
                        // eslint-disable-next-line @typescript-eslint/no-misused-promises
                        onUpdate={handleUpdateQuery}
                      />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
              <Tfoot>
                <Tr>
                  <Th>ID:</Th>
                  <Th>Date:</Th>
                  <Th>Status:</Th>
                  <Th>Customer:</Th>
                  <Th>Itens:</Th>
                  <Th isNumeric>Actions:</Th>
                </Tr>
              </Tfoot>
            </Table>
          </TableContainer>
        </Center>
      </>
    );
  }
  return <Spinner />;
};
