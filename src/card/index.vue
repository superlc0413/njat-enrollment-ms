<template>
  <div>
    <div class="title tc">青少年羽毛球比赛报名情况</div>
    <ul class="total-count">
      <li class="row1 tc">共有{{allList.length}}次报名</li>
      <li
        class="tc"
      >单打报名{{singleList.length}}次, 双打报名{{coupeList.length}}次，家庭报名{{familyList.length}}次</li>
    </ul>
    <el-tabs class="main-tab" v-model="displayMode">
      <el-tab-pane name="single" label="单人报名">
        <el-table class="user-table" stripe :data="singleList">
          <el-table-column width="125px" prop="name" label="姓名"></el-table-column>
          <el-table-column width="75px" prop="age" label="年龄"></el-table-column>
          <el-table-column prop="idCard" label="身份证号"></el-table-column>
          <el-table-column prop="phone" label="电话"></el-table-column>
          <el-table-column width="125px" prop="type" label="报名类型"></el-table-column>
          <el-table-column prop="groups" label="组别"></el-table-column>
          <!-- <el-table-column width="100px" prop="price" label="价格"></el-table-column> -->
        </el-table>
      </el-tab-pane>
      <el-tab-pane name="coupe" label="双人报名">
        <el-table class="user-table" stripe :data="coupeList">
          <el-table-column width="125px" prop="name" label="姓名"></el-table-column>
          <el-table-column width="75px" prop="age" label="年龄"></el-table-column>
          <el-table-column prop="idCard" label="身份证号"></el-table-column>
          <el-table-column prop="phone" label="电话"></el-table-column>
          <el-table-column width="125px" prop="type" label="报名类型"></el-table-column>
          <el-table-column prop="groups" label="组别"></el-table-column>
          <!-- <el-table-column width="100px" prop="price" label="价格"></el-table-column> -->
        </el-table>
      </el-tab-pane>
      <el-tab-pane name="family" label="家庭报名">
        <el-table class="user-table" stripe :data="familyList">
          <el-table-column width="125px" prop="name" label="姓名"></el-table-column>
          <el-table-column width="75px" prop="age" label="年龄"></el-table-column>
          <el-table-column prop="idCard" label="身份证号"></el-table-column>
          <el-table-column prop="phone" label="电话"></el-table-column>
          <el-table-column width="125px" prop="type" label="报名类型"></el-table-column>
          <el-table-column prop="groups" label="组别"></el-table-column>
          <!-- <el-table-column width="100px" prop="price" label="价格"></el-table-column> -->
        </el-table>
      </el-tab-pane>
      <el-tab-pane name="all" label="全部">
        <el-table class="user-table" stripe :data="allList">
          <el-table-column width="125px" prop="name" label="姓名"></el-table-column>
          <el-table-column width="75px" prop="age" label="年龄"></el-table-column>
          <el-table-column prop="idCard" label="身份证号"></el-table-column>
          <el-table-column prop="phone" label="电话"></el-table-column>
          <el-table-column width="125px" prop="type" label="报名类型"></el-table-column>
          <el-table-column prop="groups" label="组别"></el-table-column>
          <!-- <el-table-column width="100px" prop="price" label="价格"></el-table-column> -->
        </el-table>
      </el-tab-pane>
    </el-tabs>！
  </div>
</template>
<script>
const participantMap = {};
// const prices = [88, 118];

export default {
  data() {
    return {
      allList: [],
      coupeList: [],
      singleList: [],
      familyList: [],
      displayMode: "single",
      ages: [
        // { start: 0, end: 10 }
      ],
      times: [
        // { start: "2019-02-25 00:00:00", end: "2019-02-25 23:59:59" },
      ]
    };
  },
  methods: {
    processData(arr) {
      if (arr instanceof Array) {
        const refinedData = arr.map(_ => {
          const newDatum = {
            name: _.name,
            phone: _.phone,
            type: _.type,
            groups: _.groups,
            age: _.chileAge || _.age,
            idCard: _.childIdCard || _.idCard
          };
          participantMap[newDatum.idCard] = newDatum;
          return newDatum;
        });

        refinedData.forEach(_ => {
          this.allList.push(_);
          if (_.type == "单打") {
            // _.price = prices[1];
            this.singleList.push(_);
          } else if (_.type == "双打") {
            // _.price = prices[0];
            this.coupeList.push(_);
          } else {
            // _.price = prices[0];
            this.familyList.push(_);
          }
        });
      }
    },
    getEnrollData(start = 1) {
      this.$http.post("/joinlist_bm.php", { start }).then(res => {
        if (res && res.status == 200 && res.data && res.data.length > 0) {
          this.processData(res.data);
          this.getEnrollData(start + 20);
        }
      });
    },
    initTableData() {
      this.allList.splice(0);
      this.singleList.splice(0);
      this.coupeList.splice(0);
      this.familyList.splice(0);
      this.getEnrollData();
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
    this.initTableData();
  }
};
</script>
<style lang="scss" scoped>
.title {
  font-size: 24px;
  font-weight: bold;
  line-height: 3.2;
}
.total-count {
  .row1 {
    // font-weight: bold;
    font-size: 16px;
  }
  li {
    font-size: 14px;
    line-height: 2;
  }
}
.main-tab {
  width: 90%;
  margin: 20px auto 0;
  .user-table {
  }
}
</style>