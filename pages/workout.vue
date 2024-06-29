<template>
  <div class="workout-page">
    <h2 class="page-title">Your Workouts</h2>
    <ul class="workouts-list">
      <li v-for="workout in workouts" :key="workout.id" class="workout-item">{{ workout.name }}</li>
    </ul>
    <div class="add-workout">
      <input type="text" v-model="newWorkout" placeholder="Enter new workout" class="input-workout" />
      <button @click="addWorkout" class="btn-add-workout">Add</button>
    </div>

    <button @click="logout" class="logout-button">Log Out</button>
  </div>
</template>

<script>
import { collection, getDocs, addDoc, serverTimestamp } from "firebase/firestore";
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 600px;
  margin: auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.page-title {
  font-size: 24px;
  margin-bottom: 20px;
}

.workouts-list {
  list-style: none;
  padding: 0;
  margin-top: 10px;
  width: 50%;
}

.workout-item {
  background-color: #fff;
  padding: 12px;
  margin-bottom: 8px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
}

.add-workout {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
}

.input-workout {
  width: calc(100% - 80px);
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  margin-right: 10px;
}

.btn-add-workout {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-add-workout:hover {
  background-color: #0056b3;
}

.logout-button {
  margin-top: 20px;
  padding: 12px 20px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.logout-button:hover {
  background-color: #c82333;
}
</style>
