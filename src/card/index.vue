<template>
  <div>
    <div class="title tc">亲子跑报名情况</div>
    <ul class="total-count">
      <li class="row1 tc">共有{{allList.length}}次报名</li>
    </ul>
    <el-tabs class="main-tab" v-model="displayMode">
      <el-tab-pane name="all" label="全部">
        <el-table class="user-table" stripe :data="allList">
          <el-table-column prop="parentName" width="110px" label="家长姓名"></el-table-column>
          <el-table-column prop="parentAge" width="110px" label="家长年龄"></el-table-column>
          <el-table-column prop="parentIdCard" label="家长身份证"></el-table-column>
          <el-table-column prop="parentPhone" label="家长手机号"></el-table-column>
          <el-table-column prop="childName" width="110px" label="孩子姓名"></el-table-column>
          <el-table-column prop="childAge" width="110px" label="孩子年龄"></el-table-column>
          <el-table-column prop="childIdCard" label="孩子身份证"></el-table-column>
          <el-table-column prop="childPhone" label="孩子手机号"></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane name="parent" label="家长">
        <el-table class="user-table" stripe :data="parentlist">
          <el-table-column prop="parentName" label="家长姓名"></el-table-column>
          <el-table-column prop="parentAge" label="家长年龄"></el-table-column>
          <el-table-column prop="parentIdCard" label="家长身份证"></el-table-column>
          <el-table-column prop="parentPhone" label="家长手机号"></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane name="child" label="孩子">
        <el-table class="user-table" stripe :data="childList">
          <el-table-column prop="childName" label="孩子姓名"></el-table-column>
          <el-table-column prop="childAge" label="孩子年龄"></el-table-column>
          <el-table-column prop="childIdCard" label="孩子身份证"></el-table-column>
          <el-table-column prop="childPhone" label="孩子手机号"></el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>！
  </div>
</template>
<script>
const participantMap = {};

export default {
  data() {
    return {
      allList: [],
      parentlist: [],
      childList: [],
      displayMode: "all"
    };
  },
  methods: {
    processData(arr) {
      if (arr instanceof Array) {
        const refinedData = arr.map(_ => {
          const newDatum = {
            parentName: _.name,
            parentAge: _.age,
            parentPhone: _.phone,
            parentIdCard: _.idCard,
            childName: _.childName,
            childAge: _.childAge,
            childPhone: _.childPhone,
            childIdCard: _.childIdCard
          };
          participantMap[newDatum.idCard] = newDatum;
          return newDatum;
        });

        refinedData.forEach(_ => {
          this.allList.push(_);
          this.parentlist.push(_);
          this.childList.push(_);
        });
      }
    },
    getEnrollData(start = 0) {
      const params = { start };
      this.$http.get(`/joinlist.php`, { params }).then(res => {
        if (res && res.status == 200 && res.data && res.data.length > 0) {
          this.processData(res.data);
          this.getEnrollData(start + 20);
        }
      });
    },
    initTableData() {
      this.allList.splice(0);
      this.parentlist.splice(0);
      this.childList.splice(0);
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