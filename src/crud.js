const { app, BrowserWindow } = require('electron');
const fs = require('fs')
const path = require('path')

var btnCreate = document.getElementById('btnCreate')
var btnRead = document.getElementById('btnRead')
var btnUpdate = document.getElementById('btnUpdate')
var btnDelete = document.getElementById('btnDelete')
var fileName = document.getElementById('fileName')
var fileContents = document.getElementById('fileContents')

let pathName = path.join(__dirname, 'Files') //ni utk buat link antara txt file tu saya nk create dekat folder mana //Files tu nama folder

btnCreate.addEventListener('click', function(){  //creating text file when user click CREATE button
  let file = path.join(pathName, fileName.value)
  let contents = fileContents.value
  fs.writeFile(file, contents, function(err){ //param1: textfile yg kita nak write param2: apa yg kita nak write ke text file //fs is obj
    if(err){
      return console.log(err)
    }

    fileName.value = ""
    fileContents.value = ""

    var txtfile = document.getElementById("fileName").value
    alert(txtfile + " text file was created") //to show dialog box
    console.log("The file was created")
  
  })
  
})

btnRead.addEventListener('click', function(){  //read contents of the created text file
  let file = path.join(pathName, fileName.value)
 
  fs.readFile(file, function(err, data){ 
    if(err){
      return console.log(err)
    }
    fileContents.value = data
    console.log("The file was read!")
  })
  
})

btnUpdate.addEventListener('click', function(){  
  let file = path.join(pathName, fileName.value)
  let contents = fileContents.value
  
  fs.writeFile(file, contents, function(err){ //param1: textfile yg kita nak write param2: apa yg kita nak write ke text file
    if(err) throw err;
    console.log("The file was updated!")

    fileName.value = ""
    fileContents.value = ""

    alert("Content in file has been updated")
  })
  
})


btnDelete.addEventListener('click', function(){  
  let file = path.join(pathName, fileName.value)
 
  fs.unlink(file, function(err){ 
    if(err){
      return console.log(err)
    }
    fileName.value = ""
    fileContents.value = ""
    console.log("The file was deleted!")
    alert("The file was deleted!")
  })
  
})