YUI.add("gesture-simulate",function(a){(function(){var h={tap:1,doubletap:1,press:1,move:1,flick:1,pinch:1,rotate:1},e={touchstart:1,touchmove:1,touchend:1,touchcancel:1},o=a.config.doc,m,g=20,k,j,c={HOLD_TAP:10,DELAY_TAP:10,HOLD_PRESS:3000,MIN_HOLD_PRESS:1000,MAX_HOLD_PRESS:60000,DISTANCE_MOVE:200,DURATION_MOVE:1000,MAX_DURATION_MOVE:5000,MIN_VELOCITY_FLICK:1.3,DISTANCE_FLICK:200,DURATION_FLICK:1000,MAX_DURATION_FLICK:5000,DURATION_PINCH:1000},i="touchstart",q="touchmove",r="touchend",u="gesturestart",f="gesturechange",b="gestureend",v="mouseup",w="mousemove",s="mousedown",n="click",d="dblclick",p="x",t="y";function l(x){if(!x){a.error(NAME+": invalid target node");}this.node=x;this.target=a.Node.getDOMNode(x);k=this.node.getX()+this.target.getBoundingClientRect().width/2;j=this.node.getY()+this.target.getBoundingClientRect().height/2;}l.prototype={_toRadian:function(x){return x*(Math.PI/180);},_calculateDefaultPoint:function(x){if(!a.Lang.isArray(x)||x.length===0){x=[k,j];}else{if(x.length==1){x[1]=this.target.getBoundingClientRect().height/2;}x[0]=this.node.getX()+x[0];x[1]=this.node.getY()+x[1];}return x;},rotate:function(B,x,E,F,C,y,G){var D,A=E,z=F;if(!a.Lang.isNumber(A)||!a.Lang.isNumber(z)||A<0||z<0){D=(this.target.offsetWidth<this.target.offsetHeight)?this.target.offsetWidth/2:this.target.offsetHeight/2;A=D;z=D;}if(!a.Lang.isNumber(G)){a.error(NAME+"Invalid rotation detected.");}this.pinch(B,x,A,z,C,y,G);},pinch:function(J,W,M,C,y,D,L){var I,T=g,H,K=0,P=M,N=C,V,G,E,U,S,X,B,R,x,F,A={start:[],end:[]},z={start:[],end:[]},Q;W=this._calculateDefaultPoint(W);if(!a.Lang.isNumber(P)||!a.Lang.isNumber(N)||P<0||N<0){a.error(NAME+"Invalid startRadius and endRadius detected.");}if(!a.Lang.isNumber(y)||y<=0){y=c.DURATION_PINCH;}if(!a.Lang.isNumber(D)){D=0;}else{D=D%360;if(D<0){D+=360;}}if(!a.Lang.isNumber(L)){L=0;}a.AsyncQueue.defaults.timeout=T;I=new a.AsyncQueue();G=W[0];E=W[1];B=D;R=D+L;A.start=[G+P*Math.sin(this._toRadian(B)),E-P*Math.cos(this._toRadian(B))];A.end=[G+N*Math.sin(this._toRadian(R-B)),E-N*Math.cos(this._toRadian(R-B))];z.start=[G-P*Math.sin(this._toRadian(B)),E+P*Math.cos(this._toRadian(B))];z.end=[G-N*Math.sin(this._toRadian(R-B)),E+N*Math.cos(this._toRadian(R-B))];U=1;S=C/M;I.add({fn:function(){var Z,Y,ab,aa;Z={pageX:A.start[0],pageY:A.start[1],clientX:A.start[0],clientY:A.start[1]};Y={pageX:z.start[0],pageY:z.start[1],clientX:z.start[0],clientY:z.start[1]};aa=this._createTouchList([a.merge({identifier:K++},Z),a.merge({identifier:K++},Y)]);ab={pageX:(A.start[0]+z.start[0])/2,pageY:(A.start[0]+z.start[1])/2,clientX:(A.start[0]+z.start[0])/2,clientY:(A.start[0]+z.start[1])/2};this._simulateEvent(this.target,i,a.merge({touches:aa,targetTouches:aa,changedTouches:aa,scale:U,rotation:B},ab));if(a.UA.ios>=2){this._simulateEvent(this.target,u,a.merge({scale:U,rotation:B},ab));}},timeout:0,context:this});Q=Math.floor(y/T);V=(N-P)/Q;X=(S-U)/Q;x=(R-B)/Q;F=this._toRadian(R-B)/Q;for(var O=0;O<Q;O++){I.add({fn:function(ab){var af=P+(V)*ab,ad=G+af*Math.sin(B+F*ab),Z=E-af*Math.cos(B+F*ab),aa=G-af*Math.sin(B+F*ab),Y=E+af*Math.cos(B+F*ab),aj=(ad+aa)/2,ai=(Z+Y)/2,ah,ag,ae,ac;ah={pageX:ad,pageY:Z,clientX:ad,clientY:Z};ag={pageX:aa,pageY:Y,clientX:aa,clientY:Y};ac=this._createTouchList([a.merge({identifier:K++},ah),a.merge({identifier:K++},ag)]);ae={pageX:aj,pageY:ai,clientX:aj,clientY:ai};this._simulateEvent(this.target,q,a.merge({touches:ac,targetTouches:ac,changedTouches:ac,scale:U+X*ab,rotation:B+x*ab},ae));if(a.UA.ios>=2){this._simulateEvent(this.target,f,a.merge({scale:U+X*ab,rotation:B+x*ab},ae));}},args:[O],context:this});}I.add({fn:function(){var ab=this._getEmptyTouchList(),Z,Y,ac,aa;Z={pageX:A.end[0],pageY:A.end[1],clientX:A.end[0],clientY:A.end[1]};Y={pageX:z.end[0],pageY:z.end[1],clientX:z.end[0],clientY:z.end[1]};aa=this._createTouchList([a.merge({identifier:K++},Z),a.merge({identifier:K++},Y)]);ac={pageX:(A.end[0]+z.end[0])/2,pageY:(A.end[0]+z.end[1])/2,clientX:(A.end[0]+z.end[0])/2,clientY:(A.end[0]+z.end[1])/2};if(a.UA.ios>=2){this._simulateEvent(this.target,b,a.merge({scale:S,rotation:R},ac));}this._simulateEvent(this.target,r,a.merge({touches:ab,targetTouches:ab,changedTouches:aa,scale:S,rotation:R},ac));},context:this});if(J&&a.Lang.isFunction(J)){I.add({fn:J,context:this.node});}I.run();},tap:function(z,E,x,y,B){var G=new a.AsyncQueue(),F=this._getEmptyTouchList(),C,D,A;E=this._calculateDefaultPoint(E);if(!a.Lang.isNumber(x)||x<1){x=1;}if(!a.Lang.isNumber(y)){y=c.HOLD_TAP;}if(!a.Lang.isNumber(B)){B=c.DELAY_TAP;}D={pageX:E[0],pageY:E[1],clientX:E[0],clientY:E[1]};C=this._createTouchList([a.merge({identifier:0},D)]);for(A=0;A<x;A++){G.add({fn:function(){this._simulateEvent(this.target,i,a.merge({touches:C,targetTouches:C,changedTouches:C},D));},context:this,timeout:(A===0)?0:B});G.add({fn:function(){this._simulateEvent(this.target,r,a.merge({touches:F,targetTouches:F,changedTouches:C},D));},context:this,timeout:y});}if(x>1&&!((a.config.win&&("ontouchstart" in a.config.win))&&!(a.UA.chrome&&a.UA.chrome<6))){G.add({fn:function(){this._simulateEvent(this.target,d,D);},context:this});}if(z&&a.Lang.isFunction(z)){G.add({fn:z,context:this.node});}G.run();},flick:function(y,x,z,C,B){var A;x=this._calculateDefaultPoint(x);if(!a.Lang.isString(z)){z=p;}else{z=z.toLowerCase();if(z!==p&&z!==t){a.error(NAME+"(flick): Only x or y axis allowed");}}if(!a.Lang.isNumber(C)){C=c.DISTANCE_FLICK;}if(!a.Lang.isNumber(B)){B=c.DURATION_FLICK;}else{if(B>c.MAX_DURATION_FLICK){B=c.MAX_DURATION_FLICK;}}if(Math.abs(C)/B<c.MIN_VELOCITY_FLICK){B=Math.abs(C)/c.MIN_VELOCITY_FLICK;}A={start:a.clone(x),end:[(z===p)?x[0]+C:x[0],(z===t)?x[1]+C:x[1]]};this._move(y,A,B);},move:function(x,z,y){var A;if(!a.Lang.isObject(z)){z={point:this._calculateDefaultPoint([]),xdist:c.DISTANCE_MOVE,ydist:0};}else{if(!a.Lang.isArray(z.point)){z.point=this._calculateDefaultPoint([]);}else{z.point=this._calculateDefaultPoint(z.point);}if(!a.Lang.isNumber(z.xdist)){z.xdist=c.DISTANCE_MOVE;}if(!a.Lang.isNumber(z.ydist)){z.ydist=0;}}if(!a.Lang.isNumber(y)){y=c.DURATION_MOVE;
}else{if(y>c.MAX_DURATION_MOVE){y=c.MAX_DURATION_MOVE;}}A={start:a.clone(z.point),end:[z.point[0]+z.xdist,z.point[1]+z.ydist]};this._move(x,A,y);},_move:function(z,F,A){var G,y=g,C,E,D,x=0;if(!a.Lang.isNumber(A)){A=c.DURATION_MOVE;}else{if(A>c.MAX_DURATION_MOVE){A=c.MAX_DURATION_MOVE;}}if(!a.Lang.isObject(F)){F={start:[k,j],end:[k+c.DISTANCE_MOVE,j]};}else{if(!a.Lang.isArray(F.start)){F.start=[k,j];}if(!a.Lang.isArray(F.end)){F.end=[k+c.DISTANCE_MOVE,j];}}a.AsyncQueue.defaults.timeout=y;G=new a.AsyncQueue();G.add({fn:function(){var I={pageX:F.start[0],pageY:F.start[1],clientX:F.start[0],clientY:F.start[1]},H=this._createTouchList([a.merge({identifier:x++},I)]);this._simulateEvent(this.target,i,a.merge({touches:H,targetTouches:H,changedTouches:H},I));},timeout:0,context:this});C=Math.floor(A/y);E=(F.end[0]-F.start[0])/C;D=(F.end[1]-F.start[1])/C;for(var B=0;B<C;B++){G.add({fn:function(J){var I=F.start[0]+(E*J),H=F.start[1]+(D*J),L={pageX:I,pageY:H,clientX:I,clientY:H},K=this._createTouchList([a.merge({identifier:x++},L)]);this._simulateEvent(this.target,q,a.merge({touches:K,targetTouches:K,changedTouches:K},L));},args:[B],context:this});}G.add({fn:function(){var I={pageX:F.end[0],pageY:F.end[1],clientX:F.end[0],clientY:F.end[1]},H=this._createTouchList([a.merge({identifier:x},I)]);this._simulateEvent(this.target,q,a.merge({touches:H,targetTouches:H,changedTouches:H},I));},timeout:0,context:this});G.add({fn:function(){var J={pageX:F.end[0],pageY:F.end[1],clientX:F.end[0],clientY:F.end[1]},I=this._getEmptyTouchList(),H=this._createTouchList([a.merge({identifier:x},J)]);this._simulateEvent(this.target,r,a.merge({touches:I,targetTouches:I,changedTouches:H},J));},context:this});if(z&&a.Lang.isFunction(z)){G.add({fn:z,context:this.node});}G.run();},_getEmptyTouchList:function(){if(!m){m=this._createTouchList([]);}return m;},_createTouchList:function(z){var A=[],y,x=this;if(!!z&&a.Lang.isArray(z)){if(a.UA.android&&a.UA.android>=4||a.UA.ios&&a.UA.ios>=2){a.each(z,function(B){if(!B.identifier){B.identifier=0;}if(!B.pageX){B.pageX=0;}if(!B.pageY){B.pageY=0;}if(!B.screenX){B.screenX=0;}if(!B.screenY){B.screenY=0;}A.push(o.createTouch(a.config.win,x.target,B.identifier,B.pageX,B.pageY,B.screenX,B.screenY));});y=o.createTouchList.apply(o,A);}else{if(a.UA.ios&&a.UA.ios<2){a.error(NAME+": No touch event simulation framework present.");}else{y=[];a.each(z,function(B){if(!B.identifier){B.identifier=0;}if(!B.clientX){B.clientX=0;}if(!B.clientY){B.clientY=0;}if(!B.pageX){B.pageX=0;}if(!B.pageY){B.pageY=0;}if(!B.screenX){B.screenX=0;}if(!B.screenY){B.screenY=0;}y.push({target:x.target,identifier:B.identifier,clientX:B.clientX,clientY:B.clientY,pageX:B.pageX,pageY:B.pageY,screenX:B.screenX,screenY:B.screenY});});y.item=function(B){return y[B];};}}}else{a.error(NAME+": Invalid touchPoints passed");}return y;},_simulateEvent:function(A,y,x){var z;if(e[y]){if((a.config.win&&("ontouchstart" in a.config.win))&&!(a.UA.chrome&&a.UA.chrome<6)){a.Event.simulate(A,y,x);}else{if(this._isSingleTouch(x.touches,x.targetTouches,x.changedTouches)){y={touchstart:s,touchmove:w,touchend:v}[y];x.button=0;x.relatedTarget=null;z=(y===v)?x.changedTouches:x.touches;x=a.mix(x,{screenX:z.item(0).screenX,screenY:z.item(0).screenY,clientX:z.item(0).clientX,clientY:z.item(0).clientY},true);a.Event.simulate(A,y,x);if(y==v){a.Event.simulate(A,n,x);}}else{a.error("_simulateEvent(): Event '"+y+"' has multi touch objects that can't be simulated in your platform.");}}}else{a.Event.simulate(A,y,x);}},_isSingleTouch:function(z,y,x){return(z&&(z.length<=1))&&(y&&(y.length<=1))&&(x&&(x.length<=1));}};a.GestureSimulation=l;a.GestureSimulation.defaults=c;a.GestureSimulation.GESTURES=h;a.Event.simulateGesture=function(B,A,z,x){if(B instanceof HTMLElement){B=a.Node.one(B);}var y=new a.GestureSimulation(B);A=A.toLowerCase();if(!x&&a.Lang.isFunction(z)){x=z;z={};}z=z||{};if(h[A]){switch(A){case"tap":y.tap(x,z.point,z.times,z.hold,z.delay);break;case"doubletap":y.tap(x,z.point,2);break;case"press":if(!a.Lang.isNumber(z.hold)){z.hold=c.HOLD_PRESS;}else{if(z.hold<c.MIN_HOLD_PRESS){z.hold=c.MIN_HOLD_PRESS;}else{if(z.hold>c.MAX_HOLD_PRESS){z.hold=c.MAX_HOLD_PRESS;}}}y.tap(x,z.point,1,z.hold);break;case"move":y.move(x,z.path,z.duration);break;case"flick":y.flick(x,z.point,z.axis,z.distance,z.duration);break;case"pinch":y.pinch(x,z.center,z.r1,z.r2,z.duration,z.start,z.rotation);break;case"rotate":y.rotate(x,z.center,z.r1,z.r2,z.duration,z.start,z.rotation);break;}}else{a.error(NAME+": Not a supported gesture simulation: "+A);}};})();},"@VERSION@",{requires:["event-simulate","async-queue","node-screen"]});