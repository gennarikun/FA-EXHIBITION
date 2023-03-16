((d, w) => {
  /**
    スクロールでヘッダーの表示・非表示
  */
  const header = d.querySelector('.js-header');
  w.addEventListener('scroll', () => {
    const scrollY = pageYOffset;
    if (scrollY > 520) {
      header.classList.add('is-showHeader');
    } else {
      header.classList.remove('is-showHeader');
    }
  });
  /**
    クリックでメニューの表示・非表示
  */
  const menu = d.querySelector('.js-menu');
  const menuIcon = d.querySelector('.js-menu_icon');
  menuIcon.addEventListener('click', () => {
    menu.classList.toggle('is-shouMenu');
  });
  /**
    スクロールで追従ボタンの表示・非表示
    ※pcサイズのみ適応
  */
  const isDesktop = matchMedia('(min-width: 900px)');
  const following = d.querySelector('.js-following');
  w.addEventListener('resize', () => {
    if (isDesktop.matches) {
      following.classList.add('is-showFollowing');
    } else {
      following.classList.remove('is-showFollowing');
    }
  });
  w.addEventListener('scroll', () => {
    if (isDesktop.matches) {
      // 対象要素の画面トップからの距離を取得
      const gallery = d.querySelector('.js-gallery').getBoundingClientRect().top;
      const access = d.querySelector('.js-access').getBoundingClientRect().top;
      // 画面トップから対象要素までの距離が、画面の高さより小さくなったら実行
      if (gallery <= w.innerHeight) {
        following.classList.add('is-showFollowing');
      } else {
        following.classList.remove('is-showFollowing');
      }
      if (access <= w.innerHeight) {
        following.classList.remove('is-showFollowing');
      }
    }
  });
  /**
    キービジュアルの拡大・縮小
  */
  let mainVisual = d.querySelectorAll('.js-mainVisual');
  w.addEventListener('resize', () => {
    if (isDesktop.matches) {
      for (let i = 0; i < mainVisual.length; i++) {
        //現在のスクロール位置を取得して、10で除算
        let scrollY = w.scrollY / 10;
        //取得したスクロールの値と画像幅を加算して、メインビジュアルのwidthに設定
        mainVisual[i].style.width = 33.3333 + scrollY + '%';
      }
    } else {
      for (let i = 0; i < mainVisual.length; i++) {
        let scrollY = w.scrollY / 12.2;
        //取得したスクロールの値と画像幅を減算して、メインビジュアルのwidthに設定
        mainVisual[i].style.width = 100 - scrollY + '%';
      }
    }
  });
  w.addEventListener('scroll', () => {
    if (isDesktop.matches) {
      for (let i = 0; i < mainVisual.length; i++) {
        //現在のスクロール位置を取得して、10で除算
        let scrollY = w.scrollY / 10;
        //取得したスクロールの値と画像幅を加算して、メインビジュアルのwidthに設定
        mainVisual[i].style.width = 33.3333 + scrollY + '%';
      }
    } else {
      for (let i = 0; i < mainVisual.length; i++) {
        let scrollY = w.scrollY / 12.2;
        //取得したスクロールの値と画像幅を減算して、メインビジュアルのwidthに設定
        mainVisual[i].style.width = 100 - scrollY + '%';
      }
    }
  });
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
    // 画面トップから対象要素までの距離が、画面の高さより小さくなったら実行
    if (access <= w.innerHeight) {
      background.classList.add('is-showbackground');
    } else {
      background.classList.remove('is-showbackground');
    }
    if (contact <= w.innerHeight) {
      background.classList.remove('is-showbackground');
    }
    });
})(document, window);