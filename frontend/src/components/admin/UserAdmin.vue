<template>
	<div class="user-admin">
		<b-form>
			<input type="hidden" id="user-id" v-model="user.id">
			<b-row class="m-1">
				<b-col md="6" sm="12">
					<b-form-group label="Nome:" label-for="user-name">
						<b-form-input id="user-name" type="text" v-model="user.name" required placeholder="Informe o nome do úsuario" :readonly="mode!=='save'">
						</b-form-input>
					</b-form-group>
				</b-col>
				<b-col md="6" sm="12">
					<b-form-group label="E-mail:" label-for="user-email">
						<b-form-input id="user-email" type="email"v-model="user.email" required placeholder="Informe o e-mail do úsuario" :readonly="mode!=='save'">
						</b-form-input>
					</b-form-group>
				</b-col>
			</b-row>
			<b-form-checkbox :disabled="mode!=='save'" v-model="user.admin" id="user-admin" class="m-3 mb-3">Administrador?</b-form-checkbox>
			<b-row class="m-1" v-show="mode=='save'">
				<b-col md="6" sm="12">
					<b-form-group label="Senha:" label-for="user-password">
						<b-form-input id="user-password" type="password" v-model="user.password" required placeholder="Informe a senha">
						</b-form-input>
					</b-form-group>
				</b-col>
				<b-col md="6" sm="12">
					<b-form-group label="Confirme a senha:" label-for="user-confirmPassword">
						<b-form-input id="user-confirmPassword" type="password"v-model="user.confirmPassword" required placeholder="Confirme a senha">
						</b-form-input>
					</b-form-group>
				</b-col>
			</b-row>
			<b-row class="ml-3">
				<b-button class="mr-2" variant="primary" v-if="mode === 'save'" @click="save">Salvar</b-button>
				<b-button class="mr-2" variant="danger" v-if="mode === 'remove'" @click="remove">Excluir</b-button>
				<b-button @click="reset">Cancelar</b-button>
			</b-row>
		</b-form>
		<hr>
		<b-table hover striped :items="users" :fields="fields">
			<template slot="actions" slot-scope="data">
				<b-button variant="warning" @click="loadUser(data.item)" class="mr-2">
					<i class="fa fa-pencil"></i>
				</b-button>
				<b-button variant="danger" @click="loadUser(data.item,'remove')" class="mr-2">
					<i class="fa fa-trash"></i>
				</b-button>
			</template>
		</b-table>
	</div>
</template>

<script>

import axios from 'axios'
import {baseApiUrl, showError} from '@/global'

export default {
	name:"UserAdmin",
	props:{},
	data(){
		return {
			mode:'save',
			user:{},
			users:[],
			fields: [
			{ key:'id', label:'Código', sortable:true},
			{ key:'name', label:'Nome', sortable:true},
			{ key:'email', label:'E-mail', sortable:true},
			{ key:'admin', label:'Administrador', sortable:true, formatter: value=>value?'sim':'Não'},
			{ key:'actions', label:'Ações'}
			]
		}
	},
	methods:{
		loadUsers(){
			const url = `${baseApiUrl}/users`
			axios.get(url).then(res => {
				this.users = res.data
			})
		},
		save(){
			const method = this.user.id ? "put" : "post"
			const id = this.user.id ? `/${this.user.id}` : ''
			axios[method](`${baseApiUrl}/users${id}`,this.user)
			.then(()=>{
				this.$toasted.global.defaultSuccess()
				this.reset()
			})
			.catch(showError)
		},
		reset(){
			this.mode = "save"
			this.user = {},
			this.loadUsers()
		},
		remove(){
			const id = this.user.id
			axios.delete(`${baseApiUrl}/users/${id}`)	
			.then(()=>{
				this.$toasted.global.defaultSuccess()
				this.reset()
			})
			.catch(showError)
		},
		loadUser(user, mode ='save'){
			this.mode = mode
			this.user = {...user}
		}
	},
	mounted(){
		this.loadUsers()
	}
	
}
</script>

<style>

</style>