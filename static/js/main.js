
document.addEventListener('DOMContentLoaded', () => {
    const desktop = document.getElementById('desktop');
    const windows = document.querySelectorAll('.window');
    let highestZ = 10; // Initial z-index based on CSS

    // 1. Set fixed window positions on load
    const initialPositions = [
        // Based on the screenshot layout.
        // Order in HTML: 0=title, 1=kaci, 2=sebi, 3=wiki
        { top: '5vh', left: '25vw', z: 1 },   // 0: title.txt (Top Center)
        { top: '35vh', left: '65vw', z: 4 },  // 1: kaci.gif (Right)
        { top: '35vh', left: '35vw', z: 3 },  // 2: sebi.gif (Middle)
        { top: '35vh', left: '5vw', z: 2 }    // 3: wiki.gif (Left)
    ];

    windows.forEach((win, index) => {
        if (initialPositions[index]) {
            win.style.top = initialPositions[index].top;
            win.style.left = initialPositions[index].left;
            win.style.zIndex = initialPositions[index].z;
        }
    });

    windows.forEach(win => {
        const titleBar = win.querySelector('.title-bar');
        let isDragging = false;
        let offsetX, offsetY;

        const bringToFront = () => {
            highestZ++;
            win.style.zIndex = highestZ;
        };
        
        // Bring to front on any click within the window
        win.addEventListener('mousedown', bringToFront);

        titleBar.addEventListener('mousedown', (e) => {
            isDragging = true;
            
            // Calculate offset from the top-left corner of the window
            offsetX = e.clientX - win.getBoundingClientRect().left;
            offsetY = e.clientY - win.getBoundingClientRect().top;

            // Prevent default drag behavior
            e.preventDefault();
        });

        document.addEventListener('mousemove', (e) => {
            if (isDragging) {
                let newX = e.clientX - offsetX;
                let newY = e.clientY - offsetY;

                // Constrain window to the desktop area
                const maxX = desktop.clientWidth - win.offsetWidth;
                const maxY = desktop.clientHeight - win.offsetHeight;

                if (newX < 0) newX = 0;
                if (newY < 0) newY = 0;
                if (newX > maxX) newX = maxX;
                if (newY > maxY) newY = maxY;

                win.style.left = `${newX}px`;
                win.style.top = `${newY}px`;
            }
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
        });
    });
});
