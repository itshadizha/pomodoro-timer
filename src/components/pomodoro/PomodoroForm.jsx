import styled from "styled-components";
import { useRef } from "react";
import Button from "../UI/Button";
import PropTypes from "prop-types";
import { FormInput } from "../UI/Input";
import { Intervals } from "../UI/Intervals";
import AppModal from "../UI/Modal";

const PomodoroForm = ({ closeModal, onSubmit }) => {
  const focusRef = useRef(null);
  const breakRef = useRef(null);
  const restRef = useRef(null);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const focusValue = focusRef.current.value;
    const breakValue = breakRef.current.value;
    const restValue = restRef.current.value;

    if (!focusValue && !breakValue && !restValue) {
      focusRef.current.focus();
      return;
    }

    onSubmit({
      focus: +focusValue,
      break: +breakValue,
      rest: +restValue,
    });
    closeModal()
  };

  return (
    <AppModal>
      <StyledForm>
        <Intervals>Settings</Intervals>
        <StyledDiv>
          <StyledInput ref={focusRef} labelText="Focus" />
          <StyledInput ref={breakRef} labelText="Break" />
          <StyledInput ref={restRef} labelText="Rest" />
        </StyledDiv>
        <div>
          <Button onClick={onSubmitHandler} type="submit">
            Save
          </Button>
          <Button icon onClick={closeModal}>
            ✖️
          </Button>
        </div>
      </StyledForm>
    </AppModal>
  );
};

PomodoroForm.propTypes = {
  closeModal: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default PomodoroForm;

const StyledDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
  margin-bottom: 30px;
`;
const StyledForm = styled.form`
  max-width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledInput = styled(FormInput)`
  width: 110px;
`;
