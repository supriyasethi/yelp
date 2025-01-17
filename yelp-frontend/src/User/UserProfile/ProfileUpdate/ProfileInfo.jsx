import React, { useState, useEffect } from "react";
import { IconButton, Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
	Typography,
	Button,
	Divider,
	TextField,
	Radio,
	RadioGroup,
	FormControlLabel,
	FormControl,
	FormLabel,
} from "@material-ui/core";
//import { connect, useDispatch } from "react-redux";
import axios from "axios";
import ImageUploader from "react-images-upload";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
	root: {
		"& > *": {
			margin: theme.spacing(1),
		},
	},
	container: {
		display: "flex",
		flexFlow: "row wrap",
		justifyContent: "space-between",
		width: "120.4%",
		padding: "20",
	},

	profile: {
		flexGrow: "0",
		flexShrink: "0",
		flexBasis: "calc(25% - 10px)",
		margin: "5px",
	},
	user: {
		flexGrow: "3",
		flexShrink: "0",
		flexBasis: "calc(25% - 10px)",
		marginTop: "80px",
	},

	update: {
		flexGrow: "0",
		flexShrink: "0",
		flexBasis: "calc(25% - 10px)",
		marginTop: "80px",
	},
}));

function ProfileInfo() {
	//let httpURL = "http://localhost:3001";
	let httpURL = "http://54.219.75.46:3001";
	const [picture, setpicture] = useState();
	const [picname, setpicname] = useState("Your Profile Photo");
	const [uploadedFile, setUploadedFile] = useState({});
	const [state, setState] = React.useState({
		firstname: "",
		lastname: "",
		nickname: "",
		gender: "",
		phonenumber: "",
		birthday: null,
		state: "",
		country: "",
		thingsilove: "",
		yelpingsince: "",
		findmein: "",
		userId: null,
	});

	let history = useHistory();
	const classes = useStyles();

	function handleFileSelected(e) {
		console.log(e.target.files[0]);
		setpicture(e.target.files[0]);

		//setpicture(URL.createObjectURL(e.target.files[0]));
	}
	var user = localStorage.getItem("userId");

	function handleChange(e) {
		console.log("handlechange state", state);
		const value = e.target.value;
		setState({
			...state,
			[e.target.name]: value,
			userId: user,
		});
	}
	const onChange = (e) => {
		setpicture(e.target.files[0]);
		setpicname(e.target.files[0].name);
	};

	const uploadPicture = async e => {
		const data = new FormData();
    data.append("image", picture);
    e.preventDefault();
    axios.defaults.withCredentials = true;
    try{
      const res = await axios.post(httpURL+"/upload", data, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
      });
      console.log('res', res.data.filePath);
      const { fileName, filePath } = res.data;
      console.log('filePath',filePath);
      setUploadedFile({ fileName, filePath });
      console.log('uploadedfle', uploadedFile);
    }
    catch(err) {
			if (err.response.status === 500) {
				console.lg("There was a problem with the sever");
			} else {
				console.log(err.response.data.msg);
			}
    }
    
	}

	function handleSaveChanges() {
		// let profileInfo = {
		//     state,
		//     picture
		// }
		console.log(state);
		axios.defaults.withCredentials = true;
		axios
			.post(httpURL+"/update/userprofile", state)
			.then((response) => {
				console.log("Status code: ", response.status);
				if (response.status === 200) {
					history.push("/userp");
				}
			})
			.catch((error) => {
				console.log("error", error.response);
			});
	}

	function handleCancel() {
		history.push("/userp");
	}

	return (
		<div className={classes.root}>
			<div className={classes.container}>
				<Typography
					style={{
						color: "#d32323",
						fontWeight: "bold",
						fontSize: "20px",
						justifyContent: "center",
					}}>
					Profile
				</Typography>
			</div>
			<div>
				<Divider />
			</div>
			<div>
				<form onSubmit={uploadPicture}>
					<div className='custom-file mb-4'>
						<input
							type='file'
							className='custom-file-input'
							id='customFile'
							onChange={onChange}
						/>					
					</div>					

					<input
						type='submit'
						value='Upload'
						className='btn btn-primary btn-block mt-4'
					/>
				</form>
        {uploadedFile ? (
        <div className='row mt-5'>
          <div className='col-md-6 m-auto'>            
            <img style={{ width: '100%' }} src={uploadedFile.filePath} alt='' />
          </div>
        </div>
      ) : null}
				
			</div>
			<div>
				<Typography
					style={{
						color: "#333333",
						fontWeight: "bold",
						fontSize: "13px",
						justifyContent: "center",
					}}>
					First Name
				</Typography>
				<TextField
					id='outlined-basic'
					variant='outlined'
					size='small'
					type='text'
					margin='dense'
					style={{ height: "20", width: "500px" }}
					name='firstname'
					value={state.firstname}
					onChange={handleChange}
				/>
				<div>
					<Typography
						style={{
							color: "#333333",
							fontWeight: "bold",
							fontSize: "13px",
							justifyContent: "center",
						}}>
						Last Name
					</Typography>
					<TextField
						id='outlined-basic'
						variant='outlined'
						size='small'
						type='text'
						margin='dense'
						style={{ height: "20", width: "500px" }}
						name='lastname'
						value={state.lastname}
						onChange={handleChange}
					/>
				</div>
				<div>
					<Typography
						style={{
							color: "#333333",
							fontWeight: "bold",
							fontSize: "13px",
							justifyContent: "center",
						}}>
						Nickname
					</Typography>
					<TextField
						id='outlined-basic'
						variant='outlined'
						size='small'
						type='text'
						margin='dense'
						style={{ height: "20", width: "500px" }}
						name='nickname'
						value={state.nickname}
						onChange={handleChange}
					/>
				</div>

				<div>
					<FormControl component='fieldset'>
						<FormLabel
							component='legend'
							style={{
								color: "#333333",
								fontWeight: "bold",
								fontSize: "13px",
								justifyContent: "center",
							}}>
							Gender
						</FormLabel>
						<RadioGroup
							aria-label='gender'
							name='gender'
							onChange={handleChange}
							value={state.gender}>
							<FormControlLabel
								value='female'
								control={<Radio />}
								label='Female'
							/>
							<FormControlLabel value='male' control={<Radio />} label='Male' />
							<FormControlLabel
								value='other'
								control={<Radio />}
								label='Other'
							/>
						</RadioGroup>
					</FormControl>
				</div>

				<div>
					<Typography
						style={{
							color: "#333333",
							fontWeight: "bold",
							fontSize: "13px",
							justifyContent: "center",
						}}>
						Phone Number
					</Typography>
					<TextField
						id='outlined-basic'
						variant='outlined'
						size='small'
						type='text'
						margin='dense'
						style={{ height: "20", width: "500px" }}
						name='phonenumber'
						value={state.phonenumber}
						onChange={handleChange}
					/>
				</div>

				<div>
					<Typography
						style={{
							color: "#333333",
							fontWeight: "bold",
							fontSize: "13px",
							justifyContent: "center",
						}}>
						Birthday
					</Typography>
					<TextField
						id='outlined-basic'
						variant='outlined'
						size='small'
						type='date'
						margin='dense'
						style={{ height: "20", width: "500px" }}
						name='birthday'
						value={state.birthday}
						onChange={handleChange}
					/>
				</div>

				<div>
					<Typography
						style={{
							color: "#333333",
							fontWeight: "bold",
							fontSize: "13px",
							justifyContent: "center",
						}}>
						State
					</Typography>
					<TextField
						id='outlined-basic'
						variant='outlined'
						size='small'
						type='text'
						margin='dense'
						style={{ height: "20", width: "500px" }}
						name='state'
						value={state.state}
						onChange={handleChange}
					/>
				</div>

				<div>
					<Typography
						style={{
							color: "#333333",
							fontWeight: "bold",
							fontSize: "13px",
							justifyContent: "center",
						}}>
						Country
					</Typography>
					<TextField
						id='outlined-basic'
						variant='outlined'
						size='small'
						type='text'
						margin='dense'
						style={{ height: "20", width: "500px" }}
						name='country'
						value={state.country}
						onChange={handleChange}
					/>
				</div>

				<div>
					<Typography
						style={{
							color: "#333333",
							fontWeight: "bold",
							fontSize: "13px",
							justifyContent: "center",
						}}>
						Things I Love
					</Typography>
					<TextField
						id='outlined-basic'
						variant='outlined'
						size='small'
						type='text'
						margin='dense'
						style={{ height: "20", width: "500px" }}
						name='thingsilove'
						value={state.thingsilove}
						onChange={handleChange}
					/>
				</div>

				<div>
					<Typography
						style={{
							color: "#333333",
							fontWeight: "bold",
							fontSize: "13px",
							justifyContent: "center",
						}}>
						Yelping Since
					</Typography>
					<TextField
						id='outlined-basic'
						variant='outlined'
						size='small'
						type='text'
						margin='dense'
						style={{ height: "20", width: "500px" }}
						name='yelpingsince'
						value={state.yelpingsince}
						onChange={handleChange}
					/>
				</div>
				<div>
					<Typography
						style={{
							color: "#333333",
							fontWeight: "bold",
							fontSize: "13px",
							justifyContent: "center",
						}}>
						Find Me In
					</Typography>
					<TextField
						id='outlined-basic'
						variant='outlined'
						size='small'
						type='text'
						margin='dense'
						style={{ height: "20", width: "500px" }}
						name='findmein'
						value={state.findmein}
						onChange={handleChange}
					/>
				</div>
				<div>
					<Button
						variant='contained'
						color='secondary'
						style={{
							height: "35px",
							width: "150px",
							fontSize: "12px",
							fontWeight: "bold",
							background: "#d32323",
						}}
						onClick={handleSaveChanges}>
						Save Changes
					</Button>

					<Button
						variant='contained'
						color='secondary'
						style={{
							height: "35px",
							width: "150px",
							fontSize: "12px",
							fontWeight: "bold",
							background: "#333333",
						}}
						onClick={handleCancel}>
						Cancel
					</Button>
				</div>
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
export default ProfileInfo;
