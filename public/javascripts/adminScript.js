$(document).ready(function() {

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