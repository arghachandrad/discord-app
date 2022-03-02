import { Tooltip } from "@mui/material"
import { useHistory } from "react-router-dom"
import CustomPrimaryButton from "../../shared/components/CustomPrimaryButton"
import RedirectInfo from "../../shared/components/RedirectInfo"

const LoginPageFooter = ({ handleLogin, isFormValid }) => {
  const history = useHistory()

  const getFormNotValidMessage = () => {
    return "Enter correct email and password"
  }

  const getFormValidMessage = () => {
    return "press to login"
  }
  const handlePushToRegisterPage = () => {
    history.push("/register")
  }

  return (
    <>
      <Tooltip
        title={!isFormValid ? getFormNotValidMessage() : getFormValidMessage()}
      >
        <div>
          <CustomPrimaryButton
            label="Log in"
            additionalStyles={{ marginTop: "30px" }}
            disabled={!isFormValid}
            onClick={handleLogin}
          />
        </div>
      </Tooltip>
      <RedirectInfo
        text="Need an account? "
        redirectText="Create an account"
        additionalStyles={{ marginTop: "5px" }}
        redirectHandler={handlePushToRegisterPage}
      />
    </>
  )
}

export default LoginPageFooter
