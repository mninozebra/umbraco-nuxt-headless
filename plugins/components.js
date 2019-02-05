import Vue from 'vue'

Vue.component('home', () => import('@/components/Home.vue'))
Vue.component('about', () => import('@/components/About.vue'))
Vue.component('contact', () => import('@/components/Contact.vue'))
