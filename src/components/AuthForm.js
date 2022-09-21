import {useState} from 'react'
import {useNavigate} from 'react-router-dom'

function AuthForm({signal, ...userLogin}) {
    const user = {...userLogin}
    const {login} = user
    
    const navigate = useNavigate()
    const [userInput, setUserInput] = useState({username: '', password: ''})

    const handleChange = async (e) => {
        setUserInput({ ...userInput, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const authResponse = await signal(userInput)
            navigate('/', {replace: true})
        }catch(error){
            console.log(error)
        }
    }

    return(
        <form onSubmit={handleSubmit}>
            <label>
                Username
                <input 
                    type="text"
                    name="username"
                    onChange={handleChange}
                    value={userInput.username}
                />
            </label>
            <label>
                Password
                <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    value={userInput.password}
                />
            </label>
            <input type="submit" value={login ? "Login" : "Signup"}/>
        </form>
    )
}

export default AuthForm