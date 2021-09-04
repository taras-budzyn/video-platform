const VideoApp = {
    data() {
        return {
            methodsMap: {
                category: 'getVideosOfCategory',
                search: 'searchVideos',
                home: 'getVideosOfCategory'
            },
            isLoading: false,
            burgerMenuOpen: false,
            searchQuery: '',
            categories: [],
            videoList: [],
            currentPage: {
                id: 'home',
                title: 'Home',
                attr: {
                    val: 0
                }
            },
            showNotification: false,
            error: '',
            pagination: {
                page: 1,
                prevPage: false,
                nextPage: false
            }
        }
    },
    mounted() {
        this.isLoading = true;
        ApiService.getYoutubeCategories().then(data => {
            if (data.error) {
                this.showNotification = true;
                this.error = data.error;
                this.videoList = [];
            } else {
                this.categories = data;
            }
        });
        ApiService.getVideosOfCategory(this.currentPage.attr.val).then(data => {
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
            this.isLoading = true;
            this.hideNotification();
            this.resetPagination();
            this.currentPage = {
                id: 'search',
                title: 'Search results for:' + this.searchQuery,
                attr: {
                    val: this.searchQuery
                }
            };
            ApiService.searchVideos(this.searchQuery).then(data => {
                this.handleVideoResponse(data);
            });
        },
        chooseCategory(category) {
            this.isLoading = true;
            this.hideNotification();
            this.resetPagination();
            this.currentPage = {
                id: 'category',
                title : 'Category:' + category,
                attr: {
                    val: category
                }
            };
            ApiService.getVideosOfCategory(category).then(data => {
                this.handleVideoResponse(data);
            });
        },
        handleVideoResponse(data) {
            this.isLoading = false;
            if (data.error) {
                this.showNotification = true;
                this.error = data.error;
                this.videoList = [];
            } else {
                this.videoList = data.items;
                this.searchQuery = '';
                this.pagination.nextPage = data.nextPageToken ? data.nextPageToken : false;
                this.pagination.prevPage = data.prevPageToken ? data.prevPageToken : false;
            }
        },
        nextPage() {
            this.isLoading = true;
            this.pagination.page++;
            ApiService[this.methodsMap[this.currentPage.id]](this.currentPage.attr.val, this.pagination.nextPage).then(data => {
                this.handleVideoResponse(data);
            });
        },
        prevPage() {
            this.isLoading = true;
            this.pagination.page--;
            ApiService[this.methodsMap[this.currentPage.id]](this.currentPage.attr.val, this.pagination.prevPage).then(data => {
                this.handleVideoResponse(data);
            });
        },
        resetPagination() {
            this.pagination = {
                page: 1,
                prevPage: false,
                nextPage: false
            };
        }
    }
}
  
const app = Vue.createApp(VideoApp);

app.component('video-card', VideoCardComponent);

app.mount('#app');