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
import { dataTypes } from '../types/CategoriesTypes';
import TitlePageComponent from '../../TitlePage/TitlePage';
import ViewModal from '../../../Components/Modal/ViewModal/ViewModal';

export const CategoriesPage = () => {
  const { data, isLoading } = useQuery('CategoriesData', async () => {
    const response = await api.get('categories');
    const dataResponse = await response.data;
    return dataResponse;
  });

  if (!isLoading) {
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
                      <ViewModal modalHeader={date.name} modalBody={`ID: ${date.id}, Name: ${date.name}`} />
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
