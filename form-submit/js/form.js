$(function() {
    var username = $("#form-name");
    var usertel = $("#form-tel");
    var usercompany = $("#form-company");
    username.blur(function() {
        var sum=0;
        for (var i=0; i<username.val().length; i++){
            var c = username.val().charCodeAt(i);
            if ((c >= 0x0001 && c <= 0x007e) || (0xff60<=c && c<=0xff9f)){
                sum++;
            }else{
                sum+=3;
            }
        }
        if (username.val() == "") {
            $(".ke-hint-1").show("1000");
        }else if(sum<6||sum>16){
            $(".ke-hint-1").show("1000");
        }
    });
    usertel.blur(function() {
        if (usertel.val() == "") {
            $(".ke-hint-2").show("1000");
        } else if (!usertel.val().match(/^(([0\+]\d{2,3}-)?(0\d{2,3})-)?(\d{7,8})(-(\d{3,}))?$/) && !usertel.val().match(/^1[3-9]\d{9}$/)) {
            $(".ke-hint-2").show("1000");
        }
    });
    usercompany.blur(function() {
        var sumc=0;
        for (var j=0; j<usercompany.val().length; j++){
            var cc = usercompany.val().charCodeAt(j);
            if ((cc >= 0x0001 && cc <= 0x007e) || (0xff60<=cc && cc<=0xff9f)){
                sumc++;
            }else{
                sumc+=3;
            }
        }
        if (usercompany.val() == "") {
            $(".ke-hint-3").show("1000");
        }else if(sumc<6){
            $(".ke-hint-3").show("1000");
        }
    });
    $(".hint-message").hover(function() {
            $(this).hide();
        },
        function() {

        });
//ajax 表单提交
$("#now-send").click(function(e) {
    e.preventDefault();
    var user_name = $("#form-name").val();
    var telephone = $("#form-tel").val();
    var RegTel=/^((([0\+]\d{2,3}-)?(0\d{2,3})-)?(\d{7,8})(-(\d{3,}))?|(1[3-9]\d{9}))$/;
    var sum=0;
    for (var i=0; i<user_name.length; i++){
        var c = user_name.charCodeAt(i);
        if ((c >= 0x0001 && c <= 0x007e) || (0xff60<=c && c<=0xff9f)){
            sum++;
        }else{
            sum+=3;
        }
    }
    if (user_name == "" || sum <6||sum>16) {
        $(".ke-hint-1").show("1000");
        e.preventDefault();
        return false;
    }
    if(!RegTel.test(telephone)|| telephone.length<=0 ){
        $(".ke-hint-2").show("1000");
        e.preventDefault();
        return false;
    }
    else {
        var mode = $("#tip-mode");
        var box = $(".ke-tips-bg");
        var enter_type=$("#form-type").val();
        var user = {
            user_name: user_name,
            telephone: telephone,
            enter_type:enter_type
        };
        $.ajax({
            type: "post",
            url: "/ajaxapply/",
            dataType: 'json',
            data: user,
            beforeSend: function () {
                //让提交按钮失效，以实现防止按钮重复点击
                $(".submit-button").attr('disabled', 'disabled');
            },
            complete: function () {
                //让登陆按钮重新有效
                $(".submit-button").removeAttr('disabled');
            },
            success: function(data) {
                if (data.status) {
                    box.find(".ke-tip-mode-body").find(".ke-error-show-success").show();
                    $(".ke-tips-bg").find(".ke-tip-remove").click(function(){
                        $("#offline-form")[0].reset();
                    });
                    $(".ke-tips-bg").click(function(){
                        $("#offline-form")[0].reset();
                    });
                }
                else {
                    box.find(".ke-tip-mode-body").find(".ke-error-show-fail").show();
                }
                //显示提示框
                mode.show();
                box.show();
            },
            error: function() {
                box.find(".ke-tip-mode-body").find(".ke-error-show-fail").show();
                mode.show();
                box.show();
            }
        });
    }
});
//隐藏提示框
$("#tip-mode").find(".ke-tip-remove").click(function(e) {
    e = e || event || window.event;
    e.preventDefault();
    e.stopPropagation();
    $(".ke-tips-bg").hide();
    $(".ke-error-show-success").hide();
    $(".ke-error-show-fail").hide();
});
$(".ke-tips-bg").click(function(){
    $(".ke-tips-bg").hide();
    $(".ke-error-show-success").hide();
    $(".ke-error-show-fail").hide();
});
});

