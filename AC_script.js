"use strict";

window.addEventListener('hashchange', switchToStateFromURLHash, false);
var page="";

function switchToStateFromURLHash() {
  
  var URLHash=window.location.hash;
  
  var stateStr=URLHash.substr(1);

  if (stateStr=="") stateStr='Main'; 

  var pageHTML="";
  switch (stateStr) {
    case 'Main':
      $.ajax('playpagesInnerHTML/main.txt', { type:'GET', dataType:'text', success: mainLoaded});
      function mainLoaded(data) {
        pageHTML+=data;  
        document.getElementById("BODY").innerHTML=pageHTML;
        page=document.getElementById("nameOfPlay").innerHTML;
        pageLoad();
      }         
      break;
    case 'mix':  
      $.ajax('playpagesInnerHTML/mix.txt', { type:'GET', dataType:'text', success: mixLoaded});
      function mixLoaded(data) {
        pageHTML+=data;  
        document.getElementById("BODY").innerHTML=pageHTML;
        page=document.getElementById("nameOfPlay").innerHTML;
        pageLoad();
      }            
      break;
    case 'impressionism':
      $.ajax('playpagesInnerHTML/impressionism.txt', { type:'GET', dataType:'text', success: imprLoaded});
      function imprLoaded(data) {
        pageHTML+=data;  
        document.getElementById("BODY").innerHTML=pageHTML;
        page=document.getElementById("nameOfPlay").innerHTML;
        pageLoad();
      }        
      break;
      case 'realism':
      $.ajax('playpagesInnerHTML/realism.txt', { type:'GET', dataType:'text', success: realLoaded});
      function realLoaded(data) {
        pageHTML+=data;  
        document.getElementById("BODY").innerHTML=pageHTML;
        page=document.getElementById("nameOfPlay").innerHTML;
        pageLoad();
      }        
      break;
      case 'surrealism':
      $.ajax('playpagesInnerHTML/surrealism.txt', { type:'GET', dataType:'text', success: surrealLoaded});
      function surrealLoaded(data) {
        pageHTML+=data;  
        document.getElementById("BODY").innerHTML=pageHTML;
        page=document.getElementById("nameOfPlay").innerHTML;
        pageLoad();
      }        
      break;
      case 'renaissance':
      $.ajax('playpagesInnerHTML/renaissance.txt', { type:'GET', dataType:'text', success: renaissLoaded});
      function renaissLoaded(data) {
        pageHTML+=data;  
        document.getElementById("BODY").innerHTML=pageHTML;
        page=document.getElementById("nameOfPlay").innerHTML;
        pageLoad();
      }        
      break;
      case '16century':
      $.ajax('playpagesInnerHTML/16century.txt', { type:'GET', dataType:'text', success: xvicentLoaded});
      function xvicentLoaded(data) {
        pageHTML+=data;  
        document.getElementById("BODY").innerHTML=pageHTML;
        page=document.getElementById("nameOfPlay").innerHTML;
        pageLoad();
      }        
      break;
      case '19century':
      $.ajax('playpagesInnerHTML/19century.txt', { type:'GET', dataType:'text', success: xixcentLoaded});
      function xixcentLoaded(data) {
        pageHTML+=data;  
        document.getElementById("BODY").innerHTML=pageHTML;
        page=document.getElementById("nameOfPlay").innerHTML;
        pageLoad();
      }        
      break;
  }     
}

function switchToState(newState) {
  if (answeredPics>0 && answeredPics<10) {
    var changeHash = confirm("При переходе результат игры будет потерян!");
    if (changeHash) location.hash=newState;
  }
  else location.hash=newState;
}

function switchToMainPage() {
  switchToState('Main');
}

function switchToPlayPage(artId) {
  switchToState(artId);
}

switchToStateFromURLHash();

var answeredPics=0; // количество ответов
function pageLoad () {
    if (page=='main') {

        try {
        document.getElementById('RESULT').style.display='none';
        }
        catch(err){};

        try {
            clearTimeout(timer);
        } 
        catch (er) {}

        var answeredPics=0;  

        var formTag=document.forms.INFO;
        if (localStorage.user) {
            document.getElementById('EnterName').innerHTML='Изменить имя: ';
            document.getElementById('WELCOME').innerHTML='Добро пожаловать, ' + localStorage.user + '!';
        }
        else {
            formTag.style.display='block';
            document.getElementById('EnterName').innerHTML='Введите имя: ';
        }

        var formTag=document.forms.INFO;
        var nameField=formTag.elements.USERNAME;
        nameField.addEventListener('keyup', rememberName, false);
        nameField.addEventListener('keydown', clearMessage, false);
        
        function rememberName (EO) {
            var name=nameField.value.trim();
                
            if ((/^[А-ЯЁ][а-яё]*$/.test(name)) && (name.length<=20) || name.length==0) {                  
                document.getElementById('NAMEINPUT').innerHTML=' ';
                var welcome=document.getElementById('WELCOME');
                if (name.length>0) {welcome.innerHTML='Добро пожаловать, ' + name + '!'}
                else {welcome.innerHTML='Добро пожаловать!'}
            } 
            else {    
                var warning=document.getElementById('NAMEINPUT');
                warning.style.fontSize='14px';
                warning.style.color='#FF523E';
                warning.style.marginTop='5px';
                warning.style.marginLeft='auto';
                warning.style.marginRight='auto';
                warning.style.width='90%';
                warning.innerHTML='* Введите имя на русском языке не длиннее 20 символов';
                name='';
            }  
            localStorage.user=name; 
        }
            
        function clearMessage (EO) {
            document.getElementById('NAMEINPUT').innerHTML=' ';
        } 

    }

    else {
    
        try {
            document.getElementById('RESULT').style.display='none';
        }
        catch(err){};

        try {
            clearTimeout(timer);
        } 
        catch (er) {}

        result=0;
        answeredPics=0;
        slideCount=1;  

        //поле "Пользователь" в верхнем меню
        var namedisplay=document.getElementById('NAMEDISPLAY');
        var user='';

        if(localStorage.user) {
            user=localStorage.user;
            namedisplay.style.borderRight='1px solid #223f75';
            var username=document.createElement('span');
            username.innerHTML='Пользователь: ';
            username.style.color='#223f75';
            namedisplay.appendChild(username);
            namedisplay.innerHTML+=localStorage.user;       
        }
        else {
            user='Игрок';
        }

        //выпадающее меню с разделами игры
        var selectbox=document.getElementById("selectbox");
        selectbox.onclick=function() {
        selectbox.classList.toggle('closed');
        }
        
        var result=0; //количество правильных ответов
        var resultfield=document.createElement('div'); //поле для отображения результата
        resultfield.setAttribute('id','RESULT');

        var pos=0; //первичная позиция слайдера с картинами
        var slideCount=1; //номер картины, которая сейчас отобраажется
        var next=document.getElementById('btn_next'); //стрелка вправо
        var prev=document.getElementById('btn_prev'); //стрелка влево

        //кнопка "Обновить" в верхнем меню
        var refresh=document.getElementById('REFRESH');
        refresh.addEventListener('click', refreshPage, false);

        function refreshPage (EO) {

            resultfield.style.display='none';
            document.getElementsByClassName('table')[0].style.display='none';
            try {resultfield.removeChild(cup);
            resultfield.removeChild(percent);
            resultfield.removeChild(player);}
            catch(err){};

            document.getElementsByClassName('answers')[0].style.display='inline-block';
            document.getElementById('slider').style.display='block';

            try {clearTimeout(timer);} catch (er) {console.log('таймер не был задан')}

            result=0;
            answeredPics=0;
            slideCount=1;

            while(pos<0) {
                var track=document.getElementById('slider_track');
                var contentSize=document.querySelector('.wrapper').offsetWidth;
                pos=pos+contentSize;
                var tr='translateX(' + pos + 'px)';
                track.style.transform=tr;
            }  

            buttonsShowHide();

            var allButtons=document.getElementsByClassName('options');
            for (var b=0; b<allButtons.length; b++) {
                allButtons[b].style.border='1px solid #72d7f3';
                allButtons[b].style.background='linear-gradient(45deg, #72d7f3, #90e5ff, #6edaf8)';
                allButtons[b].style.color='white';
                allButtons[b].addEventListener('click', checkAnswer, false);
                allButtons[b].addEventListener('mouseenter', changeDesign, false);
                allButtons[b].addEventListener('mouseleave', returnDesign, false);
                
            }

            var allContent=document.getElementsByClassName('content');
            for (var c=0; c<allContent.length; c++) {
                allContent[c].style.boxShadow='#7c7c7c 0px 0px 5px 5px';
            }

            try {
                let crossClose = new Event("click"); 
                var cross=document.getElementById('CROSS'); 
                cross.dispatchEvent(crossClose);
            }
            catch(e) {
                console.log (e.name);
            }  

            for (var p=0; p<10; p++) {
                document.getElementById(p).setAttribute('fill','#ffffff'); 
                document.getElementById(p).setAttribute('stroke','#ffffff');
                document.getElementById(p).setAttribute('stroke-width','0'); 
                document.getElementById('text'+p).setAttribute('fill','#72d7f3');
            }

        }

        buttonsShowHide();
        //кнопка "Инфо" в верхнем меню
        
        var isMouseHover=false;
        var navigationInfo=document.getElementById('INFO');
        navigationInfo.addEventListener('mouseenter', function showNav(){isMouseHover=true; setTimeout(showNavigationInfo,300)}, false);
        navigationInfo.addEventListener('mouseleave', hideNavigationInfo, false);

        var infoNav=document.createElement('div');
        infoNav.setAttribute('id','hotkeys_info');
        var textOfRules;

        $.ajax("rules.txt",
            { type:'GET', dataType:'text', success: rulesLoaded, error: errorRulesHandler }
        );
        

        function rulesLoaded(data) {
            textOfRules=data;  
            infoNav.innerHTML=textOfRules;
        }

        function errorRulesHandler(jqXHR,statusStr,errorStr) {
            alert(statusStr+' '+errorStr);
        }



        function showNavigationInfo () {        
            if(isMouseHover) {
                document.querySelector('.header').appendChild(infoNav);
            }
        }

        function hideNavigationInfo () {
            isMouseHover=false;
            try{
                document.querySelector('.header').removeChild(infoNav);
            }
            catch(err){ }
        }

        //управление с клавиатуры
        document.addEventListener('keyup', function whichKey(EO) {
        if (event.key=='ArrowLeft') prevSlide();
        if (event.key=='ArrowRight') nextSlide();
        if (event.key=='Escape') goToFirstPage();
        if (event.key=='1') {          
            let contents=document.getElementsByTagName('form');
            let cont=Math.abs(pos/document.querySelector('.wrapper').offsetWidth);
            let event = new Event("click"); 
            contents[cont].children[0].dispatchEvent(event);
        };
        if (event.key=='2') {
            let contents=document.getElementsByTagName('form');
            let cont=Math.abs(pos/document.querySelector('.wrapper').offsetWidth);
            let event = new Event("click"); 
            contents[cont].children[1].dispatchEvent(event);
        };
        if (event.key=='3') {
            let contents=document.getElementsByTagName('form');
            let cont=Math.abs(pos/document.querySelector('.wrapper').offsetWidth);
            let event = new Event("click"); 
            contents[cont].children[2].dispatchEvent(event);
        };
        if (event.key=='4') {
            let contents=document.getElementsByTagName('form');
            let cont=Math.abs(pos/document.querySelector('.wrapper').offsetWidth);
            let event = new Event("click"); 
            contents[cont].children[3].dispatchEvent(event);
        };       
        }, false);

        document.addEventListener('keydown', function tabEvent(EO){        
        if (EO.keyCode==9) {
            EO.preventDefault();
        }; 
        }, false);

        //отображение и функционал стрелок
        window.addEventListener('load', buttonsShowHide, false);
        next.addEventListener('click', nextSlide, false);
        prev.addEventListener('click', prevSlide, false);

        function nextSlide(EO) {
            try {
                let crossClose = new Event("click"); 
                var cross=document.getElementById('CROSS'); 
                cross.dispatchEvent(cr);
            }
            catch(e){
                console.log (e.name);
            };
            if (slideCount<10) { 
                var track=document.getElementById('slider_track');
                pos=pos-document.querySelector('.wrapper').offsetWidth;
                var tr='translateX(' + pos + 'px)';
                track.style.transform=tr;
                track.style.transitionDuration='1s';
                track.style.transitionTimingFunction='ease';
                slideCount++;
                var audio = new Audio(); 
                audio.src = 'audio/swipe_sound.mp3'; 
                audio.autoplay = true; 
                buttonsShowHide();
            }            
        }

        function prevSlide(EO) {
            try {
                let crossClose = new Event("click"); 
                var cross=document.getElementById('CROSS'); 
                cross.dispatchEvent(crossClose);
            }
            catch(e) {
                console.log (e.name);
            }
            if (slideCount>1) {        
                var track=document.getElementById('slider_track');
                pos=pos+document.querySelector('.wrapper').offsetWidth;
                var tr='translateX(' + pos + 'px)';
                track.style.transform=tr;
                track.style.transitionDuration='1s';
                track.style.transitionTimingFunction='ease';
                slideCount--;    
                var audio = new Audio(); 
                audio.src = 'audio/swipe_sound.mp3'; 
                audio.autoplay = true;
                buttonsShowHide();
            }           
        }

        function buttonsShowHide() {
            if(slideCount<10) next.style.display='inline-block';
            else next.style.display='none';

            if(slideCount>1) prev.style.display='inline-block';
            else prev.style.display='none';
        }

        //прокрутка слайдера с тачскрина
        var swipe=null;     
        document.getElementById('slider_track').addEventListener('touchstart', swipeStart, false);
        function swipeStart(EO) {
            swipe=EO.touches[0].clientX;
        }
        document.getElementById('slider_track').addEventListener('touchmove', swipeOn, false);
        function swipeOn (EO) {
            if (!swipe) return;
            if ((swipe-(EO.touches[0].clientX))<0) {
                var swipeEvent = new Event("click"); 
                prev.dispatchEvent(swipeEvent);
            }
            else {
                var swipeEvent = new Event("click"); 
                next.dispatchEvent(swipeEvent);
            }
            swipe=null;
        }

        //информация о картинах
        var infoPaintings;
        $.ajax('info_about_paintings.json',{ type:'GET', dataType:'json', success:dataLoaded, error:errorHandler });
        function dataLoaded(data){
            infoPaintings=data;
        }
        function errorHandler(jqXHR,statusStr,errorStr) {
            console.log(statusStr+' '+errorStr);
        }

        //функционал кнопок с вариантами ответов
        var allButtons=document.getElementsByClassName('options');

        for (var b=0; b<allButtons.length; b++) {
            allButtons[b].addEventListener('click', checkAnswer, false);
            allButtons[b].addEventListener('mouseenter', changeDesign, false);
            allButtons[b].addEventListener('mouseleave', returnDesign, false);
        }

        function changeDesign(EO) {
            EO.target.style.color='#15687f';
            EO.target.style.background='white';
            EO.target.style.cursor='pointer';
            EO.target.style.transitionDuration = "0.5s";
        }

        function returnDesign(EO) {
            EO.target.style.color='white';
            EO.target.style.backgroundColor='#72d7f3';
            EO.target.style.cursor='default';
            EO.target.style.transitionDuration = "0.3s";
        }

        function checkAnswer(EO) {

            navigator.vibrate(300);

            answeredPics++;

            let answer=EO.target.value;
            let containerOfImg=EO.target.offsetParent; 
            var numberOfPainting=Math.round(containerOfImg.offsetLeft/document.querySelector('.wrapper').offsetWidth);
            let img=containerOfImg.children[2].name;       
            var activeButtons=containerOfImg.getElementsByClassName('options');

            //блок информации об авторе

            var artistInfo=document.createElement('div');
            artistInfo.setAttribute('class','artist');

            var artistCross=document.createElement('div');
            artistCross.innerHTML='×';
            artistCross.setAttribute('id','CROSS');
            artistCross.addEventListener('click', removeArtistInfo, false);         
                
            var artistMessage=document.createElement('div');
            artistMessage.setAttribute('class','artistMessage');        

            var artistImg=document.createElement('img');
            artistImg.setAttribute('class','portrait');
            artistImg.setAttribute('src',infoPaintings[img].portrait);  

            var artistLink=document.createElement('a');
            artistLink.setAttribute('class','artistLink');
            artistLink.setAttribute('href',infoPaintings[img].link);
            artistLink.setAttribute('target','_blank');

            var artistButton=document.createElementNS('http://www.w3.org/2000/svg','svg');
            artistButton.setAttribute('class','artistButton');
            artistButton.setAttribute('width','120');
            artistButton.setAttribute('height','65');
            artistButton.setAttribute('stroke','null');
            artistButton.innerHTML='<g><rect id="MOREINFO" rx="5" height="40" width="100" y="2.5" x="2.5" stroke-width="0" fill="#ffffff"/> <text id="moreLarge1" font-style="normal" font-weight="normal" xml:space="preserve" text-anchor="start" font-family="sans-serif" font-size="15" y="20" x="30" stroke-width="0" fill="#00599e">Узнать</text> <text id="moreLarge2" xml:space="preserve" text-anchor="start" font-family="sans-serif" font-size="15" y="36" x="26" stroke-width="0" fill="#00599e">больше</text> <text id="moreSmall1" font-style="normal" font-weight="normal" xml:space="preserve" text-anchor="start" font-family="sans-serif" font-size="12" y="16" x="23" stroke-width="0" fill="#00599e">Узнать</text> <text id="moreSmall2" xml:space="preserve" text-anchor="start" font-family="sans-serif" font-size="12" y="28" x="21" stroke-width="0" fill="#00599e">больше</text></g>';

            setTimeout(function showArtistInfo() {
            containerOfImg.appendChild(artistInfo); 
            artistInfo.style.display='block';
            artistInfo.appendChild(artistCross);
            artistInfo.appendChild(artistMessage);
            artistInfo.appendChild(artistImg);
            artistInfo.appendChild(artistLink);
            artistLink.appendChild(artistButton);},500);


            //проверка ответа

            var currentOption=document.getElementsByClassName('content');

            if (infoPaintings[img].artist==answer) {
                result++;
                console.log(result);
                EO.target.style.background='linear-gradient(45deg, #00D710, #00E810, #00D710)';
                EO.target.style.color='black';  
                EO.target.style.border='1px solid #10d631'; 
                EO.target.style.transitionDuration = "0.5s";
                currentOption[slideCount-1].style.boxShadow='0px 0px 5px 5px #10d631';
                currentOption[slideCount-1].style.transitionDuration = "0.5s";
                artistMessage.innerHTML='Всё верно! Это ' + infoPaintings[img].artist + '.';
                document.getElementById(numberOfPainting).setAttribute('fill','#C1F5C2'); 
                document.getElementById(numberOfPainting).setAttribute('stroke','#66C777');
                document.getElementById(numberOfPainting).setAttribute('stroke-width','1'); 
                document.getElementById('text'+numberOfPainting).setAttribute('fill','#66C777');
                var audio = new Audio(); 
                audio.src = 'audio/right.mp3'; 
                audio.autoplay = true;
            }
            else {
                console.log(result);
                EO.target.style.background='linear-gradient(45deg, #F02E18, #FF3F27, #F02E18)';;
                EO.target.style.color='black';  
                EO.target.style.border='1px solid #ec2c2c'; 
                EO.target.style.transitionDuration = "0.5s";
                currentOption[slideCount-1].style.boxShadow='0px 0px 5px 5px #ec2c2c';
                currentOption[slideCount-1].style.transitionDuration = "0.5s";
                artistMessage.innerHTML='Неверно! Это ' + infoPaintings[img].artist + '.';   
                document.getElementById(numberOfPainting).setAttribute('fill','#FF9F9A'); 
                document.getElementById(numberOfPainting).setAttribute('stroke','#C75C58');
                document.getElementById(numberOfPainting).setAttribute('stroke-width','1'); 
                document.getElementById('text'+numberOfPainting).setAttribute('fill','#C75C58'); 
                var audio = new Audio(); 
                audio.src = 'audio/wrong.mp3'; 
                audio.autoplay = true;    
                
                setTimeout(showRightAnswer,500);
                
                function showRightAnswer() {
                    for (let b=0; b<activeButtons.length; b++) {
                        if (activeButtons[b].value==infoPaintings[img].artist) {
                            activeButtons[b].style.background='linear-gradient(45deg, #00D710, #00E810, #00D710)';
                            activeButtons[b].style.border='1px solid #10d631';
                            activeButtons[b].style.transitionDuration = "0.5s";
                        }
                    }
                }
            }

            for (let b=0; b<activeButtons.length; b++) {
                activeButtons[b].removeEventListener('click', checkAnswer);
                activeButtons[b].removeEventListener('mouseenter', changeDesign);
                activeButtons[b].removeEventListener('mouseleave', returnDesign);
                activeButtons[b].style.cursor='default';            
            }    

            function removeArtistInfo (EO) {
                artistInfo.offsetParent.removeChild(artistInfo);
            } 
                
            if (answeredPics==10) {var timer=setTimeout(showResult, 2000)};

        }

        //подсчёт и отображение результата игры

        var percent=document.createElement('p');
        percent.setAttribute('id','PERCENT');
        var cup=document.createElement('img');
        cup.setAttribute('id','CUP');
        var player=document.createElement('p');
        player.setAttribute('id','PLAYER');

        function showResult() {

        document.getElementById('slider').style.display='none';

        var right=result/10*100;
        
        percent.innerHTML='Ваш результат составляет ' + right +'% ' + '!'; 
        
        cup.setAttribute('src','navigation_img/cup.png');
        
        if (result<=3) player.innerHTML='Уровень: новичок в искусстве.';
        if (result>3 && result<=6) player.innerHTML='Уровень: ценитель искусства.';
        if (result>6 && result<=9) player.innerHTML='Уровень: знаток искусства.';
        if (result==10) player.innerHTML='Уровень: победитель.';

        resultfield.appendChild(percent);
        resultfield.appendChild(cup);
        resultfield.appendChild(player);

        var resultOfGame=right + '%';

        var ajaxHandlerScript="https://fe.it-academy.by/AjaxStringStorage2.php";
        var updatePassword;

        var stringName='MALIUTSINA_TEST_GAMERESULT';
        var typeOfPaintings=page;

        function storeInfo() {
            updatePassword=Math.random();
            $.ajax( {
            url : ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
            data : { f : 'LOCKGET', n : stringName, p : updatePassword },
            success : lockGetReady, error : errorHandler
            });
        }

        function lockGetReady(callresult) {
            var resultsHash=JSON.parse(callresult.result);
            var len=resultsHash[typeOfPaintings].length;
            if (!len) len=(0);
                var newElem=len;
            if ( !(resultsHash[typeOfPaintings])){
                resultsHash[typeOfPaintings]=[ ];
            }
            resultsHash[typeOfPaintings][newElem]={name:user,score:resultOfGame};
            var resultsFrom=0;
            if (len>9) resultsFrom=len-9;
                var tableHTML='';
            if (len>=0) {
                for (var r=resultsFrom; r<len; r++) {
                    tableHTML+='<tr><td>' + resultsHash[typeOfPaintings][r].name + '</td><td>' + resultsHash[typeOfPaintings][r].score + '</td></tr>';
                }
            }
            tableHTML+='<tr><td>' + user + '</td><td>' + resultOfGame + '</td></tr>';
            tableResults.innerHTML='<tbody>' + '<th colspan=2 width="200px">Результаты игроков</th>' + tableHTML + '</tbody>';
            tableResults.style.display='block';
            $.ajax({
                url : ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
                data : { f : 'UPDATE', n : stringName, v : JSON.stringify(resultsHash), p : updatePassword },
                success : updateReady, error : errorHandler
            });
        }

        function updateReady(callresult) {
            if ( callresult.error!=undefined )
            alert(callresult.error);
        }

        function errorHandler(jqXHR,statusStr,errorStr) {
            alert(statusStr+' '+errorStr);
        }

        storeInfo();

        var tableResults=document.createElement('table');
        tableResults.setAttribute('class','table');
        tableResults.setAttribute('border','1');
          
        document.getElementsByTagName('body')[0].appendChild(resultfield);
        resultfield.appendChild(tableResults);
        resultfield.style.display='block';
        tableResults.style.display='block';
        document.getElementsByClassName('answers')[0].style.display='none';

    } 
  }
}