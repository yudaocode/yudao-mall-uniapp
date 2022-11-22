import $store from '@/sheep/store';
import $helper from '@/sheep/helper';
import dayjs from 'dayjs';
import { ref } from 'vue';
import test from '@/sheep/helper/test.js';
import $api from '@/sheep/api';

// 打开授权弹框
export function showAuthModal(type = 'accountLogin') {
  const modal = $store('modal');
  if (modal.auth !== '') {
    closeAuthModal();
    setTimeout(() => {
      modal.$patch((state) => {
        state.auth = type;
      });
    }, 100);
  } else {
    modal.$patch((state) => {
      state.auth = type;
    });
  }
}

// 关闭授权弹框
export function closeAuthModal() {
  $store('modal').$patch((state) => {
    state.auth = '';
  });
}

// 打开分享弹框
export function showShareModal() {
  $store('modal').$patch((state) => {
    state.share = true;
  });
}

// 关闭分享弹框
export function closeShareModal() {
  $store('modal').$patch((state) => {
    state.share = false;
  });
}

// 打开快捷菜单
export function showMenuTools() {
  $store('modal').$patch((state) => {
    state.menu = true;
  });
}

// 关闭快捷菜单
export function closeMenuTools() {
  $store('modal').$patch((state) => {
    state.menu = false;
  });
}

// 发送短信验证码  60秒
export function getSmsCode(event, mobile = '') {
  const modalStore = $store('modal');
  const lastSendTimer = modalStore.lastTimer[event];

  if (typeof lastSendTimer === 'undefined') {
    $helper.toast('短信发送事件错误');
    return;
  }

  const duration = dayjs().unix() - lastSendTimer;
  const canSend = duration >= 60;

  if (!canSend) {
    $helper.toast('请稍后再试');
    return;
  }

  if (!test.mobile(mobile)) {
    $helper.toast('手机号码格式不正确');
    return;
  }

  // 发送验证码 + 更新上次发送验证码时间
  $api.app.sendSms({ mobile, event }).then((res) => {
    if (res.error === 0) {
      modalStore.$patch((state) => {
        state.lastTimer[event] = dayjs().unix();
      });
    }
  });

}

// 获取短信验证码倒计时 -- 60秒
export function getSmsTimer(event, mobile = '') {
  const modalStore = $store('modal');
  const lastSendTimer = modalStore.lastTimer[event];

  if (typeof lastSendTimer === 'undefined') {
    $helper.toast('短信发送事件错误');
    return;
  }

  const duration = ref(dayjs().unix() - lastSendTimer - 60);
  const canSend = duration.value >= 0;

  if (canSend) {
    return '获取验证码';
  }

  if (!canSend) {
    setTimeout(() => {
      duration.value++;
    }, 1000);
    return -duration.value.toString() + ' 秒';
  }
}

// 记录广告弹框历史
export function saveAdvHistory(adv) {
  const modal = $store('modal');

  modal.$patch((state) => {
    if (!state.advHistory.includes(adv.src)) {
      state.advHistory.push(adv.src);
    }
  });
}
