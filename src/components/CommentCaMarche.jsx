import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-between;
  padding: ${(props) => props.theme.fontlg} ${(props) => props.theme.fontxxl};
  color: rgba(${(props) => props.theme.bodyRgba}, 1);

  @media screen and (max-width: 70em) {
    padding: 0;
  }
`;
const Left = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  gap: ${(props) => props.theme.fontlg};
  width: 50%;
  padding: ${(props) => props.theme.fontmd} ${(props) => props.theme.fontxl};
  border-radius: 10px;
  box-shadow: 1px 10px 10px rgba(${(props) => props.theme.bodyRgba}, 0.1);
  transition: transform 0.9s ease;

  &:hover {
    box-shadow: 1px 20px 20px rgba(${(props) => props.theme.bodyRgba}, 0.1);
    transform: translateX(20px) scale(1.01);
    transition: transform 0.5s ease;
    @media screen and (max-width: 70em) {
      transform: unset;
    }
  }
  & h3 {
    font-size: ${(props) => props.theme.fontlg};
    font-weight: 800;
    line-height: 1;
    width: 70%;
  }

  & p {
    font-size: ${(props) => props.theme.fontmd};
    font-weight: 800;
    line-height: 1.5;
  }

  @media screen and (max-width: 70em) {
    width: 100%;
    padding-top: ${(props) => props.theme.fontxxl};
    padding-bottom: ${(props) => props.theme.fontxxl};
  }
`;
const Right = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 10rem;
  order: 1;

  & img {
    width: 25rem;
    height: 25rem;
    object-fit: cover;
    display: block;
  }

  @media screen and (max-width: 70em) {
    display: none;
  }
`;

const CommentCaMarche = ({ image, title, children }) => {
  const [isShow, setIsShow] = useState(false);
  return (
    <Container
      onMouseEnter={() => setIsShow(true)}
      onMouseLeave={() => setIsShow(false)}
    >
      <Left>
        <h3>{title}</h3>
        <p>{children}</p>
      </Left>
      <Right>{isShow ? <img src={image} alt={title} /> : ""}</Right>
    </Container>
  );
};

export default CommentCaMarche;
