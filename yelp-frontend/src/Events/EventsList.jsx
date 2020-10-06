import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { Typography, Divider, Avatar, Link } from "@material-ui/core";
//import { connect, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import logo from "../assets/homepage1.jpg";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
	root: {
		width: 500,		
	},
	inline: {
		display: "inline",
	},
}));

function EventsList() {
	let history = useHistory();

	let [state, setState] = React.useState({
		events: [],
	});

	var newEvent = [];

	useEffect(() => {
		axios.get("http://localhost:3001/get/event").then((response) => {
			//update the state with the response data
			for (var i = 0; i < response.data.length; i++) {
				var temp = response.data[i];
				newEvent.push({
					id: i,
					items: temp,
				});
			}
			setState({
				events: newEvent,
			});
		});
    }, []);
    
    function handleRegister() {       
        history.push({
			pathname: '/eventsregister',
			state: {data: "home"}});			
	}

	const classes = useStyles();

	return (
		<div className={classes.root}>
			<div>
				<Typography
					style={{
						color: "#d32323",
						fontWeight: "bold",
						fontSize: "20px",
						justifyContent: "center",
					}}>
					Upcoming Events
				</Typography>
			</div>
			<div>
				<Divider />
			</div>

			<List>
				{state.events.map((listitem) => (
					<ListItem alignItems='flex-start' key={listitem.id}>
						<ListItemAvatar>
							<Avatar alt='Remy Sharp' src={logo} />
						</ListItemAvatar>
						<ListItemText
							primary={listitem.items.name}
							secondary={
								<React.Fragment>
									<div>
										<Typography
											component='span'
											variant='body2'
											className={classes.inline}
											color='textPrimary'>
											Timing:
										</Typography>
										{listitem.items.time}
										<Typography
											component='span'
											variant='body2'
											className={classes.inline}
											color='textPrimary'>
											Date:
										</Typography>
										{listitem.items.date}
									</div>
									<div>
										<Typography
											component='span'
											variant='body2'
											className={classes.inline}
											color='textPrimary'>
											Location:
										</Typography>
										{listitem.items.location}
									</div>
									<div>
										<Link
											component='button'
											variant='body2'
											style={{												
												fontSize: "14px",
												fontWeight: "bold",
											}}
											onClick={handleRegister}>
											Register
										</Link>
									</div>
								</React.Fragment>
							}
						/>
					</ListItem>
				))}
			</List>
			<Divider />
		</div>
	);
}

// const mapStateToProps = (state) => {
//     return {
//         firstname: state.profile.firstname,
//         zipcode :  state.profile.zipcode
//     }
//   }

//export default connect(mapStateToProps, null)(UserInfo);
export default EventsList;
