<template>
	<div class="auth-content">
		<div class="auth-modal">
			<h1>FH<span class="text-danger">3</span>R </h1 >
			
			<hr>
			<div class="auth-title" >{{showSignup ? 'Cadastro' :  'Login'}}</div>
			<input type="text" v-if="showSignup" v-model="user.name" placeholder="Nome">
			<input type="email" name="email" v-model="user.email" placeholder="Email">
			<input type="password" name="password" v-model="user.password" placeholder="Password">
			<input v-if="showSignup" type="password" v-model="user.confirmPassword" placeholder="Confirme a senha">  
			<button v-if="showSignup" @click="signup" class="btn btn-primary">Registrar</button>
			<button v-else @click="signin" class="btn btn-primary">Entrar</button>
			<a href @click.prevent="showSignup = !showSignup">
				<span v-if="showSignup">Já tem cadastro? Acesse o Login</span>
				<span v-else>Não tem cadastro? Registre-se aqui</span>
			</a>
		</div>
	</div>
</template>
<script>
	import {baseApiUrl,showError,userKey} from '@/global'
	import axios from 'axios'

	export default {
		name:'Auth',
		components:{},
		data(){
			return{
				showSignup: false,
				user:{}
			}
		},
		methods:{
			signin(){
				axios.post(`${baseApiUrl}/signin`,this.user)
				.then(res => {
					this.$store.commit('setUser',res.data)
					localStorage.setItem(userKey,JSON.stringify(res.data))
					this.$router.push({path:'/'})
				})
				.catch(showError)
			},
			signup(){
				axios.post(`${baseApiUrl}/signup`,this.user)
				.then(()=>{
					this.$toasted.global.defaultSuccess()
					this.user = {}
					this.showSignup = false
				})
				.catch(showError)
			}
		}
	}
</script>
<style>
	.auth-content{
		height:100%;
		display:flex;
		justify-content:center;
		align-items:center;
	}
	.auth-modal{
		background-color:#fff;
		width:350px;
		padding:35px;
		box-shadow: 0 1px 5px rgba(0,0,0,0.15);
		display:flex;
		flex-direction:column;
		align-items:center;
	}
	.auth-title{
		font-size:1.2rem;
		font-weight:100;
		margin-top:10px;
		margin-bottom:15px;
	}

	.auth-modal input{
		border:1px solid #bbb;
		width:100%;
		margin-bottom:15px;
		padding:3px 8px;
		outline:none;
	}
	.auth-modal button{
		align-self:flex-end;
		color:#fff;
		background-color:rgb(0,0,100);
		padding:5px 15px;
	}
	.auth-modal a{
		margin-top:35px;
	}
	.auth-modal hr{
		border:0px;
		width:100%;
		height:1px;
		background-image:linear-gradient(to right, 
		rgba(120,120,120,0),
		rgba(120,120,120,0.75),
		rgba(120,120,120,0)
		)
	}
</style>