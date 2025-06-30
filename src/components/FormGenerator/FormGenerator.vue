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
import { defineAsyncComponent, ref } from 'vue'
import TFieldTypes from '@/types/TFieldTypes'
import TGeneratorFieldUpdateEmit from '@/types/TGeneratorFieldUpdateEmit'
import './common-styles.scss'

const props = defineProps<{
  fields: TField[]
}>()

const model = defineModel<TField[]>('fields')

const componentMap = {
  input: () => import('./FormFields/InputFIeld.vue'),
  select: () => import('./FormFields/SelectFIeld.vue'),
  checkbox: () => import('./FormFields/CheckboxFIeld.vue'),
}

const cachedComponents = ref<Record<string, any>>({})

const getComponent = (type: TFieldTypes) => {
  if (!componentMap[type]) {
    console.warn(`Компонент для типа "${type}" не найден`)
    return null
  }

  if (cachedComponents.value[type]) {
    return cachedComponents.value[type]
  }

  const component = defineAsyncComponent(componentMap[type])
  cachedComponents.value[type] = component
  return component
}

const updateFieldValue = (payload: TGeneratorFieldUpdateEmit) => {
  const newFields = props.fields.map((field) => {
    if (field.label === payload.field.label) {
      return {
        ...field,
        value: payload.newValue,
      }
    }
    return field
  })

  model.value = newFields
}
</script>

<style lang="scss"></style>
