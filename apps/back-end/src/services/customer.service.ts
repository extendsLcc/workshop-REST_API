import { PrismaClient, Prisma } from '@prisma/client';

class CustomerService {
  constructor(private readonly prisma: PrismaClient) {}

  async createCustomer(newCustomerInput: Prisma.CustomerCreateInput) {
    return await this.prisma.customer.create({
      data: newCustomerInput,
    });
  }

  async listCustomers() {
    return await this.prisma.customer.findMany();
  }

  async getCustomerById(customerId: number) {
    return await this.prisma.customer.findUnique({ where: { id: customerId } });
  }
}

export { CustomerService };
