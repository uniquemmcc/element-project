<template>
<div style="margin:30px;" >

      <div class="select-box">

      
     <el-select v-model="value" placeholder="请选择" popper-class="pop-select" @visible-change="vChange" >
    <!-- <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option> -->
     </el-select>
     <div class="select-box-content" v-if="show"></div>
     </div>
</div>
</template>

<script>
export default {
  data(){
    return{
      value: '',
      show: false,
    }
  },
  methods:{
    vChange(show){
      this.show = show
    }
  }
}
</script>

<style lang="scss" scope>
.select-box{

  &-content{
    position: absolute;
    top:45px;
    left: 0px;
     width: 500px;
  height: 500px;

  }
  
}
.pop-select{
  width: 500px;
  height: 500px;
  background: transparent!important;
  .el-select-dropdown__empty{
    display: none;
  }
  .el-select-dropdown{
    border: none;
    box-shadow: none;
  }
  }
</style>
