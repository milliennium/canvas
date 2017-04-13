let Data = [
    ['js', 0.3, '#aa5566'],
    ['h5', 0.2, '#6677aa'],
    ['css3', 0.1, '#b22443'],
    ['jq', 0.3, '#998aac'],
    ['rt', 0.1, '#ccc113']
];
//饼图
(function () {
    let oCanvas = $('<canvas/>').get(0);
$('.wrapper').append(oCanvas);

let [w, h] = [200, 200];
[oCanvas.width, oCanvas.height] = [w, h];

let oContext = oCanvas.getContext('2d');
oContext.fillStyle = '#eee';

let r = w / 2;
oContext.beginPath();
oContext.arc(r, r, r, 0, Math.PI * 2);
oContext.fill();


let oCavsData = $('<canvas/>').get(0);
[oCavsData.width, oCavsData.height] = [w, h]
$('.wrapper').append(oCavsData);
let oCxtData = oCavsData.getContext('2d');

let sAngle = 1.5 * Math.PI;
let eAngle = 0;
let aAngle = 2 * Math.PI;
Data.forEach((ele, index) => {
    oCxtData.beginPath();
    eAngle = sAngle + ele[1] * aAngle;
    oCxtData.fillStyle = ele[2];
    oCxtData.moveTo(r, r);
    oCxtData.arc(r, r, r, sAngle, eAngle);
    oCxtData.fill();

    var trueR = w / 4;
    let textAngle = sAngle + (eAngle - sAngle) / 2;
    
    let x = Math.abs( trueR * Math.cos(aAngle - (sAngle + (eAngle - sAngle) / 2 ) ) );
    let y = Math.abs( trueR * Math.sin(aAngle - (sAngle + (eAngle - sAngle) / 2 ) ) );

    
    sAngle = eAngle;
});

let oMask = $('<canvas/>').get(0);
[oMask.width, oMask.height] = [w, h];

let oMCxt = oMask.getContext('2d');
$('.wrapper').append(oMask);
oMCxt.fillStyle = '#7aa899';

function draw (percent) {
    oMCxt.clearRect(0, 0, w, h);
    oMCxt.beginPath();
    oMCxt.moveTo(r, r);
    oMCxt.arc(r, r, r, 1.5 * Math.PI, 1.5 * Math.PI - aAngle * percent, 1);
    oMCxt.fill();
}

draw(1);


var index = 1;
setTimeout (() => {
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            index -= 0.01;
            draw(index)  
        }, i * 20);
    }
}, 1000) 
$('.pietext').animate({opacity:1},800,'swing');
}())
//折线图
(function () {
    let oCanvas = $('<canvas/>').get(0);
    let oContext = oCanvas.getContext('2d');
    let [w, h] = [250, 250];
    var config = {};
    [config.width, config.height] = [w, h];
    oCanvas.width = config.width;
    oCanvas.height = config.height;
    $('.wrapperpoli').append(oCanvas);
    oContext.beginPath();
    oContext.lineWidth = 2;
    oContext.strokeStyle = '#f00';

    let step = 10;

    for (let i = 0; i < step + 1; i++) {
        let y = config.height / step * i;
        oContext.moveTo(0, y);
        oContext.lineTo(config.width, y);
    }

    oContext.stroke();

    for (let i = 0; i < Data.length + 2; i++) {
        let x = config.width / (Data.length + 1) * i;
        oContext.moveTo(x, 0);
        oContext.lineTo(x, config.height);
    }

    oContext.stroke();

    let oTrueWidth = config.width / 2 / (Data.length + 1);
    console.log(oTrueWidth)
    

    let oCav = $('<canvas/>').get(0);
    let oCt = oCav.getContext('2d');
    oCav.width = config.width;
    oCav.height = config.height;
    $('.wrapperpoli').append(oCav);
    function draw (per) {
        oCt.clearRect(0 , 0, config.width, config.height);
        oCt.beginPath();
        oCt.lineWidth = 2;
        oCt.strokeStyle = '#f00';

        let onePosX = config.width / (Data.length + 1);
        Data.forEach( (ele, index) => {
            var x = onePosX * (index + 1);
            var y = config.height *(1 - ele[1] * per );
            oCt.moveTo(x, y);
            oCt.arc(x, y, 2, 0, Math.PI * 2);
            oCt.stroke();
        });

        oCt.moveTo(onePosX, config.height *(1 - Data[0][1] * per ));

        Data.forEach( (ele, index) => {
            var x = config.width / (Data.length + 1) * (index + 1);
            var y = config.height *(1 - ele[1] * per);
            oCt.lineTo(x, y);
            oCt.stroke();
            if (index == Data.length - 1) {
                oCt.lineTo(x, config.height);
                oCt.lineTo(onePosX, config.height);
                oCt.fillStyle = 'rgba(255, 0 , 0, 0.4)';
                oCt.fill();
            }
        });

        Data.forEach( (ele, index) => {
            var x = onePosX * (index + 1);
            var y = config.height *(1 - ele[1] * per );
            oCt.moveTo(x, y);
            oCt.font = '18px Arial';
            oCt.fillStyle= ele[2];
            oCt.fillText(ele[1] * 100 + '%', x - 20, y - 20);
            oCt.stroke();
        });
    }
    
    draw(0) 


    var index = 0;
    setTimeout (() => {
        for (let i = 0; i < 100; i++) {
            setTimeout(() => {
                index += 0.01;
                draw(index)  
            }, i * 10);
        }
    }, 1000) 
    $('.politext').animate({opacity:1},800,'swing');
    
}())


