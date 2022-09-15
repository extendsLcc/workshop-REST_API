<script setup lang="ts">
  import type { Order } from '../@types';
  import { getCalculatedOrderPrice, orderStatusBadges } from '../index.vue';
  import { formatCentsToBrlCurrency } from '@/util/formatCentsToBrlCurrency';
  import { formatDateToBrazilianFormat } from '@/util/formatDateToBrazilianFormat';
  import Table from '@/components/Table.vue';
  import TableRow from '@/components/TableRow.vue';

  const { order } = defineProps<{
    order: Order;
  }>();
</script>

<template>
  <!-- The button to open modal -->
  <label :for="`modal-order-${order.id}`" class="btn btn-outline btn-ghost modal-button">view</label>

  <Teleport to="body">
    <!-- Put this part before </body> tag -->
    <input :id="`modal-order-${order.id}`" type="checkbox" class="modal-toggle" />
    <label :for="`modal-order-${order.id}`" class="modal cursor-pointer">
      <label for="" class="modal-box min-w-[30rem] max-w-none rounded-lg">
        <div class="flex justify-between mb-3">
          <h3 class="text-lg">
            Order: <span class="font-bold">{{ order.id }}</span>
          </h3>
          <h3 class="text-lg">
            Customer: <span class="font-bold">{{ order.customer.name }}</span>
          </h3>
          <h3 class="text-lg">
            status: <span :class="`badge ${orderStatusBadges[order.status]}`">{{ order.status }}</span>
          </h3>
          <h3 class="text-lg">
            Date: <span class="font-bold">{{ formatDateToBrazilianFormat(new Date(order.date)) }}</span>
          </h3>
        </div>
        <Table :column-headers="['product', 'unit price', 'quantity', 'total price']">
          <TableRow v-for="orderItem in order.OrderItem" :key="orderItem.id">
            <td>{{ orderItem.product.name }}</td>
            <td>{{ formatCentsToBrlCurrency(orderItem.price) }}</td>
            <td>{{ orderItem.quantity }}</td>
            <td>{{ formatCentsToBrlCurrency(orderItem.price * orderItem.quantity) }}</td>
          </TableRow>

          <template #footer>
            <TableRow>
              <td colspan="3" class="text-right">Total</td>
              <td>{{ formatCentsToBrlCurrency(getCalculatedOrderPrice(order)) }}</td>
            </TableRow>
          </template>
        </Table>
        <div class="modal-action">
          <label :for="`modal-order-${order.id}`" class="btn">Close</label>
        </div>
      </label>
    </label>
  </Teleport>
</template>
