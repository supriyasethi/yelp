import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
	Grid,
	Card,
	CardContent,
	Typography,
	Divider,
	CardMedia,
} from "@material-ui/core/";
import { useHistory } from "react-router-dom";
import logo from "../../../assets/homepage1.jpg";
import Avatar from "@material-ui/core/Avatar";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		padding: theme.spacing(2),
	},
	media: {
		height: 50,
		paddingTop: "60%",
	},
}));

export default function RestaurantMenu() {
	const classes = useStyles();
	const [state, setState] = React.useState({
		menuinfo: {
			id: "",
			name: "",
			ingredients: "",
			price: 0,
			description: "",
			category: "",
			picture: null,
		},
	});

	useEffect(() => {
		axios.get("http://localhost:3001/bizp").then((response) => {
			//update the state with the response data
			console.log(response);
			for (var i = 0; i < response.data.length; i++) {
				setState((state) => {
					const menu = state.menuinfo.filter((item) => {
							(item.name = response.data[i].dishName),
							(item.ingredients = response.data[i].ingredients),
							(item.price = response.data[i].price),
							(item.description = response.data[i].description),
							(item.category = response.data[i].category),
							(item.picture = response.data[i].picture);
					});
				});
			}
		});
	}, []);

	return (
		<div className={classes.root}>
			{state.list.map((elem) => (
				<Grid
					container
					spacing={2}
					direction='row'
					justify='flex-start'
					alignItems='flex-start'>
					{state.list.map((elem) => (
						<Grid item xs={3} key={state.menuinfo.indexOf(elem)}>
							<div>
								<Typography
									style={{
										color: "#d32323",
										fontWeight: "bold",
										fontSize: "20px",
										justifyContent: "center",
									}}>
									Restaurant Menu
								</Typography>
							</div>
							<div>
								<Divider />
							</div>
							<div>
								<Card>
									<CardMedia
										className={classes.media}
										image={`picture : ${elem.picture}`}
									/>
									<CardContent>
										<Typography
											variant='body2'
											color='default'
											component='p'
											style={{ fontWeight: "bold" }}>
											{`name : ${elem.name}`}
										</Typography>
										<Typography
											variant='body2'
											color='textSecondary'
											component='p'
											style={{ fonstSize: "10" }}>
											{`ingredients : ${elem.ingredients}`}
										</Typography>
									</CardContent>
								</Card>
							</div>
						</Grid>
					))}
				</Grid>
			))}
		</div>
	);
}
