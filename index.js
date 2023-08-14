// listen for the DOMContentLoaded event, then call init()
window.addEventListener('DOMContentLoaded', init);

const dropdown = document.getElementById('Language');
const toggleButton = document.getElementById('toggle-button');
const emailIcon = document.getElementById("email-icon");
const introTitle = document.querySelector('.intro-title');


emailIcon.addEventListener("click", function() {
    const emailAddress = "nickho.lv@gmail.com";
    const subject = "Subject Here";
    const body = "Your email body here";
    const mailtoLink = `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
});

var modal = document.getElementById("modal");

// Get the resume icon
var resumeIcon = document.getElementById("resume");

// Get the <span> element that closes the modal
var closeBtn = document.getElementsByClassName("close")[0];

// When the resume icon is clicked, open the modal and display the image
resumeIcon.onclick = function() {
    modal.style.display = "block";
    var modalImage = document.getElementById("modal-image");
    modalImage.src = "/assets/pics/resume.png"; // Replace with your image URL
};

// When the user clicks on <span> (x), close the modal
closeBtn.onclick = function() {
    modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
};

window.addEventListener('resize', function() {
    if (this.localStorage.getItem('language') == 'English'){
        if (window.innerWidth <= 780) {
            introTitle.style.fontSize = '3.5rem';
        } else {
            introTitle.style.fontSize = '100px';
        }
    }
    else if (this.localStorage.getItem('language') == 'Español'){
        if (window.innerWidth <= 780) {
            introTitle.style.fontSize = '2.5rem';
        }
        else if (window.innerWidth <= 1000) {
            introTitle.style.fontSize = '4rem';
        } else {
            introTitle.style.fontSize = '80px';
        }
    }
    else {
        if (window.innerWidth <= 950) {
            introTitle.style.fontSize = '2.5rem';
        } else {
            introTitle.style.fontSize = '80px';
        }
    }
});


/**
 * clears local storage of FutureNowState item and creates a new states for future
 */
async function init() {
    localStorage.setItem('mode', 1);
    try {
        console.log(localStorage.getItem('mode'))
        dropdown.addEventListener('change', (event) => {
            const selectedValue = dropdown.value;
            localStorage.setItem('language', selectedValue);
            if (selectedValue == 'Español') {
                let linkElement = document.getElementById('Student Aide');
                linkElement.textContent = 'Ayuda Estudiantil';
                linkElement = document.getElementById('Autonomous Driving');
                linkElement.textContent = 'Conducción autónoma';
                linkElement = document.getElementById('Tarot');
                linkElement.textContent = 'Cartas de Tarot';
                linkElement = document.getElementById('title');
                linkElement.textContent = 'Hola, me llamo Nick!';
                const introTitle = document.querySelector('.intro-title');
                if (window.innerWidth <= 780) {
                    introTitle.style.fontSize = '2.5rem';
                } else {
                    introTitle.style.fontSize = '80px';
                }
                
            } else if (selectedValue == '中文'){
                let linkElement = document.getElementById('Student Aide');
                linkElement.textContent = '学生帮助';
                linkElement = document.getElementById('Autonomous Driving');
                linkElement.textContent = '自动驾驶汽车';
                linkElement = document.getElementById('Tarot');
                linkElement.textContent = '塔罗牌';
                linkElement = document.getElementById('title');
                linkElement.textContent = '你好，我的名字是何微琦!';
                const introTitle = document.querySelector('.intro-title');
                if (window.innerWidth <= 780) {
                    introTitle.style.fontSize = '2.5rem';
                } else {
                    introTitle.style.fontSize = '80px';
                } 
                
            } else {
                let linkElement = document.getElementById('Student Aide');
                linkElement.textContent = 'Student Aide';
                linkElement = document.getElementById('Autonomous Driving');
                linkElement.textContent = 'Autonomous Driving';
                linkElement = document.getElementById('Tarot');
                linkElement.textContent = 'Tarot Cards';
                linkElement = document.getElementById('title');
                linkElement.textContent = "Hi, I'm Nick!";
                const introTitle = document.querySelector('.intro-title');
                if (window.innerWidth <= 780) {
                    introTitle.style.fontSize = '3.5rem';
                } else {
                    introTitle.style.fontSize = '100px';
                }
            }
        });
        
        toggleButton.addEventListener('click', (event) => {
            if(localStorage.getItem('mode') % 2 == 1){
                const indexNavbar = document.querySelector('.index-navbar');
                document.body.style.backgroundImage = 'url(assets/pics/background.jpeg)'
                indexNavbar.style.backgroundColor = 'white';
                const menuButton = document.querySelector('.index-menu-button');
                menuButton.style.backgroundColor = 'white';
                const svgElement = document.querySelector('.index-menu-button svg');
                svgElement.querySelector('path').setAttribute('fill', '#383838');
                const links = indexNavbar.querySelectorAll('a');
                links.forEach(link => {
                    link.style.color = '#383838';
                });
                const svgElements = document.querySelectorAll(".button-bar svg");
                svgElements.forEach(svg => {
                    const paths = svg.querySelectorAll("path");
                    paths.forEach(path => {
                        path.setAttribute("fill", "white");
                    });
                });
            }
            else {
                const indexNavbar = document.querySelector('.index-navbar');
                document.body.style.backgroundImage = 'url(assets/pics/night.jpg)';
                indexNavbar.style.backgroundColor = '#383838';
                const menuButton = document.querySelector('.index-menu-button');
                menuButton.style.backgroundColor = '#383838';
                const svgElement = document.querySelector('.index-menu-button svg');
                svgElement.querySelector('path').setAttribute('fill', 'white');
                const links = indexNavbar.querySelectorAll('a');
                links.forEach(link => {
                    link.style.color = 'white';
                });
                const svgElements = document.querySelectorAll(".button-bar svg");
                svgElements.forEach(svg => {
                    const paths = svg.querySelectorAll("path");
                    paths.forEach(path => {
                        path.setAttribute("fill", "black");
                    });
                });
            }
            localStorage.setItem('mode', parseInt(localStorage.getItem('mode'))+1)
            console.log(localStorage.getItem('mode'))
        });

        localStorage.setItem('language', 'English');
    } catch (error) {
        console.error('An error occurred while initializing:', error);
    }
}

