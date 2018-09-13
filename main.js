$(document).ready(function () {

    // to do : potwory nie mogą na siebie nachodzić 
    // pomysł : jeżeli getDistans jest mniejsze od X do dodaj do wartości wprowadzonych bo obliczyć
    // getDistace (x i y czegos) wartość Y

    // jezeli dystans potwór bohater bedzie wiekszy niz dystans od powtora do sciany + od przeciwnej
    // ściany do bohatera to potwór idzie na sciane w celu teleportacji 


    var can = document.createElement("canvas");
    can.style = "border: 2px solid red"

    document.body.appendChild(can);

    can.width = 500;
    can.height = 500;

    var h = 20;
    var x = can.width / 2 - h / 2;
    var y = can.height / 2 - h / 2;
    var dx = 0;
    var dy = 0;

    var innerColor;

    var playerX;
    var playerY;

    var monsterCount = 5;
    var monsterSpeed = 2;

    var speed = 5;

    var HPpoints = 10;

    var shotSize = 5;
    var sh = 0;



    // controls -------------------->>>
    var pX;
    var pY;


    function keyDD(e) {

        if (e.key == 'ArrowLeft')
            dx = -speed;
        if (e.key == 'ArrowRight')
            dx = speed;


        if (e.key == 'ArrowUp')
            dy = -speed;
        if (e.key == 'ArrowDown')
            dy = speed;


        //console.log(playerX);

    }


    document.addEventListener("keydown", keyDD);

    document.addEventListener("keyup", function (e) {

        if (e.key == 'ArrowLeft')
            dx = 0;
        else if (e.key == 'ArrowRight')
            dx = 0;

        else if (e.key == 'ArrowUp')
            dy = 0;
        else if (e.key == 'ArrowDown')
            dy = 0;
    });


    var shot = function () {

            cxt.beginPath();
            cxt.fillStyle = "blue";
            cxt.arc(playerX, playerY, shotSize, 0, Math.PI * 2, false);
            cxt.fill();



    }


    document.addEventListener("click", function (e) {

        aimX = e.clientX;
        aimY = e.clientY;

        var dis = getDistance(aimX, aimY, playerX, playerY);

        //console.log();
        
        sh = 1;
        
        setTimeout(function(){
            
            sh = 0;
            
        }, 2000);

    });



    function loopA() {

        cxt.fillStyle = innerColor;
        cxt.fillRect(x, y, h, h);

        playerX = (x += dx);

        playerY = (y += dy);

        if (y > can.height) {
            y = 0;
        }
        if (y + h < 0) {
            y = can.height;
        }

        if (x > can.width) {
            x = 0;
        }
        if (x + h < 0) {
            x = can.width;
        }

    }



    var state = 1;

    var counter = document.createElement("div");

    document.body.appendChild(counter);

    counter.classList.add("counter");



    // colision decetion --------------------->>>>>>>

    function getDistance(x1, y1, x2, y2) {


        let xDis = x2 - x1;
        let yDis = y2 - y1;

        return Math.sqrt(Math.pow(xDis, 2) + Math.pow(yDis, 2));
    }

    function randomNum(min, max) {

        var num = Math.floor(Math.random() * (max - min) + min) + 1;

        return num;
    }

    var numbers = [];


    innerColor = "rgba(0, 0, 0, 1)";


    var enemy = function (x, y) {

        this.x = x;
        this.y = y;

        this.updateF = function () {
            cxt.beginPath();
            cxt.fillStyle = "red";
            cxt.fillRect(x, y, h, h);


            //x += 1;
            //y += 1;

            var currentPositionx = x;
            var currentPositiony = y;



            var dis = getDistance(playerX, playerY, currentPositionx, currentPositiony);



            if (dis >= can.width / 2 + (h + 10)) {

                monsterSpeed = -2;

                //console.log("działa : " + monsterSpeed);

            } else
                monsterSpeed = 2;



            var upDis = getDistance(playerX, playerY, playerX, 0);
            var lefDis = getDistance(playerX, playerY, can.width, playerY);



            if (y - h >= can.height) {
                y = 0;
            }
            if (y + h <= 0) {
                y = can.height;
            }

            if (x - h >= can.width) {
                x = 0;
            }
            if (x + h <= 0) {
                x = can.width;
            }



            if (currentPositionx > playerX) {
                x -= monsterSpeed;
            } else if (currentPositionx < playerX) {
                x += monsterSpeed;
            }


            if (currentPositiony > playerY) {
                y -= monsterSpeed;
            } else if (currentPositiony < playerY) {
                y += monsterSpeed;
            }

            if (currentPositiony > playerY && currentPositionx > playerX) {
                y -= monsterSpeed;
                x -= monsterSpeed;
            } else if (currentPositiony < playerY && currentPositionx < playerX) {
                y += monsterSpeed;
                x += monsterSpeed;
            }






            //            if (enemy.x > playerX)
            //                x -= speed;
            //            else if (enemy.x < playerX)
            //                x += speed;


            //y += speed;




            if (dis < h && state == 1) {

                HPpoints--;

                state = 0;

                var blink1 = setInterval(function () {
                    innerColor = "rgba(160, 200, 160, 0.7)";
                }, 50)

                var blink2 = setInterval(function () {
                    innerColor = "rgba(0, 0, 0, 1)";
                }, 100)

                setTimeout(function () {

                    //console.log("time out");

                    state = 1;

                    clearInterval(blink1);
                    clearInterval(blink2);

                }, 1000);


            }

            if (HPpoints == 0) {
                $(".gameOver").css("visibility", "visible");

                document.removeEventListener("keydown", keyDD);
            }

            //console.log(dis);

            //console.log(" position X :" + currentPositionx);
            //console.log(" position Y :" + currentPositiony);


        }

    }

    for (var j = 0; j < monsterCount; j++) {

        // tu tworzyć przeciwników :)

        var monster = new enemy(randomNum(0 + h, can.width - h), randomNum(0 + h, can.width - h), h, h);

        numbers.push(monster);

    }



    var cxt = can.getContext("2d");

    function animation() {

        requestAnimationFrame(animation);

        cxt.clearRect(0, 0, can.width, can.height);

        loopA();




        console.log(sh);
        
        if(sh == 1){
           
            shot();
            
           }

        for (let s = 0; s < numbers.length; s++) {

            numbers[s].updateF();

            //console.log(numbers[s]);

        }

        counter.innerHTML = "HP: " + HPpoints;

    }

    animation();

});
