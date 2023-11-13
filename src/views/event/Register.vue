<script setup>
const props = defineProps(["event"])
</script>


<template>
  <div v-if="event">
    <h1>{{ event.title }}</h1>
    <p>Register Event Here</p>
  </div>
</template>
