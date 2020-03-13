<template>
    <div>
        {{ msg }}
        <Candle />
        <Tree />
    </div>
</template>
<script>
import Candle from './Candle'
import Tree from './Tree'
export default {
    data() {
        return {
            msg:"hello word"
        }
    },
    components:{
        Candle,
        Tree,
    }
}
</script>
<style  scoped>
div{
    background: red;
    color: #fff;
}
</style>