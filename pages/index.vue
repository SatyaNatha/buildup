<template>
  <div>
    <header>
      <!-- Ubah router-link pada logo menjadi elemen div -->
      <div class="logo">
        <img src="./Logo 2.png" />
      </div>
      <div class="tombolAtas">
        <nav>
          <!-- Link navigasi tetap menggunakan router-link -->
          <router-link to="/register" class="signUp">Sign Up</router-link>
          <router-link to="/login" class="signIn">Sign In</router-link>
        </nav>
      </div>
    </header>
    <main>
      <h1>Selamat Datang di Build Up!</h1>
      <h2>Aplikasi Olahraga di Rumah</h2>
      <div class="content">
        <div class="item">
          <img src="./gambar5.jpg" alt="Image 2" />
          <h2>Jadwalkan Aktivitas Anda</h2>
          <p>Atur dan kelola aktivitas harian Anda dengan mudah.</p>
        </div>
        <div class="item">
          <img src="./gambar4.jpg" alt="Image 3" />
          <h2>Capai Tujuan Kebugaran Anda.</h2>
          <p>Tetapkan dan capai tujuan kebugaran Anda secara efektif.</p>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'BuildUp',
  methods: {
    signUp() {
      // Navigasi ke halaman Register
      this.$router.push('/register');
    },
    signIn() {
      // Navigasi ke halaman Login
      this.$router.push('/login');
    }
  }
}
</script>

<style scoped>
  body {
    margin: 0;
    padding: 0;
    font-family: 'Roboto', sans-serif;
    background-color: #f0f0f0;
  }
  
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 40px;
    background-color: #ebeaea;
    border-bottom: 2px solid #af6f01;
    color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  header .logo {
    display: flex;
    font-size: 25px;
    font-weight: bold;
    font-family: 'Abril Fatface';
    color: #ffffff;
    background-color: #af6f01;
    border-radius: 5px;
    width: 190px;
    height: 75px;
    justify-content: center;
    align-items: center;
    cursor: default; /* Cursor default untuk menandakan tidak ada aksi saat diklik */
  }
  
  header .logo img {
    height: 200px;
  }
  
  header .tulisan {
    margin-right: 10px;
  }
  
  header nav a {
    color: #1e1d1d;
    text-decoration: none;
    padding: 10px 15px;
    border-radius: 8px;
    font-weight: bold;
    margin-left: auto;
    font-size: 20px;
    transition: color 0.3s ease;
  }
  
  header nav a.signUp {
    font-family: 'Roboto';
    color: #af6f01;
  }
  
  header nav a.signIn {
    font-family: 'Roboto';
  }
  
  header nav a.signUp:hover {
    background-color: #ff914d;
    color: #ffffff;
  }
  
  header nav a.signIn:hover {
    background-color: #ff914d;
    color: #ffffff;
  }
  
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px 20px;
    background-color: #f7f7f7;
    color: #af6f01;
    min-height: 100vh;
  }
  
  main h1 {
    font-size: 48px;
    margin-bottom: 0px;
    color: #af6f01;
  }
  
  main h2 {
    font-size: 25px;
    margin-bottom: 90px;
    color: #ffffff;
    background-color: #af6f01;
    padding: 10px 20px;
    border-radius: 10px;
  }
  
  .content {
    display: flex;
    flex-wrap: wrap;
    gap: 150px;
    justify-content: center;
  }
  
  .content .item {
    background-color: #af6f01;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 300px;
    text-align: center;
  }
  
  .content .item img {
    width: 100%;
    border-radius: 8px;
    margin-bottom: 20px;
  }
  
  .content .item h2 {
    font-size: 24px;
    margin-bottom: 10px;
    color: #ffffff;
  }
  
  .content .item p {
    font-size: 16px;
    margin-bottom: 20px;
    color: #ffffff;
  }
  
  .buttons {
    display: flex;
    gap: 20px;
    margin-top: 40px;
  }
  </style>