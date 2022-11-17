export default [
    {
        path: '/',
        name: 'main',
        redirect: 'home',
        component: () => import('@/views/Ready.vue'),
        children: [{
            name: 'home',
            path: '/home',
            component: () => import(/* webpackChunkName: 'base' */ '@/views/Index.vue')
        }]
    }
]
