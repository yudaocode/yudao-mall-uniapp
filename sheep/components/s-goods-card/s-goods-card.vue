<!-- 装修商品组件：商品卡片 -->
<template>
  <!-- 商品卡片 -->
  <view>
    <!-- 布局1. 单列大图（上图，下内容）-->
    <view
      v-if="layoutType === LayoutTypeEnum.ONE_COL_BIG_IMG && state.goodsList.length"
      class="goods-sl-box"
    >
      <view
        class="goods-box"
        v-for="item in state.goodsList"
        :key="item.id"
        :style="[{ marginBottom: data.space * 2 + 'rpx' }]"
      >
        <s-goods-column
          class=""
          size="sl"
          :goodsFields="data.fields"
          :tagStyle="data.badge"
          :data="item"
          :titleColor="data.fields.name?.color"
          :subTitleColor="data.fields.introduction.color"
          :topRadius="data.borderRadiusTop"
          :bottomRadius="data.borderRadiusBottom"
          @click="sheep.$router.go('/pages/goods/index', { id: item.id })"
        >
          <!-- 购买按钮 -->
          <template v-slot:cart>
            <button class="ss-reset-button cart-btn" :style="[buyStyle]">
              {{ btnBuy.type === 'text' ? btnBuy.text : '' }}
            </button>
          </template>
        </s-goods-column>
      </view>
    </view>

    <!-- 布局2. 双列（每一列：上图，下内容）-->
    <view
      v-if="layoutType === LayoutTypeEnum.TWO_COL && state.goodsList.length"
      class="goods-md-wrap ss-flex ss-flex-wrap ss-col-top"
    >
      <view class="goods-list-box">
        <view
          class="left-list"
          :style="[{ paddingRight: data.space + 'rpx', marginBottom: data.space + 'px' }]"
          v-for="item in state.leftGoodsList"
          :key="item.id"
        >
          <s-goods-column
            class="goods-md-box"
            size="md"
            :goodsFields="data.fields"
            :tagStyle="data.badge"
            :data="item"
            :titleColor="data.fields.name?.color"
            :subTitleColor="data.fields.introduction.color"
            :topRadius="data.borderRadiusTop"
            :bottomRadius="data.borderRadiusBottom"
            :titleWidth="330 - marginLeft - marginRight"
            @click="sheep.$router.go('/pages/goods/index', { id: item.id })"
            @getHeight="calculateGoodsColumn($event, 'left')"
          >
            <!-- 购买按钮 -->
            <template v-slot:cart>
              <button class="ss-reset-button cart-btn" :style="[buyStyle]">
                {{ btnBuy.type === 'text' ? btnBuy.text : '' }}
              </button>
            </template>
          </s-goods-column>
        </view>
      </view>
      <view class="goods-list-box">
        <view
          class="right-list"
          :style="[{ paddingLeft: data.space + 'rpx', marginBottom: data.space + 'px' }]"
          v-for="item in state.rightGoodsList"
          :key="item.id"
        >
          <s-goods-column
            class="goods-md-box"
            size="md"
            :goodsFields="data.fields"
            :tagStyle="data.badge"
            :data="item"
            :titleColor="data.fields.name?.color"
            :subTitleColor="data.fields.introduction.color"
            :topRadius="data.borderRadiusTop"
            :bottomRadius="data.borderRadiusBottom"
            :titleWidth="330 - marginLeft - marginRight"
            @click="sheep.$router.go('/pages/goods/index', { id: item.id })"
            @getHeight="calculateGoodsColumn($event, 'right')"
          >
            <!-- 购买按钮 -->
            <template v-slot:cart>
              <button class="ss-reset-button cart-btn" :style="[buyStyle]">
                {{ btnBuy.type === 'text' ? btnBuy.text : '' }}
              </button>
            </template>
          </s-goods-column>
        </view>
      </view>
    </view>

    <!-- 布局3. 单列小图（左图，右内容） -->
    <view
      v-if="layoutType === LayoutTypeEnum.ONE_COL_SMALL_IMG && state.goodsList.length"
      class="goods-lg-box"
    >
      <view
        class="goods-box"
        :style="[{ marginBottom: data.space + 'px' }]"
        v-for="item in state.goodsList"
        :key="item.id"
      >
        <s-goods-column
          class="goods-card"
          size="lg"
          :goodsFields="data.fields"
          :data="item"
          :tagStyle="data.badge"
          :titleColor="data.fields.name?.color"
          :subTitleColor="data.fields.introduction.color"
          :topRadius="data.borderRadiusTop"
          :bottomRadius="data.borderRadiusBottom"
          @tap="sheep.$router.go('/pages/goods/index', { id: item.id })"
        >
          <!-- 购买按钮 -->
          <template v-slot:cart>
            <button class="ss-reset-button cart-btn" :style="[buyStyle]">
              {{ btnBuy.type === 'text' ? btnBuy.text : '' }}
            </button>
          </template>
        </s-goods-column>
      </view>
    </view>
  </view>
</template>

<script setup>
  /**
   * 商品卡片
   */
  import { computed, reactive, onMounted, ref } from 'vue';
  import sheep from '@/sheep';
  import SpuApi from '@/sheep/api/product/spu';

  // 布局类型
  const LayoutTypeEnum = {
    // 单列大图
    ONE_COL_BIG_IMG: 'oneColBigImg',
    // 双列
    TWO_COL: 'twoCol',
    // 单列小图
    ONE_COL_SMALL_IMG: 'oneColSmallImg',
  };

  const state = reactive({
    goodsList: [],
    leftGoodsList: [],
    rightGoodsList: [],
  });
  const props = defineProps({
    data: {
      type: Object,
      default: () => ({}),
    },
    styles: {
      type: Object,
      default: () => ({}),
    },
  });

  const { layoutType, btnBuy, spuIds } = props.data || {};
  const { marginLeft, marginRight } = props.styles || {};

  // 购买按钮样式
  const buyStyle = computed(() => {
    if (btnBuy.type === 'text') {
      // 文字按钮：线性渐变背景颜色
      return {
        background: `linear-gradient(to right, ${btnBuy.bgBeginColor}, ${btnBuy.bgEndColor})`,
      };
    }
    if (btnBuy.type === 'img') {
      // 图片按钮
      return {
        width: '54rpx',
        height: '54rpx',
        background: `url(${sheep.$url.cdn(btnBuy.imgUrl)}) no-repeat`,
        backgroundSize: '100% 100%',
      };
    }
  });

  //region 商品瀑布流布局
  // 下一个要处理的商品索引
  let count = 0;
  // 左列的高度
  let leftHeight = 0;
  // 右列的高度
  let rightHeight = 0;

  /**
   * 计算商品在左列还是右列
   * @param height 商品的高度
   * @param where 添加到哪一列
   */
  function calculateGoodsColumn(height = 0, where = 'left') {
    // 处理完
    if (!state.goodsList[count]) return;
    // 增加列的高度
    if (where === 'left') leftHeight += height;
    if (where === 'right') rightHeight += height;
    // 添加到矮的一列
    if (leftHeight <= rightHeight) {
      state.leftGoodsList.push(state.goodsList[count]);
    } else {
      state.rightGoodsList.push(state.goodsList[count]);
    }
    // 计数
    count++;
  }

  //endregion

  /**
   * 根据商品编号列表，获取商品列表
   * @param ids 商品编号列表
   * @return {Promise<undefined>} 商品列表
   */
  async function getGoodsListByIds(ids) {
    const { data } = await SpuApi.getSpuListByIds(ids);
    return data;
  }

  //获取结算信息
  const settleData = ref()
  async function getSettlementByIds(ids) {
    const { data } = await SpuApi.getSettlementProduct(ids);
    return data;
  }

  //计算展示价格的函数
  async function enrichDataWithSkus(data, array) {
    // 创建一个映射，以 id 为键，存储 data 数组中的对象
    const dataMap = new Map(data.map(item => [item.id, { ...item }]));

    // 遍历 array 数组
    array.forEach(item => {
      // 初始化 discountPrice 和 vipPrice 为 null
      let discountPrice = null;
      let vipPrice = null;
      let foundType4 = false;
      let foundType6 = false;

      // 遍历 skus 数组，寻找 type 为 4 和 6 的首个条目
      item.skus.forEach(sku => {
        if (!foundType4 && sku.type === 4) {
          discountPrice = sku.price;
          foundType4 = true;
        }
        if (!foundType6 && sku.type === 6) {
          vipPrice = sku.price;
          foundType6 = true;
        }

        // 如果已经找到 type 为 4 和 6 的条目，则不需要继续遍历
        if (foundType4 && foundType6) {
          return;
        }
      });

      // 更新 dataMap 中对应的对象
      if (dataMap.has(item.id)) {
        dataMap.get(item.id).discountPrice = discountPrice;
        dataMap.get(item.id).vipPrice = vipPrice;
        dataMap.get(item.id).reward = item.reward;
      }
    });

    // 返回更新后的数据数组
    return Array.from(dataMap.values());
  }

  // 初始化
  onMounted(async () => {
    // 加载商品列表
    const ms = await getGoodsListByIds(spuIds.join(','));
    settleData.value = await getSettlementByIds(spuIds.join(','))
    state.goodsList = await enrichDataWithSkus(ms,settleData.value)
    // 只有双列布局时需要
    if (layoutType === LayoutTypeEnum.TWO_COL) {
      // 分列
      calculateGoodsColumn();
    }
  });
</script>

<style lang="scss" scoped>
  .goods-md-wrap {
    width: 100%;
  }

  .goods-list-box {
    width: 50%;
    box-sizing: border-box;

    .left-list {
      &:nth-last-child(1) {
        margin-bottom: 0 !important;
      }
    }

    .right-list {
      &:nth-last-child(1) {
        margin-bottom: 0 !important;
      }
    }
  }

  .goods-box {
    &:nth-last-of-type(1) {
      margin-bottom: 0 !important;
    }
  }

  .goods-md-box,
  .goods-sl-box,
  .goods-lg-box {
    position: relative;

    .cart-btn {
      position: absolute;
      bottom: 18rpx;
      right: 20rpx;
      z-index: 11;
      height: 50rpx;
      line-height: 50rpx;
      padding: 0 20rpx;
      border-radius: 25rpx;
      font-size: 24rpx;
      color: #fff;
    }
  }
</style>
