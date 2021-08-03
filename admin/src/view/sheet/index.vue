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
          value-format="yyyy-MM-dd"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :pickerOptions="pickerOptions"
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
    let _minTime = null;
    let _maxTime = null;
    return {
      date: "",
      dateType: "0",
      pickerOptions: {
        onPick(time) {
          // 如果选择了只选择了一个时间
          if (!time.maxDate) {
            let timeRange = 5 * 365 * 24 * 60 * 60 * 1000; // 5年
            _minTime = time.minDate.getTime() - timeRange; // 最小时间
            _maxTime = time.minDate.getTime() + timeRange; // 最大时间
            // 如果选了两个时间，那就清空本次范围判断数据，以备重选
          } else {
            _minTime = _maxTime = null;
          }
        },
        disabledDate(time) {
          if (_minTime && _maxTime) {
            return time.getTime() < _minTime || time.getTime() > _maxTime;
          }
        },
      },
      option: {
        title: {
          text: "审批笔数",
        },
        xAxis: {
          type: "category",
          data: [],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [],
            type: "bar",
            barMaxWidth: 40,
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
            data: [],
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
    setOptions(res) {
      this.optionType.series[0].data = res && res.monData || [];
      let x = [],
        y = [];
      res && res.reimburseTypeData &&
        res.reimburseTypeData.map((item) => {
          x.push(item.name);
          y.push(item.value);
        });
      this.option.xAxis.data = x;
      this.option.series[0].data = y;
      this.chartAmount.setOption(this.option);
      this.chartType.setOption(this.optionType);
    },
    async countVerifyData() {
      let param = {
        loginAccount: this.user.loginAccount,
        reimburseType: "",
        beginTime: this.date[0],
        endTime: this.date[1],
      };
      let res = await this.$http.countVerifyData(param);
      this.setOptions(res);
    },
    async countVerifyDataOnPhase() {
      let param = {
        loginAccount: this.user.loginAccount,
        reimburseType: "",
        timeType: this.dateType,
      };
      let res = await this.$http.countVerifyDataOnPhase(param);
      this.setOptions(res);
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