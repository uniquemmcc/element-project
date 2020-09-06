<template>
  <div>
    <el-radio-group v-model="radio">
      <el-radio :label="1">本地图片</el-radio>
      <el-radio :label="2">网络图片</el-radio>
    </el-radio-group>
    <div style="display:flex;width: 500px;height:600px; ">
      <div >
        <div v-if="radio===1">
          本地图片：
          <input type="file" id="uploadimg" />
          <!-- <span id="progressimg"></span> -->
          <!-- <span style="display:none;" id="successimg"></span> -->
        </div>
        <div v-else>
          网络图片：
          <input type="text" />
        </div>
      </div>
      <div style="background:#e5e5e5;flex:1;height:100%;"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      radio: 1,
      imgs: []
    };
  }
};
</script>

<style>
</style>
