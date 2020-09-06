<template>
 
  <div style=" width: 100%; height: 100%;">
     
      <div class="relation-container" style="border-top: 1px solid #ccc;border-left: 1px solid #ccc;border-right:1px solid #ccc;">
          <div style="display:flex;">
              <div style="display: flex; justify-content: center; align-items: center;width:25%;padding:16px 0;border-right: 1px solid #ccc;border-bottom:1px solid #ccc;">一级</div>
                <div style="display: flex; justify-content: center; align-items: center;width:25%;padding:16px 0;border-right: 1px solid #ccc;border-bottom:1px solid #ccc;">二级</div>
                  <div style="display: flex; justify-content: center; align-items: center;width:25%;padding:16px 0;border-right: 1px solid #ccc;border-bottom:1px solid #ccc;">三级</div>
                    <div style="display: flex; justify-content: center; align-items: center;width:25%;padding:16px 0;border-bottom:1px solid #ccc;">四级</div>
          </div>
          <div v-for="(item, index) in list"  style="display: flex;">
              <div style="display: flex; justify-content: center; align-items: center;width:25%;padding:16px 0;border-right: 1px solid #ccc;border-bottom:1px solid #ccc;"
                :class="item.check===1?'check':''"
              >
                  {{ item.name }}
              </div>
              <div style="display: flex;flex-direction: column;width:75%;">
                   <div v-for="(item,index) in item.children" style="display: flex;">
                            <div style="display: flex; justify-content: center; align-items: center;width:33.33%;padding:16px 0;border-right: 1px solid #ccc;border-bottom:1px solid #ccc;">
                                {{ item.name }}
                            </div>

                            <div style="display: flex;flex-direction: column;width:66.66%;">
                                <div v-for="(item,index) in item.children"  style="display: flex; justify-content: center; align-items: center;">
                                     <div style="display: flex; justify-content: center; align-items: center;width:50%;padding:16px 0;border-right: 1px solid #ccc;border-bottom:1px solid #ccc;height:100%;">
                                        {{ item.name }}
                                    </div>
                                    <div style="display: flex;flex-direction: column;width:50%;">
                                         <div v-for="(item,index) in item.children" style="display: flex; justify-content: center; align-items: center;padding:16px 0;border-bottom:1px solid #ccc;">
                                             <div style="display: flex; justify-content: center; align-items: center;">
                                                {{ item.name }}
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
        list: []
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

    axios
      .post("/api/Rbac/organization/getOrganizationRelationshipChart", {
        token: "DR!HO4uA7B7!ComN",
        id: "1"
      })
      .then(res => {
        console.log(res.data.data);
        // this.getRelationList(res.data.data)
        this.list = res.data.data
      })
      .catch(e => {
        console.log(e);
      });
  },
  methods: {
   
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
</style>
