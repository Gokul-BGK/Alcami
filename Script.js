function faqAnsExpandOnClick(event, isExpand){
    document.querySelectorAll('.grp-13-faq-list-item.expanded').forEach(element => {
        element.classList.remove("expanded");
    });
    if(isExpand) event.currentTarget.closest('.grp-13-faq-list-item').classList.toggle('expanded');
}





function animateCounter(counter) {
    const target = +counter.getAttribute('data-target');
    const increment = target / 100;
    let current = 0;
    const updateCounter = () => {
        if (current < target) {
            current += increment;
            counter.innerText = Math.ceil(current) + "%";
            requestAnimationFrame(updateCounter);
        } else {
            counter.innerText = target + "%";
        }
    };
    updateCounter();
}

function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    const elementCenter = (rect.top + rect.bottom) / 2;
    const viewportCenter = window.innerHeight / 2;
    return Math.abs(elementCenter - viewportCenter) < 50;
    // return rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight);
}

function handleScroll() {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        if (isInViewport(counter) && !counter.classList.contains('animated')) {
            counter.classList.add('animated');
            animateCounter(counter);
        }
    });
}


// handle feedback review list as per pages
function handleFeedbacksPages() {
    const slides = document.querySelector('.group-12 .grp-12-feedback-container-inner');
    const prevBtn = document.querySelector('.group-12 .grp-12-arrow-prev');
    const nextBtn = document.querySelector('.group-12 .grp-12-arrow-next');

    const slidesPerPage = 3;
    let totalSlides = document.querySelectorAll('.group-12 .grp-12-feedback-list-item').length;

    // Duplicate slides if total slides are less than the required
    if (totalSlides === 3) {
        for (let i = 0; i < 9; i++) {
            slides.appendChild(document.querySelector('.group-12 .grp-12-feedback-list-item').cloneNode(true));
        }
        totalSlides = 12;
    }

    const slideWidth = document.querySelector('.group-12 .grp-12-feedback-list-item').offsetWidth + 25;
    const maxScrollLeft = (Math.ceil(totalSlides / slidesPerPage) - 1) * slidesPerPage * slideWidth;
    let currentScroll = 0;

    function updateButtons() {
        prevBtn.classList.toggle('disabled', currentScroll === 0);
        nextBtn.classList.toggle('disabled', currentScroll >= maxScrollLeft);
    }

    function updateDots() {
        const currentIndex = Math.round(currentScroll / (slideWidth * slidesPerPage));
        document.querySelectorAll(".group-12 .grp-12-fb-slide-dot").forEach((dot, index) => {
            dot.classList.toggle("active", index === currentIndex);
        });
    }

    // function scrollToIndex(index) {
    //     currentScroll = index * slidesPerPage * slideWidth;
    //     slides.scrollTo({ left: currentScroll, behavior: 'smooth', });
    // }

    prevBtn.addEventListener('click', () => {
        if (currentScroll > 0) {
            currentScroll -= slideWidth * slidesPerPage;
            slides.scrollTo({ left: currentScroll, behavior: 'smooth', });
            updateButtons();
            updateDots();
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentScroll < maxScrollLeft) {
            currentScroll += slideWidth * slidesPerPage;
            slides.scrollTo({ left: currentScroll, behavior: 'smooth', });
            updateButtons();
            updateDots();
        }
    });

    slides.addEventListener('scroll', () => {
        currentScroll = slides.scrollLeft;
        updateButtons();
        updateDots();
    });

    updateButtons();
    updateDots();
}



function updateCartLink() {
    const flavorRadios = document.querySelectorAll("input[name='flavor']");
    const purchaseTypeRadios = document.querySelectorAll("input[name='purchaseType']");

    const selectedFlavor = document.querySelector("input[name='flavor']:checked")?.value;
    const selectedPurchaseType = document.querySelector("input[name='purchaseType']:checked")?.value;
    const selectedPurchasePrice = document.querySelector("input[name='purchaseType']:checked")?.dataset.price;

    let href = "";
    if (selectedFlavor && selectedPurchaseType) {
        const link = `${location.origin}${location.pathname}?productId=productId&flavor=${selectedFlavor}&purchaseType=${selectedPurchaseType}&price=%24${selectedPurchasePrice}`;
        href = link;
    } 
    else {
        href = "#"; 
    }
    window.open(href, '_blank');
}


function updateFlavor(event, flavor){
    try{
        const flavorOptions = document.querySelectorAll(".grp-5-flavor-option");
        flavorOptions.forEach(option => {
            option.classList.remove("selected");
        });
        document.querySelector(`.grp-5-flavor-option.${flavor}`).classList.add("selected");
        // update cart image and select radio
        const selectedRadio = event.currentTarget.querySelector(`input[name='flavor'][value='${flavor}']`);
        if (selectedRadio) {
            const selectedProImageSrc = event.currentTarget.querySelector(".grp-5-flavor-opt-img-box").querySelector("img").src;
            selectedRadio.checked = true;
            document.querySelector(".grp-5-mid-right-sec3-incl-imgs1-1 img").src = selectedProImageSrc;
        }
    }
    catch(err){
        console.log(err);
    }
}



const thumbnails = document.querySelectorAll(".grp-5-mid-lbot-img");
const previewImage = document.querySelector(".grp-5-mid-ltop-main-img");
let currentThumbnailPreIndex = 0;
// previewImage.src = thumbnails[currentThumbnailPreIndex].querySelector("img").src;

function showPreviewFromElement(element) {
    const src = element.querySelector("img").src;
    updateThumbnailsToInMainShow(src);
    currentThumbnailPreIndex = Array.from(thumbnails).indexOf(element); 
}

function navigateThumbnailsToShow(direction) {
    currentThumbnailPreIndex += direction;
    if (currentThumbnailPreIndex < 0) {
        currentThumbnailPreIndex = thumbnails.length - 1;
    } else if (currentThumbnailPreIndex >= thumbnails.length) {
        currentThumbnailPreIndex = 0;
    }
    updateThumbnailsToInMainShow(thumbnails[currentThumbnailPreIndex].src);
}

function updateThumbnailsToInMainShow(src){
    previewImage.classList.add("fade-out");
    setTimeout(() => {
        previewImage.src = src;
        previewImage.classList.remove("fade-out");
        previewImage.classList.add("fade-in");
        setTimeout(() => {
            previewImage.classList.remove("fade-in");
        }, 500);
    }, 500);

}


window.addEventListener('DOMContentLoaded', () => {
    handleScroll();
    handleFeedbacksPages();
    window.addEventListener('scroll', handleScroll);
});
