class Slider {

    constructor() {
        this.activeSlideIndex = 0;
        this.numberOfSlides = document.querySelectorAll(".slide").length;
        this.slideWrapper = document.querySelectorAll(".slides")[0];
        this.images = document.querySelectorAll(".slide-background-image");
        // todo check how many slides
        // calc slide size
        this.addClickBindings();
        // will hide all other images initially
        this.changeActiveImage(0, 0);
    }

    addClickBindings() {
        // add click bindings to navigation
        const buttons = document.querySelectorAll(".navigation-button");
        if (buttons.length > 0) {
            for (let i = 0; i < buttons.length; i++) {
                let button = buttons[i];
                button.addEventListener("click", this.handleClick.bind(this));
            }
        }
    }

    changeSlide(index) {
        const currentIndex = this.activeSlideIndex;
        if (index + 1 > this.numberOfSlides || index < 0) {
            if (index < 0) {
                index = this.numberOfSlides - 1;
            } else {
                index = 0;
            }
        }
        const target = index * 100 + "vw";
        this.slideWrapper.style.transform = "translateX(-" + target + ")";
        this.activeSlideIndex = index;
        this.changeActiveImage(currentIndex, index);
    }

    changeActiveImage(currentlyActiveIndex, nextActiveIndex) {
        for (let i = 0; i < this.images.length; i++) {
            if (i === currentlyActiveIndex && currentlyActiveIndex != nextActiveIndex) {
                // make it visible
                this.images[i].style.display = "block";
                // make it fade out
                this.images[i].style.opacity = "0";
                // make it pop into user face during so
                this.images[i].style.transform = "scale(1.3)";
            }
            if (i === nextActiveIndex) {
                // fade it in
                this.images[i].style.opacity = "0.75";
                this.images[i].style.transform = "scale(1)";
                this.images[i].style.display = "block";
            }
            if (i != currentlyActiveIndex && i != nextActiveIndex) {
                this.images[i].style.opacity = "0";
                this.images[i].style.transform = "scale(1)";
                this.images[i].style.display = "none";
                this.images[i].style.transform = "none";
            }

        }
    }

    handleClick(event) {
        const eventTarget = event.target;
        // default behavior: increment by one
        let targetIndex = this.activeSlideIndex + 1;
        if (eventTarget.dataset.index != undefined) {
            targetIndex = parseInt(eventTarget.dataset.index);
        }
        if (eventTarget.dataset.direction != undefined) {
            let dir = eventTarget.dataset.direction;
            if (dir === "left") {
                targetIndex = this.activeSlideIndex - 1;
            } else {
                targetIndex = this.activeSlideIndex + 1;
            }
        }
        this.changeSlide(targetIndex);
    }
}

window.addEventListener("load", function () {
    const slider = new Slider();
});