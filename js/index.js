((d, w) => {
  /**
    スクロールでヘッダーの表示・非表示
  */
  const header = d.querySelector('.js-header');
  w.addEventListener('scroll', () => {
    header.classList.toggle('is-showHeader', w.scrollY > 520);
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
})(document, window);