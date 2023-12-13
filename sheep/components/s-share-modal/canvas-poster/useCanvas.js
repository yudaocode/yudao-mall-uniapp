/**
 * Shopro + qs-canvas 绘制海报
 * @version 1.0.0
 * @author lidongtony
 * @param {Object} options - 海报参数
 * @param {Object} vm - 自定义组件实例
 */

import sheep from '@/sheep';
import QSCanvas from 'qs-canvas';
import { getPosterData } from './poster';

export default async function useCanvas(options, vm) {
  const width = options.width;
  const qsc = new QSCanvas(
    {
      canvasId: options.canvasId,
      width: options.width,
      height: options.height,
      setCanvasWH: (canvas) => {
        options.height = canvas.height;
      },
    },
    vm,
  );

  let drawer = getPosterData(options);

  // 绘制背景图
  const background = await qsc.drawImg({
    type: 'image',
    val: drawer.background,
    x: 0,
    y: 0,
    width,
    mode: 'widthFix',
    zIndex: 0,
  });
  await qsc.updateCanvasWH({
    width: background.width,
    height: background.bottom,
  });

  let list = drawer.list;

  for (let i = 0; i < list.length; i++) {
    let item = list[i];
    // 绘制文字
    if (item.type === 'text') {
      await qsc.drawText(item);
    }
    // 绘制图片
    if (item.type === 'image') {
      if (item.d) {
        qsc.setCircle({
          x: item.x,
          y: item.y,
          d: item.d,
          clip: true,
        });
      }

      if (item.r) {
        qsc.setRect({
          x: item.x,
          y: item.y,
          height: item.height,
          width: item.width,
          r: item.r,
          clip: true,
        });
      }
      await qsc.drawImg(item);
      qsc.restore();
    }

    // 绘制二维码
    if (item.type === 'qrcode') {
      await qsc.drawQrCode(item);
    }
  }

  await qsc.draw();
  // 延迟执行, 防止不稳定
  setTimeout(async () => {
    options.src = await qsc.toImage();
  }, 100);
  return options;
}
