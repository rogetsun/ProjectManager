/**
 * Created by uv2sun on 15/4/10.
 * 将tpls/modal-cropper.html合并进来的uvCropper.js版本
 * 本指令基于ngCropper修改,但不需要依赖
 * 依赖jQuery，cropper.js，cropper.css, angular.js, bootstrap.css
 *
 * 直接使用指令uvCropperImg
 * 4个属性：
 *  imgUrl：最后生成的图片base64码
 *  imgRatio：图片横纵比, 不给则不限制横纵比
 *  imgMaxWidth：最后生成图片最大宽度
 *  imgCropper：最后生成截选图片后，调用的方法。
 *  initImgMaxWidth: 获取到图片后，直接缩放成这个宽度。
 */

angular.module('uvCropper', [])
    .directive('uvCropperImg', ['$timeout', '$q', 'uvCropperService', function ($timeout, $q, uvCropperService) {
        return {
            restrict: 'EA',
            scope: {
                imgUrl: '=',
                imgRatio: '@',
                imgMaxWidth: '@',
                imgCropper: '&',
                initImgMaxWidth: '@'
            },
            replace: true,
            transclude: true,
            template: '<div ng-click="show($event)" style="cursor:pointer;"><style>.cropper-preview {overflow: hidden;padding: 0;float: left;border-radius: 4px;margin: 0 4px 4px 0;border: 1px solid #eee;}</style><div ng-show="cropperShow" style="width: 980px;margin-left: -490px;margin-right: auto;position:fixed;top:1px;left:50%;z-index: 99999997;"><div class="panel panel-default" style="margin:10px auto;position: relative;z-index: 99999999;box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.4);border:none;"><div class="panel-body "><input type="file" class="btn btn-default" style="line-height: 14px;margin:0px 15px 10px;" onchange="angular.element(this).scope().selectFile(this)"><div ng-show="!!dataUrl" style="margin:14px;"><div class="well well-sm pull-left" style="width:600px;padding: 0;background-color: #000;"><div class="cropper-container" style="padding: 0;height:398px;" ng-show="dataUrl"><img id="_uv_cropper_img" ng-src="{{dataUrl}}"></div></div><div style="width: 300px;margin-left: 10px;" class="pull-left"><div ><div class="cropper-preview" style="width: 250px;height:250px;"></div></div><div ><div class="cropper-preview" style="width: 146px;height:146px;"></div><div class="pull-left"><div><div class="cropper-preview" style="width: 100px;height:100px;"></div></div><div class="cropper-preview" style="width: 41px;height:41px;"></div></div></div></div></div></div><div class="panel-footer text-right"><button class="btn btn-primary btn-sm" ng-click="ok($event)">确定</button><button class="btn btn-default btn-sm" ng-click="cancel($event)" style="margin-left: 10px;">取消</button></div></div><div style="position: fixed;top:0;left:0;width:100%;height:100%;background-color: rgba(2,2,2,0.5);z-index: 99999998;"></div></div><span ng-transclude style="cursor:pointer;margin-left: auto;margin-right: auto;position: relative;width:100%;height:100%;overflow: hidden;"></span></div>',
            link: function (scope, element, atts) {
                scope.cropperShow = false;
                var cropperImg = element.find('#_uv_cropper_img');
                scope.options = {
                    aspectRatio: 1,
                    preview: ".cropper-preview"
                };
                if (scope.imgRatio) scope.options.aspectRatio = scope.imgRatio;

                scope.selectFile = function (inputFileElement) {
                    scope.inputFileElement = inputFileElement;
                    scope.imgFile = inputFileElement.files[0];
                    uvCropperService.selectImgFile(scope.imgFile, cropperImg, scope.options, scope.initImgMaxWidth).then(function (du) {
                        scope.dataUrl = du;
                        console.log(du.substr(0, 200));
                    });
                    if (scope.initImgMaxWidth) {

                    }

                };
                scope.ok = function (e) {
                    if (scope.dataUrl) {
                        if (scope.imgMaxWidth) {
                            uvCropperService.getScaleCropperImgDataUrl(parseInt(scope.imgMaxWidth)).then(function (dataUrl) {
                                scope.imgUrl = dataUrl.split(',')[1];
                                $timeout(setScope);
                                return dataUrl;
                            })
                        } else {
                            //uvCropperService.getCropperImgDataUrl().then(function (dataUrl) {
                            //    scope.imgUrl = dataUrl.split(',')[1];
                            //    console.log(scope.imgUrl.length);
                            //});
                            uvCropperService.getScaleCropperImgDataUrl(400).then(function (dataUrl) {
                                scope.imgUrl = dataUrl.split(',')[1];
                                $timeout(setScope);
                                return dataUrl;
                            })
                        }
                    } else {
                        scope.cropperShow = false;
                        e.stopPropagation();
                    }
                };

                function setScope() {
                    scope.imgCropper && scope.imgCropper();
                    uvCropperService.hideCropperImg();
                    scope.cropperShow = false;
                    scope.dataUrl = "";
                    scope.inputFileElement.value = "";
                }

                scope.cancel = function (e) {
                    console.log(e);
                    e.stopPropagation();
                    console.log(scope.cropperShow);
                    scope.cropperShow = false;
                    console.log(scope.cropperShow);
                    uvCropperService.hideCropperImg();
                    scope.dataUrl = "";
                };

                scope.show = function (e) {
                    scope.cropperShow = true;
                };


            }
        }
    }])
    .service('uvCropperService', ['$timeout', '$q', '_Cropper', function ($timeout, $q, Cropper) {
        var shown = false;
        var _this = this;
        this.element = {rootElement: undefined, imgElement: undefined};
        var data, file, options;
        this.selectImgFile = function (imgFile, cropperImg, opts, initImgMaxWidth) {
            file = imgFile;
            _this.element.imgElement = cropperImg;
            options = opts;
            options.done = function (dataNew) {
                data = dataNew;
            };
            return (function(){

                if(!initImgMaxWidth){
                    var defer = $q.defer();
                    defer.resolve(file);
                    return defer.promise;
                }else{
                    return _this.scaleImg(imgFile, initImgMaxWidth);
                }

            })().then(Cropper.encode).then(function (dataUrl) {
                $timeout(_this.reCropperImg);  // wait for $digest to set image's src
                return dataUrl;
            });
        };

        this.scaleImg = function (imgFile, width) {
            return Cropper.scale(imgFile, {width:width}).then(function (blob) {
                file = blob;
                return blob;
            });
        };

        this.reCropperImg = function () {
            _this.hideCropperImg();
            _this.showCropperImg();
        };

        this.showCropperImg = function () {
            if (shown) return;
            shown = true;
            preprocess(options, _this.element.imgElement[0])
                .then(function (options) {
                    _this.element.imgElement.cropper(options);
                })
        };

        this.hideCropperImg = function () {
            if (!shown) return;
            shown = false;
            _this.element.imgElement.cropper('destroy');
        };

        this.disableCropper = function (disabled) {
            if (!shown) return;
            if (disabled) _this.element.imgElement.cropper('disable');
            if (!disabled) _this.element.imgElement.cropper('enable');
        };

        this.getCropperImgDataUrl = function () {
            return Cropper.crop(file, data).then(Cropper.encode).then(function (dataUrl) {
                return dataUrl;
            });
        };

        this.getScaleCropperImgDataUrl = function (maxWidth) {
            return Cropper.crop(file, data).then(function (blob) {
                return Cropper.scale(blob, {width: maxWidth});
            }).then(Cropper.encode).then(function (dataUrl) {
                return dataUrl;
            });
        };

        function preprocess(options, img) {
            console.log('preprocess begin');
            options = options || {};

            var defer = $q.defer();
            var toResolve = [passInitial(options)];

            if (options.maximize) toResolve.push(maximizeSelection(options, img));

            $q.all(toResolve).then(function (values) {
                var lastUpdatedOptions = values[values.length - 1];
                defer.resolve(lastUpdatedOptions);
            });
            console.log('preprocess end');
            return defer.promise;
        }

        /**
         * The only promise to resolve when no more processing promiseses passed.
         */
        function passInitial(options) {
            var defer = $q.defer();
            defer.resolve(options);
            return defer.promise;
        }

        /**
         * Change options to make selection maximum for the image.
         * fengyuanchen/cropper calculates valid selection's height & width
         * with respect to `aspectRatio`.
         */
        function maximizeSelection(options, img) {
            var defer = $q.defer();

            getRealSize(img).then(function (size) {
                options.data = size;
                defer.resolve(options);
            });

            return defer.promise;
        }

        /**
         * Returns real image size (without changes by css, attributes).
         */
        function getRealSize(img) {
            var defer = $q.defer();
            var size = {height: null, width: null};
            var image = new Image();

            image.onload = function () {
                defer.resolve({width: image.width, height: image.height});
            };

            image.src = img.src;
            return defer.promise;
        }
    }])
    .service('_Cropper', ['$q', function ($q) {

        this.encode = function (blob) {
            var defer = $q.defer();
            var reader = new FileReader();
            reader.onload = function (e) {
                defer.resolve(e.target.result);
            };
            reader.readAsDataURL(blob);
            return defer.promise;
        };

        this.decode = function (dataUrl) {
            var meta = dataUrl.split(';')[0];
            var type = meta.split(':')[1];
            var binary = atob(dataUrl.split(',')[1]);
            var array = new Uint8Array(binary.length);
            for (var i = 0; i < binary.length; i++) {
                array[i] = binary.charCodeAt(i);
            }
            return new Blob([array], {type: type});
        };

        this.crop = function (file, data) {
            var defer = $q.defer();
            var _decode = this.decode;

            this.encode(file).then(_createImage).then(function (image) {
                var canvas = createCanvas(data);
                var context = canvas.getContext('2d');

                context.drawImage(image, data.x, data.y, data.width, data.height, 0, 0, data.width, data.height);

                var encoded = canvas.toDataURL(file.type);
                var blob = _decode(encoded);

                defer.resolve(blob);
                removeElement(canvas);
            });

            return defer.promise;
        };

        this.scale = function (file, data) {
            var defer = $q.defer();
            var _decode = this.decode;

            this.encode(file).then(_createImage).then(function (image) {
                var heightOrig = image.height;
                var widthOrig = image.width;
                var ratio, height, width;

                if (angular.isNumber(data)) {
                    ratio = data;
                    height = heightOrig * ratio;
                    width = widthOrig * ratio;
                }

                if (angular.isObject(data)) {
                    ratio = widthOrig / heightOrig;
                    height = data.height;
                    width = data.width;

                    if (height && !width)
                        width = height * ratio;
                    else if (width && !height)
                        height = width / ratio;
                }

                var canvas = createCanvas(data);
                var context = canvas.getContext('2d');

                canvas.height = height;
                canvas.width = width;

                context.drawImage(image, 0, 0, widthOrig, heightOrig, 0, 0, width, height);

                var encoded = canvas.toDataURL(file.type);
                var blob = _decode(encoded);

                defer.resolve(blob);
                removeElement(canvas);
            });

            return defer.promise;
        };


        function _createImage(source) {
            var defer = $q.defer();
            var image = new Image();
            image.onload = function (e) {
                defer.resolve(e.target);
            };
            image.src = source;
            return defer.promise;
        }

        function createCanvas(data) {
            var canvas = document.createElement('canvas');
            canvas.width = data.width;
            canvas.height = data.height;
            canvas.style.display = 'none';
            document.body.appendChild(canvas);
            return canvas;
        }

        function removeElement(el) {
            el.parentElement.removeChild(el);
        }

    }]);