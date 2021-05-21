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
    var srcimage = "https://ddragon.leagueoflegends.com/cdn/11.10.1/img/profileicon/" + icon + ".png";
    image.src = srcimage;
    SetGameData(id);
}

function SetGameData(id) {
    $.getJSON('https://ds257qd73l.execute-api.eu-west-3.amazonaws.com/rgapi/summoner/euw1/' + id + '/11', function (data) {
        let playerlist = data.participants;
        document.getElementById("game_type").innerHTML = Which_Queue(data.gameQueueConfigId);
        console.log(Which_Queue(data.gameQueueConfigId));
        for (var i in playerlist) {
            let team_id = playerlist[i].teamId;
            let spell1Id = playerlist[i].spell1Id;
            let spell2Id = playerlist[i].spell2Id;
            let rune = playerlist[i].perks.perkStyle;
            let subrune = playerlist[i].perks.perkSubStyle;
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


            ////////////////////// START RUNES //////////////////////////////////
            document.getElementById("r" + i + "_1").src = "https://ddragon.leagueoflegends.com/cdn/img/" + Which_Runes(rune);
            document.getElementById("r" + i + "_2").src = "https://ddragon.leagueoflegends.com/cdn/img/" + Which_Runes(subrune);
            ////////////////////// END RUNES  ///////////////////////////////////

            ////////////////////// START SUMS //////////////////////////////////
            document.getElementById("s" + i + "_1").src = "http://ddragon.leagueoflegends.com/cdn/11.10.1/img/spell/" + Which_Sums(spell1Id) + ".png";
            document.getElementById("s" + i + "_2").src = "http://ddragon.leagueoflegends.com/cdn/11.10.1/img/spell/" + Which_Sums(spell2Id) + ".png";
            ////////////////////// END SUMS  ///////////////////////////////////

        }
        //let startTime = data.gameStartTime;  // In timestamp*
        //console.log(startTime.toISOString());
    });
    //if (document.getElementById("pseudo0").innerHTML != "pseudoB0") {
        // The player is in game!
        document.getElementById("team1").style.visibility = 'visible';
        document.getElementById("team2").style.visibility = 'visible';
        document.getElementById("game_type").style.visibility = 'visible';
        document.getElementsByClassName("username_in")[0].style.visibility = 'hidden';
        document.getElementsByClassName("search_button")[0].style.visibility = 'hidden';
        document.getElementsByClassName("form-control")[0].style.visibility = 'hidden';
    /*} else {
        // Player is not in a game!
        alert("Player not in game!");
    }*/


}

function Which_Champ(id_champ) {
    var champion;
    $.ajax({
        url: "https://ddragon.leagueoflegends.com/cdn/11.10.1/data/fr_FR/champion.json",
        async: false,
        dataType: 'json',
        success: function (d) {
            let championList = d.data;
            for (var i in championList) {
                if (championList[i].key == id_champ) {
                    champion = championList[i].id;
                    if (champion == "Fiddlesticks") {
                        champion = "FiddleSticks";
                    }
                    return champion;
                }
                //console.log(championList[i].id + " | " + championList[i].key);
            }
        }
    });
    return champion;
}

function Which_Queue(id_queue) {
    var queue;
    $.ajax({
        url: "http://static.developer.riotgames.com/docs/lol/queues.json",
        async: false,
        dataType: 'json',
        success: function (d) {
            let queuetype = d;
            for (var i in queuetype) {
                if (queuetype[i].queueId == id_queue) {
                    queue = queuetype[i].description;
                    return queue;
                }
            }
        }
    });
    return queue;
}

function Which_Runes(id_rune) {
    var rune;
    $.ajax({
        url: "https://ddragon.leagueoflegends.com/cdn/11.10.1/data/fr_FR/runesReforged.json",
        async: false,
        dataType: 'json',
        success: function (d) {
            let runetype = d;
            for (var i in runetype) {
                if (runetype[i].id == id_rune) {
                    rune = runetype[i].icon;
                    //console.log(rune);
                    return rune;
                }
            }
        }
    });
    return rune;
}


function Which_Sums(id_sum) {
    var summoner;
    $.ajax({
        url: "http://ddragon.leagueoflegends.com/cdn/11.10.1/data/en_US/summoner.json",
        async: false,
        dataType: 'json',
        success: function (d) {
            let sumtype = d.data;
            for (var i in sumtype) {
                if (sumtype[i].key == id_sum) {
                    summoner = sumtype[i].id;
                    return summoner;
                }
            }
        }
    });
    return summoner;
}