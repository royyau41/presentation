var args = arguments[0] || {};


$.nePropTmpl1Wrap.estate=args.estateno;
$.nePropTmpl1Image.estate=args.estateno;
$.nePropTmpl1Bld.estate=args.estateno;
$.space.estate=args.estateno;
if (args.attachment){
$.nePropTmpl1Image.image=Ti.Utils.base64decode(args.attachment);
}

$.nePropTmpl1Bld.text = args.chinesename || '';
