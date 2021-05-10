<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="5"><h1>报销信息统计</h1></el-col>
      <el-col :span="2"
        ><el-button
          :class="{ isActive: dateType == '0' }"
          size="small"
          @click="handleDate($event, '0')"
          >本月</el-button
        ></el-col
      >
      <el-col :span="2"
        ><el-button
          :class="{ isActive: dateType == '1' }"
          size="small"
          @click="handleDate($event, '1')"
          >本季</el-button
        ></el-col
      >
      <el-col :span="2"
        ><el-button
          :class="{ isActive: dateType == '2' }"
          size="small"
          @click="handleDate($event, '2')"
          >本年</el-button
        ></el-col
      >
      <el-col :span="6"
        ><el-date-picker
          size="small"
          @change="handleDate"
          v-model="date"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <div id="chart-amount" class="charts-box"></div>
    <div id="chart-type" class="charts-box"></div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["user"]),
  },
  data() {
    return {
      date: "",
      dateType: "0",
      option: {
        title: {
          text: "审批笔数",
        },
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: "bar",
          },
        ],
      },
      optionType: {
        title: {
          text: "报销类型",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          top: "center",
          left: "left",
        },
        series: [
          {
            name: "报销类型",
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: 1048, name: "居民医保报销" },
              { value: 735, name: "职工医保报销" },
              { value: 580, name: "生育医保报销" }
            ],
          },
        ],
      },
    };
  },
  created() {},
  mounted() {
    this.chartAmount = this.$echarts.init(
      document.getElementById("chart-amount")
    );
    this.chartType = this.$echarts.init(document.getElementById("chart-type"));
    this.chartAmount.setOption(this.option);
    this.chartType.setOption(this.optionType);
    this.countVerifyDataOnPhase();
  },
  methods: {
    handleDate(e, type) {
      if (type) {
        this.dateType = type;
        this.date = "";
        this.countVerifyDataOnPhase();
      } else {
        this.dateType = "";
        this.countVerifyData();
      }
    },
    async countVerifyData() {
      let param = {
        loginAccount: this.user.loginAccount,
        reimburseType: "",
        beginTime: this.date[0],
        endTime: this.date[1],
      };
      let res = await this.$http.countVerifyData(param);
      console.log(res);
    },
    async countVerifyDataOnPhase() {
      let param = {
        loginAccount: this.user.loginAccount,
        reimburseType: "",
        timeType: this.dateType,
      };
      let res = await this.$http.countVerifyDataOnPhase(param);
      console.log(res);
    },
  },
};
</script>
<style lang='less' scoped>
h1 {
  font-size: 20px;
}
.el-divider--horizontal {
  margin: 16px 0;
}
.charts-box {
  width: 50%;
  min-width: 400px;
  display: inline-block;
  height: 500px;
}
.el-button.isActive {
  background: #409eff;
  color: #fff;
}
</style>