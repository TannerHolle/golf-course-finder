<template>
  <div id="app">
    <h1>Golf Courses Along Route</h1>
    <input
      type="text"
      v-model="start"
      placeholder="Start Location"
    />
    <input
      type="text"
      v-model="end"
      placeholder="End Location"
    />
    <button @click="handleSearch">Search</button>

    <div>
      <h2>Golf Courses</h2>
      <ul>
        <li v-for="course in golfCourses" :key="course.id">
          {{ course.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      start: '',
      end: '',
      golfCourses: []
    };
  },
  methods: {
    async handleSearch() {
      try {
        const response = await axios.post('http://localhost:5000/api/search', {
          start: this.start,
          end: this.end
        });
        this.golfCourses = response.data;
      } catch (error) {
        console.error('Error fetching golf courses:', error);
      }
    }
  }
};
</script>

<style scoped>
/* Add your styles here */
</style>
