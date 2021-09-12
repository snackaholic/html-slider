class Slider {

    constructor() {
        this.activeSlideIndex = 0;
        this.numberOfSlides = document.querySelectorAll(".slide").length;
        this.slideWrapper = document.querySelectorAll(".slides")[0];
        // todo check how many slides
        // calc slide size
        this.addClickBindings();
    }

    addClickBindings() {
        // add click bindings to navigation
        const buttons = document.querySelectorAll(".navigationbutton");
        if (buttons.length > 0) {
            for (let i = 0; i < buttons.length; i++) {
                let button = buttons[i];
                button.addEventListener("click", this.handleClick.bind(this));
            }
        }
    }

    changeSlide(index) {
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