const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const dateTime = require('node-datetime');
module.exports = function () {
    this.getpapercode = async () => {
        var finalobj=[];
        var date_ob = new Date();

        var day = ("0" + date_ob.getDate()).slice(-2);
        
        var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        
        var year = date_ob.getFullYear();   
        
        var date = year + "-" + month + "-" + day;    
        
        var hours = date_ob.getHours();
        if(hours<10){
            hours='0'+hours;    
        }else{
            hours
        }
        var minutes = date_ob.getMinutes();
        
        var seconds = date_ob.getSeconds();  
        
        //var dateTime = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
        const d = new Date();
        const monthNames = ["January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
        ];
        
        
        var dt = dateTime.create();
        var formatted = dt.format('Y-m-d');
        
            var creatobj=
            {
                
                    "Month": dt.format('m'),
                    "Monthname": monthNames[d.getMonth()],
                    "Year":  dt.format('Y'),           
                    "Date": dt.format('Y-m-d'),
                    "Date2": dt.format('d-m-Y'),
                    "Datetime": dt.format('Y-m-d H:M:S'),
                    "Datetime2": dt.format('d-m-Y H:M:S'),
                    "Datetimestring": dt.format('YmdHMS'),
                    "Time": dt.format('H:M:S'),
                    "Minuesseconds": dt.format('M:S'),
                    "Seconds": dt.format('S')
        
            }
              finalobj={"Message":"Success","Data":creatobj};
            return finalobj;
            //res.send({"Message":"Success","Data":creatobj})
        
    }
}
