import styled from "styled-components";

const Image = styled.div`
  width: 250px;
  height: 250px;
  background-color: grey;
  border: 1px solid black;
`;

const FeatureCard = (props: {children:any}) => {
  return (
    <div className="flex flex-col items-center">
      <Image></Image>
      <p className="font-normal text-base">{props.children}</p>
    </div>
  );
};

export default FeatureCard;
