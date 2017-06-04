(function($){

    var $titles = $('.article h2, .article h3');
    var offsets = $titles.map(function(index) {
        return $($titles[index]).offset().top - parseInt($($titles[index]).css('margin-top'));
    })
    var $tocs = $('.nav-link');

    var currentActiveToc;

    $(document).on('scroll', function(e) {
        e = e || window.event;
        var scrollTop = $(document).scrollTop();
        var resultIndex;

        if (scrollTop == 0 && ($('body').outerHeight() - $titles.eq(0).offset().top >= 0)) {
            resultIndex = 0;
        } else {
            for (var i = 1; i < offsets.length; i++) {
                var nextTitleOffset = offsets[i];
                var lastTitleOffset = offsets[i - 1];

                if (scrollTop >= lastTitleOffset && scrollTop < nextTitleOffset) {
                    resultIndex = i - 1;
                    break;
                } else if ((i == offsets.length - 1) && (scrollTop >= nextTitleOffset)) {
                    resultIndex = i;
                    break;
                }
            }
        }

        if (resultIndex !== undefined) {
            var id = $titles.eq(resultIndex).attr('id');
            var targetToc = $('.post-toc-content').find('.nav-link[href="#' + id + '"]');
            $('.nav-link').removeClass('active');
            targetToc && targetToc.addClass('active');
        }
    })

})(jQuery);
