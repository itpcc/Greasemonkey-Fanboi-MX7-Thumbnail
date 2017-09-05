// ==UserScript==
// @name         Fanboi MX7 image thumbnail
// @version      0.1
// @description  Retrive thumbnail image from MX7
// @author       You
// @match        https://fanboi.ch/*
// @grant        GM_xmlhttpRequest
// @connect      www.mx7.com
// ==/UserScript==

(function() {
    'use strict';
    var linkList = document.querySelectorAll("a[href*='mx7.com']").forEach(function(node){
        if(node.href){
            GM_xmlhttpRequest ( {
                method:     'GET',
                url:        node.href,
                onload:     function (responseDetails) {
                    var doc = document.implementation.createHTMLDocument("");
                    doc.documentElement.innerHTML = responseDetails.responseText;
                    var imgURL = doc.querySelector("a[data-toggle]").href;
                    if(imgURL){
                        var p = document.createElement("p");
                        p.innerHTML= `<a href="${node.href}" class="thumbnail" target="_blank"><img src="${imgURL}"></a>`;
                        p.ClassName = "thumbnails";
                        console.log(p.innerHTML, node);
                        node.parentNode.parentNode.appendChild(p);
                    }
                }
            } );
        }
    });
})();
