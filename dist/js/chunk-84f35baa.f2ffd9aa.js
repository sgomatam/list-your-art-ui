(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-84f35baa"],{"499b":function(t,s,a){"use strict";a.r(s);var r=function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",[a("BreadCrumbs"),a("Grid")],1)},c=[],n=function(){var t=this,s=t.$createElement;t._self._c;return t._m(0)},e=[function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",[a("h1",{staticClass:"pt-3 text-center"},[t._v("Popular Arts")])])}],i={name:"BreadCrumbs"},l=i,o=a("2877"),u=Object(o["a"])(l,n,e,!1,null,"44593358",null),d=u.exports,m=function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"container grid"},[a("div",{staticClass:"row justify-content-around"},[a("div",{staticClass:"row justify-content-center"},[a("div",{staticClass:"row col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center"},[0==this.cards?a("div",{staticClass:"col-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-6"},[a("h4",{staticStyle:{"margin-left":"9rem","margin-right":"9rem"}},[t._v("Sorry, we can't find an art with this feature")])]):t._e(),a("Art",{attrs:{CardArray:t.slicedCards}}),a("div",{staticClass:"col-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 py-5"},[a("button",{staticClass:"btn btn-outline-secondary btn-lg btn-block",attrs:{type:"button"},on:{click:t.incCardNumber}},[t._v("More +")])])],1)])])])},f=[],C=a("cc09"),b={name:"Grid",components:{Art:C["a"]},data:function(){return{cards:[],showCards:6}},created:function(){this.cards=this.it},computed:{it:function(){return this.$store.state.items},slicedCards:function(){return this.cards.slice(0,this.showCards)}},methods:{incCardNumber:function(){return this.showCards+=6}}},v=b,h=(a("a4ce"),Object(o["a"])(v,m,f,!1,null,null,null)),p=h.exports,_={components:{BreadCrumbs:d,Grid:p}},g=_,y=Object(o["a"])(g,r,c,!1,null,null,null);s["default"]=y.exports},"52f1":function(t,s,a){},a4ce:function(t,s,a){"use strict";var r=a("cc01"),c=a.n(r);c.a},b502:function(t,s,a){"use strict";var r=a("52f1"),c=a.n(r);c.a},cc01:function(t,s,a){},cc09:function(t,s,a){"use strict";var r=function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",[a("transition-group",{staticClass:"row",attrs:{name:"fade",tag:"div"}},t._l(t.CardArray,(function(s){return a("div",{key:s.id,staticClass:"col-6 col-xl-3 col-lg-4 col-md-4 col-sm-6 col-xs-6 pb-3"},[a("div",{staticClass:"card"},[a("img",{staticClass:"card-img-top",attrs:{src:"http://listyourart-stage.us-east-2.elasticbeanstalk.com"+s.artURL,alt:"Card image cap"}}),a("div",{staticClass:"overlay"},[a("router-link",{attrs:{to:"/Info"}},[a("button",{staticClass:"btn btn-outline-secondary btn-lg",attrs:{type:"button"},on:{click:function(a){return t.sendInfo(s)}}},[t._v("Info")])])],1),a("div",{staticClass:"card-body"},[a("h5",{staticClass:"card-title"},[t._v(t._s(s.artName))]),a("p",{staticClass:"card-text"},[t._v("$"+t._s(s.authorName))])])])])})),0)],1)},c=[],n={props:["CardArray"],name:"Art",methods:{sendInfo:function(t){this.$store.commit("addtoInfo",t)}}},e=n,i=(a("b502"),a("2877")),l=Object(i["a"])(e,r,c,!1,null,null,null);s["a"]=l.exports}}]);
//# sourceMappingURL=chunk-84f35baa.f2ffd9aa.js.map