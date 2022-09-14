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
            <ButtonCard buttonText="Get a category by id" href="/categories" />
            <ButtonCard buttonText="Create a new category" href="/categories" />
            <ButtonCard buttonText="Update a category by id" href="/categories" />
            <ButtonCard buttonText="Delete a category by id" href="/categories" colorScheme="red" />
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
            <ButtonCard buttonText="Get a product by id" href="/products" />
            <ButtonCard buttonText="Create a new product" href="/products" />
            <ButtonCard buttonText="Update a product by id" href="/products" />
            <ButtonCard buttonText="Toggle product status by id" href="/products" />
            <ButtonCard buttonText="Delete a product by id" href="/products" colorScheme="red" />
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
            <ButtonCard buttonText="Toggle order status by id" href="/orders" />
          </Stack>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  </Stack>
);
