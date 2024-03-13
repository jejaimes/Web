import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Series from "./components/SeriesList";
import Plot from "./components/PlotSeries";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import { IntlProvider } from "react-intl";
import localeESMessages from "./locales/es";
import localeENMessages from "./locales/en";

const urlES =
	"https://gist.githubusercontent.com/josejbocanegra/c55d86de9e0dae79e3308d95e78f997f/raw/a467415350e87c13faf9c8e843ea2fd20df056f3/series-es.json";
const urlEN =
	"https://gist.githubusercontent.com/josejbocanegra/5dc69cb7feb7945ef58b9c3d84be2635/raw/e2d16f7440d51cae06a9daf37b0b66818dd1fe31/series-en.json";

var rx = new RegExp("(es)-*[a-zA-Z]*");

ReactDOM.render(
	<IntlProvider
		locale={navigator.language}
		messages={rx.test(navigator.language) ? localeESMessages : localeENMessages}
	>
		<h1>T.V. Series</h1>
		<hr className="m-1" />
		<Series url={rx.test(navigator.language) ? urlES : urlEN} />
		<Plot url={rx.test(navigator.language) ? urlES : urlEN} />
	</IntlProvider>,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
