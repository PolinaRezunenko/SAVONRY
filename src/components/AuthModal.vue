<template>
  <Transition name="modal">
    <div v-if="isVisible" class="auth-modal-overlay" @click="closeModal">
      <div class="auth-modal-container" @click.stop>
        <button class="close-btn" @click="closeModal">×</button>
        
        <div class="auth-modal-content">
          <!-- Заголовок с вкладками -->
          <div class="auth-tabs">
            <button 
              class="tab-btn" 
              :class="{ active: activeTab === 'register' }"
              @click="activeTab = 'register'"
            >
              Регистрация
            </button>
            <button 
              class="tab-btn" 
              :class="{ active: activeTab === 'login' }"
              @click="activeTab = 'login'"
            >
              Вход
            </button>
          </div>

          <!-- Форма регистрации -->
          <div v-if="activeTab === 'register'" class="auth-form">
            <div class="form-group">
              <label>Имя</label>
              <input 
                v-model="registerData.firstName" 
                type="text" 
                class="form-input"
                placeholder="Имя"
              >
            </div>
            
            <div class="form-group">
              <label>Фамилия</label>
              <input 
                v-model="registerData.lastName" 
                type="text" 
                class="form-input"
                placeholder="Фамилия"
              >
            </div>
            
            <div class="form-group">
              <label>E-mail</label>
              <input 
                v-model="registerData.email" 
                type="email" 
                class="form-input"
                placeholder="E-mail"
              >
            </div>
            
            <div class="form-group">
              <label>Телефон</label>
              <div class="phone-input">
                <span class="phone-prefix">+7</span>
                <input 
                  v-model="registerData.phone" 
                  type="tel" 
                  class="form-input"
                  placeholder="(999) 999-99-99"
                  @input="formatPhone($event)"
                >
              </div>
            </div>
            
            <div class="form-group">
              <label>Пароль</label>
              <input 
                v-model="registerData.password" 
                type="password" 
                class="form-input"
                placeholder="Пароль"
              >
            </div>
            
            <div class="form-group">
              <label>Повторите пароль</label>
              <input 
                v-model="registerData.confirmPassword" 
                type="password" 
                class="form-input"
                placeholder="Повторите пароль"
              >
            </div>
            
            <button 
              class="submit-btn" 
              @click="handleRegister"
              :disabled="registerLoading"
            >
              {{ registerLoading ? 'Регистрация...' : 'Продолжить' }}
            </button>
          </div>

          <!-- Форма входа -->
          <div v-if="activeTab === 'login'" class="auth-form">
            <div class="form-group">
              <label>E-mail</label>
              <input 
                v-model="loginData.email" 
                type="email" 
                class="form-input"
                placeholder="E-mail"
              >
            </div>
            
            <div class="form-group">
              <label>Пароль</label>
              <input 
                v-model="loginData.password" 
                type="password" 
                class="form-input"
                placeholder="Пароль"
              >
            </div>
            
            <button 
              class="submit-btn" 
              @click="handleLogin"
              :disabled="loginLoading"
            >
              {{ loginLoading ? 'Вход...' : 'Продолжить' }}
            </button>
            
            <div class="login-footer">
              <a href="#" class="forgot-password" @click="openForgotPassword">
                Забыли пароль?
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>

  <!-- Модальное окно "Забыли пароль" -->
  <Transition name="modal">
    <div v-if="showForgotPassword" class="auth-modal-overlay" @click="closeForgotPassword">
      <div class="auth-modal-container forgot-password-modal" @click.stop>
        <button class="close-btn" @click="closeForgotPassword">×</button>
        
        <div class="auth-modal-content">
          <h3>Забыли пароль?</h3>
          <p class="forgot-password-text">
            Введите E-Mail Вашей учетной записи. Нажмите кнопку Вперед, 
            чтобы получить пароль по электронной почте.
          </p>
          
          <div class="form-group">
            <label>E-mail</label>
            <input 
              v-model="forgotPasswordEmail" 
              type="email" 
              class="form-input"
              placeholder="E-mail"
            >
          </div>
          
          <button 
            class="submit-btn" 
            @click="handleForgotPassword"
            :disabled="forgotPasswordLoading"
          >
            {{ forgotPasswordLoading ? 'Отправка...' : 'Продолжить' }}
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script>
import { ref, reactive, inject } from 'vue'

export default {
  name: 'AuthModal',
  props: {
    isVisible: {
      type: Boolean,
      default: false
    }
  },
  emits: ['close'],
  setup(props, { emit }) {
    const activeTab = ref('register')
    const notify = inject('notify')
    
    // Данные для регистрации
    const registerData = reactive({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: ''
    })
    
    // Данные для входа
    const loginData = reactive({
      email: '',
      password: ''
    })
    
    // Данные для восстановления пароля
    const forgotPasswordEmail = ref('')
    
    // Состояния загрузки
    const registerLoading = ref(false)
    const loginLoading = ref(false)
    const forgotPasswordLoading = ref(false)
    
    // Видимость модальных окон
    const showForgotPassword = ref(false)

    // Форматирование телефона
    const formatPhone = (event) => {
      const input = event.target
      let value = input.value.replace(/\D/g, '')
      
      // Ограничиваем до 10 цифр
      if (value.length > 10) {
        value = value.slice(0, 10)
      }
      
      // Форматируем номер
      let formatted = ''
      for (let i = 0; i < value.length; i++) {
        if (i === 0) formatted += '('
        if (i === 3) formatted += ') '
        if (i === 6) formatted += '-'
        if (i === 8) formatted += '-'
        formatted += value[i]
      }
      
      // Обновляем значение в поле и в реактивных данных
      input.value = formatted
      registerData.phone = formatted
    }

    // Закрытие модального окна
    const closeModal = () => {
      emit('close')
    }

    // Открытие окна "Забыли пароль"
    const openForgotPassword = () => {
      showForgotPassword.value = true
    }

    // Закрытие окна "Забыли пароль"
    const closeForgotPassword = () => {
      showForgotPassword.value = false
    }

    // Обработка регистрации
    const handleRegister = async () => {
      if (!registerData.firstName.trim()) {
        notify.error('Ошибка', 'Введите имя')
        return
      }
      
      if (!registerData.lastName.trim()) {
        notify.error('Ошибка', 'Введите фамилию')
        return
      }
      
      if (!registerData.email.trim()) {
        notify.error('Ошибка', 'Введите email')
        return
      }
      
      // Простая валидация email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(registerData.email)) {
        notify.error('Ошибка', 'Введите корректный email')
        return
      }
      
      if (!registerData.password) {
        notify.error('Ошибка', 'Введите пароль')
        return
      }
      
      if (registerData.password !== registerData.confirmPassword) {
        notify.error('Ошибка', 'Пароли не совпадают')
        return
      }
      
      if (registerData.password.length < 6) {
        notify.error('Ошибка', 'Пароль должен содержать минимум 6 символов')
        return
      }
      
      registerLoading.value = true
      
      try {
        // Задержка для реалистичности
        await new Promise(resolve => setTimeout(resolve, 800))
        
        // Показываем успешное сообщение
        notify.registerSuccess()
        
        // Переключаем на вкладку входа
        activeTab.value = 'login'
        
        // Очищаем форму
        Object.keys(registerData).forEach(key => {
          registerData[key] = ''
        })
        
      } catch (error) {
        console.error('Ошибка регистрации:', error)
        notify.error('Ошибка', 'Произошла ошибка. Попробуйте еще раз.')
      } finally {
        registerLoading.value = false
      }
    }

    // Обработка входа
    const handleLogin = async () => {
      if (!loginData.email || !loginData.password) {
        notify.error('Ошибка', 'Заполните все поля')
        return
      }
      
      // Валидация email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(loginData.email)) {
        notify.error('Ошибка', 'Введите корректный email')
        return
      }
      
      loginLoading.value = true
      
      try {
        // Задержка для реалистичности
        await new Promise(resolve => setTimeout(resolve, 800))
        
        // Показываем успешное сообщение
        notify.loginSuccess()
        
        closeModal()
        
        // Очищаем форму
        loginData.email = ''
        loginData.password = ''
        
      } catch (error) {
        console.error('Ошибка входа:', error)
        notify.error('Ошибка', 'Произошла ошибка. Попробуйте еще раз.')
      } finally {
        loginLoading.value = false
      }
    }

    // Обработка восстановления пароля
    const handleForgotPassword = async () => {
      if (!forgotPasswordEmail.value) {
        notify.error('Ошибка', 'Введите email')
        return
      }
      
      // Валидация email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(forgotPasswordEmail.value)) {
        notify.error('Ошибка', 'Введите корректный email')
        return
      }
      
      forgotPasswordLoading.value = true
      
      try {
        // Задержка для реалистичности
        await new Promise(resolve => setTimeout(resolve, 800))
        
        // Показываем успешное сообщение
        notify.passwordResetSuccess()
        
        closeForgotPassword()
        forgotPasswordEmail.value = ''
        
      } catch (error) {
        console.error('Ошибка:', error)
        notify.error('Ошибка', 'Произошла ошибка. Попробуйте еще раз.')
      } finally {
        forgotPasswordLoading.value = false
      }
    }

    return {
      activeTab,
      registerData,
      loginData,
      forgotPasswordEmail,
      registerLoading,
      loginLoading,
      forgotPasswordLoading,
      showForgotPassword,
      closeModal,
      openForgotPassword,
      closeForgotPassword,
      formatPhone,
      handleRegister,
      handleLogin,
      handleForgotPassword
    }
  }
}
</script>


<style scoped>
.auth-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
  animation: fadeIn 0.3s ease;
}

.auth-modal-container {
  background: white;
  border-radius: 8px;
  position: relative;
  max-width: 480px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  animation: slideUp 0.3s ease;
}

.auth-modal-content {
  padding: 40px;
}

.close-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #999;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.3s ease;
  z-index: 10;
}

.close-btn:hover {
  background-color: #f5f5f5;
  color: #000;
}

.auth-tabs {
  display: flex;
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 30px;
}

.tab-btn {
  flex: 1;
  padding: 15px 20px;
  background: none;
  border: none;
  font-family: "Mulish-Regular-400";
  font-size: 16px;
  color: #666;
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;
}

.tab-btn:hover {
  color: #000;
}

.tab-btn.active {
  color: #000;
  font-weight: 500;
}

.tab-btn.active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 2px;
  background-color: #000;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-row {
  display: flex;
  gap: 20px;
}

.form-row .form-group {
  flex: 1;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-family: "Mulish-Regular-400";
  font-size: 14px;
  color: #333;
}

.form-input {
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: "Mulish-Regular-400";
  font-size: 16px;
  transition: border-color 0.3s ease;
}

.form-input:focus {
  outline: none;
  border-color: #000;
}

.phone-input {
  display: flex;
  align-items: center;
}

.phone-prefix {
  padding: 12px;
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-right: none;
  border-radius: 4px 0 0 4px;
  font-family: "Mulish-Regular-400";
  font-size: 16px;
}

.phone-input .form-input {
  border-radius: 0 4px 4px 0;
  flex: 1;
}

.submit-btn {
  background-color: #000;
  color: white;
  border: none;
  padding: 16px;
  border-radius: 4px;
  font-family: "Mulish-Regular-400";
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 10px;
}

.submit-btn:hover:not(:disabled) {
  background-color: #333;
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.login-footer {
  text-align: center;
  margin-top: 20px;
}

.forgot-password {
  color: #666;
  text-decoration: none;
  font-family: "Mulish-Regular-400";
  font-size: 14px;
  transition: color 0.3s ease;
}

.forgot-password:hover {
  color: #000;
  text-decoration: underline;
}

.forgot-password-modal .auth-modal-content h3 {
  font-family: "Raleway-SemiBold";
  font-weight: 600;
  font-size: 24px;
  color: #000;
  margin-bottom: 20px;
  text-align: center;
}

.forgot-password-text {
  font-family: "Mulish-Light-300";
  font-size: 14px;
  color: #666;
  line-height: 1.5;
  margin-bottom: 30px;
  text-align: center;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .auth-modal-container,
.modal-leave-active .auth-modal-container {
  transition: transform 0.3s ease;
}

.modal-enter-from .auth-modal-container,
.modal-leave-to .auth-modal-container {
  transform: translateY(-20px);
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .auth-modal-content {
    padding: 30px 20px;
  }
  
  .form-row {
    flex-direction: column;
    gap: 15px;
  }
  
  .auth-tabs {
    flex-direction: column;
  }
  
  .tab-btn {
    text-align: center;
  }
  
  .phone-prefix {
    min-width: 40px;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .auth-modal-container {
    max-width: 95%;
  }
  
  .auth-modal-content {
    padding: 25px 15px;
  }
  
  .tab-btn {
    padding: 12px 15px;
    font-size: 14px;
  }
}
</style>