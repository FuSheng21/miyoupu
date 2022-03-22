<template>
    <div>
          <van-nav-bar title="收货地址" fixed>
      <template #left>
        <van-icon
          @click="$router.back()"
          name="arrow-left"
          size="20px"
          color="#000"
        />    
      </template>
    </van-nav-bar>
      <van-address-list
  v-model="chosenAddressId"
  :list="list"
  default-tag-text="默认"
  @add="onAdd"
  @edit="onEdit"
/>
    </div>
</template>
<script>
export default {
    name:'Shouhuo',
    data() {
    return {
      chosenAddressId: '1',
      list: [],
    };
  },
  created(){
    const userInfo =JSON.parse(localStorage.getItem('userInfo')) 
    this.$request.get('/cart/address/'+userInfo.id).then(({data})=>{
      const address = JSON.parse(data.data.address)
      this.list = address
    })
  },
    methods:{
     onAdd(){
       this.$router.push('/edit')
     },
     onEdit(item){
      this.$router.push({name:'Edit',params:item})
     }
    },
    
}
</script>