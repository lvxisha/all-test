<template>
  <div class="person-list">
      <div class="menu-left">
        <a-tree
        checkable
        :treeData="treeData"
        :defaultExpandedKeys="['0-0-0', '0-0-1']"
        :defaultSelectedKeys="['0-0-0', '0-0-1']"
        :defaultCheckedKeys="['0-0-0', '0-0-1']"
        @select="this.onSelect"
        @check="this.onCheck"
        :replaceFields="replaceFields"/>
      </div>
      <a-table :columns="columns" :dataSource="data" bordered :loading="isLoading">
        <template
        v-for="col in ['key','name','truename', 'pwd', 'statue']"
        :slot="col"
        slot-scope="text, record, index"
        >
            <div :key="col">
                <a-input
                v-if="record.editable"
                style="margin: -5px 0"
                :value="text"
                @change="e => handleChange(e.target.value, record.key, col)"
                />
                <template v-else
                >{{text}}</template
                >
            </div>
        </template>
        <template slot="operation" slot-scope="text, record, index">
            <div class="editable-row-operations">
                <span >
                    <a @click="() => edit(record.key)">修改</a>
                    <a href="javascript:;" @click='() => edit(record.key)'>删除</a>
                </span>
            </div>
        </template>
    </a-table>
  </div>
</template>

<script>
const columns = [
    {
      title: '',
      dataIndex: 'key',
      width: '10px',
      scopedSlots: { customRender: 'key' },
    },
    {
      title: '账号',
      dataIndex: 'name',
      minWidth: '100px',
      ellipsis:true,
      scopedSlots: { customRender: 'name' },
    },
    {
      title: '姓名',
      dataIndex: 'truename',
      width: '15%',
      
      scopedSlots: { customRender: 'truename' },
    },
    {
      title: '关注状态',
      dataIndex: 'statue',
      width: '40%',
      scopedSlots: { customRender: 'statue' },
    },
    {
      title: '密码',
      dataIndex: 'pwd',
      scopedSlots: { customRender: 'pwd' },
    },
    {
      title: '操作',
      dataIndex: 'operation',
      align:'center',
    //   fixed:'right',
      scopedSlots: { customRender: 'operation' },
    },
];
const data = [];
  for (let i = 0; i < 100; i++) {
    data.push({
      key: Number(i.toString()) + 1,
      name: `Edrward ${i}`,
      truename:`Edrward${i}`,
      pwd: `未知密码`,
      statue: `未关注`,
      address: `London Park no. ${i}`,
    });
}

export default {
    data(){
        this.cacheData = data.map(item => ({ ...item }));
        return{
            data,
            columns,
            editingKey: '',
            isLoading:false,//初始化数据时显示 true
            treeData:[
                {
                name: 'parent 1',
                key: '0-0',
                child: [
                    {
                    name: '张晨成',
                    key: '0-0-0',
                    disabled: true,
                    child: [
                        { name: 'leaf', key: '0-0-0-0', disableCheckbox: true },
                        { name: 'leaf', key: '0-0-0-1' },
                    ],
                    },
                    {
                    name: 'parent 1-1',
                    key: '0-0-1',
                    child: [{ key: '0-0-1-0', name:'zcvc' }],
                    },
                ],
                },
            ],
            replaceFields:{
                children:'child',
                title:'name'
            }
        }
    },
    methods:{
        onSelect(selectedKeys, info) {
            console.log('selected', selectedKeys, info);
        },
        onCheck(checkedKeys, info) {
            console.log('onCheck', checkedKeys, info);
        },
        handleChange(value, key, column) {
            const newData = [...this.data];
            const target = newData.filter(item => key === item.key)[0];
            if (target) {
            target[column] = value;
            this.data = newData;
            }
        },
        edit(key) {
            const newData = [...this.data];
            const target = newData.filter(item => key === item.key)[0];
            this.editingKey = key;
            if (target) {
                target.editable = true;
                this.data = newData;
            }
        },
        save(key) {
            const newData = [...this.data];
            const newCacheData = [...this.cacheData];
            const target = newData.filter(item => key === item.key)[0];
            const targetCache = newCacheData.filter(item => key === item.key)[0];
            if (target && targetCache) {
                delete target.editable;
                this.data = newData;
                Object.assign(
                    targetCache,
                    target
                );
                this.cacheData = newCacheData;
            }
        },
        dele(key) {
            this.$confirm({
                title: '警告',
                content: '数据删除后将无法找回',
                okText: '确定',
                okType: 'danger',
                cancelText: '取消',
                onOk() {
                    console.log(`数据从列表中删除`);

                },
                onCancel() {
                    console.log(`用户点击取消`);
                },
            });
            

        },
    },
    mounted(){
        console.log(`初次执行`);

    }
}
</script>

<style>
    .ant-table-pagination.ant-pagination{
        float: inherit!important;
        text-align: center;
    }
    .editable-row-operations a {
        margin-right: 8px;
    }
    .person-list{
        width: 96%;
        margin: 0 auto;
    }
    
    
</style>