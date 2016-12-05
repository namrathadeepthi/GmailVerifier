chrome.runtime.onMessage.addListener(function(request, sender) {
  if (request.action == "getSource") {
	//Sentiment();
    //message.innerText = request.source;
	var op=sentiment(request.source);
	//message.innerText+=output_string;
	//console.log(output_string);
	//output.innerText=output_string;
	//alert(op);
	//alert(output_string);
	spellcheck(request.source);
	keyphrasing(request.source);
	//synonyms();
  }
});
var returnvalue;
function onWindowLoad() {

  //var message = document.querySelector('#message');
   //var message = document.getElementById('#message');
   //var message= document.getElementsByClassName('Am.Al.editable.LW-avf')
  
  chrome.tabs.executeScript(null, {
    file: "getPagesSource.js"
	
  }, function() {
    // If you try and inject into an extensions page or the webstore/NTP you'll get an error
    if (chrome.runtime.lastError) {
      message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
    }
  });
 

}
var output_string=' ';
function sentiment(message) {
	    //alert("sentiment")
	
		//alert($ === undefined);
        var params = {
            // Request parameters
        };
      
	  console.log("testing")
        $.ajax({
            url: "https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/sentiment?" + $.param(params),
            beforeSend: function(xhrObj){
                // Request headers
                xhrObj.setRequestHeader("Content-Type","application/json");
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","ff5d394b63c14621b90b0a1b69dad608");
            },
            type: "POST",
            // Request body
            data: '{"documents":[{"language":"en","id":"1","text":"' + message + '"}]}',
        })
        .done(function(data) {
			 console.log("testing3")
		 var result = data.documents[0].score;
		 console.log("testing2")
      result = parseInt(result * 1000) / 10;
	  if(result > 55) {
        output_string='This seems to me as: ' + result + '% positive. ';
		
	  }else{
        output_string = "Hi, this email might not leave a positive impression. Would you rather undo." + 'This seems to me as: ' + result + '% negative. ';;
      }
	  var output = document.getElementById('output');
		output.innerHTML=output_string;
	 // alert(output_string);
            //alert("success");
        })
        .fail(function() {
           // alert("error");
        });
		 
		return output_string;
    }
	
	
	function sentiment2(message) {
	    //alert("sentiment")
	
		//alert($ === undefined);
        var params = {
            // Request parameters
        };
      
	  console.log("testing")
        $.ajax({
            url: "https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/sentiment?" + $.param(params),
            beforeSend: function(xhrObj){
                // Request headers
                xhrObj.setRequestHeader("Content-Type","application/json");
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","ff5d394b63c14621b90b0a1b69dad608");
            },
            type: "POST",
            // Request body
            data: '{"documents":[{"language":"en","id":"1","text":"' + message + '"}]}',
        })
        .done(function(data) {
			 console.log("testing3")
		 var result = data.documents[0].score;
		 console.log("testing2")
      result = parseInt(result * 1000) / 10;
	  if(result < 55) {
      //alert("We recommend you to change "+ message+'\n');
	  phrases=message.split(' ');
	  //alert("inside sentiment2")
	  getalternative(phrases);
	  //alert(result);
	  }
		 
		//return output_string;
    });
	}
	function getalternative(phrases) {
		//alert("Type of phrases is" +typeof(phrases));
		for(var i=0;i<phrases.length;i++)
		{
		synonyms(phrases[i]);	
		}
	}
	function sentiment3(message) {
	    //alert("sentiment")
	
		//alert($ === undefined);
        var params = {
            // Request parameters
        };
      var result;
	  console.log("testing")
        $.ajax({
            url: "https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/sentiment?" + $.param(params),
            beforeSend: function(xhrObj){
                // Request headers
                xhrObj.setRequestHeader("Content-Type","application/json");
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","ff5d394b63c14621b90b0a1b69dad608");
            },
            type: "POST",
            // Request body
            data: '{"documents":[{"language":"en","id":"1","text":"' + message + '"}]}',
        })
        .done(function(data) {
			 console.log("testing3")
		  result = data.documents[0].score;
		 console.log("testing2")
      result = parseInt(result * 1000) / 10;
	  
	//  return {returnvalue: result};
	  //alert(result);
	   returnvalue=result;
		 //alert(returnvalue);
	  })
		 //return result;
		
		//return output_string;
    
	}
	function spellcheck(message) {
        var finalString=' ';
		var params = {
            // Request parameters
            "text": message,
			//"mode": "Proof",
            //"mkt": "en-us",
            
        };
      
        $.ajax({
            url: "https://api.cognitive.microsoft.com/bing/v5.0/spellcheck/?" + $.param(params),
            beforeSend: function(xhrObj){
                // Request headers
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","562fc7559fba48d08b330b48b8d3cd20");
            },
            type: "GET",
            // Request body
            data: "{body}",
        })
        .done(function(data) {
            //alert("success");
			for (var i=0;i<data["flaggedTokens"].length;i++)
			{
			var wrong = data["flaggedTokens"][i].token;
			var right=data["flaggedTokens"][i].suggestions;
			//alert(currentObject);
            finalString+="Replace "+wrong+' '+"with "+right[0].suggestion+'\n';
            }
		if(finalString==" ")
			alert("You have no spelling errors! :)");
		else
	   alert(finalString);
        })
        .fail(function() {
            alert("error");
        });
    }
	
	function keyphrasing(message) {
        var params = {
            // Request parameters
        };
      
        $.ajax({
            url: "https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/keyPhrases?" + $.param(params),
            beforeSend: function(xhrObj){
                // Request headers
                xhrObj.setRequestHeader("Content-Type","application/json");
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","ff5d394b63c14621b90b0a1b69dad608");
            },
            type: "POST",
            // Request body
            data: '{"documents":[{"language":"en","id":"1","text":"' + message + '"}]}',
        })
        .done(function(data) {
           // alert("keyphrases is working");
			//alert(typeof(data));
			var finalString=' ', words=' ';
			for (var i=0;i<data["documents"].length;i++)
			{
			var phrases = data["documents"][i].keyPhrases;
			//alert("Your");
			for (var j=0;j<phrases.length;j++)
            {
			//finalString+=phrases[j]+'\n';
	        sentiment2(phrases[j]);
			//words+=phrases[j].split(' ')+',';
		    }
            }
		//alert(words);	
        })
        .fail(function() {
            //alert("error!!!!!!!!!");
        });
    }
	
	function synonyms(message) {
        var params = {
            // Request parameters
        };
      
        $.ajax({
            url: "http://words.bighugelabs.com/api/2/ed6b2deec4b4d7ff46fcbefcf0d540c1/"+message+"/json",
            beforeSend: function(xhrObj){
                // Request headers
               // xhrObj.setRequestHeader("Content-Type","application/json");
                //xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","ff5d394b63c14621b90b0a1b69dad608");
            },
            type: "GET",
            // Request body
            data: "{body}",
        })
        .done(function(data) {
           // alert("success");
			var result="";
			var json = JSON.parse(data) ;
			//var tempData= 
			//alert(typeof(json));
			//for (var key in data)
			//{
			//alert(data[key]);	
			//}
			//for (var i=0;i<x.length;i++)
				//result+=obj[i];
			//alert(x);
			for (var key in json) {
   //alert(' name=' + key + ' value=' + json[key]);
   var a = json[key];
   var syns=""; var toreplace=0,wordtoreplace="";
   for(var key2 in a)
   {
   syns=a[key2];
   for (var i=0;i<a[key2].length;i++)
   {
	   //alert("words="+a[key2][i])
	   //sentiment3(a[key2][i]);
	     var params = {
            // Request parameters
        };
      var result;
	  console.log("testing")
        $.ajax({
            url: "https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/sentiment?" + $.param(params),
            beforeSend: function(xhrObj){
                // Request headers
                xhrObj.setRequestHeader("Content-Type","application/json");
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","ff5d394b63c14621b90b0a1b69dad608");
            },
            type: "POST",
            // Request body
            data: '{"documents":[{"language":"en","id":"1","text":"' + a[key2][i] + '"}]}',
        })
        .done(function(data) {
			 console.log("testing3")
		  result = data.documents[0].score;
		 console.log("testing2")
      result = parseInt(result * 1000) / 10;
	  
	//  return {returnvalue: result};
	  //alert(result);
	   returnvalue=result;
	   //alert("return value ="+returnvalue);
	   if(returnvalue>toreplace)
	 {
		toreplace=returnvalue;
        wordtoreplace=a[key2][i];		
   }
   alert("We recommend you to change "+" "+ message+ " to "+" "+ wordtoreplace);
		 //alert(returnvalue);
	  })
	   
	 
   break;
   }break;
            }
			}
			
			//alert(syns);
			//alert(obj);
            })
		
      
        .fail(function() {
           // alert("error");
        })
    }

window.onload = onWindowLoad;