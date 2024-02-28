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

var eventlist_number = 'up';
var eventlist = document.getElementById('event_list');
eventlist.addEventListener('scroll', function() {
    eventlist_number = checkScroll(eventlist, eventlist_number);
});
