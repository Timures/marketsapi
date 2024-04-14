<template>
  <div class="dropdown-container" @click="toggleDropdown">
    <div class="selected-item">{{ selectedItem }}</div>
    <ul v-if="isOpen" class="dropdown-list">
      <li v-for="(item, index) in items" :key="index" @click="selectItem(item)">
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface DropdownItem {
  name: string;
  value: string | number;
}

const props = defineProps<{
  items: DropdownItem[];
}>()

const isOpen = ref(false);
const selectedItem = ref<DropdownItem | null>(null);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const selectItem = (item: DropdownItem) => {
  selectedItem.value = item;
  isOpen.value = false;
};

</script>

<style scoped>
.dropdown-container {
  position: relative;
  display: inline-block;
}

.selected-item {
  cursor: pointer;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.dropdown-list {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 10;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  list-style-type: none;
  padding: 0.5rem 0;
  max-height: 200px;
  overflow-y: auto;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.dropdown-list li {
  cursor: pointer;
  padding: 0.5rem;
}

.dropdown-list li:hover {
  background-color: #f0f0f0;
}
</style>
