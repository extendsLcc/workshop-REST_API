<script setup lang="ts">
  import type { Customer } from './@types';
  import Content from '@/components/Content.vue';
  import Form from '@/components/Form.vue';
  import TextInput from '@/components/TextInput.vue';
  import Alert from '@/components/Alert.vue';

  const createCustomerRequest = useApi<Customer>();

  const customer = reactive({
    name: '',
  });
  let alertRef = $ref({
    type: 'success' as 'success' | 'error',
    message: '',
  });

  function handleFormSubmit() {
    createCustomerRequest.post('/customers', customer);
  }

  function handleFormReset() {
    createCustomerRequest.reset();
    alertRef.message = '';
  }

  createCustomerRequest.onSuccess((createdCustomer) => {
    customer.name = '';
    alertRef = {
      type: 'success',
      message: `Customer #${createdCustomer.id} - ${createdCustomer.name} created successfully`,
    };
  });
  createCustomerRequest.onFail(() => {
    alertRef = {
      type: 'error',
      message: `Failed to create customer`,
    };
  });
</script>

<template>
  <Content title="New Customer">
    <template #toolbar>
      <router-link to="/customers" class="btn btn-outline">back</router-link>
    </template>

    <Alert v-if="alertRef.message" :type="alertRef.type">
      {{ alertRef.message }}
    </Alert>

    <Form :is-loading="createCustomerRequest.isLoading" @submit="handleFormSubmit" @reset="handleFormReset">
      <TextInput v-model:value="customer.name" name="name" placeholder="customer name" />
    </Form>
  </Content>
</template>
