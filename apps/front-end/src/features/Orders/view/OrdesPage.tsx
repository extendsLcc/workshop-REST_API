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
import { useQuery } from 'react-query';
import api from '../../../services/ApiAxios';
import { dataTypes } from '../types/OrdersTypes';

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

  if (!isLoading) {
    return (
      <>
        <NavbarComponent />
        <Center w="100vw" mt="5rem">
          <TableContainer w="40%">
            <Table variant="striped">
              <TableCaption>Orders data</TableCaption>
              <Thead>
                <Tr>
                  <Th>ID:</Th>
                  <Th>Name:</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.map((date: dataTypes) => (
                  <Tr key={date.id}>
                    <Td>{date.id}</Td>
                    <Td>{dateIsoToPtBr(date.date)}</Td>
                  </Tr>
                ))}
              </Tbody>
              <Tfoot>
                <Tr>
                  <Th>ID:</Th>
                  <Th>Name:</Th>
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
