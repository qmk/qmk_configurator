/**
 *  Helper methods for common webdriver actions
 **/
module.exports={
  getListofElements:function(browser,selector,fn){
    browser.elements('css selector',selector,function (elements) {
      fn(elements.value);
    })
  }
};
