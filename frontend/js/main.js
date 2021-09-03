const VideoApp = {
    data() {
        return {
            burgerMenuOpen: false,
            searchQuery: '',
            categories: [],
            videoList: [],
            currentPage: 'Home',
            showNotification: false,
            error: ''
        }
    },
    mounted() {
        ApiService.getYoutubeCategories().then(data => {
            console.log(data);
            if (data.error) {
                this.showNotification = true;
                this.error = data.error;
                this.videoList = [];
            } else {
                this.categories = data.items;
            }
        });
        ApiService.getPopularVideos().then(data => {
            this.handleVideoResponse(data);
        });
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
            ApiService.searchVideos(this.searchQuery).then(data => {
                this.handleVideoResponse(data);
            });
        },
        chooseCategory(category) {
            console.log('Category!', category);
            this.currentPage = 'Category:' + category;
            ApiService.getVideosOfCategory(category).then(data => {
                this.handleVideoResponse(data);
            });
        },
        handleVideoResponse(data) {
            console.log(data);
            if (data.error) {
                this.showNotification = true;
                this.error = data.error;
                this.videoList = [];
            } else {
                this.videoList = data.items;
                this.searchQuery = '';
            }
        }
    }
}
  
const app = Vue.createApp(VideoApp);

app.component('video-card', VideoCardComponent);

app.mount('#app');