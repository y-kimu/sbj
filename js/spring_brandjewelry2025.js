// introのループスライド
$(function() {
  const $track = $(".slider-track");
  const $items = $(".slide-item");
  let posX = 0;
  let trackWidth = 0;
  const speed = 0.2;
  const waveData = [];
  $items.each(function() {
    const amp = 10 + Math.random() * 16;          // 10〜30pxの振幅
    const freq = 0.01 + Math.random() * 0.002;     // 0.01〜0.03の周波数
    const phase = Math.random() * 2 * Math.PI;    // 0〜2πの初期位相
    waveData.push({ amp, freq, phase });
  });
  let time = 0;
  $(window).on("load", function() {
    trackWidth = $track.width();
    console.log("trackWidth:", trackWidth);
    requestAnimationFrame(animate);
  });
  function animate() {
    time++;
    posX -= speed;
    posX = parseFloat(posX.toFixed(2))
    $track.css({
      transform: `translateX(${posX}px)`
    });
    if (posX <= -trackWidth / 2) {
      posX = 0;
    }
    $items.each(function(i, el) {
      const data = waveData[i];
      const waveOffset = Math.sin(time * data.freq + data.phase) * data.amp;
      $(el).css({
        transform: `translateY(${waveOffset}px)`
      });
    });
    requestAnimationFrame(animate);
  }
});

// nav_menuをスクロール時に画面下部で非表示にする
$(function() {
  function getFadeOutThreshold() {
    let windowWidth = $(window).width();

    if (windowWidth < 528) { // スマホサイズ
      return 2800;
    } else if (windowWidth < 768) { // タブレットサイズ
      return 2350;
    } else if (windowWidth < 1024) { // タブレットサイズ
      return 2100;
    } else { // PCサイズ
      return 1500;
    }
  }
  $(window).on('scroll resize', function() {
    let fadeOutThreshold = getFadeOutThreshold(); // 現在の画面幅に基づいた閾値を取得
    let docHeight = $(document).height();   // ページ全体の高さ
    let winHeight = $(window).height();     // ウィンドウの高さ
    let scrollTop = $(this).scrollTop();    // スクロール量

    let distanceFromBottom = docHeight - (scrollTop + winHeight);

    if (distanceFromBottom <= fadeOutThreshold) {
      $('.nav_wrapper').fadeOut();
    } else {
      $('.nav_wrapper').fadeIn();
    }
  });
});

// スクロール時のフェイドアップ
$(window).scroll(function() {
  $('.fadeUpTrigger').each(function(){
    var elemPos = $(this).offset().top + 50;
    var scroll = $(window).scrollTop();
    var windowHeight = $(window).height();
    if (scroll >= elemPos - windowHeight) {
      $(this).addClass('fadeUp');
    } else {
      $(this).removeClass('fadeUp');
    }
  });
});