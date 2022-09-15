import { Button } from '@chakra-ui/react';
import Link from 'next/link';
import { ButtonProps } from '../types/CardsTypes';

export const ButtonCard = ({ buttonText, colorScheme, href }: ButtonProps) => (
  <Link href={href}>
    <Button
      w="194px"
      variant="ghost"
      justifyContent="space-between"
      fontWeight="normal"
      fontSize="sm"
      colorScheme={colorScheme}
    >
      {buttonText}
    </Button>
  </Link>
);
