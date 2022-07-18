$(document).ready(function(){
    AllPath = "https://raw.githubusercontent.com/MaxMeents/Universe-In-A-Folder/main/All/All.txt"
    LoadTxt(AllPath,1);
    disFTop = 80;
    //console.log("working")
    BackLink = []
    t = "All"
    ModalTitle = "Movable Resizable for Youtube & Wikipedia"
    $("body").on("click",".link.fl",function(e){
        l = $(this).find('a').attr('tag');
        
        lue = _.unescape(l)
        le = _.escape(l)
        BackLDe(le)
        lue = lue.replace(/#/g, "%23")
        LoadTxt(lue,3)
       
       
    });
    function BackLDe(checkForLink){
        c = 0
        for(i = 0; i < BackLink.length;i++){
            if(c == 1){
                
                BackLink = BackLink.splice(0,i)
            }else if(BackLink[i].includes(checkForLink)){
               // alert(link);
                c = 1
            }
            
        }
            BackL();
        
    }
    BL = "<div class='link fl'><a class='loadtxt' tag='"+AllPath+"'>"+t+"&nbsp; &nbsp;  \> &nbsp; &nbsp; </a></div>"
    BackLink.push(BL);
    BackL();
    function BackL(){
        $('.curNav').empty();
        for(i = 0; i < BackLink.length;i++){
            $(".curNav").append(BackLink[i]);
        }
    }
    function BackLR(){
        $('.curNav').empty();
        BackLink.pop()
        for(i = 0; i < BackLink.length;i++){
            $(".curNav").append(BackLink[i]);
        }
    }
    $("body").on("click",".result_1 > .link",function(e){
        l = $(this).find('a').attr("tag")
        lue = _.unescape(l)
        le = _.escape(l)
        t = $(this).find('a').text();
        runnext = true;
        if($("body").find(".toggle_3").hasClass("toggle_3")){
            runnext = false;
            $("body").find(".toggle_3").remove();
            BackLR()
        }
        if(/\.txt/i.test(l) && runnext == true){
            le = "https://raw.githubusercontent.com/MaxMeents/Universe-In-A-Folder/main" + le
            lue = _.unescape(le)
            lue = lue.replace(/#/g, "%23")
            $(this).append("<div class='result_3 toggle_3'></div>")
            LoadTxt(lue,3);
            t = $(this).find('a').text();
            if(t.length > 18){
                t = t.substring(0,18);
                t = t + "..."
            }
            
            BL = "<div class='link fl'><a class='loadtxt' tag='"+le+"'>"+t+"&nbsp; &nbsp;  \>&nbsp; &nbsp;  </a></div>"
            BackLink.push(BL);
            BackL();

        }else if(runnext == true){
            if(parser(l)){
                md(t)
                //alert(t)
                $('.Container').empty().append('<iframe width="90%" height="90%" src="https://www.youtube.com/embed/'+parser(l)+'?&autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>')
                
            }else{
                window.open(l, '_blank');
            }
        }
       //alert(e)
    });
    $('.Modal').resize(function(){
        $('.Container').find("iframe").css({width:$('.Container').width(),height:$('.Container').height(),})
        
    })
    function parser(url){
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\/)|(\?v=|\&v=))([^#\&\?]*).*/;
        var match = url.match(regExp);
        if (match && match[8].length==11){
                return match[8];
        }else{
                return false;
        }
    }
    $("body").on("mouseenter",".result_1 > .link",function(e){
        //$("#result_1 < .link.resultHover").removeClass("resultHover");
        $(".result_1 > .link").removeClass("resultHover")
        $(this).addClass("resultHover")
        l = $(this).find('a').attr("tag")
        lue = _.unescape(l)
        le = _.escape(l)
        if(/\.txt/i.test(l)){
            t = $(this).find('a').text();
            if(t.length > 18){
                //alert("longer")
                t = t.substring(0,18);
                t = t + "..."
            }
            le = "https://raw.githubusercontent.com/MaxMeents/Universe-In-A-Folder/main" + le
            lue = _.unescape(le)
            lue = lue.replace(/#/g, "%23")
            LoadTxt(lue,2);
            BL = "<div class='link fl'><a class='loadtxt' tag='"+le+"'>"+t+"</a></div>"
            $(".curNav").empty()
            BackL();
            $(".curNav").append(BL);
        }
       //alert(e)
    });
   //alert("working 2")
    function Resized(){
        ww = $(window).width()
	    wh = $(window).height()
	    wwHalf = $(window).width()/2
	    whHalf = $(window).height()/2
        $('#result_1').css({width:ww, top:disFTop, left:0,height:wh - disFTop - 10,"max-height":wh - disFTop - 10,"overflow-y":"auto"})
        //$('#result_2').css({width:wwHalf,left:wwHalf,top:disFTop,height:wh - disFTop - 10,"max-height":wh - disFTop - 10,"overflow-y":"auto"})
    }
    Resized();
    $(window).resize(function(){
       Resized();
    });
    function pad(n, width, z) {
        z = z || '0';
        n = n + '';
        return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
      }
function LoadTxt(link, whichResult){
    $('.result_'+whichResult).empty();
    $.get( link, function( data ) {
        context:this,
        myArr = data.split("\n");
        a = 0;
        title = []
        link = []
        for(var i = 0;i < myArr.length;i++){
            
            
            if(a == 1){		
                if(/^\!\!...\!\!/i.test(myArr[i])){
                    myArr[i] = myArr[i].slice(7);
                }	
                //alert(myArr[i])
                title.push(myArr[i])
            }
            if(a == 2){
                st = myArr[i];
                link.push(st)
                a = -1
            }
            a++	
            
        }
        
    }).done(function(){
        
        for(var i = 0; i < title.length;i++){
                if (/wikipedia.org/i.test(link[i])){
                    $( ".result_"+whichResult ).append('<div class="link"><img class="openHow" src="img/wiki.png" /><img class="openHow" src="img/iframe.ico" /><a class="loadtxt" tag="'+ link[i]+'">' + title[i] + '</a></div>');
                }else if (/youtu\.be/i.test(link[i])){
                    $( ".result_"+whichResult ).append('<div class="link"><img class="openHow" src="img/youtube.png" /><img class="openHow" src="img/iframe.ico" /><a class="loadtxt" tag="'+ link[i]+'">' + title[i] + '</a></div>');
                }else if (/\.txt/i.test(link[i])){
                    $( ".result_"+whichResult ).append('<div class="link"><img class="openHow" src="img/folder.png" /><a class="loadtxt" tag="'+ link[i]+'">' + title[i] + '</a></div>');
                }else if (/bandcamp\.com/i.test(link[i])){
                    $( ".result_"+whichResult ).append('<div class="link"><img class="openHow" src="img/bandcamp.png" /><img class="openHow" src="img/iframe.ico" /><a class="loadtxt" tag="'+ link[i]+'">' + title[i] + '</a></div>');
                }else if (/https:\/\/soundcloud.com\//i.test(link[i])){
                $( ".result_"+whichResult ).append('<div class="link"><img class="openHow" src="img/soundcloud.png" /><img class="openHow" src="img/outside.png" /><a class="loadtxt" tag="'+ link[i]+'">' + title[i] + '</a></div>');
                }else{
                    $( ".result_"+whichResult ).append('<div class="link"><img class="openHow" src="img/outside.png" /><a class="loadtxt" tag="'+ link[i]+'">' + title[i] + '</a></div>');
                }
                
            
        
        }
        $('.result_'+whichResult).append("<div class='ExtraSpace'></div>")
        
    })
}
mdinit()
function md(MTitle){

    $(".Modal").myOwnDialog({
title:"",
movable:true,
resizable:true,
bg_color:"black",
beforeCloseCallback:function(){
    $('.Container').empty();
},

    });
    $(".Modal").myOwnDialog("open");
    $('.myOwnDialog_overlay1').remove();
    $('.titlebar_title').text(MTitle);
}
    
function mdinit(){
    $(".Modal").myOwnDialog({
    title:"Movable Resizable for Youtube & Wikipedia",
    movable:true,
    resizable:true,
    width:wwHalf/2+20,
    height:whHalf/2+70,
    bg_color:"black",
    pos_x:20,
    pos_y:whHalf+(whHalf/2)-70,
    beforeCloseCallback:function(){
        $('.Container').empty();
    },
    
        });
        
        $('.myOwnDialog_overlay1').remove();
    }    
})
