import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  Button,
  Stack,
  Flex,
  Center,
} from '@chakra-ui/react';
import { ButtonCard } from './Button';

export const CardsComponent = () => (
  <Center gap={8}>
    <Flex justifyContent="center" mt={4}>
      <Popover placement="bottom" isLazy>
        <PopoverTrigger>
          <Button variant="solid" w="fit-content">
            Category
          </Button>
        </PopoverTrigger>
        <PopoverContent w="fit-content" _focus={{ boxShadow: 'none' }}>
          <PopoverArrow />
          <PopoverBody>
            <Stack>
              <ButtonCard buttonText="List all categories" href="/categories" />
              <ButtonCard buttonText="Get a category by id" href="/categories" />
              <ButtonCard buttonText="Create a new category" href="/categories" />
              <ButtonCard buttonText="Update a category by id" href="/categories" />
              <ButtonCard buttonText="Delete a category by id" href="/categories" colorScheme="red" />
            </Stack>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Flex>
    <Flex justifyContent="center" mt={4}>
      <Popover placement="bottom" isLazy>
        <PopoverTrigger>
          <Button variant="solid" w="fit-content">
            Products
          </Button>
        </PopoverTrigger>
        <PopoverContent w="fit-content" _focus={{ boxShadow: 'none' }}>
          <PopoverArrow />
          <PopoverBody>
            <Stack>
              <ButtonCard buttonText="List all products" href="/products" />
              <ButtonCard buttonText="Get a product by id" href="/products" />
              <ButtonCard buttonText="Create a new product" href="/products" />
              <ButtonCard buttonText="Update a product by id" href="/products" />
              <ButtonCard buttonText="Toggle product status by id" href="/products" />
              <ButtonCard buttonText="Delete a product by id" href="/products" colorScheme="red" />
            </Stack>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Flex>
    <Flex justifyContent="center" mt={4}>
      <Popover placement="bottom" isLazy>
        <PopoverTrigger>
          <Button variant="solid" w="fit-content">
            Customer
          </Button>
        </PopoverTrigger>
        <PopoverContent w="fit-content" _focus={{ boxShadow: 'none' }}>
          <PopoverArrow />
          <PopoverBody>
            <Stack>
              <ButtonCard buttonText="List all customers" href="/customers" />
              <ButtonCard buttonText="Create a new customer" href="/customers" />
            </Stack>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Flex>
    <Flex justifyContent="center" mt={4}>
      <Popover placement="bottom" isLazy>
        <PopoverTrigger>
          <Button variant="solid" w="fit-content">
            Order
          </Button>
        </PopoverTrigger>
        <PopoverContent w="fit-content" _focus={{ boxShadow: 'none' }}>
          <PopoverArrow />
          <PopoverBody>
            <Stack>
              <ButtonCard buttonText="List all orders" href="/orders" />
              <ButtonCard buttonText="Create a new order" href="/orders" />
              <ButtonCard buttonText="Toggle order status by id" href="/orders" />
            </Stack>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Flex>
  </Center>
);
