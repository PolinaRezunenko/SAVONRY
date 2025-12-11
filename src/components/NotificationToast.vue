<template>
  <transition-group name="notification">
    <div
      v-for="notification in notifications"
      :key="notification.id"
      :class="['notification-toast', `notification-toast--${notification.type}`]"
      @mouseenter="pauseTimer(notification.id)"
      @mouseleave="resumeTimer(notification.id)"
    >
      <div class="notification-content">
        <div class="notification-icon">
          <span v-if="notification.type === 'success'">✓</span>
          <span v-if="notification.type === 'error'">✗</span>
          <span v-if="notification.type === 'info'">ℹ</span>
        </div>
        <div class="notification-body">
          <h4 class="notification-title">{{ notification.title }}</h4>
          <p class="notification-message">{{ notification.message }}</p>
        </div>
        <button class="notification-close" @click="remove(notification.id)">×</button>
      </div>
      <div v-if="notification.duration > 0" 
           class="notification-progress"
           :style="{
             animationDuration: `${notification.duration}ms`,
             animationPlayState: notification.paused ? 'paused' : 'running'
           }">
      </div>
    </div>
  </transition-group>
</template>

<script setup>
import { ref, onUnmounted } from 'vue'

const notifications = ref([])
const timers = new Map()

const generateId = () => Date.now().toString(36) + Math.random().toString(36).substr(2)

const show = (options) => {
  const id = generateId()
  
  const notification = {
    id,
    type: options.type || 'success',
    title: options.title,
    message: options.message,
    duration: options.duration || 4000,
    paused: false
  }

  notifications.value.unshift(notification)

  if (notification.duration > 0) {
    const timer = setTimeout(() => remove(id), notification.duration)
    timers.set(id, timer)
  }

  return id
}

const remove = (id) => {
  const index = notifications.value.findIndex(n => n.id === id)
  if (index !== -1) {
    const timer = timers.get(id)
    if (timer) {
      clearTimeout(timer)
      timers.delete(id)
    }
    notifications.value.splice(index, 1)
  }
}

const pauseTimer = (id) => {
  const notification = notifications.value.find(n => n.id === id)
  if (notification && notification.duration > 0) {
    notification.paused = true
    const timer = timers.get(id)
    if (timer) {
      clearTimeout(timer)
      timers.delete(id)
    }
  }
}

const resumeTimer = (id) => {
  const notification = notifications.value.find(n => n.id === id)
  if (notification && notification.duration > 0) {
    notification.paused = false
    const timer = setTimeout(() => remove(id), notification.duration)
    timers.set(id, timer)
  }
}

// Helper methods
const success = (title, message, duration = 4000) => show({ type: 'success', title, message, duration })
const error = (title, message, duration = 5000) => show({ type: 'error', title, message, duration })
const info = (title, message, duration = 4000) => show({ type: 'info', title, message, duration })

onUnmounted(() => {
  timers.forEach(timer => clearTimeout(timer))
  timers.clear()
})

defineExpose({ show, success, error, info, remove })
</script>

<style scoped>
/* Контейнер будет добавлен в App.vue */
.notification-toast {
  background-color: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  border-left: 4px solid;
  position: relative;
  overflow: hidden;
  pointer-events: auto;
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.95);
  font-family: 'Mulish-Regular-400', sans-serif;
  margin-bottom: 15px;
  max-width: 500px;
  width: 100%;
}

.notification-content {
  display: flex;
  align-items: flex-start;
  gap: 15px;
}

.notification-icon {
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: bold;
}

.notification-body {
  flex: 1;
}

.notification-title {
  font-family: 'Mulish-Regular-400', sans-serif;
  font-weight: 600;
  color: #292966;
  font-size: 16px;
  margin: 0 0 5px 0;
  text-align: center;
}

.notification-message {
  font-family: 'Mulish-Light-300', sans-serif;
  color: #666;
  font-size: 14px;
  line-height: 1.4;
  margin: 0;
  text-align: center;
}

.notification-close {
  background: none;
  border: none;
  font-size: 24px;
  color: #999;
  cursor: pointer;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.notification-close:hover {
  background-color: rgba(41, 41, 102, 0.1);
  color: #292966;
}

.notification-progress {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  background: currentColor;
  opacity: 0.3;
  animation: progress linear forwards;
}

/* Colors for different types */
.notification-toast--success {
  border-color: #10b981;
  color: #10b981;
}

.notification-toast--success .notification-icon {
  background-color: rgba(16, 185, 129, 0.1);
}

.notification-toast--error {
  border-color: #ef4444;
  color: #ef4444;
}

.notification-toast--error .notification-icon {
  background-color: rgba(239, 68, 68, 0.1);
}

.notification-toast--info {
  border-color: #3b82f6;
  color: #3b82f6;
}

.notification-toast--info .notification-icon {
  background-color: rgba(59, 130, 246, 0.1);
}

/* Animations */
.notification-enter-active,
.notification-leave-active {
  transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.notification-enter-from {
  opacity: 0;
  transform: translateY(-20px) scale(0.9);
}

.notification-enter-to {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.notification-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.notification-leave-to {
  opacity: 0;
  transform: translateY(-20px) scale(0.9);
}

@keyframes progress {
  from { width: 100%; }
  to { width: 0%; }
}

/* Responsive */
@media (max-width: 640px) {
  .notification-toast {
    padding: 16px;
    margin-bottom: 10px;
    max-width: 90%;
  }
  
  .notification-icon {
    width: 28px;
    height: 28px;
    font-size: 16px;
  }
  
  .notification-title {
    font-size: 14px;
  }
  
  .notification-message {
    font-size: 13px;
  }
}
</style>