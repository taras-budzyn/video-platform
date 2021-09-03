const ApiService = {
    searchVideos: function (searchQuery) {
        console.log('searchVideos');
        return fetch("/data/search.json")
            .then(async response => {
                if (!response.ok) {
                    return Promise.reject("Not 2xx response");
                } else {
                    return response.json();
                }
            })
            .catch(errorMsg => {
                console.error("There was an error!", errorMsg);
                return {error: errorMsg};
            });
    },
    getVideosOfCategory: function(categoryId) {
        console.log('getVideoOfCategory');
        return fetch("/data/video-category.json")
            .then(async response => {
                if (!response.ok) {
                    return Promise.reject("Not 2xx response");
                } else {
                    return response.json();
                }
            })
            .catch(errorMsg => {
                console.error("There was an error!", errorMsg);
                return {error: errorMsg};
            });
    },
    getYoutubeCategories: function() {
        console.log('getYoutubeCategories');
        return fetch("/data/categories.json")
            .then(async response => {
                if (!response.ok) {
                    return Promise.reject("Not 2xx response");
                } else {
                    return response.json();
                }
            })
            .catch(errorMsg => {
                console.error("There was an error!", errorMsg);
                return {error: errorMsg};
            });
    },
    getPopularVideos: function() {
        console.log('getPopularVideos');
        return fetch("/data/popular.json")
            .then(async response => {
                if (!response.ok) {
                    return Promise.reject("Not 2xx response");
                } else {
                    return response.json();
                }
            })
            .catch(errorMsg => {
                console.error("There was an error!", errorMsg);
                return {error: errorMsg};
            });
    }
}