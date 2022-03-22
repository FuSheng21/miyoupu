<template>
  <van-row>
    <van-nav-bar :title="name" left-arrow fixed @click-left="$router.back()">
      <template #right>
        <van-icon name="replay" size="20" color="#000" />
      </template>
    </van-nav-bar>

    <van-swipe
      class="my-swipe"
      :autoplay="3000"
      indicator-color="white"
      @change="onChange"
      @click="showpa = true"
    >
      <van-swipe-item
        v-for="item in banner_url"
        :key="item"
        @click="showpa = true"
      >
        <van-image width="100%" height="100%" :src="baseurl + item" />
      </van-swipe-item>
      <template #indicator>
        <div class="custom-indicator">{{ current + 1 }}/{{ bannernum }}</div>
      </template>
    </van-swipe>

    <van-image-preview v-model="showpa" :images="images" @change="Changepa">
      <template v-slot:index>{{ index + 1 }}/{{ bannernum }}</template>
    </van-image-preview>

    <van-row>
      <p class="name">{{ name }}</p>
      <p>
        <i class="price"
          ><span>{{ price }}</span></i
        >
      </p>
    </van-row>

    <van-button plain style="width: 100%; text-align: left" @click="changeshow"
      >请选择商品款式</van-button
    >

    <h5>商品详情</h5>

    <van-image
      width="100%"
      height="100%"
      v-for="item in main_url"
      :key="item"
      :src="baseurl + item"
    />

    <van-goods-action>
      <van-goods-action-icon icon="wap-home-o" text="首页" to="/home" />
      <van-goods-action-icon icon="service-o" text="客服" dot />
      <van-goods-action-icon
        icon="cart-o"
        text="购物车"
        :badge="cartlist.length"
        to="/cart"
      />
      <van-goods-action-button
        type="warning"
        text="加入购物车"
        @click="changeshow"
      />
      <van-goods-action-button
        type="danger"
        text="立即购买"
        @click="changeshow"
      />
    </van-goods-action>

    <van-popup
      v-model="show"
      closeable
      close-icon-position="top-right"
      position="bottom"
      :style="{ height: '60%' }"
      click.stop
    >
      <div class="sku">
        <div class="header">
          <van-image width="7.5rem" height="7.5rem" :src="crrenurl" />
          <i class="price skuprice"
            ><span>{{ crrenprice / 100 }}</span></i
          >
        </div>

        <div class="goods_text">
          <van-button
            type="default"
            v-for="item in goodslist"
            :key="item.goods_id"
            @click.stop="crrenchecked(item)"
            :class="crreact(item.goods_id)"
            >{{ item.text }}</van-button
          >
        </div>

        <div class="quta">
          <van-cell title="购买数量" click.stop>
            <template #default>
              <van-stepper v-model="value" disable-input max="10" />
            </template>
          </van-cell>
        </div>

        <van-tabbar class="pay">
          <van-button type="default" @click.stop="addcart"
            >加入购物车</van-button
          >
          <van-button type="default">立即购买</van-button>
        </van-tabbar>
      </div>
    </van-popup>
  </van-row>
</template>

<script>
import { updateStorage } from "../utils";
export default {
  name: "Goods",
  data() {
    return {
      uid: "",
      baseurl: "/imgs/xiangqing/",
      goodsurl: "/imgs/showgoods/",
      index: 0,
      images: [],
      banner_url: [],
      main_url: [],
      goodslist: [],
      name: "",
      price: "",
      current: 0,
      show: false,
      showpa: false,
      value: 1,
      crrenid: "",
      crrename: "",
      crrenurl: "",
      crrenprice: "",
      cartlist: [],
      state: false,
      userinfo: "",
      xid:''
    };
  },
  computed: {
    bannernum() {
      return this.banner_url.length;
    },
  },
  methods: {
    onChange(index) {
      this.current = index;
    },
    goto(url) {
      this.$router.push(url);
    },
    changeshow() {
      this.show = true;
    },
    Changepa(index) {
      this.index = index;
    },
    crrenchecked(item) {
      this.state = true;
      this.crrenid = item.goods_id;
      this.crrename = item.text;
      this.crrenprice = item.price;
      this.crrenurl = this.goodsurl + item.cover_url;
    },
    crreact(id) {
      if (this.crrenid == id) {
        return "active";
      } else {
        return "";
      }
    },

    addcart() {
      if (this.userinfo == null || !this.userinfo.id) {
        this.$toast("您还没有登录");
        this.$router.push("/login");
        return;
      }

      if (!this.state) {
        this.$toast("您还没选择商品");
        return;
      }
      this.show = false;
      const goods = {
        id: this.xid,
        name: this.name,
        goods_id: this.crrenid,
        goods_name: this.crrename,
        price: this.crrenprice,
        cover_url: this.crrenurl,
        qty: this.value,
      };

      if (this.cartlist.length == 0) {
        this.cartlist.push(goods);
      } else {
        const id = this.crrenid;
        let currentGoods = this.cartlist.find(function (item) {
          return item.goods_id == id;
        });
        if (currentGoods) {
          this.cartlist.forEach((item) => {
            if (item.goods_id == this.crrenid) {
              item.qty += this.value;
            }
          });
        } else {
          this.cartlist.push(goods);
        }
      }

      const cartlist = JSON.stringify(this.cartlist);

      this.$request
        .post("/cart", {
          userid: this.uid,
          goodslist: cartlist,
        })
        .then(({ data }) => {
          if (data.code == 200) {
            this.$toast("添加购物车成功");
          }
          updateStorage("cartlist", this.cartlist);
        });
    },
  },

  created() {
    this.$parent.showTabbar = false;

    let userInfo = localStorage.getItem("userInfo");
    try {
      userInfo = JSON.parse(userInfo) || {};
    } catch (err) {
      userInfo = {};
    }
    if (userInfo.id) {
      this.userinfo = userInfo;
      this.uid = userInfo.id;
      this.$request.get("/cart/" + this.uid).then(({ data }) => {
        if (data.data.goodslist == null) {
          return;
        }
        if (data.code == 200) {
          this.cartlist = JSON.parse(data.data.goodslist);
        }
        updateStorage("cartlist", this.cartlist);
      });
    }

    const { id } = this.$route.params;

    this.$request.get("/goods/details/" + id).then(({ data }) => {
      const datas = data.data;
      const banner_url = JSON.parse(datas.banner_url);
      const goodslist = JSON.parse(datas.goods);
      const main_url = JSON.parse(datas.main_url);
      this.main_url = main_url;
      this.banner_url = banner_url;
      this.goodslist = goodslist;

      for (let item in banner_url) {
        this.images.push(this.baseurl + banner_url[item]);
      }
    });
    this.$request.get("/goods/" + id).then(({ data }) => {
      const datas = data.data;
      this.xid = datas.goods_id;
      this.name = datas.name;
      this.price = datas.price / 100;
      this.crrenprice = datas.price;
      this.crrenurl = "/imgs/miyoupu/" + datas.cover_url;
    });
  },
  destroyed() {
    this.$parent.showTabbar = true;
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

.pay {
  width: 100%;
  display: flex;
  justify-content: space-around;
}
.pay button {
  flex: 1;
  width: 100%;
  height: 3.125rem;
  border-radius: 1.25rem;
  color: #fff;
  background: rgb(255, 109, 109);
}
.goods_text {
  width: 100%;
  margin-bottom: 1.875rem;
}
.goods_text button {
  color: #16162e;
  background: rgb(243, 243, 244);
  box-sizing: border-box;
  border-radius: 0.5rem;
  padding: 0 0.3125rem 0 0.3125rem;
  margin: 0 0.9375rem 0.9375rem 0;
}
.active {
  color: #fff !important;
  background: rgb(255, 109, 109) !important;
}
.header {
  margin-bottom: 1.875rem;
}
.quta {
  display: flex;
  justify-content: space-between;
  margin-bottom: 3.125rem;
}
.custom-indicator {
  width: 1.875rem;
  height: 1.25rem;
  position: absolute;
  right: 1.25rem;
  bottom: 1.25rem;
  padding: 0.125rem 0.3125rem;
  border-radius: 0.75rem;
  font-size: 0.875rem;
  text-align: center;
  line-height: 1.25rem;
  background: rgb(27, 23, 23, 0.1);
}
p {
  margin: 0;
  text-align: left;
  padding: 0 1.0625rem 0 1.0625rem;
}
.name {
  font-size: 1.125rem;
  text-align: left;
  padding: 1.0625rem;
}
.price span::before {
  content: "￥";
}
.price {
  font-size: 1.875rem;
  font-weight: 600;
}
h5 {
  width: 100%;
  font-size: 1.125rem;
  padding: 1.0625rem;
  box-sizing: border-box;
  margin: 0;
  text-align: left;
}
.tip {
  display: block;
  width: 100%;
  height: 3.75rem;
  color: #0b0bdd;
  background: #f3f3f4;
  text-align: center;
}
.sku {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
  box-sizing: border-box;
  padding: 1.25rem;
  position: relative;
}
.skuprice {
  position: absolute;
  top: 2.5rem;
  left: 8.75rem;
}
</style>
