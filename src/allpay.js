import validator from './validator';
import format    from './format';
import fetch     from 'isomorphic-fetch';
import formData  from 'isomorphic-form-data';

const MODE = {
  production: 'https://newlogistics.allpay.com.tw',
  stage: 'https://newlogistics-stage.allpay.com.tw'
};

const API = {
  MAP: '/Express/map',
  CREATE: '/Express/Create'
};

let CONFIG = {
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
   * @param opts
   * @param callback
   */
  create(opts, callback) {

    // check initial
    if (!CONFIG.initialized) {
      throw new Error('Allpay has not been initialized.');
    }

    // check input options
    validator.validateCreate(opts);

    // format request data
    let requestData = format.formatCreateDate(opts, CONFIG);

    let form = new FormData();
    Object.keys(requestData).forEach(key => {
      form.append(key, requestData[key]);
    });

    // send request
    fetch(getURL() + API.CREATE, {
      method: "POST",
      body: form
    }).then(response => {
      response.text().then(function (responseBody) {
        callback(null, response, responseBody);
      })
    }, function (error) {
      callback(error);
    });
  }

  /**
   * 電子地圖串接
   * @param opts
   * @return {string} url
   * @return {object} postData
   */
  map(opts) {

    // check initial
    if (!CONFIG.initialized) {
      throw new Error('Allpay has not been initialized.');
    }

    // check input options
    validator.validateMap(opts);

    // format request data
    let postData = format.formatMapData(opts, CONFIG);
    let url = getURL() + API.MAP;
    let form = genHtmlForm(url, postData);
    return {postData, url, form};
  }
}

function getURL() {
  if (CONFIG.production) {
    return MODE.production;
  }
  return MODE.stage;
}

function genHtmlForm(url, postData) {
  let form = `<form id="_formDate" action="${url}" method="post" target="allpayLogisticsForm">`;

  Object.keys(postData).forEach(key => {
    form += `<input type="hidden" name="${key}" value="${postData[key]}"/>`
  });
  form += `</form>`;

  return form;
}

module.exports = Allpay;