<template>
	<ol class="wtree">
		<li>
			<CategoryRow
				class="item category"
				:category="{ name: 'General' }"
			></CategoryRow>
			<ol>
				<li>
					<EntryRow class="item entry" :entry="entry"></EntryRow>
				</li>
			</ol>
		</li>
	</ol>
</template>

<script>
import EntryRow from "./EntryRow.vue";
import CategoryRow from "./CategoryRow.vue";
export default {
	data: () => {
		return {
			entry: {
				title: "yaha",
				password: "wow",
				username: "Ok",
				url: "https://facebook.com",
			},
		};
	},
	components: {
		EntryRow,
		CategoryRow,
	},
};
</script>

<style scoped>
ol {
	margin-left: 30px;
}

.wtree {
	margin-top: 2rem;
	width: 60vw;
	border-top: 1px solid black;
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
	display: block;
	border: 1px solid #ddd;
	padding: 10px;
	color: #666666;
	text-decoration: none;
	text-align: left;
	/* border-radius: 5px; */
}

.category {
	background-color: #ddf3fe;
}

.entry {
	background-color: #ddebc8;
}

.entry:hover,
.entry:focus {
	border-color: #8ca763;
}
</style>
