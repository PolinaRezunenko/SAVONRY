<template>
  <header class="header">
    <div class="header-content">
      <div class="logo">
        <h1>Параллель</h1>
      </div>
      <nav class="navigation">
        <div class="nav-section">
          <h3 class="nav-title">Навички</h3>
          <ul class="nav-list">
            <li class="nav-item">
              <span class="nav-category">Новинки</span>
              <ul class="sub-list">
                <li>Саймония</li>
                <li>Баллады</li>
                <li>Фабрикаты</li>
              </ul>
            </li>
          </ul>
        </div>
        
        <div class="nav-section">
          <h3 class="nav-title">Навички</h3>
          <ul class="nav-list">
            <li class="nav-item">
              <span class="nav-category">Новинки</span>
              <ul class="sub-list">
                <li>Саймония</li>
                <li>Баллады</li>
                <li>Фабрикаты</li>
              </ul>
            </li>
          </ul>
        </div>
        
        <div class="nav-section">
          <h3 class="nav-title">Навички</h3>
          <ul class="nav-list">
            <li class="nav-item">
              <span class="nav-category">Новинки</span>
              <ul class="sub-list">
                <li>Саймония</li>
                <li>Баллады</li>
                <li>Фабрикаты</li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style scoped>
.header {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 2px solid #e0e0e0;
  padding: 1rem 0;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.logo h1 {
  color: #4a5568;
  font-size: 2rem;
  font-weight: 700;
  margin-right: 3rem;
}

.navigation {
  display: flex;
  gap: 3rem;
  flex-grow: 1;
  justify-content: space-around;
}

.nav-section {
  flex: 1;
}

.nav-title {
  color: #2d3748;
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  border-bottom: 2px solid #667eea;
  padding-bottom: 0.25rem;
}

.nav-list {
  list-style: none;
}

.nav-item {
  margin-bottom: 0.5rem;
}

.nav-category {
  display: block;
  color: #667eea;
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
}

.sub-list {
  list-style: none;
  padding-left: 1rem;
}

.sub-list li {
  color: #4a5568;
  font-size: 0.85rem;
  padding: 0.1rem 0;
  transition: color 0.3s ease;
  cursor: pointer;
}

.sub-list li:hover {
  color: #667eea;
}

@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  .navigation {
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    margin-top: 1rem;
  }
  
  .logo h1 {
    margin-right: 0;
    margin-bottom: 1rem;
  }
}
</style>