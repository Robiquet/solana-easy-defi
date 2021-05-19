import styled from "styled-components";

const Image = styled.div`
  width: 200px;
  height: 200px;
  background-color: grey;
  border: 1px solid black;
`;

const Caption = styled.p`
  margin: 5px;
  font-size: 16px;
  font-weight:400;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FeatureCard = (props: {children:any}) => {
  return (
    <Container>
      <Image></Image>
      <Caption>{props.children}</Caption>
    </Container>
  );
};

export default FeatureCard;
