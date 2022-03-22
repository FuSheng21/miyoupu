<template>
  <div>
    <van-nav-bar title="编辑收货地址" fixed>
      <template #left>
        <van-icon
          @click="$router.back()"
          name="arrow-left"
          size="20px"
          color="#000"
        />
      </template>
    </van-nav-bar>
    <van-address-edit
      show-delete
      show-set-default
      show-search-result
      :show-area="false"
      :address-info="list"
      @save="onSave"
      @delete="onDelete"
    />
  </div>
</template>
<script>
export default {
  name: "Edit",
  data() {
    return {
      list: {},
    };
  },
  created() {
    const { id, name, tel, address: addressDetail } = this.$route.params;
    this.list = {
      id,
      name,
      tel,
      addressDetail,
    };
  },
  methods: {
    onSave(content) {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (content.id) {
        this.$request
          .put("/cart/" + userInfo.id, {
            aid: content.id,
            name: content.name,
            tel: content.tel * 1,
            address: content.addressDetail,
          })
          .then(({ data }) => {
            this.$notify({ type: "success", message: data.data.msg });
          });
      } else {
        this.$request
          .post("/cart/address/" + userInfo.id, {
            name: content.name,
            tel: content.tel * 1,
            address: content.addressDetail,
          })
          .then(({ data }) => {
            this.$notify({ type: "success", message: data.data.msg });
          });
      }
    },
    onDelete(content) {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      this.$request
        .delete("/cart/address/" + userInfo.id, {
          data: {
            id: content.id,
          },
        })
        .then(({ data }) => {
          this.$notify({ type: "success", message: data.data.msg });
          this.$router.push("/shouhuo");
        });
    },
  },
};
</script>
