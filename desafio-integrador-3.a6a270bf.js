let e;const t={data:{history:[],play:{user:"",machine:""}},listeners:[],initLocalStorage(){let e=localStorage.getItem("state");if(e){let t=JSON.parse(e);this.data={...this.data,...t}}},getState(){return this.data},setState(e){for(let t of(this.data={...this.data,...e},this.listeners))t(this.data);this.setLocalStorage(this.getState())},subscribe(e){return this.listeners.push(e),()=>{this.listeners=this.listeners.filter(t=>t!==e)}},setMoves(e){if(""!==this.data.play.user)return;let t={user:e,machine:{0:"piedra",1:"papel",2:"tijeras"}[Math.floor(3*Math.random())]},i=this.whoWins(t).toLocaleLowerCase(),s=[...this.getState().history,{...t,score:i}];this.setState({play:t,history:s})},whoWins:e=>e.user===e.machine?"Empate":e.machine===({tijeras:"papel",papel:"piedra",piedra:"tijeras"})[e.user]?"Ganaste":"Perdiste",setLocalStorage(e){localStorage.setItem("state",JSON.stringify(e))}};t.initLocalStorage();const i="/desafio-integrador-3-nivel-2-apx",s=[{path:/\/home/,page:function(){let e=document.createElement("div");e.classList.add("welcome__container"),e.innerHTML=`
        <h1>Piedra Papel <span>\xf3</span> Tijera</h1>
        <button-el></button-el>
        <div class='selection__container'>
            <selection-el image="tijeras"></selection-el>
            <selection-el image="piedra"></selection-el>
            <selection-el image="papel"></selection-el>
        </div>
    `;let t=document.createElement("style");t.innerHTML=`
        .welcome__container{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            min-width: 322px;
            max-width: 336px;
            margin: 0 auto;
            position: relative;
            padding-bottom: 98px;
        }

        h1{
            color: #009048;
            font-size: 80px;
            width: 284px;
            margin-bottom: 26px;
        }

        span{
            color: #91CCAF;
        }

        button-el{
            width: 100%;
        }

        .selection__container{
            position: absolute;
            bottom: -30px;
            display: flex;
            gap: clamp(46px, 8vw, 65px);
            z-index: 2;
        }

        selection-el{
            width: clamp(57px, 7vw, 80px);
        }

        selection-el:last-child{
            width: clamp(68px, 8.5vw, 97px);;
        }
    `;let i=e.querySelector("button-el");return i?.addEventListener("click",()=>{n("/game")}),e.appendChild(t),e}},{path:/\/game/,page:function(){let e=document.createElement("div");e.classList.add("welcome__container"),e.innerHTML=`
        <p>Presiona jugar y elige: piedra, papel o tijera antes de que pasen los 3 segundos.</p>
        <button-el>\xa1Jugar!</button-el>
        <div class='selection__container'>
            <selection-el image="tijeras"></selection-el>
            <selection-el image="piedra"></selection-el>
            <selection-el image="papel"></selection-el>
        </div>
    `;let i=document.createElement("style");i.innerHTML=`
        .welcome__container{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            min-width: 322px;
            max-width: 336px;
            margin: 0 auto;
            position: relative;
            padding-bottom: 98px;
        }

        p{
            font-size: 40px;
            margin-bottom: 48px;
            text-align: center;
            font-weight: 600;
        }

        span{
            color: #91CCAF;
        }

        button-el{
            width: 100%;
        }

        .selection__container{
            position: absolute;
            bottom: -30px;
            display: flex;
            gap: clamp(46px, 8vw, 65px);
            z-index: 2;
        }

        selection-el{
            width: clamp(57px, 8vw, 97px);
        }

        selection-el:last-child{
            width: clamp(65px, 9vw, 115px);
        }
    `;let s=e.querySelector("p"),n=e.querySelector("button-el"),a=e.querySelectorAll("selection-el"),o="";return n?.addEventListener("click",()=>{let i=document.createElement("counter-el");i.setAttribute("count","3"),i.setAttribute("route","results"),t.setState({play:{user:"",machine:""}}),n.replaceWith(i),s?.remove();let l=e=>{let t=e.detail.selection;a.forEach(e=>{let i=e.shadowRoot?.querySelector("img");i&&(i.style.transform="scale(1)",i.style.opacity="0.5",e.getAttribute("image")===t&&(i.style.transform="scale(1.5)",i.style.opacity="1"))}),o=t};e.addEventListener("selection-info",l),i.addEventListener("counter-finished",()=>{t.setMoves(o),e.removeEventListener("selection-info",l)})}),e.appendChild(i),e}},{path:/\/results/,page:function(){let e=t.getState(),i=e.history.filter(e=>"ganaste"===e.score).length,s=e.history.filter(e=>"perdiste"===e.score).length,a=document.createElement("div");if(""!==e.play.user)a.innerHTML=`
            <selection-el image="${e.play.machine}" class="machine-play"></selection-el>
            <selection-el image="${e.play.user}" class="user-play"></selection-el>
            <div class='result'>
                <star-result score='${t.whoWins(e.play)}'></star-result>
                <div class='history'>
                    <p>Score</p>
                    <p>Tu: ${i}</p>
                    <p>Maquina: ${s}</p>
                </div>
                <button-el>Volver a jugar</button-el>
            </div>
        `,setTimeout(()=>{a.querySelector(".result").style.display="flex",setTimeout(()=>{s-i==10&&alert("La maquina te esta padriando maestro, tomate un respiro")},1e3)},2e3),a.querySelector("button-el")?.addEventListener("click",()=>{n("/game")});else{a.innerHTML=`
            <div class='result__fallback'>
                <h4>Vaya, parece que no has jugado</h4>
                <button-el>Llevame al juego!</button-el>
            </div>
        `;let e=a.querySelector("button-el");e?.addEventListener("click",()=>{n("/game")})}let o=document.createElement("style");return o.innerHTML=`
        .machine-play{
            position: absolute;
            top: -20px;
            width: 300px;
            height: 400px;
            left: 50%;
            transform: translateX(-50%) rotate(180deg);
        }

        .user-play{
            position: absolute;
            bottom: -20px;
            width: 300px;
            height: 400px;
            left: 50%;
            transform: translateX(-50%);
        }

        .result__fallback{
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 40px;
        }

        button-el{
            width: 340px;
        }

        h4{
            text-align: center;
            font-size: 40px;
        }

        .result{
            background-color: ${({ganaste:"var(--win-bg)",perdiste:"var(--loose-bg)",empate:"var(--draw-bg)"})[t.whoWins(e.play).toLocaleLowerCase()]};
            position: absolute;
            inset: 0;
            display: none;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 20px;
        }

        .history{
            width: 259px;
            background-color: white;
            border: 10px solid black;
            border-radius: 10px;
            padding: 20px;
            font-family: 'Odibee Sans', sans-serif;
        }

        .history p{
            font-size: 45px;
            text-align: end;
        }

        .history p:first-child{
            font-size: 55px;
            text-align: center;
            margin-bottom: 15px;
        }
    `,a.appendChild(o),a}}];function n(t){history.pushState({},"",i+t),e.innerHTML="";let n=s.find(e=>e.path.test(t));if(n){let t=n.page();e.appendChild(t)}else e.innerHTML=`<h4>Oh no, parece que te has perdido \u{1F630}. La ruta que estabas buscando no existe.</h4>`}class a extends HTMLElement{constructor(){super(),this.shadow=this.attachShadow({mode:"open"}),this.render()}render(){let e=document.createElement("button");e.textContent=this.textContent||"Empezar";let t=document.createElement("style");t.innerHTML=`
            button{
                font-family: 'Odibee Sans', sans-serif;
                width: 100%;
                height: 87px;
                font-size: 45px;
                border: 10px solid var(--dark-btn-blue);
                border-radius: 10px;
                color: var(--light-btn-font);
                background-color: var(--light-btn-blue);
            }

            button:hover{
                cursor: pointer;
            }
        `,this.shadow.appendChild(t),this.shadow.appendChild(e)}}customElements.define("button-el",a);var o={};o=import.meta.resolve("72eu7");var l={};l=import.meta.resolve("7Nkwz");var r={};r=import.meta.resolve("efEvF");class c extends HTMLElement{constructor(){super(),this.shadow=this.attachShadow({mode:"open"}),this.render()}render(){let e=document.createElement("img"),t=this.getAttribute("image"),i=document.createElement("style"),s={tijeras:o,piedra:l,papel:r}[t];s&&(e.src=s,e.classList.add(t)),e.alt="seleccion",i.innerHTML=`
            img{
                transition: all 0.3s ease-in-out;
                width: 100%;
                height: 100%;
            }
        `,e.addEventListener("click",()=>{let e=new CustomEvent("selection-info",{detail:{selection:t},bubbles:!0});this.dispatchEvent(e)}),this.shadow.appendChild(i),this.shadow.appendChild(e)}}customElements.define("selection-el",c);class d extends HTMLElement{constructor(){super(),this.shadow=this.attachShadow({mode:"open"}),this.render()}render(){let e=document.createElement("div"),t=this.getAttribute("score");e.innerHTML=`
            <svg width="260" height="260" viewBox="0 0 363 362" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M206.486 62.1223L208.047 62.9729L209.795 62.6458L320.673 41.9446L299.972 152.823L299.646 154.571L300.496 156.132L354.447 255.187L242.599 269.762L240.835 269.992L239.614 271.283L162.078 353.202L113.654 251.333L112.891 249.728L111.285 248.964L9.41443 200.538L91.3344 123.004L92.6263 121.782L92.8558 120.019L107.431 8.17017L206.486 62.1223Z" fill="#6CB46C" stroke="black" stroke-width="13"/>
            <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="70">${t}</text>
            </svg>
        `,e.style.fontFamily="Odibee Sans, sans-serif";let i=e.querySelector("svg").querySelector("path");t?.toLocaleLowerCase()==="perdiste"&&i.setAttribute("fill","var(--star-red)"),t?.toLocaleLowerCase()==="empate"&&i.setAttribute("fill","var(--star-yellow)"),this.shadow.appendChild(e)}}customElements.define("star-result",d);class p extends HTMLElement{static get observedAttributes(){return["count"]}constructor(){super(),this.shadow=this.attachShadow({mode:"open"}),this.render()}render(){this.shadow.innerHTML="";let e=document.createElement("div"),t=document.createElement("span"),i=document.createElement("style");e.innerHTML=`
            <svg class="progress-ring" viewBox="0 0 100 100">
                <circle class="ring-bg" cx="50" cy="50" r="45"></circle>
                <circle class="ring-progress" cx="50" cy="50" r="45" stroke-dasharray="283" stroke-dashoffset="0"></circle>
            </svg>
        `,e.appendChild(t);let s=parseInt(this.getAttribute("count"))||0,a=()=>{t.textContent=`${s}`,s<0&&(e.style.display="none",clearInterval(this.interval),this.dispatchEvent(new CustomEvent("counter-finished",{bubbles:!0,composed:!0})),n("/"+this.getAttribute("route"))),s--};i.innerHTML=`
            div {
                width: 200px;
                height: 200px;
                display: flex;
                justify-content: center;
                align-items: center;
                position: relative;
            }

            span {
                position: absolute;
                font-size: 100px;
                font-weight: 700;
                z-index: 2;
                color: black;
            }

            .progress-ring {
                position: absolute;
                width: 100%;
                height: 100%;
                transform: rotate(-90deg);
            }

            .ring-bg {
                fill: none;
                stroke: #e0e0e0;
                stroke-width: 10;
            }

            .ring-progress {
                fill: none;
                stroke: black;
                stroke-width: 10;
                stroke-dasharray: 283;
                stroke-dashoffset: 0;
                animation: sweep 1s linear infinite;
            }

            @keyframes sweep {
                from {
                    stroke-dashoffset: 0;
                }
                to {
                    stroke-dashoffset: 283;
                }
            }
        `,this.shadow.appendChild(i),this.shadow.appendChild(e),a(),this.interval=setInterval(a,1e3)}attributeChangedCallback(e,t,i){"count"===e&&(clearInterval(this.interval),this.render())}disconnectedCallback(){clearInterval(this.interval)}}customElements.define("counter-el",p),e=document.querySelector("#root"),window.onpopstate=()=>{n(window.location.pathname.replace(i,"")||"/")};const h=window.location.pathname.replace(i,"")||"/";n("/"===h?"/home":h);
//# sourceMappingURL=desafio-integrador-3.a6a270bf.js.map
