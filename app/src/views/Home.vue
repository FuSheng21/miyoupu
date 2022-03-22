<template>
  <div class="box">
    <van-nav-bar title="原神万有铺子" fixed style="height:50px">
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
    <div
      class="back back1"
      style="background-image: url(../img/header.jpg)"
    ></div>
    <div class="back back2" style="background-image: url(../img/bjt.jpg)"></div>


    <div class="back back3" style="background-image: url(../img/main_1.jpg)">
   
      <van-grid :column-num="2"  class="back3list" :gutter="10">
     
            <van-grid-item
          class="griditem grid_item"
          v-for="item in goodslist"
          :key="item.homeid"
          @click="goods(item.goods_id)"
        ></van-grid-item>
      </van-grid>
    </div>
    <div class="back back4" style="background-image: url(../img/main_2.jpg)">
      <van-grid :column-num="1" class="back4list" >
        <van-grid-item
          v-for="item in ydly"
          :key="item.goods_id"
          class="grid_item"
          @click="goods(item.goods_id)"
        ></van-grid-item>
      </van-grid>
    </div>
    <div class="back back5" style="background-image: url(../img/main_3.jpg)">
      <van-grid :column-num="1" class="back5list" :gutter="0">
        <van-grid-item
          v-for="item in ztxl1"
          :key="item.goods_id"
          class="grid_item" 
          @click="goods(item.goods_id)"
        ></van-grid-item>
      </van-grid>
      <van-grid :column-num="2" class="back5list2" :gutter="0">
        <van-grid-item
          v-for="item in ztxl1"
          :key="item.goods_id"
          class="grid_item griditem"
          @click="goods(item.goods_id)"
        ></van-grid-item>
      </van-grid>
    </div>
    <div class="back back6" style="background-image: url(../img/main_4.jpg)">
      <van-grid :column-num="2" class="back5list back6list" :gutter="0">
        <van-grid-item icon="photo-o" text="文字" class="grid_item griditem" />
        <van-grid-item
          v-for="item in smbh"
          :key="item.goods_id"
          class="grid_item griditem"
          @click="goods(item.goods_id)"
        ></van-grid-item>
      </van-grid>
    </div>
    <div class="back back7" style="background-image: url(../img/main_5.jpg)">
      <van-grid :column-num="2" class="back7list" :gutter="0">
        <van-grid-item
          v-for="item in jslh1"
          :key="item.goods_id"
          class="grid_item griditem"
          @click="goods(item.goods_id)"
        ></van-grid-item>
      </van-grid>
      <van-grid :column-num="1" class="back7list2" :gutter="0">
        <van-grid-item
          v-for="item in jslh2"
          :key="item.goods_id"
          class="grid_item"
          @click="goods(item.goods_id)"
        ></van-grid-item>
      </van-grid>
        <div class="yszuti">
          <div v-for="item in jslh3" :key="item.goods_id" class="grid_item" @click="goods(item.goods_id)"></div>
        </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Home",
  data() {
    return {
      goodslist: [],
      ydly: [],
      ztxl1: [],
      ztxl2: [],
      smbh: [],
      jslh1: [],
      jslh2: [],
      jslh3: [],
      kdx:{}
    };
  },

  created() {
    this.$request
      .get("/goods/home", {
        params: {
          size: 34,
        },
      })
      .then(({ data }) => {
        this.goodslist = data.data.splice(0, 10);
        this.ydly = data.data.splice(0, 1);
        this.ztxl1 = data.data.splice(0, 2);
        this.ztxl2 = data.data.splice(0, 2);
        this.smbh = data.data.splice(0, 9);
        this.jslh1 = data.data.splice(0, 2);
        this.jslh2 = data.data.splice(0, 1);
        this.jslh3 = data.data;
        this.jslh3.push(this.kdx)
      });
  },
  methods: {
    goods(id) {
      this.$router.push({
        name: "Goods",
        params: {
          id,
        },
      });
    },
    shuaxin(){
    location. reload()
    }
  },
};
</script>
<style scoped >
.yszuti{
  margin-top: 194px;

  width: 100%;
  height: 250px;
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;
  justify-content: space-around;
}
.yszuti>div{
  width: 80px;
  height: 20px;
  background: #fff;
}
.box {
  width: 100%;
  height: 5248px;
}
.back {
  width: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
  background-position: center center;
  display: inline-block;
  vertical-align: top;
}

.back1 {
  height: 75px;
}
.back2 {
  height: 364px;
}
.back3 {
  height: 1333px;
}
.back3list {
  margin-top: 62px;
  height: 1250px;
  padding-left: 0px;
}
.back4list {
  margin-top: 62px;
  width: 100%;
  height: 313px;
}
.back5list {
  margin-top: 62px;
  width: 100%;
  height: 430px;
}
.back6list {
  margin-top: 62px;
  height: 1270px;
}
.back7list {
  margin-top: 62px;
  height: 245px;
}
.back7list2 {
  margin-top: 5px;
  height: 213px;
}
.grid_item {
  opacity: 0;
}
.griditem {
  width: 185px;
  height: 245px;
}
.back4 {
  height: 378px;
}
.back5 {
  height: 749.5px;
}
.back6 {
  height: 1338px;
}
.back7 {
  height: 1010.5px;
}
</style>
