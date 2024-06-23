<!-- pages/index.vue -->
<template>
    <div>
      <h1>Olahraga di Rumah</h1>
      <WorkoutList />
    </div>
  </template>
  
  <script>
  import WorkoutList from '~/components/WorkoutList.vue';
  
  export default {
    components: {
      WorkoutList
    }
  }
  </script>
  