<!-- components/WorkoutList.vue -->
<template>
    <div>
      <h2>Workouts</h2>
      <ul>
        <li v-for="workout in workouts" :key="workout.id">{{ workout.name }}</li>
      </ul>
      <input type="text" v-model="newWorkout" placeholder="New Workout" />
      <button @click="addWorkout">Add Workout</button>
    </div>
  </template>
  
  <script>
  import { db } from "~/plugins/firebase";
  import { collection, addDoc, getDocs } from "firebase/firestore";
  
  export default {
    data() {
      return {
        workouts: [],
        newWorkout: ''
      }
    },
    async mounted() {
      const querySnapshot = await getDocs(collection(db, 'workouts'));
      this.workouts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },
    methods: {
      async addWorkout() {
        if (!this.newWorkout.trim()) return;
        try {
          const docRef = await addDoc(collection(db, 'workouts'), {
            name: this.newWorkout,
            createdAt: new Date()
          });
          this.workouts.push({ id: docRef.id, name: this.newWorkout });
          this.newWorkout = '';
        } catch (error) {
          console.error('Error adding workout:', error);
        }
      }
    }
  }
  </script>
  