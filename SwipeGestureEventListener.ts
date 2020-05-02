/*jshint esversion: 7*/

export default function addSwipeEventListener(element: any, up: VoidFunction, down: VoidFunction, left: VoidFunction, right: VoidFunction, tap: VoidFunction) {
    let pageWidth = window.innerWidth || document.body.clientWidth;
    let treshold = Math.max(1, Math.floor(0.01 * (pageWidth)));
    let touchstartX = 0;
    let touchstartY = 0;
    let touchendX = 0;
    let touchendY = 0;

    const limit = Math.tan(45 * 1.5 / 180 * Math.PI);
    const gestureZone = element;

    gestureZone.addEventListener('touchstart', (e: TouchEvent) => {
        e.preventDefault();
        touchstartX = e.changedTouches[0].screenX;
        touchstartY = e.changedTouches[0].screenY;
    }, false);

    gestureZone.addEventListener('touchend', (e: TouchEvent) => {
        e.preventDefault();
        touchendX = e.changedTouches[0].screenX;
        touchendY = e.changedTouches[0].screenY;
        handleGesture(e);
    }, false);

    let handleGesture = (e: Event) => {
        let x = touchendX - touchstartX;
        let y = touchendY - touchstartY;
        let xy = Math.abs(x / y);
        let yx = Math.abs(y / x);
        if (Math.abs(x) > treshold || Math.abs(y) > treshold) {
            if (yx <= limit) {
                if (x < 0) left();
                else right();
            } else if (xy <= limit) {
                if (y < 0) up();
                else down();
            }
        } else {
            tap();
        }
    }
}