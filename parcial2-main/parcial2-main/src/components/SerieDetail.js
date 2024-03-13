import "bootstrap/dist/css/bootstrap.min.css";
import { FormattedMessage } from "react-intl";

const SerieDetail = (props) => {
	function Imagen(props) {
		if (!navigator.onLine) {
			return <FormattedMessage id="Error" />;
		} else {
			return (
				<img
					src={props.src}
					className="card-img-top"
					alt={props.alt + " image"}
				/>
			);
		}
	}
	if (props.value === undefined) return <></>;

	return (
		<div className="col-3">
			<div className="card" style={{ width: "18rem" }}>
				<Imagen src={props.value.poster} alt={props.value.name}></Imagen>
				<div className="card-body">
					<h5 className="card-title">{props.value.name}</h5>
					<p className="card-text">{props.value.description}</p>
					<a href={props.value.webpage}>{props.value.webpage}</a>
				</div>
			</div>
		</div>
	);
};

export default SerieDetail;
