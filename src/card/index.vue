<template>
  <div>
    <div class="title tc">粉色跑用户报名情况</div>
    <ul class="total-count">
      <li class="tc">共有{{userList.length}}人报名</li>
      <li class="tc">{{adultList.length}}个家长, {{childList.length}}个儿童</li>
    </ul>
    <el-tabs class="main-tab" v-model="displayMode">
      <el-tab-pane name="adult" label="成人">
        <el-table class="user-table" stripe :data="adultList">
          <el-table-column width="125px" prop="name" label="姓名"></el-table-column>
          <el-table-column width="75px" prop="age" label="年龄"></el-table-column>
          <el-table-column prop="idCard" label="身份证号"></el-table-column>
          <el-table-column prop="phone" label="电话"></el-table-column>
          <el-table-column prop="orderTime" label="报名时间"></el-table-column>
          <el-table-column width="100px" prop="orderType" label="报名类型"></el-table-column>
          <el-table-column width="100px" prop="price" label="价格"></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane name="child" label="儿童">
        <el-table class="user-table" stripe :data="childList">
          <el-table-column width="150px" prop="name" label="姓名"></el-table-column>
          <el-table-column width="125px" prop="age" label="年龄"></el-table-column>
          <el-table-column prop="idCard" label="身份证号"></el-table-column>
          <el-table-column prop="orderTime" label="报名时间"></el-table-column>
          <el-table-column width="150px" prop="parentName" label="家长"></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane name="all" label="全部">
        <el-table class="user-table" stripe :data="userList">
          <el-table-column width="125px" prop="name" label="姓名"></el-table-column>
          <el-table-column width="75px" prop="age" label="年龄"></el-table-column>
          <el-table-column prop="idCard" label="身份证号"></el-table-column>
          <el-table-column prop="phone" label="电话"></el-table-column>
          <el-table-column prop="orderTime" label="报名时间"></el-table-column>
          <el-table-column width="125px" prop="orderType" label="报名类型"></el-table-column>
          <el-table-column width="100px" prop="price" label="价格"></el-table-column>
          <el-table-column width="125px" prop="parentName" label="家长"></el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>！
  </div>
</template>
<script>
const participantMap = {};
const prices = [88, 118];

export default {
  data() {
    return {
      userList: [],
      childList: [],
      adultList: [],
      displayMode: "adult",
      totalEarning: 0,
      ages: [{ start: 0, end: 10 }],
      times: [
        { start: "2019-02-25 00:00:00", end: "2019-02-25 23:59:59" },
        { start: "2019-02-27 00:00:00", end: "2019-02-27 23:59:59" }
      ],
      parentNum: 0,
      childNum: 0
    };
  },
  methods: {
    checkToday() {},
    processData(arr) {
      if (arr instanceof Array) {
        const refinedData = arr.map(_ => {
          // 单挑数据的结构改造
          const newDatum = {
            name: _.name,
            phone: _.phone,
            orderTime: _.orderTime,
            age: _.chileAge || _.age,
            idCard: _.childIdCard || _.idCard,
            parentIdCard: _.parentIdCard || "",
            parentName: _.parentName || ""
          };
          // 存入map
          return (participantMap[newDatum.idCard] = newDatum);
        });
        // 修正儿童数据中缺失的字段
        refinedData.forEach(_ => {
          if (_.parentIdCard) {
            // 儿童
            // 找到其家长，拼装 orderTime 和 parent
            const parent = participantMap[_.parentIdCard];
            if (parent) {
              parent.price = prices[1];
              // this.totalEarning += prices[1];
              parent.orderType = "亲子报名";
              _.parent = parent;
              _.orderTime = parent.orderTime;
            }
            // 构建儿童表
            this.childList.push(_);
          } else {
            // 成人
            _.price = prices[0];
            // this.totalEarning += prices[0];
            _.orderType = "单人报名";
            // 构建成人表
            this.adultList.push(_);
          }
        });
        return refinedData;
      } else {
        return [];
      }
    },
    getEnrollData(start = 1) {
      this.$http.post("/joinlist2.php", { start }).then(res => {
        if (res && res.status == 200 && res.data && res.data.length > 0) {
          this.userList.push(...this.processData(res.data));
          this.getEnrollData(start + 20);
        }
      });
    }
  },
  computed: {
    ageStr() {
      const str = this.ages.reduce((acc, item) => {
        return acc + `;${item.start},${item.end}`;
      }, "");
      return str.substring(1, str.length);
    },
    timeStr() {
      const str = this.times.reduce((acc, item) => {
        return acc + `;${item.start},${item.end}`;
      }, "");
      return str.substring(1, str.length);
    }
  },
  created() {
    const params = {
      start: 100
      // ages: this.ageStr,
      // times: this.timeStr
    };
    this.getEnrollData();
  }
};
</script>
<style lang="scss" scoped>
.title {
  font-size: 24px;
  font-weight: bold;
  line-height: 3;
}
.total-count {
  li {
    font-size: 14px;
    line-height: 1.5;
  }
}
.main-tab {
  width: 90%;
  margin: 20px auto 0;
  .user-table {
  }
}
</style>