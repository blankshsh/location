$(document).ready(function() {
    $(window).on("load", function() {
        imgLocation(); //运行排序
        var dataImg = { "data": [{ "src": "01.jpg" }, { "src": "02.jpg" }, { "src": "03.jpg" }, { "src": "04.jpg" }, { "src": "05.jpg" }] } //滚动添加新图片
        window.onscroll = function() {
            if (scrollside()) {
                $.each(dataImg.data, function(index, value) {
                    //定义新的div标签 内容 img
                    var box = $("<div>").addClass("box").appendTo($("#container")); //创建div 赋予css属性 插入到container内
                    var content = $("<div>").addClass("content").appendTo(box); //创建div 赋予css属性 插入到box内
                    $("<img>").attr("src", "./img/" + $(value).attr("src")).appendTo(content); //创建img 赋予文件来源 插入到content内
                })
                imgLocation(); //重新运行排序
            }
        };
        $(window).resize(function() {
            imgLocation();
        }); //窗口拖动重新执行排序

    });
});

function scrollside() {
    var box = $(".box");
    var lastboxHeight = box.last().get(0).offsetTop + Math.floor(box.last().height() / 2); //设置最后张加载到一半开始加载新的
    var documentHeight = $(window).height(); //获取高度
    var scrollHeight = $(window).scrollTop(); //获取鼠标高度
    return (lastboxHeight < documentHeight + scrollHeight) ? true : false; //判断是否允许滚动
    //最后张图片距离顶部的高度 小于 鼠标高度+页面高度时 运行
    //最后张图片加载一半 就运行
}

function imgLocation() {
    var box = $(".box"); //获取box
    var boxWidth = box.eq(0).width(); //获取盒子宽度
    var num = Math.floor($(".wrp").width() / boxWidth); //判断每行可以放几个盒子
    var boxArr = []; //创建数组
    box.each(function(index, value) {

        var boxHeight = box.eq(index).height();
        if (index < num) {
            boxArr[index] = boxHeight; //获取盒子高度
            $(".box").removeAttr("style"); //页面拉伸清楚第一行元素的style，防止变形
        } else {

            var minboxHeight = Math.min.apply(null, boxArr);
            //获取最小的盒子高度
            var minboxIndex = $.inArray(minboxHeight, boxArr);
            //获取最小盒子的位置

            $(value).css({ //添加style
                'position': "absolute",
                "top": minboxHeight,
                "left": box.eq(minboxIndex).position().left,

            });
            boxArr[minboxIndex] += box.eq(index).height(); //第一行最小高度图片下方插入图片之后该列的高度
        }
    });


}
