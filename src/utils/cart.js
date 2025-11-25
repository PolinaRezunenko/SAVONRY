import { supabase } from '@/lib/supabase'

// Генерируем уникальный ID для сессии
const getSessionId = () => {
  let sessionId = localStorage.getItem('cart_session_id')
  if (!sessionId) {
    sessionId = 'guest_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
    localStorage.setItem('cart_session_id', sessionId)
  }
  return sessionId
}

// Добавление товара в корзину
export const addToCart = async (productId) => {
  try {
    const sessionId = getSessionId()
    
    // Проверяем, есть ли уже такой товар в корзине
    const { data: existingItem } = await supabase
      .from('cart_items')
      .select('*')
      .eq('session_id', sessionId)
      .eq('product_id', productId)
      .single()

    if (existingItem) {
      // Если товар уже есть, увеличиваем количество
      const { error } = await supabase
        .from('cart_items')
        .update({ quantity: existingItem.quantity + 1 })
        .eq('id', existingItem.id)

      if (error) throw error
    } else {
      // Если товара нет, добавляем новый
      const { error } = await supabase
        .from('cart_items')
        .insert([
          { 
            session_id: sessionId,
            product_id: productId,
            quantity: 1
          }
        ])

      if (error) throw error
    }

    return { success: true }
  } catch (error) {
    console.error('Ошибка добавления в корзину:', error)
    return { success: false, error }
  }
}

// Получение количества товаров в корзине
export const getCartCount = async () => {
  try {
    const sessionId = getSessionId()
    
    const { data, error } = await supabase
      .from('cart_items')
      .select('quantity')
      .eq('session_id', sessionId)

    if (error) throw error

    const totalCount = data ? data.reduce((sum, item) => sum + item.quantity, 0) : 0
    return totalCount
  } catch (error) {
    console.error('Ошибка получения количества корзины:', error)
    return 0
  }
}

// Получение всех товаров корзины
export const getCartItems = async () => {
  try {
    const sessionId = getSessionId()
    
    const { data, error } = await supabase
      .from('cart_items')
      .select(`
        *,
        products (*)
      `)
      .eq('session_id', sessionId)

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Ошибка получения корзины:', error)
    return []
  }
}

// Обновление количества товара
export const updateCartItemQuantity = async (itemId, newQuantity) => {
  try {
    if (newQuantity < 1) {
      // Если количество 0, удаляем товар
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('id', itemId)

      if (error) throw error
    } else {
      // Обновляем количество
      const { error } = await supabase
        .from('cart_items')
        .update({ quantity: newQuantity })
        .eq('id', itemId)

      if (error) throw error
    }

    return { success: true }
  } catch (error) {
    console.error('Ошибка обновления корзины:', error)
    return { success: false, error }
  }
}

// Удаление товара из корзины
export const removeFromCart = async (itemId) => {
  try {
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('id', itemId)

    if (error) throw error
    return { success: true }
  } catch (error) {
    console.error('Ошибка удаления из корзины:', error)
    return { success: false, error }
  }
}