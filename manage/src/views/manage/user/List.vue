<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/manage/home' }"
        >首页</el-breadcrumb-item
      >
      <el-breadcrumb-item :to="{ path: '/manage/user/list' }"
        >用户管理</el-breadcrumb-item
      >
      <el-breadcrumb-item>用户添加</el-breadcrumb-item>
    </el-breadcrumb>
    <el-table
      :data="tableData"
      stripe
      style="width: 100%"
      @selection-change="selectItem"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column type="index" label="#" width="55"> </el-table-column>
      <el-table-column width="55"> </el-table-column>
      <el-table-column prop="username" label="用户头像">
        <template v-slot="{ row }">
          <el-image
      style="width: 100px; height: 100px"
      :src="row.tximg_url?'../uimages/'+row.tximg_url:'../uimages/morentx.jpeg' "
      ></el-image>
          
        </template>
      </el-table-column>

      <el-table-column prop="username" label="用户名">
        <template v-slot="{ row }">
          <strong>{{ row.username }}</strong>
        </template>
      </el-table-column>
      <el-table-column prop="regtime" label="注册时间" v-slot="{ row }">
        {{ formatDate(row.addtime) }}
      </el-table-column>
      <el-table-column label="操作" v-slot="{ row }">
        <el-button
          plain
          type="primary"
          icon="el-icon-edit"
          circle
          @click="editItem(row.id, row.username)"
        ></el-button>
        <el-button
          plain
          type="danger"
          icon="el-icon-delete"
          circle
          @click="removeItem(row.id)"
        ></el-button>
      </el-table-column>
    </el-table>
    <div>
      <el-row type="flex" class="row-bg" justify="end">
        <el-button type="danger" @click="relItems(selection)"
          >批量删除</el-button
        >
      </el-row>
      <el-pagination
        :page-size="size"
        layout="total, prev, pager, next,sizes"
        :total="total"
        @current-change="pageChange"
        @size-change="sizeChange"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  name: "UserList",
  data() {
    return {
      tableData: [],
      total: 0,
      size: 20,
      page: 1,
      selection: [],
    };
  },
  created() {
    this.getData();
  },

  methods: {
    async getData() {
      const { data } = await this.$request.get("/user", {
        data: {
          page: this.page,
          size: this.size,
        },
      });
      this.tableData = data.data.data;
      console.log(this.tableData);
      this.total = data.data.total;
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString();
    },
    selectItem(selection) {
      this.selection = selection;
      console.log("selection5", this.selection);
    },
    removeItem(id) {
      this.$request
        .delete("/user", {
          data: {
            ids: id,
          },
        })
        .then(({ data }) => {
          if (data.code == 200) {
            this.getData();
          }
        });
    },
    relItems(ids) {
      const idss = [];
      ids.forEach((item) => {
        return idss.push(item.id);
      });
      this.$request
        .delete("/user", {
          data: {
            ids: idss,
          },
        })
        .then(({ data }) => {
          if (data.code == 200) {
            this.getData();
          }
        });
    },

    editItem(id, username) {
      this.$router.push({
        name: "UserEdit",
        params: { id, username },
      });
    },

    pageChange(pageNum) {
      this.page = pageNum;

      this.getData();
    },
    sizeChange(size) {
      this.size = size;

      this.getData();
    },
  },
};
</script>
<style scoped>
.el-pagination {
  width: 500px;
}
.row-bg {
  margin: 15px;
}
</style>
