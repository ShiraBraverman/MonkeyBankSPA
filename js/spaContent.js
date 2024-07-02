const app = {
    pages: [],
    init: function () {
        app.pages = document.querySelectorAll('.contentPage');
        window.addEventListener('hashchange', app.nav);
        history.pushState({}, 'login', '#login');
        let openTemplate = document.querySelector(location.hash).content;
        const contentDiv = document.querySelector('#content');
        contentDiv.replaceChildren(openTemplate.cloneNode(true));
    },
    nav: function () {
        let hash = location.hash.replace('#', '');
        let openTemplate = document.querySelector(location.hash).content;
        const contentDiv = document.querySelector('#content');
        contentDiv.replaceChildren(openTemplate.cloneNode(true));
    }
};

document.addEventListener('DOMContentLoaded', app.init);