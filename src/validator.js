function validateConstructor(constructorObj = {}) {
  let errors = [];

  //check required
  let requiredFields = ['merchantID', 'hashKey', 'hashIV'];
  requiredFields.forEach((field) => {
    if (typeof constructorObj[field] === 'undefined') {
      errors.push(`${field} is required.`);
    }
  });
  checkValidate(errors);

  //check typeof
  if (typeof constructorObj.merchantID !== 'string') {
    errors.push(`merchantID should be string.`);
  }

  if (typeof constructorObj.hashKey !== 'string') {
    errors.push(`hashKey should be string.`);
  }

  if (typeof constructorObj.hashIV !== 'string') {
    errors.push(`hashIV should be string.`);
  }
  checkValidate(errors);

  //check data format
  if (constructorObj.merchantID.length > 10) {
    errors.push(`The maximum length for merchantID is 10.`);
  }
  checkValidate(errors);
}

function validateMap(opts = {}) {
  let errors = [];

  //check required
  let requiredFields = ['MerchantTradeNo', 'LogisticsType', 'LogisticsSubType', 'IsCollection', 'ServerReplyURL'];
  requiredFields.forEach((field) => {
    if (typeof opts[field] === 'undefined') {
      errors.push(`${field} is required.`);
    }
  });
  checkValidate(errors);

  //物流類型
  let logisticsTypeValues = ['CVS'];
  if (!~logisticsTypeValues.indexOf(opts.LogisticsType)) {
    errors.push(`LogisticsType should be ${logisticsTypeValues.join(', ')}.`);
  }
  checkValidate(errors);

  //物流子類型
  if (opts.LogisticsType === 'CVS') {
    let LogisticsSubTypeForCVS = ['FAMI', 'UNIMART', 'HILIFT', 'FAMIC2C', 'UNIMARTC2C', 'HILIFTC2C'];
    if (!~LogisticsSubTypeForCVS.indexOf(opts.LogisticsSubType)) {
      errors.push(`LogisticsSubType should be ${LogisticsSubTypeForCVS.join(', ')}.`);
    }
  }
  checkValidate(errors);

  //廠商交易編號
  if (typeof opts.MerchantTradeNo !== 'string') {
    errors.push(`MerchantTradeNo should be string.`);
  } else if (opts.MerchantTradeNo.length > 20) {
    errors.push(`The maximum length for MerchantTradeNo is 20.`);
  }

  //是否代收貨款
  let IsCollectionValues = ['Y', 'N'];
  if (!~IsCollectionValues.indexOf(opts.IsCollection)) {
    errors.push(`LogisticsType should be ${IsCollectionValues.join(', ')}.`);
  }

  //Server 端回覆網址
  if (typeof opts.ServerReplyURL !== 'string') {
    errors.push(`ServerReplyURL should be string.`);
  } else if (opts.ServerReplyURL.length > 200) {
    errors.push(`The maximum length for ServerReplyURL is 200.`);
  }

  //額外資訊
  if (typeof opts.ExtraData !== 'undefined') {
    if (typeof opts.ExtraData !== 'string') {
      errors.push(`ExtraData should be string.`);
    } else if (opts.ExtraData.length > 20) {
      errors.push(`The maximum length for ExtraData is 20.`);
    }
  }

  //使用設備
  if (typeof opts.Device !== 'undefined') {
    let DeviceValues = [0, 1];
    if (!~DeviceValues.indexOf(opts.Device)) {
      errors.push(`Device should be ${DeviceValues.join(', ')}.`);
    }
  }
  checkValidate(errors);
}

function validateCreate(opts = {}) {
  let errors = [];

  //check base required
  let requiredFields = ['MerchantTradeNo', 'MerchantTradeDate', 'LogisticsType', 'LogisticsSubType', 'GoodsAmount', 'SenderName', 'ReceiverName', 'ServerReplyURL'];
  requiredFields.forEach((field) => {
    if (typeof opts[field] === 'undefined') {
      errors.push(`${field} is required.`);
    }
  });
  checkValidate(errors);

  //物流類型
  let logisticsTypeValues = ['CVS', 'Home'];
  if (!~logisticsTypeValues.indexOf(opts.LogisticsType)) {
    errors.push(`LogisticsType should be ${logisticsTypeValues.join(', ')}.`);
  }
  checkValidate(errors);

  //物流子類型
  if (opts.LogisticsType === 'CVS') {
    let LogisticsSubTypeForCVS = ['FAMI', 'UNIMART', 'HILIFT', 'FAMIC2C', 'UNIMARTC2C', 'HILIFTC2C'];
    if (!~LogisticsSubTypeForCVS.indexOf(opts.LogisticsSubType)) {
      errors.push(`LogisticsSubType should be ${LogisticsSubTypeForCVS.join(', ')}.`);
    }
  } else {
    let LogisticsSubTypeForHome = ['TCAT', 'ECAN'];
    if (!~LogisticsSubTypeForHome.indexOf(opts.LogisticsSubType)) {
      errors.push(`LogisticsSubType should be ${LogisticsSubTypeForHome.join(', ')}.`);
    }
  }
  checkValidate(errors);

  //廠商交易編號
  if (typeof opts.MerchantTradeNo !== 'string') {
    errors.push(`MerchantTradeNo should be string.`);
  } else if (opts.MerchantTradeNo.length > 20) {
    errors.push(`The maximum length for MerchantTradeNo is 20.`);
  }

  //廠商交易時
  if (typeof opts.MerchantTradeDate !== 'string') {
    errors.push(`MerchantTradeDate should be string.`);
  } else if (opts.MerchantTradeDate.length != 19) {
    errors.push(`The length for MerchantTradeDate should be 19.`);
  }

  //商品金額
  if (!Number.isInteger(opts.GoodsAmount)) {
    errors.push(`GoodsAmount should be Integer.`);
  } else if (opts.LogisticsSubType === 'UNIMARTC2C' && (opts.GoodsAmount < 1 || opts.GoodsAmount > 19999)) {
    errors.push(`GoodsAmount should be 1 ~ 19999.`);
  } else if (opts.GoodsAmount < 1 || opts.GoodsAmount > 20000) {
    errors.push(`GoodsAmount should be 1 ~ 20000.`);
  }

  //是否代收貨款
  let IsCollectionValues = ['Y', 'N'];
  if (typeof opts.IsCollection !== 'undefined' && !~IsCollectionValues.indexOf(opts.IsCollection)) {
    errors.push(`IsCollection should be ${IsCollectionValues.join(', ')}.`);
  }

  //代收金額
  if (opts.IsCollection === 'Y') {
    if (typeof opts.CollectionAmount === 'undefined') {
      errors.push(`CollectionAmount is required.`);
    } else if (!Number.isInteger(opts.CollectionAmount)) {
      errors.push(`CollectionAmount should be Integer.`);
    } else if (opts.LogisticsSubType === 'UNIMARTC2C' && (opts.CollectionAmount < 1 || opts.CollectionAmount > 19999)) {
      errors.push(`CollectionAmount should be 1 ~ 19999.`);
    } else if (opts.IsCollection < 1 || opts.IsCollection > 20000) {
      errors.push(`CollectionAmount should be 1 ~ 20000.`);
    }
  }

  //物品名稱
  if (~['FAMIC2C', 'UNIMARTC2C', 'HILIFTC2C'].indexOf(opts.LogisticsSubType)) {
    if (typeof opts.GoodsName === 'undefined') {
      errors.push(`GoodsName is required.`);
    } else if (typeof opts.GoodsName !== 'string') {
      errors.push(`GoodsName should be string.`);
    } else if (getStringCharLength(opts.GoodsName) > 50) {
      errors.push(`The maximum length for GoodsName is 50.`);
    }
  }

  //寄件人姓名
  if (typeof opts.SenderName !== 'string') {
    errors.push(`SenderName should be string.`);
  } else if (opts.SenderName.length > 10) {
    errors.push(`The maximum length for SenderName is 10.`);
  }

  //寄件人電話
  if (opts.LogisticsType === 'Home' && typeof opts.SenderPhone === 'undefined' && typeof opts.SenderCellPhone === 'undefined') {
    errors.push(`SenderPhone or SenderCellPhone are required.`);
  }

  if (typeof opts.SenderPhone !== 'undefined') {
    if (typeof opts.SenderPhone !== 'string') {
      errors.push(`SenderPhone should be string.`);
    } else if (opts.SenderPhone.length > 20) {
      errors.push(`The maximum length for SenderPhone is 20.`);
    }
  }

  //寄件人手機
  if (~['UNIMARTC2C', 'HILIFTC2C'].indexOf(opts.LogisticsSubType) && typeof opts.SenderCellPhone === 'undefined') {
    errors.push(`SenderCellPhone is required.`);
  }

  if (typeof opts.SenderCellPhone !== 'undefined') {
    if (typeof opts.SenderCellPhone !== 'string') {
      errors.push(`SenderCellPhone should be string.`);
    } else if (opts.SenderCellPhone.length > 20) {
      errors.push(`The maximum length for SenderCellPhone is 20.`);
    }
  }

  //收件人姓名
  if (typeof opts.ReceiverName !== 'string') {
    errors.push(`ReceiverName should be string.`);
  } else if (opts.ReceiverName.length > 10) {
    errors.push(`The maximum length for ReceiverName is 10.`);
  }

  //收件人電話
  if ((opts.LogisticsType === 'Home' || opts.LogisticsSubType === 'HILIFEC2C') && typeof opts.ReceiverPhone === 'undefined' && typeof opts.ReceiverCellPhone === 'undefined') {
    errors.push(`ReceiverPhone or ReceiverCellPhone are required.`);
  }

  if (typeof opts.ReceiverPhone !== 'undefined') {
    if (typeof opts.ReceiverPhone !== 'string') {
      errors.push(`ReceiverPhone should be string.`);
    } else if (opts.ReceiverPhone.length > 20) {
      errors.push(`The maximum length for ReceiverPhone is 20.`);
    }
  }

  //收件人手機
  if (~['UNIMARTC2C', 'HILIFTC2C'].indexOf(opts.LogisticsSubType) && typeof opts.ReceiverCellPhone === 'undefined') {
    errors.push(`ReceiverCellPhone is required.`);
  }

  if (typeof opts.ReceiverCellPhone !== 'undefined') {
    if (typeof opts.ReceiverCellPhone !== 'string') {
      errors.push(`ReceiverCellPhone should be string.`);
    } else if (opts.ReceiverCellPhone.length > 20) {
      errors.push(`The maximum length for ReceiverCellPhone is 20.`);
    }
  }

  //收件人email
  if (typeof opts.ReceiverEmail !== 'undefined') {
    if (typeof opts.ReceiverEmail !== 'string') {
      errors.push(`ReceiverEmail should be string.`);
    } else if (opts.ReceiverEmail.length > 100) {
      errors.push(`The maximum length for ReceiverEmail is 100.`);
    }
  }

  //交易描述
  if (typeof opts.TradeDesc !== 'undefined') {
    if (typeof opts.TradeDesc !== 'string') {
      errors.push(`TradeDesc should be string.`);
    } else if (opts.TradeDesc.length > 200) {
      errors.push(`The maximum length for TradeDesc is 200.`);
    }
  }

  //Server 端回覆網址
  if (typeof opts.ServerReplyURL !== 'string') {
    errors.push(`ServerReplyURL should be string.`);
  } else if (opts.ServerReplyURL.length > 200) {
    errors.push(`The maximum length for ServerReplyURL is 200.`);
  }

  //Client 端回覆網址
  if (typeof opts.ClientReplyURL !== 'undefined') {
    if (typeof opts.ClientReplyURL !== 'string') {
      errors.push(`ClientReplyURL should be string.`);
    } else if (opts.ClientReplyURL.length > 200) {
      errors.push(`The maximum length for ClientReplyURL is 200.`);
    }
  }

  //Server 端物流回傳網址
  if (opts.LogisticsSubType === 'UNIMARTC2C' && typeof opts.LogisticsC2CReplyURL === 'undefined') {
    errors.push(`LogisticsC2CReplyURL is required.`);
  }

  if (typeof opts.LogisticsC2CReplyURL !== 'undefined') {
    if (typeof opts.LogisticsC2CReplyURL !== 'string') {
      errors.push(`LogisticsC2CReplyURL should be string.`);
    } else if (opts.LogisticsC2CReplyURL.length > 200) {
      errors.push(`The maximum length for LogisticsC2CReplyURL is 200.`);
    }
  }

  //備註
  if (typeof opts.Remark !== 'undefined') {
    if (typeof opts.Remark !== 'string') {
      errors.push(`Remark should be string.`);
    } else if (opts.Remark.length > 200) {
      errors.push(`The maximum length for Remark is 200.`);
    }
  }

  //特約合作平台商代號(由allpay提供)
  if (typeof opts.PlatformID !== 'undefined') {
    if (typeof opts.PlatformID !== 'string') {
      errors.push(`PlatformID should be string.`);
    } else if (opts.PlatformID.length > 10) {
      errors.push(`The maximum length for PlatformID is 10.`);
    }
  }

  //宅配必填欄位檢查
  if (opts.LogisticsType === 'Home') {
    let requiredFieldsForHome = ['SenderZipCode', 'SenderAddress', 'ReceiverZipCode', 'ReceiverAddress', 'Temperature', 'Distance', 'Specification'];
    requiredFieldsForHome.forEach((field) => {
      if (typeof opts[field] === 'undefined') {
        errors.push(`${field} is required.`);
      }
    });
    checkValidate(errors);

    //寄件人郵遞區號
    if (typeof opts.SenderZipCode !== 'string') {
      errors.push(`SenderZipCode should be string.`);
    }

    if (opts.SenderZipCode.length > 5) {
      errors.push(`The maximum length for SenderZipCode is 5.`);
    }

    //寄件人地址
    if (typeof opts.SenderAddress !== 'string') {
      errors.push(`SenderAddress should be string.`);
    }

    if (opts.SenderAddress.length > 200) {
      errors.push(`The maximum length for SenderAddress is 200.`);
    }

    //收件人郵遞區號
    if (typeof opts.ReceiverZipCode !== 'string') {
      errors.push(`ReceiverZipCode should be string.`);
    }

    if (opts.ReceiverZipCode.length > 5) {
      errors.push(`The maximum length for ReceiverZipCode is 5.`);
    }

    //收件人地址
    if (typeof opts.ReceiverAddress !== 'string') {
      errors.push(`ReceiverAddress should be string.`);
    }

    if (opts.ReceiverAddress.length > 200) {
      errors.push(`The maximum length for ReceiverAddress is 200.`);
    }

    //溫層
    let TemperatureValues = ['0001', '0002', '0003'];
    if (!~TemperatureValues.indexOf(opts.Temperature)) {
      errors.push(`Temperature should be ${TemperatureValues.join(', ')}.`);
    }

    //距離
    let DistanceValues = ['00', '01', '02'];
    if (!~DistanceValues.indexOf(opts.Distance)) {
      errors.push(`Distance should be ${DistanceValues.join(', ')}.`);
    }

    //規格
    let SpecificationValues = ['0001', '0002', '0003', '0004'];
    if (!~SpecificationValues.indexOf(opts.Specification)) {
      errors.push(`Specification should be ${SpecificationValues.join(', ')}.`);
    }

    //預定取件時段
    if (typeof opts.ScheduledPickupTime !== 'undefined') {
      let ScheduledPickupTimeValues = ['1', '2', '3', '4'];
      if (!~ScheduledPickupTimeValues.indexOf(opts.ScheduledPickupTime)) {
        errors.push(`ScheduledPickupTime should be ${ScheduledPickupTimeValues.join(', ')}.`);
      }
    }

    //預定送達時段
    if (typeof opts.ScheduledDeliveryTime !== 'undefined') {
      if (opts.LogisticsSubType === 'TCAT') {
        let ScheduledDeliveryTimeValuesForTCAT = ['1', '2', '3', '4', '5'];
        if (!~ScheduledDeliveryTimeValuesForTCAT.indexOf(opts.ScheduledDeliveryTime)) {
          errors.push(`ScheduledDeliveryTime should be ${ScheduledDeliveryTimeValuesForTCAT.join(', ')}.`);
        }
      } else if (opts.LogisticsSubType === 'ECAN') {
        let ScheduledDeliveryTimeValuesForECAN = ['12', '13', '23'];
        if (!~ScheduledDeliveryTimeValuesForECAN.indexOf(opts.ScheduledDeliveryTime)) {
          errors.push(`ScheduledDeliveryTime should be ${ScheduledDeliveryTimeValuesForECAN.join(', ')}.`);
        }
      }
    }

    //指定送達日
    if (opts.LogisticsSubType === 'ECAN' && typeof opts.ScheduledDeliveryDate !== 'undefined') {
      if (typeof opts.ScheduledDeliveryDate !== 'string') {
        errors.push(`ScheduledDeliveryDate should be string.`);
      } else if (opts.ScheduledDeliveryDate.length != 10) {
        errors.push(`The length for ScheduledDeliveryDate should be 10.`);
      }
    }

    //包裹件數
    if (opts.LogisticsSubType === 'ECAN' && typeof opts.PackageCount !== 'undefined') {
      if (!Number.isInteger(opts.PackageCount)) {
        errors.push(`PackageCount should be Integer.`);
      } else if (opts.LogisticsSubType === 'UNIMARTC2C' && (opts.GoodsAmount < 1 || opts.GoodsAmount > 999)) {
        errors.push(`PackageCount should be 1 ~ 999.`);
      }
    }
  }

  if (opts.LogisticsType === 'CVS') {
    //收件人門市代號
    if (typeof opts.ReceiverStoreID === 'undefined') {
      errors.push(`ReceiverStoreID is required.`);
    } else if (typeof opts.ReceiverStoreID !== 'string') {
      errors.push(`ReceiverStoreID should be string.`);
    } else if (opts.ReceiverStoreID.length > 6) {
      errors.push(`The maximum length for ReceiverStoreID is 6.`);
    }

    //退貨門市代號
    if (typeof opts.ReturnStoreID !== 'undefined') {
      if (typeof opts.ReturnStoreID !== 'string') {
        errors.push(`ReturnStoreID should be string.`);
      }

      if (opts.ReturnStoreID.length > 6) {
        errors.push(`The maximum length for ReturnStoreID is 6.`);
      }
    }
  }

  checkValidate(errors);
}

function checkValidate(errors) {
  if (errors.length > 0) {
    throw new Error(errors.join('\n'));
  }
}

function getStringCharLength(str = '') {
  let length = str.length;
  let spChar = str.match(/[^\x00-\x80]/g);

  if (spChar != null) {
    length += spChar.length;
  }

  return length;
}


export default {
  validateConstructor,
  validateCreate,
  validateMap
}
