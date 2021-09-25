
/* TAREFAS QUE FALTAM:

1) AO skipNext E skipPrevious COM A MÚSICA ANTERIOR playing(),
fazer com que o ícone do pause vire background = play.png


2) Ao MUTAR através do volumeIcn, volumeRange = 0

3) Ao MUTAR pelo volumeIcn, quando o mouseover no volumeRange
a música recupera o áudio (pois o volumeRange não é = 0)

*/


// variáveis contidas no player
var audio = document.querySelector("#audio")
var audioSource = document.querySelector("#audioSource")
var title = document.querySelector("#title")
var artist = document.querySelector("#artist")
var btnSlower = document.querySelector("#slower")
var btnFaster = document.querySelector("#faster")
var btnSkipPrevious = document.querySelector("#skipPrevious")
var btnSkipNext = document.querySelector("#skipNext")
var btnPlay = document.querySelector("#btnPlay")
var btnStop = document.querySelector("#btnStop")
var durationStart = document.querySelector("#durationStart")
var durationEnd = document.querySelector("#durationEnd")
var durationRange = document.querySelector("#durationRange")
var volumeRange = document.querySelector("#volumeRange")
var volumeIcn = document.querySelector("#volumeIcn")


var playlist = [
    {
    title: "Bad To The Bone",
    artist: "George Throgood",
    file: "./songs/George_Thorogood_Bad_To_The_Bone.mp3"
    },

    {
    title: "You Shook Me All Night Long",
    artist: "AC/DC",
    file: "./songs/ACDC_You_Shook_Me_All_Night_Long.mp3"
    },

    {
    title: "Carry On My Wayward Son",
    artist: "Kansas",
    file: "./songs/Kansas_Carry_On_My_Wayward_Son.mp3"
    },

    {
    title: "All My Love",
    artist: "Led Zeppelin",
    file: "./songs/Led_Zeppelin_All_My_Love.mp3"
    },

    {
    title: "She's Not There",
    artist: "Zombies",
    file: "./songs/Zombies_She_s_Not_There.mp3"
    }
]

//controlar as faixas de músicas no player

var index = 0;

function player(index){

    title.innerHTML = playlist[index].title;
    artist.innerHTML = playlist[index].artist;
    audioSource.src = playlist[index].file;

    audio.load();
}

player(index);

//deixar o player em off ao abrir a página

var audioPlaying = false;

//função de play e pause

btnPlay.style.background = "url(./assets/play.png) no-repeat"
btnPlay.style.paddingRight = "22px"
function playing(){
    if(audio.paused){
        audio.play();
        btnPlay.style.background = "url(./assets/pause.png) no-repeat";
        return audioPlaying = true;
    } else {
        audio.pause();
        btnPlay.style.background = "url(./assets/play.png) no-repeat";
        return audioPlaying = false;
    }
}

//função de parar a música
function stopping(){
    audio.pause();
    audio.currentTime = 0;
    btnPlay.style.background = "url(./assets/play.png) no-repeat";
    return audioPlaying = false;
}

//função para mudar a faixa musical para anterior
function skipPrevious(){
    if (index == 0){
        index = playlist.length;
        player(index);
        audioPlaying = false;
        playing();
    } else {
        index--;
        player(index);
        audioPlaying = false;
        playing();
    }
}

//função para mudar a faixa musical para a próxima
function skipNext(){
    if (index == playlist.length){
        index = 0;
        player(index);
        audioPlaying = false;
        playing();
    } else {
        index++;
        player(index);
        audioPlaying = false;
        playing();
    }
}

//função para mudar automaticamente após a música finalizar

var currentTime = audio.currentTime;
var totalTime = audio.duration;

function autoChange(){
    if (currentTime == totalTime){
       skipNext();
    }
}

//função para desacelerar a música

function slower(){

    audio.playbackRate -= 0.1;
    
}
    
//função para acelerar a música
function faster(){

    audio.playbackRate += 0.1;

}


//ajustando o volume range do player
volumeRange.addEventListener("mousemove", setVolume);
function setVolume(){

    volumeStatus = audio.volume
    audio.volume = volumeRange.value / 100;

}

//função de mutar a música
volumeIcn.addEventListener("click", mute)
    function mute(){
        if (mute == false){
            audio.volume = 0;
            volumeIcn.style.background = "url(./assets/mute.png) no-repeat";
            return mute = true;
        } else {
            audio.volume = volumeRange.value/100;
            volumeIcn.style.background = "url(./assets/volume.png) no-repeat";
            return mute = false;
        }
    }


//ajustando o tempo de duração da música

durationRange.addEventListener('input', timeAudio);

function timeAudio(){

    audio.currentTime = durationRange.value;
}

function timeChange(){

    durationRange.max = audio.duration;
    durationRange.value = audio.currentTime;

    var curmins = Math.floor(audio.currentTime / 60);
    var cursecs = Math.round(audio.currentTime % 60);
    var durmins = Math.floor(audio.duration / 60);
    var dursecs = Math.round(audio.duration % 60);

    if(cursecs < 10) {
        cursecs = "0" + cursecs;
    }
    if(dursecs < 10){
        dursecs = "0" + dursecs;
    }
    if (curmins < 10){
        curmins = "0"+ curmins;
    }
    if (durmins < 10){
        durmins = "0" + durmins;
    }

    durationStart.innerHTML = curmins + ":" + cursecs;
    durationEnd.innerHTML = durmins + ":" + dursecs;

    autoChange();

}

setInterval(timeChange, 1000)