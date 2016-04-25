var version = "00";
var first_rooms = true;
var rooms_html = "";
var main_url = "http://localhost:8080/radioMC/radio/";

var titlebar_visible_css = '-webkit-box-shadow: 2px 7px 20px -1px rgba(0,0,0,0.75);\
                              -moz-box-shadow: 2px 7px 20px -1px rgba(0,0,0,0.75);\
                              box-shadow: 2px 7px 20px -1px rgba(0,0,0,0.75);\
                              background-color: #bfbfbf;\
                              float:left;\
                              position:fixed;\
                              width:100%;\
                              height:5vmin;\
                              font-size: 3vmin;\
                              z-index:2;\
                              color: black;\
                              line-height:5vmin;\
                              text-align: center;\
                              font-family: "Roboto", sans-serif !important;';

var titlebar_main_html = '<span><span class="fa-stack fa-3x options-button">\
              <i class="fa fa-circle fa-stack-2x button-bg"></i>\
              <i class="fa fa-circle-thin fa-stack-2x button-bg-out"></i>\
              <i class="fa fa-cog fa-stack-1x button-icon"></i>\
            </span>\
            Main Menu\
            <img class="titlebar-image" src="../images/radio_logo.png"</span>';

var titlebar_guideme_html = 'Guide me\
                  <img class="titlebar-image" src="../images/radio_logo.png">';


var titlebar_smarthome_html = 'Smart Home\
<img class="titlebar-image" src="../images/radio_logo.png">';

var main_button_html = /*'<span class="fa-stack fa-5x main-button" onClick="changeHTML(\'Back To Main Menu\')">\
                  <i class="fa fa-circle fa-stack-2x button-bg"></i>\
                  <i class="fa fa-circle-thin fa-stack-2x button-bg-out"></i>\
                  <img src="../images/radio_logo.png" style="width:12.5vmin;height:auto;padding-top:1vmin;">\
                </span>\
                <br>\
                <a class="main-button-text">Main Menu</a>';*/
                '<img class="main-menu-image" src="../images/home-512.png" onclick="changeHTML(\'Back To Main Menu\')"">\
                <br>\
                <a class="main-button-text">Back To Main Menu</a>';

var smarthome_button_html = '<div class="dontbreak"><span onClick="changeHTML(\'Smart Home\')" class="fa-stack fa-3x button">\
              <i class="fa fa-circle fa-stack-2x button-bg"></i>\
              <i class="fa fa-circle-thin fa-stack-2x button-bg-out"></i>\
              <i class="fa fa-plug fa-stack-1x button-icon"></i>\
            </span>\
            <br><br>\
            <a class="button-text">Smart Home</a></div>';

var guideme_button_html = '<div class="dontbreak"><span onClick="changeHTML(\'Guide Me\')" class="fa-stack fa-3x button">\
              <i class="fa fa-circle fa-stack-2x button-bg"></i>\
              <i class="fa fa-circle-thin fa-stack-2x button-bg-out"></i>\
              <i class="fa fa-location-arrow  fa-stack-1x button-icon"></i>\
            </span>\
            <br><br>\
            <a class="button-text">Guide Me</a></div>';

var social_button_html = '<div class="dontbreak"><span class="fa-stack fa-3x button">\
              <i class="fa fa-circle fa-stack-2x button-bg"></i>\
              <i class="fa fa-circle-thin fa-stack-2x button-bg-out"></i>\
              <i class="fa fa-users fa-stack-1x button-icon"></i>\
            </span>\
            <br><br>\
            <a class="button-text">Friends</a></div>';

var other_button_html = '<div class="dontbreak"><span class="fa-stack fa-3x button">\
              <i class="fa fa-circle fa-stack-2x button-bg"></i>\
              <i class="fa fa-circle-thin fa-stack-2x button-bg-out"></i>\
              <i class="fa fa-user-plus fa-stack-1x button-icon"></i>\
            </span>\
            <br><br>\
            <a class="button-text">Other Functions</a></div>';


var main_menu_html = '\
          '+smarthome_button_html+'\
          <br><br>\
          '+guideme_button_html+'\
          <br><br>\
          '+social_button_html+'\
          <br><br>\
          '+other_button_html;

function init(){
    //document.getElementById("body").style.backgroundColor="#e6e6e6";
    document.getElementById("main-menu").innerHTML = main_menu_html;
    document.getElementById("enControl").innerHTML = "";
    document.getElementById("main-button-container").innerHTML = "";
    document.getElementById("titlebar").innerHTML = titlebar_main_html;
    //document.getElementById("titlebar").style="";
    //document.getElementById("titlebar").style=titlebar_visible_css;
}

function toggleOverlay(message){
  var overlay = document.getElementById('overlay');
  var specialBox = document.getElementById('specialBox');
  overlay.style.opacity = .8;
  if(overlay.style.display == "block"){
    overlay.style.display = "none";
    specialBox.style.display = "none";
  } else {
    overlay.style.display = "block";
    specialBox.innerHTML = "<img src=\"../images/radio_logo.png\"><br>"+message;
    specialBox.style.display = "block";
  }

}
function changeHTML(button){
	if(button == 'Guide Me'){
		getRooms();
    //document.getElementById("titlebar").style = titlebar_visible_css;
    document.getElementById("titlebar").innerHTML = titlebar_guideme_html;
	}
	else if(button == 'Back To Main Menu'){
    init();
	}
  else if(button == 'Smart Home'){
    document.getElementById("enControl").innerHTML = '<iframe id="enControl_frame" frameBorder="0" src="https://www.nassist-test.com/installations/00000000-0000-0000-0000-b827eb7ee234/Dashboard"></iframe>';
    document.getElementById("main-menu").innerHTML = "";
    document.getElementById("main-button-container").innerHTML = main_button_html;
    document.getElementById("titlebar").innerHTML = titlebar_smarthome_html;

    //document.getElementById("titlebar").style=titlebar_visible_css;
  }
}

function getRooms(){
	if(first_rooms){
    //TODO this needs to have the ip of the final server
		$.get(main_url+'getrooms/', function(data) {
			first_rooms = false;
      if(version == data.version){
	    	for ( var i = 0; i < data.rooms.length; i++){
        		console.log("ID: " + data.rooms[i].id + " Name " + data.rooms[i].name+ " X " + data.rooms[i].x+ " Y " + data.rooms[i].y);
        		rooms_html = rooms_html.concat('<div class="dontbreak"><span class="fa-stack fa-3x button">\
        			<i class="fa fa-circle fa-stack-2x button-bg"></i>\
              <i class="fa fa-circle-thin fa-stack-2x button-bg-out"></i>\
        			<i id="room'+data.rooms[i].id+'"onClick="gotoID('+data.rooms[i].id+')" class="fa '+data.rooms[i].icon+' fa-stack-1x button-icon"></i></span>\
        			<br><br>\
        			<a class="button-text">'+data.rooms[i].name+'</a>\
        			<br><br></div>');
    		}
        document.getElementById("main-menu").innerHTML = rooms_html+"";
        document.getElementById("main-button-container").innerHTML = main_button_html;

      }
      else{
         window.alert("Client and Server versions are not compatible. Please update ASAP. Doing nothing...");
      }
    });
	}
	else{
		document.getElementById("main-menu").innerHTML = rooms_html;
    document.getElementById("main-button-container").innerHTML = main_button_html;
	}
}

function gotoID(id){
  $.ajax({
      type: 'POST',
      url: main_url+'smarthome/',
      data: JSON.stringify({action_type:"goto",location:{id:id}}),
      dataType: 'json',
      contentType: "application/json",
      success: function(data, textStatus, jqXHR){
          toggleOverlay(data.response);
      },
      error: function(data){
        console.log(data);
      }
  });
}

function gotoXY(x, y, theta){
  $.ajax({
      type: 'POST',
      url: main_url+'smarthome/',
      data: JSON.stringify({action_type:"goto",location:{x:x,y:y,theta:theta}}),
      dataType: 'json',
      contentType: "application/json",
      success: function(data, textStatus, jqXHR){
          toggleOverlay(data.response);
      },
      error: function(data){
        console.log(data);
      }
  });
}

//-----
//The two functions below should be used in the configuration webapp.
//-----


//test functions
function addNew(){//test1
  //javascript needs to ask for the current rooms in order to get the maximum id.
  id = 2;
  $.ajax({
      type: 'POST',
      url: main_url+'addrooms/',
      data: JSON.stringify({version:version,rooms:[{id:id, name:"Cafeteria", type:"other", icon:"fa-users", x:"12", y:"3.4", "theta":"0.1"}]}),
      dataType: 'json',
      contentType: "application/json"
      });
}

function del(){//test2
  id = 1;
  id2 = 2;
  $.ajax({
      type: 'POST',
      url: main_url+'delrooms/',
      data: JSON.stringify({ids:[{id:id},{id:id2}]}),
      dataType: 'json',
      contentType: "application/json"
      });
}