/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-12-06 15:41:09
 * @version $Id$
 */
(function($){
	$(function(){





	});
})(jQuery);
//由于放在手机内容模板中的文章内容是在swiper-wrapper下的，所以所有的img的祖先类，由body变为   body

//zepto.js代码
(function($){

$(document).ready(function(){
	//弹出层的初始化
	$fixediv=$("<div></div>");
	$fixediv.addClass("fixed-wrap");
	//添加alert-imgbox
	$imgdiv=$("<div class='alert-imgbox'></div>");
	//循环将图片添加到imgdiv中
	var imgarr=$("body img");
	//console.log($("body img:first").attr("src"));
	console.log($(imgarr[0]).attr("src"));
	for(var i=0;i<imgarr.length;i++){
		var $imgtemp=$("<img/>");
		$imgtemp.attr({
			"src":$(imgarr[i]).attr("src"),
			"alt":$(imgarr[i]).attr("alt"),
			"title":$(imgarr[i]).attr("title")
			});
		//将图片插入imgbox中
		$imgdiv.append($imgtemp);
	}
	//将$imgdiv插入$fixediv中
	$fixediv.append($imgdiv);
	//将$fixediv插入html中
	$("html").append($fixediv)


	// $(".img-box").on({
	// 	"tap":function(){
	// 		alert($(this).attr("alt"));
	// 	}


	// },"img");
	//给要触发tap的img添加标记字段,循环添加
	var imglen=$("body img");
	for(var i=0;i<$("body img").length;i++){
		$(imglen[i]).attr({"_th_index":i});
	}

	touch_obj.init().addlisten();
	//隐藏起来
	$(".fixed-wrap").hide();


});

	//用一个对象来做触摸的功能吧
	var touch_obj={
		//移动时要用到的实时位移
		leftx:0,
		topy:0,
		//用一个数组对象来标志每一次触摸的的实时数据
		toucharr:[
			{bgx:0,bgy:0,leftx:0,topy:0,movewidth:0}
		],
		//屏幕的宽度，即图片的宽度
		oriwidth:0,
		
		//用一个属性标识，这是第几次touch
		istouched:0,
		//距离总和
		movesum:0,
		//最后滚动静止后的位移
		finalleft:0,
		//标识当前第几张图片
		img_index:0,
		//图片的总数
		img_num:0,
		//次数标记
		tiwce:false,
		//给弹出的图片盒子添加监听
		addlisten:function(){
			var self=this;
			
			//touchstart事件来定初始位置
			$(".fixed-wrap").on({
			"touchstart":function(e){
				//根据触摸的次数，添加相应次数的触摸标识
				
				
					//console.log("self.istouched",self.istouched);
					//妈个鸡，这点搞了好久，数组的对象扩展，要先建对象，在扩展字段，不然找不到
					self.toucharr[self.istouched]={};
					self.toucharr[self.istouched].bgx=e.touches[self.istouched].clientX;
					self.toucharr[self.istouched].bgy=e.touches[self.istouched].clientY;
					self.istouched++;

					if(e.touches.length==2 && self.tiwce==ture){
						alert("有两个touch线程哦");
					}else if(e.touches.length==2){
						self.tiwce=true;
					}
					// if(self.tiwce){
					// 	alert("标识变成true了");
					// 	？？由此测试可知，这个e.touches在屏幕上还有触碰点的时候，对象数组里面的信息不会被销毁，但是会被后面的重写？？
					// 	？？比如第一次触碰里三个线程，touches[2],但是两只手指放开后，后面在放上一根手指，这个时候后面放上的手指的touch信息就会写在touches[1]中？
					// 	？？所以要解决这个后面加上的touches,覆盖之前的数据的现象，计算距离的方式就要改变，不要计算初始点和最终点的距离了，要计算每一次的变化？？
					// 	？？这个是后begain的位置也要改变？？
					// }
					
	
			},
			//touchmove事件获取值，计算left值
			"touchmove":function(e){
				
				e.preventDefault();

			
				//获取某一次的触摸移动距离，是不是应该加一个循环？？？？
				

				//这个就麻烦了，这里的算法有问题，多点触碰的时候？？？？？？？？，触碰点撤销的时候，touch[]数组如何算
				var tempsum=0;//这个时候的总和就不是总共的距离的总和了，而是变化的总和
				for(var i=0;i<self.toucharr.length;i++){
					//靠，这里也能导致问题....,如果不加一个这个判断，加了多个触碰之后，只剩下前面的触电移动无效？？？？不是说不会销毁touches数组么，？？？？？
					if(e.touches[i]){
						self.toucharr[i].movewidth=e.touches[i].clientX -self.toucharr[i].bgx;
						self.toucharr[i].bgx=e.touches[i].clientX;
						tempsum+=self.toucharr[i].movewidth;
					}
					
				}
				//这个用来计算变化的量，这个标识变量，在所有线程都结束的时候释放
				self.movesum+=tempsum;
				//这个就麻烦了，这里的算法有问题，多点触碰的时候？？？？？？？？

				//这里的判断的数据应该是总的移动宽度，所以要有个总触摸移动距离标识
				if(Math.abs(self.movesum)<self.oriwidth){
					//每一次移动的变化的量，举例touchstart点的位置
				
					self.leftx=self.movesum+self.finalleft;

					self.move();
				}else{
					// alert("移动距离已经到顶了");
					self.movesum=(self.movesum/Math.abs(self.movesum))*self.oriwidth;
				}
				 
			},
			"touchend":function(e){
				if(self.istouched==1){
					//touchend无法获取结束点的坐标,所以要用其他参数来判断
				if(self.movesum<0.3*(-1)*self.oriwidth){
					//console.log("left move a half");
					if (self.img_index==self.img_num-1) {

					}else{
						//图片序号减一，但是盒子像左移
						self.img_index++;
						//图片切换		
					};
					self.endmove();	
					
					//向右移动，大于half,图片序号减少
				}else if (self.movesum>0.3*self.oriwidth) {
					//console.log("right move a half");
					if (self.img_index==0) {

					}else{
						//图片序号减少
						self.img_index--;
						//图片切换
					};
					self.endmove();		
				}else{
					// self.finalleft=(-1)*self.oriwidth;
					//图片切换
					self.endmove();	
				};

				self.istouched--;
				//清空记录数组,不让上一次移动的数据会影响到下一次移动的数据求和操作，导致错误
				self.toucharr=[];
				self.movesum=0;
				}else{
					self.istouched--;
				
					
				}
				
			}

			},"img");
			
			//这个图片的触摸，fixeddiv出现
			$("body img").on("tap",function(){
					//console.log("676767");
					//fixed出现，定义当前的移动位置
					$(".fixed-wrap").show();
					
					self.img_index=parseInt($(this).attr("_th_index"),10);
					//根据当前的图片计算finalleft
					self.finalleft=self.img_index*(-1)*self.oriwidth;
					$(".alert-imgbox").css({"left":self.finalleft+"px"});
					console.log(self.img_index,self.finalleft,self.oriwidth);

			});
			//阻止冒泡
			$(".alert-imgbox img").on("tap",function(e){
					e.preventDefault();
					// $(".fixed-wrap").hide();
					// return false;
					return false;
			});
			$(".alert-imgbox").on("tap",function(e){
				console.log("have taped fixed-wrap");
					e.preventDefault();
					$(".fixed-wrap").hide();
					return false;
			});




		},
		//图片移动的函数
		move:function(){
			var self=this;
			//设置alert-imgbox的位置
			$(".alert-imgbox").css({
				"left": self.leftx+'px'
			});
			// console.log(self.leftx);

		},
		//touchend触发的移动函数
		endmove:function(){
			var self=this;
			//根据当前的图片计算finalleft
			self.finalleft=self.img_index*(-1)*self.oriwidth;
			//移动
			$(".alert-imgbox").animate({"left":self.finalleft+"px"},"100","ease-in-out");

		},
		//初始化
		init:function(){
			var self=this;
			self.oriwidth=$(".fixed-wrap").width();
			self.leftx=0;
			self.finalleft=0;
			self.img_num=$(".alert-imgbox>img").length;
			//console.log(self.oriwidth);
			return this;

		}



	};

})(Zepto);

//这个没有加load事件，自执行用来让$表示的是zepto，区别jquery,这个东西会出错？？？、
(function($){



})(Zepto);