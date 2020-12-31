<template>
  <div class="roleAdd">
  
 
      <div slot="content">
   
     
 
        <div class="roleAdd-datapermiss">

          <div style="padding: 16px">
    
      

            <p style="margin: 16px; font-size: 14px">
              (细化到各个功能模块的每个字段增删改查的权限)
            </p>

            <!-- <div v-show="true">{{ tableData2 }}</div> -->

            <el-table
              :data="tableData2"
              style="width: 100%"
              row-key="itemId"
              border
              default-expand-all
              :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
              :row-class-name="rowClass"
            >
              <el-table-column prop="module" label="模块"></el-table-column>
              <el-table-column
                prop="first_level"
                label="一级分类"
              ></el-table-column>
              <el-table-column
                prop="second_level"
                label="二级分类"
              ></el-table-column>
              <el-table-column
                prop="column_name"
                label="字段"
              ></el-table-column>
              <el-table-column prop="check" label="查看">
                <template
                  slot-scope="scope"
                  v-if="
                    scope.row.notShow_check
                      ? false
                      : scope.row.hasOwnProperty('check')
                  "
                >
                  <el-checkbox
                    v-model="scope.row.check"
                    @change="fnCheckEv2($event, scope, 'check')"
                  ></el-checkbox>
                </template>
              </el-table-column>
              <el-table-column prop="export" label="导出">
                <template
                  slot-scope="scope"
                  v-if="
                    scope.row.notShow_export
                      ? false
                      : scope.row.hasOwnProperty('export')
                  "
                >
                  <el-checkbox
                    v-model="scope.row.export"
                    @change="fnCheckEv2($event, scope, 'export')"
                  ></el-checkbox>
                </template>
              </el-table-column>
              <el-table-column prop="create_update" label="创建/修改">
                <template
                  slot-scope="scope"
                  v-if="
                    scope.row.notShow_create_update
                      ? false
                      : scope.row.hasOwnProperty('create_update')
                  "
                >
                  <div style="position: relative; width: 100%; height: 100%">
                    <div
                      style="
                        position: absolute;
                        z-index: 2;
                        width: 100%;
                        height: 100%;
                        opacity: 0;
                        left: 0;
                        top: 0;
                      "
                      v-if="scope.row.not_null&& (!scope.row.hasOwnProperty('notShow_not_null')||!scope.row.notShow_not_null)"
                    ></div>
                    <div
                      style="
                        position: relative;
                        z-index: 1;
                        width: 100%;
                        height: 100%;
                        left: 0;
                        top: 0;
                      "
                    >
                      <el-checkbox
                        v-model="scope.row.create_update"
                        @change="fnCheckEv2($event, scope, 'create_update')"
                      ></el-checkbox>
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="not_null" label="必填">
                <template
                  slot-scope="scope"
                  v-if="
                    scope.row.notShow_not_null
                      ? false
                      : scope.row.hasOwnProperty('not_null')
                  "
                >
                  <el-checkbox
                    v-model="scope.row.not_null"
                    @change="fnCheckEv2($event, scope, 'not_null')"
                  ></el-checkbox>
                </template>
              </el-table-column>
              
              
              <el-table-column prop="verify" label="校验">
                <template
                  slot-scope="scope"
                  v-if="
                    scope.row.notShow_verify
                      ? false
                      : scope.row.hasOwnProperty('verify')
                  "
                >
                  <el-checkbox
                    v-model="scope.row.verify"
                    @change="fnCheckEv2($event, scope, 'verify')"
                  ></el-checkbox>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <!-- <div
          style="
            display: flex;
            flex-direction: row;
            justify-content: center;
            width: 100%;
            background: transparent;
          "
        >
          <el-button
            @click="resetForm('ruleForm')"
            style="width: 180px; margin-right: 10px"
            class="create-hover"
            >取消</el-button
          >
          <el-button
            class="search-hover"
            @click="submitForm('ruleForm')"
            style="width: 180px; margin-left: 10px"
            >保存</el-button
          >
        </div> -->
      </div>
 
  </div>
</template>

<script>


import axios from "axios";
import cloneDeep from "clonedeep";
import {
  setStorage,
  getStorage,
  roleList1,
  roleList2,
  sendRoleList1,
  sendRoleList2,
  mergeArray,
} from "@/utils";
import { mapActions, mapMutations, mapState } from "vuex";
export default {
  name: "roleAdd",
  components: {

  },
  data() {
    var validateStatus = (rule, value, callback) => {
      if (value >= 0) {
        console.log(value, rule);
        callback();
      } else {
        callback(new Error("请选择状态"));
      }
    };

    return {
      needFlag: false,
      // notShow_check_reset_export: true,
      // notShow_create_update: true,
      // notShow_delete: true,

      tableData: [],
      pcqrd: false,
      pcau: false,
      pcd: false,
      appqrd: false,
      appau: false,
      appd: false,

      // notShow_not_null: true,
      // notShow_check_export: true,
      // notShow_create_update: true,
      // notShow_verify: true,
      tableData2: [
        {
            "_id": {
                "$oid": "5fc9d067b527000006002c92"
            }, 
            "itemId": "customer_data_analysis_son43grd", 
            "id": "customer_data_analysis", 
            "module": "客户数据统计", 
            "first_level": "", 
            "second_level": "", 
            "column_name": "", 
            "create_update": false, 
            "verify": false, 
            "not_null": false, 
            "notShow_not_null": true, 
            "notShow_verify": true, 
            "pid": "0", 
            "export": false, 
            "check": false, 
            "first_level_id": "", 
            "module_id": "", 
            "children": [ ]
        }, 
        {
            "_id": {
                "$oid": "5fc9d2f4b527000006002c93"
            }, 
            "itemId": "visit_record_analysis_xooaxadq", 
            "id": "visit_record_analysis", 
            "module": "拜访数据统计", 
            "first_level": "", 
            "second_level": "", 
            "column_name": "", 
            "create_update": false, 
            "verify": false, 
            "not_null": false, 
            "notShow_not_null": true, 
            "notShow_verify": true, 
            "pid": "0", 
            "export": false, 
            "check": false, 
            "first_level_id": "", 
            "module_id": "", 
            "children": [ ]
        }, 
        {
            "_id": {
                "$oid": "5fc9d34bb527000006002c95"
            }, 
            "itemId": "customer_info_bbo9xp8r", 
            "id": "customer_info", 
            "module": "客户信息", 
            "first_level": "", 
            "second_level": "", 
            "column_name": "", 
            "create_update": false, 
            "verify": false, 
            "not_null": false, 
            "pid": "0", 
            "notShow_not_null": false, 
            "notShow_verify": false, 
            "export": false, 
            "check": false, 
            "first_level_id": "", 
            "module_id": "", 
            "children": [
                {
                    "_id": {
                        "$oid": "5fcd9f22f85d000004006f52"
                    }, 
                    "itemId": "basic_info_ov90hoq8", 
                    "id": "basic_info", 
                    "module": "", 
                    "first_level": "基本信息", 
                    "second_level": "", 
                    "column_name": "", 
                    "create_update": false, 
                    "verify": false, 
                    "not_null": false, 
                    "notShow_verify": true, 
                    "notShow_not_null": false, 
                    "pid": "customer_info", 
                    "export": false, 
                    "check": false, 
                    "first_level_id": "", 
                    "module_id": "customer_info", 
                    "children": [
                        {
                            "_id": {
                                "$oid": "5fcde9dcf85d000004006f57"
                            }, 
                            "itemId": "common_column_odavjfub", 
                            "id": "common_column", 
                            "module": "", 
                            "first_level": "", 
                            "second_level": "公用字段", 
                            "column_name": "", 
                            "create_update": false, 
                            "verify": false, 
                            "not_null": false, 
                            "notShow_verify": true, 
                            "notShow_not_null": false, 
                            "pid": "basic_info", 
                            "export": false, 
                            "check": false, 
                            "first_level_id": "basic_info", 
                            "module_id": "customer_info", 
                            "children": [
                                {
                                    "_id": {
                                        "$oid": "5fcdf599f85d000004006f66"
                                    }, 
                                    "itemId": "ccm.cus_num_1w1trtc6", 
                                    "id": "ccm.cus_num", 
                                    "module": "", 
                                    "first_level": "", 
                                    "second_level": "", 
                                    "column_name": "客户编号", 
                                    "create_update": false, 
                                    "verify": false, 
                                    "not_null": false, 
                                    "notShow_verify": true, 
                                    "notShow_not_null": true, 
                                    "pid": "common_column", 
                                    "export": false, 
                                    "check": false, 
                                    "first_level_id": "basic_info", 
                                    "module_id": "customer_info", 
                                    "children": [ ]
                                }, 
                                {
                                    "_id": {
                                        "$oid": "5fcdf5c9f85d000004006f67"
                                    }, 
                                    "itemId": "ccm.type_hel50e7h", 
                                    "id": "ccm.type", 
                                    "module": "", 
                                    "first_level": "", 
                                    "second_level": "", 
                                    "column_name": "客户类型", 
                                    "create_update": false, 
                                    "verify": false, 
                                    "not_null": false, 
                                    "notShow_verify": true, 
                                    "notShow_not_null": false, 
                                    "pid": "common_column", 
                                    "export": false, 
                                    "check": false, 
                                    "first_level_id": "basic_info", 
                                    "module_id": "customer_info", 
                                    "children": [ ]
                                }, 
                                {
                                    "_id": {
                                        "$oid": "5fcdf610f85d000004006f68"
                                    }, 
                                    "itemId": "ccm.cus_name_n8vwlxbh", 
                                    "id": "ccm.cus_name", 
                                    "module": "", 
                                    "first_level": "", 
                                    "second_level": "", 
                                    "column_name": "客户名称", 
                                    "create_update": false, 
                                    "verify": false, 
                                    "not_null": false, 
                                    "notShow_verify": false, 
                                    "notShow_not_null": false, 
                                    "pid": "common_column", 
                                    "export": false, 
                                    "check": false, 
                                    "first_level_id": "basic_info", 
                                    "module_id": "customer_info", 
                                    "children": [ ]
                                }, 
                                {
                                    "_id": {
                                        "$oid": "5fcdf636f85d000004006f69"
                                    }, 
                                    "itemId": "ccm.lisense_address_07x4jyv8", 
                                    "id": "ccm.lisense_address", 
                                    "module": "", 
                                    "first_level": "", 
                                    "second_level": "", 
                                    "column_name": "证件省市", 
                                    "create_update": false, 
                                    "verify": false, 
                                    "not_null": false, 
                                    "notShow_verify": true, 
                                    "notShow_not_null": false, 
                                    "pid": "common_column", 
                                    "export": false, 
                                    "check": false, 
                                    "first_level_id": "basic_info", 
                                    "module_id": "customer_info", 
                                    "children": [ ]
                                }, 
                                {
                                    "_id": {
                                        "$oid": "5fcdf790f85d000004006f6a"
                                    }, 
                                    "itemId": "ccm.lisense_detail_address_7oien9ga", 
                                    "id": "ccm.lisense_detail_address", 
                                    "module": "", 
                                    "first_level": "", 
                                    "second_level": "", 
                                    "column_name": "证件详细地址", 
                                    "create_update": false, 
                                    "verify": false, 
                                    "not_null": false, 
                                    "notShow_verify": true, 
                                    "notShow_not_null": false, 
                                    "pid": "common_column", 
                                    "export": false, 
                                    "check": false, 
                                    "first_level_id": "basic_info", 
                                    "module_id": "customer_info", 
                                    "children": [ ]
                                }, 
                                {
                                    "_id": {
                                        "$oid": "5fcdf7a4f85d000004006f6b"
                                    }, 
                                    "itemId": "ccm.permanent_address_08oorpw7", 
                                    "id": "ccm.permanent_address", 
                                    "module": "", 
                                    "first_level": "", 
                                    "second_level": "", 
                                    "column_name": "常驻省市", 
                                    "create_update": false, 
                                    "verify": false, 
                                    "not_null": false, 
                                    "notShow_verify": true, 
                                    "notShow_not_null": false, 
                                    "pid": "common_column", 
                                    "export": false, 
                                    "check": false, 
                                    "first_level_id": "basic_info", 
                                    "module_id": "customer_info", 
                                    "children": [ ]
                                }, 
                                {
                                    "_id": {
                                        "$oid": "5fcdf7d9f85d000004006f6c"
                                    }, 
                                    "itemId": "ccm.permanent_detail_address_wbjtnbtc", 
                                    "id": "ccm.permanent_detail_address", 
                                    "module": "", 
                                    "first_level": "", 
                                    "second_level": "", 
                                    "column_name": "常驻详细地址", 
                                    "create_update": false, 
                                    "verify": false, 
                                    "not_null": false, 
                                    "notShow_verify": true, 
                                    "notShow_not_null": false, 
                                    "pid": "common_column", 
                                    "export": false, 
                                    "check": false, 
                                    "first_level_id": "basic_info", 
                                    "module_id": "customer_info", 
                                    "children": [ ]
                                }, 
                                {
                                    "_id": {
                                        "$oid": "5fcdf801f85d000004006f6d"
                                    }, 
                                    "itemId": "ccm.state_tn6awtl3", 
                                    "id": "ccm.state", 
                                    "module": "", 
                                    "first_level": "", 
                                    "second_level": "", 
                                    "column_name": "客户阶段", 
                                    "create_update": false, 
                                    "verify": false, 
                                    "not_null": false, 
                                    "notShow_verify": true, 
                                    "notShow_not_null": false, 
                                    "pid": "common_column", 
                                    "export": false, 
                                    "check": false, 
                                    "first_level_id": "basic_info", 
                                    "module_id": "customer_info", 
                                    "children": [ ]
                                }
                            ]
                        }, 
                        {
                            "_id": {
                                "$oid": "5fcdea12f85d000004006f58"
                            }, 
                            "itemId": "personal_client_hbnc4z7i", 
                            "id": "personal_client", 
                            "module": "", 
                            "first_level": "", 
                            "second_level": "个人客户", 
                            "column_name": "", 
                            "create_update": false, 
                            "verify": false, 
                            "not_null": false, 
                            "notShow_verify": true, 
                            "notShow_not_null": false, 
                            "pid": "basic_info", 
                            "export": false, 
                            "check": false, 
                            "first_level_id": "basic_info", 
                            "module_id": "customer_info", 
                            "children": [
                                {
                                    "_id": {
                                        "$oid": "5fcdf8eef85d000004006f6e"
                                    }, 
                                    "itemId": "ccm.gender_nyb8n1ji", 
                                    "id": "ccm.gender", 
                                    "module": "", 
                                    "first_level": "", 
                                    "second_level": "", 
                                    "column_name": "性别", 
                                    "create_update": false, 
                                    "verify": false, 
                                    "not_null": false, 
                                    "notShow_verify": false, 
                                    "notShow_not_null": false, 
                                    "pid": "personal_client", 
                                    "export": false, 
                                    "check": false, 
                                    "first_level_id": "basic_info", 
                                    "module_id": "customer_info", 
                                    "children": [ ]
                                }, 
                                {
                                    "_id": {
                                        "$oid": "5fcdf914f85d000004006f6f"
                                    }, 
                                    "itemId": "ccm.id_card_p8bezv9l", 
                                    "id": "ccm.id_card", 
                                    "module": "", 
                                    "first_level": "", 
                                    "second_level": "", 
                                    "column_name": "身份证号码", 
                                    "create_update": false, 
                                    "verify": false, 
                                    "not_null": false, 
                                    "notShow_verify": true, 
                                    "notShow_not_null": false, 
                                    "pid": "personal_client", 
                                    "export": false, 
                                    "check": false, 
                                    "first_level_id": "basic_info", 
                                    "module_id": "customer_info", 
                                    "children": [ ]
                                }, 
                                {
                                    "_id": {
                                        "$oid": "5fcdf934f85d000004006f70"
                                    }, 
                                    "itemId": "ccm.birthday_z16h96tn", 
                                    "id": "ccm.birthday", 
                                    "module": "", 
                                    "first_level": "", 
                                    "second_level": "", 
                                    "column_name": "出生日期", 
                                    "create_update": false, 
                                    "verify": false, 
                                    "not_null": false, 
                                    "notShow_verify": true, 
                                    "notShow_not_null": false, 
                                    "pid": "personal_client", 
                                    "export": false, 
                                    "check": false, 
                                    "first_level_id": "basic_info", 
                                    "module_id": "customer_info", 
                                    "children": [ ]
                                }
                            ]
                        }, 
                        {
                            "_id": {
                                "$oid": "5fcdea43f85d000004006f59"
                            }, 
                            "itemId": "enterprise_client_tlawj8ni", 
                            "id": "enterprise_client", 
                            "module": "", 
                            "first_level": "", 
                            "second_level": "企业客户", 
                            "column_name": "", 
                            "create_update": false, 
                            "verify": false, 
                            "not_null": false, 
                            "notShow_verify": true, 
                            "notShow_not_null": false, 
                            "pid": "basic_info", 
                            "export": false, 
                            "check": false, 
                            "first_level_id": "basic_info", 
                            "module_id": "customer_info", 
                            "children": [
                                {
                                    "_id": {
                                        "$oid": "5fcdf95cf85d000004006f71"
                                    }, 
                                    "itemId": "ccmcom.name_hsvfdd6m", 
                                    "id": "ccmcom.name", 
                                    "module": "", 
                                    "first_level": "", 
                                    "second_level": "", 
                                    "column_name": "企业类型", 
                                    "create_update": false, 
                                    "verify": false, 
                                    "not_null": false, 
                                    "notShow_verify": false, 
                                    "notShow_not_null": false, 
                                    "pid": "enterprise_client", 
                                    "export": false, 
                                    "check": false, 
                                    "first_level_id": "basic_info", 
                                    "module_id": "customer_info", 
                                    "children": [ ]
                                }, 
                                {
                                    "_id": {
                                        "$oid": "5fcdf97ff85d000004006f72"
                                    }, 
                                    "itemId": "ccm.organization_code_2fr7w1ue", 
                                    "id": "ccm.organization_code", 
                                    "module": "", 
                                    "first_level": "", 
                                    "second_level": "", 
                                    "column_name": "组织机构代码证", 
                                    "create_update": false, 
                                    "verify": false, 
                                    "not_null": false, 
                                    "notShow_verify": true, 
                                    "notShow_not_null": false, 
                                    "pid": "enterprise_client", 
                                    "export": false, 
                                    "check": false, 
                                    "first_level_id": "basic_info", 
                                    "module_id": "customer_info", 
                                    "children": [ ]
                                }, 
                                {
                                    "_id": {
                                        "$oid": "5fcdf997f85d000004006f73"
                                    }, 
                                    "itemId": "ccm.legal_person_94j2tkju", 
                                    "id": "ccm.legal_person", 
                                    "module": "", 
                                    "first_level": "", 
                                    "second_level": "", 
                                    "column_name": "法人", 
                                    "create_update": false, 
                                    "verify": false, 
                                    "not_null": false, 
                                    "notShow_verify": false, 
                                    "notShow_not_null": false, 
                                    "pid": "enterprise_client", 
                                    "export": false, 
                                    "check": false, 
                                    "first_level_id": "basic_info", 
                                    "module_id": "customer_info", 
                                    "children": [ ]
                                }
                            ]
                        }
                    ]
                }, 
                {
                    "_id": {
                        "$oid": "5fcda28ef85d000004006f53"
                    }, 
                    "itemId": "excavator_info_43bfdvjc", 
                    "id": "excavator_info", 
                    "module": "", 
                    "first_level": "挖掘机业务组", 
                    "second_level": "", 
                    "column_name": "", 
                    "create_update": false, 
                    "verify": false, 
                    "not_null": false, 
                    "notShow_verify": false, 
                    "notShow_not_null": false, 
                    "pid": "customer_info", 
                    "export": false, 
                    "check": false, 
                    "first_level_id": "", 
                    "module_id": "customer_info", 
                    "children": [
                        {
                            "_id": {
                                "$oid": "5fcdeadbf85d000004006f5a"
                            }, 
                            "itemId": "contact_info_a1nocimy", 
                            "id": "contact_info", 
                            "module": "", 
                            "first_level": "", 
                            "second_level": "联系人信息", 
                            "column_name": "", 
                            "create_update": false, 
                            "verify": false, 
                            "not_null": false, 
                            "notShow_verify": false, 
                            "notShow_not_null": false, 
                            "pid": "excavator_info", 
                            "export": false, 
                            "check": false, 
                            "first_level_id": "excavator_info", 
                            "module_id": "customer_info", 
                            "children": [
                                {
                                    "_id": {
                                        "$oid": "5fced679a03c000052007cf2"
                                    }, 
                                    "itemId": "ccmc.name_f87jfzn0", 
                                    "id": "ccmc.name", 
                                    "module": "", 
                                    "first_level": "", 
                                    "second_level": "", 
                                    "column_name": "联系人", 
                                    "create_update": false, 
                                    "verify": false, 
                                    "not_null": false, 
                                    "notShow_verify": false, 
                                    "notShow_not_null": false, 
                                    "pid": "contact_info", 
                                    "export": false, 
                                    "check": false, 
                                    "first_level_id": "excavator_info", 
                                    "module_id": "customer_info", 
                                    "children": [ ]
                                }, 
                                {
                                    "_id": {
                                        "$oid": "5fced9e9a03c000052007cf3"
                                    }, 
                                    "itemId": "ccmc.gender_0cirvjg7", 
                                    "id": "ccmc.gender", 
                                    "module": "", 
                                    "first_level": "", 
                                    "second_level": "", 
                                    "column_name": "联系人性别", 
                                    "create_update": false, 
                                    "verify": false, 
                                    "not_null": false, 
                                    "notShow_verify": true, 
                                    "notShow_not_null": false, 
                                    "pid": "contact_info", 
                                    "export": false, 
                                    "check": false, 
                                    "first_level_id": "excavator_info", 
                                    "module_id": "customer_info", 
                                    "children": [ ]
                                }, 
                                {
                                    "_id": {
                                        "$oid": "5fcedb0da03c000052007cf8"
                                    }, 
                                    "itemId": "ccmc.birthday_i1fejsiz", 
                                    "id": "ccmc.birthday", 
                                    "module": "", 
                                    "first_level": "", 
                                    "second_level": "", 
                                    "column_name": "联系人生日", 
                                    "create_update": false, 
                                    "verify": false, 
                                    "not_null": false, 
                                    "notShow_verify": true, 
                                    "notShow_not_null": false, 
                                    "pid": "contact_info", 
                                    "export": false, 
                                    "check": false, 
                                    "first_level_id": "excavator_info", 
                                    "module_id": "customer_info", 
                                    "children": [ ]
                                }, 
                                {
                                    "_id": {
                                        "$oid": "5fcedad3a03c000052007cf6"
                                    }, 
                                    "itemId": "ccmc.mobile_bmurfv4z", 
                                    "id": "ccmc.mobile", 
                                    "module": "", 
                                    "first_level": "", 
                                    "second_level": "", 
                                    "column_name": "联系电话", 
                                    "create_update": false, 
                                    "verify": false, 
                                    "not_null": false, 
                                    "notShow_verify": false, 
                                    "notShow_not_null": false, 
                                    "pid": "contact_info", 
                                    "export": false, 
                                    "check": false, 
                                    "first_level_id": "excavator_info", 
                                    "module_id": "customer_info", 
                                    "children": [ ]
                                }, 
                                {
                                    "_id": {
                                        "$oid": "5fceda64a03c000052007cf4"
                                    }, 
                                    "itemId": "ccmc.master_p8zjsxcs", 
                                    "id": "ccmc.master", 
                                    "module": "", 
                                    "first_level": "", 
                                    "second_level": "", 
                                    "column_name": "是否主联系人", 
                                    "create_update": false, 
                                    "verify": false, 
                                    "not_null": false, 
                                    "notShow_verify": true, 
                                    "notShow_not_null": false, 
                                    "pid": "contact_info", 
                                    "export": false, 
                                    "check": false, 
                                    "first_level_id": "excavator_info", 
                                    "module_id": "customer_info", 
                                    "children": [ ]
                                }, 
                                {
                                    "_id": {
                                        "$oid": "5fceda9fa03c000052007cf5"
                                    }, 
                                    "itemId": "ccmr.name_re3unvqq", 
                                    "id": "ccmr.name", 
                                    "module": "", 
                                    "first_level": "", 
                                    "second_level": "", 
                                    "column_name": "关系", 
                                    "create_update": false, 
                                    "verify": false, 
                                    "not_null": false, 
                                    "notShow_verify": true, 
                                    "notShow_not_null": false, 
                                    "pid": "contact_info", 
                                    "export": false, 
                                    "check": false, 
                                    "first_level_id": "excavator_info", 
                                    "module_id": "customer_info", 
                                    "children": [ ]
                                }, 
                                {
                                    "_id": {
                                        "$oid": "5fcedaeca03c000052007cf7"
                                    }, 
                                    "itemId": "ccmc.remark_hfaqps83", 
                                    "id": "ccmc.remark", 
                                    "module": "", 
                                    "first_level": "", 
                                    "second_level": "", 
                                    "column_name": "备注", 
                                    "create_update": false, 
                                    "verify": false, 
                                    "not_null": false, 
                                    "notShow_verify": true, 
                                    "notShow_not_null": false, 
                                    "pid": "contact_info", 
                                    "export": false, 
                                    "check": false, 
                                    "first_level_id": "excavator_info", 
                                    "module_id": "customer_info", 
                                    "children": [ ]
                                }
                            ]
                        }, 
                        {
                            "_id": {
                                "$oid": "5fcdeb54f85d000004006f5b"
                            }, 
                            "itemId": "client_classification_3ob6lnng", 
                            "id": "client_classification", 
                            "module": "", 
                            "first_level": "", 
                            "second_level": "客户分级", 
                            "column_name": "", 
                            "create_update": false, 
                            "verify": false, 
                            "not_null": false, 
                            "notShow_verify": true, 
                            "notShow_not_null": false, 
                            "pid": "excavator_info", 
                            "export": false, 
                            "check": false, 
                            "first_level_id": "excavator_info", 
                            "module_id": "customer_info", 
                            "children": [
                                {
                                    "_id": {
                                        "$oid": "5fcedb58a03c000052007cf9"
                                    }, 
                                    "itemId": "ccmg.cus_from_id_paq34708", 
                                    "id": "ccmg.cus_from_id", 
                                    "module": "", 
                                    "first_level": "", 
                                    "second_level": "", 
                                    "column_name": "渠道分类", 
                                    "create_update": false, 
                                    "verify": false, 
                                    "not_null": false, 
                                    "notShow_verify": true, 
                                    "notShow_not_null": false, 
                                    "pid": "client_classification", 
                                    "export": false, 
                                    "check": false, 
                                    "first_level_id": "excavator_info", 
                                    "module_id": "customer_info", 
                                    "children": [ ]
                                }, 
                                {
                                    "_id": {
                                        "$oid": "5fcedc35a03c000052007cfa"
                                    }, 
                                    "itemId": "ccmg.cus_classfy_id_qsyhnr6y", 
                                    "id": "ccmg.cus_classfy_id", 
                                    "module": "", 
                                    "first_level": "", 
                                    "second_level": "", 
                                    "column_name": "客户分类", 
                                    "create_update": false, 
                                    "verify": false, 
                                    "not_null": false, 
                                    "notShow_verify": true, 
                                    "notShow_not_null": false, 
                                    "pid": "client_classification", 
                                    "export": false, 
                                    "check": false, 
                                    "first_level_id": "excavator_info", 
                                    "module_id": "customer_info", 
                                    "children": [ ]
                                }, 
                                {
                                    "_id": {
                                        "$oid": "5fcedd1da03c000052007cfb"
                                    }, 
                                    "itemId": "ccmg.cus_scene_id_8tblgx63", 
                                    "id": "ccmg.cus_scene_id", 
                                    "module": "", 
                                    "first_level": "", 
                                    "second_level": "", 
                                    "column_name": "施工场景", 
                                    "create_update": false, 
                                    "verify": false, 
                                    "not_null": false, 
                                    "notShow_verify": true, 
                                    "notShow_not_null": false, 
                                    "pid": "client_classification", 
                                    "export": false, 
                                    "check": false, 
                                    "first_level_id": "excavator_info", 
                                    "module_id": "customer_info", 
                                    "children": [ ]
                                }, 
                                {
                                    "_id": {
                                        "$oid": "5fcede3aa03c000052007cfc"
                                    }, 
                                    "itemId": "ccmg.cus_device_level_id_jxzr07za", 
                                    "id": "ccmg.cus_device_level_id", 
                                    "module": "", 
                                    "first_level": "", 
                                    "second_level": "", 
                                    "column_name": "持有设备级别", 
                                    "create_update": false, 
                                    "verify": false, 
                                    "not_null": false, 
                                    "notShow_verify": true, 
                                    "notShow_not_null": false, 
                                    "pid": "client_classification", 
                                    "export": false, 
                                    "check": false, 
                                    "first_level_id": "excavator_info", 
                                    "module_id": "customer_info", 
                                    "children": [ ]
                                }
                            ]
                        }, 
                        {
                            "_id": {
                                "$oid": "5fcdeb7cf85d000004006f5c"
                            }, 
                            "itemId": "equipment_info_raftzatm", 
                            "id": "equipment_info", 
                            "module": "", 
                            "first_level": "", 
                            "second_level": "名下设备", 
                            "column_name": "", 
                            "create_update": false, 
                            "verify": false, 
                            "not_null": false, 
                            "notShow_verify": true, 
                            "notShow_not_null": false, 
                            "pid": "excavator_info", 
                            "export": false, 
                            "check": false, 
                            "first_level_id": "excavator_info", 
                            "module_id": "customer_info", 
                            "children": [
                                {
                                    "_id": {
                                        "$oid": "5fcedee1a03c000052007cfd"
                                    }, 
                                    "itemId": "ccmb.name_d7zy03ck", 
                                    "id": "ccmb.name", 
                                    "module": "", 
                                    "first_level": "", 
                                    "second_level": "", 
                                    "column_name": "品牌", 
                                    "create_update": false, 
                                    "verify": false, 
                                    "not_null": false, 
                                    "notShow_verify": true, 
                                    "notShow_not_null": false, 
                                    "pid": "equipment_info", 
                                    "export": false, 
                                    "check": false, 
                                    "first_level_id": "excavator_info", 
                                    "module_id": "customer_info", 
                                    "children": [ ]
                                }, 
                                {
                                    "_id": {
                                        "$oid": "5fcedf6ba03c000052007cfe"
                                    }, 
                                    "itemId": "ccmd.model_u1e9qmkv", 
                                    "id": "ccmd.model", 
                                    "module": "", 
                                    "first_level": "", 
                                    "second_level": "", 
                                    "column_name": "型号", 
                                    "create_update": false, 
                                    "verify": false, 
                                    "not_null": false, 
                                    "notShow_verify": true, 
                                    "notShow_not_null": false, 
                                    "pid": "equipment_info", 
                                    "export": false, 
                                    "check": false, 
                                    "first_level_id": "excavator_info", 
                                    "module_id": "customer_info", 
                                    "children": [ ]
                                }, 
                                {
                                    "_id": {
                                        "$oid": "5fcee07aa03c000052007cff"
                                    }, 
                                    "itemId": "ccmd.number_q0abwdih", 
                                    "id": "ccmd.number", 
                                    "module": "", 
                                    "first_level": "", 
                                    "second_level": "", 
                                    "column_name": "数量", 
                                    "create_update": false, 
                                    "verify": false, 
                                    "not_null": false, 
                                    "notShow_verify": true, 
                                    "notShow_not_null": false, 
                                    "pid": "equipment_info", 
                                    "export": false, 
                                    "check": false, 
                                    "first_level_id": "excavator_info", 
                                    "module_id": "customer_info", 
                                    "children": [ ]
                                }, 
                                {
                                    "_id": {
                                        "$oid": "5fcee182a03c000052007d00"
                                    }, 
                                    "itemId": "ccmd.purchase_period_0g1amewf", 
                                    "id": "ccmd.purchase_period", 
                                    "module": "", 
                                    "first_level": "", 
                                    "second_level": "", 
                                    "column_name": "购买年限", 
                                    "create_update": false, 
                                    "verify": false, 
                                    "not_null": false, 
                                    "notShow_verify": true, 
                                    "notShow_not_null": false, 
                                    "pid": "equipment_info", 
                                    "export": false, 
                                    "check": false, 
                                    "first_level_id": "excavator_info", 
                                    "module_id": "customer_info", 
                                    "children": [ ]
                                }, 
                                {
                                    "_id": {
                                        "$oid": "5fcee198a03c000052007d01"
                                    }, 
                                    "itemId": "ccmd.device_img_qvixm2ku", 
                                    "id": "ccmd.device_img", 
                                    "module": "", 
                                    "first_level": "", 
                                    "second_level": "", 
                                    "column_name": "照片", 
                                    "create_update": false, 
                                    "verify": false, 
                                    "not_null": false, 
                                    "notShow_verify": true, 
                                    "notShow_not_null": false, 
                                    "pid": "equipment_info", 
                                    "export": false, 
                                    "check": false, 
                                    "first_level_id": "excavator_info", 
                                    "module_id": "customer_info", 
                                    "children": [ ]
                                }, 
                                {
                                    "_id": {
                                        "$oid": "5fcee1bba03c000052007d02"
                                    }, 
                                    "itemId": "ccmd.remark_x42qwfhk", 
                                    "id": "ccmd.remark", 
                                    "module": "", 
                                    "first_level": "", 
                                    "second_level": "", 
                                    "column_name": "备注", 
                                    "create_update": false, 
                                    "verify": false, 
                                    "not_null": false, 
                                    "notShow_verify": true, 
                                    "notShow_not_null": false, 
                                    "pid": "equipment_info", 
                                    "export": false, 
                                    "check": false, 
                                    "first_level_id": "excavator_info", 
                                    "module_id": "customer_info", 
                                    "children": [ ]
                                }, 
                                {
                                    "_id": {
                                        "$oid": "5fcee1d6a03c000052007d03"
                                    }, 
                                    "itemId": "ccmd.master_ke2oi1z5", 
                                    "id": "ccmd.master", 
                                    "module": "", 
                                    "first_level": "", 
                                    "second_level": "", 
                                    "column_name": "是否主品牌", 
                                    "create_update": false, 
                                    "verify": false, 
                                    "not_null": false, 
                                    "notShow_verify": true, 
                                    "notShow_not_null": false, 
                                    "pid": "equipment_info", 
                                    "export": false, 
                                    "check": false, 
                                    "first_level_id": "excavator_info", 
                                    "module_id": "customer_info", 
                                    "children": [ ]
                                }
                            ]
                        }, 
                        {
                            "_id": {
                                "$oid": "5fcdebb2f85d000004006f5d"
                            }, 
                            "itemId": "visit_record_6zltg50s", 
                            "id": "visit_record", 
                            "module": "", 
                            "first_level": "", 
                            "second_level": "拜访历史", 
                            "column_name": "", 
                            "create_update": false, 
                            "verify": false, 
                            "not_null": false, 
                            "notShow_verify": true, 
                            "notShow_not_null": true, 
                            "pid": "excavator_info", 
                            "export": false, 
                            "check": false, 
                            "first_level_id": "excavator_info", 
                            "module_id": "customer_info", 
                            "children": [ ]
                        }, 
                        {
                            "_id": {
                                "$oid": "5fcdebcff85d000004006f5e"
                            }, 
                            "itemId": "visit_info_4ntde4kg", 
                            "id": "visit_info", 
                            "module": "", 
                            "first_level": "", 
                            "second_level": "拜访信息", 
                            "column_name": "", 
                            "create_update": false, 
                            "verify": false, 
                            "not_null": false, 
                            "notShow_verify": true, 
                            "notShow_not_null": false, 
                            "pid": "excavator_info", 
                            "export": false, 
                            "check": false, 
                            "first_level_id": "excavator_info", 
                            "module_id": "customer_info", 
                            "children": [
                                {
                                    "_id": {
                                        "$oid": "5fcee2a8a03c000052007d04"
                                    }, 
                                    "itemId": "cvr.visit_num_ln0waa28", 
                                    "id": "cvr.visit_num", 
                                    "module": "", 
                                    "first_level": "", 
                                    "second_level": "", 
                                    "column_name": "拜访编号", 
                                    "create_update": false, 
                                    "verify": false, 
                                    "not_null": false, 
                                    "notShow_verify": true, 
                                    "notShow_not_null": true, 
                                    "pid": "visit_info", 
                                    "export": false, 
                                    "check": false, 
                                    "first_level_id": "excavator_info", 
                                    "module_id": "customer_info", 
                                    "children": [ ]
                                }, 
                                {
                                    "_id": {
                                        "$oid": "5fcee2bca03c000052007d05"
                                    }, 
                                    "itemId": "ccm.cus_name_b1jsww05", 
                                    "id": "ccm.cus_name", 
                                    "module": "", 
                                    "first_level": "", 
                                    "second_level": "", 
                                    "column_name": "客户名称", 
                                    "create_update": false, 
                                    "verify": false, 
                                    "not_null": false, 
                                    "notShow_verify": true, 
                                    "notShow_not_null": false, 
                                    "pid": "visit_info", 
                                    "export": false, 
                                    "check": false, 
                                    "first_level_id": "excavator_info", 
                                    "module_id": "customer_info", 
                                    "children": [ ]
                                }, 
                                {
                                    "_id": {
                                        "$oid": "5fcee32aa03c000052007d06"
                                    }, 
                                    "itemId": "cvr.cus_contacts_id_x5k2t6zu", 
                                    "id": "cvr.cus_contacts_id", 
                                    "module": "", 
                                    "first_level": "", 
                                    "second_level": "", 
                                    "column_name": "拜访联系人", 
                                    "create_update": false, 
                                    "verify": false, 
                                    "not_null": false, 
                                    "notShow_verify": true, 
                                    "notShow_not_null": false, 
                                    "pid": "visit_info", 
                                    "export": false, 
                                    "check": false, 
                                    "first_level_id": "excavator_info", 
                                    "module_id": "customer_info", 
                                    "children": [ ]
                                }, 
                                {
                                    "_id": {
                                        "$oid": "5fcee342a03c000052007d07"
                                    }, 
                                    "itemId": "cvr.visit_method_akb4nsvj", 
                                    "id": "cvr.visit_method", 
                                    "module": "", 
                                    "first_level": "", 
                                    "second_level": "", 
                                    "column_name": "拜访方式", 
                                    "create_update": false, 
                                    "verify": false, 
                                    "not_null": false, 
                                    "notShow_verify": true, 
                                    "notShow_not_null": false, 
                                    "pid": "visit_info", 
                                    "export": false, 
                                    "check": false, 
                                    "first_level_id": "excavator_info", 
                                    "module_id": "customer_info", 
                                    "children": [ ]
                                }, 
                                {
                                    "_id": {
                                        "$oid": "5fcee3bda03c000052007d08"
                                    }, 
                                    "itemId": "cvr.visit_time_i12xrc5e", 
                                    "id": "cvr.visit_time", 
                                    "module": "", 
                                    "first_level": "", 
                                    "second_level": "", 
                                    "column_name": "拜访时间", 
                                    "create_update": false, 
                                    "verify": false, 
                                    "not_null": false, 
                                    "notShow_verify": true, 
                                    "notShow_not_null": false, 
                                    "pid": "visit_info", 
                                    "export": false, 
                                    "check": false, 
                                    "first_level_id": "excavator_info", 
                                    "module_id": "customer_info", 
                                    "children": [ ]
                                }, 
                                {
                                    "_id": {
                                        "$oid": "5fcee3e0a03c000052007d09"
                                    }, 
                                    "itemId": "cvr.visit_topic_mq6en2fh", 
                                    "id": "cvr.visit_topic", 
                                    "module": "", 
                                    "first_level": "", 
                                    "second_level": "", 
                                    "column_name": "拜访主题", 
                                    "create_update": false, 
                                    "verify": false, 
                                    "not_null": false, 
                                    "notShow_verify": true, 
                                    "notShow_not_null": false, 
                                    "pid": "visit_info", 
                                    "export": false, 
                                    "check": false, 
                                    "first_level_id": "excavator_info", 
                                    "module_id": "customer_info", 
                                    "children": [ ]
                                }, 
                                {
                                    "_id": {
                                        "$oid": "5fcee410a03c000052007d0a"
                                    }, 
                                    "itemId": "cvr.visit_address_so7z0nam", 
                                    "id": "cvr.visit_address", 
                                    "module": "", 
                                    "first_level": "", 
                                    "second_level": "", 
                                    "column_name": "拜访省市", 
                                    "create_update": false, 
                                    "verify": false, 
                                    "not_null": false, 
                                    "notShow_verify": true, 
                                    "notShow_not_null": false, 
                                    "pid": "visit_info", 
                                    "export": false, 
                                    "check": false, 
                                    "first_level_id": "excavator_info", 
                                    "module_id": "customer_info", 
                                    "children": [ ]
                                }, 
                                {
                                    "_id": {
                                        "$oid": "5fcee43ea03c000052007d0b"
                                    }, 
                                    "itemId": "cvr.visit_detail_address_inzkw6ob", 
                                    "id": "cvr.visit_detail_address", 
                                    "module": "", 
                                    "first_level": "", 
                                    "second_level": "", 
                                    "column_name": "拜访详细地址", 
                                    "create_update": false, 
                                    "verify": false, 
                                    "not_null": false, 
                                    "notShow_verify": true, 
                                    "notShow_not_null": false, 
                                    "pid": "visit_info", 
                                    "export": false, 
                                    "check": false, 
                                    "first_level_id": "excavator_info", 
                                    "module_id": "customer_info", 
                                    "children": [ ]
                                }, 
                                {
                                    "_id": {
                                        "$oid": "5fcee468a03c000052007d0c"
                                    }, 
                                    "itemId": "cvr.brand_recognition_b8lovrf9", 
                                    "id": "cvr.brand_recognition", 
                                    "module": "", 
                                    "first_level": "", 
                                    "second_level": "", 
                                    "column_name": "品牌认可度", 
                                    "create_update": false, 
                                    "verify": false, 
                                    "not_null": false, 
                                    "notShow_verify": true, 
                                    "notShow_not_null": false, 
                                    "pid": "visit_info", 
                                    "export": false, 
                                    "check": false, 
                                    "first_level_id": "excavator_info", 
                                    "module_id": "customer_info", 
                                    "children": [ ]
                                }, 
                                {
                                    "_id": {
                                        "$oid": "5fcee47ea03c000052007d0d"
                                    }, 
                                    "itemId": "cvr.engineering_saturation_t8oesy4n", 
                                    "id": "cvr.engineering_saturation", 
                                    "module": "", 
                                    "first_level": "", 
                                    "second_level": "", 
                                    "column_name": "工程饱和度", 
                                    "create_update": false, 
                                    "verify": false, 
                                    "not_null": false, 
                                    "notShow_verify": true, 
                                    "notShow_not_null": false, 
                                    "pid": "visit_info", 
                                    "export": false, 
                                    "check": false, 
                                    "first_level_id": "excavator_info", 
                                    "module_id": "customer_info", 
                                    "children": [ ]
                                }, 
                                {
                                    "_id": {
                                        "$oid": "5fcee50da03c000052007d0e"
                                    }, 
                                    "itemId": "cvr.buy_demand_5o38ix14", 
                                    "id": "cvr.buy_demand", 
                                    "module": "", 
                                    "first_level": "", 
                                    "second_level": "", 
                                    "column_name": "购买需求", 
                                    "create_update": false, 
                                    "verify": false, 
                                    "not_null": false, 
                                    "notShow_verify": true, 
                                    "notShow_not_null": false, 
                                    "pid": "visit_info", 
                                    "export": false, 
                                    "check": false, 
                                    "first_level_id": "excavator_info", 
                                    "module_id": "customer_info", 
                                    "children": [ ]
                                }, 
                                {
                                    "_id": {
                                        "$oid": "5fcee553a03c000052007d0f"
                                    }, 
                                    "itemId": "cvr.buy_cycle_9p7c159h", 
                                    "id": "cvr.buy_cycle", 
                                    "module": "", 
                                    "first_level": "", 
                                    "second_level": "", 
                                    "column_name": "购买周期", 
                                    "create_update": false, 
                                    "verify": false, 
                                    "not_null": false, 
                                    "notShow_verify": true, 
                                    "notShow_not_null": false, 
                                    "pid": "visit_info", 
                                    "export": false, 
                                    "check": false, 
                                    "first_level_id": "excavator_info", 
                                    "module_id": "customer_info", 
                                    "children": [ ]
                                }, 
                                {
                                    "_id": {
                                        "$oid": "5fcee58ba03c000052007d10"
                                    }, 
                                    "itemId": "cvr.visit_summary_9qn6zuaa", 
                                    "id": "cvr.visit_summary", 
                                    "module": "", 
                                    "first_level": "", 
                                    "second_level": "", 
                                    "column_name": "拜访总结", 
                                    "create_update": false, 
                                    "verify": false, 
                                    "not_null": false, 
                                    "notShow_verify": true, 
                                    "notShow_not_null": false, 
                                    "pid": "visit_info", 
                                    "export": false, 
                                    "check": false, 
                                    "first_level_id": "excavator_info", 
                                    "module_id": "customer_info", 
                                    "children": [ ]
                                }, 
                                {
                                    "_id": {
                                        "$oid": "5fcee5b1a03c000052007d11"
                                    }, 
                                    "itemId": "cvr.visit_type_di658pfe", 
                                    "id": "cvr.visit_type", 
                                    "module": "", 
                                    "first_level": "", 
                                    "second_level": "", 
                                    "column_name": "拜访类型", 
                                    "create_update": false, 
                                    "verify": false, 
                                    "not_null": false, 
                                    "notShow_verify": true, 
                                    "notShow_not_null": false, 
                                    "pid": "visit_info", 
                                    "export": false, 
                                    "check": false, 
                                    "first_level_id": "excavator_info", 
                                    "module_id": "customer_info", 
                                    "children": [ ]
                                }
                            ]
                        }, 
                        {
                            "_id": {
                                "$oid": "5fcdec29f85d000004006f5f"
                            }, 
                            "itemId": "ccmbg.remark_eszzwswx", 
                            "id": "ccmbg.remark", 
                            "module": "", 
                            "first_level": "", 
                            "second_level": "备注", 
                            "column_name": "", 
                            "create_update": false, 
                            "verify": false, 
                            "not_null": false, 
                            "notShow_verify": true, 
                            "notShow_not_null": false, 
                            "pid": "excavator_info", 
                            "export": false, 
                            "check": false, 
                            "first_level_id": "excavator_info", 
                            "module_id": "customer_info", 
                            "children": [ ]
                        }
                    ]
                }, 
                {
                    "_id": {
                        "$oid": "5fcda4caf85d000004006f54"
                    }, 
                    "itemId": "crane_info_zw7aho9w", 
                    "id": "crane_info", 
                    "module": "", 
                    "first_level": "起重机业务组", 
                    "second_level": "", 
                    "column_name": "", 
                    "create_update": false, 
                    "verify": false, 
                    "not_null": false, 
                    "notShow_verify": false, 
                    "notShow_not_null": false, 
                    "pid": "customer_info", 
                    "export": false, 
                    "check": false, 
                    "first_level_id": "", 
                    "module_id": "customer_info", 
                    "children": [
                        {
                            "_id": {
                                "$oid": "5fcdec67f85d000004006f60"
                            }, 
                            "itemId": "contact_info_a2nocimy", 
                            "id": "contact_info", 
                            "module": "", 
                            "first_level": "", 
                            "second_level": "联系人信息", 
                            "column_name": "", 
                            "create_update": false, 
                            "verify": false, 
                            "not_null": false, 
                            "notShow_verify": false, 
                            "notShow_not_null": false, 
                            "pid": "crane_info", 
                            "export": false, 
                            "check": false, 
                            "first_level_id": "crane_info", 
                            "module_id": "customer_info", 
                            "children": [
                                {
                                    "_id": {
                                        "$oid": "5fceee43a03c000052007d13"
                                    }, 
                                    "itemId": "ccmc.name_f87jfznz", 
                                    "id": "ccmc.name", 
                                    "module": "", 
                                    "first_level": "", 
                                    "second_level": "", 
                                    "column_name": "联系人", 
                                    "create_update": false, 
                                    "verify": false, 
                                    "not_null": false, 
                                    "notShow_verify": false, 
                                    "notShow_not_null": false, 
                                    "pid": "contact_info", 
                                    "export": false, 
                                    "check": false, 
                                    "first_level_id": "crane_info", 
                                    "module_id": "customer_info", 
                                    "children": [ ]
                                }, 
                                {
                                    "_id": {
                                        "$oid": "5fceee5fa03c000052007d14"
                                    }, 
                                    "itemId": "ccmc.gender_0cirvjg6", 
                                    "id": "ccmc.gender", 
                                    "module": "", 
                                    "first_level": "", 
                                    "second_level": "", 
                                    "column_name": "联系人性别", 
                                    "create_update": false, 
                                    "verify": false, 
                                    "not_null": false, 
                                    "notShow_verify": true, 
                                    "notShow_not_null": false, 
                                    "pid": "contact_info", 
                                    "export": false, 
                                    "check": false, 
                                    "first_level_id": "crane_info", 
                                    "module_id": "customer_info", 
                                    "children": [ ]
                                }, 
                                {
                                    "_id": {
                                        "$oid": "5fceeec0a03c000052007d19"
                                    }, 
                                    "itemId": "ccmc.birthday_i9fejsiz", 
                                    "id": "ccmc.birthday", 
                                    "module": "", 
                                    "first_level": "", 
                                    "second_level": "", 
                                    "column_name": "联系人生日", 
                                    "create_update": false, 
                                    "verify": false, 
                                    "not_null": false, 
                                    "notShow_verify": true, 
                                    "notShow_not_null": false, 
                                    "pid": "contact_info", 
                                    "export": false, 
                                    "check": false, 
                                    "first_level_id": "crane_info", 
                                    "module_id": "customer_info", 
                                    "children": [ ]
                                }, 
                                {
                                    "_id": {
                                        "$oid": "5fceee98a03c000052007d17"
                                    }, 
                                    "itemId": "ccmc.mobile_bmurfv4r", 
                                    "id": "ccmc.mobile", 
                                    "module": "", 
                                    "first_level": "", 
                                    "second_level": "", 
                                    "column_name": "联系电话", 
                                    "create_update": false, 
                                    "verify": false, 
                                    "not_null": false, 
                                    "notShow_verify": false, 
                                    "notShow_not_null": false, 
                                    "pid": "contact_info", 
                                    "export": false, 
                                    "check": false, 
                                    "first_level_id": "crane_info", 
                                    "module_id": "customer_info", 
                                    "children": [ ]
                                }, 
                                {
                                    "_id": {
                                        "$oid": "5fceee71a03c000052007d15"
                                    }, 
                                    "itemId": "ccmc.master_p8zjsxcf", 
                                    "id": "ccmc.master", 
                                    "module": "", 
                                    "first_level": "", 
                                    "second_level": "", 
                                    "column_name": "是否主联系人", 
                                    "create_update": false, 
                                    "verify": false, 
                                    "not_null": false, 
                                    "notShow_verify": true, 
                                    "notShow_not_null": false, 
                                    "pid": "contact_info", 
                                    "export": false, 
                                    "check": false, 
                                    "first_level_id": "crane_info", 
                                    "module_id": "customer_info", 
                                    "children": [ ]
                                }, 
                                {
                                    "_id": {
                                        "$oid": "5fceee85a03c000052007d16"
                                    }, 
                                    "itemId": "ccmr.name_re3unvqe", 
                                    "id": "ccmr.name", 
                                    "module": "", 
                                    "first_level": "", 
                                    "second_level": "", 
                                    "column_name": "关系", 
                                    "create_update": false, 
                                    "verify": false, 
                                    "not_null": false, 
                                    "notShow_verify": true, 
                                    "notShow_not_null": false, 
                                    "pid": "contact_info", 
                                    "export": false, 
                                    "check": false, 
                                    "first_level_id": "crane_info", 
                                    "module_id": "customer_info", 
                                    "children": [ ]
                                }, 
                                {
                                    "_id": {
                                        "$oid": "5fceeeada03c000052007d18"
                                    }, 
                                    "itemId": "ccmc.remark_hfaqps84", 
                                    "id": "ccmc.remark", 
                                    "module": "", 
                                    "first_level": "", 
                                    "second_level": "", 
                                    "column_name": "备注", 
                                    "create_update": false, 
                                    "verify": false, 
                                    "not_null": false, 
                                    "notShow_verify": true, 
                                    "notShow_not_null": false, 
                                    "pid": "contact_info", 
                                    "export": false, 
                                    "check": false, 
                                    "first_level_id": "crane_info", 
                                    "module_id": "customer_info", 
                                    "children": [ ]
                                }
                            ]
                        }, 
                        {
                            "_id": {
                                "$oid": "5fcdecfdf85d000004006f61"
                            }, 
                            "itemId": "client_classification_3ob6lnnk", 
                            "id": "client_classification", 
                            "module": "", 
                            "first_level": "", 
                            "second_level": "客户分级", 
                            "column_name": "", 
                            "create_update": false, 
                            "verify": false, 
                            "not_null": false, 
                            "notShow_verify": true, 
                            "notShow_not_null": false, 
                            "pid": "crane_info", 
                            "export": false, 
                            "check": false, 
                            "first_level_id": "crane_info", 
                            "module_id": "customer_info", 
                            "children": [
                                {
                                    "_id": {
                                        "$oid": "5fcef15da03c000052007d1a"
                                    }, 
                                    "itemId": "ccmg.cus_classfy_id_7zlp6qba", 
                                    "id": "ccmg.cus_classfy_id", 
                                    "module": "", 
                                    "first_level": "", 
                                    "second_level": "", 
                                    "column_name": "客户分类", 
                                    "create_update": false, 
                                    "verify": false, 
                                    "not_null": false, 
                                    "notShow_verify": true, 
                                    "notShow_not_null": false, 
                                    "pid": "client_classification", 
                                    "export": false, 
                                    "check": false, 
                                    "first_level_id": "crane_info", 
                                    "module_id": "customer_info", 
                                    "children": [ ]
                                }, 
                                {
                                    "_id": {
                                        "$oid": "5fcef16fa03c000052007d1b"
                                    }, 
                                    "itemId": "ccmg.cus_device_level_id_6farjogn", 
                                    "id": "ccmg.cus_device_level_id", 
                                    "module": "", 
                                    "first_level": "", 
                                    "second_level": "", 
                                    "column_name": "持有设备级别", 
                                    "create_update": false, 
                                    "verify": false, 
                                    "not_null": false, 
                                    "notShow_verify": true, 
                                    "notShow_not_null": false, 
                                    "pid": "client_classification", 
                                    "export": false, 
                                    "check": false, 
                                    "first_level_id": "crane_info", 
                                    "module_id": "customer_info", 
                                    "children": [ ]
                                }
                            ]
                        }, 
                        {
                            "_id": {
                                "$oid": "5fcded16f85d000004006f62"
                            }, 
                            "itemId": "equipment_info_raftzat6", 
                            "id": "equipment_info", 
                            "module": "", 
                            "first_level": "", 
                            "second_level": "名下设备", 
                            "column_name": "", 
                            "create_update": false, 
                            "verify": false, 
                            "not_null": false, 
                            "notShow_verify": true, 
                            "notShow_not_null": false, 
                            "pid": "crane_info", 
                            "export": false, 
                            "check": false, 
                            "first_level_id": "crane_info", 
                            "module_id": "customer_info", 
                            "children": [
                                {
                                    "_id": {
                                        "$oid": "5fcef19fa03c000052007d1c"
                                    }, 
                                    "itemId": "ccmb.name_d7zy03cq", 
                                    "id": "ccmb.name", 
                                    "module": "", 
                                    "first_level": "", 
                                    "second_level": "", 
                                    "column_name": "品牌", 
                                    "create_update": false, 
                                    "verify": false, 
                                    "not_null": false, 
                                    "notShow_verify": true, 
                                    "notShow_not_null": false, 
                                    "pid": "equipment_info", 
                                    "export": false, 
                                    "check": false, 
                                    "first_level_id": "crane_info", 
                                    "module_id": "customer_info", 
                                    "children": [ ]
                                }, 
                                {
                                    "_id": {
                                        "$oid": "5fcef1b2a03c000052007d1d"
                                    }, 
                                    "itemId": "ccmd.model_u1e9qmkx", 
                                    "id": "ccmd.model", 
                                    "module": "", 
                                    "first_level": "", 
                                    "second_level": "", 
                                    "column_name": "型号", 
                                    "create_update": false, 
                                    "verify": false, 
                                    "not_null": false, 
                                    "notShow_verify": true, 
                                    "notShow_not_null": false, 
                                    "pid": "equipment_info", 
                                    "export": false, 
                                    "check": false, 
                                    "first_level_id": "crane_info", 
                                    "module_id": "customer_info", 
                                    "children": [ ]
                                }, 
                                {
                                    "_id": {
                                        "$oid": "5fcef1c5a03c000052007d1e"
                                    }, 
                                    "itemId": "ccmd.number_q0abwdia", 
                                    "id": "ccmd.number", 
                                    "module": "", 
                                    "first_level": "", 
                                    "second_level": "", 
                                    "column_name": "数量", 
                                    "create_update": false, 
                                    "verify": false, 
                                    "not_null": false, 
                                    "notShow_verify": true, 
                                    "notShow_not_null": false, 
                                    "pid": "equipment_info", 
                                    "export": false, 
                                    "check": false, 
                                    "first_level_id": "crane_info", 
                                    "module_id": "customer_info", 
                                    "children": [ ]
                                }, 
                                {
                                    "_id": {
                                        "$oid": "5fcef1e6a03c000052007d1f"
                                    }, 
                                    "itemId": "ccmd.purchase_period_0g3amewf", 
                                    "id": "ccmd.purchase_period", 
                                    "module": "", 
                                    "first_level": "", 
                                    "second_level": "", 
                                    "column_name": "购买年限", 
                                    "create_update": false, 
                                    "verify": false, 
                                    "not_null": false, 
                                    "notShow_verify": true, 
                                    "notShow_not_null": false, 
                                    "pid": "equipment_info", 
                                    "export": false, 
                                    "check": false, 
                                    "first_level_id": "crane_info", 
                                    "module_id": "customer_info", 
                                    "children": [ ]
                                }, 
                                {
                                    "_id": {
                                        "$oid": "5fcef1f7a03c000052007d20"
                                    }, 
                                    "itemId": "ccmd.device_img_qvixm1ku", 
                                    "id": "ccmd.device_img", 
                                    "module": "", 
                                    "first_level": "", 
                                    "second_level": "", 
                                    "column_name": "照片", 
                                    "create_update": false, 
                                    "verify": false, 
                                    "not_null": false, 
                                    "notShow_verify": true, 
                                    "notShow_not_null": false, 
                                    "pid": "equipment_info", 
                                    "export": false, 
                                    "check": false, 
                                    "first_level_id": "crane_info", 
                                    "module_id": "customer_info", 
                                    "children": [ ]
                                }, 
                                {
                                    "_id": {
                                        "$oid": "5fcef216a03c000052007d21"
                                    }, 
                                    "itemId": "ccmd.remark_x24qwfhk", 
                                    "id": "ccmd.remark", 
                                    "module": "", 
                                    "first_level": "", 
                                    "second_level": "", 
                                    "column_name": "备注", 
                                    "create_update": false, 
                                    "verify": false, 
                                    "not_null": false, 
                                    "notShow_verify": true, 
                                    "notShow_not_null": false, 
                                    "pid": "equipment_info", 
                                    "export": false, 
                                    "check": false, 
                                    "first_level_id": "crane_info", 
                                    "module_id": "customer_info", 
                                    "children": [ ]
                                }, 
                                {
                                    "_id": {
                                        "$oid": "5fcef225a03c000052007d22"
                                    }, 
                                    "itemId": "ccmd.master_ke2oi1z1", 
                                    "id": "ccmd.master", 
                                    "module": "", 
                                    "first_level": "", 
                                    "second_level": "", 
                                    "column_name": "是否主品牌", 
                                    "create_update": false, 
                                    "verify": false, 
                                    "not_null": false, 
                                    "notShow_verify": true, 
                                    "notShow_not_null": false, 
                                    "pid": "equipment_info", 
                                    "export": false, 
                                    "check": false, 
                                    "first_level_id": "crane_info", 
                                    "module_id": "customer_info", 
                                    "children": [ ]
                                }
                            ]
                        }, 
                        {
                            "_id": {
                                "$oid": "5fcded44f85d000004006f63"
                            }, 
                            "itemId": "visit_record_6zltg40s", 
                            "id": "visit_record", 
                            "module": "", 
                            "first_level": "", 
                            "second_level": "拜访历史", 
                            "column_name": "", 
                            "create_update": false, 
                            "verify": false, 
                            "not_null": false, 
                            "notShow_verify": true, 
                            "notShow_not_null": true, 
                            "pid": "crane_info", 
                            "export": false, 
                            "check": false, 
                            "first_level_id": "crane_info", 
                            "module_id": "customer_info", 
                            "children": [ ]
                        }, 
                        {
                            "_id": {
                                "$oid": "5fcded72f85d000004006f64"
                            }, 
                            "itemId": "visit_info_4ntde7kg", 
                            "id": "visit_info", 
                            "module": "", 
                            "first_level": "", 
                            "second_level": "拜访信息", 
                            "column_name": "", 
                            "create_update": false, 
                            "verify": false, 
                            "not_null": false, 
                            "notShow_verify": true, 
                            "notShow_not_null": false, 
                            "pid": "crane_info", 
                            "export": false, 
                            "check": false, 
                            "first_level_id": "crane_info", 
                            "module_id": "customer_info", 
                            "children": [
                                {
                                    "_id": {
                                        "$oid": "5fcef27fa03c000052007d23"
                                    }, 
                                    "itemId": "cvr.visit_num_v88yjmxb", 
                                    "id": "cvr.visit_num", 
                                    "module": "", 
                                    "first_level": "", 
                                    "second_level": "", 
                                    "column_name": "拜访编号", 
                                    "create_update": false, 
                                    "verify": false, 
                                    "not_null": false, 
                                    "notShow_verify": true, 
                                    "notShow_not_null": true, 
                                    "pid": "visit_info", 
                                    "export": false, 
                                    "check": false, 
                                    "first_level_id": "crane_info", 
                                    "module_id": "customer_info", 
                                    "children": [ ]
                                }, 
                                {
                                    "_id": {
                                        "$oid": "5fcef294a03c000052007d24"
                                    }, 
                                    "itemId": "ccm.cus_name_q8u4w985", 
                                    "id": "ccm.cus_name", 
                                    "module": "", 
                                    "first_level": "", 
                                    "second_level": "", 
                                    "column_name": "客户名称", 
                                    "create_update": false, 
                                    "verify": false, 
                                    "not_null": false, 
                                    "notShow_verify": true, 
                                    "notShow_not_null": false, 
                                    "pid": "visit_info", 
                                    "export": false, 
                                    "check": false, 
                                    "first_level_id": "crane_info", 
                                    "module_id": "customer_info", 
                                    "children": [ ]
                                }, 
                                {
                                    "_id": {
                                        "$oid": "5fcef2eaa03c000052007d25"
                                    }, 
                                    "itemId": "cvr.cus_contacts_id_4m6yho3s", 
                                    "id": "cvr.cus_contacts_id", 
                                    "module": "", 
                                    "first_level": "", 
                                    "second_level": "", 
                                    "column_name": "拜访联系人", 
                                    "create_update": false, 
                                    "verify": false, 
                                    "not_null": false, 
                                    "notShow_verify": true, 
                                    "notShow_not_null": false, 
                                    "pid": "visit_info", 
                                    "export": false, 
                                    "check": false, 
                                    "first_level_id": "crane_info", 
                                    "module_id": "customer_info", 
                                    "children": [ ]
                                }, 
                                {
                                    "_id": {
                                        "$oid": "5fcef322a03c000052007d26"
                                    }, 
                                    "itemId": "cvr.visit_method_pqee4t4z", 
                                    "id": "cvr.visit_method", 
                                    "module": "", 
                                    "first_level": "", 
                                    "second_level": "", 
                                    "column_name": "拜访方式", 
                                    "create_update": false, 
                                    "verify": false, 
                                    "not_null": false, 
                                    "notShow_verify": true, 
                                    "notShow_not_null": false, 
                                    "pid": "visit_info", 
                                    "export": false, 
                                    "check": false, 
                                    "first_level_id": "crane_info", 
                                    "module_id": "customer_info", 
                                    "children": [ ]
                                }, 
                                {
                                    "_id": {
                                        "$oid": "5fcef36ea03c000052007d27"
                                    }, 
                                    "itemId": "cvr.visit_time_dxog68mk", 
                                    "id": "cvr.visit_time", 
                                    "module": "", 
                                    "first_level": "", 
                                    "second_level": "", 
                                    "column_name": "拜访时间", 
                                    "create_update": false, 
                                    "verify": false, 
                                    "not_null": false, 
                                    "notShow_verify": true, 
                                    "notShow_not_null": false, 
                                    "pid": "visit_info", 
                                    "export": false, 
                                    "check": false, 
                                    "first_level_id": "crane_info", 
                                    "module_id": "customer_info", 
                                    "children": [ ]
                                }, 
                                {
                                    "_id": {
                                        "$oid": "5fcef37ca03c000052007d28"
                                    }, 
                                    "itemId": "cvr.visit_topic_qsh0c8lr", 
                                    "id": "cvr.visit_topic", 
                                    "module": "", 
                                    "first_level": "", 
                                    "second_level": "", 
                                    "column_name": "拜访主题", 
                                    "create_update": false, 
                                    "verify": false, 
                                    "not_null": false, 
                                    "notShow_verify": true, 
                                    "notShow_not_null": false, 
                                    "pid": "visit_info", 
                                    "export": false, 
                                    "check": false, 
                                    "first_level_id": "crane_info", 
                                    "module_id": "customer_info", 
                                    "children": [ ]
                                }, 
                                {
                                    "_id": {
                                        "$oid": "5fcef3aaa03c000052007d29"
                                    }, 
                                    "itemId": "cvr.visit_address_cayc6pxo", 
                                    "id": "cvr.visit_address", 
                                    "module": "", 
                                    "first_level": "", 
                                    "second_level": "", 
                                    "column_name": "拜访省市", 
                                    "create_update": false, 
                                    "verify": false, 
                                    "not_null": false, 
                                    "notShow_verify": true, 
                                    "notShow_not_null": false, 
                                    "pid": "visit_info", 
                                    "export": false, 
                                    "check": false, 
                                    "first_level_id": "crane_info", 
                                    "module_id": "customer_info", 
                                    "children": [ ]
                                }, 
                                {
                                    "_id": {
                                        "$oid": "5fcef3f9a03c000052007d2a"
                                    }, 
                                    "itemId": "cvr.visit_detail_address_pvbla923", 
                                    "id": "cvr.visit_detail_address", 
                                    "module": "", 
                                    "first_level": "", 
                                    "second_level": "", 
                                    "column_name": "拜访详细地址", 
                                    "create_update": false, 
                                    "verify": false, 
                                    "not_null": false, 
                                    "notShow_verify": true, 
                                    "notShow_not_null": false, 
                                    "pid": "visit_info", 
                                    "export": false, 
                                    "check": false, 
                                    "first_level_id": "crane_info", 
                                    "module_id": "customer_info", 
                                    "children": [ ]
                                }, 
                                {
                                    "_id": {
                                        "$oid": "5fcef408a03c000052007d2b"
                                    }, 
                                    "itemId": "cvr.brand_recognition_85a8lys6", 
                                    "id": "cvr.brand_recognition", 
                                    "module": "", 
                                    "first_level": "", 
                                    "second_level": "", 
                                    "column_name": "品牌认可度", 
                                    "create_update": false, 
                                    "verify": false, 
                                    "not_null": false, 
                                    "notShow_verify": true, 
                                    "notShow_not_null": false, 
                                    "pid": "visit_info", 
                                    "export": false, 
                                    "check": false, 
                                    "first_level_id": "crane_info", 
                                    "module_id": "customer_info", 
                                    "children": [ ]
                                }, 
                                {
                                    "_id": {
                                        "$oid": "5fcef41ba03c000052007d2c"
                                    }, 
                                    "itemId": "cvr.engineering_saturation_8zdq3z7j", 
                                    "id": "cvr.engineering_saturation", 
                                    "module": "", 
                                    "first_level": "", 
                                    "second_level": "", 
                                    "column_name": "工程饱和度", 
                                    "create_update": false, 
                                    "verify": false, 
                                    "not_null": false, 
                                    "notShow_verify": true, 
                                    "notShow_not_null": false, 
                                    "pid": "visit_info", 
                                    "export": false, 
                                    "check": false, 
                                    "first_level_id": "crane_info", 
                                    "module_id": "customer_info", 
                                    "children": [ ]
                                }, 
                                {
                                    "_id": {
                                        "$oid": "5fcef47fa03c000052007d2d"
                                    }, 
                                    "itemId": "cvr.buy_demand_xzs2zrtb", 
                                    "id": "cvr.buy_demand", 
                                    "module": "", 
                                    "first_level": "", 
                                    "second_level": "", 
                                    "column_name": "购买需求", 
                                    "create_update": false, 
                                    "verify": false, 
                                    "not_null": false, 
                                    "notShow_verify": true, 
                                    "notShow_not_null": false, 
                                    "pid": "visit_info", 
                                    "export": false, 
                                    "check": false, 
                                    "first_level_id": "crane_info", 
                                    "module_id": "customer_info", 
                                    "children": [ ]
                                }, 
                                {
                                    "_id": {
                                        "$oid": "5fcef526a03c000052007d2e"
                                    }, 
                                    "itemId": "cvr.buy_cycle_96q1s6un", 
                                    "id": "cvr.buy_cycle", 
                                    "module": "", 
                                    "first_level": "", 
                                    "second_level": "", 
                                    "column_name": "购买周期", 
                                    "create_update": false, 
                                    "verify": false, 
                                    "not_null": false, 
                                    "notShow_verify": true, 
                                    "notShow_not_null": false, 
                                    "pid": "visit_info", 
                                    "export": false, 
                                    "check": false, 
                                    "first_level_id": "crane_info", 
                                    "module_id": "customer_info", 
                                    "children": [ ]
                                }, 
                                {
                                    "_id": {
                                        "$oid": "5fcef534a03c000052007d2f"
                                    }, 
                                    "itemId": "cvr.visit_summary_v1ff38jb", 
                                    "id": "cvr.visit_summary", 
                                    "module": "", 
                                    "first_level": "", 
                                    "second_level": "", 
                                    "column_name": "拜访总结", 
                                    "create_update": false, 
                                    "verify": false, 
                                    "not_null": false, 
                                    "notShow_verify": true, 
                                    "notShow_not_null": false, 
                                    "pid": "visit_info", 
                                    "export": false, 
                                    "check": false, 
                                    "first_level_id": "crane_info", 
                                    "module_id": "customer_info", 
                                    "children": [ ]
                                }, 
                                {
                                    "_id": {
                                        "$oid": "5fcef545a03c000052007d30"
                                    }, 
                                    "itemId": "cvr.visit_type_bdkq7w3g", 
                                    "id": "cvr.visit_type", 
                                    "module": "", 
                                    "first_level": "", 
                                    "second_level": "", 
                                    "column_name": "拜访类型", 
                                    "create_update": false, 
                                    "verify": false, 
                                    "not_null": false, 
                                    "notShow_verify": true, 
                                    "notShow_not_null": false, 
                                    "pid": "visit_info", 
                                    "export": false, 
                                    "check": false, 
                                    "first_level_id": "crane_info", 
                                    "module_id": "customer_info", 
                                    "children": [ ]
                                }
                            ]
                        }, 
                        {
                            "_id": {
                                "$oid": "5fcded87f85d000004006f65"
                            }, 
                            "itemId": "ccmbg.remark_eszzwewx", 
                            "id": "ccmbg.remark", 
                            "module": "", 
                            "first_level": "", 
                            "second_level": "备注", 
                            "column_name": "", 
                            "create_update": false, 
                            "verify": false, 
                            "not_null": false, 
                            "notShow_verify": true, 
                            "notShow_not_null": false, 
                            "pid": "crane_info", 
                            "export": false, 
                            "check": false, 
                            "first_level_id": "crane_info", 
                            "module_id": "customer_info", 
                            "children": [ ]
                        }
                    ]
                }, 
                {
                    "_id": {
                        "$oid": "5fcda4ecf85d000004006f55"
                    }, 
                    "itemId": "client_authorization_info_gsj3i22p", 
                    "id": "client_authorization_info", 
                    "module": "", 
                    "first_level": "客户权限信息", 
                    "second_level": "", 
                    "column_name": "", 
                    "create_update": false, 
                    "verify": false, 
                    "not_null": false, 
                    "notShow_verify": false, 
                    "notShow_not_null": false, 
                    "pid": "customer_info", 
                    "export": false, 
                    "check": false, 
                    "first_level_id": "", 
                    "module_id": "customer_info", 
                    "children": [ ]
                }
            ]
        }
    ],

      ruleForm: {
        name: "",
        status: -1,
        remark: "",
      },
      rules: {
        name: [{ required: true, message: "请输入角色名称", trigger: "blur" }],
        status: [
          { required: true, validator: validateStatus, trigger: "change" },
        ],
      },
      paramsForm: {
        params: [],
        paramsRules: {
          organ: [
            {
              required: true,
              message: "请至少选择一个上层组织",
              trigger: "change",
            },
          ],
          job: [{ required: true, message: "请选择职务", trigger: "change" }],
        },
      },
      jobObj: {
        id: "",
        num: "",
        organ1: "",
        organ2: "",
        organ3: "",
        organ4: "",
        dpart1: "",
        dpart2: "",
        dpart3: "",
        organ1List: [],
        organ2List: [],
        organ3List: [],
        organ4List: [],
        dpart1List: [],
        dpart2List: [],
        dpart3List: [],
        job_id: "",
        jobList: [],
        post_number: "",
        status_word: "",
      },
      paramsForm2: {
        params: [],
        paramsRules: {
          dataC: [
            {
              required: true,
              message: "请选择数据范围",
              trigger: "change",
            },
          ],
          organ: [
            {
              required: true,
              message: "请至少选择一个上层组织",
              trigger: "change",
            },
          ],
          dpart: [
            {
              required: true,
              message: "请至少选择一个上层部门",
              trigger: "change",
            },
          ],
          job: [{ required: true, message: "请选择职务", trigger: "change" }],
          user_id: [
            { required: true, message: "请选择职位(用户)", trigger: "change" },
          ],
          organNot: [],
          dpartNot: [],
          jobNot: [],
          user_idNot: [],
        },
      },
      authObj: {
        id: "",
        num: "",
        type: "",
        organ1: "",
        organ2: "",
        organ3: "",
        organ4: "",
        dpart1: "",
        dpart2: "",
        dpart3: "",
        organ1List: [],
        organ2List: [],
        organ3List: [],
        organ4List: [],
        dpart1List: [],
        dpart2List: [],
        dpart3List: [],
        job_id: "",
        jobList: [],
        user_id: "",
        user_user_id: "",
        userList: [],
      },

      organ1List: [],
      jobList: [], //todo , 这个应该是选择上层组织或部门后
      id: "",
      token: "",
      change: false,

      obj: {},
      flag: false,
      objList: [],

      fromName: '',
      menuObj: {},

    };
  },
  created() {
    try {
      let menuData = JSON.parse(getStorage("menuData") || {});
      let menuObj;
      menuData.some((item) => {
        if (item.id === "role_management") {
          this.menuObj = item;
          return true;
        }
      });

    } catch (e) {
      console.log(e);
    }
  },
  async mounted() {
  
 

    this.token = getStorage("token") || "";

    try {


      this.change = JSON.parse(getStorage("roleChange") || false);


     
        this.tableData2 = roleList2(this.tableData2);  
  

  
    } catch (e) {
      console.log(e);
    }
  },
  methods: {
    
    handleUserChange(id, row, prop) {
      if (row.hasOwnProperty("user_id")) {
        if (id !== "") {
          this.$refs.rForm2.clearValidate(prop);
        }
      }

      let user_user_id;
      row.userList.some((item) => {
        if (id === item.id) {
          user_user_id = item.user_id;
          return true;
        } else {
          return false;
        }
      });
      row.user_user_id = user_user_id;
    },
    submitForm(formName) {
      Promise.all([
        this.submit("ruleForm"),
        this.submit("rForm"),
        this.submit("rForm2"),
      ])
        .then(async (res) => {
          // this.$refs[formName].validate((valid) => {
          // if(valid){

          try {
            const res = await this.addOrUpdateRole({
              id: this.id || "",
              role_number: "J",
              name: this.ruleForm.name,
              status: this.ruleForm.status,
              remark: this.ruleForm.remark,

              post_id: this.paramsForm.params.map((item) => {
                return {
                  post_id: item.job_id,
                  department_second_id: item.dpart1,
                  department_third_id: item.dpart2,
                  department_fourth_id: item.dpart3,
                  organization_first_id: item.organ1,
                  organization_second_id: item.organ2,
                  organization_third_id: item.organ3,
                  organization_fourth_id: item.organ4,
                };
              }),
              operation_auth: sendRoleList1(this.tableData),
              authorization_rule: this.paramsForm2.params.map((item) => {
                return {
                  type: item.type,
                  user_id: item.user_user_id,
                  post_id: item.job_id,
                  department_id: "",
                  organization_id: "",
                  department_second_id: item.dpart1,
                  department_third_id: item.dpart2,
                  department_fourth_id: item.dpart3,
                  organization_first_id: item.organ1,
                  organization_second_id: item.organ2,
                  organization_third_id: item.organ3,
                  organization_fourth_id: item.organ4,
                  selected_post_id: item.user_id, //这个用的是职位id ，跟用户id不同， 获取列表中id是职位id， user_id是用户id,暂时可以先不改，或以user_user_id当作用户id
                  selected_job_id: item.job_id,
                  post_name: this.getPostname(item.jobList, item.job_id),
                  user_name: this.getUsername(item.userList, item.user_id),
                };
              }),
              customer_data_authorization: sendRoleList2(this.tableData2),
            });

            msg({
              type:'success',
              message: res.msg,
            });
            if (this.change) {
              this.$store.commit("SETNEEDCLEARCHANGE", true);
              this.SETROLEID(this.id)
                if(this.fromName.indexOf('Detail')>-1){
                    this.$store.commit("SET_VISTUAL_POP", "");
                    this.$router.go(-1)  
                }else{
                    this.$router.replace({
                      name: "roleDetail",
                    });
                }
            } else {
              this.$store.commit("SETNEEDCLEARADD", true);
              this.SETROLEID(res.data.id)           
                this.$router.replace({
                  name: "roleDetail",
                
                });
            }
            
            
          } catch (e) {
            console.log(e);
          }
        })
        .catch((e) => {
          console.log(e);
          msg({
            type: 'error',
            message: "当前还有选项没有填写或填写格式错误，请确保完成!",
          });
        });
    },
    submit(formName) {
      return new Promise((resolve, reject) => {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            resolve();
          } else {
            reject();
            return false;
          }
        });
      });
    },
    resetForm(formName) {
      // this.$refs[formName].resetFields();
      this.$router.go(-1);
    },
    getPostname(postList, post_id) {
      if (!postList || !post_id) return "";

      let name = "";

      postList.some((item) => {
        if (item.id === post_id) {
          name = item.name;
          return true;
        }
      });

      return name;
    },
    getUsername(userList, user_id) {
      if (!userList || !user_id) return "";
      let name = "";

      userList.some((item) => {
        if (item.id === user_id) {
          name = item.user_name_ch;
          return true;
        }
      });

      return name;
    },
    handleJobDel(row) {},
    handleDataDel(row) {},
    handleAddItem() {
      this.paramsForm.params.push(cloneDeep(this.jobObj));
    },
    handleAddItem2() {
      this.paramsForm2.params.push(cloneDeep(this.authObj));
    },
    async handleO1Change(id, row, prop) {
      if (row.hasOwnProperty("user_id")) {
        if (id !== "") {
          this.$refs.rForm2.clearValidate(prop);
        }
      }

      row.organ2List = [];
      row.organ2 = "";
      row.organ3List = [];
      row.organ3 = "";
      row.organ4List = [];
      row.organ4 = "";
      row.dpart1List = [];
      row.dpart1 = "";
      row.dpart2List = [];
      row.dpart2 = "";
      row.dpart3List = [];
      row.dpart3 = "";
      row.jobList = [];
      row.job_id = "";
      row.userList = [];
      row.user_id = "";

      try {
        const res = await this.getOrganList(row.organ1, "2");
        row.organ2List = res.data;

        const res2 = await this.getDpartList(id, "", "1");
        row.dpart1List = res2.data;

        const res3 = await this.getJobList(id, "");
        row.jobList = res3.data;
        //todo
        // if(row.jobList.length===0){
        //    //输出当前上层组织/上层部门没有职务，请继续选择 ，或前往职务管理新增职务
        // }
      } catch (e) {
        console.log(e);
      }
    },

    async handleO2Change(id, row) {
      row.organ3List = [];
      row.organ3 = "";
      row.organ4List = [];
      row.organ4 = "";
      row.dpart1List = [];
      row.dpart1 = "";
      row.dpart2List = [];
      row.dpart2 = "";
      row.dpart3List = [];
      row.dpart3 = "";
      row.jobList = [];
      row.job_id = "";
      row.userList = [];
      row.user_id = "";

      try {
        if (row.organ2 !== "") {
          const res = await this.getOrganList(row.organ2, "3");
          row.organ3List = res.data;

          const res2 = await this.getDpartList(id, "", "1");
          row.dpart1List = res2.data;

          const res3 = await this.getJobList(id, "");
          row.jobList = res3.data;
        } else {
          //如果是清空的话需要以上一个id获取

          const res2 = await this.getDpartList(row.organ1, "", "1");
          row.dpart1List = res2.data;

          const res3 = await this.getJobList(row.organ1, "");
          row.jobList = res3.data;
        }
      } catch (e) {
        console.log(e);
      }
    },
    async handleO3Change(id, row) {
      row.organ4List = [];
      row.organ4 = "";
      row.dpart1List = [];
      row.dpart1 = "";
      row.dpart2List = [];
      row.dpart2 = "";
      row.dpart3List = [];
      row.dpart3 = "";
      row.jobList = [];
      row.job_id = "";
      row.userList = [];
      row.user_id = "";

      try {
        if (row.organ3 !== "") {
          const res = await this.getOrganList(row.organ3, "4");
          row.organ4List = res.data;
          // this.organ4 = "";

          const res2 = await this.getDpartList(id, "", "1");
          row.dpart1List = res2.data;

          const res3 = await this.getJobList(id, "");
          row.jobList = res3.data;
        } else {
          //如果是清空的话需要以上一个id获取

          const res2 = await this.getDpartList(row.organ2, "", "1");
          row.dpart1List = res2.data;

          const res3 = await this.getJobList(row.organ2, "");
          row.jobList = res3.data;
        }
      } catch (e) {
        console.log(e);
      }
    },
    async handleO4Change(id, row) {
      row.dpart1List = [];
      row.dpart1 = "";
      row.dpart2List = [];
      row.dpart2 = "";
      row.dpart3List = [];
      row.dpart3 = "";
      row.jobList = [];
      row.job_id = "";
      row.userList = [];
      row.user_id = "";

      // if (this.organ4 === "") {
      //   console.log("clear");

      //   this.dpart1List = [];

      //   this.dpart1 = "";
      //   return;
      // }

      try {
        if (row.organ4 !== "") {
          const res = await this.getDpartList(id, "", "1");
          row.dpart1List = res.data;

          const res3 = await this.getJobList(id, "");
          row.jobList = res3.data;
        } else {
          const res2 = await this.getDpartList(row.organ3, "", "1");
          row.dpart1List = res2.data;

          const res3 = await this.getJobList(row.organ3, "");
          row.jobList = res3.data;
        }
      } catch (e) {
        console.log(e);
      }
    },
    async handleD1Change(id, row, prop) {
      console.log(id);
      if (row.hasOwnProperty("user_id")) {
        if (id !== "") {
          this.$refs.rForm2.clearValidate(prop);
        }
      }

      row.dpart2List = [];
      row.dpart2 = "";
      row.dpart3List = [];
      row.dpart3 = "";
      row.jobList = [];
      row.job_id = "";
      row.userList = [];
      row.user_id = "";

      let organ_id = row.organ4 || row.organ3 || row.organ2 || row.organ1;
      // console.log(organ_id)
      try {
        if (row.dpart1 !== "") {
          const res = await this.getDpartList(organ_id, row.dpart1, "2");
          row.dpart2List = res.data;

          const res3 = await this.getJobList("", id);
          row.jobList = res3.data;
        } else {
          const res3 = await this.getJobList(organ_id, "");
          row.jobList = res3.data;
        }
      } catch (e) {
        console.log(e);
      }
    },
    async handleD2Change(id, row) {
      row.dpart3List = [];
      row.dpart3 = "";
      row.jobList = [];
      row.job_id = "";
      row.userList = [];
      row.user_id = "";

      try {
        if (row.dpart2 !== "") {
          let organ_id = row.organ4 || row.organ3 || row.organ2 || row.organ1;
          const res = await this.getDpartList(organ_id, row.dpart2, "3");
          row.dpart3List = res.data;

          const res3 = await this.getJobList("", id);
          row.jobList = res3.data;
        } else {
          const res3 = await this.getJobList("", row.dpart1);
          row.jobList = res3.data;
        }
      } catch (e) {
        console.log(e);
      }
    },
    async handleD3Change(id, row) {
      row.jobList = [];
      row.job_id = "";
      row.userList = [];
      row.user_id = "";
      try {
        if (row.dpart3 !== "") {
          const res3 = await this.getJobList("", id);
          row.jobList = res3.data;
        } else {
          const res3 = await this.getJobList("", row.dpart2);
          row.jobList = res3.data;
        }
      } catch (e) {
        console.log(e);
      }
    },
    async handleJobChange(id, row) {
      try {
        if (row.job_id !== "") {
          const res = await this.getPostDetail({
            id,
            role_page: "",
            role_page_size: "1",
            staff_page: "",
            staff_page_size: "1",
          });
          let obj = res.data.base_data;
          if (row.hasOwnProperty("post_number")) {
            row.post_number = obj.post_number;
          }

          if (row.hasOwnProperty("status_word")) {
            row.status_word = obj.status === 1 ? "启用" : "禁用";
          }
        } else {
          if (row.hasOwnProperty("post_number")) row.post_number = "";
          if (row.hasOwnProperty("status_word")) row.status_word = "";
        }
      } catch (e) {
        console.log(e);
      }
    },
    async handleJobChange2(id, row, prop) {
      row.userList = [];
      row.user_id = "";
      row.user_user_id = "";

      if (row.hasOwnProperty("user_id")) {
        if (id !== "") {
          this.$refs.rForm2.clearValidate(prop);
        }
      }

      try {
        if (row.job_id !== "") {
          const res = await this.getUserJobList({
            post_id: row.job_id,
          });
          row.userList = res.data;
        } else {
          row.userList = [];
          row.user_id = "";
          row.user_user_id = "";
        }
      } catch (e) {
        console.log(e);
      }
    },

    handleChangeDataC(id, row) {
      console.log("1223444");
      this.$refs.rForm2.clearValidate();
      // if(id=='1'||id=='2'||id=='3'||id=='4'){
      row.organ1 = "";
      row.organ2 = "";
      row.organ3 = "";
      row.organ4 = "";
      row.dpart1 = "";
      row.dpart2 = "";
      row.dpart3 = "";
      row.job_id = "";
      row.user_id = "";
      row.user_user_id = "";
      row.organ2List = [];
      row.organ3List = [];
      row.organ4List = [];
      row.dpart1List = [];
      row.dpart2List = [];
      row.dpart3List = [];
      row.jobList = [];
      row.userList = [];
      // }
    },
    handleRowDel(index) {
      if (this.paramsForm.params.length <= 1) {
        msg({
          type: 'error',
          message: "至少要保留一条",
        });
        return;
      }
      this.paramsForm.params.splice(index, 1);
    },
    handleRowDel2(index) {
      if (this.paramsForm2.params.length <= 1) {
        msg({
          type: 'error',
          message: "至少要保留一条",
        });
        return;
      }
      this.paramsForm2.params.splice(index, 1);
    },
    getOrganList(id, type) {
      return new Promise(async (resolve, reject) => {
        try {
          const res = await this.getOrganizationNameById({ id, type });
          resolve(res);
        } catch (e) {
          reject(e);
        }
      });
    },
    getDpartList(organization_id, department_id, type) {
      return new Promise(async (resolve, reject) => {
        try {
          const res = await this.getDepartmentNameById({
            organization_id,
            department_id,
            type,
          });
          resolve(res);
        } catch (e) {
          reject(e);
        }
      });
    },
    getJobList(organization_id, department_id) {
      return new Promise(async (resolve, reject) => {
        try {
          const res = await this.getPostNameById({
            organization_id,
            department_id,
          });
          resolve(res);
        } catch (e) {
          reject(e);
        }
      });
    },
    getUserList(post_id) {
      return new Promise(async (resolve, reject) => {
        try {
          const res = await this.getUserJobList({
            post_id,
          });
          resolve(res);
        } catch (e) {
          reject(e);
        }
      });
    },
    mygetRoleDetail(role_id) {
      return new Promise(async (resolve, reject) => {
        try {
          const res = await this.getRoleDetail({ role_id });
          resolve(res);
        } catch (e) {
          reject(e);
        }
      });
    },
    rowClass({ row, rowIndex }) {
      return row.children ? "bg" : "";
    },

    /**
     * 功能选择
     */
    // 子选框事件
    fnCheckEv(flag, scope, type) {
      // console.log(flag ,scope.row, type)
      // 如果有子项，则子项的选框选择跟当前一致
      if (scope.row.children) {
        this.handleFnAll(scope.row, flag, type);
      }

      /**所有子选了，父会选 */
      // this.getArr(this.tableData, scope.row.itemId);
      // let item = null;
      // for (let i = this.objList.length - 1; i >= 0; i--) {
      //   item = this.objList[i];
      //   let isflag = true;
      //   if (item.children) {
      //     item.children.forEach((item) => {
      //       if (!item[type]) {
      //         isflag = false;
      //       } else {
      //       }
      //     });

      //     item[type] = isflag;
      //   }
      // }
      // this.flag = false;
      // this.obj = {};
      // this.objList = [];
      /** */

      this.getArr(this.tableData, scope.row.itemId);
      let item = null;
      for (let i = this.objList.length - 1; i >= 0; i--) {
        item = this.objList[i];
        let isflag = false;
        if (item.children) {
          item.children.some((item) => {
            if (item[type]) {
              isflag = true;
              return true;
            } else {
              return false;
            }
          });

          item[type] = isflag;
        }
      }
      this.flag = false;
      this.obj = {};
      this.objList = [];
    },

    fnCheckEv2(flag, scope, type) {
      if (scope.row.children) {
        this.handleFnAll2(scope.row, flag, type);
      }
      if (scope.row.not_null&& (!scope.row.hasOwnProperty('notShow_not_null')||!scope.row.notShow_not_null)) {
        scope.row.create_update = true;
      }

      //  console.log(flag, scope.row.not_null,scope.row.create_update,type)
      // if(!flag&&scope.row.not_null&&!scope.row.create_update&&type==='create_update'){  //当必填和 创建都true ，再点击创建，flag就是e 会是false

      //       if(scope.row.not_null){
      //       scope.row.create_update = true
      //       }

      //       this.needFlag = true
      //       return
      // }else if(flag&&!scope.row.not_null&&scope.row.create_update&&type==='create_update'){

      //    if(this.needFlag){  //当上面情况发生

      //       scope.row.create_update = false
      //       if (scope.row.children) {
      //       this.handleFnAll2(scope.row, false, 'create_update');
      //       }

      //        this.needFlag = false
      //    }else{   //这个上面那种必填和创建都true， flag e为 false， 再点 e则又为true
      //         if (scope.row.children) {
      //           this.handleFnAll2(scope.row, flag, type);
      //         }
      //    }

      // }else if(!flag&&!scope.row.not_null&&!scope.row.create_update&&type==='create_update'){  //这个是正常点击创建

      //        if (scope.row.children) {
      //     this.handleFnAll2(scope.row, false, 'create_update');
      //     }
      // }
      //  else{
      //         //  console.log(flag, scope.row.not_null,scope.row.create_update,type)

      //       // 如果有子项，则子项的选框选择跟当前一致
      //       if (scope.row.children) {
      //         this.handleFnAll2(scope.row, flag, type);
      //       }

      //     if(scope.row.not_null){
      //         scope.row.create_update = true
      //       }
      //  }

      // this.getArr(this.tableData2, scope.row.itemId);

      // //todo
      // //   let isflag = true

      // //   if(this.obj.children){
      // //   this.obj.children.forEach(item=>{
      // //     if(!item[type]){
      // //       isflag= false
      // //     }else{

      // //     }
      // //   })

      // //   this.obj[type] = isflag
      // // }
      // //todo

      // // this.objList.forEach(item =>{
      // let item = null;
      // for (let i = this.objList.length - 1; i >= 0; i--) {
      //   item = this.objList[i];
      //   let isflag = true;
      //   if (item.children) {
      //     item.children.forEach((item) => {
      //       if (!item[type]) {
      //         isflag = false;
      //       } else {
      //       }
      //     });

      //     item[type] = isflag;
      //   }
      // }

      // // })

      // this.flag = false;

      // this.obj = {};
      // this.objList = [];

      this.getArr(this.tableData2, scope.row.itemId);
      let item = null;
      for (let i = this.objList.length - 1; i >= 0; i--) {
        item = this.objList[i];
        let isflag = false;
        if (item.children) {
          item.children.some((item) => {
            if (item[type]) {
              isflag = true;
              return true;
            } else {
              return false;
            }
          });

          
          item[type] = isflag;
          if (type === "not_null" ) {
            if (isflag) {
              if(item.hasOwnProperty('notShow_not_null')&&item.notShow_not_null){

              }else{
                item["create_update"] = isflag;
              }
              
            }
          }
        }
      }
      this.flag = false;
      this.obj = {};
      this.objList = [];
    },

    getArr(arr, itemId) {
      if (this.flag) return;

      arr.forEach((item) => {
        //  console.log(item.itemId , itemId)
        if (item.itemId === itemId) {
          this.flag = true;
          console.log(item.itemId, itemId);
        }
        if (item.children && !this.flag) {
          this.obj = item;
          this.objList.push(item);
          console.log(this.obj, this.flag);
          this.getArr(item.children, itemId);
        }
      });
    },
    handleFnAll(row, flag, type) {
      row[type] = flag;
      if (row.children) {
        row.children.forEach((item) => {
          this.handleFnAll(item, flag, type);
        });
      }
    },
    handleFnAll2(row, flag, type) {
      // if(type==='not_null'&&flag){
      //    row.create_update = true
      //    row[type] = flag;
      //  }
      // else{
      row[type] = flag;
      // }

      if (row.children) {
        row.children.forEach((item) => {
          this.handleFnAll2(item, flag, type);
        });
      }

      if (row.not_null) {
        row.create_update = true;
      }
    },
  },

  computed: {
    ...mapState({
      // change: (state) => state.role.change,
      // role: (state) => state.role.role,
    }),
  },
  
};
</script>

<style lang="scss" >
.roleAdd {
  height: 100%;
  // & > div {
  //   border-radius: 10px;
  //   display: flex;
  //   flex-direction: column;
  //   margin-bottom: 16px;
  // }
  &-jiben {
    background: #fff;
  }
  &-job {
    background: #fff;
  }
  &-actionpermiss {
    background: #fff;
  }
  &-datapermiss {
    background: #fff;
    &-data {
    }
  }
  .form-container {
    padding: 10px 60px 10px 20px;
    &-box {
      display: flex;
      & > div:nth-of-type(1) {
        // margin-right:20px;
      }
      & > div {
        width: 50%;
      }
    }
  }
}

// .el-table th {
//   background-color: #f1f1f1;
// }
// .el-table--border th {
//   border-right: 1px solid #fff;
// }
.cell {
  text-align: center;
}
// .el-table__expand-icon {
//   display: none !important;
// }
.el-select {
  width: 100%;
}
.bg {
  background: #f2f2f2 !important;
}
</style>