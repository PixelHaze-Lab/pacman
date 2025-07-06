function hittest(a, b){
    // getComputedStyleで、CSSによって最終的に計算されたピクセル値を取得
    const aStyle = window.getComputedStyle(a);
    const bStyle = window.getComputedStyle(b);

    // parseFloatを使ってpxを取り除いて数値に変換
    const aX1 = parseFloat(aStyle.left);
    const aY1 = parseFloat(aStyle.top);
    const aWidth = parseFloat(aStyle.width);
    const aHeight = parseFloat(aStyle.height);

    const bX1 = parseFloat(bStyle.left);
    const bY1 = parseFloat(bStyle.top);
    const bWidth = parseFloat(bStyle.width);
    const bHeight = parseFloat(bStyle.height);

    // 要素の右下の座標を計算
    const aX2 = aX1 + aWidth;
    const aY2 = aY1 + aHeight;

    const bX2 = bX1 + bWidth;
    const bY2 = bY1 + bHeight;

    // AABB衝突判定のシンプルなロジック
    // 衝突していない条件を考えて、その逆が衝突している条件
    const hit = !(aX1 >= bX2 || // aがbの右にある
                  aX2 <= bX1 || // aがbの左にある
                  aY1 >= bY2 || // aがbの下にある
                  aY2 <= bY1);  // aがbの上にある

    return hit;
}
function eatDot(dot) {
	dot.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
	dot.style.transform = 'scale(2)';
	dot.style.opacity = '0';
	
	// アニメーション終了後に要素をDOMから削除
	setTimeout(() => {
	  if (dot.parentNode) {
		dot.parentNode.removeChild(dot);
	  }
	}, 300);
	
	// サウンド再生（あれば）
	const chompSound = document.getElementById('chompSound');
	if (chompSound) {
	  chompSound.currentTime = 0;
	  chompSound.play();
	}
  }
  