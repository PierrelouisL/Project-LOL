var alreadylooked = 0;

document.getElementsByClassName("username_in")[0].addEventListener('keydown', function (event) {
    //console.log(event);
    if (event.key == "Enter" && !alreadylooked) {
        alreadylooked = 1;
        Look_player();
    } else {
        return false;
    }
});

document.getElementsByClassName("search_button")[0].addEventListener('click', function () {
    //console.log('test');
    if (alreadylooked) {
        alreadylooked = 1;
        Look_player();
    }
});

function Look_player() {
    var Username = document.getElementsByClassName("username_in")[0].value;
    var region = document.getElementById("regions").value;
    //console.log(Which_Champ("84"));
    $.getJSON('https://ds257qd73l.execute-api.eu-west-3.amazonaws.com/rgapi/summoner/euw1/' + Username + '/1', function (data) { /*Problème de CORS à cause de la region*/
        GetUserInfos(data.profileIconId, data.id, data.accountId, data.summonerLevel)
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
    $.getJSON('https://ds257qd73l.execute-api.eu-west-3.amazonaws.com/rgapi/summoner/euw1/' + id + '/10', function (data) {
        let playerlist = data.participants;
        for (var i in playerlist) {

            ///////////////////// START USERNAME ////////////////////////////////
            //console.log("pseudo" + i);
            document.getElementById("pseudo" + i).innerHTML = playerlist[i].summonerName;
            //console.log(playerlist[i].summonerName);
            ////////////////////// END USERNAME /////////////////////////////////

            ///////////////////// START CHAMPION ////////////////////////////////
            //console.log(playerlist[i].championId);
            document.getElementById("i" + i).src = "https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/" + Which_Champ(playerlist[i].championId) + "_0.jpg";
            //console.log(Which_Champ(playerlist[i].championId));
            ////////////////////// END CHAMPION /////////////////////////////////


        }
        let startTime = data.gameStartTime;  // In timestamp*
        console.log(startTime.toISOString());
    });
    if (document.getElementById("pseudo0").innerHTML != "pseudo0") {
        // The player is in game!
        document.getElementById("rightarray").style.visibility = 'visible';
        document.getElementById("leftarray").style.visibility = 'visible';
        document.getElementsByClassName("username_in")[0].style.visibility = 'hidden';
        document.getElementsByClassName("search_button")[0].style.visibility = 'hidden';
        document.getElementsByClassName("form-control")[0].style.visibility = 'hidden';
    } else {
        // Player is not in a game!
        alert("Player not in game!");
    }


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