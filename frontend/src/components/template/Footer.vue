<template>
	<footer class="footer">
		<span>copyright <strong> F3R &copy</strong> 2021</span>
	</footer>
</template>

<script>
export default {
	name: "Footer",
}
</script>

<style>
.footer{
	grid-area:footer;
	background:linear-gradient(to right,#efefef, #ddd);
	color:#333;
	display:flex;
	justify-content:flex-end;
	align-items:center;
	paddinf-right:10px;
}
</style>