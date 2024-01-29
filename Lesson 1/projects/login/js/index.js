$(document).ready(function() {
    let isLoginValid = false,
    isPasswordValid = false,
    isCodeValid = false;

    $('#login').keyup(function() {
        validateLogin();
    });

    $('#password').keyup(function() {
        validatePassword();
    });

    $('#code').keyup(function() {
        validateCode();
    });

    $('#login_form').submit(function() {
        validateLogin();
        validatePassword();
        validateCode();

        if(!isLoginValid
            || !isPasswordValid
            || !isCodeValid) {
                event.preventDefault();
                event.stopPropagation();
                $(this).removeClass('was-validated');    
            }
        else {
            event.preventDefault();
            event.stopPropagation();
            $(this).addClass('was-validated');

            let innerData = {
                username:$('#login').val(),
                password:$('#password').val(),
                code:$('#code').val(),
                rememberMe:true
            };

            console.log(innerData);

            axios.post('http://127.0.0.1:8100/api/auth/login', innerData)
              .then(function (response) {
                console.log("backend response: ", response);
                if(response) {
                    if(response.data) {
                        if(response.data.token) {
                            localStorage.setItem("token", response.data.token);
                            location.replace("html/entered.html");
                        }
                    }
                }
                
              })
              .catch(function (error) {
                console.log(error);
              });
        }
    });

    $('#login_form').bind("reset", function() {
        $(this).removeClass('was-validated');
        $('#login').removeClass('is-valid');
        $('#login').removeClass('is-invalid');
        $('#password').removeClass('is-valid');
        $('#password').removeClass('is-invalid');
        $('#code').removeClass('is-valid');
        $('#code').removeClass('is-invalid');
    })
    
    function validateLogin() {
        let login = $('#login').val();
        if(login.length == ''){
            $('#login').removeClass('is-valid');
            $('#login').addClass('is-invalid');
            isLoginValid = false;
        }
        else {
            $('#login').removeClass('is-invalid');
            $('#login').addClass('is-valid');
            isLoginValid = true;
        }
    }

    function validatePassword() {
        let password = $('#password').val();
        if(password.length == ''){
            $('#password').removeClass('is-valid');
            $('#password').addClass('is-invalid');
            isPasswordValid = false;
        }
        else if(password.length < 3) {
            $('#password').removeClass('is-valid');
            $('#password').addClass('is-invalid');
            isPasswordValid = false;
        }
        else {
            $('#password').removeClass('is-invalid');
            $('#password').addClass('is-valid');
            isPasswordValid = true;
        }
    }

    function validateCode() {
        let code = $('#code').val();

        if(code.length == ''){
            $('#code').removeClass('is-valid');
            $('#code').addClass('is-invalid');
            isCodeValid = false;
        }
        else if(code.length != 6) {
            $('#code').removeClass('is-valid');
            $('#code').addClass('is-invalid');
            isCodeValid = false;
        }
        else {
            $('#code').removeClass('is-invalid');
            $('#code').addClass('is-valid');
            isCodeValid = true;
        }
    }
});