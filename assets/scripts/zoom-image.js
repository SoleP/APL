
;(function($) {
    /**
     * 1, Thumbnails are the same size as the parent container
            Mask width

     * 2, Parent container href Properties for HD image path
     */
    $.fn.zoomImage = function(paras) {
        /**
         *  Default parameters
         */
        var defaultParas = {
            layerW: 100, // Mask width
            layerH: 100, // high level of shading
            layerOpacity: 0.2, // Mask transparency
            layerBgc: '#000', // Mask background colour
            showPanelW: 500, // Display of enlarged area width
            showPanelH: 500, // Display zoom area high
            marginL: 5, // Distance from the zoom area to the right of the thumbnail
            marginT: 0 // Distance of the zoom area from the top side of the thumbnail
        };

        paras = $.extend({}, defaultParas, paras);

        $(this).each(function() {
            var self = $(this).css({position: 'relative'});
            var selfOffset = self.offset();
            var imageW = self.width(); // Image height
            var imageH = self.height();

            self.find('img').css({
                width: '100%',
                height: '100%'
            });

            // Wide margnification
            var wTimes = paras.showPanelW / paras.layerW;
            // High magnification
            var hTimes = paras.showPanelH / paras.layerH;

            // Enlarge image
            var img = $('<img>').attr('src', self.attr("href")).css({
                position: 'absolute',
                right: '0',
                top: '0',
                width: imageW * wTimes,
                height: imageH * hTimes
            }).attr('id', 'big-img');

            // Masking
            var layer = $('<div>').css({
                display: 'none',
                position: 'absolute',
                right: '0',
                top: '0',
                backgroundColor: paras.layerBgc,
                width: paras.layerW,
                height: paras.layerH,
                opacity: paras.layerOpacity,
                border: '1px solid #ccc',
                cursor: 'crosshair'
            });

            // Enlarge area
            var showPanel = $('<div>').css({
                display: 'none',
                position: 'absolute',
                overflow: 'hidden',
                right: imageW + paras.marginL,
                top: paras.marginT,
                width: paras.showPanelW,
                height: paras.showPanelH
            }).append(img);

            self.append(layer).append(showPanel);

            self.on('mousemove', function(e) {
                // Coordinates of the mouse relative to the thumbnail container
                var x = e.pageX - selfOffset.left;
                var y = e.pageY - selfOffset.top;

                if(x <= paras.layerW / 2) {
                    x = 0;
                }else if(x >= imageW - paras.layerW / 2) {
                    x = imageW - paras.layerW;
                }else {
                    x = x - paras.layerW / 2;
                }

                if(y < paras.layerH / 2) {
                    y = 0;
                } else if(y >= imageH - paras.layerH / 2) {
                    y = imageH - paras.layerH;
                } else {
                    y = y - paras.layerH / 2;
                }

                layer.css({
                    left: x,
                    top: y
                });

                img.css({
                    left: -x * wTimes,
                    top: -y * hTimes
                });
            }).on('mouseenter', function() {
                layer.show();
                showPanel.show();
            }).on('mouseleave', function() {
                layer.hide();
                showPanel.hide();
            });
        });
    }
})(jQuery);
