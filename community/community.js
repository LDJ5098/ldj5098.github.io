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

///////////////////////////////////나의 커뮤니티 스크롤 위치 이벤트//////////
function checkScroll(scrollDiv, scrollPosition_number) {
    // 스크롤 가능한 div의 높이
    var divHeight = scrollDiv.clientHeight;
    // 스크롤 가능한 div 내부의 컨텐츠 전체 높이
    var contentHeight = scrollDiv.scrollHeight;
    // 스크롤이 있는 div의 현재 스크롤 위치
    var scrollPosition = scrollDiv.scrollTop;

    // 스크롤이 맨 아래에 도달했는지 확인
    if (scrollPosition + divHeight >= contentHeight-2 && scrollPosition_number !== 'up') {
        scrollDiv.style.boxShadow = 'inset 0 0.7vw 0.7vw -0.7vw rgba(0, 0, 0, 0.5)';
        return 'up';
    }

    // 스크롤이 맨 위에 있는지 확인
    else if (scrollPosition === 0 && scrollPosition_number !== 'down') {
        scrollDiv.style.boxShadow = 'inset 0 -0.7vw 0.7vw -0.7vw rgba(0, 0, 0, 0.5)';
        return 'down';
    }

    // 스크롤이 중간에 있는 경우
    else {
        if(scrollPosition_number !== 'mid'){
            scrollDiv.style.boxShadow = 'inset 0 -0.6vw 0.6vw -0.6vw rgba(0, 0, 0, 0.5), inset 0 0.6vw 0.6vw -0.6vw rgba(0, 0, 0, 0.5)';
            return 'mid';
        }
    }
}

var community_list_scroll_number = 'up';
var community_list_scroll = document.getElementById('community_list');
community_list_scroll.addEventListener('scroll', function() {
    community_list_scroll_number = checkScroll(community_list_scroll, community_list_scroll_number);
});

var category_result_scroll_number = 'up';
var category_result_scroll = document.getElementById('searching_result_div_after');
category_result_scroll.addEventListener('scroll', function() {
    category_result_scroll_number = checkScroll(category_result_scroll, category_result_scroll_number);
});

var category_check_scroll_number_1 = 'up';
var category_check_scroll = document.getElementById('category_check_list_1');
category_check_scroll.addEventListener('scroll', function() {
    category_check_scroll_number_1 = checkScroll(category_check_scroll, category_check_scroll_number_1);
});

///////////////////카테고리 찾기 각 버튼별 함수//////////////////////////////////
var category_searching_img = document.querySelector('#category_searching > img');
var button1 = document.getElementById('button1');
var button2 = document.getElementById('button2');
var button3 = document.getElementById('button3');
var button4 = document.getElementById('button4');
button1click();
function button1click(){
    category_searching_img.src= 'category/1.png';

    document.getElementById('category_check_list_1').style.display = 'block';
    document.getElementById('category_check_list_2').style.display = 'none';
    document.getElementById('category_check_list_3').style.display = 'none';
    document.getElementById('category_check_list_4').style.display = 'none';

    button1.style.width = '46%';
    button2.style.width = '36%';
    button3.style.width = '36%';
    button4.style.width = '36%';
}
function button2click(){
    category_searching_img.src= 'category/2.png';

    document.getElementById('category_check_list_1').style.display = 'none';
    document.getElementById('category_check_list_2').style.display = 'block';
    document.getElementById('category_check_list_3').style.display = 'none';
    document.getElementById('category_check_list_4').style.display = 'none';

    button1.style.width = '36%';
    button2.style.width = '46%';
    button3.style.width = '36%';
    button4.style.width = '36%';
}
function button3click(){
    category_searching_img.src= 'category/3.png';

    document.getElementById('category_check_list_1').style.display = 'none';
    document.getElementById('category_check_list_2').style.display = 'none';
    document.getElementById('category_check_list_3').style.display = 'block';
    document.getElementById('category_check_list_4').style.display = 'none';

    button1.style.width = '36%';
    button2.style.width = '36%';
    button3.style.width = '46%';
    button4.style.width = '36%';
}
function button4click(){
    category_searching_img.src= 'category/4.png';

    document.getElementById('category_check_list_1').style.display = 'none';
    document.getElementById('category_check_list_2').style.display = 'none';
    document.getElementById('category_check_list_3').style.display = 'none';
    document.getElementById('category_check_list_4').style.display = 'block';

    button1.style.width = '36%';
    button2.style.width = '36%';
    button3.style.width = '36%';
    button4.style.width = '46%';
}
/////////////////////////////////////////////////////////////////

var images = document.querySelectorAll('.category_check_name > img');
images.forEach(img => {
    img.addEventListener('click', function() {
        // 현재 이미지의 src 속성 값을 확인하여 체크 여부를 판단합니다.
        if (img.src.includes('n_check.png')) {
            // 체크되지 않은 경우, src 속성 값을 'check.png'로 변경합니다.
            img.src = img.src.replace('n_check.png', 'check.png');
        } else {
            // 체크된 경우, src 속성 값을 'n_check.png'로 변경합니다.
            img.src = img.src.replace('check.png', 'n_check.png');
        }
    });
});





////////////////////////////광고 부분/////////////////////////////////////////////////////
var index = localStorage.getItem('adIndex_2') || 0;
var ADimg = document.querySelectorAll('#advertisement > img');

function slideAD() {
    localStorage.setItem('adIndex_2', index);
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

    ADimg[index].style.right = '0%';
    ADimg[left_index].style.right = '100%';
    ADimg[right_index].style.right = '-100%';

    ADimg[index].style.display = 'block';
    ADimg[left_index].style.display = 'block';
    ADimg[right_index].style.display = 'block';
    localStorage.setItem('adIndex_2', index);
}
function rightslide() {
    index = right_index;
    ad_number();
    calc_index();
    ADimg[index].style.zIndex = '2';
    ADimg[left_index].style.zIndex = '1';
    ADimg[right_index].style.zIndex = '0';
    trans();
}

function leftslide() {
    index = left_index;
    ad_number();
    calc_index();
    ADimg[index].style.zIndex = '2';
    ADimg[left_index].style.zIndex = '0';
    ADimg[right_index].style.zIndex = '1';
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