<script setup>
import { onMounted, ref } from 'vue'
import EventService from '../../services/EventService';

const props = defineProps({
    id: {
        required: true
    }
})

const event = ref(null)

onMounted(() => {
    EventService.getEvent(props.id).then((response) => {
        event.value = response.data
    }).catch((error) => {
        console.log(error)
    })
})
</script>


<template>
  <div v-if="event">
    <h1>{{ event.title }}</h1>
    <div id="nav">
        <!--Passing the params:{id} to specify the id we want-->
        <router-link :to="{ name: 'event-details', params: { id } }">Details</router-link> |
        
        <!--
            But you can also don't specify the id because since id is required, 
            vue-router will look for the ide in the url if we don't specify one 
            in the params
        -->
        <router-link :to="{ name: 'event-register' }">Register</router-link> |
        
        <router-link :to="{ name: 'event-edit' }">Edit</router-link>
    </div>
    <router-view :event="event" />
  </div>
</template>
