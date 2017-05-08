import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Order from '@/views/pastContent'
import Author from '@/views/Author'
import Category from '@/views/Category'
import Favourite from '@/views/Favourite'
import Settings from '@/views/Settings'
import postDetail from '@/views/postDetail'
import authorHome from '@/views/authorHome'
import articleList from '@/views/articleList'

Vue.use(Router)

export default new Router({
  routes: [
    {
        path: '/',
        redirect : '/home'
    },
      {
          path: '/home',
          name: 'home',
          component: Home
      },
      {
          path:'/older',
          name:'older',
          component: Order
      },
      {
          path : '/author',
          name : 'author',
          component : Author
      },
      {
          path : '/category',
          name : 'category',
          component : Category
      },
      {
          path : '/favourite',
          name : 'favourite',
          component : Favourite
      },
      {
          path : '/settings',
          name : 'settings',
          component : Settings
      },
      {
          path : '/postdetail/:postid',
          name : 'postdetail',
          component : postDetail
      },
      {
          path : '/authorhome/:authorid',
          name : 'authorhome',
          component : authorHome
      },
      {
          path : '/articlelist/:articleid',
          name : 'articlelist',
          component : articleList
      }
  ]
})
