<template>
	<ol class="wtree">
		<li v-for="category in content" :key="category._id">
			<CategoryContainer :category="category"></CategoryContainer>
		</li>
	</ol>
</template>

<script>
import EntryRow from "./EntryRow.vue";
import { mapGetters } from "vuex";
import CategoryContainer from "./CategoryContainer.vue";
export default {
	data: () => {
		return {
			expand: true,
		};
	},
	computed: {
		...mapGetters(["content"]),
	},
	components: {
		EntryRow,
		CategoryContainer,
	},
};
</script>

<style>
.wtree {
	margin-top: 1rem;
	position: relative;
	min-width: 30vw;
	width: 80%;
}
.wtree li {
	list-style-type: none;
	margin: 10px 0 10px 10px;
	position: relative;
}
.wtree li:before {
	content: "";
	position: absolute;
	top: -10px;
	left: -30px;
	border-left: 1px solid #ddd;
	border-bottom: 1px solid #ddd;
	width: 30px;
	height: 15px;
}
.wtree li:after {
	position: absolute;
	content: "";
	top: 4px;
	left: -30px;
	border-left: 1px solid #ddd;
	border-top: 1px solid #ddd;
	width: 30px;
	height: 100%;
}
.wtree li:last-child:after {
	display: none;
}
.item {
	border: 1px solid #ddd;
	padding: 10px;
	color: #666666;
	text-decoration: none;
	text-align: left;
	border-radius: 5px;
	font-size: 0.9rem;
}

.category {
	background-color: #ddf3fe;
}

.entry {
	background-color: #ddebc8;
	padding: 8px;
}

.entry:hover,
.entry:focus {
	border-color: #8ca763;
}

@media (max-width: 900px) {
	.wtree {
		width: 100%;
	}
}
</style>
