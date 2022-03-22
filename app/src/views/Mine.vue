<template>
  <div class="grzx">
        <van-nav-bar title="个人中心" fixed>
      <template #left>
        <van-icon
          @click="$router.back()"
          name="arrow-left"
          size="20px"
          color="#000"
        />
      </template>
      <template #right>
        <van-icon name="replay" size="20px" color="#000" @click="shuaxin()"/>
      </template>
    </van-nav-bar>
    <div class="geren">
      <van-row type="flex">
        <van-col span="7">
          <van-image
            round
            width="80"
            height="80"
            :src="img"
          />
        </van-col>
        <van-col span="10">
          <h1 class="tit">{{this.userInfo.username}}</h1>
          <p class="userid">通行证 ID：{{this.userInfo.id}}</p>
        </van-col>
      </van-row>
    </div>
   <div class="navtwo">
      <van-cell v-for="item in menu"
    :key="item.text" 
    :title="item.text" 
    :icon="item.icon" 
    :to="item.path"
    title-style="font-size:18px;"
    is-link  /> 
   </div>
   <van-cell center title="退出登录"
   @click="del"
    title-style="text-align: center;font-size:18px;"/> 
  </div>
</template>
<script>
export default {
  name: "Mine",
  data() {
    return {
        userInfo:{},
        img:'https://img01.yzcdn.cn/vant/cat.jpeg',
      menu: [
          {
          path: "/message",
          text: "修改个人信息",
          icon: "edit",
        },
        {
          path: "/order",
          text: "我的订单",
          icon: "records",
        },
        {
          path: "/mine",
          text: "我的优惠券",
          icon: "balance-pay",
        },
        {
          path: "/shouhuo",
          text: "我的收货地址",
          icon: "location-o",
        },
        {
          path: "/mine",
          text: "联系客服",
          icon: "service-o",
        },
        {
          path: "/mine",
          text: "查看《服务条款》",
          icon: "newspaper-o",
        },
      ],
    };
  },
  created(){
      this.userInfo = JSON.parse(localStorage.getItem('userInfo')) 
      if(!(this.userInfo.tximg_url==null)){
        this.img=`/uimages/`+this.userInfo.tximg_url
      }
  },
  methods:{
    del(){
      localStorage.removeItem('userInfo')
      localStorage.removeItem('cartlist')
      this.$router.push('/login')
    },
    shuaxin(){
    location. reload()
    },
    
  },
};
</script>
<style  scoped>
.van-row {
  width: 100%;
  height: 130px;
  margin-top: 3px;
  background: #fff;
  align-content: space-around;
}
.van-col--7 {
  padding: 15px 0 15px 20px;
}
.tit {
  font-size: 20px;
  margin-bottom: 5px;
  
}
.userid {
  font-size: 16px;
}
.van-col--10 {
  padding-top: 25px;
}
.navtwo{
    margin: 20px 0;
    background: #fff;
}
.van-icon{
    font-size: 20px;
    color: #666;
}
.grzx,#app,html,body{
  background: #f3f3f4;
  height: 735px;
}
</style>