const $gallery = document.querySelector('#gallery');
const $popup = document.querySelector('#popup');

const images = ['photo1.jpg', 'photo2.jpg', 'photo3.jpg', 'photo4.jpg', 'photo5.jpg', 'photo6.jpg', 'photo7.jpg', 'photo8.jpg'];

function renderGallery() {
    if(images.length !== 0) {
        const imagesHtml = images.map(function(src, index) {
            return `<div class="thumb"><div class="zoom" data-img="${index}"></div><img src="img/${src}"></div>`
        }).join('');
        $gallery.insertAdjacentHTML('beforeend', imagesHtml);
    }
}

$gallery.addEventListener('click', function(e) {
    if( e.target.getAttribute('class') === 'zoom' ) {
        const img_id = Number(e.target.getAttribute('data-img'));
        $popup.textContent = '';
        $popup.style.display = 'flex';
        $popup.insertAdjacentHTML('beforeend', `
            <div id="img-prev"><img id="img-prev" width="50px" src="img/previous.svg"></div>
            <div id="zoom-img" data-img="${img_id}">
                <div id="close"><img id="close" width="30px" src="img/close.svg"></div>
                <img class="photo" src="img/${images[img_id]}">
            </div>
            <div id="img-next"><img id="img-next" width="50px" src="img/next.svg"> </div>
            <div id="popup-back" onClick="ClosePopup();"></div>
        `);
    }
});

$popup.addEventListener('click', function(e) {
    if(e.target.id === 'img-next') nextPhoto();
    if(e.target.id === 'img-prev') prevPhoto();
    if(e.target.id === 'close') ClosePopup();
});

document.addEventListener('keydown', function(e) {
    if($popup.style.display === 'flex') {
        if(e.key === 'Escape') ClosePopup();
        if(e.key === 'ArrowLeft') prevPhoto();
        if(e.key === 'ArrowRight') nextPhoto();
    }
});

function nextPhoto() {
    let img_id = Number($popup.querySelector('#zoom-img').getAttribute('data-img')) + 1;
    if(img_id == images.length) img_id = 0;
    $popup.querySelector('#zoom-img').setAttribute('data-img', img_id);
    $popup.querySelector('.photo').src = 'img/'+images[img_id];
}

function prevPhoto() {
    let img_id = Number($popup.querySelector('#zoom-img').getAttribute('data-img')) - 1;
    if(img_id == -1) img_id = images.length - 1;
    $popup.querySelector('#zoom-img').setAttribute('data-img', img_id);
    $popup.querySelector('.photo').src = 'img/'+images[img_id];
}

function ClosePopup() {
    $popup.style.display = 'none';
};

renderGallery();