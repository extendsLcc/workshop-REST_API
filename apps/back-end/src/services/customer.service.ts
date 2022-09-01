import { Customer } from '@/entities';

let customerIdAutoIncrement = 1;
const customersFakeDatabase: Customer[] = [];

type CustomerWithoutId = Omit<Customer, 'id'>;

function createCustomer(customer: CustomerWithoutId) {
  const createdCustomer = {
    id: customerIdAutoIncrement++,
    ...customer,
  };
  customersFakeDatabase.push(createdCustomer);
  return createdCustomer;
}

function listCustomers() {
  return customersFakeDatabase;
}

function getCustomerById(customerId: number) {
  return customersFakeDatabase.find((customer) => customer.id === customerId);
}

export { createCustomer, listCustomers, getCustomerById };
export type { CustomerWithoutId };
