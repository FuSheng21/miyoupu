<template>
  <div>
    <el-tree
      :data="data"
      show-checkbox
      node-key="id"
      default-expand-all
      :expand-on-click-node="false"
    >
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span>
          <el-button
            circle
            type="text"
            size="mini"
            style="margin-left: 15px"
            @click="() => append(data)"
          >
            添加
          </el-button>
          <el-button
            size="mini"
            type="text"
            style="margin-left: 0px"
            @click="() => remove(node, data)"
            circle
          >
            删除
          </el-button>
        </span>
      </span>
    </el-tree>
    <div class="add" >
      <h3>添加一级分类</h3>
      <el-input placeholder="请输入内容" v-model="input2" class="inpu"> </el-input>
      <el-button slot="append" @click="() => append(data)">确定</el-button>
    </div>
    <div class="add">
      <h3>添加子分类</h3>
      <el-input placeholder="请输入内容" v-model="input1"> </el-input>
    </div>

    <router-view></router-view>
  </div>
</template>
<script>
let id = 1000;
export default {
  name: "Categorylist",
  data() {
    const data = [];
    return {
      data: JSON.parse(JSON.stringify(data)),
      input1: "",
      input2: "",
      children: [],
      addchi: false,
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      const { data } = await this.$request.get("/category");
      const fenlei = data.data.data;
      fenlei.forEach((item) => {
        const obj = {
          id: item.id,
          label: item.category,
          children: [],
        };
        JSON.parse(item.categorytwo).forEach((iem) => {
          const children = {
            id: id++,
            label: iem,
          };
          obj.children.push(children);
        });
        this.data.push(obj);
      });
    },
    append(data) {
      if (this.input2) {
          const moren = ["子分类"]
        this.$request
          .post("/category", {
            category: this.input2,
            categorytwo:JSON.stringify(moren)
          })
          .then(({ data }) => {
            if (data.code == 200) {
             this.$message({
                message: "分类添加成功！",
                type: "success",
              });
            }
          });
      } 
       if(this.input1){
      data.children.forEach((item) => {
        this.children.push(item.label);
      });
      this.children.push(this.input1);
      const children = JSON.stringify(this.children);
      this.$request
        .put("/category/" + data.id, {
          name: data.label,
          nametwo: children,
        })
        .then(({ data }) => {
          if (data.code == 200) {
            this.addchi = true;
            location.reload();
          }
        });
      if (this.addchi) {
        const newChild = { id: id++, label: this.input1, children: [] };
        if (!data.children) {
          this.$set(data, "children", []);
        }
        data.children.push(newChild);
      }
    }
    },
    remove(node, data) {
      const allNode = node.parent.childNodes;
      if (node.level == 1) {
        this.$request.delete('/category/'+node.key).then(({data})=>{
            if (data.code == 200) {
              location.reload();
            }
        })
      } else if (node.level == 2) {
        allNode.forEach((item) => {
          if (item.label !== data.label) {
            this.children.push(item.label);
          }
        });
        const children = JSON.stringify(this.children);
        this.$request
          .put("/category/" + node.parent.key, {
            name: node.parent.label,
            nametwo: children,
          })
          .then(({ data }) => {
            if (data.code == 200) {
              this.addchi = true;
              location.reload();
            }
          });
      }
      if (this.addchi) {
        const parent = node.parent;
        const children = parent.data.children || parent.data;
        const index = children.findIndex((d) => d.id === data.id);
        children.splice(index, 1);
      }
    },
  },
};
</script>
<style scoped>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
.add {
  margin: 50px 0;
  width: 350px;
}
.inpu{
  width: 250px;
}
</style>