let captcha;

function generateCaptcha() {

    captcha = document.getElementById("captcha-img");
    let uniquechar = "";

    const randomchar = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";


    for (let i = 0; i < 5; i++) {
        uniquechar += randomchar.charAt(Math.floor(Math.random() * randomchar.length));
    }

  
    let canvas = document.createElement('canvas');
    canvas.width = 150;
    canvas.height = 50;
    let ctx = canvas.getContext('2d');

    // Draw the captcha text on the canvas
    ctx.font = '30px Arial';
    ctx.fillStyle = 'black';
    ctx.fillText(uniquechar, 10, 40);


    captcha.src = canvas.toDataURL();
}
 
async function printmsg() {
    const usr_input = document.getElementById("captcha-input").value;

    const { data: { text } } = await Tesseract.recognize(
        document.getElementById("captcha-img"),
        'eng',
        { logger: m => console.log(m) }
    );

    if (usr_input === text.trim()) {
        alert("fuckerm., Captch CORRECT matched good lol");
        generateCaptcha();
    } else {
        alert("WRONG CAPTCHTCAPTCHA FUCK");
        generateCaptcha();
    }
}