import Vue from 'vue'
import Router from 'vue-router'

// 主要
import main from '@/components/main.vue'
import mainDefault from '@/views/index/components/default.vue'
// page
import data from '@/views/index/components/data/data.vue'
import page from '@/views/index/components/page/page.vue'
import plate from '@/views/index/components/plate/plate.vue'
import style from '@/views/index/components/style/style.vue'
// data
import selectData from '@/views/index/components/data/select-data.vue'
import populationDistribution from '@/views/index/components/data/population-distribution.vue'
import poorVillage from '@/views/index/components/data/poor-village.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: main,
      children: [
        {path: '', component: mainDefault},
        {path: 'data', name: 'data', component: data},
        {path: 'page', name: 'page', component: page},
        {path: 'plate', name: 'plate', component: plate},
        {path: 'style', name: 'style', component: style},
        // 数据维护
        {
          path: 'data',
          name: '/data',
          component: data,
          redirect: {name: 'data'},
          children: [
            // 选择数据
            {path: 'select-data', name: 'select-data', component: selectData},
            // 人口分布
            {path: 'population-distribution', name: 'population-distribution', component: populationDistribution},
            // 贫困村
            {path: 'poor-village', name: 'poor-village', component: poorVillage}
          ]
        }
      ]
    }
  ]
})
