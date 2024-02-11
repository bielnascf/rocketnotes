import { RiShutDownLine } from 'react-icons/ri'
import { Container, Profile, Logout } from './styles'

export function Header() {
    return ( 
        <Container>
            <Profile>
                <img src="https://www.github.com/bielnascf.png" alt="Foto de Gabriel Nascimento" />
                <div>
                    <span>Bem Vindo,</span>
                    <strong>Gabriel Nascimento</strong>
                </div>
            </Profile>

            <Logout>
                <RiShutDownLine />
            </Logout>
        </Container>
    )
}