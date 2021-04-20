<template>
<div class="home">
	<PageTitle icon="fa fa-home" main=" Dashboard" sub="Base de Conhecimento"/>
	<div class="stats">
		<Stat title="Categorias" :value="stat.categories" icon="fa fa-folder" color="orange"></Stat>
		<Stat title="Artigos" :value="stat.articles" icon="fa fa-file" color="lightgreen"></Stat>
		<Stat title="Usuarios" :value="stat.users" icon="fa fa-user" color="blue"></Stat>
	</div>
</div>
</template>

<script>

import Stat from './Stat'
import PageTitle from '../template/PageTitle'
import axios from 'axios' 
import {baseApiUrl} from '@/global'

export default {
	name:'Home',
	components:{PageTitle,Stat},
	data(){
		return {
			stat:{}
		}
	},
	methods:{
		getStats(){
			axios.get(`${baseApiUrl}/stats`).then(res=>this.stat = res.data)
		}
	},
	mounted(){
		this.getStats()
	}
}
</script>

<style>
.stats{
	display:flex;
	justify-content:space-between;
	flex-wrap:wrap;
}
</style>