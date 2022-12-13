<script setup lang="ts">
  import type { Order, OrderStatus } from '../@types';
  import { ValidOrderStatus } from '../@types';

  const { order } = defineProps<{
    order: Order;
  }>();
  const emit = defineEmits(['onStatusChange']);

  const updateOrderStatusRequest = useApi();

  const statusDropdownState = $ref<{
    [status in OrderStatus]?: boolean;
  }>({});

  function handleStatusChange(toWhichStatus: OrderStatus) {
    updateOrderStatusRequest.patch(`/orders/${order.id}`, {
      status: toWhichStatus,
    });
  }

  updateOrderStatusRequest.onSuccess(() => {
    emit('onStatusChange');
  });
</script>

<template>
  <div class="dropdown dropdown-end dropdown-top">
    <label tabindex="0" class="btn btn-outline btn-ghost m-1" @focusin="statusDropdownState = {}">Status</label>
    <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
      <li v-if="['cancelled', 'refunded'].includes(order.status)">Cannot be reverted</li>
      <li v-for="status in ValidOrderStatus" v-else :key="status" class="dropdown">
        <button @click="statusDropdownState[status] = true">change to {{ status }}</button>
        <div
          tabindex="0"
          class="dropdown-content py-2 bg-transparent!"
          :class="{ 'invisible!': !statusDropdownState[status] }"
        >
          <div class="card compact bg-neutral-focus text-neutral-content rounded-box shadow-xl">
            <div class="card-body">
              <h2 class="card-title font-extrabold">Status change confirmation</h2>
              <p class="text-neutral-content text-sm text-opacity-80">
                <slot />
              </p>
              <div class="mt-4 flex justify-end gap-2">
                <button class="btn btn-outline" @click="statusDropdownState[status] = false">No</button>
                <button
                  class="btn btn-outline btn-error"
                  :class="{ loading: updateOrderStatusRequest.isLoading.value }"
                  @click="handleStatusChange(status)"
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
