import { useEffect, useState } from "react";

const Marvel = () => {
	const [charac, setCharac] = useState({});

	useEffect(() => {
		if (!navigator.onLine) {
			if (localStorage.getItem("charac") === null) {
				setCharac("Loading...");
			} else {
				setCharac(localStorage.getItem("charac"));
			}
		}

		fetch(
			"http://gateway.marvel.com/v1/public/characters/1010903?ts=1&apikey=c5263ec93b4f980ebc3dc541c2c5e067&hash=00c58346d893897e91cb570534ecc5fc"
		)
			.then((result) => result.json())
			.then((result) => {
				setCharac({
					id: result.data.results[0].id,
					name: result.data.results[0].name,
					image:
						result.data.results[0].thumbnail.path +
						"." +
						result.data.results[0].thumbnail.extension,
				});
				localStorage.setItem("charac", charac);
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div>
			<h1>Character: {charac.name}</h1>
			<h2>Id: {charac.id}</h2>
			<img src={charac.image} alt={charac.name}></img>
		</div>
	);
};

export default Marvel;
