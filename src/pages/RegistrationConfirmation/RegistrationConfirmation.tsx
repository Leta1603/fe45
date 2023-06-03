import React from "react";

import FormPagesContainer from "../../components/FormPagesContainer";

const RegistrationConfirmation = () => {
  return (
    <FormPagesContainer title={"Registration Confirmation"} btnTitle={"Go to home"} onSubmit={() => {}}>
      <div>
        {
          "Please activate your account with the activation link in the email example@gmail.com.\n Please, check your email"
        }
      </div>
    </FormPagesContainer>
  );
};

export default RegistrationConfirmation;
