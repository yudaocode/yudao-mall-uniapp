<!-- 分销中心  -->
<template>
  <s-layout navbar="inner" class="index-wrap" title="分销中心" :bgStyle="bgStyle" onShareAppMessage>
    <!-- 分销商信息 -->
    <commission-info />
    <!-- 账户信息 -->
    <account-info />
    <!-- 菜单栏 -->
    <commission-menu />
    <!-- 分销记录 -->
    <commission-log />
    <!-- 弹框 -->
    <commission-condition :error="state.error" :errorData="state.errorData" />

    <!-- 权限 -->
    <commission-auth :error="state.error" @getAgentInfo="getAgentInfo" />
  </s-layout>
</template>

<script setup>
  import sheep from '@/sheep';
  import { onShow } from '@dcloudio/uni-app';
  import { computed, reactive } from 'vue';
  import commissionInfo from './components/commission-info.vue';
  import accountInfo from './components/account-info.vue';
  import commissionLog from './components/commission-log.vue';
  import commissionMenu from './components/commission-menu.vue';
  import commissionAuth from './components/commission-auth.vue';
  import commissionCondition from './components/commission-condition.vue';

  const state = reactive({
    error: 0,
    errorData: {},
    config: {
      background: '/storage/default/20220704/29ac76a3c9d0d983200d612e45a052ca.png',
    },
  });

  const agentInfo = computed(() => sheep.$store('user').agentInfo);

  const bgStyle = {
    color: '#F7D598',
  };

  async function getAgentInfo() {
    const { error, data } = await sheep.$store('user').getAgentInfo();
    if (error !== 0) {
      state.error = error;
      state.errorData = data;
    }
  }
  onShow(() => {
    getAgentInfo();
  });
</script>

<style lang="scss" scoped>
  :deep(.page-main) {
    background-size: 100% 100% !important;
  }
</style>
