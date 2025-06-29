<template>
  <input type="text" v-model="innerValue" />
</template>

<script setup lang="ts">
import TField from '@/types/TField'
import { computed } from 'vue'
import TFieldValue from '@/types/TFieldValue'

const props = defineProps<{
  field: TField
}>()

const emit = defineEmits(['update:modelValue'])

const innerValue = computed({
  get: () => props.field.value,
  set: (val) => {
    emit('update:modelValue', { newValue: val, field: props.field })
  },
})
</script>

<style></style>
