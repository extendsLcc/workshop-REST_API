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
import { dataTypes } from '../types/ProductsType';
import TitlePageComponent from '../../TitlePage/TitlePage';
import ViewModal from '../../../Components/Modal/Products/ViewModal/ViewModal';
import InputModal from '../../../Components/Modal/Products/InputModal/InputModal';
import DeleteModal from '../../../Components/Modal/Products/DeleteModal/DeleteModal';

export const ProductPage = () => {
  const { data, isLoading } = useQuery('ProductsData', async () => {
    const response = await api.get('products');
    const dataResponse = await response.data;
    return dataResponse;
  });

  const queryClient = useQueryClient();
  const handleUpdateQuery = async () => {
    await queryClient.refetchQueries(['ProductsData']);
  };

  if (!isLoading) {
    return (
      <>
        <NavbarComponent />
        <TitlePageComponent title="List all products" />
        <Center w="100vw" mt="5rem">
          <TableContainer w="auto">
            <Table variant="striped">
              <TableCaption>Products data</TableCaption>
              <Thead>
                <Tr>
                  <Th>ID:</Th>
                  <Th>Name:</Th>
                  <Th>Description:</Th>
                  <Th>Category:</Th>
                  <Th isNumeric>Actions:</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.map((date: dataTypes) => (
                  <Tr key={date.id}>
                    <Td>{date.id}</Td>
                    <Td>{date.name}</Td>
                    <Td>{date.description}</Td>

                    <Td>{date.category.name}</Td>
                    <Td>
                      <ViewModal id={date.id} />
                      <InputModal
                        modalHeader={date.name}
                        id={date.id}
                        product={date.name}
                        // eslint-disable-next-line @typescript-eslint/no-misused-promises
                        onUpdate={handleUpdateQuery}
                      />
                      <DeleteModal nome={date.name} id={date.id} onUpdate={handleUpdateQuery} />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
              <Tfoot>
                <Tr>
                  <Th>ID:</Th>
                  <Th>Name:</Th>
                  <Th>Description:</Th>
                  <Th>Category:</Th>
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
