/**
 * Created by Administrator on 2016/7/1.
 */
$(function(){
    var _box =$('#box');
    var _interval=3000; //刷新间隔时间3秒
    function gdb(){
        $("<dd style='height:0px;'><div class='fg-left'><span>1小时前</span></div><div class='fg-right'><h4>王**购了60元</h4><a href='#'>银亿1号0617040</a></div></dd>").prependTo('#box dl');
        var _first=$('#box dl dd:first');
        _first.animate({height: '+53px'}, "slow");
        var _last=$('#box dl dd:last');
        _last.remove();
        setTimeout(function(){
            gdb();
        },_interval);
    };
    gdb();
});