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

