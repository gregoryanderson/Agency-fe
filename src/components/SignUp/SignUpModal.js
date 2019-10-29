import React, { useState, useEffect } from "react";
import "./SignUpModal.scss";
import { Link } from "react-router-dom";
import { validate } from "../../hooks/signInFormValidationRules";
import { useSignInForm } from "../../hooks/useForm";
import { postAUser, getAllOpportunities, getAllOpportunitiesForSpecificUser } from "../../util/apiCalls";
import { setUser, setOpps } from "../../actions";
import { connect } from "react-redux";
import { SignUpForm, PTag, Input, Button } from './SignUpModalStyled';

export const SignUpModal = props => {
  const [disabled, setDisabled] = useState(true);
  const { values, handleChange } = useSignInForm(validate);

  const setUserInRedux = async values => {
    try {
      let allValues = {
        ...values,
        role: props.role
      }
      let newUser = await postAUser(allValues);
      let allValuesAndId = {
        ...allValues,
        id: newUser.id
      }
      props.setAUser(allValuesAndId);
      if (allValues.role === 'volunteer'){
        console.log('in volun')
        let allOpps = await getAllOpportunities();
        console.log('allOpps', allOpps)
        props.setAllOpps(allOpps)
      } else {
        let userOpps = await getAllOpportunitiesForSpecificUser(allValuesAndId.id)
        console.log('userOpp',userOpps)
        props.setAllOpps(userOpps)
      }
    } catch (error) {
      console.log(error);
    }
  };

  function setSetDisabled() {
    if (!values.error) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }

  useEffect(() => {
    validate(values);
    if (!values.error) {
      setSetDisabled();
    }
  }, [values]);

  return (
    <SignUpForm className="SignUpModal">
      <PTag>Thanks for Signing Up!</PTag>
      <Input
        type="text"
        placeholder="Enter your First name"
        name="firstname"
        value={values.firstname || ""}
        onChange={handleChange}
        autoComplete="off"
        required
      />
      <Input
        type="text"
        placeholder="Enter your Last name"
        name="lastname"
        value={values.lastname || ""}
        onChange={handleChange}
        autoComplete="off"
        required
      />
      <Input
        type="text"
        placeholder="Enter your email"
        name="email"
        value={values.email || ""}
        onChange={handleChange}
        autoComplete="off"
        required
      />
      <Input
        type="text"
        placeholder="Enter your phone"
        name="phone"
        value={values.phone || ""}
        onChange={handleChange}
        autoComplete="off"
        required
      />
      <Input
        type="text"
        placeholder="Enter your password"
        name="password"
        value={values.password || ""}
        onChange={handleChange}
        autoComplete="off"
        required
      />
      <Input
        type="text"
        placeholder="Confirm your password"
        name="confirmation"
        value={values.confirmation || ""}
        onChange={handleChange}
        autoComplete="off"
        required
      />
      {/* {errors && <p>{errors}</p>} */}
      <Link to="/profile">
        <Button disabled={disabled} onClick={() => setUserInRedux(values)}>
          Submit!
        </Button>
      </Link>
    </SignUpForm>
  );
};

export const mapStateToProps = state => ({
  role: state.role
})

export const mapDispatchToProps = dispatch => ({
  setAUser: (user) => dispatch(setUser(user)),
  setAllOpps: (opps) => dispatch(setOpps(opps))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpModal);
