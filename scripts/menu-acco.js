        const calculateWidth = () => {
        const windowWidth = window.innerWidth;

        const MAX_WIDTH_OPEN_MENU = 524;
        const linksWidth = links[0].offsetWidth;
        const reqWidth = windowWidth - (linksWidth * links.length);

        return reqWidth > MAX_WIDTH_OPEN_MENU ? MAX_WIDTH_OPEN_MENU : reqWidth;
    }

    const links = document.querySelectorAll(".menu-acco__trigger");
    const body = document.querySelector('body');

    function closeItem(activeElement) {
        const activeText = activeElement.querySelector(".menu-acco__content");
        activeText.style.width = "0px";
        activeElement.classList.remove("active");
    };

    links.forEach(function (elem) {
        elem.addEventListener("click", function(e){
            e.preventDefault();
            
            const link = e.target.closest(".menu-acco__trigger");

            const active = document.querySelector(".menu-acco__item.active");

            if(active) { 
                closeItem(active);
            }

            if(!active || active.querySelector(".menu-acco__trigger") !== link) {
                const current = link.closest(".menu-acco__item");
                current.classList.add("active");
                const currentText = current.querySelector(".menu-acco__content");

                if (body.offsetWidth > 480) {
                    currentText.style.width = calculateWidth() + 'px';
                } else {
                    currentText.style.width = '100%';
                }
            }
        });
    });

    /*document.addEventListener('click', e => {
        e.preventDefault();
        let activePerson = document.querySelector(".menu-acco__item.active");
        const target = e.target;

        if (!target.closest(".menu-acco") && activePerson) {
            closeItem(activePerson);
        }
        if (target.closest('.close-btn') && activePerson) {
            closeItem(activePerson);
        }
    });*/

    const closeButton = document.querySelector('.close-btn-icon');


    closeButton.addEventListener('click', e => {
        const activePerson = document.querySelector(".menu-acco__item.active");
        
        closeItem(activePerson);
    })
/* JQuery Variant
const measureWidth = item => {
    let reqItemWidth = 0;
    const screenWidth = $(window).width();
    const container = item.closest(".products-menu");
    const titleBlocks = container.find(".products-menu__title");
    const titlesWidth = titleBlocks.width() * titleBlocks.length;

    const textContainer = item.find(".products-menu__container");
    const paddingLeft = parseInt(textContainer.css("padding-left"));
    const paddingright = parseInt(textContainer.css("padding-right"));

    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    if (isMobile) {
        reqItemWidth = screenWidth - titlesWidth;
    } else {
        reqItemWidth = 500;
    }

    return {
        container: reqItemWidth,
        textContainer: reqItemWidth - paddingright - paddingLeft
    }
};

const closeEveryItemInContainer = container => {
    const items = container.find(".products-menu__item");
    const content = container.find(".products-menu__content");

    items.removeClass("active");
    content.width(0);
}

const openItem = item => {
    const hiddenItem = item.find(".products-menu__content");
    const reqWidth = measureWidth(item);
    const textBlock = item.find(".products-menu__container")

    item.addClass("active");
    hiddenItem.width(reqWidth.container);
    textBlock.width(reqWidth.textContainer);
}

$(".products-menu__title").on('click', e => {
    e.preventDefault();

    const $this = $(e.currentTarget);
    const item = $this.closest(".products-menu__item");
    const itemOpened = item.hasClass("active");
    const container = $this.closest(".products-menu");

    if (itemOpened) {
        closeEveryItemInContainer(container);
    } else {
        closeEveryItemInContainer(container);
        openItem(item);
    }

});

$(".products-menu__close").on('click', e => {
    e.preventDefault();

    closeEveryItemInContainer($('.products-menu'));
});*/