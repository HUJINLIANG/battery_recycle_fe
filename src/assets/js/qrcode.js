(function($) {
    var Qrcode = function(tempBtn) {
        var _this_ = this;
        var isWeiboWebView = /__weibo__/.test(navigator.userAgent);

        if (isWeiboWebView) {
            if (window.WeiboJSBridge) {
                _this_.bridgeReady(tempBtn);
            } else {
                document.addEventListener('WeiboJSBridgeReady', function() {
                    _this_.bridgeReady(tempBtn);
                });
            }
        } else {
            _this_.nativeReady(tempBtn);
        }
    };

    Qrcode.prototype = {
        nativeReady: function(tempBtn) {
            $('[node-type=jsbridge]',tempBtn).on('click',function(e){
                e.stopPropagation();
            });

            $(tempBtn).bind('click',function(e){
                $(this).find('input[node-type=jsbridge]').trigger('click');
            });

            $(tempBtn).bind('change', this.getImgFile);
        },
        bridgeReady: function(tempBtn) {
            $(tempBtn).bind('click', this.weiBoBridge);
        },
        weiBoBridge: function() {
            window.WeiboJSBridge.invoke('scanQRCode', null, function(params) {
                //得到扫码的结果
                $('.result-qrcode').append(params.result + '<br/>');
            });
        },
        getImgFile: function() {
            var _this_ = this;
            var inputDom = $(this).find('input[node-type=jsbridge]');
            var imgFile = inputDom[0].files;
            var oFile = imgFile[0];
            var oFReader = new FileReader();
            var rFilter = /^(?:image\/bmp|image\/cis\-cod|image\/gif|image\/ief|image\/jpeg|image\/jpeg|image\/jpeg|image\/pipeg|image\/png|image\/svg\+xml|image\/tiff|image\/x\-cmu\-raster|image\/x\-cmx|image\/x\-icon|image\/x\-portable\-anymap|image\/x\-portable\-bitmap|image\/x\-portable\-graymap|image\/x\-portable\-pixmap|image\/x\-rgb|image\/x\-xbitmap|image\/x\-xpixmap|image\/x\-xwindowdump)$/i;

            if (imgFile.length === 0) {
                return;
            }

            if (!rFilter.test(oFile.type)) {
                alert("选择正确的图片格式!");
                return;
            }

            oFReader.onload = function(oFREvent) {

                qrcode.decode(oFREvent.target.result);
                qrcode.callback = function(data) {
                    //得到扫码的结果
                    $('.result-qrcode').html(data);
                    $.ajax({
                        type: 'POST',
                        url: 'http://119.29.0.196:80/2018_recycle_mini_api/orderDetail/',
                        data: {
                            orderID: data,
                            cookie : $('.cookie').html().trim()
                        },
                        success: function (result) {
                            //操作电池内容dom
                            var score = 0;
                            for (let i = 0 ;i < result.data.length; i++) {
                                var num = result.data[i].batteryName[0];
                                if (isNaN(num)) {
                                    num = 8;
                                }
                                $('#battery' + num).html(result.data[i].batteryNum + '个');
                                switch (Number(num)){
                                    case 0:
                                        score += (50*result.data[i].batteryNum);
                                        break;
                                    case 1:
                                        score += (40*result.data[i].batteryNum);
                                        break;
                                    case 5:
                                        score += (20*result.data[i].batteryNum);
                                        break;
                                    case 7:
                                        score += (10*result.data[i].batteryNum);
                                        break;
                                    case 8:
                                        score += (10*result.data[i].batteryNum);
                                        break;
                                }

                            }
                            $('#score').html(score);
                            $('#myModal').modal({
                                backdrop:'static'
                            })
                        }
                    })

                };
            };

            oFReader.readAsDataURL(oFile);
        },
        destory: function() {
            $(tempBtn).off('click');
        }
    };

    Qrcode.init = function(tempBtn) {
        var _this_ = this;

        tempBtn.each(function() {
            new _this_($(this));
        });
    };
    window.Qrcode = Qrcode;
})(window.Zepto ? Zepto : jQuery);
