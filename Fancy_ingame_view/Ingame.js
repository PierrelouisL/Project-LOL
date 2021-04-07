function Look_player() {
    var Username = document.getElementsByClassName("username_in")[0].value;
    var region = document.getElementById("regions").value;
    var summoner_icon;
    var summoner_id;
    var summoner_accId;
    $.getJSON('https://ds257qd73l.execute-api.eu-west-3.amazonaws.com/rgapi/summoner/euw1/' + Username + '/1', function (data) { /*Problème de CORS à cause de la region*/
        summoner_icon = `${data.profileIconId}`;
        summoner_id = `${data.id}`;
        summoner_accId = `${data.accountId}`;
        //alert(`${data.summonerLevel}`);
        GetUserInfos(`${data.profileIconId}`, `${data.id}`, `${data.accountId}`, `${data.summonerLevel}`)

    });
}

function GetUserInfos(icon, id, accId, level) {
    var image = document.getElementById("summonerIcon");
    var srcimage = "https://ddragon.leagueoflegends.com/cdn/11.6.1/img/profileicon/" + summoner_icon + ".png";
    //alert(srcimage);
    image.src = srcimage;
}