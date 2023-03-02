import react, {useState, useEffect, useCallback} from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import styled from 'styled-components'
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands, icon, thin } from '@fortawesome/fontawesome-svg-core/import.macro'
import AdminDashboardLeft from '../../components/Admin/Dashboard.admin.js'
import ProprieteNavibar from '../../components/ProprieteNavibar'
import Button from "../../components/Button";
const Container = styled.div`


	padding: 8em ${(props) => props.theme.fontxxl};
	width: 90%;
	display: flex;
	justify-content: space-between;
	flex-direction: column;
	margin: 0 auto;

	table {
	  font-family: arial, sans-serif;
	  border-collapse: collapse;
	  width: 100%;
	  margin-top: 2rem;
	  box-shadow: 0px 0px 5px rgba(${(props) => props.theme.bodyRgba}, 0.18);
	  text-transform: capitalize;
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

const NavBarContainer = styled.div`

	display: flex;
	justify-content: center;
	margin: 0 auto;
	margin-top: 1rem;
	background-color: ${props => props.theme.white};
	box-shadow: 0px 0px 5px rgba(${(props) => props.theme.bodyRgba}, 0.18);
	z-index: 5;

`

const Action = styled.div`


	display: flex;
	justify-content: flex-end;
	width: 100%;
	padding: 2rem 0;


`

const ProprieteAdmin = () => {

	const { isLoggedIn, user, token } = useSelector(state => state.auth);
	const [datas, setDatas] = useState()

	const getAllPropriete = useCallback(() => {
		axios.get('/api/properties').then((data) => {
			setDatas(data.data)
		}).catch((err) => {
			console.log(err)
		})
	})

	useEffect(() => {
		getAllPropriete()
	}, [])

	if (!isLoggedIn && user.roles[0]['name'] !== 'user') {
	    return <Navigate to="/login" />
	 }

	return(
		<Container>
			<NavBarContainer>
				<ProprieteNavibar alignment="center" content={
					[{ lien: "/admin", text: "Tous les utilisateurs" },
					{ lien: "/admin/proprietes", text: "Tous les biens" }]
				} />
			</NavBarContainer>
			<table>
			  <tr>
			    <th>Nom</th>
			    <th>Rentabilité</th>
			    <th>Valoristation</th>
			    <th>Prix d'acquisition</th>
			    <th>Details</th>
			  </tr>
			  {
			  	datas && datas.map((data) => (
					<tr key={data.id}>
						<td>{data.nom}</td>
					    <td>{parseFloat(data.rentabiliter)}%</td>
					    <td>{data.valorisation}€</td>
					    <td>{data.prix_acquisition}€</td>
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


export default ProprieteAdmin;