<template>
  <v-col xs="12" sm="10" md="8">
    <section>
      <span>{{ $t("main.your_activities") }}</span> <br />
      <span @click="emptyHistoryActivity" class="action-link">
        {{ $t("btns.clear_history") }}</span
      >
    </section>
    <section class="activity-cont" v-if="!loading">
      <div
        v-for="activity in activities"
        class="activity-row"
        v-if="activities.length > 0"
      >
        <span>
          <span class="font-weight-bold">{{ getActivityType(activity) }}</span>
          <span> </span>
        </span>
        <span>{{ getActivityDateString(activity.timestamp) }}</span>
      </div>
      <div v-if="activities.length === 0">
        <p>{{ $t("labels.no_activities") }}</p>
      </div>
    </section>
    <Loading v-if="loading" />
  </v-col>
</template>

<script>
import Loading from "@/components/Loading.vue";
import axios from "axios";
import i18n from "@/plugins/i18n";

export default {
  name: "activies-view",
  data() {
    return {
      activities: [],
      loading: false,
    };
  },
  methods: {
    getActivityDateString(timestamp) {
      const date = new Date(timestamp);
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday: "long",
        hour: "numeric",
        minute: "numeric",
      };
      const formatter = new Intl.DateTimeFormat(navigator.language, options);
      const formattedDate = formatter.format(date);
      return formattedDate;
    },
    async emptyHistoryActivity() {
      try {
        await axios.delete("/users/activity-history");
        this.activities = [];
      } catch (error) {
        console.log(error.toString());
      }
    },

    getActivityType(activity) {
      const translation = "activityTypes." + activity.activityType;
      return i18n.t(translation);
    },
  },
  async mounted() {
    this.loading = true;
    try {
      const response = await axios.get("/users/activity-history");
      this.activities = response.data;
    } catch (error) {
      console.log(error.toString());
    } finally {
      this.loading = false;
    }
  },
  components: { Loading },
};
</script>

<style scoped>
.activity-cont {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.activity-row {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>
