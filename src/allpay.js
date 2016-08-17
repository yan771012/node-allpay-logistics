import validator from './validator';
import format    from './format';
import request   from 'request';

const MODE = {
  production: 'https://newlogistics.allpay.com.tw',
  stage: 'https://newlogistics-stage.allpay.com.tw'
};

const API = {
  CREATE: '/Express/Create'
};

const CONFIG = {
  merchantID: "",
  hashKey: "",
  hashIV: "",
  production: false,
  initialized: false
};

class Allpay {

  /**
   * Constructor
   * @param {string} merchantID
   * @param {string} hashKey
   * @param {string} hashIV
   * @param {boolean} production
   */
  constructor({merchantID, hashKey, hashIV, production} = {}) {
    validator.validateConstructor({merchantID, hashKey, hashIV, production});

    CONFIG.merchantID = merchantID;
    CONFIG.hashKey = hashKey;
    CONFIG.hashIV = hashIV;

    if (production === true) {
      CONFIG.production = true;
    }

    CONFIG.initialized = true;
  }

  /**
   * 物流訂單產生
   * @param opt
   * @param callback
   */
  create(opt, callback) {

    if (!CONFIG.initialized) {
      throw new Error('Allpay has not been initialized.');
    }

    validator.validateCreate(opt);

    let requestData = format.formatCreateDate(opt, CONFIG);

    request.post({url: getURL() + API.CREATE, form: requestData}, callback);

  }
}

function getURL() {
  if (CONFIG.production) {
    return MODE.production;
  }
  return MODE.stage;
}

module.exports = Allpay;