import React from "react";
import styled from "styled-components";
import Questions from "../../components/Questions";

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: ${(props) => props.theme.fontlg} ${(props) => props.theme.fontxxl};
  margin-bottom: ${(props) => props.theme.fontlg};

  @media screen and (max-width: 70em) {
    padding: ${(props) => props.theme.fontsm} ${(props) => props.theme.fontlg};
  }
`;

const Title = styled.h2`
  text-align: center;
  font-size: ${(props) => props.theme.fontxxl};
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

const QuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem;
  padding: ${(props) => props.theme.fontlg} ${(props) => props.theme.fontxxl};
  @media screen and (max-width: 70em) {
    padding: 0;
  }
`;

const FAQ = () => {
  return (
    <Container>
      <Title>
        Les Questions <span>les plus fréquentes</span>
      </Title>
      <QuestionContainer>
        <Questions title="Puis-je investir avec une société ou une SCI ?">
          <p>
            Bien sûr ! Nous vous demanderons quelques documents supplémentaires,
            c’est tout ! 😉
          </p>
        </Questions>
        <Questions title="En achetant des bricks, bénéficie-t-on de l'effet de levier bancaire ?">
          <p>
            Oui ! La plupart des immeubles que nous proposons sur notre
            plateforme sont co-financés à l’aide d’un prêt bancaire.
          </p>
          <p>
            Emprunter à la banque nous permet en effet d’actionner l’effet de
            levier bancaire et d’augmenter la rentabilité des investissements.{" "}
          </p>
          <p>Certains biens sont également financés sans crédit bancaire.</p>
        </Questions>
        <Questions title="À quel prix puis-je revendre mes bricks ? ">
          <p>Vous pouvez mettre en vente vos bricks au prix de votre choix.</p>
          <p>
            Toutefois, dans le but d’éviter une spéculation trop importante sur
            le prix de l’immobilier, nous ne permettons pas de vendre les bricks
            10% plus cher que leur dernière estimation.
          </p>
        </Questions>
        <Questions title="À quel prix puis-je revendre mes bricks ? ">
          <p>Vous pouvez mettre en vente vos bricks au prix de votre choix.</p>
          <p>
            Toutefois, dans le but d’éviter une spéculation trop importante sur
            le prix de l’immobilier, nous ne permettons pas de vendre les bricks
            10% plus cher que leur dernière estimation.
          </p>
        </Questions>
        <Questions title="À quel prix puis-je revendre mes bricks ? ">
          <p>Vous pouvez mettre en vente vos bricks au prix de votre choix.</p>
          <p>
            Toutefois, dans le but d’éviter une spéculation trop importante sur
            le prix de l’immobilier, nous ne permettons pas de vendre les bricks
            10% plus cher que leur dernière estimation.
          </p>
        </Questions>
      </QuestionContainer>
    </Container>
  );
};

export default FAQ;
