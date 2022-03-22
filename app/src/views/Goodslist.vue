<template>
  <div class="cate">
    <van-nav-bar title="商品列表" fixed class="nav">
      <template #left>
        <van-icon
          @click="$router.back()"
          name="arrow-left"
          size="20px"
          color="#000"
        />
      </template>
      <template #right>
        <van-icon
          name="shop-o"
          size="20px"
          color="#000"
          @click="goto('/category')"
        />
        <van-icon name="replay" size="20px" color="#000" @click="shuaxin()" />
      </template>
    </van-nav-bar>
    <van-sticky :offset-top="45">
      <van-dropdown-menu>
        <van-dropdown-item
          v-model="value1"
          :options="option1"
          @change="changelist"
        />
        <van-dropdown-item
          v-model="value2"
          :options="option2"
          @change="changelist"
        />
      </van-dropdown-menu>
    </van-sticky>
    <van-row gutter="20">
      <van-col span="11" v-for="item in newlist" :key="item.id">
        <div style="text-align: center" @click="gotoDetail(item.goods_id)">
          <van-image
            width="120"
            height="120"
            :src="goodsurl + item.cover_url"
          />
        </div>
        <h5>{{ item.name }}</h5>
        <p class="price">
          <span>{{ item.market_price * 0.01 }}</span>
        </p>
      </van-col>
    </van-row>
  </div>
</template>
<script>
export default {
  name: "Goodslist",
  data() {
    return {
      newlist: [],
      value1: "数码百货",
      value2: 0,
      goodsurl: "/imgs/miyoupu/",
      option1: [
        { text: "全部商品", value: "数码百货" },
        { text: "新款商品", value: "挂件摆件" },
        { text: "热门商品", value: "日用百货" },
      ],
      option2: [
        { text: "价格升序", value: 0 },
        { text: "价格降序", value: 1 },
      ],
    };
  },
  created() {
    const { category } = this.$route.query;
    if (category) {
      this.$request
        .get("/goods", {
          params: {
            category: category,
            size: 20,
          },
        })
        .then(({ data }) => {
          this.newlist = data.data.data;
        });
    } else {
      this.$request
        .get("/goods", {
          params: {
            size: 20,
          },
        })
        .then(({ data }) => {
          this.newlist = data.data.data;
        });
    }
  },
  methods: {
    shuaxin() {
      location.reload();
    },
    goto(url) {
      this.$router.push(url);
    },
    changelist() {
      this.$request
        .get("/goods", {
          params: {
            category: this.value1,
            sort: `price,${this.value2}`,
            size: 20,
          },
        })
        .then(({ data }) => {
          this.newlist = data.data.data;
        });
    },
    gotoDetail(id) {
      this.$router.push({
        name: "Goods",
        params: {
          id,
        },
      });
    },
  },
};
</script>
<style scoped>
.van-col {
  height: 270px;
  margin: 5px 7px;
  padding: 10px 10px;
  background: white;
  border-radius: 10px;
}
.cate {
  background: #e8eaec;
}
.price span::before {
  content: "￥";
}
.price {
  color: red;
}

.van-icon-shop-o {
  margin-right: 15px;
}
h5 {
  font-size: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-box-pack: center;
  -webkit-box-align: center;
  -webkit-line-clamp: 2;
  overflow: hidden;
  margin: 0;
}
</style>
