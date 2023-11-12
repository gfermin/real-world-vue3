<script setup>
import { ref,onMounted } from 'vue'
import EventCard from '@/components/EventCard.vue'
import EventService from '@/services/EventService.js'

//Declaring the event data
const events = ref(null)

onMounted(() => {
  EventService.getEvents().then((response) => {
    events.value = response.data
    console.log('events:', response.data)
  })
  .catch((error) => {
    console.log(error)
  })
})
</script>

<template>
  <h1>Eventos Mamalones!!!</h1>
  <div class="events">
    <!--
        -Iterate over the events object to print each event separately
        -Send the instance of the prop we're currently in to the EventCard component so we 
         can fill out the info inside the event cards
    -->
      <event-card v-for="event in events" :key="event.id" :event="event" />
  </div>
</template>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
