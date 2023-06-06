// ========== 商品相关的 Util ==========

/**
 * 从商品 SKU 数组中，转换出商品属性的数组
 *
 * 类似结构：[{
 *    id: // 属性的编号
 *    name: // 属性的名字
 *    values: [{
 *      id: // 属性值的编号
 *      name: // 属性值的名字
 *    }]
 * }]
 *
 * @param skus 商品 SKU 数组
 */
export function convertProductPropertyList(skus) {
  let result = [];
  for (const sku of skus) {
    if (!sku.properties) {
      continue
    }
    for (const property of sku.properties) {
      // ① 先处理属性
      let resultProperty = result.find(item => item.id === property.propertyId)
      if (!resultProperty) {
        resultProperty = {
          id: property.propertyId,
          name: property.propertyName,
          values: []
        }
        result.push(resultProperty)
      }
      // ② 再处理属性值
      let resultValue = resultProperty.values.find(item => item.id === property.valueId)
      if (!resultValue) {
        resultProperty.values.push({
          id: property.valueId,
          name: property.valueName
        })
      }
    }
  }
  return result;
}

/**
 * 从商品 SKU 数组中，转换出商品 SKU Map
 *
 * key: 属性值的拼接，使用 , 间隔，例如说 黑色,CH510
 *
 * @param skus 商品 SKU Map
 */
export function convertProductSkuMap(skus) {
  let result = {};
  for (const sku of skus) {
    let key = '';
    if (!sku.properties) {
      continue
    }
    for (const property of sku.properties) {
      if (key !== '') {
        key += ','
      }
      key += property.valueName
    }
    result[key] = sku
  }
  return result
}
