(window["wpJsonpVue"]=window["wpJsonpVue"]||[]).push([["static"],{"1f89":function(e,t,a){},"3dcd":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return e.showTimeoutMessage?a("error-block",{attrs:{title:e.$t("whoops")+"!",text:e.$t("connection_issues"),"btn-text":e.$t("to_main_page")}}):a("div",{class:[{"main static-page":!e.hideFooter,"trusted-user":e.isTrustedUser,"untrusted-user":!e.isTrustedUser,"special-licence":e.showSpecialLicence}]},[e.page&&e.page.content?a("div",{staticClass:"static-page-wrap",attrs:{id:"static-page-wrap"},on:{click:e.handleStaticPageClick}},[a(e.pageComponentContent,{tag:"component"})],1):a("div",{staticClass:"static-page__loading"},[a("preloader")],1)])},o=[],r=a("5530"),i=a("1da1"),c=(a("2ca0"),a("d3b7"),a("3ca3"),a("ddb0"),a("159b"),a("96cf"),a("a026")),s=a("589d"),u=a.n(s),l=a("e178"),d=a("1fa8"),g=a("2f62"),p=a("9d19"),h=a("9b02"),m=a.n(h),f={name:"static",components:{ErrorBlock:l["a"],Preloader:p["a"]},beforeRouteEnter:function(e,t,a){a((function(e){e.prevRoute=t}))},props:["code","hideFooter"],data:function(){return{showTimeoutMessage:!1,cashback:{titleSliderOption:{speed:400,autoplay:{delay:6e5,disableOnInteraction:!1},slidesPerView:"auto",spaceBetween:10}},antiLock:{step:0}}},watch:{$route:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return a=m()(e.singlePage,"code",!1)!==e.code,t.next=3,e.initStaticPage(a);case 3:case"end":return t.stop()}}),t)})))()},language:function(e,t){var a=this;return Object(i["a"])(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(!e||e===t){n.next=3;break}return n.next=3,a.initStaticPage(!0);case 3:case"end":return n.stop()}}),n)})))()},page:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.initStaticPage(!1);case 2:case"end":return t.stop()}}),t)})))()}},created:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.getDebugMode&&console.debug("static page["+e.code+"] created"),a=m()(e.singlePage,"code",!1)!==e.code,t.next=4,e.initStaticPage(a);case 4:case"end":return t.stop()}}),t)})))()},computed:Object(r["a"])(Object(r["a"])(Object(r["a"])(Object(r["a"])(Object(r["a"])(Object(r["a"])({},Object(g["c"])("cmsConfig",["showSpecialLicence","getDebugMode"])),Object(g["e"])("breakpoints",["isMobile","isTablet"])),Object(g["c"])("singleStaticPage",{singlePage:"getData"})),Object(g["c"])("player",{language:"getLangCode",getLanguageForUrl:"getLanguageForUrl",isTrustedUser:"isTrustedUser"})),Object(g["c"])("theme",{theme:"getTheme"})),{},{page:function(){if(!this.singlePage||!this.singlePage.code)return null;var e=m()(this.singlePage,"content",""),t=Object(r["a"])(Object(r["a"])({},this.singlePage),{},{content:Object(d["b"])(e,this.getLanguageForUrl)});return this.getDebugMode&&console.debug("Try to render static page["+this.code+"]",t),t},pageComponentContent:function(){return this.page&&this.page.content?c["default"].component("static-page-content",{template:"<div>".concat(this.page.content,"</div>")}):null}}),methods:Object(r["a"])(Object(r["a"])(Object(r["a"])(Object(r["a"])({},Object(g["b"])("apiV2",{fetchModuleData:"fetchData"})),Object(g["b"])("games",["setGameModal"])),Object(g["b"])("modal",{openModal:"open"})),{},{initStaticPage:function(){var e=arguments,t=this;return Object(i["a"])(regeneratorRuntime.mark((function a(){var n,o,r,i,c,s,l,d,g,p;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return n=e.length>0&&void 0!==e[0]&&e[0],a.next=3,t.fetchModuleData({modules:["singleStaticPage"],forced:n,code:t.code});case 3:if(!n||t.page&&("antiblock"!==t.code||"ru"===t.language)){a.next=6;break}return t.$bus.emit("toggle-404-page"),a.abrupt("return",!1);case 6:t.$route.hash&&(o=document.querySelector(t.$route.hash),r=o?o.closest(".accordion-1__item-cont")||o.querySelector(".accordion-1__item-cont"):null,i=r?r.closest(".accordion-1__item"):null,s=document.querySelector(".top-bar").offsetHeight,l=document.querySelector(".bread-crumbs"),d=document.querySelector(".back-line"),g=0,p=0,o&&(i&&r&&(i.classList.add("open"),r.style.display="block"),l&&(g=l.offsetHeight),d&&(p=d.offsetHeight),c=s+g+p,u()(o,"scroll",{duration:200,offset:-c})));case 7:case"end":return a.stop()}}),a)})))()},handleStaticPageClick:function(e){var t=e.target;if(t&&"A"!==t.tagName&&"A"===t.parentNode.tagName&&(t=t.parentNode),t&&"A"===t.tagName&&t.getAttribute("href")&&t.getAttribute("href").startsWith("#")){e.preventDefault();var n=document.querySelector(t.getAttribute("href"));return u()(n,"scroll",{duration:200,offset:-60}),!1}if(t&&"A"===t.tagName&&"/alt-deposit"===t.pathname&&"#piastrix"===t.hash&&this.openModal({name:"deposit",props:{noScroll:!0,paymentId:"3_piastrix_base",dataTest:"payment-modal_deposit-form"},component:function(){return Promise.all([a.e("chunk-24d59bec"),a.e("auth~deposit~game~missing-data-modal~profile"),a.e("chunk-ceb35b14"),a.e("auth~deposit~game~missing-data-modal"),a.e("deposit")]).then(a.bind(null,"63ba"))},replace:!0}),t&&"A"===t.tagName&&t.pathname&&!(t.pathname.startsWith("".concat(this.getLanguageForUrl,"/play/"))||t.pathname.startsWith("".concat(this.getLanguageForUrl,"/download/"))||t.pathname.startsWith("/upload/"))&&t.hostname===window.location.hostname)return this.$router.push(t.pathname).catch((function(){})),e.preventDefault(),!1;if(t&&(t.classList.contains("game__error-btn")||t.closest(".game__error-btn")))return this.redirectToHome(),!1;if(!t||!t.classList.contains("js-accordion-1__item-header")&&!t.closest(".js-accordion-1__item-header"))return!1;var o=e.target.closest(".accordion-1__item"),r=o.querySelector(".accordion-1__item-cont");o&&o.classList.contains("open")?(o.classList.remove("open"),o.removeAttribute("data-test"),u()(r,"slideUp",{duration:200})):(document.querySelectorAll(".accordion-1__item").forEach((function(e){e.classList.contains("open")&&(e.classList.remove("open"),o.removeAttribute("data-test"),u()(e.querySelector(".accordion-1__item-cont"),"slideUp",{duration:200}))})),o.classList.add("open"),o.setAttribute("data-test","accordion_opened"),u()(r,"slideDown",{duration:200,complete:function(){u()(r,"scroll",{duration:200,offset:-160})}}))},redirectToHome:function(){var e=window.self!==window.top&&window.self.origin===window.top.origin;e&&window.top&&window.top.vm?window.top.vm.$store.dispatch("games/setGameModal",!1):this.$router.push("".concat(this.getLanguageForUrl,"/")).catch((function(){}))},antiLockToggleStep:function(e){!this.isMobile&!this.isTablet&&(this.step=e)}})},b=f,w=(a("ff51"),a("a060"),a("2877")),v=Object(w["a"])(b,n,o,!1,null,null,null);t["default"]=v.exports},a060:function(e,t,a){"use strict";a("1f89")}}]);