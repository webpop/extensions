# This generates markup for https://github.com/scottjehl/picturefill
# Feel free to customize the markup to suit your needs

markupForImage = (image, options) ->
  resize = options.resize
  width = options.width
  height = options.height

  output =
    '<div data-picture data-alt="' + image.alt + '">' +

    '<div data-src="' + image.src({ resize: resize, width: width, height: height }) + '"> </div>' +
    '<div data-src="' + image.src({ resize: resize, width: width*2, height: height*2 }) + '" data-media="(min-device-pixel-ratio: 2.0)"> </div>' +

    '<div data-src="' + image.src({ resize: resize, width: width*2, height: height*2 }) + '" data-media="(min-width: 768px)"> </div>' +
    '<div data-src="' + image.src({ resize: resize, width: width*4, height: height*4 }) + '" data-media="(min-width: 768px) and (min-device-pixel-ratio: 2.0)"> </div>' +

    '</div>'+

    '<noscript>' +
      '<img src="' + image.src({ resize: resize, width: width*2, height: height*2 }) + '" alt="' + image.alt + '" >' +
    '</noscript>'


exports.responsive = (options, enclosed, scope) ->
  obj = scope.lookup(options.field)

  # Check if it's a gallery
  if obj.images
    {html: markupForImage(image, options)} for image in obj.images
  else
    {html: markupForImage(obj, options)}
