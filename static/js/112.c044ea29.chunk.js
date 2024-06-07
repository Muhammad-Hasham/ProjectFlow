"use strict";(self.webpackChunki_200760_s_application_2=self.webpackChunki_200760_s_application_2||[]).push([[112],{63336:(t,e,n)=>{n.d(e,{A:()=>m});var i=n(98587),o=n(58168),r=n(65043),a=n(69292),s=n(68606),l=n(67266),u=n(34535);const c=t=>{let e;return e=t<1?5.11916*t**2:4.5*Math.log(t+1)+2,(e/100).toFixed(2)};var p=n(37864),d=n(57056),v=n(32400);function f(t){return(0,v.Ay)("MuiPaper",t)}(0,d.A)("MuiPaper",["root","rounded","outlined","elevation","elevation0","elevation1","elevation2","elevation3","elevation4","elevation5","elevation6","elevation7","elevation8","elevation9","elevation10","elevation11","elevation12","elevation13","elevation14","elevation15","elevation16","elevation17","elevation18","elevation19","elevation20","elevation21","elevation22","elevation23","elevation24"]);var h=n(70579);const E=["className","component","elevation","square","variant"],x=(0,u.Ay)("div",{name:"MuiPaper",slot:"Root",overridesResolver:(t,e)=>{const{ownerState:n}=t;return[e.root,e[n.variant],!n.square&&e.rounded,"elevation"===n.variant&&e["elevation".concat(n.elevation)]]}})((t=>{let{theme:e,ownerState:n}=t;var i;return(0,o.A)({backgroundColor:(e.vars||e).palette.background.paper,color:(e.vars||e).palette.text.primary,transition:e.transitions.create("box-shadow")},!n.square&&{borderRadius:e.shape.borderRadius},"outlined"===n.variant&&{border:"1px solid ".concat((e.vars||e).palette.divider)},"elevation"===n.variant&&(0,o.A)({boxShadow:(e.vars||e).shadows[n.elevation]},!e.vars&&"dark"===e.palette.mode&&{backgroundImage:"linear-gradient(".concat((0,l.X4)("#fff",c(n.elevation)),", ").concat((0,l.X4)("#fff",c(n.elevation)),")")},e.vars&&{backgroundImage:null==(i=e.vars.overlays)?void 0:i[n.elevation]}))})),m=r.forwardRef((function(t,e){const n=(0,p.A)({props:t,name:"MuiPaper"}),{className:r,component:l="div",elevation:u=1,square:c=!1,variant:d="elevation"}=n,v=(0,i.A)(n,E),m=(0,o.A)({},n,{component:l,elevation:u,square:c,variant:d}),b=(t=>{const{square:e,elevation:n,variant:i,classes:o}=t,r={root:["root",i,!e&&"rounded","elevation"===i&&"elevation".concat(n)]};return(0,s.A)(r,f,o)})(m);return(0,h.jsx)(x,(0,o.A)({as:l,ownerState:m,className:(0,a.A)(b.root,r),ref:e},v))}))},88692:(t,e,n)=>{n.d(e,{Ay:()=>x});var i=n(98587),o=n(77387),r=n(65043),a=n(97950);const s=!1;var l=n(88726),u=n(35796),c="unmounted",p="exited",d="entering",v="entered",f="exiting",h=function(t){function e(e,n){var i;i=t.call(this,e,n)||this;var o,r=n&&!n.isMounting?e.enter:e.appear;return i.appearStatus=null,e.in?r?(o=p,i.appearStatus=d):o=v:o=e.unmountOnExit||e.mountOnEnter?c:p,i.state={status:o},i.nextCallback=null,i}(0,o.A)(e,t),e.getDerivedStateFromProps=function(t,e){return t.in&&e.status===c?{status:p}:null};var n=e.prototype;return n.componentDidMount=function(){this.updateStatus(!0,this.appearStatus)},n.componentDidUpdate=function(t){var e=null;if(t!==this.props){var n=this.state.status;this.props.in?n!==d&&n!==v&&(e=d):n!==d&&n!==v||(e=f)}this.updateStatus(!1,e)},n.componentWillUnmount=function(){this.cancelNextCallback()},n.getTimeouts=function(){var t,e,n,i=this.props.timeout;return t=e=n=i,null!=i&&"number"!==typeof i&&(t=i.exit,e=i.enter,n=void 0!==i.appear?i.appear:e),{exit:t,enter:e,appear:n}},n.updateStatus=function(t,e){if(void 0===t&&(t=!1),null!==e)if(this.cancelNextCallback(),e===d){if(this.props.unmountOnExit||this.props.mountOnEnter){var n=this.props.nodeRef?this.props.nodeRef.current:a.findDOMNode(this);n&&(0,u.F)(n)}this.performEnter(t)}else this.performExit();else this.props.unmountOnExit&&this.state.status===p&&this.setState({status:c})},n.performEnter=function(t){var e=this,n=this.props.enter,i=this.context?this.context.isMounting:t,o=this.props.nodeRef?[i]:[a.findDOMNode(this),i],r=o[0],l=o[1],u=this.getTimeouts(),c=i?u.appear:u.enter;!t&&!n||s?this.safeSetState({status:v},(function(){e.props.onEntered(r)})):(this.props.onEnter(r,l),this.safeSetState({status:d},(function(){e.props.onEntering(r,l),e.onTransitionEnd(c,(function(){e.safeSetState({status:v},(function(){e.props.onEntered(r,l)}))}))})))},n.performExit=function(){var t=this,e=this.props.exit,n=this.getTimeouts(),i=this.props.nodeRef?void 0:a.findDOMNode(this);e&&!s?(this.props.onExit(i),this.safeSetState({status:f},(function(){t.props.onExiting(i),t.onTransitionEnd(n.exit,(function(){t.safeSetState({status:p},(function(){t.props.onExited(i)}))}))}))):this.safeSetState({status:p},(function(){t.props.onExited(i)}))},n.cancelNextCallback=function(){null!==this.nextCallback&&(this.nextCallback.cancel(),this.nextCallback=null)},n.safeSetState=function(t,e){e=this.setNextCallback(e),this.setState(t,e)},n.setNextCallback=function(t){var e=this,n=!0;return this.nextCallback=function(i){n&&(n=!1,e.nextCallback=null,t(i))},this.nextCallback.cancel=function(){n=!1},this.nextCallback},n.onTransitionEnd=function(t,e){this.setNextCallback(e);var n=this.props.nodeRef?this.props.nodeRef.current:a.findDOMNode(this),i=null==t&&!this.props.addEndListener;if(n&&!i){if(this.props.addEndListener){var o=this.props.nodeRef?[this.nextCallback]:[n,this.nextCallback],r=o[0],s=o[1];this.props.addEndListener(r,s)}null!=t&&setTimeout(this.nextCallback,t)}else setTimeout(this.nextCallback,0)},n.render=function(){var t=this.state.status;if(t===c)return null;var e=this.props,n=e.children,o=(e.in,e.mountOnEnter,e.unmountOnExit,e.appear,e.enter,e.exit,e.timeout,e.addEndListener,e.onEnter,e.onEntering,e.onEntered,e.onExit,e.onExiting,e.onExited,e.nodeRef,(0,i.A)(e,["children","in","mountOnEnter","unmountOnExit","appear","enter","exit","timeout","addEndListener","onEnter","onEntering","onEntered","onExit","onExiting","onExited","nodeRef"]));return r.createElement(l.A.Provider,{value:null},"function"===typeof n?n(t,o):r.cloneElement(r.Children.only(n),o))},e}(r.Component);function E(){}h.contextType=l.A,h.propTypes={},h.defaultProps={in:!1,mountOnEnter:!1,unmountOnExit:!1,appear:!1,enter:!0,exit:!0,onEnter:E,onEntering:E,onEntered:E,onExit:E,onExiting:E,onExited:E},h.UNMOUNTED=c,h.EXITED=p,h.ENTERING=d,h.ENTERED=v,h.EXITING=f;const x=h},92646:(t,e,n)=>{n.d(e,{A:()=>f});var i=n(98587),o=n(58168),r=n(9417),a=n(77387),s=n(65043),l=n(88726);function u(t,e){var n=Object.create(null);return t&&s.Children.map(t,(function(t){return t})).forEach((function(t){n[t.key]=function(t){return e&&(0,s.isValidElement)(t)?e(t):t}(t)})),n}function c(t,e,n){return null!=n[e]?n[e]:t.props[e]}function p(t,e,n){var i=u(t.children),o=function(t,e){function n(n){return n in e?e[n]:t[n]}t=t||{},e=e||{};var i,o=Object.create(null),r=[];for(var a in t)a in e?r.length&&(o[a]=r,r=[]):r.push(a);var s={};for(var l in e){if(o[l])for(i=0;i<o[l].length;i++){var u=o[l][i];s[o[l][i]]=n(u)}s[l]=n(l)}for(i=0;i<r.length;i++)s[r[i]]=n(r[i]);return s}(e,i);return Object.keys(o).forEach((function(r){var a=o[r];if((0,s.isValidElement)(a)){var l=r in e,u=r in i,p=e[r],d=(0,s.isValidElement)(p)&&!p.props.in;!u||l&&!d?u||!l||d?u&&l&&(0,s.isValidElement)(p)&&(o[r]=(0,s.cloneElement)(a,{onExited:n.bind(null,a),in:p.props.in,exit:c(a,"exit",t),enter:c(a,"enter",t)})):o[r]=(0,s.cloneElement)(a,{in:!1}):o[r]=(0,s.cloneElement)(a,{onExited:n.bind(null,a),in:!0,exit:c(a,"exit",t),enter:c(a,"enter",t)})}})),o}var d=Object.values||function(t){return Object.keys(t).map((function(e){return t[e]}))},v=function(t){function e(e,n){var i,o=(i=t.call(this,e,n)||this).handleExited.bind((0,r.A)(i));return i.state={contextValue:{isMounting:!0},handleExited:o,firstRender:!0},i}(0,a.A)(e,t);var n=e.prototype;return n.componentDidMount=function(){this.mounted=!0,this.setState({contextValue:{isMounting:!1}})},n.componentWillUnmount=function(){this.mounted=!1},e.getDerivedStateFromProps=function(t,e){var n,i,o=e.children,r=e.handleExited;return{children:e.firstRender?(n=t,i=r,u(n.children,(function(t){return(0,s.cloneElement)(t,{onExited:i.bind(null,t),in:!0,appear:c(t,"appear",n),enter:c(t,"enter",n),exit:c(t,"exit",n)})}))):p(t,o,r),firstRender:!1}},n.handleExited=function(t,e){var n=u(this.props.children);t.key in n||(t.props.onExited&&t.props.onExited(e),this.mounted&&this.setState((function(e){var n=(0,o.A)({},e.children);return delete n[t.key],{children:n}})))},n.render=function(){var t=this.props,e=t.component,n=t.childFactory,o=(0,i.A)(t,["component","childFactory"]),r=this.state.contextValue,a=d(this.state.children).map(n);return delete o.appear,delete o.enter,delete o.exit,null===e?s.createElement(l.A.Provider,{value:r},a):s.createElement(l.A.Provider,{value:r},s.createElement(e,o,a))},e}(s.Component);v.propTypes={},v.defaultProps={component:"div",childFactory:function(t){return t}};const f=v},88726:(t,e,n)=>{n.d(e,{A:()=>i});const i=n(65043).createContext(null)},35796:(t,e,n)=>{n.d(e,{F:()=>i});var i=function(t){return t.scrollTop}},77387:(t,e,n)=>{n.d(e,{A:()=>o});var i=n(63662);function o(t,e){t.prototype=Object.create(e.prototype),t.prototype.constructor=t,(0,i.A)(t,e)}}}]);
//# sourceMappingURL=112.c044ea29.chunk.js.map