<template>
  <div>
    <van-nav-bar title="购物车" fixed>
      <template #left>
        <van-icon
          @click="$router.back()"
          name="arrow-left"
          size="20px"
          color="#000"
        />
      </template>
      <template #right>
        <van-icon name="replay" size="20px" color="#000" @click="shuaxin()" />
      </template>
    </van-nav-bar>
    <van-empty
      description="购物车空空的"
      v-if="cartlist.length === 0"
      image="../img/cart.webp"
    >
      <van-button
        round
        plain
        type="primary"
        size="small"
        @click="goto('/goodslist')"
        >去购买</van-button
      >
    </van-empty>
    <van-swipe-cell v-else v-for="item in cartlist" :key="item.goods_id">
      <van-row type="flex" align="center" style="padding-left: 15px">
        <van-col span="2">
          <van-checkbox
            :value="selectIds.includes(item.goods_id)"
            @click="selectItem(item.goods_id)"
          />
        </van-col>
        <van-col span="22">
          <van-card
            style="padding-left: 0; background-color: #fff"
            :thumb-link="'#/goods/' + item.id"
            :thumb="item.cover_url"
            :price="item.price"
            :desc="item.goods_name"
            :title="item.name"
            :num="item.qty"
          >
            <template #num>
              <van-stepper
                v-model="item.qty"
                disable-input
                @change="qtych"
                theme="round"
                button-size="20px"
              />
            </template>

            <template #price>
              <span style="color: red">￥{{ item.price / 100 }}</span>
            </template>
          </van-card>
        </van-col>
      </van-row>
      <template #right>
        <van-button
          size="mini"
          square
          type="danger"
          text="删除"
          style="height: 100%; width: 3.125rem"
          @click="remove(item.goods_id)"
        />
      </template>
    </van-swipe-cell>

    <van-submit-bar button-text="去结算" :price="totalPrice" v-show="showCart">
      <van-checkbox v-model="selectAll">全选</van-checkbox>
    </van-submit-bar>
    <div style="width: 100%; height: 100px"></div>
  </div>
</template>
<script>
import { updateStorage } from "../utils";
export default {
  name: "Cart",
  data() {
    return {
      showCart: true,
      selectIds: [],
      cartlist: [],
      goodslist: [],
      remo: [],
      totalprice: [],
      jiage: 0,
      uid: "",
    };
  },
  computed: {
    totalPrice() {
      return this.cartlist
        .filter((item) => {
          return this.selectIds.includes(item.goods_id);
        })
        .reduce((val, item) => {
          return val + item.price * item.qty;
        }, 0);
    },
    selectAll: {
      get() {
        return this.cartlist.every((item) => {
          return this.selectIds.includes(item.goods_id);
        });
      },
      set(val) {
        this.selectIds = val ? this.cartlist.map((item) => item.goods_id) : [];
      },
    },
  },
  created() {
    let userInfo = localStorage.getItem("userInfo");
    try {
      userInfo = JSON.parse(userInfo) || {};
    } catch (err) {
      userInfo = {};
    }
    this.uid = userInfo.id;

    this.$request.get("/cart/" + this.uid).then(({ data }) => {
      if (data.data.goodslist == null) {
        return;
      }
      if (data.code == 200) {
        this.cartlist = JSON.parse(data.data.goodslist);
      }
    });
  },
  methods: {
    qtych() {
      const cartlist = JSON.stringify(this.cartlist);
      updateStorage("cartlist", this.cartlist);
      this.$request
        .post("/cart", {
          userid: this.uid,
          goodslist: cartlist,
        })
        .then(({ data }) => {
          if (data.code == 200) {
          }
        });
    },
    goto(url) {
      this.$router.push(url);
    },

    selectItem(id) {
      const idx = this.selectIds.indexOf(id);
      if (idx >= 0) {
        this.selectIds.splice(idx, 1);
      } else {
        this.selectIds.push(id);
      }
    },
    remove(id) {
      this.cartlist = this.cartlist.filter((item) => {
        return item.goods_id != id;
      });
      const cartlist = JSON.stringify(this.cartlist);
      updateStorage("cartlist", this.cartlist);
      this.$request.post("/cart", {
        userid: this.uid,
        goodslist: cartlist,
      });
    },
    shuaxin() {
      location.reload();
    },
  },
};
</script>
<style scoped>
.van-submit-bar {
  position: fixed;
  left: 0px;
  bottom: 50px;
}
</style>
