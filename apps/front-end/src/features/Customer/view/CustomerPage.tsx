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
import NavbarComponent from '../../navbar/navbar';
import { useQuery } from 'react-query';
import api from '../../../services/ApiAxios';
import { dataTypes } from '../types/CustomersTypes';

export const CustomerPage = () => {
  const { data, isLoading } = useQuery('CustomersData', async () => {
    const response = await api.get('customers');
    const dataResponse = await response.data;
    return dataResponse;
  });

  if (!isLoading) {
    return (
      <>
        <NavbarComponent />
        <Center w="100vw" mt="5rem">
          <TableContainer w="40%">
            <Table variant="striped">
              <TableCaption>Customers data</TableCaption>
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
                    <Td>{date.name}</Td>
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
