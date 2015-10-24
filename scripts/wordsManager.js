"use strict";

$(document).ready(function () {
    $.getJSON("data/basic.json", function (data) {
        console.log(data);
        wordsManager.words = data["words"];
        loadDataToUI(wordsManager.previousWord(), wordsManager.currentWord(), wordsManager.nextWord());
    })
});

var wordsManager = {
    words: [],
    currentIndex: 0,
    updateIndex: function () {
        this.currentIndex++;
        loadDataToUI(this.previousWord(), this.currentWord(), this.nextWord());
    },
    currentWord: function () {
        return this.words[this.currentIndex];
    },
    nextWord: function () {
        return this.words[this.currentIndex + 1];
    },
    previousWord: function () {
        return this.words[this.currentIndex - 1];
    }
};
