<template>
	<div class="home">
		<!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
		<DataTree></DataTree>
	</div>
</template>

<script>
import EntryRow from "@/components/EntryRow.vue";
import DataTree from "@/components/DataTree.vue";
// @ is an alias to /src

export default {
	name: "HomeView",
	components: { DataTree },
};
</script>
