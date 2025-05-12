<template>
  <view class="send-wrap ss-flex">
    <view class="left ss-flex ss-flex-1">
      <uni-easyinput
        class="ss-flex-1 ss-p-l-22"
        :inputBorder="false"
        :clearable="false"
        v-model="message"
        placeholder="请输入你要咨询的问题"
        :maxlength="maxLength"
        :focus="autoFocus"
        @focus="handleFocus"
      ></uni-easyinput>
      <text v-if="showCharCount" class="char-count">{{ message.length }}/{{ maxLength }}</text>
    </view>
    <text class="sicon-basic bq" @tap.stop="onTools('emoji')"></text>
    <text
      v-if="!message"
      class="sicon-edit"
      :class="{ 'is-active': toolsMode === 'tools' }"
      @tap.stop="onTools('tools')"
    />
    <button
      v-if="message"
      class="ss-reset-button send-btn"
      @tap="sendMessage"
      :disabled="isDisabled || sending"
      :class="{ disabled: isDisabled || sending }"
    >
      <text v-if="sending">发送中</text>
      <text v-else>发送</text>
    </button>
  </view>
</template>

<script setup>
  import { computed, ref, onUnmounted } from 'vue';
  /**
   * 消息发送组件
   */
  const props = defineProps({
    // 消息
    modelValue: {
      type: String,
      default: '',
    },
    // 工具模式
    toolsMode: {
      type: String,
      default: '',
    },
    // 是否自动获取焦点
    autoFocus: {
      type: Boolean,
      default: false,
    },
    // 最大字数限制
    maxLength: {
      type: Number,
      default: 500,
    },
    // 是否显示字数统计
    showCharCount: {
      type: Boolean,
      default: true,
    },
  });

  const emits = defineEmits(['update:modelValue', 'onTools', 'sendMessage']);

  const message = computed({
    get() {
      return props.modelValue;
    },
    set(newValue) {
      emits(`update:modelValue`, newValue);
    },
  });

  // 控制发送状态
  const sending = ref(false);

  // 是否禁用发送按钮
  const isDisabled = computed(() => {
    return !message.value.trim() || message.value.length > props.maxLength;
  });

  // 输入框获取焦点
  const handleFocus = () => {
    // 输入框获取焦点时关闭工具栏
    if (props.toolsMode !== '') {
      onTools('');
    }
  };

  // 打开工具菜单
  function onTools(mode) {
    emits('onTools', mode);
  }

  // 防抖处理
  let sendTimer = null;

  // 发送消息
  function sendMessage() {
    // 如果正在发送中，或者内容为空，则不处理
    if (sending.value || isDisabled.value) return;

    // 清除可能存在的定时器
    if (sendTimer) clearTimeout(sendTimer);

    // 设置发送状态
    sending.value = true;

    // 执行发送，并添加防抖
    sendTimer = setTimeout(() => {
      emits('sendMessage');
      // 发送完成后重置状态
      setTimeout(() => {
        sending.value = false;
      }, 300);
    }, 300);
  }

  // 组件卸载时清除定时器
  onUnmounted(() => {
    if (sendTimer) clearTimeout(sendTimer);
  });
</script>

<style scoped lang="scss">
  .send-wrap {
    padding: 18rpx 20rpx;
    background: #fff;

    .left {
      height: 64rpx;
      border-radius: 32rpx;
      background: var(--ui-BG-1);
      position: relative;

      .char-count {
        position: absolute;
        right: 15rpx;
        top: 50%;
        transform: translateY(-50%);
        font-size: 22rpx;
        color: #999;
      }
    }

    .bq {
      font-size: 50rpx;
      margin-left: 10rpx;
    }

    .sicon-edit {
      font-size: 50rpx;
      margin-left: 10rpx;
      transform: rotate(0deg);
      transition: all linear 0.2s;

      &.is-active {
        transform: rotate(45deg);
      }
    }

    .send-btn {
      width: 100rpx;
      height: 60rpx;
      line-height: 60rpx;
      border-radius: 30rpx;
      background: linear-gradient(90deg, var(--ui-BG-Main), var(--ui-BG-Main-gradient));
      font-size: 26rpx;
      color: #fff;
      margin-left: 11rpx;
      transition: all 0.3s;

      &.disabled {
        opacity: 0.6;
        background: #cccccc;
      }
    }
  }
</style>
