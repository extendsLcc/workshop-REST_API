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
import { dataTypes } from '../types/ProductsType';

export const ProductPage = () => {
  const { data, isLoading } = useQuery('ProductsData', async () => {
    const response = await api.get('products');
    const dataResponse = await response.data;
    return dataResponse;
  });

  if (!isLoading) {
    return (
      <>
        <NavbarComponent />
        <Center w="100vw" mt="5rem">
          <TableContainer w="auto">
            <Table variant="striped">
              <TableCaption>Products data</TableCaption>
              <Thead>
                <Tr>
                  <Th>ID:</Th>
                  <Th>Name:</Th>
                  <Th>Description:</Th>
                  <Th>Price:</Th>
                  <Th>Stock:</Th>
                  <Th>Status:</Th>
                  <Th>Categoria Id:</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.map((date: dataTypes) => (
                  <Tr key={date.id}>
                    <Td>{date.id}</Td>
                    <Td>{date.name}</Td>
                    <Td>{date.description}</Td>
                    <Td>{date.price}</Td>
                    <Td>{date.stock}</Td>
                    <Td>{String(date.status)}</Td>
                    <Td>{date.categoryId}</Td>
                  </Tr>
                ))}
              </Tbody>
              <Tfoot>
                <Tr>
                  <Th>ID:</Th>
                  <Th>Name:</Th>
                  <Th>Description:</Th>
                  <Th>Price:</Th>
                  <Th>Stock:</Th>
                  <Th>Status:</Th>
                  <Th>Categoria Id:</Th>
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
