<template>
	<v-app>
		<NavBar></NavBar>
		<main>
			<v-container>
				<v-row class="d-flex justify-center">
					<router-view></router-view>
				</v-row>
			</v-container>
		</main>
	</v-app>
</template>

<script>
import NavBar from "./components/NavBar.vue";
export default {
	components: {
		NavBar,
	},
};
</script>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #2c3e50;
}

main {
	min-height: 90vh;
	display: flex;
	justify-content: center;
	padding-top: 3rem;
	border-top: 5px solid rgb(255, 177, 32);
}

@media (max-width: 900px) {
	main {
		padding-top: 2rem;
	}
}
@media (max-width: 700px) {
	main {
		padding-top: 1rem;
	}
}
</style>
