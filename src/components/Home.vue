<template>
  <v-container fluid class="size-me">
      <div class="subtitle-1 mt-1 mb-0" style="color: #acacac"> &lt; Back to article list</div>

		<v-tabs v-model="tab" class="mb-5">
				<v-tab :ripple="false"><p class="capitalize display-1 mt-5">Shipment Overview</p></v-tab>
				<v-tab :ripple="false"><p class="capitalize display-1 mt-5">Article Overview</p></v-tab>
		</v-tabs>

		<v-tabs-items v-model="tab">
			<v-tab-item>
				<v-row>
					<v-col md="4">
						<v-sheet class="pb-6" elevation="1">
							<v-list-item>
								<v-list-item-content>
									<v-list-item-title>Timeline</v-list-item-title>
								</v-list-item-content>
								<v-list-item-action>
									<v-btn icon>
										<v-icon color="grey lighten-1">mdi-chevron-down</v-icon>
									</v-btn>
								</v-list-item-action>
							</v-list-item>
							<events-icon-timeline :eventsList="activeEvents"/>
						</v-sheet>
					</v-col>
					<v-col md="8">
						<v-sheet elevation="1">
							<v-list-item>
								<v-list-item-content>
									<v-list-item-title>Shipment Data</v-list-item-title>
								</v-list-item-content>
							</v-list-item>
							<v-container class="pt-0">
								<v-row :key="`shipment-card-${index}`" v-for="(shipment, index) in shipmentsWithInfo">
									<v-col>
										<shipment-data-card :card="shipment.details" />
									</v-col>
								</v-row>
							</v-container>
						</v-sheet>
					</v-col>
				</v-row>
			</v-tab-item>
			<v-tab-item>
				<article-view></article-view>
			</v-tab-item>
		</v-tabs-items>
  </v-container>
</template>
<script>
import ArticleView from './ArticleView.vue'
import EventsIconTimeline from "./home/EventsIconTimeline.vue";
import ShipmentDataCard from "./home/ShipmentDataCard.vue";
import { mapState, mapGetters } from "vuex"

export default {
  name: "Home",
  components: {
    ShipmentDataCard,
		EventsIconTimeline,
		ArticleView
	},
	computed: {
		...mapState(['shipments']),
		...mapGetters(['activeDeviations', 'activeEvents']),
		activeDeviationList(){
			return this.activeDeviations.reduce( (acc, curr) => {
				return [...acc, curr.id]
			})
		},
		shipmentsWithInfo(){
			return this.shipments.filter( x => x.details !== undefined)
		}
	},
  data() {
    return {
			tab: 1,
    };
  }
};
</script>

<style lang="scss" scoped>

.link {
  color: #385898;
  text-decoration: underline;
}
.top-fix {
  align-self: flex-start;
}


.size-me ::v-deep{
	.v-tabs-bar {
		background-color: transparent !important;
	}

	.v-tabs-bar__content {
		justify-content: space-between;	
	}

	.v-tab--active::before {
		background-color: transparent;
	}
	.v-tab {
		width: calc(33% - 15px);
		padding: 0;
	}
}

.capitalize {
	text-transform: capitalize;
}

.v-tabs-items, .v-tabs-bar {
	background-color: transparent !important;
}
</style>
