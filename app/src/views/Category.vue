<template>
  <div>
    <van-nav-bar title="分类列表" fixed class="nav">
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

    <van-tabs v-model="active" animated>
      <van-tab v-for="item in category" :key="item.id" :title="item.category">
        <van-row>
          <van-col
            v-for="iem in item.categorytwo"
            :key="iem"
            offset="3"
            span="8"
          >
            <van-button
              round
              type="info"
              color="#f3f3f4"
              size="normal"
              @click="getcategory(iem)"
              >{{ iem }}</van-button
            >
          </van-col>
        </van-row>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  name: "Category",
  data() {
    return {
      category: [],
      active: 0,
    };
  },

  created() {
    this.getData();
  },
  methods: {
    shuaxin() {
      location.reload();
    },
    async getData() {
      const { data } = await this.$request.get("/category");
      const fenlei = data.data.data;
      this.category = fenlei;
      this.category.forEach((item) => {
        item.categorytwo = JSON.parse(item.categorytwo);
      });
    },
    getcategory(iem) {
      this.$router.push({ path: "/goodslist", query: { category: iem } });
    },
  },
};
</script>
<style scoped>
.van-button {
  width: 160px;
}
.van-button__content {
  color: #16162e;
}
.van-col {
  margin: 10px 20px;
}
</style>
