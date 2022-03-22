<template>
  <div class="chart" style="height: 300px; width: 520px" />
</template>

<script>
  import * as echarts from "echarts";
  require("echarts/theme/macarons");

  export default {
    data() {
      return {
        chart: null,
        options:''
      };
    },
    mounted() {
      // 在生命周期函数mounted中，下面这个方法调用的意思是，页面加载出来就会自动渲染ECharts图
      // 其实就是调用了下面的initChart()
      this.$nextTick(() => {
        this.initChart();
      });
    },
    // 组件销毁
    beforeDestroy() {
      if (!this.chart) {
        return;
      }
      this.chart.dispose();
      this.chart = null;
    },
    created() {
      console.log(this);
    },
    methods: {
      initChart() {
        // 实例化
        this.chart = echarts.init(this.$el, 'dark');
        this.chart.setOption(
          {
          xAxis: {
            type: 'category',
            data: ['买菜的', '根菜类', '茎菜类', '叶菜类', '豆荚类', '果菜类', '花菜类', '干货', '肉', '海鲜','蔬果']
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: [9, 15, 14, 18, 7, 17, 5, 20, 20, 20, 30],
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(180, 180, 180, 0.2)'
            }
          }]
        });
      },
    },
  };
</script>