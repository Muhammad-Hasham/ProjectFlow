"use strict";(self.webpackChunki_200760_s_application_2=self.webpackChunki_200760_s_application_2||[]).push([[550],{7550:(n,o,t)=>{t.r(o),t.d(o,{default:()=>k});var e,i,c,s,a,r,l=t(65043),g=t(57528),p=t(40927),d=t(1107),u=t(70579);const h=function(){return(0,u.jsx)(m,{children:(0,u.jsxs)(x,{children:[(0,u.jsx)(f,{src:"https://www.gstatic.com/images/icons/material/product/2x/docs_48dp.png",alt:"Google Logo"}),(0,u.jsx)(w,{children:"Sign in to Google"}),(0,u.jsx)(A,{children:"To create a Google Document"}),(0,u.jsx)(b,{clientId:"155324145017-jdcjku4ui94n9advl5ehv9qqtc0stnnn.apps.googleusercontent.com",buttonText:"Sign in with Google",onSuccess:n=>{console.log("Login Success: currentUser:",n.profileObj)},onFailure:n=>{console.log("Login failed: res:",n)},cookiePolicy:"single_host_origin",isSignedIn:!0})]})})},m=p.Ay.div(e||(e=(0,g.A)(["\n  background-color: #f8f8f8;\n  height: 100vh;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n"]))),x=p.Ay.div(i||(i=(0,g.A)(["\n  padding: 50px;\n  text-align: center;\n  background-color: white;\n  border-radius: 10px;\n  box-shadow: 0 1px 6px rgba(0,0,0,0.1), 0 1px 4px rgba(0,0,0,0.12);\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n"]))),f=p.Ay.img(c||(c=(0,g.A)(["\n  height: 80px;\n  margin-bottom: 20px;\n"]))),w=p.Ay.h1(s||(s=(0,g.A)(["\n  margin: 20px 0;\n  color: #333;\n  font-size: 24px;\n"]))),A=p.Ay.p(a||(a=(0,g.A)(["\n  color: #666;\n  margin-bottom: 30px;\n"]))),b=(0,p.Ay)(d.GoogleLogin)(r||(r=(0,g.A)(["\n  margin-top: 20px;\n  button {\n    text-transform: none !important;\n    background-color: #4285f4 !important;\n    color: white !important;\n    &:hover {\n      background-color: #357ae8 !important;\n    }\n  }\n"])));var j=t(18773);const k=function(){const[n,o]=(0,l.useState)(!1);return(0,l.useEffect)((()=>{function n(n){o(n),n&&function(){var n=j.GP.auth.getToken().access_token;fetch("https://docs.googleapis.com/v1/documents",{method:"POST",headers:new Headers({Authorization:"Bearer "+n})}).then((n=>n.json())).then((function(n){console.log(n);const o="https://docs.google.com/document/d/"+n.documentId+"/edit";window.open(o,"_blank"),window.location.href="http://localhost:3001/apps"}))}()}j.GP.load("client:auth2",(async function(){try{await j.GP.client.init({apiKey:"AIzaSyD36-w_vWkeA3Y4p1lWcczwScKSgNnrZgs",clientId:"155324145017-jdcjku4ui94n9advl5ehv9qqtc0stnnn.apps.googleusercontent.com",scope:"https://www.googleapis.com/auth/drive.file"}),j.GP.auth2.getAuthInstance().isSignedIn.listen(n),n(j.GP.auth2.getAuthInstance().isSignedIn.get())}catch(o){console.error("Error initializing gapi:",o)}}))}),[]),(0,u.jsx)("div",{className:"App",children:n?(0,u.jsx)("p",{children:"Redirecting to Google Docs..."}):(0,u.jsx)(h,{})})}}}]);
//# sourceMappingURL=550.664ccd85.chunk.js.map