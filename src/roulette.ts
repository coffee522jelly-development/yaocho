// ルーレット関数の公開
export function startRoulette()
{
    console.log("Roulette started!");

    // 画面の初期化
    InitTitle();
}

// タイトルの初期化
function InitTitle()
{
    transitionTitle();
}

function transitionTitle(){
    // 4秒後にタイトルを消して、ルーレットを開始
    setTimeout(() => {
        const titleDiv = document.getElementById('title');
        
        if (titleDiv) 
        {
            // タイトル要素を非表示にする
            titleDiv.style.display = 'none';
        }

        // ルーレットをスタート
        GenerateRoulette();
    }, 3800); // 約4秒
}


// ルーレットの生成
function GenerateRoulette()
{
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

    // div要素を作成
    const container = document.createElement('div');
    container.classList.add('roulette-container');
    container.classList.add('fadein');

    const rouletteElem = document.createElement('div');
    rouletteElem.classList.add('roulette');
    rouletteElem.id = 'roulette';

    // roulette-containerにrouletteを追加
    container.appendChild(rouletteElem);

    // bodyにcontainerを追加
    document.body.appendChild(container);

    const target: string = "木 村";
    const roulette: HTMLElement | null = document.getElementById('roulette');

    // 名前を動的に生成
    if (roulette) {
        namesArray.forEach((name: string, index: number) => {
            const nameDiv: HTMLDivElement = document.createElement('div');
            nameDiv.classList.add('name');
            nameDiv.id = `name${index + 1}`;    // IDを設定
            nameDiv.textContent = name;         // テキストを設定
            roulette.appendChild(nameDiv);      // ルーレットに追加
        });
    }


    let winnerIndex: number = 0;
    let startTime: number = 0;
    let animationDuration: number = 0;          // 初期のアニメーション速度

    function updateAnimation(): void {
        const elapsedTime: number = Date.now() - startTime;

        if (elapsedTime < 3000) 
        {
        }
        else if (elapsedTime < 3500) 
        {
            animationDuration = 0.1 * elapsedTime;
        }
        else if (elapsedTime < 8000) 
        {
            animationDuration = 0.5 + 0.2 * (elapsedTime / 7000);
        }
        else if (elapsedTime < 12000) 
        {
            animationDuration = 1 + (elapsedTime / 12000);
        }
        else if (elapsedTime < 18000) 
        {
            animationDuration = 3 + 3 * (elapsedTime / 18000);
            updateNames(namesArray, target);
        }
        else 
        {
            if (roulette) 
            {
                roulette.style.animation = 'none';
                const rotationAngle: number = 360 - (winnerIndex * 36); // 当選者の位置に合わせるための回転角度
                roulette.style.transform = `rotateX(${rotationAngle}deg)`;
                const names: NodeListOf<HTMLDivElement> = document.querySelectorAll('.name');
                names[winnerIndex].classList.add('winner');
                return;
            }
        }

        if (roulette) 
        {
            roulette.style.animationDuration = `${animationDuration}s`;
        }
        requestAnimationFrame(updateAnimation);
    }

    startTime = Date.now();
    requestAnimationFrame(updateAnimation);
}

// 名称の更新
function updateNames(namesArray, target): void {
    namesArray.fill(target);
    const names: NodeListOf<HTMLDivElement> = document.querySelectorAll('.name');
    names.forEach((nameDiv: HTMLDivElement, index: number) => {
        nameDiv.textContent = namesArray[index];
    });
}