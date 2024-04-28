import PropTypes from "prop-types";
import styled from "styled-components";

const StyledWrapper = styled("div")`
  display: flex;
  justify-content: center;
  min-height: 100vh;
  width: 100%;
  background: url(),
    linear-gradient(180deg, rgb(10, 82, 170), rgb(2, 112, 238) );
`;

export const Wrapper = ({ children }) => {
  return <StyledWrapper>{children}</StyledWrapper>;
};

Wrapper.propTypes = {
  children: PropTypes.node,
};
