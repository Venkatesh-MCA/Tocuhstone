const express = require('express')
const mongoose = require('mongoose')

 
    getUniqeElements = (obj, field) => {
        var elements = [];
        for (var i in obj) {
            if (elements.indexOf(obj[i][field]) == -1) {
                elements.push(obj[i][field]);
            }
        }
        return elements;
    }
 

module.exports = getUniqeElements
