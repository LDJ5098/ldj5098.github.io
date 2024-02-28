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
var bottombar = document.getElementById('bottom_bar');

function detectKeyboardStatus() {
    // 윈도우의 높이를 가져옴
    var windowHeight = window.innerHeight;
    
    // 키보드가 활성화되었을 때 윈도우의 높이 변화를 감지
    window.addEventListener('resize', function() {
        var currentHeight = window.innerHeight;
        
        // 이전 윈도우의 높이와 현재 윈도우의 높이를 비교하여 키보드 상태를 판단
        if (windowHeight > currentHeight) {
            bottombar.style.position = 'absolute';
        } else {
            bottombar.style.position = 'fixed';
        }
    });
}

// 페이지 로드 시 키보드 상태 감지 함수 호출
window.onload = function() {
    detectKeyboardStatus();
};



//////////////////////클릭 이벤트//////////////////////////////////////
document.getElementById("liquor_jar").addEventListener("click", function() {
    window.location.href = "../pot/pot.html";
});

document.getElementById("sulmunity").addEventListener("click", function() {
    window.location.href = "../community/community.html";
});

document.getElementById("still_event").addEventListener("click", function() {
    window.location.href = "../still_event/still_event.html";
});

document.getElementById("sull_map").addEventListener("click", function() {
    window.location.href = "https://maps.app.goo.gl/wnNSidYG2Hqz5r9q9?g_st=i";
});

document.getElementById("this_month_sullink").addEventListener("click", function() {
    window.location.href = "../this_month_sullink/this_month_sullink.html";
});

document.getElementById("sultwark").addEventListener("click", function() {
    window.location.href = "../sultwark/sultwark.html";
});