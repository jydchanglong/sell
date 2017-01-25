<template>
	<div class="cartcontrol">
		<transition name="move">
			<div class="carcontrol-decrease icon-remove_circle_outline" v-show="food.count > 0" @click.stop.prevent="decreaseCart"></div>
		</transition>
		<div class="cartcontrol-count" v-show="food.count > 0">{{food.count}}</div>
		<div class="carcontrol-add icon-add_circle" @click.stop.prevent="addCart"></div>
	</div>
</template>
<script type="text/ecmascript-6">
	import Vue from 'vue';
	export default {
		props: {
			food:{
				type: Object
			}
		},
		methods: {
			addCart(event){
				if (!event._constructed){
					return;
				}
				if (!this.food.count){
					Vue.set(this.food,'count',1);
					this.food.count = 1;
				} else {
					this.food.count++;
				}
				this.$root.eventHub.$emit('cart.add', event.target);
			},
			decreaseCart(event){
				if (!event._constructed){
					return;
				}
				
				if (this.food.count){
					this.food.count--;
				}
			}
		}
	};
</script>
<style lang="scss" rel="stylesheet/scss">
	.cartcontrol{
		font-size: 0;
		.carcontrol-decrease{
			display: inline-block;
			padding: 6px;
			line-height: 24px;
			font-size: 24px;
			color: rgb(0,160,220);
			transition: all 0.4s linear;
			&.move-transition{
				opacity: 1;
				transform: translate3d(0,0,0) rotate(0);
				transition: all 0.4s linear;
			}			
			&.move-enter,&.move-leave-active{
				opacity: 0;
				transform: translate3d(24px,0,0) rotate(180deg);
			}			
		}
		.cartcontrol-count{
			display: inline-block;
			vertical-align: top;
			width: 12px;
			text-align: center;
			padding-top: 6px;
			line-height: 24px;
			font-size: 10px;
			color: rgb(147,153,159);
		}
		.carcontrol-add{
			display: inline-block;		
			padding: 6px;
			line-height: 24px;
			font-size: 24px;
			color: rgb(0,160,220);	
		}
	}
</style>