var a=Object.defineProperty;var n=(e,r,t)=>r in e?a(e,r,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[r]=t;var s=(e,r,t)=>n(e,typeof r!="symbol"?r+"":r,t);import{r as i,j as o}from"./index-DJkQADIP.js";import{A as l,a as c}from"./AlertTitle-BwX6e9Ze.js";class u extends i.Component{constructor(t){super(t);s(this,"state",{hasError:!1});this.state={hasError:!1}}static getDerivedStateFromError(t){return console.log(t),{hasError:!0}}render(){return this.state.hasError?o.jsxs(l,{sx:{textAlign:"center"},severity:"error",children:[o.jsx(c,{children:"Ошибка"}),"Что-то пошло не так :/"]}):this.props.children}}export{u as ErrorBoundary};
