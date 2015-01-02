var args = arguments[0] || {};


$.newdevTmpl1Wrap.number=args.number;
$.newdevTmpl1Image.number=args.number;
$.newdevTmpl1Bld.number=args.number;
$.space.number=args.number;
if (args.attachment){
$.newdevTmpl1Image.image=Ti.Utils.base64decode(args.attachment);
}

$.newdevTmpl1Bld.text = args.chinesename || '';
