<template>
	<div class="ratingselect">
		<div class="rating-type border-1px">
			<span @click="select(2,$event)" class="block positive" :class="{'active': selectType===2}">{{desc.all}}<i class="count">{{ratings.length}}</i></span>
			<span @click="select(0,$event)" class="block positive" :class="{'active': selectType===0}">{{desc.positive}}<i class="count">{{positives.length}}</i></span>
			<span @click="select(1,$event)" class="block negative" :class="{'active': selectType===1}">{{desc.negative}}<i class="count">{{negatives.length}}</i></span>
		</div>
		<div @click="toggleContent" class="swich" :class="{'on': onlyContent}">
			<span class="icon-check_circle"></span>
			<span class="text">只看有内容的评价</span>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	const POSITIVE = 0;
	const NEGATIVE = 1;
	const ALL = 2;
	
	export default {
		props: {
			ratings: {
				type: Array,
				default() {
					return [];
				}
			},
			selectType: {
				type: Number,
				default: ALL
			},
			onlyContent: {
				type: Boolean,
				default: false
			},
			desc: {
				type: Object,
				default() {
					return {
						all: '全部',
						positive: '满意',
						negative: '不满意'
					};
				}
			}
		},
		computed: {
			positives(){
				return this.ratings.filter((rating) => {
					return rating.rateType === POSITIVE;
				});
			},
			negatives(){
				return this.ratings.filter((rating) => {
					return rating.rateType === NEGATIVE;
				});
			}
		},
		methods: {
			select(type, event){
				if (!event._constructed) {
					return;
				}
				this.selectType = type;
				this.$root.eventHub.$emit('ratingtype.select', type);
			},
			toggleContent(event) {
				if (!event._constructed) {
					return;
				}
				this.onlyContent = !this.onlyContent;
				this.$root.eventHub.$emit('content.toggle', this.onlyConten);
			}
		}
	};
</script>
<style lang="scss" rel="stylesheet/scss">
	@import "../../common/scss/mixin";
	
	.ratingselect{
		.rating-type{
			padding: 18px 0;
			margin: 0 18px;
			@include border-1px(rgba(7,17,27,0.1));
			font-size: 0;
			.block{
				line-height: 16px;
				display: inline-block;
				padding: 8px 12px;
				border-radius: 1px;
				margin-right: 8px;
				color: rgb(77,85,93);
				font-size: 12px;
				&.active{
					color: #FFFFFF;
				}
				&.positive{
					background: rgba(0,160,220,0.2);
					&.active{
						background: rgb(0,160,220);
					}
				}
				&.negative{
					background: rgba(77,85,93,0.2);
					&.active{
						background: rgb(77,85,93);
					}
				}
				.count{
					margin-left: 2px;
					font-size: 8px;
				}
			}
		}
		.swich{
			padding: 12px 18px;
			line-height: 24px;
			color: rgb(147,153,159);
			border-bottom: 1px solid rgba(7,17,27,0.1);
			font-size: 0;
			.icon-check_circle{
				display: inline-block;
				vertical-align: top;
				margin-right: 4px;
				font-size: 24px;
			}
			.text{
				display: inline-block;
				vertical-align: top;
				font-size: 12px;
			}
			&.on{
				.icon-check_circle{
					color: #00c850;
				}
			}
		}
	}
</style>