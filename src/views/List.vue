<template>
  <div class="list">
    <div class="list-control">
         <el-button type="success" @click="handleAdd">添加</el-button>
    </div>
    
     
    <el-dialog title="添加" :visible.sync="addVisible" width="80%" :before-close="handleAddClose">
       <college-box></college-box>
    </el-dialog>
  
    
  </div>
</template>

<script>
import CollegeBox from '@/components/CollegeBox.vue'
export default {
  components: {
    CollegeBox
  },
  data() {
    return {
      addVisible: false
    };
  },
  methods: {
    handleAddClose() {
      this.addVisible = false;
    },
    handleAdd(){
      this.addVisible = true
    }
  }
};
</script>

<style lang="scss">
.list {
}
</style>



