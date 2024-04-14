<template>
    <div class="custom-select" @click="toggleDropdown">
      <div class="selected-option">{{ selectedOption }}</div>
      <ul v-show="isDropdownOpen" class="options-list">
        <li v-for="(option, index) in options" :key="index" @click="selectOption(option)">
          {{ option }}
        </li>
      </ul>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  
  const props = defineProps({
    options: {
      type: Array as () => string[],
      required: true,
    },
  });
  
  const selectedOption = ref<string | null>(null);
  const isDropdownOpen = ref(false);
  
  const toggleDropdown = () => {
    isDropdownOpen.value = !isDropdownOpen.value;
  };
  
  const selectOption = (option: string) => {
    selectedOption.value = option;
    isDropdownOpen.value = false;
  };
  </script>
  
  <style scoped>
  .custom-select {
    position: relative;
    cursor: pointer;
  }
  
  .selected-option {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .options-list {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background-color: #fff;
    border: 1px solid #ccc;
    border-top: none;
    border-radius: 0 0 4px 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .options-list li {
    padding: 8px;
    cursor: pointer;
  }
  
  .options-list li:hover {
    background-color: #f0f0f0;
  }
  </style>
  