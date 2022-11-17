// import store from '../store'
// import * as services from '../api/index'
import * as utils from './utils'
/** 全局组件 */
// import modules from './widget/modules'
// modules(Vue)

/**
 * 全局组件方法
 */
export default {

    install(myVue: Type.Object) {
        
        // myVue.config.globalProperties.$ajax = services
        
        myVue.config.globalProperties.$utils = utils
        
        // myVue.config.globalProperties.$bus = 
        
        // myVue.prototype.$Ilist = List;
        // myVue.prototype.$Imap = mmap;

        /**
         * 状态管理器相关
         */
        // myVue.prototype.$state = store.state;
        // myVue.prototype.$commit = store.commit;
        // myVue.prototype.$dispatch = store.dispatch;
        // myVue.prototype.$getters = store.getters;
    }
}
