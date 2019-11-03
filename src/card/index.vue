<template>
  <div>
    <div class="title tc">夏令营报名情况</div>
    <ul class="total-count">
      <li class="row1 tc">共有{{allList.length}}次报名</li>
    </ul>
    <el-tabs class="main-tab" v-model="currentTab">
      <el-tab-pane name="all" :label="`全部（${allList.length}）`">
        <el-table class="user-table" stripe :data="allList">
          <el-table-column prop="name" width="130px" label="姓名"></el-table-column>
          <el-table-column prop="age" width="130px" label="年龄"></el-table-column>
          <el-table-column prop="idCard" label="身份证"></el-table-column>
          <el-table-column prop="phone" label="手机号"></el-table-column>
          <el-table-column prop="termName" width="130px" label="期别"></el-table-column>
          <el-table-column prop="am" width="130px" label="上午课程"></el-table-column>
          <el-table-column prop="pm" width="130px" label="下午课程"></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane name="tab1" :label="`第一期（${list1.length}）`">
        <el-table class="user-table" stripe :data="list1">
          <el-table-column prop="name" width="130px" label="姓名"></el-table-column>
          <el-table-column prop="age" width="130px" label="年龄"></el-table-column>
          <el-table-column prop="idCard" label="身份证"></el-table-column>
          <el-table-column prop="phone" label="手机号"></el-table-column>
          <el-table-column prop="termName" width="130px" label="期别"></el-table-column>
          <el-table-column prop="am" width="130px" label="上午课程"></el-table-column>
          <el-table-column prop="pm" width="130px" label="下午课程"></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane name="tab2" :label="`第二期（${list2.length}）`">
        <el-table class="user-table" stripe :data="list2">
          <el-table-column prop="name" width="130px" label="姓名"></el-table-column>
          <el-table-column prop="age" width="130px" label="年龄"></el-table-column>
          <el-table-column prop="idCard" label="身份证"></el-table-column>
          <el-table-column prop="phone" label="手机号"></el-table-column>
          <el-table-column prop="termName" width="130px" label="期别"></el-table-column>
          <el-table-column prop="am" width="130px" label="上午课程"></el-table-column>
          <el-table-column prop="pm" width="130px" label="下午课程"></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane name="tab3" :label="`第三期（${list3.length}）`">
        <el-table class="user-table" stripe :data="list3">
          <el-table-column prop="name" width="130px" label="姓名"></el-table-column>
          <el-table-column prop="age" width="130px" label="年龄"></el-table-column>
          <el-table-column prop="idCard" label="身份证"></el-table-column>
          <el-table-column prop="phone" label="手机号"></el-table-column>
          <el-table-column prop="termName" width="130px" label="期别"></el-table-column>
          <el-table-column prop="am" width="130px" label="上午课程"></el-table-column>
          <el-table-column prop="pm" width="130px" label="下午课程"></el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
const participantMap = {};
const map1 = ["", "第一期", "第二期", "第三期"];
const map2 = ["", "游泳", "滑冰", "棒球", "网球", "乒乓球", "足球"];

export default {
  data() {
    return {
      allList: [],
      list1: [],
      list2: [],
      list3: [],
      currentTab: "all"
    };
  },
  methods: {
    processData(arr) {
      if (arr instanceof Array) {
        const refinedData = arr.map(_ => {
          const newDatum = {
            name: _.name,
            age: _.age,
            phone: _.phone,
            idCard: _.idCard,
            termCode: _.period,
            termName: map1[_.period],
            am: map2[_.forenoon],
            pm: map2[_.afternoon]
          };
          // participantMap[newDatum.idCard] = newDatum;
          return newDatum;
        });

        refinedData.forEach(_ => {
          if (_.termCode == 1) {
            this.list1.push(_);
          } else if (_.termCode == 2) {
            this.list2.push(_);
          } else if (_.termCode == 3) {
            this.list3.push(_);
          }
          this.allList.push(_);
        });
      }
    },
    getEnrollData(start = 0) {
      const params = { start };
      this.$http.get(`/joinlist2.php`, { params }).then(res => {
        if (res && res.status == 200 && res.data && res.data.length > 0) {
          this.processData(res.data);
          this.getEnrollData(start + 20);
        }
      });
    },
    initTableData() {
      this.allList.splice(0);
      this.list1.splice(0);
      this.list2.splice(0);
      this.list3.splice(0);
      this.getEnrollData();
    }
  },
  computed: {},
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