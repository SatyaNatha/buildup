<template>
  <div class="workout-page">
    <h2>Workouts</h2>
    <ul>
      <li v-for="workout in workouts" :key="workout.id">{{ workout.name }}</li>
    </ul>
    <input type="text" v-model="newWorkout" placeholder="New Workout" />
    <button @click="addWorkout">Add Workout</button>

    <button @click="logout" class="logout-button">Log Out</button>
  </div>
</template>

<script>
import { collection, getDocs, addDoc, serverTimestamp, query, where } from "firebase/firestore";
import { signOut } from "firebase/auth";

export default {
  data() {
    return {
      workouts: [],
      newWorkout: ''
    };
  },
  async mounted() {
    const { $firebase } = this.$nuxt;
    const auth = $firebase.auth;
    const db = $firebase.db;
    
    try {
      const user = auth.currentUser;
      if (user) {
        // Fetch workouts for the current user
        const userWorkoutsCollection = collection(db, `users/${user.uid}/workouts`);
        const querySnapshot = await getDocs(userWorkoutsCollection);
        this.workouts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      } else {
        // If no user is logged in, redirect to login
        this.$router.push('/login');
      }
    } catch (error) {
      console.error('Error fetching workouts:', error);
    }
  },
  methods: {
    async addWorkout() {
      const { $firebase } = this.$nuxt;
      const auth = $firebase.auth;
      const db = $firebase.db;
      
      if (!this.newWorkout.trim()) return;

      try {
        const user = auth.currentUser;
        if (user) {
          // Add workout to the current user's subcollection
          const userWorkoutsCollection = collection(db, `users/${user.uid}/workouts`);
          const docRef = await addDoc(userWorkoutsCollection, {
            name: this.newWorkout,
            createdAt: serverTimestamp()
          });
          this.workouts.push({ id: docRef.id, name: this.newWorkout });
          this.newWorkout = '';
        } else {
          // If no user is logged in, redirect to login
          this.$router.push('/login');
        }
      } catch (error) {
        console.error('Error adding workout:', error);
      }
    },
    async logout() {
      const { $firebase } = this.$nuxt;
      try {
        await signOut($firebase.auth);
        localStorage.removeItem('user');
        this.$router.push('/login');
      } catch (error) {
        console.error('Error logging out:', error);
      }
    }
  }
};
</script>

<style scoped>
.workout-page {
  padding: 20px;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin: 5px 0;
}

input {
  margin-top: 10px;
  padding: 8px;
  width: 200px;
}

button {
  margin-top: 10px;
  padding: 10px;
  cursor: pointer;
}

.logout-button {
  margin-top: 20px;
  padding: 10px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
}

.logout-button:hover {
  background-color: #c82333;
}
</style>
