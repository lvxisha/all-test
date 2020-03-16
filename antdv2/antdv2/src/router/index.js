import Vue from 'vue'
import Router from 'vue-router'
import PersonList from '../views/PersonList'

Vue.use(Router);

export default new Router({
  mode:"history",
  routes:[
    {
      path:"/",
      name:"personList",
      component:PersonList
    },
    {
      path:'/form',
      name:"form",
      component:() => import ('../views/Form')
    },
    {
      path:'/about',
      name:"about",
      component:() => import ('../views/About')
    }

  ]

})

