var index = localStorage.getItem('adIndex') || 0;
var ADimg = document.querySelectorAll('#advertisement > img');

function slideAD() {
    localStorage.setItem('adIndex', index);
    rightslide();
}

///////////슬라이드 처리/////////////////////////
calc_index();
function calc_index(){
    index=parseInt(index);
    right_index=(index + 1) % ADimg.length;
    left_index=(index + ADimg.length - 1) % ADimg.length;
    //console.log(left_index, index, right_index);
}

trans();
function trans(){
    ADimg.forEach(function(ad){
        ad.style.display = 'none';
    });
    ADimg[index].style.zIndex = '1';
    ADimg[left_index].style.zIndex = '0';
    ADimg[right_index].style.zIndex = '0';

    ADimg[index].style.right = '0%';
    ADimg[left_index].style.right = '100%';
    ADimg[right_index].style.right = '-100%';

    ADimg[index].style.display = 'block';
    ADimg[left_index].style.display = 'block';
    ADimg[right_index].style.display = 'block';
    localStorage.setItem('adIndex', index);
}
function rightslide() {
    index = right_index;
    ad_number();
    calc_index();
    trans();
}

function leftslide() {
    index = left_index;
    ad_number();
    calc_index();
    trans();
}
///////////////////////////////////////////////
var advertisement = document.getElementById('advertisement');
var startX;
var sensitivityThreshold = 50; // 이동 거리의 민감도 임계값

advertisement.addEventListener('touchstart', handleStart);
advertisement.addEventListener('mousedown', handleStart);
advertisement.addEventListener('touchend', handleEnd); // 수정된 부분: touchend 이벤트를 처리할 핸들러 추가
advertisement.addEventListener('mouseup', handleEnd); // 수정된 부분: mouseup 이벤트를 처리할 핸들러 추가


function handleStart(e) {
    clearInterval(interval_id);
    //console.log('자동넘기기 비활성화');
    e.preventDefault();
    if (e.type === 'touchstart') {
        var touch = e.touches[0];
        startX = touch.clientX;
    } else if (e.type === 'mousedown') {
        startX = e.clientX;
    }
}

function handleEnd(e) {
    //console.log('자동넘기기 활성화');
    interval_id = setInterval(slideAD, 10000);
}

advertisement.addEventListener('touchmove', handleMove);
advertisement.addEventListener('mousemove', handleMove);

function handleMove(e) {
    clearInterval(interval_id);
    //console.log('자동넘기기 비활성화');
    e.preventDefault();
    if (!startX) {
        return;
    }
    var endX;
    if (e.type === 'touchmove') {
        var touch = e.touches[0];
        endX = touch.clientX;
    } else if (e.type === 'mousemove') {
        endX = e.clientX;
    }
    var distance = Math.abs(endX - startX); // 이동 거리 계산
    if (distance >= sensitivityThreshold) { // 이동 거리가 임계값 이상이어야 작동
        if (endX > startX) {
            //console.log('->으로 했습니다.');
            leftslide();
        } else {
            //console.log('<-으로 했습니다.');
            rightslide();
        }
        startX = null;
    }
}

//////////////////////////////
leftslide()
slideAD();
//console.log('자동넘기기 활성화');
var interval_id=setInterval(slideAD, 10000);


//////////////광고 하단 몇번째 광고 표시//////////////////
function ad_number(){
    var parentElement = document.getElementById('ad_number');
    
    while (parentElement.firstChild) {
        parentElement.removeChild(parentElement.firstChild);
    }

    for (var i = 0; i < ADimg.length; i++) {
        var label = document.createElement('label');
        label.textContent = '●';
        if(index==i)label.style.opacity = '1.0';
        else label.style.opacity = '0.4';
        parentElement.appendChild(label);
    }
}


// 이벤트 리스너 등록
window.addEventListener('resize', function() {
    if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') {
        // 가상 키보드가 활성화되었을 때 조치
        document.getElementById('#bottom_bar').style.display = 'none'; // 예시로 50px 조절
    } else {
        // 가상 키보드가 비활성화되었을 때 조치
        document.getElementById('#bottom_bar').style.bottom = 'flex';
    }
});
