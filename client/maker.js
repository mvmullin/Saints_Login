$(document).ready(function() {

    const handleError = (message) => {
        $("#errorMessage").text(message);
        $("#domoMessage").animate({width:'toggle'},350);
    }
    
    const sendAjax = (action, data) => {
        $.ajax({
            cache: false,
            type: "POST",
            url: action,
            data: data,
            dataType: "json",
            success: (result, status, xhr) => {
                $("#domoMessage").animate({width:'hide'},350);

                window.location = result.redirect;
            },
            error: (xhr, status, error) => {
                const messageObj = JSON.parse(xhr.responseText);
            
                handleError(messageObj.error);
            }
        });        
    }
    
    $("#updateDisplay").on("click", (e) => {
        e.preventDefault();
    
        $("#domoMessage").animate({width:'hide'},350);
    
        if($("#displayName").val() == '') {
            handleError("RAWR! All fields are required");
            return false;
        }

        sendAjax($("#displayForm").attr("action"), $("#displayForm").serialize());
        
        return false;
    });
    
});