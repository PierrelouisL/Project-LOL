function Look_player() {
    var Username = document.getElementsByClassName("username_in")[0].value;
    var region = document.getElementById("regions").value;
    console.log(Which_Champ("84"));
    $.getJSON('https://ds257qd73l.execute-api.eu-west-3.amazonaws.com/rgapi/summoner/euw1/' + Username + '/1', function (data) { /*Problème de CORS à cause de la region*/
        GetUserInfos(`${data.profileIconId}`, `${data.id}`, `${data.accountId}`, `${data.summonerLevel}`)
    });
}

function GetUserInfos(icon, id, accId, level) {
    var image = document.getElementById("summonerIcon");
    var srcimage = "https://ddragon.leagueoflegends.com/cdn/11.6.1/img/profileicon/" + icon + ".png";
    image.src = srcimage;
}

function Which_Champ(id_champ) {
    var champion;
    $.ajax({
        url: "https://ddragon.leagueoflegends.com/cdn/11.6.1/data/fr_FR/champion.json",
        async: false,
        dataType: 'json',
        success: function (d) {
            let championList = d.data;
            for (var i in championList) {
                if (championList[i].key == id_champ) {
                    champion = championList[i].id;
                    return champion;
                }
                //console.log(championList[i].id + " | " + championList[i].key);
            }
        }
    });
    return champion;
}