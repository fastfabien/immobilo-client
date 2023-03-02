import React, { useState } from "react";
import styled from "styled-components";

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  & h3 {
    width: 50%;
    font-size: ${(props) => props.theme.fontlg};
    font-weight: 800;
    line-height: 1.5;
  }
`;

const Question = styled.div`
  border-radius: 10px;
  box-shadow: 1px 10px 10px rgba(${(props) => props.theme.bodyRgba}, 0.1);
  height: auto;
  transition: height 9s ease;
  padding: ${(props) => props.theme.fontmd} ${(props) => props.theme.fontxl};
  border: ${(props) =>
    props.show ? `2px solid rgba(${props.theme.textRgba}, 0.8);` : ";"};
`;

const Action = styled.div`
  color: #fff;
  background-color: rgba(${(props) => props.theme.textRgba}, .8);
  outline: none;
  border: none;
  padding: ${(props) => props.theme.fontlg} ${(props) => props.theme.fontlg};
  font-family: ${(props) => props.fontFamily};
  font-size: ${(props) => props.theme.fontmd};
  font-weight: 800;sm
  cursor: pointer;
  border-radius: 5px;
  text-align: center;
  opacity: 1;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-around;

  &::before,
  &::after {
    content: "";
    display: block;
    width: 60%;
    height: 2px;
    background-color: #fff;
    position: absolute;
    top: 50%;
    transition: transform .3s ease;
  }
  &::before {
    display: block;
    transform: translate(-50%; -50%);
  }
  &::after {
    transform: ${(props) => (props.show ? "" : "rotate(-90deg)")} ;
    transition: transform .3s ease;
    display: block;
  }
`;

const Answers = styled.div`
  margin-top: ${(props) => props.theme.fontlg};
  color: rgba(${(props) => props.theme.bodyRgba}, 0.9);
  line-height: 1.8;
`;

const Questions = ({ title, children }) => {
  const [isShow, setIsShow] = useState(false);
  return (
    <Question>
      <Content onClick={() => setIsShow(!isShow)}>
        <h3>{title}</h3>
        <Action show={isShow}></Action>
      </Content>
      {isShow ? <Answers>{children}</Answers> : ""}
    </Question>
  );
};

export default Questions;
