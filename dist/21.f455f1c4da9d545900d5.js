(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{iaCu:function(l,n,u){"use strict";u.r(n);var e=u("CcnG"),t=u("Bkk2"),o=function(){function l(l,n,u){this._serv=l,this._nav=n,this.http=u,this.blog=[]}return l.prototype.sendid=function(l){console.log(l),this._nav.navigate(["single-blog"],{queryParams:{blogid:l}})},l.prototype.ngOnInit=function(){var l=this;this._serv.blogRecord().subscribe(function(n){l.blog=n,console.log(l.blog)},function(l){})},l}(),i=function(){return function(){}}(),c=u("pMnS"),a=u("Ip0R"),s=u("SoiD"),d=u("sE5F"),r=u("ZYCi"),p=e["\u0275crt"]({encapsulation:0,styles:[[""]],data:{}});function m(l){return e["\u0275vid"](0,[(l()(),e["\u0275eld"](0,0,null,null,20,"section",[["class","blog"]],null,null,null,null,null)),(l()(),e["\u0275eld"](1,0,null,null,19,"div",[["class","row"]],null,null,null,null,null)),(l()(),e["\u0275eld"](2,0,null,null,2,"div",[["class","col-sm-4"]],null,null,null,null,null)),(l()(),e["\u0275eld"](3,0,null,null,1,"div",[["class","img-holder"]],null,null,null,null,null)),(l()(),e["\u0275eld"](4,0,null,null,0,"img",[["alt",""]],[[8,"src",4]],null,null,null,null)),(l()(),e["\u0275eld"](5,0,null,null,15,"div",[["class","col-sm-8"]],null,null,null,null,null)),(l()(),e["\u0275eld"](6,0,null,null,14,"div",[["class","desc"]],null,null,null,null,null)),(l()(),e["\u0275eld"](7,0,null,null,1,"h3",[["clalss","mb-0"]],null,null,null,null,null)),(l()(),e["\u0275ted"](8,null,["",""])),(l()(),e["\u0275eld"](9,0,null,null,4,"small",[],null,null,null,null,null)),(l()(),e["\u0275eld"](10,0,null,null,1,"i",[["class","material-icons vertical-align-middle"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["access_time"])),(l()(),e["\u0275ted"](12,null,[" ",""])),e["\u0275ppd"](13,1),(l()(),e["\u0275eld"](14,0,null,null,0,"hr",[],null,null,null,null,null)),(l()(),e["\u0275eld"](15,0,null,null,1,"p",[["class","record-desc"]],null,null,null,null,null)),(l()(),e["\u0275ted"](16,null,[" "," "])),(l()(),e["\u0275eld"](17,0,null,null,3,"button",[["class","btn btn-rose"]],null,[[null,"click"]],function(l,n,u){var e=!0;return"click"===n&&(e=!1!==l.component.sendid(l.context.$implicit.id)&&e),e},null,null)),(l()(),e["\u0275ted"](-1,null,["Read More"])),(l()(),e["\u0275eld"](19,0,null,null,1,"i",[["class","material-icons"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["bubble_chart"]))],null,function(l,n){l(n,4,0,e["\u0275inlineInterpolate"](1,"https://apis.rfpgurus.com",n.context.$implicit.image,"")),l(n,8,0,n.context.$implicit.title);var u=e["\u0275unv"](n,12,0,l(n,13,0,e["\u0275nov"](n.parent,0),n.context.$implicit.publish_date));l(n,12,0,u),l(n,16,0,n.context.$implicit.description)})}function g(l){return e["\u0275vid"](0,[e["\u0275pid"](0,a.DatePipe,[e.LOCALE_ID]),(l()(),e["\u0275eld"](1,0,null,null,0,"app-loader",[],null,null,null,null,null)),(l()(),e["\u0275eld"](2,0,null,null,11,"div",[["class","wrapper"]],null,null,null,null,null)),(l()(),e["\u0275eld"](3,0,null,null,6,"section",[["class","about-1"]],null,null,null,null,null)),(l()(),e["\u0275eld"](4,0,null,null,5,"div",[["class","container"]],null,null,null,null,null)),(l()(),e["\u0275eld"](5,0,null,null,4,"div",[["class","main-text"]],null,null,null,null,null)),(l()(),e["\u0275eld"](6,0,null,null,3,"p",[["class","large"]],null,null,null,null,null)),(l()(),e["\u0275eld"](7,0,null,null,1,"strong",[],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["RFPGurus Blog"])),(l()(),e["\u0275ted"](-1,null,[" A Blog about Government Contracting, Procurement, Purchasing, RFPs, Bids & Tenders "])),(l()(),e["\u0275eld"](10,0,null,null,3,"div",[["class","blog-holder"]],null,null,null,null,null)),(l()(),e["\u0275eld"](11,0,null,null,2,"div",[["class","container"]],null,null,null,null,null)),(l()(),e["\u0275and"](16777216,null,null,1,null,m)),e["\u0275did"](13,278528,null,0,a.NgForOf,[e.ViewContainerRef,e.TemplateRef,e.IterableDiffers],{ngForOf:[0,"ngForOf"]},null)],function(l,n){l(n,13,0,n.component.blog)},null)}function v(l){return e["\u0275vid"](0,[(l()(),e["\u0275eld"](0,0,null,null,2,"app-blog",[],null,null,null,g,p)),e["\u0275prd"](512,null,t.a,t.a,[s.a,d.Http]),e["\u0275did"](2,114688,null,0,o,[t.a,r.l,d.Http],null,null)],function(l,n){l(n,2,0)},null)}var f=e["\u0275ccf"]("app-blog",o,v,{},{},[]);u.d(n,"BlogModuleNgFactory",function(){return b});var b=e["\u0275cmf"](i,[],function(l){return e["\u0275mod"]([e["\u0275mpd"](512,e.ComponentFactoryResolver,e["\u0275CodegenComponentFactoryResolver"],[[8,[c.a,f]],[3,e.ComponentFactoryResolver],e.NgModuleRef]),e["\u0275mpd"](4608,a.NgLocalization,a.NgLocaleLocalization,[e.LOCALE_ID,[2,a["\u0275angular_packages_common_common_a"]]]),e["\u0275mpd"](1073742336,a.CommonModule,a.CommonModule,[]),e["\u0275mpd"](1073742336,r.p,r.p,[[2,r.v],[2,r.l]]),e["\u0275mpd"](1073742336,i,i,[]),e["\u0275mpd"](1024,r.j,function(){return[[{path:"",component:o}]]},[])])})}}]);