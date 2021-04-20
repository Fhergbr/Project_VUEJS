<template>
	<div class="article-admin">
		<b-form class="pl-3 pr-3">
			<input type="hidden" v-model="article.id">
			
			<b-form-group label="Nome" label-for="article-name">
				<b-form-input id="article-name" type="text" v-model="article.name" :disabled="mode!='save'"
				required placeholder="Informe o nome do artigo"></b-form-input>
			</b-form-group>
			
			<b-form-group label="Descrição" label-for="article-description">
				<b-form-input id="article-description" type="text" :disabled="mode!='save'" v-model="article.description"
				required placeholder="Informe a descrição do artigo"></b-form-input>
			</b-form-group>
			<b-form-group label="Imagem (url)" label-for="article-img-url">
				<b-form-input id="article-img-url" type="text" :disabled="mode!='save'" v-model="article.imgUrl"
				placeholder="Informe a url da imagem"></b-form-input>
			</b-form-group>

			<b-form-group label-for="article-category-id" label="Categoria">
				<b-form-select id="article-category-id" :options="categories" :disabled="mode!='save'" v-model="article.categoryId"></b-form-select>
			</b-form-group>
			<b-form-group label-for="article-user-id" label="Autor">
				<b-form-select id="article-user-id" :options="users" :disabled="mode!='save'" v-model="article.userId"></b-form-select>
			</b-form-group>
			<b-form-group label="Conteudo" label-for="article-content">
				<VueEditor placeholder="Informe o conteúdo do artigo" required :disabled="mode!='save'" v-model="article.content"/>
			</b-form-group>
			<b-form-group class="mb-2">
				<b-button variant="primary" @click="save" v-if="mode==='save'">Salvar</b-button>
				<b-button variant="danger" v-else @click="remove">Excluir</b-button>
				<b-button variant="secondary" class="ml-2" @click="reset">Cancelar</b-button>
			</b-form-group>
		</b-form>
		<hr>
		<b-table striped hover :items="articles" :fields="fields">
			<template slot="actions" slot-scope="data">
				<b-button variant="warning" @click="loadArticle(data.item)" class="mr-2">
					<i class="fa fa-pencil"></i>
				</b-button>
				<b-button variant="danger" @click="loadArticle(data.item,'remove')">
					<i class="fa fa-trash"></i>
				</b-button>
			</template>
		</b-table>
		<b-pagination size="md" v-model="page" :total-rows="count" :per-page="limit"></b-pagination>
	</div>
</template>

<script>

import {VueEditor} from 'vue2-editor'
import axios from 'axios'
import {baseApiUrl, showError} from '@/global'


export default {
	name:"ArticleAdmin",
	components:{VueEditor},
	data(){
		return {
			mode:'save',
			articles:[],
			article:{},
			users:[],
			categories:[],
			count:0,
			page:1,
			limit:10,
			fields:[
			{key:'id', label:'Código', sortable:true},
			{key:'name', label:'Nome', sortable:true},
			{key:'description', label:'Descrição', sortable:true},
			{key:'actions', label:'Ações', sortable:true}
			]
		} 
	},
	methods:{
		loadArticles(){
			const url = `${baseApiUrl}/articles?page=${this.page}`
			axios.get(url).then(res =>{
				this.articles = res.data.data
				this.limit = res.data.limit
				this.count = res.data.count
			})
		},
		loadUsers(){
			const url = `${baseApiUrl}/users`
			axios.get(url).then(res =>{
				this.users = res.data.map(user => {
					return {value:user.id,text:`${user.name} - ${user.email}` }
				})

			})
		},
		loadArticle(article, mode="save"){
			this.mode = mode
			axios.get(`${baseApiUrl}/articles/${article.id}`)
			.then(res => this.article = res.data)

		},
		save(){
			const method = this.article.id? 'put' : 'post'
			const id = this.article.id ? `/${this.article.id}`:''
			axios[method](`${baseApiUrl}/articles${id}`,this.article)
			.then(()=>{
				this.$toasted.global.defaultSuccess()
				this.reset()
			})
			.catch(showError)
		},
		reset(){
			this.mode = 'save'
			this.article = {}
			this.loadArticles()
		},
		loadCategories(){
			const url = `${baseApiUrl}/categories`
			axios.get(url).then(res => {
				this.categories = res.data.map(category => {
					return {value:category.id,text:category.path}
				})
			})
		},
		remove(){
			const id = this.article.id
			axios.delete(`${baseApiUrl}/articles/${id}`)
			.then(()=>{
				this.$toasted.global.defaultSuccess()
				this.reset()
			})
		}
	},
	mounted(){
		this.loadCategories()
		this.loadUsers()
		this.loadArticles()
	},
	watch:{
		page(){
			this.loadArticles()
		}
	}
}
</script>

<style>

</style>