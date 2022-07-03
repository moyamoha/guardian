<template>
	<v-app>
		<NavBar></NavBar>
		<NotifBar></NotifBar>
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
import NotifBar from "./components/NotifBar.vue";
export default {
	components: {
		NavBar,
		NotifBar,
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
