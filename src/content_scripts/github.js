const find = function (selector) {
  return document.querySelector(selector);
};
const onMessage = chrome.runtime.onMessage;
const sendMessage = chrome.runtime.sendMessage;

const accountInput = find("#login_field");
const passwordInput = find("#password");
const loginButton = find("input[name=commit]");

const Page = {
  bindEvent: function () {
    var that = this;
    onMessage.addListener(function (req, sender, sendResponse) {
      if (req.action === "FILL_THE_BLANK") {
        const obj = {
          account: req.account,
          password: req.password,
        };
        that.setStorage(req.accountName, obj);
        sendResponse("Success.");
      }
    });
    window.addEventListener("load", function (e) {
      let accountInfo = that.getStorage("Github") || {};
      let account = accountInfo.account;
      let password = accountInfo.password;
      if (!account || !password) {
        return;
      }
      accountInput.value = account;
      passwordInput.value = password;
      loginButton.click();
    });
  },

  // 存
  setStorage: function (key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },

  // 读
  getStorage: function (key) {
    return JSON.parse(localStorage.getItem(key));
  },

  // 删
  removeStorage: function (key) {
    localStorage.removeItem(key);
  },

  init: function () {
    this.bindEvent();
  },
};

Page.init();
