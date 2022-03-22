<template>
  <div class="chart" style="height: 500px; width: 100%" />
</template>
<script>
import * as echarts from "echarts";
require("echarts/theme/macarons");
export default {
  data() {
    return {
      cart: null,
      options: "",
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart();
    });
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart() {
      // 实例化
      this.chart = echarts.init(this.$el);
      this.chart.setOption({
        title: {
          text: "月销量统计表",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: [
            "数码百货",
            "角色-旅行征程",
            "角色-蒙德城",
            "角色-璃月港",
            "角色-愚众人",
            "角色-稻妻城",
          ],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },

        xAxis: {
          type: "category",
          boundaryGap: false,
          data: [
            "1月",
            "2月",
            "3月",
            "4月",
            "5月",
            "6月",
            "7月",
            "8月",
            "9月",
            "10月",
            "11月",
          ],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "角色-愚众人",
            type: "line",
            stack: "Total",
            data: [522, 792, 566, 599, 1085, 783, 775, 833, 815, 1138, 830],
          },
          {
            name: "角色-稻妻城",
            type: "line",
            stack: "Total",
            data: [525, 589, 949, 726, 689, 694, 940, 723, 897, 506, 804],
          },
          {
            name: "角色-旅行征程",
            type: "line",
            stack: "Total",
            data: [673, 972, 417, 937, 729, 551, 902, 548, 818, 720, 643],
          },
          {
            name: "角色-蒙德城",
            type: "line",
            stack: "Total",
            data: [1355, 909, 1095, 886, 580, 791, 796, 1285, 830, 1107, 650],
          },
          {
            name: "角色-璃月港",
            type: "line",
            stack: "Total",
            data: [1491, 1151, 548, 1112, 585, 1471, 759, 545, 819, 1054, 1143],
          },
          {
            name: "数码百货",
            type: "line",
            stack: "Total",
            data: [699, 531, 633, 363, 604, 621, 435, 651, 664, 637, 579],
          },
        ],
      });
    },
  },
};
</script>
