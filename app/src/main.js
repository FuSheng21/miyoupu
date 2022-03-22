import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import request from './utils/request'

import {Swipe, SwipeItem,GoodsAction, GoodsActionIcon, GoodsActionButton, NavBar,Tabbar, 
        TabbarItem ,Icon,Form ,Field,Button ,Dialog ,Notify ,Toast,Overlay, Empty,
        Image as VanImage , Col, Row ,Cell, CellGroup,Tab, Tabs,Grid, GridItem,AddressList,
        AddressEdit,DropdownMenu, DropdownItem,ImagePreview,Sku,SubmitBar,Checkbox,Stepper,Popup,
        SwipeCell,RadioGroup, Radio,Card ,Sticky ,Uploader} from 'vant';

Vue.use(NavBar);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Icon);
Vue.use(Form);
Vue.use(Field);
Vue.use(Button);
Vue.use(Overlay)
Vue.use(VanImage)
Vue.use(Empty)
Vue.use(Col)
Vue.use(Row)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(AddressList)
Vue.use(AddressEdit)
Vue.use(Dialog)
Vue.use(Notify)
Vue.use(Toast)
Vue.use(GoodsAction);
Vue.use(GoodsActionButton);
Vue.use(GoodsActionIcon);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(ImagePreview);
Vue.use(Sku);
Vue.use(SubmitBar);
Vue.use(Checkbox);
Vue.use(Stepper);
Vue.use(Popup );
Vue.use(SwipeCell);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Card);
Vue.use(Sticky);
Vue.use(Uploader);



Vue.prototype.$request = request

Vue.config.productionTip = false

new Vue({
  // 把路由实例注入Vue
  router:router,
  // 把store注入Vue
  store:store,
  render: h => h(App),
}).$mount('#app')
