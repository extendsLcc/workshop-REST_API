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
import { dataTypes } from '../types/CategoriesTypes';
import TitlePageComponent from '../../TitlePage/TitlePage';
import ViewModal from '../../../Components/Modal/Categories/ViewModal/ViewModal';
import InputModal from '../../../Components/Modal/Categories/InputModal/InputModal';
import DeleteModal from '../../../Components/Modal/Categories/DeleteModal/DeleteModal';

export const CategoriesPage = () => {
  const { data, isLoading, isFetching } = useQuery('CategoriesData', async () => {
    const response = await api.get('categories');
    const dataResponse = await response.data;
    return dataResponse;
  });

  const queryClient = useQueryClient();
  const handleUpdateQuery = async () => {
    await queryClient.refetchQueries(['CategoriesData']);
  };

  if (!isLoading || !isFetching) {
    return (
      <>
        <NavbarComponent />
        <TitlePageComponent title="List all categories" />
        <Center w="100vw" mt="5rem">
          <TableContainer w="40%">
            <Table variant="striped">
              <TableCaption>Categories data</TableCaption>
              <Thead>
                <Tr>
                  <Th>ID:</Th>
                  <Th>Name:</Th>
                  <Th isNumeric>Actions:</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.map((date: dataTypes) => (
                  <Tr key={date.id}>
                    <Td>{date.id}</Td>
                    <Td>{date.name}</Td>
                    <Td isNumeric>
                      <ViewModal id={date.id} />
                      <InputModal
                        modalHeader={date.name}
                        id={date.id}
                        category={date.name}
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
