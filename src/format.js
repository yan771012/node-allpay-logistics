import crypto from 'crypto';

function formatMapData(opts, config) {
  let data = {};

  data.MerchantID = config.merchantID;
  let usedFields = ['MerchantTradeNo', 'LogisticsType', 'LogisticsSubType', 'IsCollection', 'ServerReplyURL',
    'ExtraData', 'Device'];

  usedFields.forEach(field => {
    if (typeof opts[field] !== 'undefined') {
      data[field] = opts[field];
    }
  });

  return generateCheckMacValue(config.hashKey, config.hashIV, data);
}

function formatCreateDate(opts, config) {
  let data = {};

  data.MerchantID = config.merchantID;

  let usedFields = [];

  switch (opts.LogisticsSubType) {
    case 'FAMI':
    case 'UNIMART':
    case 'HILIFE':
    case 'FAMIC2C':
    case 'HILIFEC2C':
      usedFields = ['MerchantTradeNo', 'MerchantTradeDate', 'LogisticsType', 'LogisticsSubType', 'GoodsAmount',
        'CollectionAmount', 'IsCollection', 'GoodsName', 'SenderName', 'SenderPhone', 'SenderCellPhone',
        'ReceiverName', 'ReceiverPhone', 'ReceiverCellPhone', 'ReceiverEmail', 'TradeDesc', 'ServerReplyURL',
        'ClientReplyURL', 'Remark', 'PlatformID', 'ReceiverStoreID', 'ReturnStoreID'];
      break;
    case 'UNIMARTC2C':
      usedFields = ['MerchantTradeNo', 'MerchantTradeDate', 'LogisticsType', 'LogisticsSubType', 'GoodsAmount',
        'CollectionAmount', 'IsCollection', 'GoodsName', 'SenderName', 'SenderPhone', 'SenderCellPhone',
        'ReceiverName', 'ReceiverPhone', 'ReceiverCellPhone', 'ReceiverEmail', 'TradeDesc', 'ServerReplyURL',
        'LogisticsC2CReplyURL', 'ClientReplyURL', 'Remark', 'PlatformID', 'ReceiverStoreID', 'ReturnStoreID'];
      break;
    case 'TCAT':
      usedFields = ['MerchantTradeNo', 'MerchantTradeDate', 'LogisticsType', 'LogisticsSubType', 'GoodsAmount',
        'GoodsName', 'SenderName', 'SenderPhone', 'SenderCellPhone', 'ReceiverName', 'ReceiverPhone',
        'ReceiverCellPhone', 'ReceiverEmail', 'TradeDesc', 'ServerReplyURL', 'ClientReplyURL', 'Remark',
        'PlatformID', 'SenderZipCode', 'SenderAddress', 'ReceiverZipCode', 'ReceiverAddress', 'Temperature',
        'Distance', 'Specification', 'ScheduledPickupTime', 'ScheduledDeliveryTime'];
      break;
    case 'ECAN':
      usedFields = ['MerchantTradeNo', 'MerchantTradeDate', 'LogisticsType', 'LogisticsSubType', 'GoodsAmount',
        'GoodsName', 'SenderName', 'SenderPhone', 'SenderCellPhone', 'ReceiverName', 'ReceiverPhone',
        'ReceiverCellPhone', 'ReceiverEmail', 'TradeDesc', 'ServerReplyURL', 'ClientReplyURL', 'Remark',
        'PlatformID', 'SenderZipCode', 'SenderAddress', 'ReceiverZipCode', 'ReceiverAddress', 'Temperature',
        'Distance', 'Specification', 'ScheduledDeliveryTime', 'ScheduledDeliveryDate', 'PackageCount'];
      break;
  }

  usedFields.forEach(field => {
    if (typeof opts[field] !== 'undefined') {
      data[field] = opts[field];
    }
  });

  return generateCheckMacValue(config.hashKey, config.hashIV, data);
}

function generateCheckMacValue(HashKey, HashIV, data) {

  let str = [];
  Object.keys(data).sort().forEach(key => {
      if (data[key]) {
        str.push(key + "=" + data[key]);
      }
    }
  );

  let originStr = `HashKey=${HashKey}&${str.join("&")}&HashIV=${HashIV}`;
  let urlEncodeStr = encodeURIComponent(originStr).replace(/%20/g, '+').toLowerCase();
  data.CheckMacValue = crypto.createHash('md5').update(urlEncodeStr).digest('hex').toUpperCase();
  return data
}

export default {
  formatCreateDate: formatCreateDate,
  formatMapData: formatMapData
}