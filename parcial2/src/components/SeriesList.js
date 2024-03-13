import { useEffect, useState } from "react";
import SerieDetail from "./SerieDetail";
import { FormattedDate } from "react-intl";
import { FormattedMessage } from "react-intl";
import "bootstrap/dist/css/bootstrap.min.css";

const Series = (props) => {
	const [series, setSeries] = useState([]);

	const [detail, setDetail] = useState();

	useEffect(() => {
		if (!navigator.onLine) {
			if (localStorage.getItem("series") === null) {
				setSeries("Loading...");
			} else {
				setSeries(localStorage.getItem("series"));
			}
		}

		fetch(props.url)
			.then((result) => result.json())
			.then((result) => {
				console.log(result);
				setSeries(result);
				localStorage.setItem("series", series);
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	function ListItem(props) {
		var date = props.value.release.split("/");
		return (
			<tr>
				<th scope="col">{props.value.id}</th>
				<td onClick={() => setDetail(props.value.id - 1)}>
					{props.value.name}
				</td>
				<td>{props.value.channel}</td>
				<td>{props.value.seasons}</td>
				<td>{props.value.episodes}</td>
				<td>
					<FormattedDate
						value={
							new Date(
								parseInt(date[2]),
								parseInt(date[1]) - 1,
								parseInt(date[0])
							)
						}
						year="numeric"
						month="numeric"
						day="numeric"
					/>
				</td>
			</tr>
		);
	}

	function MostrarDetail(props) {
		if (detail !== -1) {
			return <SerieDetail value={props.value}></SerieDetail>;
		} else {
			return <></>;
		}
	}

	if (typeof series === "string") {
		return <h2>Loading...</h2>;
	} else {
		return (
			<div className="row">
				<div className="col">
					<table className="table table-striped">
						<thead>
							<tr>
								<th scope="col">#</th>
								<th scope="col">
									<FormattedMessage id="Name" />
								</th>
								<th scope="col">
									<FormattedMessage id="Channel" />
								</th>
								<th scope="col">
									<FormattedMessage id="Seasons" />
								</th>
								<th scope="col">
									<FormattedMessage id="Episodes" />
								</th>
								<th scope="col">
									<FormattedMessage id="ReleaseDate" />
								</th>
							</tr>
						</thead>
						<tbody>
							{series.map((serie) => (
								<ListItem key={serie.id} value={serie}></ListItem>
							))}
						</tbody>
					</table>
				</div>
				<MostrarDetail value={series[detail]}></MostrarDetail>
			</div>
		);
	}
};

export default Series;
