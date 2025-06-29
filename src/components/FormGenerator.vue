<template>
  <div v-for="field in fields" :key="field.label">
    <component
      :is="getComponent(field.type)"
      @update:modelValue="updateFieldValue"
      :field="field"
    />
  </div>
</template>

<script setup lang="ts">
import TField from '@/types/TField'
import { computed, defineAsyncComponent } from 'vue'
import TFieldTypes from '@/types/TFieldTypes'
import TGeneratorFieldUpdateEmit from '@/types/TGeneratorFieldUpdateEmit'

const props = defineProps<{
  fields: TField[]
}>()
const model = defineModel('fields')

const componentMap = {
  input: () => import('../components/FormFields/InlutFIeld.vue'),
}
const getComponent = (type: TFieldTypes) => {
  const importer = componentMap[type]
  if (!importer) {
    return null
  }
  return defineAsyncComponent(importer)
}

const updateFieldValue = (val) => {
  const newFields = JSON.parse(JSON.stringify(props.fields))
  const foundField = newFields.find((field) => field.label === val.field.label)
  foundField.value = val.newValue
  model.value = newFields
}
</script>

<style lang="scss"></style>
