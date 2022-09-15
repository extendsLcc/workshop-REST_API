<script setup lang="ts">
  import type { Order } from './@types';
  import Datepicker from './components/Datepicker.vue';
  import CustomersSelect from './components/CustomersSelect.vue';
  import OrderItems from './components/OrderItems.vue';
  import Content from '@/components/Content.vue';
  import Form from '@/components/Form.vue';
  import Alert from '@/components/Alert.vue';

  export type CreateOrderPayload = {
    customerId?: number;
    date?: Date;
    products: {
      productId?: number;
      quantity?: number;
    }[];
  };

  const createOrderRequest = useApi<Order>();

  const order = reactive<CreateOrderPayload>({
    products: [],
  });
  let alertRef = $ref({
    type: 'success' as 'success' | 'error',
    message: '',
  });

  function handleFormSubmit() {
    createOrderRequest.post('/orders', order);
  }

  function handleFormReset() {
    createOrderRequest.reset();
    alertRef.message = '';
  }

  createOrderRequest.onSuccess((createdProduct) => {
    handleFormReset();
    alertRef = {
      type: 'success',
      message: `Order #${createdProduct.id} created successfully`,
    };
  });
  createOrderRequest.onFail((error, response) => {
    if (response?.status === 422) {
      alertRef = {
        type: 'error',
        message: (error as Error).message,
      };
      return;
    }
    alertRef = {
      type: 'error',
      message: `Failed to create order`,
    };
  });
</script>

<template>
  <Content title="New Order">
    <template #toolbar>
      <router-link to="/orders" class="btn btn-outline">back</router-link>
    </template>

    <Alert v-if="alertRef.message" :type="alertRef.type">
      {{ alertRef.message }}
    </Alert>

    <Form :is-loading="createOrderRequest.isLoading" @submit="handleFormSubmit" @reset="handleFormReset">
      <div class="flex flex-wrap sm:(flex-nowrap gap-4)">
        <CustomersSelect v-model="order.customerId" name="customer" class="flex-basis-full sm:flex-basis-1/2" />
        <Datepicker
          v-model="order.date"
          name="name"
          placeholder="product name"
          class="flex-basis-full sm:flex-basis-1/2"
        />
      </div>
      <OrderItems v-model="order.products" />
    </Form>
  </Content>
</template>
