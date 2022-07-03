<template>
	<div class="container">
		<div class="outer"></div>
		<div class="inner"></div>
	</div>
</template>

<style scoped>
@keyframes rotate {
	from {
		transform: rotate(0deg);
	}
	to {
		transform: rotate(360deg);
	}
}
.outer {
	width: 80px;
	height: 80px;
	border: 10px solid #f47e60;
	border-radius: 50%;
	position: relative;
	border-top-color: white !important;
	border-bottom-color: white !important;
	top: 25%;
	animation: rotate 1s linear infinite;
}

.container {
	position: relative;
}

.inner {
	position: absolute;
	top: 26.5px;
	left: 26.5px;
	border: 10px solid #f8b26a;
	border-top-color: white !important;
	border-bottom-color: white !important;
	width: 50px;
	height: 50px;
	border-radius: 50%;
	animation: rotate 1s reverse linear infinite;
}
</style>
