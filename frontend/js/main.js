const VideoApp = {
    data() {
        return {
            burgerMenuOpen: false,
            searchQuery: '',
            categories: [],
            videoList: [...Array(6).keys()],
            currentPage: 'Home',
            showNotification: false,
            error: ''
        }
    },
    mounted() {
        ApiService.getYoutubeCategories();
        ApiService.getPopularVideos();
    },
    methods: {
        openCloseMenu() {
            this.burgerMenuOpen = !this.burgerMenuOpen;
        },
        hideNotification() {
            this.showNotification = false;
            this.error = '';
        },
        search() {
            console.log('Search!', this.searchQuery);
            this.currentPage = 'Search results for:' + this.searchQuery;

        },
        chooseCategory(category) {
            console.log('Category!', category);
            this.currentPage = 'Category:' + category;
            this.videoList = [...Array(6).keys()];
            this.searchQuery = '';
        }
    }
}
  
const app = Vue.createApp(VideoApp);

app.component('video-card', VideoCardComponent);

app.mount('#app');