$(document).ready(function() {

    $("#questionForm").submit(function(e){
      getFeedback();
      return false;
    });
    $('#logout').click(function(e) {
      logout();
    })
});

  function logout() {
    $.ajax({
            url : "/logout", // the endpoint
            //headers: { 'Content-Type': 'application/json'},
            type : "POST", // http method
            // handle a successful response
            success : function(data) {
              console.log("Success");
              window.location = data.redirect;  
            },
    
            // handle a non-successful response
            error : function(xhr,errmsg,err) {
                console.log("Error.");
                console.log(xhr.status + ": " + xhr.responseText); 
            }
    });
  }
  
  function getFeedback() {
    var rowCount = $('#questionsTable tr').length;
    rowCount = rowCount - 1;
    console.log("The row count is "+rowCount);

    for(var i=1;i<=rowCount;i++) {
      var actualAnswer = $("#actualAnswer"+i).val();
      var givenAnswer = $("input[name=youranswers"+i+"]:checked:first").val()

      if(actualAnswer == givenAnswer) {
        $('#feedback'+i).val('Correct');
      }
      else {
        $('#feedback'+i).val('Incorrect');
      }
    }

    sendBackEnd();
  }


  function sendBackEnd() {


  var ajaxData = $('#questionForm').serialize();

  //var ajaxData = 
       $.ajax({
            url : "/formsend", // the endpoint
            //headers: { 'Content-Type': 'application/json'},
            type : "POST", // http method
            //dataType:"json",
            data : ajaxData, // data sent with the post request
    
            // handle a successful response
            success : function(json) {
              console.log("Success");
              $('#submit').hide(true);
              alert("Your feedback was recorded. Thank you!");

            },
    
            // handle a non-successful response
            error : function(xhr,errmsg,err) {
                console.log("Error.");
                console.log(xhr.status + ": " + xhr.responseText); 
            }
    });
  }