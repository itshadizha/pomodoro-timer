import { forwardRef } from "react";
import styled from "styled-components";

const InputRef = forwardRef(({ type, onChange, labelText }, ref) => {
  return (
    <InputsContainer>
      <label>{labelText}</label>
      <input ref={ref} type={type} onChange={onChange} />
    </InputsContainer>
  );
});

export default InputRef;

const InputsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
