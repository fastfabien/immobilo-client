import react, { useEffect } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import styled from 'styled-components'
import AdminDashboardLeft from '../../components/Admin/Dashboard.admin.js'
import ProprieteNavibar from '../../components/ProprieteNavibar'

const Container = styled.div`


	padding: 8em ${(props) => props.theme.fontxxl};
	width: 100%;
	display: flex;
	justify-content: space-between;
	flex-direction: column;


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

const Admin = () => {

	const { isLoggedIn, user, token } = useSelector(state => state.auth);


	useEffect(() => {

	}, [])

	if (!isLoggedIn || user?.roles[0]['name'] !== 'admin') {
	    return <Navigate to="/dashboard" />
	 }


	return(
		<Container>
			<NavBarContainer>
				<ProprieteNavibar alignment="center" content={
					[{ lien: "/admin", text: "Tous les utilisateurs" },
					{ lien: "/admin/proprietes", text: "Tous les biens" }]
				} />
			</NavBarContainer>
			<AdminDashboardLeft />
		</Container>
	)
}


export default Admin;