<script setup>
const openFileDialog = async () => {
  const result = await window.electronAPI.openDialog();
  console.log("Selected file:", result);
};
</script>

<template>
  <div>
    <button @click="openFileDialog">Open File Dialog</button>
  </div>
</template>
