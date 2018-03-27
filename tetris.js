// when the web page window loads up, the game scripts will be read
window.onload = function() {



    //var debug = true;
    var MAX_LENGTH = 17; //NEEDS TO BE ODD NUMBER OR ELSE EVERYTHING WILL BREAK
    var MAX_HEIGHT = 18;

    var gameOn = false;
    var gamemode = 0;
    var once = false; //get called once
    var bgcolorArray=new Array("#ff0000", "#ff5500", "#ffaa00", "#ffff00", "#aaff00", "#55ff00", "#00ff00", "#00ff55", "#00ffaa", "#00ffff", "#00aaff", "#0055ff", "#0000ff", "#5500ff", "#aa00ff", "#ff00ff", "#ff00aa", "#ff0055", "#000000");
    var colorArray = new Array("#ff0000", "#ff8000", "#ffff00", "#80ff00", "#00ffff", "#0000ff", "#b266ff", "#ff00ff", "#000");
    var tileArray=new Array(); 
    var tempRandom = -1;
    var isDropping = false;
    var centerDropPoint = (MAX_LENGTH - 1) / 2;

    var colorSpaz = false;
    var colorbackground = false;

    var timeSongStarted = 0;
    var currentNoteIndex = 0;

    var music;

   var notes3 = new Array(7587, 7912, 8318, 8697, 8937, 9172, 9573, 9797, 10022, 10250, 10446, 10849, 11321, 11705, 11927, 12180, 12403, 12581, 12816, 13016, 13238, 13448, 13657, 14221, 14517, 14628, 15098, 15562, 15767, 15954, 16397, 16613, 16831, 17031, 17670, 17928, 18158, 18361, 18536, 19019, 19196, 19416, 19852, 20070, 20882, 21333, 21542, 21762, 21978, 22062, 22186, 22386, 22593, 23024, 23253, 23504, 23914, 24088, 24319, 25007, 25247, 25568, 25959, 26371, 26790, 27901, 28341, 28577, 28788, 29057, 29306, 29506, 30115, 30314, 30606, 30820, 30993, 31187, 31630, 31905, 32071, 32446, 32963, 33096, 33279, 33392, 34727, 35041, 35233, 35461, 35594, 35693, 35799, 35951, 36193, 36399, 36707, 36814, 37039, 37239, 37641, 38064, 38725, 38935, 39158, 39402, 39642, 39730, 39847, 39965, 40067, 40173, 40266, 40471, 40572, 40687, 40879, 41129, 41302, 41521, 41899, 42236, 42419, 42907, 42937, 42966, 42996, 43024, 43053, 43082, 43112, 43142, 43204, 43553, 43880, 44071, 44798, 44939, 45031, 45143, 45253, 45373, 45640, 45767, 45877, 45972, 46061, 46183, 46432, 46538, 46649, 46870, 47000, 47131, 47328, 47447, 47580, 47932, 48191, 48372, 48841, 49022, 49238, 49413, 49537, 49635, 49835, 50069, 50271, 50392, 50508, 50754, 50868, 50992, 51193, 51399, 51823, 52250, 52462, 52652, 52850, 53087, 53578, 53690, 53783, 53892, 53994, 54213, 54317, 54417, 54642, 54833, 55027, 55281, 55587, 55980, 56140, 56950, 57316, 57596, 57828, 58349, 58618, 58732, 58851, 58976, 59088, 59366, 59473, 59584, 59674, 59788, 60020, 60131, 60221, 60435, 60622, 60722, 60807, 61035, 61142, 61281, 61518, 61717, 61861, 62070, 62490, 62722, 62882, 65545, 65811, 66017, 66333, 66402, 66500, 66608, 66703, 66802, 66909, 67004, 67110, 67220, 67328, 67429, 67522, 67642, 67722, 67840, 67950, 68052, 68162, 68264, 68372, 68508, 68598, 68710, 68846, 68927, 69055, 69131, 69265, 69336, 69455, 69550, 69676, 69768, 69897, 69978, 70093, 70194, 70307, 70392, 70500, 70589, 70707, 70807, 70923, 71024, 71141, 71246, 71352, 71463, 71579, 71677, 71810, 71913, 72040, 72162, 72256, 72377, 72522, 72605, 72727, 72829, 72941, 73040, 73151, 73237, 73353, 73458, 73570, 73678, 73787, 73894, 74006, 74123, 74216, 74339, 74447, 74541, 74666, 74760, 74874, 74974, 75096, 75192, 75317, 75421, 75526, 75622, 75755, 75843, 75979, 76059, 76171, 76268, 76392, 76469, 76609, 76828, 76916, 77026, 77123, 77253, 77327, 77443, 77528, 77653, 77737, 77868, 77958, 78063, 78165, 78267, 78357, 78452, 78563, 78659, 78779, 80074, 80913, 81749, 82599, 83501, 84334, 7431);
   var special3 = new Array(34616, 65000, 65114, 79213);
// if(debug){console.log("Debugging Enabled!")}

    var dropDelay = new Array(0,0,0);

    var Tile = {
        _x: null,
        _y: null,
        _color: 0,
        _noGravity: false,
        _visable: true,

        //this is the options to create a Tile
        create: function (x, y, color, nograv) {
            var obj = Object.create(this);
            obj._x = x;
            obj._y = y;
            obj._color = color;
            obj._noGravity = nograv;
            return obj;
        },

        //blit to screen
        draw: function(){
            drawFilledSquare(this._x, this._y, colorArray[this._color]);
        },

        //should fall?
        isFalling: function(){
            if(this._noGravity || isAt(this._x, this._y+1) ){
               return false
            }
            return true;
        },

        check: function(){
            //if()
        },

        destroy: function(){
            console.log("Destroyed tile " + this._x + " " + this._y);
            this._visable = false;
            this._noGravity = true;
            //move object off the screen
            this._x = 100; 
            this._y = 100; 
            this._color = colorArray.length-1;
        }
    };

    //load canvas
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d"),
        w = canvas.width = MAX_LENGTH * 45 + 40,
        h = canvas.height = MAX_HEIGHT * 45 + 2;
        $("#game").css("width", w);
        $("#game").css("height", h);

    
        //draw grid
    var bgLineColor = "#C4C4C4";
    function drawBackgroundSquares(){
        for(var i = 0; i <MAX_LENGTH; i++){ //x
            for(var j = 0; j <MAX_HEIGHT; j++){ //y
                ctx.strokeRect(i*45 + 20, j*45 + 1, 45, 45); //image 45*45
                ctx.lineWidth = 1;
                ctx.strokeStyle = bgLineColor; 
            }
        } 
    }

    var points = 0;
    function addPoint(){
        //console.log("Points: " + points);
        var highscore = getCookie("highscore");
        console.log("HS: " + highscore);
        if(highscore == ""){
            setCookie("highscore", ""+0, 365); 
            highscore = 0;
        }
        highscore = parseInt(highscore);
        if(points > highscore && highscore != "" && highscore != null){
            setCookie("highscore", ""+points, 365); 
        }
        $(".score").text("Score: " + points + " | Highscore: " + highscore);
        points++;
    }


    function randomX(){ 
        var rand = Math.round(Math.random()*MAX_LENGTH-1);
        if(rand == -1){
            rand = 0;
        }
        //console.log("Random: " + rand);
        if(rand != tempRandom){
            tempRandom = rand;
            return rand;
        }else{
            //console.log("Dupe X. Making new randomX();");
            return randomX();
        }   
         
    }

    //draw a filled rectangle
    function drawFilledSquare(x,y,colorHex){
        ctx.fillStyle = colorHex; 
        ctx.fillRect(x*45+20, y*45+1, 45, 45); //45*45
        ctx.stroke();
    }


    //blit all tiles to screen
    function drawTiles(){
        for(var i = 0; i < tileArray.length; i++){
            if(tileArray[i]._visable){
                
                tileArray[i].draw();
            } 
        }
    }

    //check if tile is at xy
    function isAt(x, y){
        for(var i = 0; i < tileArray.length; i++){
            if(tileArray[i]._x == x && tileArray[i]._y == y){
                return true;
            }
        }
        return false;
    }

    //return tile at xy
    function getTileAt(x, y){
        for(var i = 0; i < tileArray.length; i++){
            if(tileArray[i]._x == x && tileArray[i]._y == y){
                return tileArray[i];
            }
        }
        return null;
    }

    /*
    check for if there are at least three objects of the same color
    touching eachother. It will give the respecting amount of points,
    using the flood fill method modified to work.
    */

    function floodFill(node){
        var target_color = node._color;
        var query = new Array();
        var result = new Array();

        query.push(node);

        //while query is not empty
        while (!query === undefined || !query.length == 0){
            var n = query.pop();
            result.push(n);

            var left = getTileAt(n._x-1, n._y);
            var right = getTileAt(n._x+1, n._y);
            var up = getTileAt(n._x, n._y+1);
            var down = getTileAt(n._x, n._y-1);

            var dpp = getTileAt(n._x+1, n._y+1);
            var dnn = getTileAt(n._x-1, n._y-1);
            var dnp = getTileAt(n._x-1, n._y+1);
            var dpn = getTileAt(n._x+1, n._y-1);

            //left
            if(left != null && left.isFalling() == false && left._color == target_color && !contains(left, result)){
                query.push(left);
            }

            //right
            if(right != null && right.isFalling() == false && right._color == target_color && !contains(right, result)){
                query.push(right);
            }

            //up
            if(up != null && up.isFalling() == false && up._color == target_color && !contains(up, result)){
                query.push(up);
            }

            //down
            if(down != null && down.isFalling() == false && down._color == target_color && !contains(down, result)){
                query.push(down);
            }


            //++
            if(dpp != null && dpp.isFalling() == false && dpp._color == target_color && !contains(dpp, result)){
                query.push(dpp);
            }

            //--
            if(dnn != null && dnn.isFalling() == false && dnn._color == target_color && !contains(dnn, result)){
                query.push(dnn);
            }

            //-+
            if(dnp != null && dnp.isFalling() == false && dnp._color == target_color && !contains(dnp, result)){
                query.push(dnp);
            }

            //+-
            if(dpn != null && dpn.isFalling() == false && dpn._color == target_color && !contains(dpn, result)){
                query.push(dpn);
            }

        }

        scoreFloodFill(result);

    }

    //score the flood fill
    function scoreFloodFill(tiles){
        if(tiles.length >=3){
           //console.log("Scoring flood fill results");
            for(var i = 0; i < tiles.length; i++){
                if(tiles[i]._visable && !tiles[i]._noGravity){ //THIS IS WRONG??
                    console.log("Ajd Tile Found: X:" + tiles[i]._x + " Y:" + tiles[i]._y);
                    tiles[i].destroy();
                    addPoint();
                }
            
            } 
        }
        
    }

    function contains(obj, list) {
        var i;
        for (i = 0; i < list.length; i++) {
            if (list[i] === obj) {
              return true;
         }
        }

        return false;
    }

    

    //called every so often by timer
    function tick(){
        var anyFalling = false;
        for(var i = 0; i < tileArray.length; i++){
            if(tileArray[i].isFalling()){
                tileArray[i]._y+=1;
                anyFalling = true;
            }
        }

        if(!anyFalling){
            isDropping = false;
        }

        for(var i = 0; i < tileArray.length; i++){
            if(!tileArray[i].isFalling() && tileArray[i]._color != colorArray.length-1){
                floodFill(tileArray[i]);
            }
        }
    }



    //drop tile every
    var time = 0;
    var spaz = 0;
    var gback = false;
    function dropTileTimer(){
            if(spaz >=5){
                spaz = 0;
                if(colorbackground == 1){
                    //$(".bgc").css("opacity", "0.5");
                    $(".bgc").css("background", "#000");
                    /*
                    for(var i = 0; i < tileArray.length; i++){
                        if(!tileArray[i]._noGravity){
                            tileArray[i]._color = randomColor(); 
                        } 
                    }
                    */
                    for(var i = 0; i < tileArray.length; i++){
                        if(tileArray[i].isFalling()){
                            tileArray[i]._color = randomColor();
                        }
                    
                    }
                }
                if(colorbackground == 2){
                    $(".bgc").css("opacity", "0.7");
                    gback = true;
                    //$(".bgc").css({"background":bgcolorArray[Math.round(Math.random()*(bgcolorArray.length-2))]}); 
                    //$(".centerText").css({"color":bgcolorArray[Math.round(Math.random()*(bgcolorArray.length-2))]});
                    $(".score").css({"color":bgcolorArray[Math.round(Math.random()*(bgcolorArray.length-2))]});  
                    bgLineColor = bgcolorArray[Math.round(Math.random()*(bgcolorArray.length-2))];
                    for(var i = 0; i < tileArray.length; i++){
                        if(tileArray[i].isFalling()){
                            tileArray[i]._color = randomColor();
                        }
                    
                    }
                    /*
                    for(var i = 0; i < tileArray.length; i++){
                        if(!tileArray[i]._noGravity && tileArray[i]._visable){
                            tileArray[i]._color = randomColor(); 
                        }
                         
                    }*/
                }
                
            } 
            spaz++;


        if(!isDropping){
            if(time >= 60){
                time = 0;
                tick();
            }
            time++;
        }else{
            if(time >= 3){
                time = 0;
                tick();
            }
            time++;
        }
        if(gback){
            updateGradient();
        }
    }

    function resetCss(){
        gback = false;
        //$(".centerText").css("color","white");
        $(".score").css("color","white");
        //$(".bgc").css("opacity", "0.0");
        $(".bgc").css("opacity", "0.5");
        $(".bgc").css("background", "#000");
        bgLineColor = "#C4C4C4";

    }

    var specialcount = 0;
    function checkForMusicDrop(){
        if(gamemode == 3){
            var since = new Date().getTime() - timeSongStarted;
            //console.log("Since: " + since);
            if(specialcount < special3.length && special3[specialcount] <= since){
                //change everything to a random color when the time comes
                if(specialcount == 0){
                    colorbackground = 1;
                }if(specialcount == 1){
                    colorbackground = 0;
                }if(specialcount == 2){
                    colorbackground = 2;
                }if(specialcount == 3){
                    colorbackground = 0;
                    resetCss();
                }
                
                specialcount++;
            }

            if(currentNoteIndex < notes3.length && notes3[currentNoteIndex] <= since){
                //drop a tile
                tileArray.push(Tile.create(randomX(),0,randomColor(),false));
                isDropping = true;
                currentNoteIndex++;
            }
            
        }
    }
   
    addEventListener("keydown", function (e) {
        //easy
        if (e.keyCode == 49 && gameOn==false) { //easy
             gameOn = 1;
             gamemode = 1;
             //main();// (key: 1)
           
        }//end if

        //med
        if (e.keyCode == 50 && gameOn==false) { //med
             gameOn = 1;
             gamemode = 2;
             //main();// (key: 2)
           
        }//end if

        //hard
        if (e.keyCode == 51 && gameOn==false) { //hard
             gameOn = 1;
             gamemode = 3;
             //main();// (key: 3)
             //colorSpaz = true;
           
        }//end if

        if (e.keyCode == 32 && gameOn==true) { //drop
            // (key: SPACE BAR)
            if(isDropping){
                return;
            }
            var x = centerDropPoint;
            //console.log("x:" + x)
            if(gamemode != 1){
                x = randomX();
            }
            if(!isAt(x, 0)){
                 tileArray.push(Tile.create(x,0,randomColor(),false));
            }
           
        }//end if

        //////////////////////////////////////

        if (e.keyCode == 37 && gameOn==true) { //move left
            // (key: LEFT)
            for(var i = 0; i < tileArray.length; i++){
                if(tileArray[i].isFalling() && tileArray[i]._x != 0 && !isAt(tileArray[i]._x-1, tileArray[i]._y)){
                    tileArray[i]._x -=1;
                }
            }
           
        }//end if

        if (e.keyCode == 39 && gameOn==true) { //move right
            // (key: Right)
            for(var i = 0; i < tileArray.length; i++){
                if(tileArray[i].isFalling() && tileArray[i]._x != MAX_LENGTH-1 && !isAt(tileArray[i]._x+1, tileArray[i]._y)){
                    tileArray[i]._x +=1;
                }
            }
           
        }//end if

        if (e.keyCode == 88 && gameOn==true) { //rotate right
            // (key: X)
            isDropping = true;
           
        }//end if

    }, false);

    function randomColor(){
        return Math.round(Math.random()*(colorArray.length-2));
    }

    function createInvisableBottomTiles(){
        for(var i = 0; i <MAX_LENGTH; i++){
            tileArray.push(Tile.create(i,MAX_HEIGHT,colorArray.length-1,true));
        }   
    }

    //select music
    function playMusic(){
        if(gamemode == 0){
            music = new Audio("audio/music/homescreen.mp3"); 
            music.play();
            return;
        }
        else if(gamemode == 1){
            music = new Audio("audio/music/easy.mp3"); 

        }else if(gamemode == 2){
            music = new Audio("audio/music/med.mp3"); 
        }else{
            music = new Audio("audio/music/hard.mp3"); 
        }
        music.play();
        timeSongStarted = new Date().getTime()-dropDelay[(gamemode-1)]; //-800
        console.log("Start: " + timeSongStarted);
        music.addEventListener("ended", function(){
            //music.currentTime = 0;
            hasWon = true;
        });
    }


    var gcolors = new Array(
      [62,35,255],
      [60,255,60],
      [255,35,98],
      [45,175,230],
      [255,0,255],
      [255,128,0]);

    var step = 0;
    //color table indices for: 
    // current color left
    // next color left
    // current color right
    // next color right
    var colorIndices = [0,1,2,3];

    //transition speed
    var gradientSpeed = 0.1;//0.002

    function updateGradient()
    {
      
      if ( $===undefined ) return;
      
        var c0_0 = gcolors[colorIndices[0]];
        var c0_1 = gcolors[colorIndices[1]];
        var c1_0 = gcolors[colorIndices[2]];
        var c1_1 = gcolors[colorIndices[3]];

        var istep = 1 - step;
        var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
        var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
        var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
        var color1 = "rgb("+r1+","+g1+","+b1+")";

        var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
        var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
        var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
        var color2 = "rgb("+r2+","+g2+","+b2+")";

     $('.bgc').css({
       background: "-webkit-gradient(linear, left top, right top, from("+color1+"), to("+color2+"))"}).css({
        background: "-moz-linear-gradient(left, "+color1+" 0%, "+color2+" 100%)"});
      
      step += gradientSpeed;
      if ( step >= 1 )
      {
        step %= 1;
        colorIndices[0] = colorIndices[1];
        colorIndices[2] = colorIndices[3];
        
        //pick two new target color indices
        //do not pick the same as the current one
        colorIndices[1] = ( colorIndices[1] + Math.floor( 1 + Math.random() * (gcolors.length - 1))) % gcolors.length;
        colorIndices[3] = ( colorIndices[3] + Math.floor( 1 + Math.random() * (gcolors.length - 1))) % gcolors.length;
        
      }
    }


    


    var titleCount = 0;
    var titleColor = "Red";
    var titleDelay = 39;
    
    function drawTitleScreen(){
        var titleImage = new Image();
        titleImage.src = "images/logo2v.jpg";
        /*
        ctx.font = "50px Comic Sans MS";
        ctx.fillStyle = "lightgreen";
        ctx.textAlign = "center";
        ctx.fillText("Extreme Tetris", canvas.width/2, canvas.height/4); 

        ctx.font = "20px Comic Sans MS";
        ctx.fillStyle = "white";
        ctx.fillText("Press number 1-3 for the corosponding level", canvas.width/2, canvas.height/4 + 100);

        ctx.fillStyle = "Orange";
        ctx.fillText("Space: Drop tile", canvas.width/2, canvas.height/4 + 150);
        ctx.fillText("ArrowKeys: Move tile", canvas.width/2, canvas.height/4 + 200);
*/
        ctx.font = "bold 40px Comic Sans MS";
        ctx.textAlign = "center";
         ctx.drawImage(titleImage,  canvas.width / 2 - titleImage.width / 2, 0);
        if(titleCount == 0 || titleCount == titleDelay*2){
            titleColor = "Red";
            titleCount =0;
        }
        if(titleCount == titleDelay){
            titleColor = "Yellow";
        }

        ctx.fillStyle = titleColor;
        
        ctx.fillText("\u26A0 WARNING: Flashing Lights \u26A0", canvas.width/2, canvas.height/4 + 500);
        titleCount++;
    }

    //gets called once
    function getCalledOnce(){
        if(once == false){
            music.pause();
            playMusic();
            createInvisableBottomTiles();
            $(".bgc").css("opacity", "0.5");
        }
        once = true;
    }

    var calledOnceHomescreen = false;
    function getCalledOnceHomescreen(){
        if(!calledOnceHomescreen){
            gamemode = 0;
            playMusic();
            calledOnceHomescreen = true;
            

        }
    }

    function setCookie(cname,cvalue,exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = "expires=" + d.toGMTString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    var hasWon = false;
    function checkIfLooseOrWin(){/*
        if(hasLost()){
            alert("You lost :P");
            //console.log("User has lost!");
            window.location.reload(true);
        }

        if(hasWon){
            alert("Hey! You won! Nice job!");
           // console.log("User has won!");
           window.location.reload(true);
        }
        */
    }

    
    function hasLost(){
        for(var i = 0; i <MAX_LENGTH; i++){
            if(isAt(i, 0)){
                var tile = getTileAt(i, 0);
                if (!tile.isFalling()){
                    return true;
                }
            }
        } 
        return false;
    }



    main();
    //gets called once | then loops forever
    function main(){
        ctx.clearRect(0,0,w,h);
        if(gameOn == 0){
            getCalledOnceHomescreen();
            drawTitleScreen();
            
        }
        if(gameOn == 1){
            getCalledOnce();
            drawTiles();
            dropTileTimer();
            drawBackgroundSquares();
            checkForMusicDrop();
            checkIfLooseOrWin();
        }

        if(gameOn == 2){
            //draw game over or winning screen
            drawGameOverOfWinningScreen();
        }
        
        requestAnimationFrame(main); //loop
    }
}                 