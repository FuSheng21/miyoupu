import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import request from './utils/request'
import echarts from 'echarts'
Vue.prototype.$echarts=echarts

import { Pagination, Dialog, Autocomplete, Dropdown, DropdownMenu, DropdownItem, Menu, Submenu, MenuItem, MenuItemGroup, Input, InputNumber, Radio, RadioGroup, RadioButton, Checkbox, CheckboxButton, CheckboxGroup, Switch, Select, Option, OptionGroup, Button, ButtonGroup, Table, TableColumn, DatePicker, TimeSelect, TimePicker, Popover, Tooltip, Breadcrumb, BreadcrumbItem, Form, FormItem, Tabs, TabPane, Tag, Tree, Alert, Slider, Icon, Row, Col, Upload, Progress, Spinner, Badge, Card, Rate, Steps, Step, Carousel, CarouselItem, Collapse, CollapseItem, Cascader, ColorPicker, Transfer, Container, Header, Aside, Main, Footer, Timeline, TimelineItem, Link, Divider, Image, Calendar, Backtop, PageHeader, CascaderPanel, Loading, MessageBox, Message, Notification
} from 'element-ui';

Vue.use(Pagination);
Vue.use(Dialog);
Vue.use(Autocomplete);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Input);
Vue.use(InputNumber);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(RadioButton);
Vue.use(Checkbox);
Vue.use(CheckboxButton);
Vue.use(CheckboxGroup);
Vue.use(Switch);
Vue.use(Select);
Vue.use(Option);
Vue.use(OptionGroup);
Vue.use(Button);
Vue.use(ButtonGroup);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(DatePicker);
Vue.use(TimeSelect);
Vue.use(TimePicker);
Vue.use(Popover);
Vue.use(Tooltip);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Tag);
Vue.use(Tree);
Vue.use(Alert);
Vue.use(Slider);
Vue.use(Icon);
Vue.use(Row);
Vue.use(Col);
Vue.use(Upload);
Vue.use(Progress);
Vue.use(Spinner);
Vue.use(Badge);
Vue.use(Card);
Vue.use(Rate);
Vue.use(Steps);
Vue.use(Step);
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(Cascader);
Vue.use(ColorPicker);
Vue.use(Transfer);
Vue.use(Container);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Footer);
Vue.use(Timeline);
Vue.use(TimelineItem);
Vue.use(Link);
Vue.use(Divider);
Vue.use(Image);
Vue.use(Calendar);
Vue.use(Backtop);
Vue.use(PageHeader);
Vue.use(CascaderPanel);


Vue.use(Loading.directive);

Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;


Vue.prototype.$message = Message;
Vue.prototype.$request = request;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

// 全局路由守卫
router.beforeEach(function(to,from,next){
  // 访问后台页面都需要用户登录才能访问
    if(to.path.startsWith('/manage')){
    // 判断是否登录
    if(store.getters.isLogin){
      // 假设所有的用户都是好人,先放行，后校验
      // 如果用户已登录，则校验用户身份
      const token=store.state.adminuserInfo.authorization
      router.app.$request.get('/user/verify',{
        headers:{
          Authorization:token
        }
      }).then(({data})=>{
        if(data.code === 401){
          store.dispatch('logout')
          router.push({
            path:'/login',
            query:{
              // 用户访问的目标页面
              targetUrl:to.fullPath
            }
          })
        }
      })
      next()
    }else{
      router.push({
        path:'/login',
        query:{
          // 用户访问的目标页面
          targetUrl:to.fullPath
        }
      })
    }
  }else{
    next();
  }
})
