$(document).ready(function () {
    function baseAjax(method, url, param, accesskey) {
        var urlAjax = "http://localhost:8080/" + url;
        var response;
        $.ajax({
            method: method,
            url: urlAjax,
            contentType: "application/json;",
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', accesskey)
            },
            data: param,
            async: false,
            success: function (success) {
                response = success;
            },
            error: function () {
                response = "error";
            }
        })
        console.log(response);

        return response;
    }
    function baseAjax2(method, url, param, accesskey) {
        var urlAjax = "http://localhost:8080/" + url;
        var response;
        $.ajax({
            method: method,
            url: urlAjax,
            contentType: "application/json; charset=utf-8",
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', accesskey)
            },
            data: JSON.stringify(param),
            async: false,
            success: function (success) {
                response = success;
            },
            error: function () {
                response = "error";
            }
        })
        console.log(response);

        return response;
    }
    var id = 0;
    initUser();
    function initUser() {
        const token = sessionStorage.getItem("token")
        console.log(token)
        var response = baseAjax("GET", "user", {}, token);
        console.log(response)
        if(response.status == "0") {
            const user = response.result.user;
            $("#username").val(user.username)
            $("#email").val(user.email)
            $("#address").val(user.address)
            $("#phone").val(user.phone)
            id = user.id
        }
    }

    $("#btn-update").click(() => {
        var username = $("#username").val()
        var email = $("#email").val()
        var address = $("#address").val()
        var phone = $("#phone").val()
        const user = {
            username: username,
            email: email,
            address: address,
            phone: phone,
            id: id
        }
        console.log(user)
        const token = sessionStorage.getItem("token")
        console.log(token)
        var response = baseAjax2("POST", "user", user, token);
        console.log(response)
        if(response.status == "0") {
            alert("Update thông tin thành công!!!!")
        } else {
            alert("Update thông tin không thành công!!!!")
        }
    })

});