const ApiService = {
    url: 'backend/api/videos/',
    searchVideos: function (searchQuery, paginationToken) {
        console.log('searchVideos', searchQuery, paginationToken);
        return fetch(this.url + 'search' + this.createParamsURL({
                'q': searchQuery,
                'pageToken': paginationToken
            }))
            .then(async response => {
                return response.json();
            })
            .then(responseData => this.handleError(responseData))
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
        return fetch(this.url + 'channel/' + categoryId + this.createParamsURL({'pageToken': paginationToken}))
            .then(async response => {
                return response.json();
            })
            .then(responseData => this.handleError(responseData))
            .catch(errorMsg => {
                console.error("There was an error!", errorMsg);
                return {error: errorMsg};
            });
    },
    getYoutubeCategories: function() {
        console.log('getYoutubeCategories');
        return fetch(this.url + 'categories')
            .then(async response => {
                return response.json();
            })
            .then(responseData => this.handleError(responseData))
            .catch(errorMsg => {
                console.error("There was an error!", errorMsg);
                return {error: errorMsg};
            });
    },
    handleError: function (responseData) {
        if (responseData.error) {
            return Promise.reject(responseData.error);
        } else {
            return responseData;
        }
    },
    createParamsURL: function (data) {
        let params = new URLSearchParams();
        Object.keys(data).forEach(index => {
            console.log(data[index]);
            if (data[index]) {
                params.set(index, data[index].replace(/[^a-zA-Z0-9]/g, ""));
            }
        });
        return params.toString() ? '?' + params.toString(): '';
    }
}