const VideoApp = {
    data() {
        return {
            burgerMenuOpen: false
        }
    },
    methods: {
        openCloseMenu() {
            this.burgerMenuOpen = !this.burgerMenuOpen;
        },
        search() {
            console.log('Search!');
        }
    }
}
  
const app = Vue.createApp(VideoApp);

app.component('video-card', VideoCardComponent);

app.mount('#app');