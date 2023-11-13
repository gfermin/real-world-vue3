<script setup>
import { useRouter } from 'vue-router';
const props = defineProps(["event"])

const router = useRouter()

const register = () => {
    router.push({
        name: 'event-details'
    })
}
</script>


<template>
  <div v-if="event">
    <p>Register Event Here</p>
    <button @click="register">Register me</button>
  </div>
</template>
