import {
  Stack,
  Accordion,
  AccordionItem,
  AccordionButton,
  Box,
  AccordionIcon,
  AccordionPanel,
  IconButton,
} from '@chakra-ui/react';
import { ButtonCard } from './Button';
import { MdOutlineCategory, MdOutlinePersonOutline, MdOutlineReceipt, MdOutlineShoppingCart } from 'react-icons/md';
import CreateModalComponent from '../../../Components/Modal/Categories/CreateModal/CreateModal';
import CreateModalComponentProducts from '../../../Components/Modal/Products/CreateModal/CreateModal';

export const CardsComponent = () => (
  <Stack gap={8}>
    <Accordion allowToggle>
      <AccordionItem>
        <h2>
          <AccordionButton _expanded={{ bg: 'teal', color: 'white' }}>
            <Box flex="1" textAlign="left">
              <IconButton
                aria-label="category"
                as={MdOutlineCategory}
                bg="transparent"
                h="1rem"
                _hover={{}}
                _active={{}}
              />
              Categories
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <Stack>
            <ButtonCard buttonText="List all categories" href="/categories" />
            <CreateModalComponent />
          </Stack>
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem>
        <h2>
          <AccordionButton _expanded={{ bg: 'teal', color: 'white' }}>
            <Box flex="1" textAlign="left">
              <IconButton
                aria-label="category"
                as={MdOutlineShoppingCart}
                bg="transparent"
                h="1rem"
                _hover={{}}
                _active={{}}
              />
              Products
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <Stack>
            <ButtonCard buttonText="List all products" href="/products" />
            <CreateModalComponentProducts />
          </Stack>
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <h2>
          <AccordionButton _expanded={{ bg: 'teal', color: 'white' }}>
            <Box flex="1" textAlign="left">
              <IconButton
                aria-label="category"
                as={MdOutlinePersonOutline}
                bg="transparent"
                h="1rem"
                _hover={{}}
                _active={{}}
              />
              Customer
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <Stack>
            <ButtonCard buttonText="List all customers" href="/customers" />
            <ButtonCard buttonText="Create a new customer" href="/customers" />
          </Stack>
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <h2>
          <AccordionButton _expanded={{ bg: 'teal', color: 'white' }}>
            <Box flex="1" textAlign="left">
              <IconButton
                aria-label="category"
                as={MdOutlineReceipt}
                bg="transparent"
                h="1rem"
                _hover={{}}
                _active={{}}
              />
              Orders
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <Stack>
            <ButtonCard buttonText="List all orders" href="/orders" />
            <ButtonCard buttonText="Create a new order" href="/orders" />
          </Stack>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  </Stack>
);
