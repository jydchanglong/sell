<template>
	<transition name="move">
		<div v-show="showFlag" class="food" ref="food">
			<div class="food-content">
				<div class="image-header">
					<img :src="food.image" alt="" />
					<div class="back" @click="hide">
						<i class="icon-arrow_lift"></i>						
					</div>
				</div>
				<div class="content">
					<h1 class="title">{{food.name}}</h1>
					<div class="detail">
						<span class="sell-count">月售{{food.selCount}}份</span>
						<span class="rating">好评率</span>
					</div>
					<div class="price">
						<span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
					</div>
					<div class="cartcontrol-wrapper">
						<cartcontrol :food="food"></cartcontrol>
					</div>
					<div class="buy" @click.stop.prevent="addFirst($event)" v-show="!food.count || food.count===0">加入购物车</div>
				</div>
				<split></split>
				<div class="info" v-show="food.info">
					<h1 class="title">商品信息</h1>
					<p class="text">{{food.info}}</p>
				</div>
				<split></split>
				<div class="rating">
					<h1 class="title">商品评价</h1>
					<ratingselect :select-type="selectType" :only-content="onlyContent" :desc="desc" :ratings="food.ratings"></ratingselect>
					<div class="rating-wrapper">
						<ul v-show="food.ratings && food.ratings.length">
							<li v-for="rating in food.ratings" class="rating-item">
								<div class="user">
									<span class="name">{{rating.username}}</span>
									<img :src="rating.avatar" class="avatar" width="12" height="12" alt="" />
								</div>
								<div class="time">
									{{rating.rateTime}}
								</div>
								<p class="text">
									<span :class="{'icon-thumb_up':rating.ratingType === 0,'icon-thumb_down':rating.ratingType === 1}"></span>
									{{rating.text}}
								</p>
							</li>
						</ul>
						<div class="no-rating" v-show="!food.ratings || !food.ratings.length">
							
						</div>
					</div>
				</div>
				
			</div>
		</div>
	</transition>
</template>
<script type="text/ecmascript-6">
	import BScroll from 'better-scroll';
	import Vue from 'vue';
	import cartcontrol from 'components/cartcontrol/cartcontrol';
	import split from 'components/split/split';
	import ratingselect from 'components/ratingselect/ratingselect';
	
	// const POSITIVE = 0;
	// const NEGATIVE = 1;
	const ALL = 2;
	
	export default {
		props: {
			food: {
				type: Object
			}
		},
		data() {
			return {
				showFlag: false,
				selectType: ALL,
				onlyContent: true,
				desc: {
					all: '全部',
					positive: '推荐',
					negative: '吐槽'
				}
			};
		},
		methods: {
			show() {
				this.showFlag = true;
				this.selectType = ALL;
				this.onlyContent = true;
				this.$nextTick(() => {
					if (!this.scroll) {
						this.scroll = new BScroll(this.$refs.food, {
							click: true
						});
					} else {
						this.scroll.refresh();
					}
				});
			},
			hide(){
				this.showFlag = false;
			},
			addFirst(event){
				if (!event._constructed) {
					return;
				}
				this.$root.eventHub.$emit('cart.add', event.target);
				Vue.set(this.food, 'count', 1);
			}
		},
		components: {
			cartcontrol,
			split,
			ratingselect
		}
	};
</script>
<style lang="scss" rel="stylesheet/scss">
	.food{
		width: 100%;
		position: fixed;
		left: 0;
		top: 0;
		background: #FFFFFF;
		bottom: 48px;
		z-index: 30;
		.food-content{
			.image-header{
				position: relative;
				width: 100%;
				height: 0;
				padding-top: 100%;
				img{
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
				}
			}
			.back{
				position: absolute;
				top: 10px;
				left: 0;
				.icon-arrow_lift{
					display: block;
					padding: 10px;
					font-size: 20px;
					color: #FFFFFF;
				}
			}
			.content{
				padding: 18px;
				position: relative;
				.title{
					line-height: 14px;
					margin-bottom: 8px;
					font-size: 14px;
					font-weight: 700;
					color: rgb(7,17,27);
				}
				.detail{
					height: 10px;
					margin-bottom: 18px;
					line-height: 10px;
					font-size: 0;
					.sell-count, .rating{
						font-size: 10px;
						color: rgb(147, 153, 159);
					}
					.sell-count{
						margin-right: 12px;
					}
				}
				.price{
					font-weight: 700;
					line-height: 24px;
					.now{
						margin-right: 8px;
						font-size: 14px;
						color: rgb(240,20,20);
					}
					.old{
						text-decoration: line-through;
						font-size: 10px;
						color: rgb(147,153,159);
					}
				}
					.cartcontrol-wrapper{
					position: absolute;
					right: 12px;
					bottom: 12px;
				}
				.buy{
					position: absolute;
					right: 18px;
					bottom: 18px;
					z-index: 10;
					height: 24px;
					line-height: 24px;
					padding: 0 12px;
					background: rgb(0, 160, 220);
					box-sizing: border-box;
					font-size: 10px;
					border-radius: 12px;
					color: #FFFFFF;
				}
			}
			.info{
				padding: 18px;
				.title{
					line-height: 14px;
					margin-bottom: 6px;
					font-size: 14px;
					color: rgb(7,17,27);
				}
				.text{
					line-height: 24px;
					padding: 0 8px;
					font-size: 12px;
					color: rgb(77,85,93);
				}
			}
			.rating{
				padding-top: 18px;
				.title{
					line-height: 14px;
					margin-left: 18px;
					font-size: 14px;
					color: rgb(7,17,27);
				}
			}
		}
	}
	.move-enter-active, .move-leave-active{
		transition: all 0.2s linear;
		transform: translate3d(0,0,0);
	}
	.move-enter, .move-leave{
		transform: translate3d(100%,0,0);
	}
	
</style>