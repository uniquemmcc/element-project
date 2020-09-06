<template>
     <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @select="handleSelect"
      >
      <el-submenu index="1" >
        <template slot="title">
            <div style="border-right: 3px solid blue;height:100%;">
                   <i class="el-icon-location"></i>
          <span>导航一</span>
            </div>
       
        </template>
      
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
   
          <el-menu-item index="1-3">选项3</el-menu-item>
      
      
      </el-submenu>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
      <el-menu-item index="3" >
        <i class="el-icon-document"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item>
    </el-menu>
</template>

<script>
export default {
    methods:{
        handleSelect(index,indexPath){
            console.log(index,indexPath)
        }
    }
}
</script>

<style>
.el-submenu .el-menu-item{
    background: pink;
}

.el-menu-item{
    height: 60px;
}

.el-submenu__title{
    padding-right: 0;
  height: 60px;
}
.el-submenu__title>i{
   display: none;
}

</style>
