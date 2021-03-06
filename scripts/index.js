"use strict";


function keypress() {
    var userInput = $(this).attr('data-value');
    var status = strokeManager.forward(userInput);
    keyboard.clearErrors();
    if (status == strokeManager.FAILED){
        $(this).addClass("error");
    }
    resultManager.checkStrokePoint(userInput);
    resultManager.resetStartTime();
    if (status == strokeManager.FINISHED) {
        characterIndex++;
        wordsManager.updateIndex();
    }
}

function loadDataToUI(previousWord, currentWord, nextWord) {
    var $previousCharacter = $('#character .previous').empty(),
        $currentCharacter = $('#character .current').empty(),
        $nextCharacter = $('#character .next').empty(),
        $inform = $('#character .info').empty();


    if (!currentWord) {
        alert("恭喜你，通过闯关测试！");
        return;
    }

    if (previousWord) {
        $previousCharacter.html(previousWord["name"]);
    }

    $currentCharacter.html(currentWord["name"]);

    if (nextWord) {
        $nextCharacter.html(nextWord["name"]);
    }

    if (currentWord["inform"].length>0){
        $inform.html(currentWord["inform"]);
    }

    $('#strokes').empty().append(strokeManager.strokesGen(currentWord["strokes"].split(' ')));

}

$(document).ready(function () {
    $("body").height = window.innerHeight;
    $("body").width = window.innerWidth;
    if ( window.innerHeight < 500 ){
        $("body").css("font-size", "12px");
    }
    $.getJSON("data/basic.json", function (data) {

        wordsManager.words = data["words"].sort(function () {
            return Math.random() - 0.5;
        });
        loadDataToUI(wordsManager.previousWord(), wordsManager.currentWord(), wordsManager.nextWord());
        wordsManager.initStroke();
        resultManager.resetStartTime();
    });
    $('.key-wrapper').click(keypress);
    menu.init("pinyin.html");
});