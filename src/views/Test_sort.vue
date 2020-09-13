<template>
  <div>
    <el-table
      :data="tableData"
      :span-method="arraySpanMethod"
      border
      style="width: 100%; margin-top: 20px"
    >
      <el-table-column prop="organization_number" label="组织编号"></el-table-column>
      <el-table-column prop="name" label="组织名称"></el-table-column>
      <el-table-column prop="person_in_charge" label="负责人"></el-table-column>
      <el-table-column prop="father_organization_name" label="上层组织"></el-table-column>
      <el-table-column>
        <el-table-column prop="first_level" label="一级"></el-table-column>
        <el-table-column prop="second_level" label="二级"></el-table-column>
        <el-table-column prop="third_level" label="三级"></el-table-column>
        <el-table-column prop="fourth_level" label="四级"></el-table-column>
      </el-table-column>
      <el-table-column prop="status_word" label="状态"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import cloneDeep from 'clonedeep'
export default {
  data() {
    return {
      tableData: [
        {
          id: 1,
          organization_number: "Z1",
          name: "和合集团",
          person_in_charge: "吕华",
          father_organization_name: "-",
          first_level: "和合集团",
          second_level: "",
          third_level: "",
          fourth_level: "",
          status_word: "启用"
        },
         {
          id: 2,
          organization_number: "A2",
          name: "abc",
          person_in_charge: "abc",
          father_organization_name: "-",
          first_level: "abc",
          second_level: "",
          third_level: "",
          fourth_level: "",
          status_word: "启用"
        },
        {
          id: 3,
          organization_number: "Z11",
          name: "贸易",
          person_in_charge: "曹曙",
          father_organization_name: "和合集团",
          first_level: "和合集团",
          second_level: "贸易",
          third_level: "",
          fourth_level: "",
          status_word: "启用"
        },
        {
          id: 4,
          organization_number: "Z111",
          name: "挖掘机事业部",
          person_in_charge: "",
          father_organization_name: "贸易",
          first_level: "和合集团",
          second_level: "贸易",
          third_level: "挖掘机事业部",
          fourth_level: "",
          status_word: "启用"
        },
        {
          id: 6,
          organization_number: "Z1112",
          name: "福建闽瑞通",
          person_in_charge: "",
          father_organization_name: "挖掘机事业部",
          first_level: "和合集团",
          second_level: "贸易",
          third_level: "挖掘机事业部",
          fourth_level: "福建闽瑞通",
          status_word: "启用"
        },
        {
          id: 7,
          organization_number: "Z112",
          name: "起重机事业部",
          person_in_charge: "",
          father_organization_name: "贸易",
          first_level: "和合集团",
          second_level: "贸易",
          third_level: "起重机事业部",
          fourth_level: "",
          status_word: "禁用"
        },
        {
          id: 9,
          organization_number: "Z12",
          name: "海外",
          person_in_charge: "",
          father_organization_name: "和合集团",
          first_level: "和合集团",
          second_level: "海外",
          third_level: "",
          fourth_level: "",
          status_word: "启用"
        },
        {
          id: 10,
          organization_number: "DOE2",
          name: "一二集团",
          person_in_charge: "",
          father_organization_name: "-",
          first_level: "一二集团",
          second_level: "",
          third_level: "",
          fourth_level: "",
          status_word: "启用"
        },
        {
          id: 11,
          organization_number: "DOE21",
          name: "ACG部",
          person_in_charge: "邱一二",
          father_organization_name: "一二集团",
          first_level: "一二集团",
          second_level: "ACG部",
          third_level: "",
          fourth_level: "",
          status_word: "启用"
        },
        {
          id: 12,
          organization_number: "Z13",
          name: "贸易222",
          person_in_charge: "曹曙222",
          father_organization_name: "和合集团",
          first_level: "和合集团",
          second_level: "贸易222",
          third_level: "",
          fourth_level: "",
          status_word: "启用"
        },
      ],
      needMergeArr: [
        "first_level",
        "second_level",
        "third_level",
        "fourth_level"
      ], // 有合并项的列
      rowMergeArrs: {} // 包含需要一个或多个合并项信息的对象
    };
  },
  mounted() {
   

    let arr = []
    this.tableData.forEach(item=>{
      if(item.first_level&&!item.second_level&&!item.third_level&&!item.fourth_level){
        let temp = []
        temp.push(item)
        this.tableData.forEach(item=>{
            if(temp[0].first_level === item.first_level&&item.second_level!==''){
                temp.push(item)
            }
        })
        temp.sort((a,b)=>{
            return parseInt(a.organization_number) < parseInt(b.organization_number)
        })
        arr = [...arr, ...temp]
      }
    })
     
    // arr.splice(1,0,{name:123})
    console.log( JSON.parse(JSON.stringify(arr) ))
    this.tableData = arr



    this.rowMergeArrs = this.rowMergeHandle(this.needMergeArr, this.tableData); // 处理数据
  },
  methods: {
    // getSortList(arr){
    //   let i = 0 
      
   
    // },
    //    mySort(a,b){
    //     if(i<arr.length){
    //       if(){

    //       }
    //     }else{
    //       return
    //     }
    //   },
    
    /**
     * @description 实现合并行或列
     * @param row:Object 需要合并的列name 如:'name' 'id'
     * @param column:Object 当前行的行数，由合并函数传入
     * @param rowIndex:Number 当前列的数据，由合并函数传入
     * @param columnIndex:Number 当前列的数据，由合并函数传入
     *
     * @return 函数可以返回一个包含两个元素的数组，第一个元素代表rowspan，第二个元素代表colspan。 也可以返回一个键名为rowspan和colspan的对象
     * 参考地址：https://element.eleme.cn/#/zh-CN/component/table#table-biao-ge
     */
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      // 没办法循环判断具体是那一列 所以就只好写了多个if
      if (column.property === "first_level")
        return this.mergeAction("first_level", rowIndex, column);
      if (column.property === "second_level")
        return this.mergeAction("second_level", rowIndex, column);
      if (column.property === "third_level")
        return this.mergeAction("third_level", rowIndex, column);
      if (column.property === "fourth_level")
        return this.mergeAction("fourth_level", rowIndex, column);
    },
    /**
     * @description 根据数组来确定单元格是否需要合并
     * @param val:String 需要合并的列name 如:'name' 'id'
     * @param rowIndex:Number 当前行的行数，由合并函数传入
     * @param colData:Object 当前列的数据，由合并函数传入
     *
     * @return 返回值为一个数组表示该单元格是否需要合并; 说明: [0,0]表示改行被合并了 [n+,1]n为1时表示该单元格不动,n大于1时表示合并了N-1个单元格
     */
    mergeAction(val, rowIndex, colData) {
      let _row = this.rowMergeArrs[val].rowArr[rowIndex];
      let _col = _row > 0 ? 1 : 0;
      return [_row, _col];
    },
    /**
     * @description 根据数组将指定对象转化为相应的数组
     * @param arr:Array[String] 必填 必须是字符串形式的数组
     * @param data:Array 必填 需要转化的对象
     *
     * @return 返回一个对象
     * 例：rowMerge(['name','value'], [{value:'1', name:'小明'}, {value:'2', name:'小明'}, {value:'3', name:'小明'}, {value:'1', name:'小明'}, {value:'1', name:'小明'}])
     * 返回值: {
     *          name:{
     *            rowArr: [5, 0, 0, 0, 0]
     *            rowMergeNum: 0,
     *          },
     *          value: {
     *            rowArr: [1, 1, 1, 2, 0],
     *            rowMergeNum: 3
     *          }
     *        }
     */
    rowMergeHandle(arr, data) {
      if (!Array.isArray(arr) && !arr.length) return false;
      if (!Array.isArray(data) && !data.length) return false;
      let needMerge = {};
      arr.forEach(i => {
        needMerge[i] = {
          rowArr: [],
          rowMergeNum: 0
        };
        data.forEach((item, index) => {
          if (index === 0) {
            needMerge[i].rowArr.push(1);
            needMerge[i].rowMergeNum = 0;
          } else {
            if (item[i] === data[index - 1][i]) {
              needMerge[i].rowArr[needMerge[i].rowMergeNum] += 1;
              needMerge[i].rowArr.push(0);
            } else {
              needMerge[i].rowArr.push(1);
              needMerge[i].rowMergeNum = index;
            }
          }
        });
      });
      return needMerge;
    }
  }
};
</script>

<style>
</style>
