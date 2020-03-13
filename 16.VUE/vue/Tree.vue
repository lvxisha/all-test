<template>
    <div class="tree">
        <template>
            <div v-for="item in arr" :key="item">
                {{ item }}
            </div>
        </template>
    </div>
</template>
<script>
export default {
    data(){
        return{
            arr:[1,2,3,3,4,4,4,6],
        }
    },
    methods:{

    },
    created(){
        console.log(`我是树形结构`)
    }
}
</script>