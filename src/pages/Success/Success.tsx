import React from "react";

import FormPagesContainer from "../../components/FormPagesContainer";
import styles from "./Success.module.scss";

const Success = () => {
  return (
    <FormPagesContainer title={"Success"} btnTitle={"Go to home"} onSubmit={() => {}}>
      <div className={styles.successMessage}>
        <div>Email confirmed</div>
        <div>Your registration is now completed</div>
      </div>

      {/* <div>{"Email confirmed.\n Your registration is now completed"}</div> */}
    </FormPagesContainer>
  );
};

export default Success;
