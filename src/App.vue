<template>
  <div class="main-container">
    <div class="form-container">
      <FormGenerator v-model:fields="fields" />
      <button class="submit-button" type="submit" :disabled="!isValid">регистрация</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import FormGenerator from '@/components/FormGenerator/FormGenerator.vue'
import { computed, ref } from 'vue'
import DFields from '@/dictionaries/DFields'
import clone from '@/helpers/clone'
import isFormValid from '@/helpers/isFormValid'

const fields = ref(clone(DFields))

const isValid = computed(() => {
  return isFormValid(fields.value)
})
</script>

<style lang="scss">
.main-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  .form-container {
    width: 300px;
    border: 1px solid black;
    border-radius: 12px;
    padding: 12px 24px;
    display: flex;
    flex-direction: column;
    gap: 12px;

    .submit-button {
      align-self: flex-end;
    }
  }
}
</style>
