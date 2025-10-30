import { createRouter, createWebHistory } from 'vue-router' //Импортируем фабрики из vue-router. экземпляр роутера и включение хистори апи

import Home from '/components/Home.vue'
import Promotions from '../components/Promotions.vue'
import Face from '../components/Face.vue'
import Profile from '../components/Profile.vue'
import NewProducts from '../components/NewProducts.vue'
import About from '../components/About.vue'
import Search from '../components/Search.vue'
import Contacts from '../components/Contacts.vue'
import Cart from '../components/Cart.vue'
import Catalog1 from '../components/Catalog1.vue'
import Body from '../components/Body.vue'
import Hair from '../components/Hair.vue'
import Men from '../components/Men.vue'
import Gifts from '../components/Gifts.vue'
import Series from '../components/Series.vue'
import Accessories from '../components/Accessories.vue'

//таблица маршрутов
const routes = [
  { path: '/', name: 'Home',  component: Home  }, // главная страница
  { path: '/promotions', name: 'Promotions', component: Promotions },  
  { path: '/face', name: 'Face', component: Face},
  { path: '/profile', name: 'Profile', component: Profile},
  { path: '/newproducts', name: 'NewProducts', component: NewProducts},
  { path: '/about', name: 'About', component: About },
  { path: '/search', name: 'Search', component: Search },
  { path: '/contacts', name: 'Contacts', component: Contacts },
  { path: '/cart', name: 'Cart', component: Cart },
  { path: '/catalog1', name: 'Catalog1', component: Catalog1 },
  { path: '/body', name: 'Body', component: Body },
  { path: '/hair', name: 'Hair', component: Hair },
  { path: '/men', name: 'Men', component: Men },
  { path: '/gifts', name: 'Gifts', component: Gifts },
  { path: '/series', name: 'Series', component: Series },
  { path: '/accessories', name: 'Accessories', component: Accessories }
]

const router = createRouter({
  history: createWebHistory(), // красивые адреса без #
  routes  //таблица
})

export default router





