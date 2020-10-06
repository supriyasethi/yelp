import { recomposeColor, Typography, Divider } from "@material-ui/core";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import BusinessOutlinedIcon from "@material-ui/icons/BusinessOutlined";
import StarOutlinedIcon from "@material-ui/icons/StarOutlined";
import PhotoSizeSelectActualOutlinedIcon from "@material-ui/icons/PhotoSizeSelectActualOutlined";
import FastfoodOutlinedIcon from "@material-ui/icons/FastfoodOutlined";
import ListAltOutlinedIcon from "@material-ui/icons/ListAltOutlined";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
		maxWidth: 250,
		fontSize: "12px",
		backgroundColor: theme.palette.background.paper,
		"& > *": {
			margin: theme.spacing(1),
		},
	},
	listItemText: {
		fontSize: "14px",
		fontWeight: "bold",
    },
    
}));

const ProfileLinks = () => {
	const classes = useStyles();
	let history = useHistory();
	function updateBusinessInfo() {
		history.push("/updatebprofile");
	}

	function updateMenu() {
		history.push("/menu");
	}

	function addEvents() {
		history.push("/events");
	}

	function handleCheckOrders() {
		//history.push('/menu')
    }
    function handleClickHome() {
		history.push('/bizp')
	}

	return (
		<div className={classes.root} style={{ paddingTop: "50px" }}>
			<div>
				<List component='nav' aria-label='main mailbox folders'>
					<ListItem button>
						<ListItemIcon>
							<HomeOutlinedIcon />
						</ListItemIcon>
						<ListItemText
							classes={{ primary: classes.listItemText }}
                            primary='Home'
                            onClick={handleClickHome}
						/>
					</ListItem>
					<ListItem button>
						<ListItemIcon>
							<BusinessOutlinedIcon />
						</ListItemIcon>
						<ListItemText
							classes={{ primary: classes.listItemText }}
							primary='Business Information'
							onClick={updateBusinessInfo}
						/>
					</ListItem>
					<ListItem button>
						<ListItemIcon>
							<StarOutlinedIcon />
						</ListItemIcon>
						<ListItemText
							classes={{ primary: classes.listItemText }}
							primary='Reviews'
						/>
					</ListItem>
					<ListItem button>
						<ListItemIcon>
							<PhotoSizeSelectActualOutlinedIcon />
						</ListItemIcon>
						<ListItemText
							classes={{ primary: classes.listItemText }}
							primary='Photos'
						/>
					</ListItem>
					<ListItem button>
						<ListItemIcon>
							<FastfoodOutlinedIcon />
						</ListItemIcon>
						<ListItemText
							classes={{ primary: classes.listItemText }}
							primary='Update Menu'
							onClick={updateMenu}
						/>
					</ListItem>
					<ListItem button>
						<ListItemIcon>
							<FastfoodOutlinedIcon />
						</ListItemIcon>
						<ListItemText
							classes={{ primary: classes.listItemText }}
							primary='Add Events'
							onClick={addEvents}
						/>
					</ListItem>
					<ListItem button>
						<ListItemIcon>
							<ListAltOutlinedIcon />
						</ListItemIcon>
						<ListItemText
							classes={{ primary: classes.listItemText }}
							primary='Check Orders'
							onClick={handleCheckOrders}
						/>
					</ListItem>
				</List>
			</div>			
		</div>
	);
};
export default ProfileLinks;