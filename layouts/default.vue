<!-- layouts/default.vue -->
<template>
    <div>
      <nav>
        <NuxtLink to="/">Home</NuxtLink>
        <NuxtLink to="/auth">Auth</NuxtLink>
      </nav>
      <Nuxt />
    </div>
  </template>
  
  <style scoped>
  nav {
    display: flex;
    gap: 1rem;
  }
  </style>
  