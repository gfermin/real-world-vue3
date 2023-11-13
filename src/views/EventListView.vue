<script setup>
import { useRouter } from 'vue-router';
import EventCard from '@/components/EventCard.vue'
import EventService from '@/services/EventService.js'
import { ref, onMounted, computed, watchEffect } from 'vue'

//Getting the current page value
const props = defineProps(['page'])
//Get the total events that we have
const totalEvents = ref(0)
//Declaring the event data
const events = ref(null)
const router = useRouter()

const page = computed(() => props.page)

const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalEvents.value / 2)
  return page.value < totalPages
})

onMounted(() => {
  /*
    When reactive objects that are accessed inside this function change, 
    run this function again
  */
  watchEffect(() => {
    events.value = null
    EventService.getEvents(2, page.value)
      .then((response) => {
        events.value = response.data
        totalEvents.value = response.headers['x-total-count']
      })
      .catch((error) => {
        router.push({ name: 'network-error' })
        console.log(error)
      })
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

    <div class="pagination">
      <router-link id="page-prev" :to="{ name: 'event-list', query: { page: page - 1 } }" rel="prev" v-if="page != 1">
        &#60; Prev
      </router-link>

      <router-link id="page-next" :to="{ name: 'event-list', query: { page: page + 1 } }" rel="next" v-if="hasNextPage">
        Next &#62;
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.pagination {
  display: flex;
  width: 290px;
}
.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}
#page-prev {
  text-align: left;
}
#page-next {
  text-align: right;
}
</style>
