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


///////////////////////////////////////////술 목록 태그 선택 기능////////////////////////
//한정판 술 저장 변수
var limited_mer = document.getElementById('limited_merchandise');

//메인 기능
var label_list = document.querySelectorAll('#label_list > label');
var setting_i = 1;

var save_label = parseInt(localStorage.getItem('label'));
var saveX = parseInt(localStorage.getItem('x'));
var saveY = parseInt(localStorage.getItem('y'));
if (!isNaN(save_label) && !isNaN(saveX) && !isNaN(saveY)){
    coloring(save_label, saveX, saveY);
}
else coloring(0, 0, 20);

label_list.forEach(function(label, i){
    label.addEventListener('click', function(){
        label_list.forEach(function(value){
            value.style.color = 'rgb(200, 200, 200)';
        });
        label.style.color = 'rgb(0, 195, 255)';
        var x, y;
        y = (i+1)*20;
        x = y-20;
        
        localStorage.setItem('label', i);
        localStorage.setItem('x', x);
        localStorage.setItem('y', y);
        
        coloring(i, x, y);

    });
});

var list = document.getElementById('list');
function coloring(i, x, y) {
    var label=label_list[i];

    if(i+1===4){
        limited_mer.innerHTML='<img src="image/limited_edition.jpg" alt="한정판 제품"> <div class="list_name">술링크 한정판</div>';
    }
    else {
        limited_mer.innerHTML='등록된 술이 없습니다<div class="list_name">~</div>';
    }

    label.style.color = 'rgb(0, 195, 255)';
    label.parentElement.style.borderImage = 'linear-gradient(to right, rgb(200, 200, 200) '+ x +'%, rgb(0, 195, 255) '+ x +'%,  rgb(0, 195, 255) '+ y +'%, rgb(200, 200, 200) '+ y + '%)';
    label.parentElement.style.borderImageSlice = 1;
}