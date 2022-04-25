"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.TryExtensionLinkDialog=void 0;var _clsx=_interopRequireDefault(require("clsx"));var _hooks=require("preact/hooks");var _util=require("../util");var _version=require("../version");var _globeIconSvg=_interopRequireDefault(require("./icons/globe-icon-svg"));var _linkIconSvg=_interopRequireDefault(require("./icons/link-icon-svg"));var _lockIconSvg=_interopRequireDefault(require("./icons/lock-icon-svg"));var _QRLogo=_interopRequireDefault(require("./icons/QRLogo"));var _QRCode=require("./QRCode");var _Spinner=require("./Spinner");var _TryExtensionLinkDialogCss=_interopRequireDefault(require("./TryExtensionLinkDialog-css"));function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}const TryExtensionLinkDialog=props=>{const[isContainerHidden,setContainerHidden]=(0,_hooks.useState)(!props.isOpen);const[isDialogHidden,setDialogHidden]=(0,_hooks.useState)(!props.isOpen);(0,_hooks.useEffect)(()=>{const{isOpen}=props;const timers=[window.setTimeout(()=>{setDialogHidden(!isOpen);},10)];if(isOpen){setContainerHidden(false);}else{timers.push(window.setTimeout(()=>{setContainerHidden(true);},360));}return()=>{timers.forEach(window.clearTimeout);};},[props.isOpen]);return h("div",{class:(0,_clsx.default)("-cbwsdk-extension-dialog-container",isContainerHidden&&"-cbwsdk-extension-dialog-container-hidden")},h("style",null,_TryExtensionLinkDialogCss.default),h("div",{class:(0,_clsx.default)("-cbwsdk-extension-dialog-backdrop",isDialogHidden&&"-cbwsdk-extension-dialog-backdrop-hidden")}),h("div",{class:"-cbwsdk-extension-dialog"},h("div",{class:(0,_clsx.default)("-cbwsdk-extension-dialog-box",isDialogHidden&&"-cbwsdk-extension-dialog-box-hidden")},h(TryExtensionBox,{onInstallClick:()=>{window.open("https://api.wallet.coinbase.com/rpc/v2/desktop/chrome","_blank");}}),!props.connectDisabled?h(ScanQRBox,{darkMode:props.darkMode,version:props.version,sessionId:props.sessionId,sessionSecret:props.sessionSecret,linkAPIUrl:props.linkAPIUrl,isConnected:props.isConnected,isParentConnection:props.isParentConnection}):null,props.onCancel&&h(CancelButton,{onClick:props.onCancel}))));};exports.TryExtensionLinkDialog=TryExtensionLinkDialog;const TryExtensionBox=({onInstallClick})=>{const[isClicked,setIsClicked]=(0,_hooks.useState)(false);const clickHandler=(0,_hooks.useCallback)(()=>{if(isClicked){window.location.reload();}else{onInstallClick();setIsClicked(true);}},[onInstallClick,isClicked]);return h("div",{class:"-cbwsdk-extension-dialog-box-top"},h("div",{class:"-cbwsdk-extension-dialog-box-top-install-region"},h("h2",null,"Try the Coinbase Wallet extension"),isClicked&&h("div",{class:"-cbwsdk-extension-dialog-box-top-subtext"},"After installing Coinbase Wallet, refresh the page and connect again."),h("button",{type:"button",onClick:clickHandler},isClicked?"Refresh":"Install")),h("div",{class:"-cbwsdk-extension-dialog-box-top-info-region"},h(DescriptionItem,{icon:_linkIconSvg.default,text:"Connect to crypto apps with one click"}),h(DescriptionItem,{icon:_lockIconSvg.default,text:"Your private key is stored securely"}),h(DescriptionItem,{icon:_globeIconSvg.default,text:"Works with Ethereum, Polygon, and more"})));};const ScanQRBox=props=>{const qrUrl=(0,_util.createQrUrl)(props.sessionId,props.sessionSecret,props.linkAPIUrl,props.isParentConnection);return h("div",{class:"-cbwsdk-extension-dialog-box-bottom"},h("div",{class:"-cbwsdk-extension-dialog-box-bottom-description-region"},h("h2",null,"Or scan to connect"),h("body",{class:"-cbwsdk-extension-dialog-box-bottom-description"},"Open"," ",h("a",{href:"https://wallet.coinbase.com/",target:"_blank",rel:"noopener noreferrer"},"Coinbase Wallet")," ","on your mobile phone and scan")),h("div",{class:"-cbwsdk-extension-dialog-box-bottom-qr-region"},h("div",{class:"-cbwsdk-extension-dialog-box-bottom-qr-wrapper"},h(_QRCode.QRCode,{content:qrUrl,width:150,height:150,fgColor:"#000",bgColor:"transparent",image:{svg:_QRLogo.default,width:34,height:34}})),h("input",{type:"hidden",name:"cbwsdk-version",value:_version.LIB_VERSION}),h("input",{type:"hidden",value:qrUrl}),!props.isConnected&&h("div",{class:"-cbwsdk-extension-dialog-box-bottom-qr-connecting"},h(_Spinner.Spinner,{size:36,color:"#000"}),h("p",null,"Connecting..."))));};const DescriptionItem=props=>{return h("div",{class:"-cbwsdk-extension-dialog-box-top-description"},h("div",{class:"-cbwsdk-extension-dialog-box-top-description-icon-wrapper"},h("img",{src:props.icon})),h("body",{class:"-cbwsdk-extension-dialog-box-top-description-text"},props.text));};const CancelButton=props=>h("button",{type:"button",class:"-cbwsdk-extension-dialog-box-cancel",onClick:props.onClick},h("div",{class:"-cbwsdk-extension-dialog-box-cancel-x"}));