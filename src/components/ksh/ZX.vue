<template>
  <!-- 折线图 -->
  <div> <div id="container2"> </div></div>
</template>
<script>
import { Chart } from '@antv/g2'; // 导入可视化G2库
export default {
  name: 'App',
  data() {
    return {
      data: [
        { year: '1951 年', sales: 38 },
        { year: '1952 年', sales: 52 },
        { year: '1956 年', sales: 61 },
        { year: '1957 年', sales: 145 },
        { year: '1958 年', sales: 48 },
        { year: '1959 年', sales: 38 },
        { year: '1960 年', sales: 38 },
        { year: '1962 年', sales: 38 },
      ],
    };
  },
  methods: {
    //  查询方法
    quetinfo() {
      const chart = new Chart({
        container: 'container2',
        autoFit: false, // 设为真就是不能控制宽度
        height: 500,
        width: 700,
      });
      chart.data(this.data); // 带入数据

      // 数值设置
      chart.scale('sales', {
        type: 'quantile',
        alias: '我的技能',
        ticks: [0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200],
        range: [0, 1],
        temperature: {
          nice: true,
        },
      });
      chart.tooltip({
        showMarkers: true, // 展示top点
        shared: true,
        showCrosshairs: true, // 展示辅助线
      });

      // chart.tooltip(true, 'sales'); // 开启 tooltip，并设置 tooltip 配置信息
      // 显示文本标签
      // chart.interaction('active-region');
      // // chart.interval().position('year*sales'); // 树状图
      // chart.line().position('year*sales'); // 折线图
      chart.line().position('year*sales').shape('smooth');
      chart.point().position('year*sales').shape('circle'); // 显示节点
      chart.render(); //渲染
    },
  },
  mounted() {
    this.quetinfo();
  },
};
</script>
<style scoped>
#container2 {
}
</style>
