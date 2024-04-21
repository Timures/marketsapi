<template>
    <div v-if="isOpen" class="modal" :class="{ 'open': isOpen, 'modal-fader': isOpen }">
      <div class="modal-max">
        <button class="btn btn-grey btn-big close" @click="closeModal">
          <span>Закрыть</span>
          <svg width="24" height="24">
            <use xlink:href="/img/sprite.svg#close"></use>
          </svg>
        </button>
        <div class="modal-content">
          <!-- Your modal content here -->
          <slot></slot>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">

  // Props
  const props = defineProps<{
    isOpen: boolean;
    onClose?: () => void;
  }>();
  
  // Close modal when Escape key is pressed
  const handleEscape = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && props.onClose) {
      props.onClose();
    }
  };
  
  // Methods
  const closeModal = () => {
    if (props.onClose) {
      props.onClose();
    }
  };
  
  // Block body scroll when modal is open
  const blockBodyScroll = () => {
    if (typeof document !== 'undefined' && document.body) {
      document.body.style.overflow = 'hidden';
    }
  };
  
  // Restore body scroll when modal is closed
  const restoreBodyScroll = () => {
    if (typeof document !== 'undefined' && document.body) {
      document.body.style.overflow = 'auto';
    }
  };
  
  // Watch isOpen prop and apply scroll blocking
  watchEffect(() => {
    if (props.isOpen) {
      blockBodyScroll();
      window.addEventListener('keydown', handleEscape);
    } else {
      restoreBodyScroll();
    }
  });
  
  // Cleanup on unmount
  onUnmounted(() => {
    restoreBodyScroll();
    window.removeEventListener('keydown', handleEscape); // Ensure window and event listener exist before removing
  });
  
  </script>
  
  <style>
  /* Add your styles here */
  </style>
  