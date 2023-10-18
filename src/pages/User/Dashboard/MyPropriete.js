import React, { useState, useRef, useEffect, useCallback } from 'react'
import styled, { keyframes } from 'styled-components'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Button from '../../../components/Button';
import CardProject from "../../../components/CardProject";
import ProprieteNavibar from "../../../components/ProprieteNavibar";
import SellBricks from "../../../components/VendreBricks";
import img from "../../../assets/house2.jpg";
import authHeader from "../../../services/auth-header";
import Loader from '../../../components/Loader';


const Container = styled.div`

	
	width: 100%;
	display: block;
	margin: 0 auto;
	min-height: 100vh;
  padding: ${(props) => props.theme.fontlg} ${(props) => props.theme.fontxxl};
  padding-top: 10rem;
  position: relative;

  @media screen and (max-width: 70em) {
    padding: ${(props) => props.theme.fontlg} ${(props) => props.theme.fontmd};
    padding-top: 10rem;
  }


`

const ProprieteContainer = styled.div`

	display: flex;
	justify-content: start;
	flex-direction: column;
	flex-wrap: wrap;
	gap: .1rem;
	width: 80%;
	margin: 0 auto;
	margin-top: 2rem;

  @media screen and (max-width: 80em) {
    width: 100%;
    gap: 2rem;
  }


`


const MyPropriete = () => {
  const [datas, setDatas] = useState(null);
  const [loading, setLoading] = useState(false);

  const getAllPropriete = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/bricks", { headers: authHeader() });
      setDatas(response?.data?.bricks || []);
    } catch (error) {
      console.log(error);
      setDatas([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getAllPropriete();
  }, [getAllPropriete]);

  return (
    <Container>
      <ProprieteNavibar
        alignment="center"
        content={[
          { lien: "/proprietes", text: "Tous les biens" },
          { lien: "/mes-proprietes", text: "Mes biens" },
          { lien: "/mes-ventes", text: "Mes ventes en cours" },
        ]}
      />
      {loading ? (
        <Loader />
      ) : (
        <ProprieteContainer>
          {datas?.map((data) => (
            data.nombre_bricks > 0 &&
            <SellBricks
              key={data._id}
              id={data._id}
              image={`data:image/jpg;base64,${data.propertie_id.image_couverture}`}
              nom={data.propertie_id.nom}
              zip={data.propertie_id.zip}
              prix_total={data.prix_total.toFixed(2)}
              nombre_bricks={data.nombre_bricks.toFixed(2)}
              rentabiliter={data.propertie_id.rentabiliter.toFixed(2)}
              reverser={data.propertie_id.reverser.toFixed(2)}
              region={data.propertie_id.region}
              status={data.status}
            />
          ))}
        </ProprieteContainer>
      )}
    </Container>
  );
};

export default MyPropriete;
