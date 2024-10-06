// ルーレット関数の公開
export function startRoulette()
{
    console.log("Roulette started!");
    const namesArray: string[] = [
        "木 村", // 当選者
        "中 野",
        "西 村",
        "長 友",
        "中 村",
        "木 村",
        "中 野",
        "西 村",
        "長 友",
        "中 村"
    ];

    const target: string = "木 村";
    const roulette: HTMLElement | null = document.getElementById('roulette');

    // 名前を動的に生成
    if (roulette) {
        namesArray.forEach((name: string, index: number) => {
            const nameDiv: HTMLDivElement = document.createElement('div');
            nameDiv.classList.add('name');
            nameDiv.id = `name${index + 1}`; // IDを設定
            nameDiv.textContent = name; // テキストを設定
            roulette.appendChild(nameDiv); // ルーレットに追加
        });
    }

    let winnerIndex: number = 0;
    let startTime: number = 0;
    let animationDuration: number = 1; // 初期のアニメーション速度

    function updateAnimation(): void {
        const elapsedTime: number = Date.now() - startTime;

        if (elapsedTime < 5000) {
            animationDuration = 1 + elapsedTime / 5000; // 5秒かけて1秒から2秒に
        } else if (elapsedTime < 10000) {
            animationDuration = 2 + (elapsedTime - 5000) / 5000 * 3; // 5秒かけて2秒から5秒に
        } else if (elapsedTime < 15000) {
            namesArray.fill(target);
            updateNames(); // 名前を更新する
            animationDuration = 5; // 10秒以降は5秒で固定
        } else {
            // 15秒経過時に回転を停止し、結果を表示
            if (roulette) {
                roulette.style.animation = 'none';
                const rotationAngle: number = 360 - (winnerIndex * 36); // 当選者の位置に合わせるための回転角度
                roulette.style.transform = `rotateX(${rotationAngle}deg)`;
                const names: NodeListOf<HTMLDivElement> = document.querySelectorAll('.name');
                names[winnerIndex].classList.add('winner');
                return; // 終了
            }
        }

        if (roulette) {
            roulette.style.animationDuration = `${animationDuration}s`;
        }
        requestAnimationFrame(updateAnimation);
    }

    function updateNames(): void {
        const names: NodeListOf<HTMLDivElement> = document.querySelectorAll('.name');
        names.forEach((nameDiv: HTMLDivElement, index: number) => {
            nameDiv.textContent = namesArray[index]; // 配列の内容を更新
        });
    }

    startTime = Date.now();
    requestAnimationFrame(updateAnimation);
}