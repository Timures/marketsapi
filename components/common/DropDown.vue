<template>
  <div class="table-select dark dropdown-wrapper" ref="dropDown">
    <div class="dropdown-selected-option jcf-select-text" @click="isDropDownVisible = !isDropDownVisible">
      {{ mappedSelectedOption }}
      <div class="arrow"></div>
    </div>
    <transition name="slide-fade">
      <div class="options-wrapper" v-show="isDropDownVisible">
        <div
          class="option"
          :class="{ selected: item == selectedOption }"
          v-for="(item, index) in items"
          :key="index"
          @click="toggleOptionSelect(item)"
        >
          {{ item.name }}
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from "vue";

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  modelValue: {
    type: Object as () => ServerOption | null,
    default: null,
  },
});

interface ServerOption {
  name: string;
  value: string;
}

const isDropDownVisible = ref(false);
const emit = defineEmits(["update:modelValue"]);
const selectedOption = ref<ServerOption | null>(null);

// Обновление selectedOption при изменении props.modelValue
watchEffect(() => {
  selectedOption.value = props.modelValue;
});
const mappedSelectedOption = computed(() => {
  return selectedOption.value?.name || "Выберите АПИ";
});

const toggleOptionSelect = (item: ServerOption) => {
  selectedOption.value = item;
  emit("update:modelValue", item);
  isDropDownVisible.value = false;
};

const dropDown = ref<HTMLDivElement | null>(null);

const closeDropDown = (element: Event) => {
  if (!dropDown.value || !dropDown.value.contains(element.target as Node)) {
    isDropDownVisible.value = false;
  }
};

onMounted(() => {
  window.addEventListener("click", closeDropDown);
});

onBeforeUnmount(() => {
  window.removeEventListener("click", closeDropDown);
});
</script>

<style>
.dropdown-wrapper {
  position: relative;
  flex: 0 0 auto;
    max-width: 100%;
}
.dropdown-selected-option {
    -webkit-appearance: none;
    padding: 6px 33px 6px 13px;
    border: 2px solid rgba(255, 255, 255, 0.15);
    margin: 0;
    outline: none;
    border-radius: 100px;
    width: 100%;
    display: block;
    font: normal 14px var(--font);
    cursor: pointer;
}

.options-wrapper {
    position: absolute;
    top: 107%;
    left: 0;
    display: block;
    background: #fff;
    color: #000;
    z-index: 2;
    border-radius: 16px;
    @media screen and (max-width: 999px) {
      width: 100%;
    }
}

.option:hover {
  background: transparent;
  color: #cc4fd3;
}

.option {
    width: 100%;
    display: block;
    font: normal 14px var(--font);
    cursor: pointer;
    padding: 6px 33px 6px 13px;
  box-sizing: border-box;
  color: #313131!important;
  cursor: pointer;
    user-select: none;
    transition: 0.2s ease color;

}
option.selected {
    color: #cc4fd3 !important;
}

.option:last-of-type {
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
}
</style>
