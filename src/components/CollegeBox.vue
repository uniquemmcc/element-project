<template>
  <el-form :model="ruleForm" ref="ruleForm" label-width="150px" class="demo-ruleForm">
    <el-form-item label="标题" prop="name">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>
    <el-form-item label="类别" prop="class">
      <el-select v-model="ruleForm.class" placeholder="请选择类别">
        <el-option
          :label="item.label"
          :value="item.value"
          v-for="(item,index) in classes"
          :key="`class_${index}`"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="分类" prop="cate">
      <el-select v-model="ruleForm.cate" placeholder="请选择分类">
        <el-option
          :label="item.label"
          :value="item.value"
          v-for="(item,index) in cates"
          :key="`cate_${index}`"
        ></el-option>
      </el-select>
    </el-form-item>
    <template v-if="ruleForm.class===0">
      <el-form-item label="图片" prop="imgs">
        <img-upload></img-upload>
      </el-form-item>
    </template>
    <template v-if="ruleForm.class===1">
      <el-form-item label="视频预览图" prop="preview">
        <el-upload
          :action="bannerUrl"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :limit="1"
          
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        </el-form-item>
      <el-form-item label="视频" prop="video">
        <el-upload
          class="avatar-uploader"
          action="上传地址"
          v-bind:on-progress="uploadVideoProcess"
          v-bind:on-success="handleVideoSuccess"
          v-bind:before-upload="beforeUploadVideo"
          v-bind:show-file-list="false"
        >
          <video
            v-if="videoForm.showVideoPath !='' && !videoFlag"
            v-bind:src="videoForm.showVideoPath"
            class="avatar video-avatar"
            controls="controls"
          >您的浏览器不支持视频播放</video>
          <i
            v-else-if="videoForm.showVideoPath =='' && !videoFlag"
            class="el-icon-plus avatar-uploader-icon"
          ></i>
          <el-progress
            v-if="videoFlag == true"
            type="circle"
            v-bind:percentage="videoUploadPercent"
            style="margin-top:7px;"
          ></el-progress>
        </el-upload>
      </el-form-item>
    </template>

    <template v-if="ruleForm.class===2">
      <el-form-item label="简介" prop="memo">
        <el-input v-model="ruleForm.memo"></el-input>
      </el-form-item>
      <el-form-item label="logo" prop="logo">
          <el-upload
          :action="bannerUrl"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :limit="1"
          
        >
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="banner图" prop="banner">
        <el-upload
          :action="bannerUrl"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :limit="9"
          :file-list="ruleForm.banner"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
    </template>
    <el-form-item label="文案" prop="content">
      <el-input type="textarea" v-model="ruleForm.content"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>

    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt />
    </el-dialog>
  </el-form>
</template>

<script>
import ImgUpload from "./ImgUpload.vue";
export default {
  components: {
    ImgUpload
  },
  data() {
    return {
      ruleForm: {
        title: "",
        class: 0,
        cate: "",
        content: "",
        imgs: [],
        preview: "",
        video: "",
        banner: [],
        memo: "",
        logo: ""
      },
      classes: [
        { label: "图文素材", value: 0 },
        { label: "视频素材", value: 1 },
        { label: "文案素材", value: 2 }
      ],
      cates: [],
      bannerUrl: "",
      //
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      videoFlag: false,
      //
      //是否显示进度条
      videoUploadPercent: "",
      //进度条的进度，
      isShowUploadVideo: false,
      //显示上传按钮
      videoForm: {
        showVideoPath: ""
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //banner
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //video
    //上传前回调
    beforeUploadVideo(file) {
      var fileSize = file.size / 1024 / 1024 < 50;
      if (
        [
          "video/mp4",
          "video/ogg",
          "video/flv",
          "video/avi",
          "video/wmv",
          "video/rmvb",
          "video/mov"
        ].indexOf(file.type) == -1
      ) {
        layer.msg("请上传正确的视频格式");
        return false;
      }
      if (!fileSize) {
        layer.msg("视频大小不能超过50MB");
        return false;
      }
      this.isShowUploadVideo = false;
    },
    //进度条
    uploadVideoProcess(event, file, fileList) {
      this.videoFlag = true;
      this.videoUploadPercent = file.percentage.toFixed(0) * 1;
    },
    //上传成功回调
    handleVideoSuccess(res, file) {
      this.isShowUploadVideo = true;
      this.videoFlag = false;
      this.videoUploadPercent = 0;

      //前台上传地址
      //if (file.status == 'success' ) {
      //    this.videoForm.showVideoPath = file.url;
      //} else {
      //     layer.msg("上传失败，请重新上传");
      //}

      //后台上传地址
      if (res.Code == 0) {
        this.videoForm.showVideoPath = res.Data;
      } else {
        layer.msg(res.Message);
      }
    }
  }
};
</script>

<style>
</style>
