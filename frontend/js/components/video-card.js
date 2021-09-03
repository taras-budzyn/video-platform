const VideoCardComponent = {
    props: ['video'],
    template: `
        <div class="column is-3">
            <div class="card">
                <div class="card-image">
                <figure class="image is-4by3">
                    <a :href="'https://www.youtube.com/watch?v=' + video.id" target="_blank">
                        <img :src="video.snippet.thumbnails.medium.url">
                    </a>
                </figure>
                </div>
                <div class="card-content">
                <div class="media">
                    <div class="media-content">
                        <p class="title is-4"><a :href="'https://www.youtube.com/watch?v=' + video.id" target="_blank">{{ video.snippet.title }}</a></p>
                        <p class="subtitle is-6"><a :href="'https://www.youtube.com/channel/' + video.snippet.channelId">{{ video.snippet.channelTitle }}</a></p>
                    </div>
                </div>
            
                <div class="content">
                    {{ video.snippet.description.substring(0,125) + '...' }}
                    <hr/>
                    <span class="icon-text" v-if="video.statistics">
                        <span class="icon">
                            <i class="fas fa-eye"></i>
                        </span>
                        <span>{{ video.statistics.viewCount }}</span>
                        <br>
                        <span class="icon">
                            <i class="fas fa-heart"></i>
                        </span>
                        <span>{{ video.statistics.likeCount }}</span>
                    </span>
                    <div>
                        <time v-bind:datetime="video.snippet.publishedAt">{{ video.snippet.publishedAt }}</time>
                    </div>
                </div>
                </div>
            </div>  
        </div>
    `
};