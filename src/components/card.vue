<template>
  <div style="background-color: #ececec; padding: 20px" class="head-card" :class="{ head: $store.state.collapsed }">
    <a-row :gutter="16">
      <a-col :span="8">
        <a-card title="商品总览" :bordered="false">
          <p>card content</p>
        </a-card>
      </a-col>
      <a-col :span="8">
        <a-card title="用户总览" :bordered="false">
          <p>card content</p>
        </a-card>
      </a-col>
      <a-col :span="8">
        <a-card title="销售总览" :bordered="false">
          <p>card content</p>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>
<style lang="less">
.head-card {
  transition: margin-left 0.3s;
  margin-left: 200px;
}
.head {
  transition: margin-left 0.3s;
  margin-left: 65px;
}
</style>
