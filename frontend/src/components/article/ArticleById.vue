<template>
	<div class="article-by-id">
		<PageTitle icon="fa fa-file-o" :main="article.name" :sub="article.description"></PageTitle>
		<div class="article-content" v-html="article.content">
		</div>
	</div>
</template>
<script >
import axios from 'axios'
import {baseApiUrl} from '@/global'
import PageTitle from '@/components/template/PageTitle'
import 'highlightjs/styles/dracula.css'
import hljs from 'highlightjs/highlight.pack.js'

export default{
	name:'ArticleById',
	components:{PageTitle},
	data(){
		return{
			article:{}
		}
	},
	updated(){
		document.querySelectorAll('.article-content pre').forEach(e=>{
			hljs.highlightBlock(e)
		})
	},
	methods:{

	},
	mounted(){
		const url = `${baseApiUrl}/articles/${this.$route.params.id}`
		axios(url).then(res => this.article = res.data)
	}
}
</script>
<style>
	.article-content{
		background-color:#fff;
		border-radius:8px;
		padding:25px;
	}
	.article-content pre{
		padding:20px;
		border-radius:8px;
		font-size:1.2rem;
	}
	.article-content img{
		max-width:100%;
	}
	.article-content :last-child{
		margin-bottom:0px;
	}
</style>