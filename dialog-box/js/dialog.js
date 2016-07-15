$(document).ready(function(){
    $("#now-send").click(function () {
        $(".ke-tips-bg").show();
        $(".ke-error-show-success").show();
    });
//隐藏提示框
    $("#tip-mode").find(".ke-tip-remove").click(function (e) {
        e = e || event || window.event;
        e.preventDefault();
        e.stopPropagation();
        $(".ke-tips-bg").hide();
        $(".ke-error-show-success").hide();
        $(".ke-error-show-fail").hide();
    });
    $(".ke-tips-bg").click(function () {
        $(".ke-tips-bg").hide();
        $(".ke-error-show-success").hide();
        $(".ke-error-show-fail").hide();
    });
});

