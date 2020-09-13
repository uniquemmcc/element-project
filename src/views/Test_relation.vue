<template>
 
  <div style=" width: 100%; height: 100%;">
     
      <div class="relation-container" style="border-top: 1px solid #ccc;border-left: 1px solid #ccc;margin:20px;">
          <div style="display:flex;">
              <div style="display: flex; justify-content: center; align-items: center;width:25%;padding:16px 0;border-right: 1px solid #ccc;border-bottom:1px solid #ccc;">一级</div>
                <div style="display: flex; justify-content: center; align-items: center;width:25%;padding:16px 0;border-right: 1px solid #ccc;border-bottom:1px solid #ccc;">二级</div>
                  <div style="display: flex; justify-content: center; align-items: center;width:25%;padding:16px 0;border-right: 1px solid #ccc;border-bottom:1px solid #ccc;">三级</div>
                    <div style="display: flex; justify-content: center; align-items: center;width:25%;padding:16px 0;border-bottom:1px solid #ccc;border-right: 1px solid #ccc;">四级</div>
          </div>
          <div v-for="(item, index) in list"  style="display: flex;">
              <div style="display: flex; justify-content: center; align-items: center;width:25%;padding:16px 0;border-right: 1px solid #ccc;border-bottom:1px solid #ccc;"
                :class="item.check===1?'check':''"
              >
                <span :class="item.zhanwei?'zhanwei':''"> {{ item.name }} </span>
              </div>
              <div style="display: flex;flex-direction: column;width:75%;">
                   <div v-for="(item,index) in item.children" style="display: flex;"> 
                            <div style="display: flex; justify-content: center; align-items: center;width:33.33%;padding:16px 0;border-right: 1px solid #ccc;border-bottom:1px solid #ccc;"><!-- 可能最后一条不用下 -->
                             <span :class="item.zhanwei?'zhanwei':''"> {{ item.name }} </span>
                            </div>

                            <div style="display: flex;flex-direction: column;width:66.66%;">
                                <div v-for="(item,index) in item.children"  style="display: flex; justify-content: center; align-items: center;">
                                     <div style="display: flex; justify-content: center; align-items: center;width:50%;padding:16px 0;border-right: 1px solid #ccc;border-bottom:1px solid #ccc;height:100%;">
                                   <span :class="item.zhanwei?'zhanwei':''"> {{ item.name }} </span>
                                    </div>
                                    <div style="display: flex;flex-direction: column;width:50%;height:100%;">
                                         <div v-for="(item,index) in item.children" style="display: flex; justify-content: center; align-items: center;border-right: 1px solid #ccc;border-bottom:1px solid #ccc;">
                                             <div style="display: flex; justify-content: center; align-items: center;padding:16px 0;">
                                           <span :class="item.zhanwei?'zhanwei':''"> {{ item.name }} </span>
                                            </div>
                                          </div>      
                                    </div>
                                </div>
                            </div>
                      </div>
                  </div>
              </div>
             
          </div>
      </div>

  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
        list:[
    {
      "id": 1,
      "name": "和合集团",
      "check": 0,
      "children": [
        {
          "id": 3,
          "name": "贸易",
          "check": 0,
          "children": [
            {
              "id": 4,
              "name": "挖掘机事业部",
              "check": 0,
              "children": [
                {
                  "id": 5,
                  "name": "广州巨和",
                  "check": 0,
                  "children": []
                },
                {
                  "id": 6,
                  "name": "福建闽瑞通",
                  "check": 0,
                  "children": []
                }
              ]
            },
            {
              "id": 7,
              "name": "起重机事业部",
              "check": 1,
              "children": [
                {
                  "id": 8,
                  "name": "广州巨合",
                  "check": 0,
                  "children": []
                }
              ]
            }
          ]
        },
        {
          "id": 9,
          "name": "海外",
          "check": 0,
          "children": [
            {
              "id": 9,
          "name": "海外",
          "check": 0,
          zhanwei:true,
          children:[
            {
              "id": 9,
          "name": "海外",
          "check": 0,
          zhanwei: true
            }
          ]
            }
           
          ]
        }
      ]
    },
    {
          "id": 6,
          "name": "abc集团",
          "check": 0,
          "children": [
            {
                "id": 6,
          "name": "abc集团",
          "check": 0,
            zhanwei: true,
            children: [
              {
                  "id": 6,
          "name": "abc集团",
          "check": 0,
            zhanwei: true,
                children:[{
                     "id": 6,
          "name": "abc集团",
          "check": 0,
            zhanwei: true,
                }]
              }
            ]
            }
          ]
    },
    {
      "id": 10,
      "name": "一二集团",
      "check": 0,
      "children": [
        {
          "id": 11,
          "name": "ACG部",
          "check": 0,
          "children": [
            {
              "id": 12,
              "name": "acg",
              "check": 0,
              children: [{
                "id": 9,
          "name": "海外",
          "check": 0,
          zhanwei: true
              }]
            }
          ]
        }
      ]
    }
  ]
    };
  },
  mounted() {
    // axios
    //   .post("/api/Rbac/organization/getOrganizationList", {
    //     token: "DR!HO4uA7B7!ComN"
    //   })
    //   .then(res => {
    //     console.log(res.data.data);
    //     this.getRelationList(res.data.data);
    //   })
    //   .catch(e => {
    //     console.log(e);
    //   });

    // axios
    //   .post("/api/Rbac/organization/getOrganizationRelationshipChart", {
    //     token: "DR!HO4uA7B7!ComN",
    //     id: "1"
    //   })
    //   .then(res => {
    //     console.log(res.data.data);
    //     // this.getRelationList(res.data.data)
    //     this.list = res.data.data
    //   })
    //   .catch(e => {
    //     console.log(e);
    //   });


    
  },
  methods: {
     getList(){
       let arr = []
       
       
     },
     go(){
       
     }
  }
};
</script>

<style lang="scss">
div {
  
    box-sizing:border-box;
}
.relation-container{
   &>div:nth-last-child(1){
       &>div{
            // border-bottom: 0px!important;
       }
   
   }
}

.check {
 color: red;
}

.zhanwei{
  opacity: 0;
}
</style>
