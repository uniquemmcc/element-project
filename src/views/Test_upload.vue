<template>
 <div>
   <el-upload
  class="avatar-uploader"
  action="https://jsonplaceholder.typicode.com/posts/"
  :show-file-list="false"
  :on-success="handleAvatarSuccess"
  :before-upload="beforeAvatarUpload">
  <img v-if="imageUrl" :src="imageUrl" class="avatar">
  <div v-else style="width:50px;height:50px;">
    <i  class="el-icon-plus avatar-uploader-icon"></i>
    <p style="font-size: 12px;color:#000!important;">背景图</p>
  </div>
  
</el-upload>
 </div>
</template>

<script>
export default {
  methods:{
    
  }
}
</script>

<style>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    background: #f2f2f2;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 16px;
    color: #8c939d;
    width: 30px;
    height: 30px;
    line-height: 30px;
    text-align: center;
  }
  .avatar {
    width: 50px;
    height: 50px;
    display: block;
  }

.el-message {
  font-size: 16px;
}
</style>
