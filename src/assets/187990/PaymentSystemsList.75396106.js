(window["wpJsonpVue"]=window["wpJsonpVue"]||[]).push([["PaymentSystemsList"],{"67a0":function(e,t,s){},f71b:function(e,t,s){"use strict";s("67a0")},fd8e:function(e,t,s){"use strict";s.r(t);var a=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"payment-systems-list"},[s("ul",{staticClass:"payment-systems-list-wrap"},[e._l(e.paymentList,(function(t,a){return s("li",{key:a,staticClass:"payment-systems-list__item"},[s("img",{class:"payment-systems-list__item-img "+t.img,attrs:{src:"/mock_img/payment-systems/"+t.img+".svg?v="+t.hash,alt:""+t.img},on:{click:e.openPaymentSystems}})])})),e.showFreekassa?s("li",{staticClass:"payment-systems-list__item payment-systems-list__item--freekassa"},[e._m(0)]):e._e()],2)])},i=[function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("a",{attrs:{href:"//freekassa.ru/"}},[s("img",{attrs:{src:"//www.free-kassa.ru/img/fk_btn/17.png",title:"Приём оплаты на сайте картами"}})])}],o=s("5530"),n=(s("d3b7"),s("3ca3"),s("ddb0"),s("2f62")),m=s("9b02"),l=s.n(m),r={name:"providers-list",data:function(){return{paymentList:[{img:"visa-logo",hash:"1"},{img:"mastercard-logo",hash:"1"},{img:"interac-r-logo",hash:"1"},{img:"piastrix-logo",hash:"1"},{img:"webmoney-logo",hash:"1"},{img:"skrill-logo",hash:"1"},{img:"bitcoin-logo",hash:"1"},{img:"litecoin-logo",hash:"1"},{img:"ethereum-logo",hash:"1"}]}},computed:Object(o["a"])(Object(o["a"])(Object(o["a"])({},Object(n["c"])("player",{languageForUrl:"getLanguageForUrl",isPlayerAuthorized:"isPlayerAuthorized"})),Object(n["c"])("cmsConfig",["getDomainInfo"])),{},{showFreekassa:function(){return l()(this.getDomainInfo,"settings.footerFreekassa",!1)}}),methods:Object(o["a"])(Object(o["a"])({},Object(n["b"])("modal",{openModal:"open"})),{},{openPaymentSystems:function(){this.isPlayerAuthorized?this.openModal({name:"deposit",props:{noScroll:!0,dataTest:"payment-modal_deposit-form",place:"Footer"},component:function(){return Promise.all([s.e("chunk-24d59bec"),s.e("auth~deposit~game~missing-data-modal~profile"),s.e("chunk-ceb35b14"),s.e("auth~deposit~game~missing-data-modal"),s.e("deposit")]).then(s.bind(null,"63ba"))},replace:!1}):this.openModal({name:"registration",props:{noScroll:!0,place:"Footer"},component:function(){return Promise.all([s.e("chunk-24d59bec"),s.e("auth~deposit~game~missing-data-modal~profile"),s.e("chunk-ceb35b14"),s.e("auth~deposit~game~missing-data-modal"),s.e("auth")]).then(s.bind(null,"8037"))}})}})},c=r,u=(s("f71b"),s("2877")),g=Object(u["a"])(c,a,i,!1,null,null,null);t["default"]=g.exports}}]);