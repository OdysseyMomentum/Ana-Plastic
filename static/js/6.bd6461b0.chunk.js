(this.webpackJsonpbalancetheworld=this.webpackJsonpbalancetheworld||[]).push([[6],{112:function(e,t,a){"use strict";a.r(t);var n=a(0),c=a.n(n),l=(a(68),a(55)),r=a(69),s=a.n(r).a.create(),o=function(e,t,a){return s.request({method:e,url:t,params:a})},i=function e(t,a){Object(l.a)(this,e),this.lat=void 0,this.long=void 0,this.lat=t,this.long=a},u=function e(){Object(l.a)(this,e)};u.get=function(e,t,a,n){return o("GET","https://opensky-network.org/api/states/all?lamin=".concat(e,"&lomin=").concat(t,"&lamax=").concat(a,"&lomax=").concat(n),[])};var h=function(){u.get("-85.585","15.563","-29.2436","35.9825").then((function(e){var t=[];return e.states?(e.states.forEach((function(e){var a=new i(e[5],e[6]);t.push(a)})),t):t}))},m=function(){return Object(n.useEffect)((function(){h()})),c.a.createElement("div",{className:"App"},c.a.createElement("header",{className:"App-header"},c.a.createElement("img",{src:"https://cdn.discordapp.com/attachments/776780435903873026/777188544774406174/turtlesmall200.png",style:{width:"500px"}}),c.a.createElement("h1",null,"Balance The World"),c.a.createElement("p",{className:"lead"},"Understand the world of finance and climate"),c.a.createElement("a",{className:"btn btn-primary mt-5",href:"/#/game"},"Begin the journey")),c.a.createElement("footer",null,c.a.createElement("p",null,"Copyright ana-plastic "),c.a.createElement("p",null,"Also check: DasMeer / PlastPick")))};t.default=function(){return c.a.createElement(m,null)}},68:function(e,t,a){}}]);