import styled from "styled-components";
import PropTypes from "prop-types";
import { forwardRef } from "react";

export const FormInput = forwardRef(
  ({ labelText, value, onChange, ...rest }, ref) => {
    return (
      <StyledFormDiv>
        <StyledLabel>{labelText}</StyledLabel>
        <StyledInput ref={ref} value={value} onChange={onChange} {...rest} />
      </StyledFormDiv>
    );
  }
);

FormInput.displayName = "FormInput";

FormInput.propTypes = {
  labelText: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func,
};

const StyledLabel = styled.label`
  color: rgb(28, 28, 28);
  font-size: 26.35px;
  font-weight: 500;
  line-height: 33px;
  letter-spacing: 0%;
  display: block;
`;

const StyledInput = styled.input`
  border: none;
  box-sizing: border-box;
  border: 1.65px solid rgb(35, 41, 49);
  border-radius: 6.59px;
  background: rgb(61, 62, 66);
  padding: 6.59px 19.76px 6.59px 19.76px;
  color: white;
`;

const StyledFormDiv = styled.div`
  width: 100%;
`;
