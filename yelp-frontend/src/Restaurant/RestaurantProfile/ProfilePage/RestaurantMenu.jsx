import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { Typography, Divider } from "@material-ui/core";
//import { connect, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import logo from "../../../assets/homepage1.jpg";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";

const useStyles = makeStyles(() => ({
	root: {  
        marginLeft: 300,      
		maxWidth: 200,
		height: 200,
	},
	media: {
		height: 50, // as an example I am modifying width and height
		paddingTop: "60%", // 16:9
	},
}));

function RestaurantMenu() {
	let history = useHistory();
	let [] = useState("");
	let [] = useState("");
	let [] = useState("");
	let [] = useState("");
	let [] = useState(null);
	


	// useEffect(() => {
	// 	axios.get("http://localhost:3001/bizp").then((response) => {
	// 		//update the state with the response data
	// 		console.log(response);
	// setname(response.data[0].name);
	// setaddress(response.data[0].address);
	// settiming(response.data[0].timing);
	// setdescription(response.data[0].description);
	// if(response.data[0].profile_img != null)     {
	//   setpicture(<Avatar
	//     variant="square"
	//     src="https://s3-media0.fl.yelpcdn.com/assets/srv0/yelp_styleguide/7e4e0dfd903f/assets/img/default_avatars/user_large_square.png"
	//      style={{
	//      margin: "10px",
	//      width: "220px",
	//      height: "220px",
	//    }}
	//    />);
	// } else {
	//   setpicture(<img src={response.data[0].profileimg} style={{
	//                   margin: "10px",
	//                   width: "100px",
	//                   height: "100px",
	//                 }} />);
	// }
	// 	});
	// }, []);

	const classes = useStyles();


	return (
		<div className={classes.root}>
            <div>
            <Typography style={{
                   color:"#d32323", 
                   fontWeight: "bold", 
                    fontSize : "20px",
                    justifyContent: "center"
                   }}>Restaurant Menu</Typography>       
                </div>
                <div>
                <Divider />
                </div>
                <div>
			<Card >
				<CardMedia className={classes.media} image={logo} title='Paella dish' />
				<CardContent>
					<Typography
						variant='body2'
						color='default'
						component='p'
						style={{ fontWeight: "bold" }}>
						Paneer Tikka Masala
					</Typography>
					<Typography
						variant='body2'
						color='textSecondary'
						component='p'
						style={{ fonstSize: "10" }}>
						Ingredients: Paneer, Onion, Tomato, Cream
					</Typography>
				</CardContent>
			</Card>
            </div>
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
export default RestaurantMenu;
