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
//���ڷ����ֻ�����ģ���е�������������swiper-wrapper�µģ��������е�img�������࣬��body��Ϊ   body

//zepto.js����
(function($){

$(document).ready(function(){
	//������ĳ�ʼ��
	$fixediv=$("<div></div>");
	$fixediv.addClass("fixed-wrap");
	//���alert-imgbox
	$imgdiv=$("<div class='alert-imgbox'></div>");
	//ѭ����ͼƬ��ӵ�imgdiv��
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
		//��ͼƬ����imgbox��
		$imgdiv.append($imgtemp);
	}
	//��$imgdiv����$fixediv��
	$fixediv.append($imgdiv);
	//��$fixediv����html��
	$("html").append($fixediv)


	// $(".img-box").on({
	// 	"tap":function(){
	// 		alert($(this).attr("alt"));
	// 	}


	// },"img");
	//��Ҫ����tap��img��ӱ���ֶ�,ѭ�����
	var imglen=$("body img");
	for(var i=0;i<$("body img").length;i++){
		$(imglen[i]).attr({"_th_index":i});
	}

	touch_obj.init().addlisten();
	//��������
	$(".fixed-wrap").hide();


});

	//��һ���������������Ĺ��ܰ�
	var touch_obj={
		//�ƶ�ʱҪ�õ���ʵʱλ��
		leftx:0,
		topy:0,
		//��һ�������������־ÿһ�δ����ĵ�ʵʱ����
		toucharr:[
			{bgx:0,bgy:0,leftx:0,topy:0,movewidth:0}
		],
		//��Ļ�Ŀ�ȣ���ͼƬ�Ŀ��
		oriwidth:0,
		
		//��һ�����Ա�ʶ�����ǵڼ���touch
		istouched:0,
		//�����ܺ�
		movesum:0,
		//��������ֹ���λ��
		finalleft:0,
		//��ʶ��ǰ�ڼ���ͼƬ
		img_index:0,
		//ͼƬ������
		img_num:0,
		//�������
		tiwce:false,
		//��������ͼƬ������Ӽ���
		addlisten:function(){
			var self=this;
			
			//touchstart�¼�������ʼλ��
			$(".fixed-wrap").on({
			"touchstart":function(e){
				//���ݴ����Ĵ����������Ӧ�����Ĵ�����ʶ
				
				
					//console.log("self.istouched",self.istouched);
					//������������˺þã�����Ķ�����չ��Ҫ�Ƚ���������չ�ֶΣ���Ȼ�Ҳ���
					self.toucharr[self.istouched]={};
					self.toucharr[self.istouched].bgx=e.touches[self.istouched].clientX;
					self.toucharr[self.istouched].bgy=e.touches[self.istouched].clientY;
					self.istouched++;

					if(e.touches.length==2 && self.tiwce==ture){
						alert("������touch�߳�Ŷ");
					}else if(e.touches.length==2){
						self.tiwce=true;
					}
					// if(self.tiwce){
					// 	alert("��ʶ���true��");
					// 	�����ɴ˲��Կ�֪�����e.touches����Ļ�ϻ��д������ʱ�򣬶��������������Ϣ���ᱻ���٣����ǻᱻ�������д����
					// 	���������һ�δ����������̣߳�touches[2],������ֻ��ָ�ſ��󣬺����ڷ���һ����ָ�����ʱ�������ϵ���ָ��touch��Ϣ�ͻ�д��touches[1]�У�
					// 	��������Ҫ������������ϵ�touches,����֮ǰ�����ݵ����󣬼������ķ�ʽ��Ҫ�ı䣬��Ҫ�����ʼ������յ�ľ����ˣ�Ҫ����ÿһ�εı仯����
					// 	��������Ǻ�begain��λ��ҲҪ�ı䣿��
					// }
					
	
			},
			//touchmove�¼���ȡֵ������leftֵ
			"touchmove":function(e){
				
				e.preventDefault();

			
				//��ȡĳһ�εĴ����ƶ����룬�ǲ���Ӧ�ü�һ��ѭ����������
				

				//������鷳�ˣ�������㷨�����⣬��㴥����ʱ�򣿣��������������������㳷����ʱ��touch[]���������
				var tempsum=0;//���ʱ����ܺ;Ͳ����ܹ��ľ�����ܺ��ˣ����Ǳ仯���ܺ�
				for(var i=0;i<self.toucharr.length;i++){
					//��������Ҳ�ܵ�������....,�������һ������жϣ����˶������֮��ֻʣ��ǰ��Ĵ����ƶ���Ч������������˵��������touches����ô������������
					if(e.touches[i]){
						self.toucharr[i].movewidth=e.touches[i].clientX -self.toucharr[i].bgx;
						self.toucharr[i].bgx=e.touches[i].clientX;
						tempsum+=self.toucharr[i].movewidth;
					}
					
				}
				//�����������仯�����������ʶ�������������̶߳�������ʱ���ͷ�
				self.movesum+=tempsum;
				//������鷳�ˣ�������㷨�����⣬��㴥����ʱ�򣿣�������������

				//������жϵ�����Ӧ�����ܵ��ƶ���ȣ�����Ҫ�и��ܴ����ƶ������ʶ
				if(Math.abs(self.movesum)<self.oriwidth){
					//ÿһ���ƶ��ı仯����������touchstart���λ��
				
					self.leftx=self.movesum+self.finalleft;

					self.move();
				}else{
					// alert("�ƶ������Ѿ�������");
					self.movesum=(self.movesum/Math.abs(self.movesum))*self.oriwidth;
				}
				 
			},
			"touchend":function(e){
				if(self.istouched==1){
					//touchend�޷���ȡ�����������,����Ҫ�������������ж�
				if(self.movesum<0.3*(-1)*self.oriwidth){
					//console.log("left move a half");
					if (self.img_index==self.img_num-1) {

					}else{
						//ͼƬ��ż�һ�����Ǻ���������
						self.img_index++;
						//ͼƬ�л�		
					};
					self.endmove();	
					
					//�����ƶ�������half,ͼƬ��ż���
				}else if (self.movesum>0.3*self.oriwidth) {
					//console.log("right move a half");
					if (self.img_index==0) {

					}else{
						//ͼƬ��ż���
						self.img_index--;
						//ͼƬ�л�
					};
					self.endmove();		
				}else{
					// self.finalleft=(-1)*self.oriwidth;
					//ͼƬ�л�
					self.endmove();	
				};

				self.istouched--;
				//��ռ�¼����,������һ���ƶ������ݻ�Ӱ�쵽��һ���ƶ���������Ͳ��������´���
				self.toucharr=[];
				self.movesum=0;
				}else{
					self.istouched--;
				
					
				}
				
			}

			},"img");
			
			//���ͼƬ�Ĵ�����fixeddiv����
			$("body img").on("tap",function(){
					//console.log("676767");
					//fixed���֣����嵱ǰ���ƶ�λ��
					$(".fixed-wrap").show();
					
					self.img_index=parseInt($(this).attr("_th_index"),10);
					//���ݵ�ǰ��ͼƬ����finalleft
					self.finalleft=self.img_index*(-1)*self.oriwidth;
					$(".alert-imgbox").css({"left":self.finalleft+"px"});
					console.log(self.img_index,self.finalleft,self.oriwidth);

			});
			//��ֹð��
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
		//ͼƬ�ƶ��ĺ���
		move:function(){
			var self=this;
			//����alert-imgbox��λ��
			$(".alert-imgbox").css({
				"left": self.leftx+'px'
			});
			// console.log(self.leftx);

		},
		//touchend�������ƶ�����
		endmove:function(){
			var self=this;
			//���ݵ�ǰ��ͼƬ����finalleft
			self.finalleft=self.img_index*(-1)*self.oriwidth;
			//�ƶ�
			$(".alert-imgbox").animate({"left":self.finalleft+"px"},"100","ease-in-out");

		},
		//��ʼ��
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

//���û�м�load�¼�����ִ��������$��ʾ����zepto������jquery,������������������
(function($){



})(Zepto);