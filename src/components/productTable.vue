<template>
  <a-table :columns="columns" :data-source="data" class="head-product" :class="{ product: $store.state.collapsed }">
    <div slot="operation" slot-scope="text, record">
      <a-button @click="productEdit(record)">编辑</a-button>
      <a-button @click="productRemove(record)">删除</a-button>
    </div>
  </a-table>
</template>
<script>
const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '标题',
    dataIndex: 'title',
    key: 'title',
    width: 280,
  },
  {
    title: '描述',
    dataIndex: 'desc',
    key: 'desc',
  },
  {
    title: '类目',
    dataIndex: 'category',
    key: 'category',
    ellipsis: true,
  },
  {
    title: '预售价格',
    dataIndex: 'price',
    key: 'price',
    ellipsis: true,
  },
  {
    title: '折扣价格',
    dataIndex: 'price_off',
    key: 'price_off',
    ellipsis: true,
  },
  {
    title: '标签',
    dataIndex: 'tags',
    key: 'tags',
    ellipsis: true,
  },
  {
    title: '限制购买数量',
    dataIndex: 'inventory',
    key: 'inventory',
    ellipsis: true,
  },
  {
    title: '上加状态',
    dataIndex: 'status',
    key: 'status',
    ellipsis: true,
  },
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    ellipsis: true,
    width: 180,
    scopedSlots: { customRender: 'operation' },
  },
]

export default {
  props: ['data'],
  data() {
    return {
      columns,
    }
  },
  methods: {
    // 编辑
    productEdit(record) {
      this.$emit('edit', record)
    },

    // 删除
    productRemove(record) {
      this.$emit('remove', record)
    },
  },
}
</script>
<style scoped>
.head-product {
  margin-top: 20px;
  transition: margin-left 0.3s;
  margin-left: 200px;
}
.product {
  transition: margin-left 0.3s;
  margin-left: 80px;
}
</style>
