import user from './user';
import goods from './goods';
import groupon from './groupon';

export function getPosterData(options) {
  switch (options.shareInfo.poster.type) {
    case 'user':
      return user(options);
    case 'goods':
      return goods(options);
    case 'groupon':
      return groupon(options);
  }
}
