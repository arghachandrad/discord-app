import { Typography } from "@mui/material"
import { useState, useEffect } from "react"
import { connect } from "react-redux"
import { useHistory } from "react-router-dom"
import AuthBox from "../../shared/components/AuthBox"
import { validateRegisterForm } from "../../shared/utils/validators"
import { getActions } from "../../store/actions/authActions"
import RegisterPageFooter from "./RegisterPageFooter"
import RegisterPageInputs from "./RegisterPageInputs"

const RegisterPage = ({ register }) => {
  const history = useHistory()

  const [mail, setMail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")

  const [isFormValid, setIsFormValid] = useState(false)

  useEffect(() => {
    setIsFormValid(validateRegisterForm({ mail, username, password }))
  }, [mail, username, password, setIsFormValid])

  const handleRegister = async () => {
    console.log(mail, password, username)
    const userDetails = {
      mail,
      password,
      username,
    }
    register(userDetails, history)
  }

  return (
    <AuthBox>
      <Typography variant="h5" sx={{ color: "#fff" }}>
        Create an account
      </Typography>
      <RegisterPageInputs
        mail={mail}
        setMail={setMail}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
      />
      <RegisterPageFooter
        handleRegister={handleRegister}
        isFormValid={isFormValid}
      />
    </AuthBox>
  )
}

const mapActionsToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  }
}

export default connect(null, mapActionsToProps)(RegisterPage)
