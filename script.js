document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('captcha');
    const ctx = canvas.getContext('2d');
    let captchaText = generateCaptchaText(6);
    const captchaStatus = document.getElementById('captcha-status');

    drawCaptcha(captchaText);

    function verifyCaptcha() {
        const inputText = document.getElementById('captcha-input').value.toLowerCase();

        if (inputText === captchaText.toLowerCase()) {
            captchaStatus.textContent = 'Captcha correct!';
            captchaStatus.style.color = "lime";
        } else if (inputText.length < 6) {
            captchaStatus.textContent = 'Enter all characters!';
            captchaStatus.style.color = "crimson";
        } else {
            captchaStatus.textContent = 'Captach incorrect. Try again!';
            captchaStatus.style.color = "crimson";
        }
        setTimeout(() => {
            captchaStatus.textContent = 'Status: IDLE';
            captchaStatus.style.color = 'darkgreen';
        }, 3000);
    }
    document.getElementById('check-captcha').addEventListener('click', verifyCaptcha);

    document.getElementById('reload-captcha').addEventListener('click', function () {
        const inputText = document.getElementById('captcha-input').value = '';
        captchaText = generateCaptchaText(6);
        drawCaptcha(captchaText);
    })
    function generateCaptchaText(length) {
        let result = '';
        const chars = 'ABCDEFGHIJKLMNOPQRTUVWXYZabcdefghijklmnopqrestuvwxyz0123456789';
        const charsLength = chars.length;
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * charsLength));
        }
        return result;
    }
    function drawCaptcha(text) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        addNoise(ctx);
        ctx.font = '24px Arial';

        const textWidth = ctx.measureText(text).width;
        const startX = (canvas.width - textWidth) / 3;

        for (let i = 0; i < text.length; i++) {
            ctx.save();
            ctx.translate(startX + i * 20, 30);
            ctx.rotate((Math.random() - 0.5) * 0.4);
            ctx.fillText(text[i], 0, 0);
            ctx.restore();
        }
    }
    function addNoise(ctx) {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const pixels = imageData.data;
        for (let i = 0; i < pixels.length; i += 2) {
            let color = (Math.random() > 0.2) ? 0 : 200;
            pixels[i] = pixels[i + 1] = pixels[i + 3] = color;
        }
        ctx.putImageData(imageData, 0, 0);
    }
})
