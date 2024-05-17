(function($) {
    $.fn.imageGallery = function(options) {
        var settings = $.extend({
            hoverEffect: 'scale',
            transitionDuration: '0.5s',
            pointColor: '#333',
            pointSize: '1px',
            pointSpacing: '8px',
            lineContrast: '500%',
            blendMode: 'screen',
            photoBrightness: '90%',
            photoContrast: '150%',
            itemFlex: '7',
            imageUrls: []
        }, options);

        return this.each(function() {
            var $gallery = $(this);
            $gallery.find('.item').each(function(index) {
                $(this).css({
                    'transition': 'flex ' + settings.transitionDuration + ' cubic-bezier(0.32, 0.79, 0.38, 0.99), filter ' + settings.transitionDuration + ' ease-in',
                    '--point-color': settings.pointColor,
                    '--point-size': settings.pointSize,
                    '--point-spacing': settings.pointSpacing,
                    '--line-contrast': settings.lineContrast,
                    '--blend-mode': settings.blendMode,
                    '--photo-brightness': settings.photoBrightness,
                    '--photo-contrast': settings.photoContrast,
                    '--item-flex': settings.itemFlex,
                    'background-image': 'url("' + settings.imageUrls[index] + '")',

                });

                switch (settings.hoverEffect) {
                    case 'scale':
                        $(this).hover(function() {
                            $(this).css('transition', 'transform 0.3s ease').css('transform', 'scale(1.05)');
                        }, function() {
                            $(this).css('transition', 'transform 0.3s ease').css('transform', 'scale(1)');
                        });
                        break;
                    case 'fade':
                        $(this).hover(function() {
                            $(this).stop().css('transition', 'opacity 1s ease').css('opacity', 0.5);
                        }, function() {
                            $(this).stop().css('transition', 'opacity 1s ease').css('opacity', 1); 
                        });
                        break;
                    case 'rotate':
                        $(this).hover(function() {
                            var randomRotation = Math.random() > 0.4 ? 4 : -4;
                            $(this).data('initialRotation', randomRotation);
                            $(this).css('transform', 'rotate(' + randomRotation + 'deg)');
                        }, function() {
                            var initialRotation = $(this).data('initialRotation');
                            if (initialRotation>0) {
                                initialRotation-=3;
                            }else{
                                initialRotation+=3;
                            }
                            $(this).css('transform', 'rotate(' + initialRotation + 'deg)');
                        });
                        break;              
                    case 'slide':
                        $(this).hover(function() {
                            $(this).stop().animate({
                                height: 'show',
                                opacity: 1
                            }, 500);
                        }, function() {
                            $(this).stop().animate({
                                height: 'show',
                                opacity: 0.5
                            }, 500);
                        });
                        break;
                }
            });
        });
    };
})(jQuery);
