<script setup lang="ts">
  import type { Customer } from './@types';
  import Content from '@/components/Content.vue';
  import Table from '@/components/Table.vue';
  import TableRow from '@/components/TableRow.vue';
  import Alert from '@/components/Alert.vue';
  import { useApi } from '@/composables/useApi';

  const listCustomersRequest = useApi<Customer[]>();
  let alertRef = $ref({
    type: 'error' as const,
    message: '',
  });

  function loadCustomers() {
    listCustomersRequest.get('/customers');
  }

  onMounted(() => {
    loadCustomers();
  });

  listCustomersRequest.onFail(() => {
    alertRef = {
      type: 'error',
      message: 'Failed to retrieve customers',
    };
  });
</script>

<template>
  <Content title="Customers List">
    <template #toolbar>
      <router-link to="/customers/new" class="btn btn-primary">New</router-link>
    </template>

    <Alert v-if="alertRef.message" :type="alertRef.type">
      {{ alertRef.message }}
    </Alert>

    <Table :column-headers="['id', 'name']" :is-loading="listCustomersRequest.isLoading">
      <TableRow v-for="customer in listCustomersRequest.data.value" :key="customer.id">
        <td>{{ customer.id }}</td>
        <td>{{ customer.name }}</td>
      </TableRow>
    </Table>
  </Content>
</template>
