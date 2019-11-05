<script>
export default {
  name: 'PageRandom',

  async fetch({ store, error, redirect }) {
    await store.dispatch('fetchRandomLoop');
    const randomLoopID = store.state.loop.randomPageLoopid;
    redirect(302, `/loop/${randomLoopID}`);
  },
};
</script>
