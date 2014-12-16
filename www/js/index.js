/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindDeviceReady();
		//this.bindEvents();
    },
	
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindDeviceReady: function() {
		console.log('bindDeviceReady');
		if (document.location.protocol == "file:") {
			// file protocol indicates phonegap
				document.addEventListener('deviceready', this.onDeviceReady, false);
			}else {
			// no phonegap, start initialisation immediately
			app.initApp();
			} 
    },
	initApp: function(){
		console.log('Geolocation call ...');
		var watchID = navigator.geolocation.watchPosition(app.onWatchPositionSuccessfunction, app.onWatchPositionError, { enableHighAccuracy:true, timeout: 30000 });
		console.log("watchId: "+watchID);
	},
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        // Options: throw an error if no update is received every 30 seconds.
		debugger;
		app.initApp();
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },
    
	// onSuccess Callback
	//   This method accepts a `Position` object, which contains
	//   the current GPS coordinates
	//
	onWatchPositionSuccessfunction: function (position) {
		
		var element = document.getElementById('geolocation');
		element.innerHTML = 'Latitude: '  + position.coords.latitude      + '<br />' +
							'Longitude: ' + position.coords.longitude     + '<br />';
	    console.log('Latitude: '  + position.coords.latitude      +'Longitude: ' + position.coords.longitude );
		app.showMap(position.coords.latitude,position.coords.longitude);
	},

	// onError Callback receives a PositionError object
	onWatchPositionError: function(error) {
		alert('code: '    + error.code    + '\n' +
			  'message: ' + error.message + '\n');
	},
	
	showMap: function(latitude, longitude){		
		var googleUrl = 'http://maps.google.com/maps?q=loc:'+latitude+','+longitude; 
		console.log('GoogleUrl: '+googleUrl);
		var mapPanelElement = document.getElementById('mappanel');
		mapPanelElement.innerHTML= '<iframe   style="height: 100%; width: 100%;" width="100%" src="'+googleUrl+'"></iframe>'
	}
};
