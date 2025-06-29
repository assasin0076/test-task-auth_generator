<template>
  <div class="main-container">
    <FormGenerator v-model:fields="fields" />
  </div>
</template>

<script setup lang="ts">
import FormGenerator from '@/components/FormGenerator.vue'
import { ref } from 'vue'
import DFields from '@/dictionaries/DFields'

const fields = ref(JSON.parse(JSON.stringify(DFields)))
</script>

<style lang="scss">
.main-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
