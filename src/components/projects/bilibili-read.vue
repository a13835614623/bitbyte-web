<template>
  <div class="bilibili-read"></div>
</template>
<script>
// 引入 ECharts 主模块
var echarts = require('echarts/lib/echarts');
// 引入柱状图
require('echarts/lib/chart/bar');
// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
import axios from "axios";
//初始化图表框架
var newColor = function(index) {
  return (
    "rgb(" +
    (index % 6) * 51 +
    "," +
    ((index + 2) % 6) * 51 +
    "," +
    ((index + 4) % 6) * 51 +
    ")"
  );
};
var option = {
  //标题
  title: {
    text: "",
    left: "100",
    textStyle: {
      fontSize: 40
    }
  },
  //图例
  legend: {
    data: ["投稿量"],
    left: "center",
    textStyle: {
      fontSize: 20
    }
  },
  //X轴
  xAxis: {
    type: "value",
    position: "top", //顶端显示
    axisLine: {
      //坐标轴轴线
      show: false
    },
    axisTick: {
      //坐标轴刻度
      show: false
    }
  },
  // y轴
  yAxis: {
    data: [],
    axisLine: {
      //坐标轴轴线
      show: false
    },
    axisTick: {
      //坐标轴刻度
      show: false
    },
    axisLabel: {
      //坐标轴文字
      fontSize: 15,
      fontWeight: "bold",
      margin: 15,
      color: function(value, index) {
        return newColor(index);
      }
    }
  },
  //提示框
  tooltip: {
    trigger: "axis",
    //坐标轴指示器
    axisPointer: {
      type: "cross",
      label: {
        backgroundColor: "#6a7985"
      }
    }
  },
  //工具栏
  toolbox: {
    show: true, //显示
    orient: "horizontal", //水平排列
    showTitle: true, //鼠标hover显示
    feature: {
      //配置
      dataView: {
        //数据视图
        readOnly: true
      },
      dataZoom: {
        //区域数据缩放
        yAxisIndex: "none"
      },
      magicType: {
        //类型
        type: ["line", "bar"]
      },
      restore: {}, //配置还原
      saveAsImage: {} //保存为图片
    }
  },
  dataZoom: [
    {
      //数据缩放
      // 这个dataZoom组件，默认控制x轴。
      yAxisIndex: 0,
      type: "slider", // 这个 dataZoom 组件是 slider 型 dataZoom 组件
      start: 0, // 左边在 10% 的位置。
      end: 50 // 右边在 60% 的位置。
    },
    {
      // 这个dataZoom组件，也控制x轴。(鼠标滚轮控制)
      yAxisIndex: 0,
      type: "inside", // 这个 dataZoom 组件是 inside 型 dataZoom 组件
      start: 0, // 左边在 10% 的位置。
      end: 50 // 右边在 60% 的位置。
    }
  ],
  series: [
    {
      name: "投稿量", //name=legend.data的时候才能显示图例
      data: [],
      type: "bar",
      label: {
        normal: {
          show: true,
          position: "insideRight",
          fontSize: 20
        }
      },
      color: function(params) {
        return newColor(params.dataIndex);
      }
    }
  ]
};

export default {
  name: "bilibili-read",
  data() {
    return {
      myChart: null,
      myOption: option,
      date: new Date("2017", "5", "20"),
      url: "http://127.0.0.1:8888/getData/2017-6-20",
      authors: [], //作者
      names: [], //姓名
      counts: [] //投稿量
    };
  },
  created() {
    let vm = this;
    setInterval(function() {
      vm.sendRequest();
    }, 500);
  },
  mounted() {
    this.myChart = echarts.init(document.querySelector(".bilibili-read"));
    this.myChart.setOption(this.myOption);
  },
  methods: {
    sort() {
      //根据投稿量进行降序排序
      for (var i = 0; i < this.authors.length; i++) {
        for (var j = i + 1; j < this.authors.length; j++) {
          if (this.authors[i].count < this.authors[j].count) {
            // var temp = this.authors[i];
            // this.authors[i] = this.authors[j];
            // this.authors[j] = temp;
            [this.authors[i], this.authors[j]] = [
              this.authors[j],
              this.authors[i]
            ];
            this.names[i] = this.authors[i].name;
            this.names[j] = this.authors[j].name;
            this.counts[i] = this.authors[i].count;
            this.counts[j] = this.authors[j].count;
          }
        }
      }
      while (this.authors.length > 10) {
        this.names.splice(10, this.names.length - 1);
        this.counts.splice(10, this.counts.length - 1);
        this.authors.splice(10, this.authors.length - 1);
      }
    },
    updateUrl() {
      this.url =
        "http://127.0.0.1:8888/getData/2017-" +
        (this.date.getMonth() + 1) +
        "-" +
        this.date.getDate();
    },
    updateChart() {
      let option = {
        //更新图表
        title: {
          text: "2017-" + (this.date.getMonth() + 1) + "-" + this.date.getDate()
        },
        yAxis: {
          data: this.names,
          inverse: true
        },
        series: [
          {
            name: "投稿量",
            data: this.counts
          }
        ],
        animationDurationUpdate: [500]
      };
      this.myChart.setOption(option);
    },
    updateAuthors(data) {
      //更新作者信息
      for (let i = 0; i < data.length; i++) {
        let index = this.names.indexOf(data[i].author);
        if (index >= 0) {
          this.authors[index].count++;
          this.counts[index]++;
        } else {
          let author = {
            name: data[i].author,
            count: 1
          };
          this.names.push(author.name);
          this.authors.push(author);
          this.counts.push(author.count);
        }
      }
    },
    sendRequest() {
      let vm = this;
      axios.get(this.url).then(function(response) {
        vm.updateAuthors(response.data); //更新作者信息
        vm.sort(); //排序
        vm.updateChart(); //更新图表
        vm.date.setDate(vm.date.getDate() + 1); //时间加一天
        vm.updateUrl(); //更新URL
        if (vm.date.getFullYear() == "2018") {
          return;
        }
      });
    }
  }
};
</script>

<style scoped>
.bilibili-read {
  width: 80%;
  height: 500px;
  margin: 0 auto;
}
</style>