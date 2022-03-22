<template>
  <div>
    <el-table
      :data="tableData"
      stripe
      style="width: 100%"
      @selection-change="selectItem"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column type="index" label="#" width="55"> </el-table-column>

      <el-table-column label="图片" width="150" height="150">
        <template slot-scope="scope">
          <div class="demo-image">
            <el-image
              style="width: 100%; height: 100%"
              :src="baseurl + scope.row.cover_url"
            ></el-image>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="商品名称" width="450">
        <template slot-scope="scope">
          <el-input
            v-model="currendata"
            v-if="currenid == scope.row.goods_id"
            ref="input"
            @blur="update(scope.row.goods_id, 0)"
          ></el-input>
          <span
            class="goods_name"
            v-else
            @click.stop="editItem(scope.row.goods_id, scope.row.name)"
            >{{ scope.row.name }}</span
          >
        </template>
      </el-table-column>
      <el-table-column label="市场价" width="100">
        <template slot-scope="scope">
          <el-input
            v-model="currendata"
            v-if="currenid == scope.row.id"
            ref="input"
            @blur="update(scope.row.goods_id, 1)"
          ></el-input>
          <span
            class="goods_name"
            v-else
            @click.stop="editItem(scope.row.id, scope.row.market_price)"
            >{{ scope.row.market_price / 100 }}</span
          >
        </template>
      </el-table-column>
      <el-table-column label="售价" width="100">
        <template slot-scope="scope">
          <el-input
            v-model="currendata"
            v-if="currenid == scope.row.cover_url"
            ref="input"
            @blur="update(scope.row.goods_id, 2)"
          ></el-input>
          <span
            class="goods_name"
            v-else
            @click.stop="editItem(scope.row.cover_url, scope.row.price)"
            >{{ scope.row.price / 100 }}</span
          >
        </template>
      </el-table-column>
      <el-table-column label="商品状态" width="120">
        <template slot-scope="scope">
          <span class="goods_name">{{
            (scope.row.is_sold_out = "fasle" ? "销售中" : "已售罄")
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            round
            @click="openchildgoods(scope.row.goods_id)"
            >查看子商品</el-button
          >
          <el-dialog title="查看子商品" :visible.sync="childgoods" width="60%">
            <el-table :data="goodsData">
              <el-table-column type="selection" width="55"> </el-table-column>
              <el-table-column
                type="index"
                label="#"
                width="55"
              ></el-table-column>

              <el-table-column label="图片" width="100" height="100">
                <template slot-scope="scope">
                  <div class="demo-image">
                    <el-image
                      style="width: 100%; height: 100%"
                      :src="goodsurl + scope.row.cover_url"
                    ></el-image>
                  </div>
                </template>
              </el-table-column>

              <el-table-column label="商品名称">
                <template slot-scope="scope">
                  <span class="goods_name">{{ scope.row.text }}</span>
                </template>
              </el-table-column>

              <el-table-column label="市场价" width="100">
                <template slot-scope="scope">
                  <span class="goods_name">{{
                    scope.row.market_price / 100
                  }}</span>
                </template>
              </el-table-column>
              <el-table-column label="售价" width="100">
                <template slot-scope="scope">
                  <span class="goods_name">{{ scope.row.price / 100 }}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="200">  
                <template>
                  <el-button
            type="primary"
            round
            @click="open3"
            >没写功能别点！</el-button
          >
                </template>
              </el-table-column>

            </el-table>


  <div slot="footer" class="dialog-footer">
    <el-button @click="childgoods = false">取 消</el-button>
    <el-button type="primary" @click="childgoods = false">确 定</el-button>
  </div>

          </el-dialog>
          <el-button
            plain
            type="danger"
            icon="el-icon-delete"
            circle
            @click="dialogVisible = true"
          >
          </el-button>
          <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
            <span>确定删除该商品吗？</span>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="remove(scope.row.goods_id)"
                >确 定</el-button
              >
            </span>
          </el-dialog>
        </template>
      </el-table-column>
    </el-table>
    <div>
      <el-pagination
        background
        layout="sizes,prev, pager, next,jumper"
        :total="total"
        :page-size="size"
        :current-page="page"
        @current-change="changepage"
        @size-change="chanesize"
      >
      </el-pagination>

      <el-row type="flex" class="row-bg" justify="end">
        <el-button type="danger" @click="dialogremore = true"
          >批量删除</el-button
        >
        <el-dialog title="提示" :visible.sync="dialogremore" width="30%">
          <span>确定删除选中的商品吗？</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogremore = false">取 消</el-button>
            <el-button type="primary" @click="remore(selection)"
              >确 定</el-button
            >
          </span>
        </el-dialog>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  name: "GoodsList",
  data() {
    return {
      tableData: [],
      goodsData: [],
      baseurl: "../imgs/miyoupu/",
      goodsurl: "../imgs/showgoods/",
      currenid: "",
      currendata: "",
      statusdata: "",
      dialogVisible: false,
      dialogremore: false,
      childgoods: false,
      selection: "",
      total: 0,
      size: 10,
      page: 1,
    };
  },
  methods: {
    open3() {
        this.$notify.info({
          title: '消息',
          message: '都说了没功能还点！'
        });
      },
    changepage(val) {
      this.page = val;
      this.getData();
    },
    chanesize(val) {
      this.size = val;
      this.getData();
    },
    openchildgoods(id) {
      this.childgoods = true;
      this.$request.get("/goods/details/" + id).then(({ data }) => {
        this.goodsData = JSON.parse(data.data.goods);
      });
    },
    async getData() {
      const { data } = await this.$request.get("/goods", {
        params: {
          page: this.page,
          size: this.size,
          sort: "price,1",
        },
      });
      this.total = data.data.total;
      this.tableData = data.data.data;
    },
    editItem(id, payload) {
      this.currenid = id;
      this.currendata = payload;
      this.statusdata = payload;
      setTimeout(() => {
        this.$refs.input.focus();
      }, 10);
    },
    selectItem(selection) {
      this.selection = selection;
    },
    remore(ids) {
      this.dialogremore = false;
      let id = [];
      if (ids == "") {
        this.$message("请先勾选需要删除的商品！");
      } else {
        ids.forEach((item) => {
          id.push(item.goods_id);
        });
        id = JSON.stringify(id);

        this.$request
          .delete("/goods/all", {
            data: {
              id,
            },
          })
          .then(({ data }) => {
            if (data.code == 200) {
              this.$message({
                message: "商品删除成功！",
                type: "success",
              });
            }
            this.getData();
          });
      }
    },
    remove(id) {
      this.dialogVisible = false;
      this.$request
        .delete("/goods/all", {
          data: {
            id,
          },
        })
        .then(({ data }) => {
          if (data.code == 200) {
            this.$message({
              message: "商品删除成功！",
              type: "success",
            });
          }
          this.getData();
        });
    },
    update(id, n) {
      if (this.statusdata == this.currendata) {
        this.currenid = "";
        this.$message("数据未修改！");
        return;
      }
      if (n == 0) {
        this.$request
          .put("/goods/" + id, {
            name: this.currendata,
          })
          .then(({ data }) => {
            if (data.code == 200) {
              this.$message({
                message: "修改商品成功！",
                type: "success",
              });
              this.getData()
            }
          });
      }
      if (n == 1) {
        this.$request
          .put("/goods/" + id, {
            market_price: this.currendata,
          })
          .then(({ data }) => {
            if (data.code == 200) {
              this.$message({
                message: "修改商品成功！",
                type: "success",
              });
            }
          });
      }
      if (n == 2) {
        this.$request
          .put("/goods/" + id, {
            price: this.currendata,
          })
          .then(({ data }) => {
            if (data.code == 200) {
              this.$message({
                message: "修改商品成功！",
                type: "success",
              });
            }
          });
      }
      this.currenid = "";
      this.getData();
    },
  },
  created() {
    this.getData();
  },
};
</script>
<style scoped>
.demo-image {
  box-sizing: border-box;
  border: 1px solid skyblue;
}
.goods_name {
  font-size: 1rem;
}
.el-select > .el-input {
  width: 100px;
}
</style>
