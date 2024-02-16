/* eslint-disable no-unused-vars */
/* eslint-disable no-unreachable */
import { Container, Form, Background } from './styles'
import { useState } from 'react'
import { FiMail, FiLock, FiUser } from 'react-icons/fi'
import Swal from 'sweetalert2'
import { Input } from '../../components/Input'
import { Button } from '../../components/Button'
import { Link, useNavigate } from 'react-router-dom'
import { api } from '../../services/api'

export function Signup() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    function handleSignUp() {
        if(!name || !email || !password) {
            return Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Preencha todos os campos!",
                background: "#3E3B47",
                color: "#ffff",
                confirmButtonColor: "#FF9000"
            });
        }

        api.post('/users', { name, email, password })
        .then(() => {
            Swal.fire({
                icon: "success",
                title: "Success",
                text: "Usuário cadastrado com sucesso!",
                background: "#3E3B47",
                color: "#ffff",
                confirmButtonColor: "#FF9000"
            });
        })
        .catch(error => {
            if(error.response) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: error.response.data.message,
                    background: "#3E3B47",
                    color: "#ffff",
                    confirmButtonColor: "#FF9000"
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Não foi possível cadastrar",
                    background: "#3E3B47",
                    color: "#ffff",
                    confirmButtonColor: "#FF9000"
                });
            }
        })
    }
    return (
        <Container>
            <Background />

            <Form>
                <h1>Rocketnotes</h1>
                <p>Aplicação para salvar e gerenciar seus links úteis</p>

                <h2>Crie sua conta</h2>

                <Input 
                    placeholder="Nome"
                    type="text"
                    icon={FiUser}
                    onChange={e => setName(e.target.value)}
                />

                <Input 
                    placeholder="E-mail"
                    type="text"
                    icon={FiMail}
                    onChange={e => setEmail(e.target.value)}
                    
                />

                <Input 
                    placeholder="Senha"
                    type="password"
                    icon={FiLock}
                    onChange={e => setPassword(e.target.value)}

                />

                <Button title="Cadastrar" onClick={handleSignUp}/>

                <Link to="/">
                    Voltar para o login
                </Link>
            </Form>
        </Container>
    )
}