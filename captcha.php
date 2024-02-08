<?php

session_start();

// Generate a random 4-digit number as the CAPTCHA code
$captchaCode = rand(1000, 9999);

// Save the CAPTCHA code in the session for verification later
$_SESSION['captcha_code'] = $captchaCode;

// Create an image with a white background
$image = imagecreatetruecolor(120, 40);
$background_color = imagecolorallocate($image, 255, 255, 255);
imagefilledrectangle($image, 0, 0, 120, 40, $background_color);

// Add the CAPTCHA code to the image
$text_color = imagecolorallocate($image, 0, 0, 0);
imagestring($image, 5, 40, 12, $captchaCode, $text_color);

// Set the content type and send the image to the browser
header('Content-type: image/png');
imagepng($image);

// Free up memory
imagedestroy($image);
?>