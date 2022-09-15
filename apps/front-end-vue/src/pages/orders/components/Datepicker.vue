<script setup lang="ts">
  import { ref } from 'vue';
  import Datepicker from '@vuepic/vue-datepicker';
  import '@vuepic/vue-datepicker/dist/main.css';

  const props = defineProps<{
    name: string;
    modelValue?: Date;
  }>();
  const emit = defineEmits(['update:modelValue']);

  const selectedDate = ref<Date | undefined>(new Date());

  watchEffect(() => {
    emit('update:modelValue', selectedDate.value);
  });

  watch(toRef(props, 'modelValue'), (date) => {
    selectedDate.value = date;
  });
</script>

<template>
  <div class="form-control">
    <label class="label" :for="name">
      <span class="label-text capitalize">{{ name }}</span>
    </label>
    <Datepicker
      v-model="selectedDate"
      input-class-name="input input-bordered"
      dark
      format="dd/MM/yyyy"
      :enable-time-picker="false"
      text-input
      autocomplete="off"
    />
  </div>
</template>
