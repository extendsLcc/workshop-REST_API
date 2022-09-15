import { Text } from '@chakra-ui/react';
import { propdDataType } from '../types/TitlePageTypes';

export const TitlePageComponent = ({ title }: propdDataType) => (
  <Text as="h1" fontSize="2rem" pl={4} pt={4}>
    {title}:
  </Text>
);
