import React, { useState, useRef, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import { confirmUserInformation, uploadUserDocument } from '../../actions/auth';


const Container = styled.div`

	width: 100%;
	min-height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;


`

const SignupContainer = styled.div`

    width: 80%;
    padding: ${props => props.theme.fontxxl};
    box-shadow: 1px 10px 10px rgba(${(props) => props.theme.bodyRgba}, 0.1);
    border-radius: 10px;
    margin-top: ${(props) => props.showDoc ? '0' : '8rem'};

    @media screen and (max-width: 50em) {
      width: 100%;
      box-shadow: unset;
      padding: ${props => props.theme.fontsm} ${props => props.theme.fontlg};
    }

`

const Button = styled.button`

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

  &:hover {
      opacity: .8;
  }

`

const Title = styled.h2`
  text-align: center;
  font-size: ${(props) => props.theme.fontxl};
  font-family: "Changa";
  text-transform: uppercase;
  font-weight: 800;
  color: rgba(${(props) => props.theme.bodyRgba}, 1);
  margin-bottom: ${(props) => props.theme.fontlg};
  & span {
    position: relative;
    z-index: 1;
    &::before {
      content: "";
      display: block;
      width: 100%;
      height: 10px;
      background-color: rgba(${(props) => props.theme.textRgba}, 1);
      position: absolute;
      bottom: 1rem;
      right: 0;
      z-index: -1;
    }
  }
  @media screen and (max-width: 70em) {
    font-size: ${(props) => props.theme.fontxl};
    margin-bottom: ${(props) => props.theme.fontxl};
  }
`;

const FormContainer = styled.form`

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 2rem;
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


const UserInformation = () => {
  const userInfoForm = useRef()
  const docForm = useRef()
  const fileForm = useRef()
  const submitDocumentRef = useRef()

  const { isLoggedIn, user, token } = useSelector(state => state.auth);
  const [data, setData] = useState({})

  const [loading, setLoading] = useState(false);
  const [showDoc, setShowDoc] = useState(false);
  const [showFileName, setShowFileName] = useState("");
  const [exactDoc, setExactDoc] = useState(false);
  const [noCodeMonetaire, setNoCodeMonetaire] = useState(false);

  const verificationRef = useRef()

  const { message } = useSelector(state => state.message);

  const dispatch = useDispatch()

  const [error, setError] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    if(submitDocumentRef.current) {
      if((exactDoc == true && noCodeMonetaire == true) && exactDoc === noCodeMonetaire) {
       submitDocumentRef.current.disabled = false;
      }  else {
        submitDocumentRef.current.disabled = true;
      }
    }
  }, [user, exactDoc, noCodeMonetaire])

  if (!isLoggedIn) {
    return <Navigate to="/login" />
  }



  const updateUserInformation = async (e) => {
    e.preventDefault();

    setLoading(true);
    console.log(token)
    console.log(data)
    await dispatch(confirmUserInformation(data, token))
      .then(() => {
        setShowDoc(true)
      })
      .catch(() => {
        setLoading(false)
        setError(message)
      });

  }

  const uploadDocument = async (e) => {
    e.preventDefault();
    console.log(e.target[1].files[0])

    /*console.log(files)*/
    var formData = new FormData()
    formData.append('typeDocument', data.typeDocument)
    formData.append('file', e.target[1].files[0])


    /*dispatch(uploadUserDocument(formData, user.accessToken))
    .then(() => {
      navigate("/dashboard");
      window.location.reload();
    })
    .catch(() => {
      setError(message)
    })*/

    await axios.post('/api/user/document', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-access-token': `${token}` 
        }
      }).then((response) => {
        if (response.data.user) {
          localStorage.setItem("user", JSON.stringify(response.data.user));
        }
        navigate("/dashboard");
        window.location.reload()
      }).catch(() => {
        setError(message)
      })
  
    
  }

  return (
    <Container>
      <SignupContainer showDoc={showDoc}>
        <Title>
          Completer votre <span>information</span>
        </Title>
        {
          showDoc ? 
          <FormContainer onSubmit={uploadDocument} enctype="multipart/form-data" ref={docForm}>
            <InputContainer>
            <Content showDoc={showDoc}>
              <Label>Ajouter un document de justification</Label>
              <Select name={data.typeDocument} value={user.typeDocument} onChange={(e) => setData({ ...data, typeDocument: e.target.value })}>
                <option value="">Choisissez une option</option>
                <option value="carte">Carte d'identité</option>
                <option value="passport">Passport</option>
                <option value="permis">Permis de conduire</option>
                <option value="sejour">Titre de sejour</option>
              </Select>
              <div>
                <UploadContainer htmlFor="uploadDoc">
                    {
                      showFileName == "" ? "Choisissez un fichier" : showFileName
                    }
                </UploadContainer>
                <input type="file" name="file" ref={fileForm} id="uploadDoc" onChange={(e) => setShowFileName(e.target.value)}  />
                <label className="container">Je certifie l’exactitude des informations et pièces fournies lors de mon inscription. Je m’engage à signaler à la société Bricks toute modification des éléments mentionnés.
                  <input type="checkbox" value={noCodeMonetaire} onChange={(e) => setExactDoc(!exactDoc)} />
                  <span className="checkmark"></span>
                </label>
                <label className="container">Je reconnais m’être inscrit en l’absence de tout démarcharge bancaire ou financier tel que décrit à l’article L341-1 du code monétaire et financier.
                  <input type="checkbox" value={noCodeMonetaire} onChange={(e) => setNoCodeMonetaire(!noCodeMonetaire)} />
                  <span className="checkmark"></span>
                </label>
              </div>
            </Content>
            </InputContainer>
            {error && <Error>{error}</Error>}
            <Inputs type="submit" value="Valider" ref={submitDocumentRef} disabled />
          </FormContainer>
          : 
          <FormContainer onSubmit={updateUserInformation} ref={userInfoForm}>
          <InputContainer>
            <Content>
              <Label>Information personnel</Label>
              <Inputs type="text" required value={user.firstName} name={data.firstName} required placeholder='Entrez votre prenom' onChange={(e) => setData({ ...data, firstName: e.target.value })} />
              <Inputs type="text" required value={user.lastName} name={data.lastName} required placeholder='Entrez votre nom' onChange={(e) => setData({ ...data, lastName: e.target.value })} />
              <Inputs type="text" required value={user.lieuNaissance} name={data.lieuNaissance} required placeholder='Entrez votre lieu de naissance' onChange={(e) => setData({ ...data, lieuNaissance: e.target.value })} />
              <Inputs type="tel" required value={user.tel} name={data.tel} required placeholder='Entrez votre numero de tel' onChange={(e) => setData({ ...data, tel: e.target.value })} />
              <Inputs type="text" required value={user.adresse} name={data.adresse} required placeholder='Entrez votre adresse' onChange={(e) => setData({ ...data, adresse: e.target.value })} />
              <Inputs type="text" required value={user.boitePostal} name={data.boitePostal} required placeholder='Entrez votre boite postal' onChange={(e) => setData({ ...data, boitePostal: e.target.value })} />
              <Label>Pays actuel</Label>
              <Select name={data.paysActuel} value={user.paysActuel} onChange={(e) => setData({ ...data, paysActuel: e.target.value })}>
                <option value="">Choisissez une option</option>
                <option value="france">Madagascar</option>
                <option value="france">France</option>
              </Select>
            </Content>
            <Content>
              <Label>Type de compte</Label>
              <Select name={data.typeCompte} value={user.typeCompte} onChange={(e) => setData({ ...data, typeCompte: e.target.value })}>
                <option value="particulier">Je suis un particulier</option>
                <option value="professinnel">Je suis un professionnel</option>
              </Select>
              <Label>Votre pays de naissance</Label>
              <Select name={data.pays} value={user.pays} onChange={(e) => setData({ ...data, pays: e.target.value })}>
                <option value="">Choisissez une option</option>
                <option value="france">Madagascar</option>.
                <option value="france">France</option>
              </Select>
              <Label>Votre sexe</Label>
              <Select name={data.sexe} value={user.sexe} onChange={(e) => setData({ ...data, sexe: e.target.value })}>
                <option value="">Choississez une option</option>
                <option value="masculin">Monsieur</option>
                <option value="feminin">Feminin</option>
              </Select>
            </Content>
          </InputContainer>
          {error && <Error>{error}</Error>}
          <Inputs type="submit" value="Valider" />
        </FormContainer>
        }
      </SignupContainer>
    </Container>
  )
}

export default UserInformation