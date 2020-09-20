<template>
    <div class="test-city">

        <div style=" width:100%;height:50px;background:pink;position: relative;" @click="handleOpen">open


            <div class="dialog" v-if="show"></div>
        </div>

        <el-cascader size="large"
                         ref="addPoint"
                         placeholder="请选择"
                         :props="cityProps"
                         :options="cityOptions"
                         clearable
                         v-model="selectedOptions"
                         @change="handleChange">
            </el-cascader>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return{
            show: false,
            url: 'https://restapi.amap.com/v3/config/district?keywords=&subdistrict=3&extensions=base&key=2c5c52c39ec2afd8128c21f003fb544c',
            /*选项列表*/
      cityOptions: [
      ],
      /*选项列表格式*/
      cityProps: {
        value: 'name',
        label: 'name',
        children: 'districts'
      },
      selectedOptions: ''
        }
    },
    mounted(){
        axios.get(this.url).then(res=>{
            console.log(res)
            this.cityOptions = res.data.districts[0].districts
            // this.cityOptions =  this.getTreeData(res.data.districts[0].districts)
        })
    },
    methods: {
        handleOpen(){
            this.show = !this.show
        },
        /* 递归处理末尾项district为0的空项 */
    getTreeData (data) {
      // 循环遍历返回的数据
      for (var i = 0; i < data.length; i++) {
        if (data[i].districts.length < 1) {
          // districts若为空数组，则将districts设为undefined
          data[i].districts = undefined
        } else {
          // districts若不为空数组，则继续 递归调用 本方法
          this.getTreeData(data[i].districts)
        }
      }
      return data
    },
    handleChange(){}
    },
    watch: {
        selectedOptions(newV, oldV){
            console.log(newV)
        }
    }
}
</script>

<style lang="scss">
.test-city{
    .dialog{
        position: absolute;
        left: 0;
        top: 50px;
        width: 800px;
        height: 600px;
        background: #eee;
    }
}
</style>
