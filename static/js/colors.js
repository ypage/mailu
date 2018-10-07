export function changeColor(dom1) {
    var color = "#82AD99|#A2A288|#E2BA9E|#EE9493|#F84065|#068043|#AEDD81";//定义一条变换颜色的字符串  
    color = color.split("|"); //然后通过split方法进行分割  
    var xuan = document.getElementsByTagName(dom1);//获得元素  
    alert(dom1);
    for (var i = 0; i < xuan.length; i++) {
        xuan[i].style.color = color[parseInt(Math.random() * color.length)];//设置样式   

    }

}