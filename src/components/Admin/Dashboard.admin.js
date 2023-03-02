import React, {useState, useEffect, useRef, useCallback} from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import styled from 'styled-components'
import authHeader from "../../services/auth-header";
import Button from "../../components/Button";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands, icon, thin } from '@fortawesome/fontawesome-svg-core/import.macro'

const API_URL = "http://localhost:8080/api/user/";


const Container = styled.div`

	width: 80%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	margin: 0 auto;

	table {
	  font-family: arial, sans-serif;
	  border-collapse: collapse;
	  width: 100%;
	  margin-top: 2rem;
	  box-shadow: 0px 0px 5px rgba(${(props) => props.theme.bodyRgba}, 0.18);

	  & a {
	  	display: flex;
	  	justify-content: center;
	  	text-align: center;
	  	color: red;
	  }
	}

	td, th {
	  border: 1px solid transparent;
	  text-align: left;
	  padding: 8px;
	  box-shadow: 0px 0px 2px rgba(${(props) => props.theme.bodyRgba}, 0.18);
	  margin: 20px;
	}

	tr:nth-child(even) {
	  background-color: rgba(${(props) => props.theme.textRgba}, 0.18);
	}


`

const Title = styled.h1`

	
	font-size: ${(props) => props.theme.fontlg};
    font-weight: 800;
    line-height: 1;
    width: 70%;


`

const Action = styled.div`


	display: flex;
	justify-content: flex-end;
	width: 100%;
	padding: 2rem 0;


`

const AdminDashboardLeft = () =>  {

	const [users, setUsers] = useState()

	const getAllUser = useCallback(() => {
		return axios.get(API_URL + "all", { headers: authHeader() }).then((data) => {
			setUsers(data.data)
		}).catch((err) => {
			console.log(err)
		})
	})

	useEffect(() => {
		getAllUser()
	}, [users])



	return(
		<Container>
			<table>
			  <tr>
			    <th>First Name</th>
			    <th>Last Name</th>
			    <th>Email</th>
			    <th>Verification</th>
			    <th>Details</th>
			  </tr>
			  {
			  	users && users.map((user) => (
					<tr key={user._id}>
					    <td>{user.firstName}</td>
					    <td>{user.lastName}</td>
					    <td>{user.email}</td>
					    <td>{user.verification}</td>
					    <td><Link to={`/admin/user/${user._id}`}><FontAwesomeIcon icon={solid('pencil')} /></Link></td>
					 </tr>
				))
			  }
			</table>
			<Action>
				<Button href="new" color="#fff" background="rgba(231,62,17, 1)">
		          Ajouter
		        </Button>
			</Action>
		</Container>
	)
}


export default AdminDashboardLeft;