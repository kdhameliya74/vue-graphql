<template>
  <v-container>
    <v-row dense>
      <v-col md="3" xs="1" v-for="launch in launchesPast" :key="launch.id">
        <v-card>
          <v-img
            :src="
              launch.links.flickr_images.length > 0
                ? getImage(launch.links.flickr_images)
                : require('@/assets/rocket.png')
            "
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="200px"
          >
            <v-card-title v-text="launch.mission_name"></v-card-title>
          </v-img>
          <v-card-text class="text--primary" v-if="launch.details">
            <div>{{ launch.details.substr(0, 100) + "..." }}</div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-progress-circular indeterminate color="green" v-if="loading" />
      <v-btn
        class="ma-2"
        color="primary"
        x-large
        v-if="!loading && showLoadMore"
        @click="loadMore"
      >
        Load more
      </v-btn>
    </v-row>
  </v-container>
</template>
<script>
import gql from "graphql-tag";

let offset = 1;
const limit = 12;

export default {
  name: "PastLanches",
  data: () => ({
    loading: true,
    launched: [],
    limit: 10,
    offset: 0,
    showLoadMore: true,
  }),
  apollo: {
    launchesPast: {
      query: gql`
        query launchesPast($limit: Int!, $offset: Int!) {
          launchesPast(limit: $limit, offset: $offset) {
            mission_name
            details
            links {
              flickr_images
            }
            id
          }
        }
      `,
      variables: {
        limit,
        offset,
      },
      result({ loading }) {
        this.loading = loading;
      },
    },
  },
  methods: {
    getImage(images) {
      return images.length > 0 ? images[0] : null;
    },
    loadMore() {
      offset += 12;
      this.loading = true;
      this.$apollo.queries.launchesPast.fetchMore({
        variables: {
          limit: limit,
          offset: offset,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          const hasMore =
            fetchMoreResult.launchesPast.length > 0 ? true : false;
          this.showLoadMore = hasMore;
          if (!this.showLoadMore) {
            console.log("inside");
            this.loading = false;
          }
          return {
            __typename: previousResult.launchesPast.__typename,
            hasMore,
            launchesPast: [
              ...previousResult.launchesPast,
              ...fetchMoreResult.launchesPast,
            ],
          };
        },
      });
    },
  },
};
</script>
<style scoped>
.v-progress-circular {
  margin: 2rem;
}
</style>
