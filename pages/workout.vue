<template>
  <div class="workout-page">
    <div class="background-container">
      <div class="content-container">
        <h2 class="page-title">Your Workouts</h2>
        <ul class="workouts-list">
          <li v-for="workout in workouts" :key="workout.id" class="workout-item">
            {{ workout.name }}
            <div class="workout-buttons">
              <button @click="addToSchedule(workout)" class="btn-schedule">Add to Schedule</button>
              <button @click="deleteWorkout(workout.id)" class="btn-delete">Delete</button>
            </div>
          </li>
        </ul>

        <div class="add-workout">
          <input type="text" v-model="newWorkout" placeholder="Enter new workout" class="input-workout" />
          <button @click="addWorkout" class="btn-add-workout">Add</button>
        </div>

        <div class="daily-schedule">
          <h3>Daily Schedule</h3>
          <ul class="schedule-list">
            <li v-for="(workout, index) in dailySchedule" :key="index" class="schedule-item">
              {{ workout.name }}
              <button @click="removeFromSchedule(index)" class="btn-remove">Remove</button>
            </li>
          </ul>
          <div class="target-setting">
            <input type="number" v-model.number="dailyTarget" placeholder="Set daily target (minutes)" class="input-target" />
            <button @click="setTarget" class="btn-set-target">Set Target</button>
          </div>
          <p class="target-info">Daily Target: {{ dailyTarget }} minutes</p>
        </div>

        <div class="timer">
          <h3>Workout Timer</h3>
          <p class="timer-display">{{ formattedTime }}</p>
          <button @click="startTimer" class="btn-timer-start">Start</button>
          <button @click="pauseTimer" class="btn-timer-pause">Pause</button>
          <button @click="resetTimer" class="btn-timer-reset">Reset</button>
        </div>

        <button @click="logout" class="logout-button">Log Out</button>
      </div>
    </div>
  </div>
</template>

<script>
import { collection, getDocs, addDoc, deleteDoc, doc, serverTimestamp } from "firebase/firestore";
import { signOut } from "firebase/auth";

export default {
  data() {
    return {
      workouts: [],
      newWorkout: '',
      dailySchedule: [],
      dailyTarget: 0,
      timer: null,
      elapsedTime: 0,
    };
  },
  computed: {
    formattedTime() {
      const minutes = Math.floor(this.elapsedTime / 60);
      const seconds = this.elapsedTime % 60;
      return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }
  },
  async mounted() {
    const { $firebase } = this.$nuxt;
    const auth = $firebase.auth;
    const db = $firebase.db;

    try {
      const user = auth.currentUser;
      if (user) {
        const userWorkoutsCollection = collection(db, `users/${user.uid}/workouts`);
        const querySnapshot = await getDocs(userWorkoutsCollection);
        this.workouts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      } else {
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
          const userWorkoutsCollection = collection(db, `users/${user.uid}/workouts`);
          const docRef = await addDoc(userWorkoutsCollection, {
            name: this.newWorkout,
            createdAt: serverTimestamp()
          });
          this.workouts.push({ id: docRef.id, name: this.newWorkout });
          this.newWorkout = '';
        } else {
          this.$router.push('/login');
        }
      } catch (error) {
        console.error('Error adding workout:', error);
      }
    },
    async deleteWorkout(workoutId) {
      const { $firebase } = this.$nuxt;
      const auth = $firebase.auth;
      const db = $firebase.db;

      try {
        const user = auth.currentUser;
        if (user) {
          await deleteDoc(doc(db, `users/${user.uid}/workouts`, workoutId));
          this.workouts = this.workouts.filter(workout => workout.id !== workoutId);
        } else {
          this.$router.push('/login');
        }
      } catch (error) {
        console.error('Error deleting workout:', error);
      }
    },
    addToSchedule(workout) {
      this.dailySchedule.push(workout);
    },
    removeFromSchedule(index) {
      this.dailySchedule.splice(index, 1);
    },
    setTarget() {
      if (this.dailyTarget > 0) {
        console.log(`Daily target set to ${this.dailyTarget} minutes`);
      } else {
        alert("Please set a positive target for your daily workout.");
      }
    },
    startTimer() {
      if (!this.timer) {
        this.timer = setInterval(() => {
          this.elapsedTime++;
          if (this.elapsedTime === this.dailyTarget * 60) {
            alert('Congratulations! You have reached your daily target.');
            this.pauseTimer();
          }
        }, 1000);
      }
    },
    pauseTimer() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    },
    resetTimer() {
      this.pauseTimer();
      this.elapsedTime = 0;
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
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(180deg, #FFD580 0%, #FFAB00 100%);
}

.background-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;
  max-width: 800px;
  height: 90%;
  background-color: #d07b00;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.content-container {
  background-color: #a35600;
  border-radius: 10px;
  width: 100%;
  height: 100%;
  padding: 20px;
  overflow-y: auto;
}

.page-title {
  font-size: 24px;
  color: white;
  text-align: center;
  margin-bottom: 20px;
}

.workouts-list {
  list-style: none;
  padding: 0;
  margin-top: 10px;
  width: 100%;
}

.workout-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  padding: 12px;
  margin-bottom: 8px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.workout-buttons {
  display: flex;
  gap: 10px;
}

.btn-schedule, .btn-delete {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: white;
}

.btn-schedule {
  background-color: #28a745;
}

.btn-schedule:hover {
  background-color: #218838;
}

.btn-delete {
  background-color: #dc3545;
}

.btn-delete:hover {
  background-color: #c82333;
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

.daily-schedule {
  margin-top: 30px;
}

.schedule-list {
  list-style: none;
  padding: 0;
  margin-top: 10px;
  width: 100%;
}

.schedule-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  padding: 12px;
  margin-bottom: 8px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.btn-remove {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: #dc3545;
  color: white;
}

.btn-remove:hover {
  background-color: #c82333;
}

.target-setting {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
}

.input-target {
  width: calc(100% - 100px);
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

.btn-set-target {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-set-target:hover {
  background-color: #0056b3;
}

.target-info {
  margin-top: 10px;
  font-size: 16px;
  color: white;
}

.timer {
  margin-top: 30px;
  text-align: center;
}

.timer-display {
  font-size: 48px;
  font-weight: bold;
  color: white;
  margin: 20px 0;
}

.btn-timer-start, .btn-timer-pause, .btn-timer-reset {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: white;
  margin: 5px;
}

.btn-timer-start {
  background-color: #28a745;
}

.btn-timer-start:hover {
  background-color: #218838;
}

.btn-timer-pause {
  background-color: #ffc107;
  color: black;
}

.btn-timer-pause:hover {
  background-color: #e0a800;
}

.btn-timer-reset {
  background-color: #dc3545;
}

.btn-timer-reset:hover {
  background-color: #c82333;
}

.logout-button {
  display: block;
  margin: 20px auto;
  padding: 10px 20px;
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
