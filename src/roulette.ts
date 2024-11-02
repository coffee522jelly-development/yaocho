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


// タイトルの経過表示
function transitionTitle() 
{
    setTimeout(() => {

        // タイトルの非表示
        const titleDiv: HTMLElement | null = document.getElementById('title');
        if (titleDiv)
            titleDiv.style.display = 'none';

        // ルーレットの開始
        GenerateRoulette();
    }, 6000);
}


// ルーレットの生成
function GenerateRoulette() 
{
    // 最大10人まで対応
    const strTarget: string  = "木 村";

    let aryNames: string[] = []; // 空の配列を準備

    aryNames.push('木 村');
    aryNames.push('中 野');
    aryNames.push('西 村');
    aryNames.push('上 田');
    aryNames.push('中 村');

    let i = 0;
    while (aryNames.length < 10) {
        aryNames.push(aryNames[i % aryNames.length]);       // iをaryNames.lengthで割った余りをインデックスとして使用
        i++;
    }

    const container = document.createElement('div');
    container.classList.add('roulette-container');
    container.classList.add('fadein');

    const domRouletteNewElem = document.createElement('div');
    domRouletteNewElem.classList.add('roulette');
    domRouletteNewElem.id = 'roulette';

    container.appendChild(domRouletteNewElem);

    document.body.appendChild(container);

    const domRoulette: HTMLElement | null = document.getElementById('roulette');

    // 名前を動的に生成
    if (domRoulette) 
    {
        const colors = ['#f09199', '#20AEE5']; // 色の配列
        aryNames.forEach((strName: string, index: number) => {
            const nameDiv: HTMLDivElement = document.createElement('div');
            nameDiv.classList.add('name');
            nameDiv.id = `name${index + 1}`;
            nameDiv.textContent = strName;
            
            const angle = index * 36; 
            const colorIndex = index % colors.length;
            nameDiv.style.transform = `rotateX(${angle}deg) translateZ(500px)`;
            nameDiv.style.color = colors[colorIndex];
            
            domRoulette.appendChild(nameDiv);
        });
    }

    const startTime: number = Date.now();
    requestAnimationFrame(updateAnimation.bind(null, startTime, domRoulette, aryNames, strTarget)); 
}


// アニメーションの更新
// 引数：startTime＝開始時間
// 引数：domRoulette＝DOMルーレット要素
// 引数：aryNames＝候補者配列
// 引数：strTarget＝当選者
function updateAnimation(startTime: number, domRoulette: HTMLElement | null, aryNames: string[], strTarget: string): void 
{
    let bReverse: boolean = false;
    let animationDuration: number = 0;
    let targetIndex: number = 0;
    const PassedTime: number = Date.now() - startTime;

    switch (true) 
    {
    case PassedTime < 3000:
        break;

    case PassedTime < 4200:
        animationDuration = 10;
        bReverse = true;
        break;

    case PassedTime < 8000:
        animationDuration = 0.5 + 0.2 * (PassedTime / 7000);
        bReverse = false;
        break;

    case PassedTime < 12000:
        animationDuration = 1 + (PassedTime / 12000);
        break;

    case PassedTime < 18000:
        animationDuration = 3 + 3 * (PassedTime / 18000);
        updateYaochoNames(aryNames, strTarget);
        break;

    default:
        if (domRoulette) 
        {
            domRoulette.style.animation = 'none';
            const rotationAngle: number = 360 + (targetIndex * 36);
            domRoulette.style.transform = `rotateX(${rotationAngle}deg)`;
            const names: NodeListOf<HTMLDivElement> = document.querySelectorAll('.name');
            names[targetIndex].classList.add('winner');
            return;
        }
    }

    if (domRoulette) 
    {
        domRoulette.style.animationDuration = `${animationDuration}s`;
        domRoulette.style.animationDirection = bReverse ? 'reverse' : 'normal';
    }
    requestAnimationFrame(updateAnimation.bind(null, startTime, domRoulette, aryNames, strTarget));
}


// 名称の八百長更新
// 引数：aryNames＝候補者配列
// 引数：srtTarget＝当選者
function updateYaochoNames(aryNames: string[], strTarget: string): void 
{
    aryNames.fill(strTarget);
    const names: NodeListOf<HTMLDivElement> = document.querySelectorAll('.name');
    names.forEach((nameDiv: HTMLDivElement, index: number) => {
        nameDiv.textContent = aryNames[index];
    });
}