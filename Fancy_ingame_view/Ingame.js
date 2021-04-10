document.getElementsByClassName("username_in")[0].addEventListener('keydown', function (event) {
    //console.log(event);
    if (event.key == "Enter") {
        Look_player();
    } else {
        return false;
    }
});

document.getElementsByClassName("search_button")[0].addEventListener('click', function () {
    console.log('test');
    Look_player();
});

function Look_player() {
    var Username = document.getElementsByClassName("username_in")[0].value;
    var region = document.getElementById("regions").value;
    //console.log(Which_Champ("84"));
    $.getJSON('https://ds257qd73l.execute-api.eu-west-3.amazonaws.com/rgapi/summoner/euw1/' + Username + '/1', function (data) { /*Problème de CORS à cause de la region*/
        GetUserInfos(`${data.profileIconId}`, `${data.id}`, `${data.accountId}`, `${data.summonerLevel}`)
    });

}

function GetUserInfos(icon, id, accId, level) {
    var image = document.getElementById("summonerIcon");
    console.log(icon);
    console.log(id);
    console.log(accId);
    console.log(level);
    var srcimage = "https://ddragon.leagueoflegends.com/cdn/11.6.1/img/profileicon/" + icon + ".png";
    image.src = srcimage;
    SetGameData(id);
}

function SetGameData(id) {
    document.getElementById("rightarray").style.visibility = 'visible';
    document.getElementById("leftarray").style.visibility = 'visible';
    document.getElementsByClassName("username_in")[0].style.visibility = 'hidden';
    document.getElementsByClassName("search_button")[0].style.visibility = 'hidden';
    document.getElementsByClassName("form-control")[0].style.visibility = 'hidden';
    $.getJSON('https://ds257qd73l.execute-api.eu-west-3.amazonaws.com/rgapi/summoner/euw1/' + id + '/10', function (data) {
        let playerlist = data.participants;
        for (var i in playerlist) {
            //document.getElementById("pseudo" + i).innerHTML = playerlist[i].summonerName.key;
            console.log(playerlist[i].summonerName.key);
        }
    });
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