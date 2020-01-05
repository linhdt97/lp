// animal show prize
var scroll = window.requestAnimationFrame || function (callback) {
    window.setTimeout(callback, 1000/60);
};
var elementsToShows = document.querySelectorAll('.show-on-scroll');
function loop() {
    elementsToShows.forEach(function (element) {
        var classList = element.classList;
        isElementInViewport(element) ? classList.add('is-visible') : classList.remove('is-visible');
    });
    scroll(loop);
}
loop();
function isElementInViewport(el) {
    if (typeof jQuery === "function" && el instanceof jQuery) {
        el = el[0];
    }
    var rect = el.getBoundingClientRect(),
        height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight;
    return (rect.top <= 0 && rect.bottom >= 0)
        || (rect.bottom >= height && rect.top <= height)
        || (rect.top >= 0 && rect.bottom <= height);
}
const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        entry.target.classList.toggle("is-visible");
    });
});
const targets = document.querySelectorAll(".show-on-scroll");
targets.forEach(function(target) {
    observer.observe(target);
});

// count down time
var endDate = new Date("Jan 10, 2020 17:30:00").getTime();
var x = setInterval(function() {
    var now = new Date().getTime(),
        distance = endDate - now;
    if (distance < 1) {
        clearInterval(x);
    } else {
        var days = Math.floor(distance / (1000 * 60 * 60 * 24)),
            hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
            seconds = Math.floor((distance % (1000 * 60)) / 1000),
            domDays = document.querySelector(".days .number"),
            domHours = document.querySelector(".hours .number"),
            domMinutes = document.querySelector(".minutes .number");

        parseInt(domDays.innerHTML) !== days && (domDays.innerHTML = days < 10 ? '0' + days : days);
        parseInt(domHours.innerHTML) !== hours && (domHours.innerHTML = hours < 10 ? '0' + hours : hours);
        parseInt(domMinutes.innerHTML) !== minutes && (domMinutes.innerHTML = minutes < 10 ? '0' + minutes : minutes);
        document.querySelector(".seconds .number").innerText = seconds < 10 ? '0' + seconds : seconds;
    }
}, 1000);

var pages = $('#landing-page>div');
var countPage = pages.length;
var maxPageIndex = countPage - 1;
// scroll up
function scrollUp() {
    var pageIndex = _get_scroll_percentage() * countPage - 1;
    Number.isInteger(pageIndex) && pageIndex--;
    pageIndex = parseInt(pageIndex);
    pageIndex < 0 && (pageIndex = 0);
    // pages[pageIndex].scrollIntoView();
    var y = pages[pageIndex].getBoundingClientRect().top + window.scrollY;
    $('body').stop().animate({scrollTop: y}, 800, 'swing');
}
$('.arrows-up').click(function () {
    scrollUp();
});
// scroll down
function scrollDown() {
    var pageIndex = _get_scroll_percentage() * countPage;
    pageIndex = parseInt(pageIndex);
    pageIndex > maxPageIndex && (pageIndex = maxPageIndex);
    // pages[pageIndex].scrollIntoView();
    var y = pages[pageIndex].getBoundingClientRect().top + window.scrollY;
    $('body').stop().animate({scrollTop: y}, 500, 'swing');
}
$('.arrows-down').click(function () {
    scrollDown();
});

$(document).on('mousewheel', 'body', function (event) {
    event.originalEvent.wheelDelta > 0 ? scrollUp() : scrollDown();
});

// var lastY;
// $(document).bind('touchmove', function (e) {
//     var currentY = e.originalEvent.touches[0].clientY;
//     if(currentY > lastY) {
//         scrollUp();
//     } else if (currentY < lastY) {
//         scrollDown();
//     }
//     lastY = currentY;
// });

/**
 * get current vertical scroll percentage
 */
function _get_scroll_percentage() {
    var scrollY = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop || 0;
    var windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0;
    // return (scrollY + windowHeight) / _get_doc_height();
    return (scrollY + windowHeight) / (countPage * windowHeight);
}

/**
 * get current absolute document height
 */
function _get_doc_height() {
    return Math.max(
        document.body.scrollHeight || 0, document.documentElement.scrollHeight || 0,
        document.body.offsetHeight || 0, document.documentElement.offsetHeight || 0,
        document.body.clientHeight || 0, document.documentElement.clientHeight || 0
    );
}

// toggle arrow icons
function toggleArrowsScroll() {
    var percent = _get_scroll_percentage();
    percent === 1 ? $('.arrows-down').hide() : $('.arrows-down').show();
    percent === 1/countPage ? $('.arrows-up').hide() : $('.arrows-up').show();
}
toggleArrowsScroll();
$(window).scroll(function () {
    toggleArrowsScroll()
});

// lazy loading images and iframe
function lazyLoad() {
    $('iframe').each(function () {
        var frame = $(this),
            vidSource = $(frame).attr('data-src'),
            distance = $(frame).offset().top - $(window).scrollTop(),
            distTopBot = window.innerHeight - distance,
            distBotTop = distance + $(frame).height();

        if (distTopBot >= 0 && distBotTop >= 0) { // if frame is partly in view
            $(frame).attr('src', vidSource);
            $(frame).removeAttr('data-src');
        }
    });
    $('img').each(function () {
        var image = $(this),
            imgSource = $(image).attr('data-src'),
            distance = $(image).offset().top - $(window).scrollTop(),
            distTopBot = window.innerHeight - distance,
            distBotTop = distance + $(image).height();

        if (distTopBot >= 0 && distBotTop >= 0) {
            $(image).attr('src', imgSource);
            $(image).removeAttr('data-src');
        }
    });
}
lazyLoad();
var throttled = _.throttle(lazyLoad, 100);
$(window).scroll(throttled);
