<template>
  <div>
    <div>{{tableData}}</div>
    <div @click="this.tableData[0].check_reset_export = true">dianji</div>
    <el-table
      :data="tableData"
      style="width: 100%;margin-bottom: 20px;"
      row-key="itemId"
      border
      default-expand-all
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      :row-class-name="rowClass"
    >
      <el-table-column prop="port" label="端口"></el-table-column>
      <el-table-column prop="oneTemp" label="一级模块"></el-table-column>
      <el-table-column prop="twoTemp" label="二级模块"></el-table-column>
      <el-table-column prop="check_reset_export" label="查询/重置/导出">
        <template slot-scope="scope" v-if="scope.row.hasOwnProperty('check_reset_export')">
          <el-checkbox v-model="scope.row.check_reset_export" @change="fnCheckEv($event,scope, 'check_reset_export')"></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column prop="create_update" label="创建/修改">
        <template slot-scope="scope" v-if="scope.row.hasOwnProperty('create_update')">
          <el-checkbox v-model="scope.row.create_update" @click="handClick(scope.row,'create_update' )"></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column prop="delete" label="删除">
        <template slot-scope="scope" v-if="scope.row.hasOwnProperty('delete')">
          <el-checkbox v-model="scope.row.delete"></el-checkbox>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { roleList} from '@/utils'
export default {
  data() {
    return {
      tableData: [
        {
          id: "pc",
          port: "pc",
          oneTemp: "",
          twoTemp: "",
          check_reset_export: false,
          create_update: false,
          delete: false,
          children: [
            {
              id: "home",
              port: "",
              oneTemp: "首页",
              twoTemp: "",
              check_reset_export: true,
              create_update: false,
              delete: false
            },
            {
              id: "personal_center",
              port: "",
              oneTemp: "个人中心",
              twoTemp: "",
              check_reset_export: false,
              create_update: true,
              delete: false
            },
            {
              id: "customer_management",
              port: "",
              oneTemp: "客户管理",
              twoTemp: "",
              check_reset_export: true,
              create_update: false,
              delete: false
            },
            {
              id: "visit_management",
              port: "",
              oneTemp: "拜访管理",
              twoTemp: "",
              check_reset_export: false,
              create_update: false,
              delete: false
            },
            {
              id: "user_management",
              port: "",
              oneTemp: "用户管理",
              twoTemp: "",
              check_reset_export: true,
              create_update: false,
              delete: false
            },
            {
              id: "authorization_management",
              port: "",
              oneTemp: "权限管理",
              twoTemp: "",
              check_reset_export: false,
              create_update: true,
              delete: false,
              children: [
                {
                  id: "organization_management",
                  port: "",
                  oneTemp: "",
                  twoTemp: "组织管理",
                  check_reset_export: false,
                  create_update: false,
                  delete: false
                },
                {
                  id: "department_management",
                  port: "",
                  oneTemp: "",
                  twoTemp: "部门管理",
                  check_reset_export: true,
                  create_update: false,
                  delete: false
                },
                {
                  id: "post_management",
                  port: "",
                  oneTemp: "",
                  twoTemp: "职务管理",
                  check_reset_export: false,
                  create_update: false,
                  delete: false
                },
                {
                  id: "role_management",
                  port: "",
                  oneTemp: "",
                  twoTemp: "角色管理",
                  check_reset_export: false,
                  create_update: false,
                  delete: false
                }
              ]
            }
          ]
        },
        {
          id: "app",
          port: "app",
          oneTemp: "",
          twoTemp: "",
          check_reset_export: false,
          create_update: false,
          delete: false,
          children: [
            {
              id: "custmoer_management",
              port: "",
              oneTemp: "客户管理",
              twoTemp: "",
              check_reset_export: false,
              create_update: false,
              delete: true
            },
            {
              id: "visit_management",
              port: "",
              oneTemp: "拜访管理",
              twoTemp: "",
              check_reset_export: false,
              create_update: false,
              delete: false
            },
            {
              id: "personal_center",
              port: "",
              oneTemp: "个人中心",
              twoTemp: "",
              check_reset_export: false,
              create_update: true,
              delete: true
            }
          ]
        }
      ],
      obj: {},
      flag: false,
      objList: [],
    };
  },
  mounted(){
    this.tableData = roleList(this.tableData)
  },
  methods:{
        rowClass({ row, rowIndex }) {
      return row.children ? "bg" : "";
    },
    getTest(row,type){
      return row[type]
    },
    handleClick(row,type){
      row[type] = !row[type]
    },
    // 查找父级函数
    getParent (data2, nodeId2) {
      var arrRes = []
      if (data2.length === 0) {
        if (nodeId2) {
          arrRes.push(data2)
        }
        return arrRes
      }
      let rev = (data, nodeId) => {
        for (var i = 0, length = data.length; i < length; i++) {
          let node = data[i]
          if (node.id === nodeId) {
            arrRes.push(node)
            rev(data2, node.p_id)
            break
          } else {
            if (node.children) {
              rev(node.children, nodeId)
            }
          }
        }
        return arrRes
      }
      arrRes = rev(data2, nodeId2)
      return arrRes
    },
    /**
     * 功能选择
     */
    // 子选框事件
    fnCheckEv (flag ,scope, type) {
      console.log(flag ,scope.row, type)
      // 如果有子项，则子项的选框选择跟当前一致
      if (scope.row.children) {
        this.handleFnAll(scope.row, flag, type)
      }
  


      this.getArr(this.tableData, scope.row.itemId )

      //todo
    //   let isflag = true

    //   if(this.obj.children){
    //   this.obj.children.forEach(item=>{
    //     if(!item[type]){
    //       isflag= false
    //     }else{
         
    //     }
    //   })
      
    //   this.obj[type] = isflag
    // }
    //todo

      this.objList.forEach(item =>{
         let isflag = true
            if(item.children){
        item.children.forEach(item=>{
          if(!item[type]){
            isflag= false
          }else{
          
          }
        })
        
        item[type] = isflag
       }
      })


      this.flag = false

      this.obj = {}
      this.objList = []
    },
    
    getArr(arr, itemId ){
      if(this.flag) return
     
        arr.forEach(item => {
          
              //  console.log(item.itemId , itemId)
              if(item.itemId === itemId){
                this.flag = true
               console.log(item.itemId , itemId)
              
              }
             if(item.children&&!this.flag){
               this.obj  = item 
               this.objList.push(item)
               console.log(this.obj, this.flag)
                this.getArr(item.children, itemId)
             }
             
           })
    },

    handleFnAll (row, flag, type) {
    

      row[type] = flag 
      if(row.children){
        row.children.forEach(item=>{
          this.handleFnAll(item,flag,type)
        })
      }
     
    },
  }
};
</script>

<style>
.el-select {
  width: 100%;
}
.bg {
  background: #f2f2f2 !important;
}
</style>