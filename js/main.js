(function () {
    'use strict';
    $(document).ready(function () {
        $('body').fadeIn(750);
        $('#year').text(new Date().getFullYear());
    });
})();
