import { Container, Links, Content } from './styles.js';
import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { api } from '../../services/api'
import Swal from 'sweetalert2'

import { Tag } from '../../components/Tag';
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Section } from '../../components/Section';
import { ButtonText } from '../../components/ButtonText'


export function Details() {
  const [data, setData] = useState(null)

  const params = useParams()
  const navigate = useNavigate()

  function handleBack() {
    navigate(-1)
  }

  async function handleRemoveNote() {
    Swal.fire({
      title: 'Tem certeza que deseja excluir esta nota?',
      text: "Você não poderá reverter isso!",
      icon: 'warning',
      showCancelButton: true,
      background: "#3E3B47",
      color: "#ffff",
      confirmButtonColor: '#00ff00',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, exclua!'
    }).then((result) => {
      if (result.isConfirmed) {
        api.delete(`notes/${params.id}`).then(() => {
          Swal.fire({
            icon:'success',
            title: 'Excluída!',
            text: 'Nota excluída com sucesso!',
            background: "#3E3B47",
            color: "#ffff",
          })
          navigate(-1)
        })
      }
    })
  }

  useEffect(() => {
    async function fetchNote() {
      const response = await api.get(`/notes/${params.id}`)
      setData(response.data)
    }

    fetchNote()
  },[])

  return (
    <Container>
      <Header />
      {
        data &&
        <main>
          <Content>
            <ButtonText title="Excluir nota" onClick={handleRemoveNote}/>
          
            <h1>
              {data.title}
            </h1>
            <p>
              {data.description}
            </p>

            {
              data.links &&
              <Section title="Links úteis">
                <Links>
                  {
                    data.links.map(link => (
                      <li key={String(link.id)}>
                        <a href={link.url} target="_blank">
                          {link.url}
                        </a>
                      </li>
                    ))
                  }
                </Links>
              </Section>
            }

            {
              data.tags &&
              <Section title="Marcadores">
                {
                  data.tags.map(tag => (
                    <Tag 
                      key={String(tag.id)}
                      title={tag.name}
                    />
                  ))
                }
              </Section>
            }

            <Button 
              title="Voltar" 
              onClick={handleBack}
            />
          </Content>
        </main>
      }
    </Container>
  )}