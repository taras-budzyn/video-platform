const VideoApp = {
    data() {
        return {
            methodsMap: {
                category: 'getVideosOfCategory',
                search: 'searchVideos',
                home: 'getVideosOfCategory'
            },
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
            console.log('Search!', this.searchQuery);
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
            console.log('Category!', category);
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
            console.log(data);
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
            this.pagination.page++;
            ApiService[this.methodsMap[this.currentPage.id]](this.currentPage.attr.val, {pagToken: this.pagination.nextPage});
        },
        prevPage() {
            this.pagination.page--;
            ApiService[this.methodsMap[this.currentPage.id]](this.currentPage.attr.val, {pagToken: this.pagination.prevPage});
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