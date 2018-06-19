/**
 * PageObject for the base page and the selectors that are constant across different layouts
 **/
module.exports = {
  url: function () {
    return this.api.globals.launch_url;
  },
  elements: {
    pageHeader:{selector:'h1 a'},
    headerIcon:{selector:'h1 a img'},
    footerLink:{selector:'footer p>a'}
  },
  sections: {
    backend_status:{
      selector:'.backend-status',
      elements:{
        title:{selector:'.bes-title'},
        status:{selector:'.bes-status'},
        version:{selector:'.bes-version'},
        runningJobs:{selector:'.bes-jobs'}
      }
    }
  }
};
