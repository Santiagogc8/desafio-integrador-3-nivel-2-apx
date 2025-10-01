import { initRouter } from "./router";

import "./components/button-el";
import "./components/selection-el";
import "./components/star-result";
import "./components/counter-el";

(function () {
	const root = document.querySelector("#root");

	initRouter(root!)
})();
