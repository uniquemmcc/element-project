<template>
  <div class="container" >
   
    <div class="left" :class="toggle?'wd':''">

        <div class="left-box" :class="toggle?'move':''">
             <div>首页个人中心</div>
            <div>个人中心个人中心</div>
            <div>客户管理个人中心</div>
            <div>拜访管理个人中心</div>
            <div>权限管理个人中心</div>
            <div>用户管理个人中心</div>
        </div>
       

    </div>
  
    <div class="main" :style="{width}">
      <div @click="handleToggle">toggle</div>

      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="date" label="日期" ></el-table-column>
        <el-table-column prop="name" label="姓名" ></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      toggle: false,
      tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
    };
  },
  methods: {
    handleToggle() {
      this.toggle = !this.toggle;
    }
  },
  computed: {
      width(){
          return this.toggle? '100%': 'calc(100% - 200px)'
      }
  }
};
</script>

<style>
.container {

  width: 100%;
  height: 100%;
  display: flex;
  
}
.left {
  width: 200px;
  height: 100%;
  background: pink;
  position: relative;
}
.left-box {
    position: absolute;
    left: 0;
    top: 0;
}

.main {
  transition: .2s ease;
  /* height: 100%; */
  background: yellowgreen;
}

.move {
    transform: translate(-200px,0px);
    transition: .2s ease;
}
.wd {
    width: 0px;
    transition: .2s ease;
}

</style>
