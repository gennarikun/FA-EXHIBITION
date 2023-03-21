((d, w) => {
  /**
    スクロールでヘッダーの表示・非表示
  */
  const header = d.querySelector('.js-header');
  w.addEventListener('scroll', () => {
    header.classList.toggle('is-showHeader', w.scrollY > 520);
  });
  /**
    スクロールで追従ボタンの表示・非表示
    追従ボタンはpc幅のみ表示
  */
  const isDesktop = matchMedia('(min-width: 900px)');
  const following = d.querySelector('.js-following');
  const gallery = d.querySelector('.js-gallery');
  const access = d.querySelector('.js-access');
  w.addEventListener('scroll', () => {
    if (isDesktop.matches) {
      if (gallery.getBoundingClientRect().top <= w.innerHeight && w.innerHeight <= access.getBoundingClientRect().top) {
        following.classList.add('is-showFollowing');
      } else {
        following.classList.remove('is-showFollowing');
      }
    }
  });
  // リサイズでsp幅にした場合は追従ボタンを非表示
  w.addEventListener('resize', () => {
    if (!isDesktop.matches || isDesktop.matches && w.innerHeight <= gallery.getBoundingClientRect().top || isDesktop.matches && access.getBoundingClientRect().top <= w.innerHeight) {
      following.classList.remove('is-showFollowing');
    } else {
      following.classList.add('is-showFollowing');
    }
  });

  /**
    スクロール時のメインジュアル要素幅の処理
    pcは拡大、spは縮小させる
  */
  'resize scroll'.split(' ').forEach((eventName) => {
    w.addEventListener(eventName, () => {
      const mainVisual = d.querySelectorAll('.js-mainVisual');
      // 画面幅によって値の変更
      const value = isDesktop.matches ? 10 : 12.2;
      // 要素幅の計算用関数
      const widthCalc = isDesktop.matches ? (scrollY) => 33.3333 + scrollY + '%' : (scrollY) => 100 - scrollY + '%';
      // 各メインビジュアルに要素幅を代入
      mainVisual.forEach((e) => {
        e.style.width = widthCalc(w.scrollY / value);
      });
    })
  })
  /**
    フェードイン
  */
  const fadeIn = d.querySelectorAll('.js-fadeIn');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // 監視対象の要素が画面内に入って、かつ要素の30%が可視範囲に入った時の処理
      if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
        entry.target.classList.add('add-fadeIn');
      }
    });
  }, { threshold: 0.3 }); /* 監視対象要素の要素の30%が可視範囲に入った時の閾値 */
  fadeIn.forEach(item => {
    observer.observe(item);
  });
  /**
    スクロールで背景画像の表示・非表示
  */
  const background = d.querySelector('.js-background');
  w.addEventListener('scroll', () => {
    // 対象要素の画面トップからの距離を取得
    const access = d.querySelector('.js-access').getBoundingClientRect().top;
    const contact = d.querySelector('.js-contact').getBoundingClientRect().top;
    // 画面トップからの距離が、対象要素の間の場合は実行
    if (w.innerHeight <= access || contact <= w.innerHeight) {
      background.classList.remove('is-showbackground');
    } else {
      background.classList.add('is-showbackground');
    }
    });
    /**
      クリックでメニュー表示・非表示
    */
    const menu = d.querySelector('.js-menu');
    const menuIcon = d.querySelector('.js-menu_icon');
    menuIcon.addEventListener('click', () => {
      menu.classList.toggle('is-shouMenu');
    });
    /**
      メニューボタンクリック時のスムーススクロール
    */
    // イージング関数
    const Ease = {
      easeInOut: function (t) { return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1; }
    }
    // アニメーションの Duration の設定
    const duration = 500;
    w.addEventListener('DOMContentLoaded', function () {
      // スムーススクロールのトリガーを取得
      const smoothScrollTrigger = d.querySelectorAll('.js-menu_link[href^="#"]');
      // トリガーをクリックした時に実行
      for (let i = 0; i < smoothScrollTrigger.length; i++) {
        smoothScrollTrigger[i].addEventListener('click', (e) => {
          e.preventDefault();
          // メニューボタンクリックでメニュー非表示
          menu.classList.remove('is-shouMenu');
          // 現在のスクロール位置を取得（クロスブラウザに対応）
          const currentPostion = d.documentElement.scrollTop || d.body.scrollTop;
          // スクロール先の要素を取得
          const href = smoothScrollTrigger[i].getAttribute('href');
          const targetElement = d.getElementById(href.replace('#', ''));
          // スクロール先の要素が存在する場合はスムーススクロールを実行
          if (targetElement) {
            // スクロール先の要素の位置を取得
            const targetPosition = w.pageYOffset + targetElement.getBoundingClientRect().top;
            // スタート時点の時間を取得
            const startTime = performance.now();
            // アニメーションのループを定義
            const loop = function (nowTime) {
              // スタートからの経過時間を取得
              const time = nowTime - startTime;
              // duration を1とした場合の経過時間を計算
              const normalizedTime = time / duration;
              // duration に経過時間が達していない場合はアニメーションを実行
              if (normalizedTime < 1) {
                // 経過時間とイージングに応じてスクロール位置を変更
                w.scrollTo(0, currentPostion + ((targetPosition - currentPostion) * Ease.easeInOut(normalizedTime)));
                // アニメーションを継続
                requestAnimationFrame(loop);
              // duration に経過時間が達したら、アニメーションを終了
              } else {
                w.scrollTo(0, targetPosition);
              }
            }
            // アニメーションをスタート
            requestAnimationFrame(loop);
          }
        });
      }
    });
})(document, window);