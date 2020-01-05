<html><head>
    <meta charset="utf-8">
    <title>“CHẤT” party</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="{!! asset('css/style.css') !!}">
    <style>
        @font-face
        {
            font-family: 'UTM Bebas';
            src: url('utm-bebas/UTM Bebas.eot');
            src: url('utm-bebas/UTM Bebas.eot?#') format('embedded-opentype'),
            url('utm-bebas/UTM Bebas.woff') format('woff'),
            url('utm-bebas/UTM Bebas.ttf') format('truetype');
        }
        body {
            font-family:'UTM Bebas';
        }
        canvas {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
        }
    </style>
</head>
<body>
<div id="landing-page">
    <div class="page-one">
        <img class="_company-banner lazy" src="images/company-banner.png">
        <div class="_banner">
            <img class="_main lazy" alt="main" src="images/main.png">
        </div>
        <div class="time-countdown">
            <div class="label">Chỉ còn</div>
            <div class="content">
                    <span class="days">
                        <span class="number">04</span>
                        <span class="label">Ngày</span>
                    </span>
                <span class="hours">
                        <span class="number">17</span>
                        <span class="label">Giờ</span>
                    </span>
                <span class="minutes">
                        <span class="number">45</span>
                        <span class="label">Phút</span>
                    </span>
                <span class="seconds">
                        <span class="number">18</span>
                        <span class="label">Giây</span>
                    </span>
            </div>
        </div>
    </div>
    <div class="page-two">
        <div class="_container">
            <div class="_schedule">
                <img data-src="images/schedule.png">
            </div>
            <div class="invitation">
                <img class="_seat-map lazy" data-src="images/thiep-moi.jpg">
            </div>
        </div>
    </div>
    <div class="page-three">
        <div class="_panel-heading">Làm phải nhất - chơi phải chất</div>
        <iframe data-src="https://www.youtube.com/embed/n2BXcne05wQ?autoplay=1" frameborder="0" allowfullscreen=""></iframe>
    </div>
    <div class="page-four">
        <div class="_panel-heading">Lắc lì xì, Rinh quà cực “Chất”</div>
        <div class="prize-container">
            <div class="my-rikkei-banner">
                <img data-src="images/my-rikkei.png">
                <div class="description">
                    <span>myRikkei là ứng dụng đặc biệt hỗ trợ công việc và đời sống của Rikkeisofter. Cùng chờ đón để trải nghiệm và nhận những phần quà cực CHẤT nhé!</span>
                </div>
            </div>
            <div class="first-prize prize">
                <div class="title">
                    <div class="label">Giải nhất</div>
                    <div class="content">Tivi skyworth 32e6-32"</div>
                </div>
                <div class="show-on-scroll inline-photo">
                    <img class="lazy" data-src="images/tivi-led-skyworth.jpg">
                </div>
            </div>
            <div class="second-prize prize">
                <div class="title">
                    <div class="label">Giải nhì</div>
                    <div class="content">loa bluetooth sony</div>
                </div>
                <div class="show-on-scroll inline-photo">
                    <img class="lazy" style="border-radius: 30%;" data-src="images/loa-bluetooth-sony.jpg">
                </div>
            </div>
            <div class="third-prize prize">
                <div class="title">
                    <div class="label">Giải ba</div>
                    <div class="content">chuột corsair glaive</div>
                </div>
                <div class="show-on-scroll inline-photo">
                    <img class="lazy" style="border-radius: 15%;" data-src="images/chuot-corsair-glaive.png">
                </div>
            </div>
        </div>
    </div>
    <canvas id="canvas" width="1366" height="210"></canvas>
</div>
<div class="arrows arrows-up" style="display: none;"></div>
<div class="arrows arrows-down"></div>
<script src="{!! asset('js/libs/jquery.min.js') !!}"></script>
<script src="{!! asset('js/firework.js') !!}"></script>
<script src="{!! asset('js/libs/undercore.min.js') !!}"></script>
<script src="{!! asset('js/script.js') !!}"></script>
</body>
</html>
