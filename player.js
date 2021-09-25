
window.player = {
    
    title: document.querySelector("#title"),
    artist: document.querySelector("#artist"),
    audio: document.querySelector("#audio"),
    data: 
    {
        title: "Bad To The Bone",
        artist: "George Throgood",
        file: "./songs/George_Thorogood_Bad_To_The_Bone.mp3",
    },
    playing(){
        this.title.innerHTML = this.data.title;
        this.artist.innerHTML = this.data.artist;
        this.audio.src = this.data.audio
    }

}