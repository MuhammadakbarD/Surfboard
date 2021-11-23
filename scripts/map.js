(function () {

    let myMap;

    const init = () => {
        myMap = new ymaps.Map("map", {
            center: [55.746573, 37.606451],
            zoom: 15,
            controls: []
        });

        const coords = [
            [55.750486, 37.606759]
        ];

        const myCollection = new ymaps.GeoObjectCollection({}, {
            draggable: false,
            iconLayout: 'default#image',
            iconImageHref: "./img/logo.svg",
            iconImageSize: [46, 57],
            iconImageOffset: [-35, -52]
        });

        coords.forEach(coord => {
            myCollection.add(new ymaps.Placemark(coord));
        });

        myMap.geoObjects.add(myCollection);

        myMap.behaviors.disable('scrollZoom');
    }

    ymaps.ready(init);

}());