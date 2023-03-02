import react, {useState, useEffect} from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import styled, { keyframes } from 'styled-components'
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
	position: relative;

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


const FormContainer = styled.form`

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 2rem;
  margin-top: 2rem;
  & input[type="submit"] {
    color: ${props => props.theme.white};
    background-color: rgba(${props => props.theme.textRgba}, 1);
    outline: none;
    border: none;
    padding: ${props => props.theme.fontsm} ${props => props.theme.fontmd};
    font-size: ${props => props.theme.fontmd};
    font-weight: 800;
    cursor: pointer;
    border-radius: 5px;
    text-align: center;
    opacity: .9;
    width: 80%;
    &:disabled {
      opacity: .8;
      cursor: not-allowed;
    }
    &:hover {
        opacity: .8;
    }
  }

`

const InputContainer = styled.div`


  width: 90%;
  display: flex;
  justify-content: space-between;

  .container {
  display: flex;
  align-items: center;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: inherit;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  margin-top: 1rem;
}

.container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkmark {
  position: absolute;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: #eee;
}

.container:hover input ~ .checkmark {
  background-color: #ccc;
}

.container input:checked ~ .checkmark {
  background-color: rgba(${props => props.theme.textRgba}, 1);
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.container input:checked ~ .checkmark:after {
  display: block;
}

.container .checkmark:after {
  left: 9px;
  top: 5px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}

& input[type="file"] {
  display: none;
}

`

const Inputs = styled.input`

  padding: ${props => props.theme.fontlg} ${props => props.theme.fontlg};
  width: 80%;
  outline: none;
  border: 1px solid rgba(${(props) => props.theme.textRgba}, 1); 
  border-radius: 5px;

`

const Textarea = styled.textarea`

	padding: ${props => props.theme.fontlg} ${props => props.theme.fontlg};
	width: 80%;
	outline: none;
	border: 1px solid rgba(${(props) => props.theme.textRgba}, 1); 
	border-radius: 5px;

`

const Select = styled.select`


	padding: ${props => props.theme.fontlg} ${props => props.theme.fontlg};
	  width: 80%;
	  outline: none;
	  border: 1px solid rgba(${(props) => props.theme.textRgba}, 1); 
	  border-radius: 5px;

`


const goLeft = keyframes`

0% {
  transform: translateX(500px);
}

100% {
  transform: translateX(0);
}

`

const goRight = keyframes`

0% {
  transform: translateX(0);
}

100% {
  transform: translateX(500px);
}

`

const Error = styled.span`

  color: ${props => props.theme.white};
  background-color: red;
  padding: 1rem 2rem;
  position: absolute;
  top: 5rem;
  right: 0;
  animation: ${goLeft} 1s linear;

`

const ActionContainer = styled.div`

  margin-top: ${props => props.theme.fontxl};
  text-align: center;

  & a {
    color: rgba(${props => props.theme.textRgba});
  }

`

const Label = styled.h3`

  text-transform: uppercase;
  font-size: ${(props) => props.theme.fontlg};
  font-family: "Changa";

`

const Content = styled.div`

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 1rem;
  width: ${(props) => props.showDoc ? '100%' : '50%'};

`

const UploadContainer = styled.label`


  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid rgba(${(props) => props.theme.textRgba}, 1); 
  padding: 2rem;
  border-radius: 5px;
  width: 50%;

  


`

const Message = styled.div`

	padding: 20px;
	color: ${props => props.theme.white};
	position: fixed;
	top: 6rem;
	right: 0;
	background-color: darkgreen;
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 1rem;

	& span {
		padding: 3px 4px;
		border-radius: 50%;
		border: 1px solid ${props => props.theme.white};
	}

`

const Erreur = styled.div`
	
	position: fixed;
	top: 6rem;
	right: 0;
	padding: 20px;
	color: ${props => props.theme.white};
	position: fixed;
	background-color: red;
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 1rem;
	& span {
		padding: 3px 4px;
		border-radius: 50%;
		border: 1px solid ${props => props.theme.white};
	}
`

const Verify = styled.div`
	width: 100%;

	display: flex;
	justify-content: center;
	align-items: center;
	scroll-behavior: 

	& div:first-child {
		width: 80%;
		overflow-y: scroll;
	}

`

const NewProprieteAdmin = () => {

	const { isLoggedIn, user, token } = useSelector(state => state.auth);
	const [data, setData] = useState({
		loyer_mensuel: 0,
		loyer_collecter_annuel: 0
	})
	const [message, setMessage] = useState()
	const [error, setError] = useState()
	const [showFileName, setShowFileName] = useState("");
	const navigate = useNavigate()

	const handleChangeLoyerMensuel = (e) => {
		e.preventDefault()
		setData({ ...data, loyer_mensuel: e.target.value})
	}

	const handleChangeDataAnnuel = () => {
		setData({ ...data, loyer_collecter_annuel: parseFloat(data.loyer_mensuel) * 12 })
	}

	useEffect(() => {
		handleChangeDataAnnuel()
	}, [data.loyer_mensuel])

	const handleCreateProperty = async (e) => {
		e.preventDefault()

		const val = e.target[23].files;
		console.table(val)

		var formData = new FormData()
		for(var i = 0; i < e.target.length - 1; i++) {
			formData.append(`${e.target[i].name}`, e.target[i].value)    
    }
    for(var i = 0; i < val.length; i++) {
			formData.append('file', e.target[23].files[i])    
    }


    await axios.post('/api/properties', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-access-token': `${token}` 
        }
      }).then((response) => {
	        setMessage('Proprietes enregistrer !')
	        navigate("/admin/proprietes");
	    }).catch((error) => {
	        setError(error.message)
	    })



	}

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
			<FormContainer onSubmit={handleCreateProperty}>
	          <InputContainer>
	            <Content>
	              <Label>Information generale</Label>
	              <Inputs type="text" required value={data.nom} name="nom" placeholder='Nom' onChange={(e) => setData({ ...data, nom: e.target.value })} />
	              <Inputs type="text" required value={data.rue} name="rue" placeholder='Rue' onChange={(e) => setData({ ...data, rue: e.target.value })} />
	              <Inputs type="text" required value={data.region} name="region" placeholder='Region' onChange={(e) => setData({ ...data, region: e.target.value })} />
	              <Inputs type="number" min="0" required value={data.zip} name="zip" placeholder='Zip' onChange={(e) => setData({ ...data, zip: e.target.value })} />
	              <Label>Information Secondaire</Label>
	              <Textarea type="text" required value={data.localisation} name="localisation" placeholder='Localisation' onChange={(e) => setData({ ...data, localisation: e.target.value })} />
	              <Textarea type="text" required value={data.etat_immeuble} name="etat_immeuble" placeholder="Etat de l'immeuble" onChange={(e) => setData({ ...data, etat_immeuble: e.target.value })} />
	              <Textarea type="text" required value={data.nature_lots} name="nature_lots" placeholder='Nature du lots' onChange={(e) => setData({ ...data, nature_lots: e.target.value })} />
	              <Textarea type="text" required value={data.totalite_lots} name="totalite_lots" placeholder='Totalite du lots' onChange={(e) => setData({ ...data, totalite_lots: e.target.value })} />
	              <Inputs type="number" min="0" required value={data.nombre_lots} name="nombre_lots" placeholder='Nombre de lots' onChange={(e) => setData({ ...data, nombre_lots: e.target.value })} />
	              <Inputs type="number" min="0" required value={data.aire} name="aire" placeholder='Aire' onChange={(e) => setData({ ...data, aire: e.target.value })} />
	              <Textarea required value={data.description} name="description" placeholder='Description' onChange={(e) => setData({ ...data, description: e.target.value })} />

	            </Content>
	            <Content>
	              
	              <Label>Acquisition</Label>
	              <Inputs type="number" min="0" required value={data.prix_acquisition} name="prix_acquisition" placeholder="Prix d' acquisition" onChange={(e) => setData({ ...data, prix_acquisition: e.target.value })} />
	              <Inputs type="number" min="0" required value={data.renumeration_service} name="renumeration_service" placeholder="Renumeration de service" onChange={(e) => setData({ ...data, renumeration_service: e.target.value })} />
	              <Inputs type="number" min="0" required value={data.frais_notaire} name="frais_notaire" placeholder="Frais notaire" onChange={(e) => setData({ ...data, frais_notaire: e.target.value })} />
	              <Inputs type="number" min="0" required value={data.reserve_argent} name="reserve_argent" placeholder="Reserve d'argent" onChange={(e) => setData({ ...data, reserve_argent: e.target.value })} />
	              <Inputs type="number" min="0" required value={data.renovation} name="renovation" placeholder="Renovation" onChange={(e) => setData({ ...data, renovation: e.target.value })} />

	              <Label>Loyer Mensuel/Annuel</Label>
	              <Inputs type="number" min="0" required value={data.loyer_mensuel} name="loyer_mensuel" placeholder='Loyer Mensuel' onChange={(e) => setData({...data,loyer_mensuel: e.target.value })} />
	              <Inputs type="number" min="0" required value={data.loyer_collecter_annuel} name="loyer_collecter_annuel" placeholder='Loyer Collecter Annuel' readOnly />
	              <Label>Rendement locatif cible</Label>
	              <Inputs type="number" min="0" required value={data.frais_agence} name="frais_agence" placeholder="Frais agence immobilier" onChange={(e) => setData({ ...data, frais_agence: e.target.value })} />
	              <Inputs type="number" min="0" required value={data.remboursement_emprunt} name="remboursement_emprunt" placeholder="Remboursement emprunt" onChange={(e) => setData({ ...data, remboursement_emprunt: e.target.value })} />
	              <Inputs type="number" min="0" step="0.01" required value={data.taxes} name="taxes" placeholder="Taxes" onChange={(e) => setData({ ...data, taxes: e.target.value })} />
	              <Label>Finance</Label>
	              <Inputs type="number" min="0" step="0.01" required value={data.revente} name="revente" placeholder="Potentiel de revente" onChange={(e) => setData({ ...data, revente: e.target.value })} />
	              <Inputs type="number" min="0" step="0.01" required value={data.hausse} name="hause" placeholder="Potentiel de hausse" onChange={(e) => setData({ ...data, hausse: e.target.value })} />
	            </Content>
	          </InputContainer>
	          <Content>
	            	<Label>Gallery</Label>
	            	<UploadContainer htmlFor="uploadDoc">
                    {
                      showFileName == "" ? "Choisissez un fichier" : showFileName
                    }
                </UploadContainer>
                <input type="file" name="file" id="uploadDoc" multiple accept="image/png,image/jpeg" />
	            </Content>
	          <Inputs type="submit" value="Valider" />
	        </FormContainer>
        {
         	message && <Message>{message}<span onClick={() => setMessage(!message)}><FontAwesomeIcon icon={solid('xmark')} /></span></Message>
        }
        {
         	error && <Erreur>{error}<span onClick={() => setMessage(!error)}><FontAwesomeIcon icon={solid('xmark')} /></span></Erreur>
        }
		</Container>
	)
}


export default NewProprieteAdmin;