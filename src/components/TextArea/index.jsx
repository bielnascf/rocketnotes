/* eslint-disable react/prop-types */
import { Container } from './styles'

export function TextArea({ value, ...rest}) {
    return (
        <Container {...rest}>
            {value}
        </Container>
    )
}