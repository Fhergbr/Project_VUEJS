<template>
	<aside class="menu" v-show="isMenuVisible">
		<div class="menu-filter">
			<i class="fa fa-search fa-lg"></i>
			<input type="text" placeholder="Digite para filtrar" v-model="treeFilter" class="filter-field">
		</div>
		<Tree :data="treeData" :options="treeOptions" :filter="treeFilter" ref="tree"/>
	</aside>
</template>

<script>
import {mapState} from 'vuex'
import Tree from 'liquor-tree'
import {baseApiUrl} from '@/global'
import axios from 'axios'
export default {
	name: "Menu",
	computed: mapState(['isMenuVisible']),
	components:{Tree},
	methods:{
		getTreeData(){
			const url = `${baseApiUrl}/categories/tree`
			return axios.get(url).then(res => res.data)
		},
		onNodeSelect(node){
			this.$router.push({
				name:'articlesByCategory',
				params:{id:node.id}
			})
			if(this.$mq === 'xs' || this.$mq === 'sm'){
				this.$store.commit('toggleMenu',false)
			}
		}
	},
	data(){
		return {
			treeData: this.getTreeData(),
			treeOptions:{
				propertyNames:{'text':'name'},
				filter:{emptyText:'Categoria não encontrada'}
			},
			treeFilter:''
		}
	},
	mounted(){
		this.$refs.tree.$on('node:selected',this.onNodeSelect)
	}
}
</script>

<style>
.menu{
	grid-area:menu;
	display:flex;
	background:#d0d9d9;
	flex-direction:column;
	flex-wrap:wrap;
}
.menu a, .menu a:hover{
	color:#000;
	text-decoration:none;
}
.menu .tree-node.selected > .tree-content,
.menu .tree.node .tree-content:hover{
	background-color:rgba(0,0,0,0.2);
}
.tree-arrow.has-child{
	filter:brightness(2);
}
.menu .menu-filter{
	display:flex;
	justify-content:center;
	align-items:center;
	margin:20px;
	padding-bottom:8px;
	border-bottom:1px solid #aaa;
}
.menu .menu-filter i{
	color:#888;
	margin-right:10px;
}
.menu input {
	color:#ffff;
	font-size:1.3rem;
	border:none;
	outline:0;
	width:100%;
	background:transparent;
}
.menu input placeholder{
	color:#999;
}
.tree-filter-empty{
	margin-left:20px;
	text-transform:uppercase;
	color:#888;
}
</style>
