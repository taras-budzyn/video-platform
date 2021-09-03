const ApiService = {
    searchVideos: function (searchQuery, paginationToken) {
        console.log('searchVideos', searchQuery, paginationToken);
        return fetch("/data/search.json")
            .then(async response => {
                if (!response.ok) {
                    return Promise.reject("Not 2xx response");
                } else {
                    return response.json();
                }
            })
            .then(data => {
                data.items = data.items.map(item => {
                    item.id = item.id.videoId;
                    return item;
                });
                return data;
            })
            .catch(errorMsg => {
                console.error("There was an error!", errorMsg);
                return {error: errorMsg};
            });
    },
    getVideosOfCategory: function(categoryId, paginationToken) {
        console.log('getVideoOfCategory', categoryId, paginationToken);
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
    }
}