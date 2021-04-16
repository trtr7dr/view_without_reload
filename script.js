class HistoryLink {
    constructor() {
    }
    get_page(url) {
        $.ajax({
            headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
            url: url,
            type: "POST",
            dataType: "json",
            data: {},
            success: function (data) {
                window.scrollTo(0, 0);
                $('#data').html(data.html);
                $('#title').html(data.meta.title);
                $('#description').attr('content', data.meta.description);
                $('#keywords').attr('keywords', data.meta.keywords);
                $('#data').css('opacity', 1);
                now_href();
                tab_links(url);
            }
        });
    }
}
;

var hlink = new HistoryLink();
$(document).on("click", "a", function (e) {
    if (this.toString().indexOf(window.location.origin) !== -1 && this.getAttribute('download') === null) {
        e.preventDefault();
        $('#data').css('opacity', 0);
        let url = this.toString().replace(window.location.origin, '');
        window.history.pushState('', '', url);
        hlink.get_page(url);
    }
});

window.onpopstate = function (event) {
    if (window.location.href.indexOf(window.location.origin) !== -1) {
        $('#data').css('opacity', 0);
        let url = window.location.href.replace(window.location.origin, '');
        window.history.pushState('', '', url);
        hlink.get_page(url);
    }
};
