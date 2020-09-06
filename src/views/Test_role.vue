<template>
  <div>
    <div v-show="false">{{tableData}}</div>
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      default-expand-all
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      row-key="id"
      :row-class-name="tableRowClass"
    >
      <el-table-column prop="port" label="端口"></el-table-column>
      <el-table-column prop="oneTemp" label="一级模板"></el-table-column>
      <el-table-column prop="twoTemp" label="二级模板"></el-table-column>
      <el-table-column prop="qrd" label="查询/重置/导出">
        <template slot-scope="scope">
          <el-checkbox v-model="scope.row.qrd" v-if="scope.row.hasOwnProperty('qrd')"></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column prop="au" label="创建/修改">
        <template slot-scope="scope">
          <el-checkbox v-model="scope.row.au" v-if="scope.row.hasOwnProperty('au')"></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column prop="d" label="删除">
        <template slot-scope="scope">
          <el-checkbox v-model="scope.row.d" v-if="scope.row.hasOwnProperty('d')"></el-checkbox>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import cloneDeep from "clonedeep";
export default {
  data() {
    return {
      tableData: [
        {
          id: "pc",
          port: "pc",
          oneTemp: "",
          twoTemp: "",
          qrd: false,
          au: false,
          d: false,
          children: [
            {
              id: "pc-home",
              port: "",
              oneTemp: "首页",
              twoTemp: "",

              qrd: false,
              au: false,
              d: false
            },
            {
              id: "pc-my",
              port: "",
              oneTemp: "个人中心",
              twoTemp: "",
              qrd: false,
              au: false
            },
            {
              id: "pc-custom",
              port: "",
              oneTemp: "客户管理",
              twoTemp: "",
              qrd: false,
              au: false
            }
          ]
        },
        {
          id: "app",
          port: "app",
          oneTemp: "",
          twoTemp: "",
          qrd: false,
          au: false,
          d: false,
          children: [
            {
              id: "app-custom",
              port: "",
              oneTemp: "客户管理",
              twoTemp: "",
              qrd: false,
              au: false,
              d: false
            },
            {
              id: "app-visit",
              port: "",
              oneTemp: "拜访管理",
              twoTemp: "",
              qrd: false,
              au: false,
              d: false
            },
            {
              id: "app-my",
              port: "",
              oneTemp: "个人中心",
              twoTemp: "",
              qrd: false,
              au: false
            }
          ]
        }
      ],
      pcqrd: false,
      pcau: false,
      pcd: false,
      appqrd: false,
      appau: false,
      appd: false
    };
  },
  methods: {
    tableRowClass({ row, rowIndex }) {
      return row.children ? "bg" : "";
    }
  },
  mounted() {
    console.log(this.tableData);
    this.pcqrd = false;
    this.pcau = false;
    this.pcd = false;
  },
  updated() {
    // console.log(11111);

    /**全选 */
    let pcqrd = this.tableData[0].qrd;
    let pcau = this.tableData[0].au;
    let pcd = this.tableData[0].d;
    let appqrd = this.tableData[1].qrd;
    let appau = this.tableData[1].au;
    let appd = this.tableData[1].d;

    //只有发生改变才执行， 避免其他data属性改变触发update
    //   this.tableData = tableData//如果直接置换发现是死循环
    if (pcqrd !== this.pcqrd) {
      this.pcqrd = pcqrd;
      this.tableData[0].children.forEach(item => {
        if (item.hasOwnProperty("qrd")) item.qrd = pcqrd;
      });
    }

    if (pcau !== this.pcau) {
      this.pcau = pcau;
      this.tableData[0].children.forEach(item => {
        if (item.hasOwnProperty("au")) item.au = pcau;
      });
    }
    if (pcd !== this.pcd) {
      this.pcd = pcd;
      this.tableData[0].children.forEach(item => {
        if (item.hasOwnProperty("d")) item.d = pcd;
      });
    }

    if (appqrd !== this.appqrd) {
      this.appqrd = appqrd;
      this.tableData[1].children.forEach(item => {
        if (item.hasOwnProperty("qrd")) item.qrd = appqrd;
      });
    }

    if (appau !== this.appau) {
      this.appau = appau;
      this.tableData[1].children.forEach(item => {
        if (item.hasOwnProperty("au")) item.au = appau;
      });
    }
    if (appd !== this.appd) {
      this.appd = appd;
      this.tableData[1].children.forEach(item => {
        if (item.hasOwnProperty("d")) item.d = appd;
      });
    }

    /**其他选 */
    let pcqrdflag=true 
    let pcauflag=true 
    let pcdflag=true 
    this.tableData[0].children.forEach(item => {
      if (item.hasOwnProperty("qrd") && !item.qrd) {
          pcqrdflag = false
      }
       if (item.hasOwnProperty("au") && !item.au) {
         pcauflag= false
       }
        if (item.hasOwnProperty("d") && !item.d) {
         pcdflag= false
       }

    });
    this.tableData[0].qrd = pcqrdflag   
    this.pcqrd = pcqrdflag   
    this.tableData[0].au = pcauflag
    this.pcau = pcauflag   
    this.tableData[0].d = pcdflag
    this.pcd = pcdflag   

     let appqrdflag=true 
    let appauflag=true 
    let appdflag=true 
    this.tableData[1].children.forEach(item => {
      if (item.hasOwnProperty("qrd") && !item.qrd) {
          appqrdflag = false
      }
       if (item.hasOwnProperty("au") && !item.au) {
         appauflag= false
       }
        if (item.hasOwnProperty("d") && !item.d) {
         appdflag= false
       }

    });
 
    this.tableData[1].qrd = appqrdflag   
    this.appqrd = appqrdflag   
    this.tableData[1].au = appauflag
    this.appau = appauflag   
    this.tableData[1].d = appdflag
    this.appd = appdflag  

    

  },
  watch: {
    tableData(newV, oldV) {
      //   console.log(newV)
    }
  }
};
</script>

<style>
.el-table__expand-icon {
  display: none !important;
}
.cell {
  text-align: center;
}
.bg {
  background: #f2f2f2 !important;
}
</style>
