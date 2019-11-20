<template>
	<div>
		<h1>{{panel.title}}</h1>
		<p>{{panel.subtitle}}</p>
	</div>
</template>
<script>
export default {
	props: {
		panel: {
			type: Object
		}
	}
}
</script>