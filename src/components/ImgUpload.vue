<template>
  <div>
    <el-radio-group v-model="radio">
      <el-radio :label="1">本地图片</el-radio>
      <el-radio :label="2">网络图片</el-radio>
    </el-radio-group>
    <div style="display:flex;width: 100%;height:600px;flex-wrap:wrap; ">
      <div style="width:500px; flex-shrink:0;">
        <div v-if="radio===1">
          本地图片：
          <input type="file" id="uploadimg" />
          <!-- <span id="progressimg"></span> -->
          <!-- <span style="display:none;" id="successimg"></span> -->
        </div>
        <div v-else>
          网络图片：
          <input type="text"  v-model="netVal"/> <el-button type="success" @click="handleAdd" size="small">添加</el-button>
        </div>

        <div>
            <div style="display:flex;align-items:center;" v-for="(item, index) in imgs" :key="`imgUpload_${index}`">
                <el-switch v-model="item.is_qroce"></el-switch>
                <span style="margin-left: 20px;margin-right:50px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;cursor:pointer;"
                 @click="handleShowImg(index,item.src)"
                >{{item.src}}</span>
            </div>
        </div>
      </div>
      <div style="background:#e5e5e5;min-width:500px;max-width:500px;flex-shrink:0;height:100%;overflow-x:scroll;overflow-y:scroll;position:relative;user-select: none;">
          <img ref="imgRef"/>
          <img ref="imgRef2" style="position:absolute;left:0;top:0;"/>
      </div>
    </div>
  </div>
</template>

<script>
import backImg from "@/assets/logo.png";
export default {
  data() {
    return {
      radio: 1,
      imgs: [],
      netVal:''
    };
  },
  methods: {
      handleAdd(){
         
          if(this.netVal==='') return
          this.imgs.push({
              src: this.netVal,
              is_qroce: false,
              code_site:{
                  codeH: 63,
                  codeW: 63,
                  left: 0,
                  top: 475,
                  imgWidth:320
              }
          })
      },
      handleShowImg(index, src){
          console.log(index, src)
          this.$refs.imgRef.src = src
          this.$refs.imgRef2.src =  backImg

        //   console.log(this.$refs.imgRef2.left)
        //   this.$refs.imgRef2.getBoundingClientRect()
          console.log(this.$refs.imgRef2.getBoundingClientRect())
      }
  }
};
</script>

<style>
</style>
