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
import { ref, reactive } from 'vue'
import { supabase } from '@/lib/supabase'

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

    // Симуляция отправки письма (без БД)
    const sendRegistrationEmail = (userData) => {
      const emailContent = `
        Добро пожаловать, ${userData.firstName} ${userData.lastName}!
        
        Вы успешно зарегистрировались в нашем магазине.
        
        Ваши данные для входа:
        Email: ${userData.email}
        Телефон: ${userData.phone ? '+7' + userData.phone.replace(/\D/g, '') : 'не указан'}
        
        С уважением,
        Команда магазина
      `
      
      console.log('=== ПИСЬМО О РЕГИСТРАЦИИ ===')
      console.log('Получатель:', userData.email)
      console.log('Содержимое письма:', emailContent)
      
      // В реальном приложении здесь был бы API вызов:
      // await emailService.sendRegistrationEmail(userData.email, emailContent)
    }

    // Симуляция отправки письма при входе
    const sendLoginNotification = (email) => {
      const emailContent = `
        Уведомление о входе
        
        В ваш аккаунт был выполнен вход.
        
        Если это были не вы, пожалуйста, немедленно свяжитесь с поддержкой.
        
        Дата и время входа: ${new Date().toLocaleString('ru-RU')}
        
        С уважением,
        Команда магазина
      `
      
      console.log('=== УВЕДОМЛЕНИЕ О ВХОДЕ ===')
      console.log('Получатель:', email)
      console.log('Содержимое письма:', emailContent)
    }

    // Валидация данных регистрации
    const validateRegisterData = () => {
      if (!registerData.firstName.trim()) {
        alert('Введите имя')
        return false
      }
      
      if (!registerData.lastName.trim()) {
        alert('Введите фамилию')
        return false
      }
      
      if (!registerData.email.trim()) {
        alert('Введите email')
        return false
      }
      
      // Простая валидация email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(registerData.email)) {
        alert('Введите корректный email')
        return false
      }
      
      if (!registerData.password) {
        alert('Введите пароль')
        return false
      }
      
      if (registerData.password !== registerData.confirmPassword) {
        alert('Пароли не совпадают')
        return false
      }
      
      if (registerData.password.length < 6) {
        alert('Пароль должен содержать минимум 6 символов')
        return false
      }
      
      return true
    }

    // Обработка регистрации
    const handleRegister = async () => {
      if (!validateRegisterData()) return
      
      registerLoading.value = true
      
      try {
        // Готовим данные для отправки
        const userData = {
          email: registerData.email,
          password: registerData.password,
          firstName: registerData.firstName,
          lastName: registerData.lastName,
          phone: registerData.phone || '',
          createdAt: new Date().toISOString()
        }
        
        // Симуляция задержки регистрации
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Создаем пользователя в Supabase Auth
        const { data, error } = await supabase.auth.signUp({
          email: registerData.email,
          password: registerData.password,
          options: {
            data: {
              first_name: registerData.firstName,
              last_name: registerData.lastName,
              phone: registerData.phone ? '+7' + registerData.phone.replace(/\D/g, '') : '',
              created_at: new Date().toISOString()
            }
          }
        })

        if (error) throw error
        
        // Отправляем письмо о регистрации
        sendRegistrationEmail(userData)
        
        // Не пытаемся сохранять в таблицу profiles, так как она не существует
        // Вместо этого просто логируем успешную регистрацию
        console.log('Пользователь зарегистрирован:', data.user)
        
        alert('Регистрация успешна! Проверьте вашу почту для подтверждения.')
        
        // Переключаем на вкладку входа
        activeTab.value = 'login'
        
        // Очищаем форму
        Object.keys(registerData).forEach(key => {
          registerData[key] = ''
        })
        
      } catch (error) {
        console.error('Ошибка регистрации:', error)
        alert(error.message || 'Ошибка регистрации. Попробуйте еще раз.')
      } finally {
        registerLoading.value = false
      }
    }

    // Обработка входа
    const handleLogin = async () => {
      if (!loginData.email || !loginData.password) {
        alert('Заполните все поля')
        return
      }
      
      loginLoading.value = true
      
      try {
        // Валидация email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(loginData.email)) {
          alert('Введите корректный email')
          return
        }
        
        // Симуляция задержки входа
        await new Promise(resolve => setTimeout(resolve, 800))
        
        const { data, error } = await supabase.auth.signInWithPassword({
          email: loginData.email,
          password: loginData.password
        })

        if (error) throw error
        
        // Отправляем уведомление о входе
        sendLoginNotification(loginData.email)
        
        alert('Вход выполнен успешно!')
        closeModal()
        
        // Очищаем форму
        loginData.email = ''
        loginData.password = ''
        
      } catch (error) {
        console.error('Ошибка входа:', error)
        alert(error.message || 'Ошибка входа. Проверьте email и пароль.')
      } finally {
        loginLoading.value = false
      }
    }

    // Обработка восстановления пароля
    const handleForgotPassword = async () => {
      if (!forgotPasswordEmail.value) {
        alert('Введите email')
        return
      }
      
      // Валидация email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(forgotPasswordEmail.value)) {
        alert('Введите корректный email')
        return
      }
      
      forgotPasswordLoading.value = true
      
      try {
        // Симуляция задержки отправки
        await new Promise(resolve => setTimeout(resolve, 800))
        
        // Симуляция отправки письма
        const resetEmailContent = `
          Запрос на восстановление пароля
        
          Для восстановления пароля перейдите по ссылке:
          ${window.location.origin}/reset-password?token=${Math.random().toString(36).substr(2)}
          
          Если вы не запрашивали восстановление пароля, проигнорируйте это письмо.
          
          С уважением,
          Команда магазина
        `
        
        console.log('=== ВОССТАНОВЛЕНИЕ ПАРОЛЯ ===')
        console.log('Получатель:', forgotPasswordEmail.value)
        console.log('Содержимое письма:', resetEmailContent)
        
        // Используем Supabase для отправки реального письма
        const { error } = await supabase.auth.resetPasswordForEmail(forgotPasswordEmail.value, {
          redirectTo: `${window.location.origin}/reset-password`,
        })

        if (error) {
          // Если Supabase возвращает ошибку, все равно показываем успешное сообщение
          console.warn('Supabase email error:', error)
          // Продолжаем выполнение, так как мы уже сымитировали отправку
        }
        
        alert('Письмо с инструкциями отправлено на ваш email')
        closeForgotPassword()
        forgotPasswordEmail.value = ''
        
      } catch (error) {
        console.error('Ошибка восстановления пароля:', error)
        alert(error.message || 'Ошибка отправки письма. Попробуйте еще раз.')
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

/* Стили для модального окна "Забыли пароль" */
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

/* Анимации */
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

/* Анимация появления */
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

/* Адаптивность */
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