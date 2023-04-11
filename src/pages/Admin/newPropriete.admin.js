import react, { useState, useEffect, useRef } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import styled, { keyframes } from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands, icon, thin } from '@fortawesome/fontawesome-svg-core/import.macro'
import AdminDashboardLeft from '../../components/Admin/Dashboard.admin.js'
import ProprieteNavibar from '../../components/ProprieteNavibar'
import Button from "../../components/Button";
import Actualite from '../../components/Actualite.js';
import Rentabilite from '../../components/Rentabilite.js';
import PourquoiInvestir from '../../components/PourquoiInvestir.js';
import Presentation from '../../components/Presentation.js';
import FinanceInformation from '../../components/FinanceInformation.js';
import Loader from '../../components/Loader.js';
// import ReactQuill from 'react-quill'
// import 'react-quill/dist/quill.snow.css'


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
    width: auto;
    &:disabled {
      opacity: .5;
      cursor: not-allowed;
      &:hover {
      	opacity: .5;
      }
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

const Verification = styled.div`

	position: absolute;
	top: 15rem;
	bottom: 0;
	width: 100%;
	display: flex;
	justify-content: space-between;
	gap: 2rem;


`

const SubmitContainer = styled.div`


	display: flex;
	justify-content: flex-start;
	width: 100%;
	gap: 1rem;

`

const Btn = styled.button`


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
    width: auto;
    &:disabled {
      opacity: .5;
      cursor: not-allowed;
      &:hover {
      	opacity: .5;
      }
    }
    &:hover {
        opacity: .8;
    }



`

const TextareaContainer = styled.div`


	width: 80%;
	display: flex;
	flex-direction: column;

	& textarea {
		width: 100%!important;
		padding: ${props => props.theme.fontlg} ${props => props.theme.fontlg};
		outline: none;
		border: 1px solid rgba(${(props) => props.theme.textRgba}, 1); 
		border-radius: 5px;
		margin-top: 1rem;
	}

	& + button {
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
    width: 10%;
    &:disabled {
      opacity: .5;
      cursor: not-allowed;
      &:hover {
      	opacity: .5;
      }
    }
    &:hover {
        opacity: .8;
    }
	}


`

const Left = styled.div`


	width: 50%;


`

const Right = styled.div`


	width: 50%;


`

const Buttons = styled.div`

  
  position: absolute; 
  left: 1rem;
  top: -2rem;
  cursor: pointer;

  appearance: none;
  outline: none;

  & span, & span::after {
    display: block;
    width: 25px;
    height: 3px;
    background-color: red;
  }
  & span {
    transform: rotate(45deg);
  }
  & span::after {
    content: "";
    transform: rotate(90deg);
  }

  `


const Notice = styled.span`

  color: green;
  font-size: ${props => props.theme.fontmd};
  font-weight: 800;

`




const NewProprieteAdmin = () => {

	const { isLoggedIn, user, token } = useSelector(state => state.auth);
	const [data, setData] = useState({
	})
	const textareaConteinerRef = useRef()
	const aproposRef = useRef()
	const [message, setMessage] = useState()
	const [error, setError] = useState()
	const [isClicked, setIsClicked] = useState(false)
	const [isVerified, setIsVerified] = useState(false)
	const [toVerify, setToVerify] = useState(false)
	const [showFileName, setShowFileName] = useState("");
	const navigate = useNavigate()
	const [inputNumber, setInputNumber] = useState(0)
	const [loading, setLoading] = useState(false)
	const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);


	const handleChangeLoyerMensuel = (e) => {
		e.preventDefault()
		setData({ ...data, loyer_mensuel: e.target.value })
	}

	const handleChangeDataAnnuel = () => {
		setData({ ...data, loyer_collecter_annuel: parseFloat(data.loyer_mensuel) * 12 })
	}

	useEffect(() => {
		handleChangeDataAnnuel()
		window.addEventListener("beforeunload", handleBeforeUnload);
		return () => window.removeEventListener("beforeunload", handleBeforeUnload);
	}, [data.loyer_mensuel, handleChangeDataAnnuel, hasUnsavedChanges])

	const handleInputChange = (event) => {
		setData({ ...data, [event.target.name]: event.target.value });
		setHasUnsavedChanges(true);
	};

	const handleBeforeUnload = (event) => {
		if (hasUnsavedChanges) {
			event.preventDefault();
			event.returnValue = "";
		}
	};


	if (!isLoggedIn || user.roles[0]['name'] !== 'admin') {
		return <Navigate to="/dashboard" />
	}
	const handleVerified = (e) => {
		e.preventDefault()

		setIsVerified(true)
		setToVerify(false)
	}

	const valorisation = (parseFloat(data.prix_acquisition) + parseFloat(data.renumeration_service) + parseFloat(data.frais_notaire) + parseFloat(data.reserve_argent))
	const revenu_reverser = parseFloat(data.loyer_collecter_annuel) - parseFloat(data.charge_co_proprietes) - parseFloat(data.taxe_foncières) - parseFloat(data.frais_agence) - parseFloat(data.remboursement_emprunt) - parseFloat(data.taxes) - parseFloat(data.assurance)
	const rentabiliter = ((parseFloat(revenu_reverser) / parseFloat(valorisation)) * 100).toFixed(2)
	const reverser = ((parseFloat(data.loyer_collecter_annuel) - parseFloat(data.frais_agence) - parseFloat(data.remboursement_emprunt) + parseFloat(data.taxes)) / (parseFloat(data.prix_acquisition) + parseFloat(data.renumeration_service) + parseFloat(data.frais_notaire) + parseFloat(data.reserve_argent)) * 100).toFixed(2)

	const formatedValorisation = valorisation.toLocaleString(undefined, { useGrouping: true, groupingSeparator: " " });


	const createDescription = (e) => {
		e.preventDefault()
		setInputNumber(inputNumber + 1)
		const name = `description${inputNumber}`
		const form = textareaConteinerRef.current
		const textarea = document.createElement('textarea')
		textarea.name = name
		textarea.placeholder = "Description"
		textarea.onChange = () => setData({ ...data, name: e.target.value })
		form.appendChild(textarea)
	}

	const createAbout = (e) => {
		e.preventDefault()
		setInputNumber(inputNumber + 1)
		const name = `about${inputNumber}`
		const form = aproposRef.current
		const textarea = document.createElement('textarea')
		textarea.name = name
		textarea.placeholder = "À propos"
		textarea.onChange = () => setData({ ...data, name: e.target.value })
		form.appendChild(textarea)
	}

	const handleCreateProperty = async (e) => {
		e.preventDefault()

		const val = e.target[e.target.length - 3].files;
		setIsClicked(true)

		setLoading(true)

		var formData = new FormData()
		for (var i = 0; i < e.target.length - 1; i++) {
			formData.append(`${e.target[i].name}`, e.target[i].value)
		}
		for (var i = 0; i < val.length; i++) {
			formData.append('file', e.target[e.target.length - 3].files[i])
		}

		await axios.post('/api/properties', formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
				'x-access-token': `${token}`
			}
		}).then((response) => {
			setMessage('Proprietes enregistrer !')
			setHasUnsavedChanges(false);
			navigate("/admin/proprietes");
			setLoading(false)
		}).catch((error) => {
			setError(error.message)
		})


	}

	if (!isLoggedIn && user.roles[0]['name'] !== 'user') {
		return <Navigate to="/login" />
	}

	return (
		<Container>
			{loading && <Loader />}

			{!toVerify && <FormContainer onSubmit={handleCreateProperty}>
				<InputContainer>
					<Content>
						<Label>Information generale</Label>
						<Inputs type="text" required value={data.nom} name="nom" placeholder='Nom' onChange={(e) => handleInputChange(e)} />
						<Inputs type="text" required value={data.rue} name="rue" placeholder='Rue' onChange={(e) => handleInputChange(e)} />
						<Inputs type="text" required value={data.region} name="region" placeholder='Region' onChange={(e) => handleInputChange(e)} />
						<Inputs type="number" min="0" required value={data.zip} name="zip" placeholder='Zip' onChange={(e) => handleInputChange(e)} />
						<Label>Information Secondaire</Label>
						<Textarea type="text" required value={data.localisation} name="localisation" placeholder='Localisation' onChange={(e) => handleInputChange(e)} />
						<Textarea type="text" required value={data.etat_immeuble} name="etat_immeuble" placeholder="Etat de l'immeuble" onChange={(e) => handleInputChange(e)} />
						<Textarea type="text" required value={data.nature_lots} name="nature_lots" placeholder='Nature du lots' onChange={(e) => handleInputChange(e)} />
						<Textarea type="text" required value={data.totalite_lots} name="totalite_lots" placeholder='Totalite du lots' onChange={(e) => handleInputChange(e)} />
						<Inputs type="number" min="0" required value={data.nombre_lots} name="nombre_lots" placeholder='Nombre de lots' onChange={(e) => handleInputChange(e)} />
						<Inputs type="number" min="0" required value={data.aire} name="aire" placeholder='Surface' onChange={(e) => handleInputChange(e)} />
						<TextareaContainer ref={textareaConteinerRef}>
							<Textarea required value={data.description} name="description" placeholder='Description' onChange={(e) => handleInputChange(e)} />
						</TextareaContainer>
						<Btn onClick={createDescription}>+</Btn>
						{/* <ReactQuill /> */}
						<TextareaContainer ref={aproposRef}>
							<Textarea required value={data.about} name="about" placeholder='À propos' onChange={(e) => handleInputChange(e)} />
						</TextareaContainer>
						<Btn onClick={createAbout}>+</Btn>
					</Content>
					<Content>
						<Label>Acquisition</Label>
						<Inputs type="number" min="0" required value={data.prix_acquisition} name="prix_acquisition" placeholder="Prix d' acquisition" onChange={(e) => handleInputChange(e)} />
						<Inputs type="number" min="0" required value={data.renumeration_service} name="renumeration_service" placeholder="Renumeration de service" onChange={(e) => handleInputChange(e)} />
						<Inputs type="number" min="0" required value={data.frais_notaire} name="frais_notaire" placeholder="Frais notaire" onChange={(e) => handleInputChange(e)} />
						<Inputs type="number" min="0" required value={data.reserve_argent} name="reserve_argent" placeholder="Reserve d'argent" onChange={(e) => handleInputChange(e)} />

						<Label>Loyer Mensuel/Annuel</Label>
						<Inputs type="number" min="0" required value={data.loyer_mensuel} name="loyer_mensuel" placeholder='Loyer Mensuel' onChange={(e) => handleInputChange(e)} />
						<Inputs type="number" min="0" required value={data.loyer_collecter_annuel} name="loyer_collecter_annuel" placeholder='Loyer Collecter Annuel' readOnly />
						<Label>Rendement locatif cible</Label>
						<Inputs type="number" min="0" required value={data.charge_co_proprietes} name="charge_co_proprietes" placeholder="Charges de coproprietés" onChange={(e) => handleInputChange(e)} />
						<Inputs type="number" min="0" required value={data.taxe_foncières} name="taxe_foncières" placeholder="Taxes foncières" onChange={(e) => handleInputChange(e)} />
						<Inputs type="number" min="0" required value={data.assurance} name="assurance" placeholder="Assurance" onChange={(e) => handleInputChange(e)} />
						<Inputs type="number" min="0" required value={data.frais_agence} name="frais_agence" placeholder="Frais agence immobilier" onChange={(e) => handleInputChange(e)} />
						<Inputs type="number" min="0" required value={data.remboursement_emprunt} name="remboursement_emprunt" placeholder="Remboursement emprunt" onChange={(e) => handleInputChange(e)} />
						<Inputs type="number" min="0" step="0.01" required value={data.taxes} name="taxes" placeholder="Taxes" onChange={(e) => setData({ ...data, taxes: e.target.value })} />
						<Label>Finance</Label>
						<Inputs type="number" min="0" step="0.01" required value={data.potentiel_plus_value} name="potentiel_plus_value" placeholder="Potentiel de plus value en %" onChange={(e) => handleInputChange(e)} />
					</Content>
				</InputContainer>
				<Content>
					<Label>Gallery</Label>
					<UploadContainer htmlFor="uploadDoc">
						{
							showFileName == "" ? "Choisissez un fichier" : showFileName
						}
					</UploadContainer>
					<input type="file" name="file" id="uploadDoc" multiple accept="image/png,image/jpeg" required onChange={(e) => setData({ ...data, files: e.target.files })} />
				</Content>
				<SubmitContainer>
					<Inputs type="submit" value="Valider" />
					<Btn onClick={() => setToVerify(true)}><FontAwesomeIcon icon={solid('eye')} /></Btn>
				</SubmitContainer>
			</FormContainer>}
			{toVerify && <Verification>
				<Buttons onClick={() => setToVerify(false)}><span></span></Buttons>
				<Left>
					<Rentabilite
						rentabiliter={rentabiliter}
						reverser={reverser}
						valorisation={valorisation} />
					<PourquoiInvestir
						localisation={data?.localisation}
						etat_immeuble={data?.etat_immeuble}
						nature_lots={data?.nature_lots}
						totalite_lots={data?.totalite_lots}
					/>
					<Presentation
						nombre_lots={data?.nombre_lots}
						loyer_mensuel={data?.loyer_mensuel}
						aire={data?.aire}
						description={[data?.description]}
					/>
				</Left>
				<Right>
					<FinanceInformation

						information={[{ header: [<FontAwesomeIcon icon={solid('home')} />, "Acquisition"] },
						["Prix d'acquisition", data?.prix_acquisition],
						["Rémunération", data?.renumeration_service],
						["Frais de notaire", data?.frais_notaire],
						["Réserve d’argent (notamment pour travaux)", data?.reserve_argent],
						["Coût d'acquisition total", formatedValorisation]
						]}
					/>
					<FinanceInformation
						information={[{ header: [<FontAwesomeIcon icon={solid('home')} />, "Rendement Locatif Cible"] },
						["Loyers collectés", data?.loyer_collecter_annuel],
						["Charges de coproprietès", data?.charge_co_proprietes],
						["Frais d’agence immobilière", data?.frais_agence],
						["Taxes foncières", data?.taxe_foncières],
						["Remboursement de l'emprunt", data?.remboursement_emprunt],
						["Assurance", data?.assurance],
						["Taxes", data?.taxes],
						["Revenu Reverser", `${revenu_reverser} € (soit ${reverser}%)`]
						]}
					/>
					<FinanceInformation
						information={[{ header: [<FontAwesomeIcon icon={solid('home')} />, "valorisation"] },
						["Valorisation du bien", formatedValorisation],
						["Réserve d'argent actuelle", data?.reserve_argent],
						["Prêt à rembourser", data?.remboursement_emprunt],
						["Valeur Totale", formatedValorisation]
						]}
					/>
				</Right>
			</Verification>}
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