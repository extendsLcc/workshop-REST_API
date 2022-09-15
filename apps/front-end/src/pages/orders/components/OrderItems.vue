<script setup lang="ts">
  import type { CreateOrderPayload } from '../new.vue';
  import ProductsSelect from './ProductsSelect.vue';
  import TextInput from '@/components/TextInput.vue';
  import type { Unpacked } from '@/util/Unpacked';
  import { Product } from '@/pages/products/@types';
  import Spinner from '@/components/Spinner.vue';
  import { formatCentsToBrlCurrency } from '@/util/formatCentsToBrlCurrency';

  export type OrderItem = Unpacked<CreateOrderPayload['products']> & {
    staleId: number;
    price?: number;
  };

  // eslint-disable-next-line vue/define-macros-order
  const { modelValue } = defineProps<{
    modelValue?: Omit<OrderItem, 'staleId'>[];
  }>();
  const emit = defineEmits(['update:modelValue']);

  const listProductsRequest = useApi<Product[]>();

  let orderItems = $ref<OrderItem[]>([]);
  let unselectedProducts = $ref<Product[]>([]);
  const maximumOrderItemsLimitReached = $computed(
    () => unselectedProducts.length === 0 || orderItems.length >= (listProductsRequest.data.value?.length ?? 0),
  );
  const minimumOrderItemsReached = $computed(() => orderItems.length <= 1);

  function handleAddNewItem() {
    orderItems.push({
      staleId: Date.now(),
      productId: undefined,
      quantity: 1,
    });
  }

  function handleRemoveItem(itemStaleId: number) {
    orderItems = orderItems.filter((item) => item.staleId !== itemStaleId);
  }

  onMounted(() => {
    listProductsRequest.get('/products', {
      params: {
        onlyEnabled: 'on',
      },
    });
    handleAddNewItem();
  });

  watch(listProductsRequest.data, (loadedProductsList) => {
    if (loadedProductsList) {
      unselectedProducts = loadedProductsList;
    }
  });

  watchEffect(() => {
    unselectedProducts =
      listProductsRequest.data.value?.filter(
        (product) =>
          !orderItems.some((item) => {
            return item.productId === product.id;
          }),
      ) ?? [];
  });

  watchEffect(() => {
    emit(
      'update:modelValue',
      orderItems.map(({ productId, quantity }) => ({ productId, quantity })), // removes staleId
    );
  });
</script>

<template>
  <Spinner v-if="listProductsRequest.isLoading.value" />
  <div v-for="orderItem in orderItems" v-else :key="orderItem.staleId" class="flex flex-wrap sm:(flex-nowrap gap-4)">
    <ProductsSelect
      v-model="orderItem.productId"
      :is-loading="listProductsRequest.isLoading"
      :products="[
        ...([listProductsRequest.data.value?.find((product) => product.id === orderItem.productId)].filter(Boolean) as Product[]),
        ...unselectedProducts,
      ]"
      name="product"
      class="flex-basis-full sm:flex-basis-1/2"
      @on-change="(selectedProduct: Product) => (orderItem.price = selectedProduct.price)"
    />
    <TextInput
      v-model.number="orderItem.quantity"
      name="quantity"
      type="number"
      class="flex-basis-full sm:flex-basis-1/4"
      min="1"
      step="1"
    />
    <TextInput
      :value="orderItem.price ? formatCentsToBrlCurrency(orderItem.price * (orderItem.quantity ?? 1)) : ''"
      name="price"
      class="flex-basis-full sm:flex-basis-1/4"
      disabled
    />
    <span class="tooltip tooltip-bottom self-end mx-auto mt-5 sm:m-0 basis-auto" data-tip="remove product">
      <button
        type="button"
        class="btn btn-outline btn-error"
        :disabled="minimumOrderItemsReached"
        @click="handleRemoveItem(orderItem.staleId)"
      >
        <i class="i i-mdi-minus-thick text-xl!"></i>
      </button>
    </span>
  </div>
  <div class="divider mb-0"></div>
  <span class="tooltip tooltip-bottom" data-tip="add product">
    <button
      type="button"
      class="btn btn-outline btn-success mt-4"
      :disabled="maximumOrderItemsLimitReached"
      @click="handleAddNewItem"
    >
      <i class="i i-mdi-plus-thick text-xl!"></i>
    </button>
  </span>
</template>
