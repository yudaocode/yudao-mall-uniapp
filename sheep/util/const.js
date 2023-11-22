// ========== MALL - 营销模块 ==========

/**
 * 优惠类型枚举
 */
export const PromotionDiscountTypeEnum = {
    PRICE: {
        type: 1,
        name: '满减'
    },
    PERCENT: {
        type: 2,
        name: '折扣'
    }
}

/**
 * 优惠劵模板的有限期类型的枚举
 */
export const CouponTemplateValidityTypeEnum = {
    DATE: {
        type: 1,
        name: '固定日期可用'
    },
    TERM: {
        type: 2,
        name: '领取之后可用'
    }
}

/**
 * 营销的商品范围枚举
 */
export const PromotionProductScopeEnum = {
    ALL: {
        scope: 1,
        name: '通用劵'
    },
    SPU: {
        scope: 2,
        name: '商品劵'
    },
    CATEGORY: {
        scope: 3,
        name: '品类劵'
    }
}
