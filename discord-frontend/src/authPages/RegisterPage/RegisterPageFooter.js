import { Tooltip } from "@mui/material"
import { useHistory } from "react-router-dom"
import CustomPrimaryButton from "../../shared/components/CustomPrimaryButton"
import RedirectInfo from "../../shared/components/RedirectInfo"

const RegisterPageFooter = ({ handleRegister, isFormValid }) => {
  const history = useHistory()

  const getFormNotValidMessage = () => {
    return "Enter correct email, password and username"
  }

  const getFormValidMessage = () => {
    return "press to register"
  }
  const handlePushToLoginPage = () => {
    history.push("/login")
  }

  return (
    <>
      <Tooltip
        title={!isFormValid ? getFormNotValidMessage() : getFormValidMessage()}
      >
        <div>
          <CustomPrimaryButton
            label="Register"
            additionalStyles={{ marginTop: "30px" }}
            disabled={!isFormValid}
            onClick={handleRegister}
          />
        </div>
      </Tooltip>
      <RedirectInfo
        text=""
        redirectText="Already have an account ?"
        additionalStyles={{ marginTop: "5px" }}
        redirectHandler={handlePushToLoginPage}
      />
    </>
  )
}

export default RegisterPageFooter
