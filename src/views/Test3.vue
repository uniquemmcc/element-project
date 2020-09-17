<template>
  <div class="role-details inside-base">
    <div class="inside-base-main clearfix">
      <!-- 中间内容 -->
      <div class="inside-base-cont">
        <div class="role-cont clearfix">
          <span>权限：</span>
          <div>
            <el-checkbox class="check-page-all" v-model="checkPageAll" @change="checkPageAllEv($event)"></el-checkbox>
            <!--  -->
            <el-table
              ref="table"
              :data="tableData"
              style="width: 100%;margin-bottom: 20px;"
              row-key="id"
              border
              :indent="10"
              :select-on-indeterminate="true"
              :default-expand-all="true"
              :tree-props="{children: 'childList', hasChildren: 'hasChildren'}">
              <el-table-column
                type="selection"
                width="55"
              >
                <template slot-scope="scope">
                  <el-checkbox v-model="scope.row.pageCheck" @change="pageCheckEv(scope)"></el-checkbox>
                </template>
              </el-table-column>
              <el-table-column
                prop="page"
                label="页面"
              >
              </el-table-column>
              <el-table-column
                label="功能"
              >
                <template slot-scope="scope">
                  <el-checkbox label="新增" v-model="scope.row.fnCheck.add" @change="fnCheckEv(scope, 'add')" v-if="scope.row.fnList.includes('新增')"></el-checkbox>
                  <el-checkbox label="删除" v-model="scope.row.fnCheck.del" @change="fnCheckEv(scope, 'del')" v-if="scope.row.fnList.includes('删除')"></el-checkbox>
                  <el-checkbox label="修改" v-model="scope.row.fnCheck.mod" @change="fnCheckEv(scope, 'mod')" v-if="scope.row.fnList.includes('修改')"></el-checkbox>
                  <el-checkbox label="查看" v-model="scope.row.fnCheck.check" @change="fnCheckEv(scope, 'check')" v-if="scope.row.fnList.includes('查看')"></el-checkbox>
                </template>
              </el-table-column>
              <el-table-column
                prop="address"
                label="数据权限"
              >
                <template slot-scope="scope">
                  <el-checkbox label="全部" v-model="scope.row.dataCheck.all" @change="dataCheckEv(scope, 'all')" v-if="scope.row.dataList.includes('全部')"></el-checkbox>
                  <el-checkbox label="自己录入" v-model="scope.row.dataCheck.self" @change="dataCheckEv(scope, 'self')" v-if="scope.row.dataList.includes('自己录入')"></el-checkbox>
                </template>
              </el-table-column>
            </el-table>
            <!--  -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RoleDetails',
  data () {
    return {
      msg: '',
      checkPageAll: false,
      tableData: [
        {
          id: 1, // id
          page: 'xxx页面', // 页面分类
          pageCheck: false, // 是否可查看页面
          fnList: ['新增', '删除', '修改'], // 功能权限有哪些
          fnCheck: {
            add: false,
            del: false,
            mod: false,
            check: false
          },
          dataList: ['全部', '自己录入'], // 数据权限
          dataCheck: {
            all: false,
            self: false
          }
        },
        {
          id: 2,
          page: 'xxx页面',
          pageCheck: false,
          fnList: ['新增', '删除', '修改', '查看'],
          fnCheck: {
            add: false,
            del: false,
            mod: false,
            check: false
          },
          dataList: ['全部', '自己录入'], // 数据权限
          dataCheck: {
            all: false,
            self: false
          },
          childList: [
            {
              p_id: 2,
              id: 31,
              page: 'xxx页面',
              pageCheck: false,
              fnList: ['新增', '删除', '修改', '查看'],
              fnCheck: {
                add: false,
                del: false,
                mod: false,
                check: false
              },
              dataList: ['全部', '自己录入'], // 数据权限
              dataCheck: {
                all: false,
                self: false
              }
            },
            {
              p_id: 2,
              id: 32,
              page: 'xxx页面',
              pageCheck: false,
              fnList: ['新增', '删除', '修改', '查看'],
              fnCheck: {
                add: false,
                del: false,
                mod: false,
                check: false
              },
              dataList: ['全部', '自己录入'], // 数据权限
              dataCheck: {
                all: false,
                self: false
              },
              childList: [
                {
                  p_id: 32,
                  id: 33,
                  page: 'xxx页面',
                  pageCheck: false,
                  fnList: ['新增', '删除', '修改', '查看'],
                  fnCheck: {
                    add: false,
                    del: false,
                    mod: false,
                    check: false
                  },
                  dataList: ['全部', '自己录入'], // 数据权限
                  dataCheck: {
                    all: false,
                    self: false
                  }
                }
              ]
            }
          ]
        }
      ]
    }
  },
  methods: {
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
            if (node.childList) {
              rev(node.childList, nodeId)
            }
          }
        }
        return arrRes
      }
      arrRes = rev(data2, nodeId2)
      return arrRes
    },
    /**
     * 页面选择
     */
    // 总选框事件
    checkPageAllEv (item) {
      let checkAll = (data, checked) => {
        for (let x of data) {
          x.pageCheck = checked
          if (x.childList) {
            checkAll(x.childList, checked)
          }
        }
      }
      if (item === true) {
        checkAll(this.tableData, true)
      } else {
        checkAll(this.tableData, false)
      }
    },
    // 遍历json数据
    isCheckAllEv (data) {
      let isCheckAll = true
      let fn = data => {
        for (let x of data) {
          if (x.pageCheck === false) {
            isCheckAll = false
            return isCheckAll
          }
          if (x.childList) {
            fn(x.childList)
          }
        }
      }
      fn(data)
      console.log(isCheckAll)
      return isCheckAll
    },
    // 子选框事件
    pageCheckEv (scope) {
      // 如果有子项，则子项的选框选择跟当前一致
      if (scope.row.childList) {
        this.handleCheckAll(scope.row, scope.row.pageCheck)
      }
      // 查找父级选框
      this.getParent(this.tableData, scope.row.id).forEach((item, i) => {
        if (!item.childList) {
          item.pageCheck = scope.row.pageCheck
        } else {
          var num = 0
          item.childList.forEach((item, i) => {
            if (item.pageCheck === true) {
              num += 1
            }
          })
          if (num === item.childList.length) {
            item.pageCheck = true
          } else {
            item.pageCheck = false
          }
        }
      })

      // 是否所有子项都已经勾选
      if (this.isCheckAllEv(this.tableData) === true) {
        this.checkPageAll = true
      } else {
        this.checkPageAll = false
      }
    },
    handleCheckAll (row, checked) {
      row.pageCheck = checked
      if (row.childList) {
        let that = this
        row.childList.forEach((element, i) => {
          that.handleCheckAll(row.childList[i], checked)
        })
      }
    },
    /**
     * 功能选择
     */
    // 子选框事件
    fnCheckEv (scope, type) {
      // 如果有子项，则子项的选框选择跟当前一致
      if (scope.row.childList) {
        this.handleFnAll(scope.row, scope.row.fnCheck[type], type)
      }
      // 查找父级选框
      this.getParent(this.tableData, scope.row.id).forEach((item, i) => {
        if (!item.childList) {
          item.fnCheck[type] = scope.row.fnCheck[type]
        } else {
          var num = 0
          item.childList.forEach((item, i) => {
            if (item.fnCheck[type] === true) {
              num += 1
            }
          })
          if (num === item.childList.length) {
            item.fnCheck[type] = true
          } else {
            item.fnCheck[type] = false
          }
        }
      })
    },
    handleFnAll (row, fnCheck, type) {
      row.fnCheck[type] = fnCheck
      if (row.childList) {
        let that = this
        row.childList.forEach((element, i) => {
          that.handleFnAll(row.childList[i], fnCheck, type)
        })
      }
    },
    /**
     * 权限选择
     */
    // 权限：全部、自己
    // 子选框事件
    dataCheckEv (scope, type) {
      let temp = scope.row.dataCheck[type]
      for (let x in scope.row.dataCheck) {
        scope.row.dataCheck[x] = false
      }
      scope.row.dataCheck[type] = temp
      // 如果有子项，则子项的选框选择跟当前一致
      if (scope.row.childList) {
        this.handleDataAll(scope.row, scope.row.dataCheck[type], type)
      }
      // 查找父级选框
      this.getParent(this.tableData, scope.row.id).forEach((item, i) => {
        for (let x in item.dataCheck) {
          item.dataCheck[x] = false
        }
        if (!item.childList) {
          item.dataCheck[type] = temp
        } else {
          var num = 0
          item.childList.forEach((item, i) => {
            if (item.dataCheck[type] === true) {
              num += 1
            }
          })
          if (num === item.childList.length) {
            item.dataCheck[type] = true
          } else {
            item.dataCheck[type] = false
          }
        }
      })
    },
    handleDataAll (row, dataCheck, type) {
      for (let x in row.dataCheck) {
        row.dataCheck[x] = false
      }
      row.dataCheck[type] = dataCheck
      if (row.childList) {
        let that = this
        row.childList.forEach((element, i) => {
          that.handleDataAll(row.childList[i], dataCheck, type)
        })
      }
    }
  },
  mounted () {

  }
}
</script>

<style lang="scss" scoped>
.inside-base {
  position: relative;
}

.inside-base-main {
  width: 100%;
  background: #ffffff;
  box-shadow: 0px 0px 10px 0px rgba(231,232,238,1);
  border-radius: 4px;
  margin-bottom: 30px;
}

// 中间内容
.inside-base-cont {
  margin: 0 20px;
}

.role-cont {
  position: relative;
  font-size: 16px;
  color: #333333;
  line-height: 40px;
  > span {
    width: 90px;
    height: 40px;
    text-align: right;
    float: left;
    margin-right: 10px;
    margin-bottom: 20px;
  }
  > div {
    position: relative;
    width: 90%;
    float: left;
    margin-bottom: 20px;
    >>> .el-input__inner {
      width: 320px;
    }
  }
}
.check-page-all {
  position: absolute;
  top: 13px;
  left: 11px;
  z-index: 99;
}

/* element-ui css */
.inside-base {
  >>> .el-input__inner {
    font-size: 16px;
    color: #333333;
  }
}
</style>

