export const useIsLoadingStore = defineStore('isLoading', {
  state: () => ({ isLoading: true }),
  getters: {
    loading: state => state.isLoading
  },
  actions: {
    set(isLoading: boolean) {
      this.$patch({ isLoading })
    }
  }
})
