<script setup lang="ts">
  import type { Order } from './@types';
  import ViewOrderModal from './components/ViewOrderModal.vue';
  import OrderStatusOptions from './components/OrderStatusOptions.vue';
  import Content from '@/components/Content.vue';
  import Table from '@/components/Table.vue';
  import TableRow from '@/components/TableRow.vue';
  import DeleteConfirmationButton from '@/components/DeleteConfirmationButton.vue';
  import Alert from '@/components/Alert.vue';
  import { useApi } from '@/composables/useApi';
  import { formatDateToBrazilianFormat } from '@/util/formatDateToBrazilianFormat';
  import { formatCentsToBrlCurrency } from '@/util/formatCentsToBrlCurrency';

  const listOrdersRequest = useApi<Order[]>();

  let alertRef = $ref({
    type: 'success' as 'success' | 'error',
    message: '',
  });

  function loadOrders() {
    listOrdersRequest.get('/orders');
  }

  onMounted(() => {
    loadOrders();
  });

  listOrdersRequest.onFail(() => {
    alertRef = {
      type: 'error',
      message: 'Failed to retrieve orders',
    };
  });
</script>

<script lang="ts">
  export const orderStatusBadges = {
    pending: 'badge-primary',
    paid: 'badge-accent',
    shipped: 'badge-info',
    cancelled: 'badge-error',
    completed: 'badge-success',
    refunded: 'badge-warning',
  };

  export function getCalculatedOrderPrice(order: Order) {
    return order.OrderItem.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  }
</script>

<template>
  <Content title="Orders List">
    <template #toolbar>
      <router-link to="/orders/new" class="btn btn-primary">New</router-link>
    </template>

    <Alert v-if="alertRef.message" :type="alertRef.type">
      {{ alertRef.message }}
    </Alert>

    <Table
      :column-headers="['id', 'customer', 'total', 'status', 'date', 'actions']"
      :is-loading="listOrdersRequest.isLoading"
    >
      <TableRow v-for="order in listOrdersRequest.data.value" :key="order.id">
        <td>{{ order.id }}</td>
        <td>{{ order.customer.name }}</td>
        <td>{{ formatCentsToBrlCurrency(getCalculatedOrderPrice(order)) }}</td>
        <td>
          <span :class="`badge ${orderStatusBadges[order.status]}`">{{ order.status }}</span>
        </td>
        <td>{{ formatDateToBrazilianFormat(new Date(order.date)) }}</td>
        <td class="space-x-2">
          <ViewOrderModal :order="order" />
          <OrderStatusOptions :order="order" @on-status-change="loadOrders" />
        </td>
      </TableRow>
    </Table>
  </Content>
</template>
