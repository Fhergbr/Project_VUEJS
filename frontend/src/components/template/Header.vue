<template>
	<header class="header">
		<a class="toggle" @click="toggleMenu" v-if="!hideToggle">
			<i class="fa fa-lg" :class="icon"></i>
		</a>
		<h1 class="title">
			<router-link to="/">{{ title }}</router-link>
		</h1>
		<UserDropdown v-if="!hideUserDropdown"></UserDropdown>
	</header>
</template>

<script>
import UserDropdown from './UserDropdown'
export default {
	name: "Header",
	props:{
		title:String,
		hideToggle:Boolean,
		hideUserDropdown:Boolean
	},
	components:{UserDropdown},
	computed:{
		icon(){
			return  this.$store.state.isMenuVisible ? "fa-angle-left" : "fa-angle-down"
		}
	},
	methods:{
		toggleMenu(){
			this.$store.commit('toggleMenu')
		}
	}
}
</script>

<style>
.header{
	grid-area:header;
	background-color:#101069;
	display:flex;
	justify-content:center;
	align-items:center;
}
.title{
	font-size:1.2rem;
	color:#fff;
	font-weight:100;
	flex-grow:1;
	text-align:center;
}
.title a{
	color:#fff;
	text-decoration:none;

}
header.header > a.toggle{
	width:60px;
	height:100%;
	color:#fff;
	justify-self:flex-start;
	text-decoration:none;
	display:flex;
	justify-content:center;
	align-items:center;
	cursor:pointer;
} 
header.header > a.toggle:hover{
	background-color:rgba(255,255,255,0.2);
}
.title a:hover{
	text-decoration:none;
	color:#fff;
}
</style>