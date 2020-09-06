<template>
    <div>
        <relation v-for="(item, index) in list"  style="display: flex;">    
            <relation-item style="display: flex; justify-content: center; align-items: center;">
                  {{ item.name }}
            </relation-item>
            
            <SubRelation style="display: flex;flex-direction: column;">
                 <relation-item v-for="(item,index) in item.children"  style="display: flex; justify-content: center; align-items: center;">
                      {{ item.name }}
                  </relation-item>
             </SubRelation>   
        </relation>
    </div>
</template>

<script>
import Relation from './Relation.vue'
import RelationItem from './RelationItem.vue'
import SubRelation from './Relation.vue'
export default {
    props: {
        list: {
            type: Array,
            default: ()=>[]
        }
    },
    components: {
        RelationItem
    }
}
</script>

<style>
</style>
