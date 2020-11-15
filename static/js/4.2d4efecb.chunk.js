(this.webpackJsonpbalancetheworld=this.webpackJsonpbalancetheworld||[]).push([[4],{113:function(e,t,i){"use strict";i.r(t);var a,s,n=i(0),r=i.n(n),h=(i(64),i(111)),l=i(55),o=i(87),c=i(65),p=i(102),d=i(101),u=i(88),m=i.n(u),v=i(89),g=i.n(v),_=i(90),x=i.n(_),f=i(91),b=i.n(f),w=i(92),y=i.n(w),P=i(93),k=i.n(P),S=i(94),M=i.n(S),C=i(95),B=i.n(C),O=i(96),j=i.n(O),A=i(97),G=i.n(A),E=i(98),H=i.n(E),L=i(99),V=i.n(L),T=-1,D=[],I=!1,N=function(e){Object(p.a)(i,e);var t=Object(d.a)(i);function i(){var e;return Object(l.a)(this,i),(e=t.call(this,"scene")).balance=void 0,e.dollar_balance=void 0,e.balance_text=void 0,e.dollar_balance_text=void 0,e.entity_cruise_ship=void 0,e.happiness_text=void 0,e.sea_life_text=void 0,e.plastic_text=void 0,e.sea_level_text=void 0,e.ph_text=void 0,e.o2_text=void 0,e.co2_text=void 0,e.nutrition_text=void 0,e.noise_text=void 0,e.temp_text=void 0,e.parameters={happiness:50,sea_life:10,plastic:50,sea_level:21,ph:8.1,o2:21e4,co2:409.8,nutrition:10,noise:10,temp:.95},e.vx=void 0,e.vy=void 0,e.prevX=void 0,e.prevY=void 0,e.length=void 0,e.waves=void 0,e.line=void 0,e.points=void 0,e.points_sets=void 0,s=Object(c.a)(e),e.balance=Phaser.Math.Between(50,150),e.dollar_balance=Phaser.Math.Between(1,10),e}return Object(o.a)(i,[{key:"preload",value:function(){this.load.image("shark",g.a),this.load.image("map",m.a),this.load.image("turtle",x.a),this.load.image("tuna",b.a),this.load.image("humpback",y.a),this.load.image("fishing_boat",k.a),this.load.image("cruise_ship",M.a),this.load.image("plastic",B.a),this.load.image("sargassum",H.a),this.load.image("plasticbag",G.a),this.load.image("microplastic",j.a),this.load.video("intro",V.a);this.textures.generate("star",{data:[".....828.....","....72227....","....82228....","...7222227...","2222222222222","8222222222228",".72222222227.","..787777787..","..877777778..",".78778887787.",".27887.78872.",".787.....787."],pixelWidth:2})}},{key:"loadDiamonds",value:function(e){for(var t=0;t<e;t+=1){var i=Phaser.Math.Between(50,1500),a=Phaser.Math.Between(50,1500),s=this.add.image(i,a,"star");s.setInteractive(),s.on("clicked",this.clickHandler,this)}this.input.on("gameobjectup",(function(e,t){t.emit("clicked",t)}),this),this.init_text_labels()}},{key:"init_text_labels",value:function(){this.balance_text=this.add.text(20,20,"",{font:"26px Arial",fill:"#00CED1",backgroundColor:"white"}),this.dollar_balance_text=this.add.text(20,50,"$ "+this.dollar_balance,{font:"26px Arial",fill:"#1E90FF",backgroundColor:"white"});var e={font:"14px Arial",fill:"#66CDAA",backgroundColor:"white"};this.happiness_text=this.add.text(20,100,"Happiness: "+this.parameters.happiness,e),this.sea_life_text=this.add.text(20,116,"Sea life: "+this.parameters.sea_life,e),this.plastic_text=this.add.text(20,132,"Plastic: "+this.parameters.plastic,e),this.sea_level_text=this.add.text(20,148,"Sea level: "+this.parameters.sea_level,e),this.ph_text=this.add.text(20,160,"PH level: "+this.parameters.ph,e),this.o2_text=this.add.text(20,176,"O2: "+this.parameters.o2,e),this.co2_text=this.add.text(20,192,"CO2: "+this.parameters.co2,e),this.nutrition_text=this.add.text(20,208,"Nutrition: "+this.parameters.nutrition,e),this.noise_text=this.add.text(20,224,"Noise: "+this.parameters.noise,e),this.temp_text=this.add.text(20,240,"Temp: "+this.parameters.temp,e)}},{key:"clickHandler",value:function(e){if(this.balance-10>0){var t=e;this.balance-=10,t.off("clicked",this.clickHandler),t.input.enabled=!1,t.setVisible(!1)}}},{key:"create",value:function(){this.cameras.main.setBounds(0,0,2048,2048),this.add.image(0,0,"map").setOrigin(0),this.initialize_swimming_entities(),this.loadDiamonds(20),(a=this.add.video(960,500,"intro")).play(!0),this.time.delayedCall(4e3,this.stopVideo,[])}},{key:"stopVideo",value:function(){I=!0,a.stop(),a.destroy()}},{key:"update",value:function(e,t){if(I){if(this.balance_text.setText("Balance: ".concat(this.balance)),this.plastic_text.setText("Plastic: ".concat(this.parameters.plastic)),this.happiness_text.setText("Happiness: ".concat(this.parameters.happiness)),-1===T)return;if((T+=t)>=2e4)T=0;else for(var i=T/2e4,a=0;a<D.length;a+=1){var s=D[a].curve.getPoint(i);D[a].image.setPosition(s.x,s.y)}}}},{key:"initialize_swimming_entities",value:function(){this.add.graphics().lineStyle(0,16777215,1),D=[{image:this.add.image(0,0,"shark").setScale(.5),curve:new Phaser.Curves.Spline(this.get_points(100,1e3,1900,300,100,-100,3))},{image:this.add.image(0,0,"turtle").setScale(.2),curve:new Phaser.Curves.Spline(this.get_points(2e3,900,350,450,30,-90,3))},{image:this.add.image(0,0,"tuna").setScale(1/8),curve:new Phaser.Curves.Spline(this.get_points(1200,-300,300,1900,30,-90,3))},{image:this.add.image(0,0,"humpback").setScale(1/3),curve:new Phaser.Curves.Spline(this.get_points(2600,500,300,1200,30,-90,3))},{image:this.add.image(0,0,"fishing_boat").setScale(.5),curve:new Phaser.Curves.Spline(this.get_points(900,550,905,555,30,-90,3))},{image:this.add.image(0,0,"cruise_ship").setScale(1/7).setInteractive().on("clicked",this.dump_plastic),curve:new Phaser.Curves.Spline(this.get_points(1800,0,1100,1200,150,-55,5))},{image:this.add.image(0,0,"sargassum").setScale(1/6),curve:new Phaser.Curves.Spline(this.get_points(700,700,705,705,30,-90,3))}],this.input.on("gameobjectup",(function(e,t){t.emit("clicked",t,!1)}),this),T=0}},{key:"get_rundom_plastic_image",value:function(e,t){var i,a=Phaser.Math.Between(0,2);return 0===a?i=s.add.image(e,t,"microplastic").setScale(1/6):1===a?i=s.add.image(e,t,"plasticbag").setScale(1/6):2===a&&(i=s.add.image(e,t,"plastic").setScale(1/6)),i}},{key:"dump_plastic",value:function(e){var t=s.get_rundom_plastic_image(e.x,e.y).setScale(1/6).setInteractive();t.on("clicked",s.collect_plastic),D.push({curve:s.get_rundom_swimming_curve(e.x,e.y),image:t}),s.input.on("collectobjectup",(function(e,t){t.emit("clicked",t,!0)}),s),s.parameters.plastic+=1,s.parameters.happiness+=1}},{key:"collect_plastic",value:function(e){var t=e;t.off("clicked",this.clickHandler),t.input.enabled=!1,t.setVisible(!1),s.parameters.plastic-=1}},{key:"get_rundom_swimming_curve",value:function(e,t){var i=this.add.graphics();i.lineStyle(0,16777215,1);var a=new Phaser.Curves.Spline(this.get_points(e,t,Phaser.Math.Between(300,2500),Phaser.Math.Between(50,1500),Phaser.Math.Between(1,300),Phaser.Math.Between(1,300),Phaser.Math.Between(1,11)));return a.draw(i,Phaser.Math.Between(1,100)),a}},{key:"get_points",value:function(e,t,i,a,s,n,r){return this.line=new Phaser.Geom.Line(e,t,i,a),this.points=[],this.points.push(this.line.getPointA()),this.length=Phaser.Geom.Line.Length(this.line),this.waves=Math.ceil(this.length/200),this.vx=100,this.vy=100,this.prevX=this.line.x1,this.prevY=this.line.y1,this.generate_points_set(s,n,r),this.points.push(this.line.getPointB()),this.points}},{key:"generate_points_set",value:function(e,t,i){for(var a=1;a<=this.waves;a+=1){var s=this.line.getPoint(a/this.waves),n=new Phaser.Geom.Line(this.prevX,this.prevY,s.x,s.y),r=Phaser.Geom.Line.GetNormal(n),h=Phaser.Geom.Line.GetMidPoint(n);this.points.push(this.get_vector(a,i,h,r,e,t)),this.prevX=s.x,this.prevY=s.y,this.vx*=-1,this.vy*=-1}}},{key:"get_vector",value:function(e,t,i,a,s,n){return e%t===0?new Phaser.Math.Vector2(i.x+a.x*this.vx,i.y+a.y*this.vy):new Phaser.Math.Vector2(i.x+s+a.x*this.vx,i.y-n+a.y*this.vy)}}]),i}(Phaser.Scene);t.default=function(){var e={type:Phaser.AUTO,width:1e3,height:1200,scene:N,physics:{default:"matter",matter:{debug:!0,gravity:{x:0,y:0}}}};return new Phaser.Game(e).scale.scaleMode=Phaser.Scale.RESIZE,r.a.createElement(h.a,{display:"flex"},r.a.createElement(h.a,{m:"auto",textAlign:"center"},r.a.createElement("div",{id:"game",className:"game-screen"})))}},88:function(e,t,i){e.exports=i.p+"static/media/largemap.72d9c851.png"},89:function(e,t,i){e.exports=i.p+"static/media/shark.f7bb7bd6.png"},90:function(e,t,i){e.exports=i.p+"static/media/green-sea-turtle.b18cc465.png"},91:function(e,t,i){e.exports=i.p+"static/media/bluefintuna.69443f1b.png"},92:function(e,t,i){e.exports=i.p+"static/media/humpback.62c70730.png"},93:function(e,t,i){e.exports=i.p+"static/media/fishing-boat.6e792d50.png"},94:function(e,t,i){e.exports=i.p+"static/media/cruise-ship.f1761113.png"},95:function(e,t,i){e.exports=i.p+"static/media/plastic.11f9b5ea.png"},96:function(e,t,i){e.exports=i.p+"static/media/microplastics.7c86267a.png"},97:function(e,t,i){e.exports=i.p+"static/media/plasticbag.e5eaa4f3.png"},98:function(e,t,i){e.exports=i.p+"static/media/Sargassum.011fe6ea.png"},99:function(e,t,i){e.exports=i.p+"static/media/intro.3b507568.mp4"}}]);